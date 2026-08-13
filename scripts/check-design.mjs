#!/usr/bin/env node
/**
 * Design-metric and page-architecture QA.
 *
 * This is the browser-free substitute for the visual review in
 * YUNESWEB_TRUST_REDESIGN_TECHNICAL_SPEC.md §15 and §23. Browser automation
 * cannot run in this environment (Playwright's browser download is blocked by
 * network policy), so instead of claiming a visual pass we assert the numeric
 * targets the specification states, directly against the shipped CSS, plus the
 * mandatory homepage section order against the built HTML.
 *
 * It cannot prove that a page "looks" right. It can prove that the values the
 * specification calls out are actually in the stylesheet and that the required
 * sections exist in the required order.
 *
 * Usage: node scripts/check-design.mjs [outDir]
 */
import { readFileSync, existsSync, readdirSync } from "node:fs";
import { join } from "node:path";

const OUT = process.argv[2] ?? "out";
const failures = [];
let checks = 0;
const ok = () => { checks += 1; };
const fail = (group, msg) => failures.push(`[${group}] ${msg}`);

const css = ["styles/globals.css", "styles/content-pages.css", "styles/marketing.css"]
  .filter(existsSync)
  .map((f) => readFileSync(f, "utf8"))
  .join("\n");

/* ------------------------------------------- §24.1 patterns to be removed */
const banned = [
  [/min-height:\s*calc\(100vh/, "hero still uses 100vh"],
  [/font-size:\s*clamp\([^)]*6\.25rem/, "H1 still scales to 6.25rem"],
  [/font-size:\s*clamp\([^)]*6\.1rem/, "content H1 still scales to 6.1rem"],
  [/min-height:\s*610px/, "internal hero still 610px"],
  [/min-height:\s*420px/, "service cards still 420px"],
  [/min-height:\s*345px/, "process cards still 345px"],
  [/padding:\s*clamp\(8[0-9]px,[^)]*15[05]px\)/, "section padding still ~150px"]
];
for (const [re, msg] of banned) {
  if (re.test(css)) fail("removed", msg);
  else ok();
}

/* --------------------------------------------------- §5.2 typography scale */
const h1 = css.match(/h1\s*\{[^}]*font-size:\s*clamp\(([^)]+)\)/);
if (!h1) fail("type", "could not read the h1 clamp() rule");
else {
  const [minRaw, , maxRaw] = h1[1].split(",").map((s) => s.trim());
  const rem = (v) => (v.endsWith("rem") ? parseFloat(v) * 16 : parseFloat(v));
  const min = rem(minRaw);
  const max = rem(maxRaw);
  // Spec: desktop 48-64px, mobile ~34-42px.
  if (min < 30 || min > 44) fail("type", `h1 mobile floor ${min}px outside 30-44px`);
  else ok();
  if (max < 44 || max > 64) fail("type", `h1 desktop ceiling ${max}px outside 44-64px`);
  else ok();
}

/* ------------------------------------------------------ §5.4 section spacing */
const sectionPads = [...css.matchAll(/padding:\s*clamp\((\d+)px,[^,]+,\s*(\d+)px\)\s*0/g)];
if (!sectionPads.length) fail("spacing", "no section padding clamp() found");
for (const m of sectionPads) {
  const min = Number(m[1]);
  const max = Number(m[2]);
  if (min > 64) fail("spacing", `mobile section padding ${min}px exceeds 64px target`);
  else ok();
  if (max > 104) fail("spacing", `desktop section padding ${max}px exceeds 104px target`);
  else ok();
}

/* ------------------------------ §16 RTL: logical properties, no physical ones */
const physical = [...css.matchAll(/(?:margin|padding|border)-(?:left|right)\s*:/g)];
if (physical.length) fail("rtl", `${physical.length} physical left/right properties found`);
else ok();

/* ---------------------------------------------- §6 mandatory homepage order */
const REQUIRED = [
  ["hero", /class="hero hero--compact"/],
  ["credibility", /class="credibility-strip"/],
  ["services", /id="services"/],
  ["experience", /id="experience"/],
  ["delivery", /id="delivery"/],
  ["sectors", /id="sectors"/],
  ["founder", /id="founder"/],
  ["cta", /class="contact-section"/]
];
for (const locale of ["en", "fr", "ar", "ru"]) {
  const file = join(OUT, locale, "index.html");
  if (!existsSync(file)) { fail("architecture", `${file} missing`); continue; }
  const html = readFileSync(file, "utf8");
  let cursor = -1;
  for (const [name, re] of REQUIRED) {
    const at = html.search(re);
    if (at === -1) { fail("architecture", `/${locale}/: section "${name}" missing`); continue; }
    if (at < cursor) fail("architecture", `/${locale}/: section "${name}" is out of order`);
    else ok();
    cursor = at;
  }
  // Contact must be exposed in desktop navigation (§5.5).
  const nav = html.match(/<nav class="desktop-nav"[\s\S]*?<\/nav>/);
  if (!nav) fail("architecture", `/${locale}/: desktop nav not found`);
  else if (!nav[0].includes(`/${locale}/contact`))
    fail("architecture", `/${locale}/: Contact missing from desktop navigation`);
  else ok();
  // Header CTA must be project-oriented, not a tel: link (§5.5).
  const header = html.match(/<header[\s\S]*?<\/header>/);
  if (header && /class="button button--small"[^>]*href="tel:/.test(header[0]))
    fail("architecture", `/${locale}/: header CTA still uses a telephone link`);
  else ok();
}


/* ------------------- §7-§12 per-page information architecture is distinct */
const PAGE_CONTRACT = {
  "services": ["role-grid", "format-rows", "team-model-layout", "evidence-rows"],
  "owners-engineering-amo": ["situation-layout", "evidence-rows"],
  "electrical-mep-engineering": ["situation-layout", "team-model-layout", "evidence-rows"],
  "local-engineering-partner-morocco": ["situation-layout", "team-model-layout", "evidence-rows"],
  "sectors": ["evidence-rows"],
  "about": ["model-layout", "workflow-rows", "profile-layout"],
  "contact": ["what-to-send", "privacy-note"]
};
for (const locale of ["en", "fr", "ar", "ru"]) {
  for (const [route, required] of Object.entries(PAGE_CONTRACT)) {
    const file = join(OUT, locale, route, "index.html");
    if (!existsSync(file)) { fail("architecture", `${file} missing`); continue; }
    const html = readFileSync(file, "utf8");
    for (const cls of required) {
      if (html.includes(`"${cls}"`) || html.includes(`${cls} `) || html.includes(` ${cls}`)) ok();
      else fail("architecture", `/${locale}/${route}/: missing required block "${cls}"`);
    }
  }
}

/* --------------- §13 legal pages must not carry marketing hero actions */
for (const locale of ["en", "fr", "ar", "ru"]) {
  for (const route of ["legal-notice", "privacy-policy", "cookie-policy"]) {
    const file = join(OUT, locale, route, "index.html");
    if (!existsSync(file)) continue;
    const html = readFileSync(file, "utf8");
    if (/content-hero-actions/.test(html))
      fail("legal", `/${locale}/${route}/: reference page still renders hero CTAs`);
    else ok();
  }
}

/* ------------------- §17.3 no permanent-headcount or superlative claims */
const BANNED_COPY = [
  /\bpermanent (?:team|staff|employees)\b/i,
  /\bworld-class\b/i, /\bcutting-edge\b/i, /\bbest-in-class\b/i,
  /\bseamless\b/i, /\bunmatched\b/i, /\bguaranteed\b/i
];
for (const locale of ["en", "fr", "ar", "ru"]) {
  for (const route of ["", "services", "about", "contact", "experience"]) {
    const file = join(OUT, locale, route, "index.html");
    if (!existsSync(file)) continue;
    const text = readFileSync(file, "utf8").replace(/<[^>]+>/g, " ");
    for (const re of BANNED_COPY) {
      if (re.test(text)) fail("copy", `/${locale}/${route}/: banned marketing claim ${re}`);
      else ok();
    }
  }
}


/* ============================================================================
   Regression guards for the second review round. Each assertion below exists
   because the corresponding defect shipped once already.
   ========================================================================== */

/* Contact must be in the desktop nav on BOTH page types, and the header CTA
   must be a project action rather than a telephone link. */
for (const locale of ["en", "fr", "ar", "ru"]) {
  for (const route of ["", "services", "about", "experience", "sectors", "contact"]) {
    const file = join(OUT, locale, route, "index.html");
    if (!existsSync(file)) continue;
    const html = readFileSync(file, "utf8");
    const nav = html.match(/<nav class="desktop-nav"[\s\S]*?<\/nav>/);
    if (!nav) { fail("header", `/${locale}/${route}/: no desktop nav`); continue; }
    if (!nav[0].includes(`/${locale}/contact`))
      fail("header", `/${locale}/${route}/: Contact missing from desktop navigation`);
    else ok();
    const header = html.match(/<header[\s\S]*?<\/header>/);
    if (!header) { fail("header", `/${locale}/${route}/: no header`); continue; }
    const cta = header[0].match(/class="button button--small"[^>]*href="([^"]+)"/);
    if (!cta) fail("header", `/${locale}/${route}/: header CTA not found`);
    else if (cta[1].startsWith("tel:"))
      fail("header", `/${locale}/${route}/: header CTA is a telephone link`);
    else if (!cta[1].includes("/contact"))
      fail("header", `/${locale}/${route}/: header CTA does not lead to Contact (${cta[1]})`);
    else ok();
  }
}

/* Header height must stay inside the 72-76px desktop target, and the mobile
   menu must open flush with it. */
const headerHeight = css.match(/\.header-inner\s*\{[^}]*height:\s*(\d+)px/);
if (!headerHeight) fail("header", "could not read .header-inner height");
else {
  const h = Number(headerHeight[1]);
  if (h < 72 || h > 76) fail("header", `desktop header height ${h}px outside 72-76px`);
  else ok();
  const menuTop = css.match(/\.mobile-menu\[open\] nav\s*\{[^}]*top:\s*(\d+)px/);
  if (menuTop && Number(menuTop[1]) !== h)
    fail("header", `mobile menu top ${menuTop[1]}px does not match header height ${h}px`);
  else ok();
}

/* Ordinary H2 must not exceed the approved 34-48px desktop range. */
const h2 = css.match(/h2\s*\{[^}]*font-size:\s*clamp\(([^)]+)\)/);
if (!h2) fail("type", "could not read the h2 clamp() rule");
else {
  const parts = h2[1].split(",").map((v) => v.trim());
  const toPx = (v) => (v.endsWith("rem") ? parseFloat(v) * 16 : parseFloat(v));
  const max = toPx(parts[2]);
  if (max > 48) fail("type", `h2 ceiling ${max}px exceeds the 48px target`);
  else ok();
}

/* Old fixed card heights must not come back. */
for (const [re, msg] of [
  [/min-height:\s*355px/, "content cards back to 355px"],
  [/min-height:\s*340px/, "process cards back to 340px"],
  [/\.hero-media[^}]*min-height:\s*[1-9]\d{2}px/, "hero media has a large fixed height"]
]) {
  if (re.test(css)) fail("removed", msg);
  else ok();
}

/* Related experience must be selected per page, not sliced generically. */
const contentPage = existsSync("components/ContentPage.tsx")
  ? readFileSync("components/ContentPage.tsx", "utf8")
  : "";
if (/experienceRecords\.slice\(/.test(contentPage))
  fail("evidence", "related experience still uses a generic slice()");
else ok();

/* ...and the selection must actually differ between page types. */
const signatures = new Map();
for (const route of [
  "services",
  "owners-engineering-amo",
  "electrical-mep-engineering",
  "local-engineering-partner-morocco",
  "sectors"
]) {
  const file = join(OUT, "en", route, "index.html");
  if (!existsSync(file)) continue;
  const html = readFileSync(file, "utf8");
  const block = html.match(/<h2[^>]*>[^<]*<\/h2>\s*<p class="attribution-note"[\s\S]*?<\/ul>/);
  if (!block) { fail("evidence", `/en/${route}/: related-experience block not found`); continue; }
  const titles = [...block[0].matchAll(/<h3[^>]*>([^<]+)<\/h3>/g)].map((m) => m[1]).join("|");
  if (!titles) { fail("evidence", `/en/${route}/: no related projects rendered`); continue; }
  signatures.set(route, titles);
  ok();
}
const distinct = new Set(signatures.values());
if (signatures.size > 1 && distinct.size < 2)
  fail("evidence", "every page shows an identical related-experience set");
else ok();


/* No primary button may point at tel:. A telephone link does nothing visible
   when clicked on a desktop browser, so a CTA styled as the main action but
   wired to tel: reads as a broken button. Phone numbers stay clickable in the
   footer and contact block, where they are presented as a number, not a CTA. */
for (const locale of ["en", "fr", "ar", "ru"]) {
  for (const route of ["", "services", "experience", "about", "sectors", "contact",
                       "owners-engineering-amo", "electrical-mep-engineering",
                       "local-engineering-partner-morocco"]) {
    const file = join(OUT, locale, route, "index.html");
    if (!existsSync(file)) continue;
    const html = readFileSync(file, "utf8");
    const telButtons = [...html.matchAll(/<a class="button[^"]*"[^>]*href="(tel:[^"]*)"/g)];
    if (telButtons.length)
      fail("cta", `/${locale}/${route}/: primary button links to ${telButtons[0][1]}`);
    else ok();

    /* Every anchor must have a non-empty href, and every button a type. */
    for (const m of html.matchAll(/<a\b([^>]*)>/g)) {
      const href = m[1].match(/href="([^"]*)"/);
      if (!href || !href[1].trim())
        fail("cta", `/${locale}/${route}/: anchor with no href -> ${m[1].slice(0, 60)}`);
    }
    for (const m of html.matchAll(/<button\b([^>]*)>/g)) {
      if (!/type="(submit|button)"/.test(m[1]))
        fail("cta", `/${locale}/${route}/: button without type -> ${m[1].slice(0, 60)}`);
    }
    ok();
  }
}


/* ============================================================================
   Brand identity guards (branding implementation spec §14).
   ========================================================================== */
const BRAND_ASSETS = [
  "salimi-engineering-primary-navy.svg",
  "salimi-engineering-primary-white.svg",
  "salimi-engineering-horizontal-navy.svg",
  "salimi-engineering-mark-navy.svg",
  "salimi-engineering-mark-white.svg"
];
for (const asset of BRAND_ASSETS) {
  if (existsSync(join(OUT, "images", "brand", asset))) ok();
  else fail("brand", `approved asset missing from export: ${asset}`);
}
if (existsSync(join(OUT, "icon.svg"))) ok();
else fail("brand", "app icon (favicon) missing from export");

/* The favicon must be the compact mark, never the full wordmark. */
if (existsSync(join(OUT, "icon.svg"))) {
  const icon = readFileSync(join(OUT, "icon.svg"), "utf8");
  if (/SALIMI|ENGINEERING/.test(icon.replace(/<title[\s\S]*?<\/title>|<desc[\s\S]*?<\/desc>/g, "")))
    fail("brand", "favicon contains the full wordmark; it must be the compact mark only");
  else ok();
}

for (const locale of ["en", "fr", "ar", "ru"]) {
  for (const route of ["", "about", "contact", "services", "experience"]) {
    const file = join(OUT, locale, route, "index.html");
    if (!existsSync(file)) continue;
    const html = readFileSync(file, "utf8");

    /* Header and footer wordmarks are present and reference approved assets. */
    const logos = [...html.matchAll(/<img src="\/images\/brand\/([^"]+)"/g)].map((m) => m[1]);
    /* The header sits on Porcelain and the footer on Navy, so each takes the
       wordmark tone that is legible against it. A single tone on both would
       leave one of them invisible. */
    if (!logos.includes("salimi-engineering-primary-navy.svg"))
      fail("brand", `/${locale}/${route}/: header must use the navy wordmark on the light header`);
    else ok();
    if (!logos.includes("salimi-engineering-primary-white.svg"))
      fail("brand", `/${locale}/${route}/: footer must use the white reverse wordmark`);
    else ok();

    /* Restraint: exactly two brand marks per page - header and footer. No
       decorative logos in hero, cards, founder or contact sections. */
    if (logos.length !== 2)
      fail("brand", `/${locale}/${route}/: ${logos.length} brand marks rendered, expected 2`);
    else ok();

    /* Legacy text-built logo must not come back. */
    if (/<strong>SALIMI<\/strong>/.test(html) || /brand--footer/.test(html))
      fail("brand", `/${locale}/${route}/: legacy text-built logo markup still renders`);
    else ok();

    /* The link around the logo carries the accessible name; the image must not
       announce the brand a second time. */
    const brandLink = html.match(/<a[^>]*class="brand"[^>]*>/);
    if (!brandLink || !/aria-label="[^"]*Salimi Engineering"/.test(brandLink[0]))
      fail("brand", `/${locale}/${route}/: brand link has no accessible name`);
    else ok();
    for (const m of html.matchAll(/<img src="\/images\/brand\/[^"]+"([^>]*)>/g)) {
      if (!/aria-hidden="true"/.test(m[1]) || !/alt=""/.test(m[1]))
        fail("brand", `/${locale}/${route}/: brand image is not hidden from assistive tech`);
      else ok();
    }
  }
}

/* Arabic must never mirror the artwork. */
const rtlMirrors = css.match(/html\[dir="rtl"\][^{]*\{[^}]*transform:\s*scaleX\(-1\)/g) ?? [];
for (const rule of rtlMirrors) {
  if (/\.brand/.test(rule))
    fail("brand", "an RTL rule mirrors the brand logo");
  else ok();
}
if (/\.brand-logo[^{]*\{[^}]*scaleX\(-1\)/.test(css))
  fail("brand", ".brand-logo is mirrored");
else ok();

/* Header height must not have grown to fit the logo. */
const headerAfterLogo = css.match(/\.header-inner\s*\{[^}]*height:\s*(\d+)px/);
if (headerAfterLogo && Number(headerAfterLogo[1]) !== 74)
  fail("brand", `header height changed to ${headerAfterLogo[1]}px; must stay 74px`);
else ok();

/* Logo widths must stay inside the approved ranges. */
const widthOf = (selector) => {
  const m = css.match(new RegExp(`\\${selector}\\s*\\{[^}]*width:\\s*(\\d+)px`));
  return m ? Number(m[1]) : null;
};
const headerW = widthOf(".brand-logo--header");
if (headerW === null) fail("brand", "header logo width not declared");
else if (headerW < 136 || headerW > 146)
  fail("brand", `header logo ${headerW}px outside the approved 136-146px`);
else ok();
const footerW = widthOf(".brand-logo--footer");
if (footerW === null) fail("brand", "footer logo width not declared");
else if (footerW < 160 || footerW > 180)
  fail("brand", `footer logo ${footerW}px outside the approved 160-180px`);
else ok();


/* ---- Brand correction pass v1.1: master geometry and dark header --------- */
const brandFile = (n) => join("public", "images", "brand", n);
const readBrand = (n) => (existsSync(brandFile(n)) ? readFileSync(brandFile(n), "utf8") : "");

for (const n of ["salimi-engineering-primary-navy.svg", "salimi-engineering-primary-white.svg"]) {
  const svg = readBrand(n);
  if (!svg) { fail("brand", `${n} missing`); continue; }
  if (!svg.includes('viewBox="12 10 470 158"'))
    fail("brand", `${n}: viewBox is not the corrected "12 10 470 158"`);
  else ok();
  if (!svg.includes("matrix(2.04917 0 0 1.53098 -170.5876 -89.2195)"))
    fail("brand", `${n}: ENGINEERING group is missing the approved transform`);
  else ok();
}

const horiz = readBrand("salimi-engineering-horizontal-navy.svg");
if (!horiz) fail("brand", "horizontal master missing");
else {
  if (!horiz.includes('viewBox="0 0 720 100"')) fail("brand", "horizontal viewBox not 0 0 720 100");
  else ok();
  if (!horiz.includes('<rect x="370"')) fail("brand", "horizontal divider is not at x=370");
  else ok();
  if (!horiz.includes("matrix(1.35 0 0 1.25 -296.6 -20)"))
    fail("brand", "horizontal ENGINEERING transform missing");
  else ok();
  if (!horiz.includes("translate(4 -13) scale(.72)"))
    fail("brand", "horizontal SALIMI group transform changed");
  else ok();
}

for (const n of ["salimi-engineering-mark-navy.svg", "salimi-engineering-mark-white.svg"]) {
  const svg = readBrand(n);
  if (!svg.includes("M80 17 H42") || !svg.includes("C81 88 72 95 58 95"))
    fail("brand", `${n}: compact mark is not the approved architectural S geometry`);
  else ok();
}
if (existsSync("app/icon.svg") && readFileSync("app/icon.svg", "utf8") === readBrand("salimi-engineering-mark-navy.svg")) ok();
else fail("brand", "app/icon.svg is not byte-identical to the navy mark");

/* The sticky header is Porcelain, not Navy. A permanently dark bar on every
   page was the largest single contributor to the site reading as heavy; the
   hairline border below now does the separating work. */
if (/\.site-header\s*\{[^}]*background:\s*rgba\(247,\s*245,\s*241/.test(css)) ok();
else fail("brand", "header background is not Porcelain");

const mobileHeader = css.match(/@media \(max-width: 800px\)[\s\S]{0,240}?\.header-inner\s*\{[^}]*height:\s*(\d+)px/);
if (mobileHeader && Number(mobileHeader[1]) !== 70)
  fail("brand", `mobile header height ${mobileHeader[1]}px; must stay 70px`);
else ok();

const mobileLogo = css.match(/@media \(max-width: 500px\)[\s\S]*?\.brand-logo--header\s*\{[^}]*width:\s*(\d+)px/);
if (!mobileLogo) fail("brand", "mobile logo width not declared");
else if (Number(mobileLogo[1]) < 118 || Number(mobileLogo[1]) > 130)
  fail("brand", `mobile logo ${mobileLogo[1]}px outside the approved 118-130px`);
else ok();

for (const f of ["components/HomePage.tsx", "components/ContentPage.tsx"]) {
  if (!existsSync(f)) continue;
  if (/aria-label="Salimi Engineering — Home"/.test(readFileSync(f, "utf8")))
    fail("brand", `${f}: hardcoded English-only brand aria-label remains`);
  else ok();
}
for (const locale of ["fr", "ar", "ru"]) {
  const file = join(OUT, locale, "index.html");
  if (!existsSync(file)) continue;
  if (/aria-label="[^"]*— Salimi Engineering"/.test(readFileSync(file, "utf8"))) ok();
  else fail("brand", `/${locale}/: brand link label is not localised`);
}


/* Light/dark balance. The brand book (Doc 06 §5.5) asks for 55-65% Porcelain
   and White against 20-30% Ink Navy. The site had drifted to 40-50% dark
   surfaces, which is why it read as gloomy. This guard keeps the ratio from
   creeping back one dark section at a time. */
const DARK_SURFACE = ["hero hero--compact", "contact-section", "site-footer",
                      "content-section--ink", "page-cta"];
let darkTotal = 0;
let blockTotal = 0;
for (const route of ["", "services", "about", "experience", "contact", "sectors",
                     "owners-engineering-amo", "electrical-mep-engineering"]) {
  const file = join(OUT, "en", route, "index.html");
  if (!existsSync(file)) continue;
  const html = readFileSync(file, "utf8");
  const blocks = [...html.matchAll(/<(?:section|header|footer)[^>]*class="([^"]*)"/g)].map((m) => m[1]);
  const dark = blocks.filter((c) => DARK_SURFACE.some((k) => c.includes(k)));
  blockTotal += blocks.length;
  darkTotal += dark.length;
  if (blocks.length && dark.length / blocks.length > 0.4)
    fail("balance", `/en/${route}/: ${Math.round(dark.length / blocks.length * 100)}% dark surfaces, over the 40% per-page ceiling`);
  else ok();
}
const darkShare = blockTotal ? darkTotal / blockTotal : 0;
if (darkShare > 0.32)
  fail("balance", `site is ${Math.round(darkShare * 100)}% dark surfaces, above the 20-30% target`);
else ok();

/* Sand is an accent on dark only: it fails contrast on Porcelain (1.9:1). */
for (const locale of ["en", "fr", "ar", "ru"]) {
  for (const route of ["", "services", "about"]) {
    const file = join(OUT, locale, route, "index.html");
    if (!existsSync(file)) continue;
    const html = readFileSync(file, "utf8");
    for (const m of html.matchAll(/<section class="([^"]*)"([\s\S]*?)<\/section>/g)) {
      const onDark = DARK_SURFACE.some((k) => m[1].includes(k));
      if (!onDark && /eyebrow--sand/.test(m[2]))
        fail("contrast", `/${locale}/${route}/: sand eyebrow on a light surface (1.9:1)`);
    }
    ok();
  }
}


/* ============================================================================
   Image policy. No image anywhere may function as evidence of work performed.
   Photorealistic imagery was removed entirely: the only pictures on the site
   are the brand wordmark, two real photographs of a real person, and abstract
   technical drawings that make no claim about any project.
   ========================================================================== */
const ALLOWED_IMAGE_DIRS = ["/images/brand/", "/images/people/", "/images/graphics/"];
for (const locale of ["en", "fr", "ar", "ru"]) {
  for (const route of ["", "services", "about", "experience", "contact", "sectors",
                       "owners-engineering-amo", "electrical-mep-engineering",
                       "local-engineering-partner-morocco"]) {
    const file = join(OUT, locale, route, "index.html");
    if (!existsSync(file)) continue;
    const html = readFileSync(file, "utf8");
    for (const m of html.matchAll(/<img src="([^"]+)"/g)) {
      const src = m[1];
      if (!ALLOWED_IMAGE_DIRS.some((d) => src.startsWith(d)))
        fail("imagery", `/${locale}/${route}/: image outside the allowed set -> ${src}`);
      else ok();
    }
    /* The experience page carries no imagery at all beyond the brand. Even a
       hero illustration sits above project records and invites the reader to
       connect the two, which is the misattribution the page exists to avoid. */
    if (route === "experience") {
      const nonBrand = [...html.matchAll(/<img src="([^"]+)"/g)]
        .map((m) => m[1])
        .filter((src) => !src.startsWith("/images/brand/"));
      if (nonBrand.length)
        fail("imagery", `/${locale}/experience/: page carries imagery -> ${nonBrand.join(", ")}`);
      else ok();
    }
  }
}

/* Photorealistic imagery must not return. The removed AI files were SVG
   wrappers around embedded raster data, so any SVG carrying a data:image
   payload is rejected. Raster files are allowed only as approved line
   illustrations, listed explicitly so a photograph cannot be dropped in
   under a neutral filename. */
const APPROVED_RASTER = new Set([
  "development-masterplan.webp",
  "engineering-scope-sheet.webp",
  "plant-room-services.webp",
  "project-environments.webp",
  "project-documentation.webp",
  "industrial-plant-systems.webp",
  "production-facility.webp"
]);
for (const dir of ["graphics", "brand"]) {
  const base = join(OUT, "images", dir);
  if (!existsSync(base)) continue;
  for (const file of readdirSync(base)) {
    if (file.endsWith(".svg")) {
      if (/data:image\//.test(readFileSync(join(base, file), "utf8")))
        fail("imagery", `${dir}/${file} embeds raster image data`);
      else ok();
    } else if (!APPROVED_RASTER.has(file)) {
      fail("imagery", `${dir}/${file} is a raster file outside the approved illustration set`);
    } else ok();
  }
}

/* The confidentiality statement and the attribution standard must be present
   on every localised experience page. */
for (const locale of ["en", "fr", "ar", "ru"]) {
  const file = join(OUT, locale, "experience", "index.html");
  if (!existsSync(file)) continue;
  const html = readFileSync(file, "utf8");
  if (!/class="container confidentiality"/.test(html))
    fail("imagery", `/${locale}/experience/: confidentiality statement missing`);
  else ok();
  if (!/class="section-intro attribution-note"/.test(html))
    fail("imagery", `/${locale}/experience/: attribution statement missing`);
  else ok();
}


/* Header legibility. When the header moved from Navy to Porcelain the nav
   kept its reverse colours: links were #c4ced5 at 1.47:1 and the hover was
   pure white at 1.09:1 - invisible, and worse under the cursor than at rest.
   These assertions pin the light-header treatment. */
const contrast = (hex, bg) => {
  const lum = (h) => {
    const v = [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16) / 255)
      .map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
    return 0.2126 * v[0] + 0.7152 * v[1] + 0.0722 * v[2];
  };
  const [a, b] = [lum(hex), lum(bg)].sort((x, y) => y - x);
  return (a + 0.05) / (b + 0.05);
};
const TOKENS = { "--steel": "#53616d", "--ink": "#0f1e33", "--copper": "#7c4e2f", "--white": "#ffffff" };
const HEADER_BG = "#f7f5f1";
const navRule = css.match(/\.desktop-nav a\s*\{[^}]*color:\s*([^;]+);/);
if (!navRule) fail("header", "cannot read .desktop-nav a colour");
else {
  const raw = navRule[1].trim();
  const hex = raw.startsWith("#") ? raw : TOKENS[raw.replace(/var\(|\)/g, "").trim()];
  if (!hex) fail("header", `nav link colour ${raw} is not a known token`);
  else if (contrast(hex, HEADER_BG) < 4.5)
    fail("header", `nav link ${hex} is ${contrast(hex, HEADER_BG).toFixed(2)}:1 on the header, under 4.5:1`);
  else ok();
}
const navHover = css.match(/\.desktop-nav a:hover\s*\{[^}]*color:\s*([^;]+);/);
if (navHover) {
  const raw = navHover[1].trim();
  const hex = raw.startsWith("#") ? raw : TOKENS[raw.replace(/var\(|\)/g, "").trim()];
  if (hex && contrast(hex, HEADER_BG) < 4.5)
    fail("header", `nav hover ${hex} is ${contrast(hex, HEADER_BG).toFixed(2)}:1 - links vanish under the cursor`);
  else ok();
}

/* The SE / PAGE / MOROCCO placeholder panel is gone. It read as a missing
   image rather than as a design element. */
if (/hero-drawing/.test(css)) fail("imagery", "hero-drawing placeholder styles still present");
else ok();
for (const locale of ["en", "fr", "ar", "ru"]) {
  for (const route of ["experience", "about", "legal-notice"]) {
    const file = join(OUT, locale, route, "index.html");
    if (!existsSync(file)) continue;
    if (/hero-drawing/.test(readFileSync(file, "utf8")))
      fail("imagery", `/${locale}/${route}/: placeholder panel still rendered`);
    else ok();
  }
}


/* The WhatsApp link in internal page heroes must not use the reverse colour:
   those heroes are Porcelain, so white text is invisible. */
for (const locale of ["en", "fr", "ar", "ru"]) {
  for (const route of ["services", "about", "sectors", "owners-engineering-amo"]) {
    const file = join(OUT, locale, route, "index.html");
    if (!existsSync(file)) continue;
    const hero = readFileSync(file, "utf8").match(/<section class="content-hero[\s\S]*?<\/section>/);
    if (hero && /text-link--light/.test(hero[0]))
      fail("contrast", `/${locale}/${route}/: reverse-coloured link on the light hero`);
    else ok();
  }
}

/* The contact page must not offer a call-to-action that navigates to itself. */
for (const locale of ["en", "fr", "ar", "ru"]) {
  const file = join(OUT, locale, "contact", "index.html");
  if (!existsSync(file)) continue;
  const main = readFileSync(file, "utf8").split("</header>")[1] ?? "";
  if (/class="button[^"]*"[^>]*href="\/[a-z]{2}\/contact\/"/.test(main))
    fail("cta", `/${locale}/contact/: page links to itself from a primary button`);
  else ok();
}

console.log(`\nDesign-metric QA — ${checks} assertions passed`);
console.log("  note: browser rendering NOT executed (browser download blocked in this environment)");
if (failures.length) {
  console.error(`\n${failures.length} FAILURE(S):`);
  for (const f of failures) console.error(`  ✗ ${f}`);
  process.exit(1);
}
console.log("\nAll design-metric checks passed.\n");
