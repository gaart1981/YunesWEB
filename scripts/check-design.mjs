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
import { readFileSync, existsSync } from "node:fs";
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

/* ------------------------------ §18.2 illustrative imagery must be labelled */
for (const locale of ["en", "fr", "ar", "ru"]) {
  const file = join(OUT, locale, "experience", "index.html");
  if (!existsSync(file)) continue;
  const html = readFileSync(file, "utf8");
  const imgs = (html.match(/class="project-photo"/g) ?? []).length;
  const caps = (html.match(/<figcaption>/g) ?? []).length;
  if (imgs && caps < imgs)
    fail("imagery", `/${locale}/experience/: ${imgs} project visuals but ${caps} captions`);
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

console.log(`\nDesign-metric QA — ${checks} assertions passed`);
console.log("  note: browser rendering NOT executed (browser download blocked in this environment)");
if (failures.length) {
  console.error(`\n${failures.length} FAILURE(S):`);
  for (const f of failures) console.error(`  ✗ ${f}`);
  process.exit(1);
}
console.log("\nAll design-metric checks passed.\n");
