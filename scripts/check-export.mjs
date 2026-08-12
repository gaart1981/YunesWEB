#!/usr/bin/env node
/**
 * Static export QA for the public site.
 *
 * Covers the checks required by YUNESWEB_TRUST_REDESIGN_TECHNICAL_SPEC.md §22:
 *   22.2 static route existence
 *   22.3 internal link integrity
 *   22.4 media path integrity
 *   22.5 locale consistency / equivalent routes
 *   22.6 contact form structure vs the Netlify detection blueprint
 *
 * Runs against the built `out/` directory. No browser required, so it works in
 * restricted environments where Playwright cannot download a browser.
 *
 * Usage: node scripts/check-export.mjs [outDir]
 */
import { readFileSync, existsSync, readdirSync, statSync } from "node:fs";
import { join, posix } from "node:path";

const OUT = process.argv[2] ?? "out";
const LOCALES = ["en", "fr", "ar", "ru"];
const ROUTES = [
  "",
  "services",
  "owners-engineering-amo",
  "electrical-mep-engineering",
  "local-engineering-partner-morocco",
  "sectors",
  "experience",
  "about",
  "contact",
  "legal-notice",
  "privacy-policy",
  "cookie-policy"
];

const failures = [];
const notes = [];
let checks = 0;

const fail = (group, message) => failures.push(`[${group}] ${message}`);
const ok = () => { checks += 1; };

if (!existsSync(OUT)) {
  console.error(`FATAL: export directory "${OUT}" not found. Run \`npm run build\` first.`);
  process.exit(1);
}

const pageFor = (locale, route) =>
  join(OUT, locale, route, "index.html").replace(/\/+/g, "/");

/* ---------------------------------------------- 22.2 static route existence */
const pages = [];
for (const locale of LOCALES) {
  for (const route of ROUTES) {
    const file = pageFor(locale, route);
    if (!existsSync(file)) {
      fail("routes", `missing page: /${locale}/${route}`);
      continue;
    }
    ok();
    pages.push({ locale, route, file, html: readFileSync(file, "utf8") });
  }
}

/* --------------------------------------- collect every exported page path */
const exported = new Set();
(function walk(dir, prefix = "") {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) walk(full, posix.join(prefix, entry));
    else if (entry === "index.html") exported.add("/" + prefix + "/");
    else if (entry.endsWith(".html")) exported.add("/" + posix.join(prefix, entry));
  }
})(OUT);

const assetExists = (urlPath) => {
  const clean = decodeURIComponent(urlPath.split(/[?#]/)[0]);
  if (existsSync(join(OUT, clean))) return true;
  return existsSync(join(OUT, clean, "index.html"));
};

/* ------------------------------------------- 22.3 internal link integrity */
for (const page of pages) {
  const hrefs = [...page.html.matchAll(/href="([^"]+)"/g)].map((m) => m[1]);
  for (const href of hrefs) {
    if (/^(mailto:|tel:|https?:)/i.test(href)) {
      // External protocols are not resolved, but must not be empty.
      const value = href.replace(/^(mailto:|tel:)/i, "").trim();
      if (!value) fail("links", `${page.file}: empty ${href}`);
      else ok();
      continue;
    }
    if (href.startsWith("#") || href.startsWith("data:")) continue;
    if (!href.startsWith("/")) continue;
    if (href.startsWith("/_next/")) { ok(); continue; }
    const target = href.endsWith("/") ? href : `${href}/`;
    if (exported.has(target) || assetExists(href)) ok();
    else fail("links", `${page.file}: broken internal link -> ${href}`);
  }
}

/* ----------------------------------------------- 22.4 media path integrity */
for (const page of pages) {
  const srcs = [...page.html.matchAll(/<img[^>]+src="([^"]+)"/g)].map((m) => m[1]);
  for (const src of srcs) {
    if (!src.startsWith("/")) continue;
    if (assetExists(src)) ok();
    else fail("media", `${page.file}: missing image asset -> ${src}`);
  }
}

/* ------------------------------------------------ 22.5 locale consistency */
for (const page of pages) {
  const expectedDir = page.locale === "ar" ? "rtl" : "ltr";
  if (!page.html.includes(`lang="${page.locale}"`))
    fail("locale", `${page.file}: missing lang="${page.locale}"`);
  else ok();
  if (!page.html.includes(`dir="${expectedDir}"`))
    fail("locale", `${page.file}: expected dir="${expectedDir}"`);
  else ok();

  // Every locale must be reachable from the switcher on every page.
  for (const other of LOCALES) {
    if (!page.html.includes(`href="/${other}/`))
      fail("locale", `${page.file}: language switcher missing ${other}`);
    else ok();
  }
}

/* --------------------------------- 22.6 contact form structure vs blueprint */
const blueprintPath = join(OUT, "__forms.html");
if (!existsSync(blueprintPath)) {
  fail("form", "public/__forms.html blueprint is missing from the export");
} else {
  const blueprint = readFileSync(blueprintPath, "utf8");
  const names = (html) =>
    new Set([...html.matchAll(/<(?:input|select|textarea)[^>]*name="([^"]+)"/g)].map((m) => m[1]));
  const blueprintNames = names(blueprint);
  if (!blueprint.includes('name="project-enquiry"'))
    fail("form", "blueprint form-name is not project-enquiry");
  else ok();

  for (const locale of LOCALES) {
    const file = pageFor(locale, "contact");
    if (!existsSync(file)) continue;
    const html = readFileSync(file, "utf8");
    const form = html.match(/<form[\s\S]*?<\/form>/);
    if (!form) { fail("form", `${file}: no <form> rendered`); continue; }
    if (!form[0].includes('name="project-enquiry"'))
      fail("form", `${file}: form name is not project-enquiry`);
    else ok();
    if (!/data-netlify="true"/.test(form[0]))
      fail("form", `${file}: missing data-netlify attribute`);
    else ok();

    const rendered = names(form[0]);
    for (const field of rendered) {
      if (!blueprintNames.has(field))
        fail("form", `${file}: field "${field}" is not declared in __forms.html`);
      else ok();
    }
    // Labels must be associated for accessibility (§19).
    const labels = (form[0].match(/<label/g) ?? []).length;
    if (labels < 4) fail("form", `${file}: only ${labels} labels found on the form`);
    else ok();
  }
}

/* ------------------------------------------------------ structural sanity */
for (const page of pages) {
  const h1 = (page.html.match(/<h1[\s>]/g) ?? []).length;
  if (h1 !== 1) fail("a11y", `${page.file}: expected exactly one <h1>, found ${h1}`);
  else ok();
  if (!page.html.includes('class="skip-link"'))
    fail("a11y", `${page.file}: skip link missing`);
  else ok();
  if (!/<main[\s>]/.test(page.html)) fail("a11y", `${page.file}: no <main> landmark`);
  else ok();
}

/* ------------------------------------------- truth rules: canonical email */
const LEGACY = ["info@edsmaroc.com", "hello@salimiengineering.ma"];
for (const page of pages) {
  for (const legacy of LEGACY) {
    if (page.html.includes(legacy))
      fail("truth", `${page.file}: legacy address ${legacy} is rendered`);
  }
}
notes.push(`canonical email check ran across ${pages.length} pages`);

/* ------------------------------------------ indexing policy must not drift */
const robots = join(OUT, "robots.txt");
if (existsSync(robots)) {
  const body = readFileSync(robots, "utf8");
  notes.push(`robots.txt: ${body.replace(/\s+/g, " ").trim()}`);
  if (!/Disallow:\s*\//.test(body))
    fail("indexing", "robots.txt no longer disallows crawling — pre-launch policy changed");
  else ok();
}
const homeMeta = pages.find((p) => p.locale === "en" && p.route === "");
if (homeMeta && !/name="robots"[^>]*noindex/.test(homeMeta.html))
  fail("indexing", "page-level noindex missing — pre-launch policy changed");
else ok();

/* ------------------------------------------------------------------ report */
console.log(`\nStatic export QA — ${pages.length} pages, ${checks} assertions passed`);
for (const note of notes) console.log(`  note: ${note}`);

if (failures.length) {
  console.error(`\n${failures.length} FAILURE(S):`);
  for (const f of failures) console.error(`  ✗ ${f}`);
  process.exit(1);
}
console.log("\nAll export checks passed.\n");
