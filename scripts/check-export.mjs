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
const LOCALES = ["en", "fr", "ar", "ru", "de", "es"];
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

/* ------------------------- 22.6 contact form: delivery-consistent or absent */
/* The form is currently withheld pending Netlify Forms configuration. This
   check no longer requires a form to exist - it requires that whatever exists
   can actually deliver, and that the contact page is never a dead end.
   Whichever state the site is in, the failure mode it guards is the same: a
   form that accepts a submission and silently drops it. */
const blueprintPath = join(OUT, "__forms.html");
const contactPages = LOCALES
  .map((locale) => ({ locale, file: pageFor(locale, "contact") }))
  .filter(({ file }) => existsSync(file))
  .map(({ locale, file }) => ({ locale, file, html: readFileSync(file, "utf8") }));

const withForm = contactPages.filter(({ html }) => /<form[\s>]/.test(html));

if (withForm.length === 0) {
  /* No form rendered: the blueprint must not be left behind, or Netlify
     registers a form the site does not show. */
  if (existsSync(blueprintPath))
    fail("form", "public/__forms.html remains although no form is rendered");
  else ok();
  notes.push("contact form withheld — delivery not configured");
} else {
  if (withForm.length !== contactPages.length)
    fail("form", "the form renders in some locales but not others");
  else ok();

  if (!existsSync(blueprintPath)) {
    fail("form", "a form is rendered but public/__forms.html is missing, so Netlify cannot detect it");
  } else {
    const blueprint = readFileSync(blueprintPath, "utf8");
    const names = (html) =>
      new Set([...html.matchAll(/<(?:input|select|textarea)[^>]*name="([^"]+)"/g)].map((m) => m[1]));
    const blueprintNames = names(blueprint);
    if (!blueprint.includes('name="project-enquiry"'))
      fail("form", "blueprint form-name is not project-enquiry");
    else ok();

    for (const { file, html } of withForm) {
      const form = html.match(/<form[\s\S]*?<\/form>/);
      if (!form) continue;
      if (!form[0].includes('name="project-enquiry"'))
        fail("form", `${file}: form name is not project-enquiry`);
      else ok();
      if (!/data-netlify="true"/.test(form[0]))
        fail("form", `${file}: missing data-netlify attribute`);
      else ok();
      for (const field of names(form[0])) {
        if (!blueprintNames.has(field))
          fail("form", `${file}: field "${field}" is not declared in __forms.html`);
        else ok();
      }
      const labels = (form[0].match(/<label/g) ?? []).length;
      if (labels < 4) fail("form", `${file}: only ${labels} labels found on the form`);
      else ok();
    }
  }
}

/* Whether or not a form exists, the contact page must offer a working route. */
for (const { file, html } of contactPages) {
  const reachable =
    /href="mailto:/.test(html) && /href="tel:/.test(html) && /wa\.me\//.test(html);
  if (!reachable) fail("form", `${file}: no working contact route on the contact page`);
  else ok();
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

/* ---------------------------------------------- launch indexing policy */
/* The site is live. These assertions replace the pre-launch ones: they now
   guard the opposite failure - shipping a change that silently de-indexes
   the site, which is far harder to notice than a blocked launch. */
const robots = join(OUT, "robots.txt");
if (existsSync(robots)) {
  const body = readFileSync(robots, "utf8");
  notes.push(`robots.txt: ${body.replace(/\s+/g, " ").trim().slice(0, 120)}`);
  if (/Disallow:\s*\/\s*$/m.test(body))
    fail("indexing", "robots.txt still blocks the whole site");
  else ok();
  for (const path of ["/editjson/", "/api/"]) {
    if (!body.includes(path)) fail("indexing", `robots.txt no longer protects ${path}`);
    else ok();
  }
  if (!/Sitemap:/i.test(body)) fail("indexing", "robots.txt does not declare the sitemap");
  else ok();
}

for (const page of pages) {
  if (/name="robots"[^>]*noindex/.test(page.html))
    fail("indexing", `${page.file}: page is noindex`);
  else ok();
  if (!/<link rel="canonical" href="https:\/\//.test(page.html))
    fail("indexing", `${page.file}: canonical is missing or not absolute`);
  else ok();
  if (!/hrefLang="x-default"/.test(page.html))
    fail("indexing", `${page.file}: hreflang cluster incomplete`);
  else ok();
  if (!/application\/ld\+json/.test(page.html))
    fail("indexing", `${page.file}: no structured data`);
  else ok();
  if (!/property="og:image"/.test(page.html))
    fail("indexing", `${page.file}: no Open Graph image`);
  else ok();
}

const sitemapFile = join(OUT, "sitemap.xml");
if (!existsSync(sitemapFile)) fail("indexing", "sitemap.xml missing from the export");
else {
  const xml = readFileSync(sitemapFile, "utf8");
  const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  if (urls.length !== pages.length)
    fail("indexing", `sitemap lists ${urls.length} URLs, expected ${pages.length}`);
  else ok();
  for (const bad of ["/editjson", "/api/", "/preview"]) {
    if (urls.some((u) => u.includes(bad)))
      fail("indexing", `sitemap exposes ${bad}`);
    else ok();
  }
  notes.push(`sitemap.xml: ${urls.length} URLs`);
}

for (const asset of ["llms.txt", "ai/company-profile.json"]) {
  if (existsSync(join(OUT, asset))) ok();
  else fail("indexing", `${asset} missing from the export`);
}

/* The founder-attribution rule must survive into the machine-readable layer:
   an AI summary that drops it is the failure mode Doc 13 §13 describes. */
if (existsSync(join(OUT, "ai", "company-profile.json"))) {
  const profile = JSON.parse(readFileSync(join(OUT, "ai", "company-profile.json"), "utf8"));
  if (!profile.experienceAttribution?.statement)
    fail("truth", "AI profile omits the founder-attribution statement");
  else ok();
}
if (existsSync(join(OUT, "llms.txt"))) {
  const llms = readFileSync(join(OUT, "llms.txt"), "utf8");
  if (!/prior professional experience/i.test(llms))
    fail("truth", "llms.txt omits the founder-attribution statement");
  else ok();
}

/* ------------------------------------------------------------------ report */
console.log(`\nStatic export QA — ${pages.length} pages, ${checks} assertions passed`);
for (const note of notes) console.log(`  note: ${note}`);

if (failures.length) {
  console.error(`\n${failures.length} FAILURE(S):`);
  for (const f of failures) console.error(`  ✗ ${f}`);
  process.exit(1);
}
console.log("\nAll export checks passed.\n");
