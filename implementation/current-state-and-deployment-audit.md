# Current-State and Deployment Audit — Salimi Engineering Website

**Type:** Independent, evidence-based audit. Audit-only — no production code, dependencies, configuration or content were modified.

---

## 1. Executive conclusion

**Does a production site exist?** **Cannot be confirmed.** No production URL, Netlify site ID, or deploy identifier exists anywhere in the repository, in any implementation document, or in any prior report. A repository-wide search for `netlify.app`, `NETLIFY_SITE` and `site_id` across all source, configuration and documentation returned **zero results**.

**Is it publicly accessible?** **Unverifiable from this audit.** No Netlify API or dashboard access was available, and no candidate URL was supplied.

**Why can the owner not open it?** The evidence points away from the code and toward deployment/communication. Specifically:

- The application **builds successfully** — 39 routes prerendered, TypeScript passes cleanly.
- Netlify **fully supports** both the declared Next.js 16 and Node 24. Neither is a blocker.
- **No production address has ever been recorded or communicated.** The claim in `/implementation/repository-assessment.md` that "Netlify is reported by the project owner as already connected" is an *unverified owner report*, not evidence. No deploy has ever been evidenced.

The most probable root causes are, in order: **(21) an invalid or never-communicated production URL**, **(2) only a deploy preview existing**, or **(no Netlify site created at all)**. Causes 5–19 cannot be excluded without dashboard access.

**Implementation maturity:** Early Phase 3 of 8. A working multilingual shell with genuine translations and a correct colour system — but no content architecture, no editor, no validation, no tests, and a contact form that **cannot receive submissions**.

**Recommended disposition:** **Partially refactor.** The visual and RTL foundation is genuinely sound and worth keeping. The content architecture, routing model and forms layer must be rebuilt.

---

## 2. Audit baseline

| Item | Value |
|---|---|
| Audit date | 2026-08-04 |
| Repository | `gaart1981/YunesWEB` (public — confirmed via GitHub metadata `repository_public: true`) |
| Default branch | `main` |
| Audited commit | `4396f430ff82565f4c31d0ac767fa9272901c086` — matches the stated baseline |
| Other branches | `docs/add-claude-md`, `feat/foundation-preview`, `feat/full-public-site` (identical to `main`; already merged) |
| Open pull requests | **Not verifiable** — GitHub API rate-limited unauthenticated; no PR data retrieved |
| Netlify project | **Unknown — not recorded anywhere** |
| Production URL | **Unknown — not recorded anywhere** |
| Deploy-preview URL | **Unknown — not recorded anywhere** |
| Production deploy ID | **Unknown — no Netlify access** |
| Deployed commit SHA | **Unknown — no Netlify access** |
| Canonical domain in specs | `salimiengineering.com` (33 references across `/source_docs`) — **ownership and DNS unverified** |

---

## 3. Current development stage

Measured against the eight phases in `/source_docs/16` §7. No percentages are used, because no defined calculation method exists.

| Phase | Status | Evidence |
|---|---|---|
| Phase 0 — Repository inspection | Complete | `repository-assessment.md`, `source-docs-review.md` exist |
| Phase 1 — Architecture foundation | **Partial** | Stack initialised and builds; **no schemas, no validation scripts, no content loader, no test foundation** |
| Phase 2 — Design system | **Partial** | Tokens and palette correct; **no component library** — two monolithic page components instead |
| Phase 3 — Public pages | **Partial** | All 12 page types route and render; **blueprints not followed**, no breadcrumbs, no 404, no structured data |
| Phase 4 — JSON editor | **Not started** | No `/editjson`, no `netlify/functions/` |
| Phase 5 — Contact and analytics | **Not started** | Form markup exists but cannot deliver; no analytics |
| Phase 6 — SEO and AI layer | **Not started** | No sitemap, no JSON-LD, no `llms.txt`, no AI profile |
| Phase 7 — Quality | **Not started** | Zero tests of any kind |
| Phase 8 — Production handover | **Not started** | No deploy evidence, no operational documentation |

**Overall: early Phase 3, with Phase 1 incomplete underneath it.** Phase 1 gaps are structural and block Phases 4–6.

---

## 4. What is implemented correctly

Every item below was verified by direct code inspection or build execution during this audit.

| # | Item | Evidence |
|---|---|---|
| 4.1 | **Production build succeeds** | `next build` completed; 39 routes prerendered. (Fonts stubbed to bypass this sandbox's network block on `fonts.googleapis.com` — an environment limit, not a repository defect.) |
| 4.2 | **TypeScript compiles clean** | `npx tsc --noEmit` exit code 0 |
| 4.3 | **TypeScript strictness meets spec** | `strict`, `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes` all enabled — satisfies Doc 08 §7 |
| 4.4 | **All 36 locale routes generate** | Prerender manifest lists `/en`, `/fr`, `/ar` + 11 slugs each |
| 4.5 | **Brand palette is exact** | `#0b1826`, `#172532`, `#53616d`, `#f6f4ef`, `#d8c5a5`, `#7c4e2f`, `#2f6480` all present and correct per Doc 06 §5 |
| 4.6 | **Inaccessible Copper correctly absent** | `#B0794F` appears zero times — Doc 06 §5.4 respected |
| 4.7 | **RTL uses logical properties throughout** | 24 logical property usages, **0** physical `left`/`right`; 4 `[dir="rtl"]` rules |
| 4.8 | **`lang` and `dir` set at root** | `app/[locale]/layout.tsx` sets `dir={locale === "ar" ? "rtl" : "ltr"}` |
| 4.9 | **Genuine EN/FR/AR content** | Arabic is real Modern Standard Arabic; French is real. Neither is machine placeholder. |
| 4.10 | **Reduced-motion honoured** | `@media (prefers-reduced-motion: reduce)` block present |
| 4.11 | **Localised skip link** | Present in both page components, sourced from JSON |
| 4.12 | **No secrets committed** | Scans for `github_pat_`, `ghp_`, `GITHUB_TOKEN`, `PASSWORD_HASH`, `leadline` → zero matches |
| 4.13 | **No fake counters or fabricated metrics** | Fact strips use qualitative values only |
| 4.14 | **Node 24 declared consistently** | `.nvmrc`, `.node-version`, `netlify.toml`, `package.json engines` all agree |
| 4.15 | **Pre-launch indexing suppressed** | `robots: {index:false}` on all pages + site-wide robots disallow |

---

## 5. What is partially implemented

| # | Item | What exists | What is incomplete | Untested | Why not acceptable |
|---|---|---|---|---|---|
| 5.1 | Multilingual routing | 3 locales route and render | No central route map; French slugs are English | Language-switch equivalence | Doc 02 §6 requires `/fr/a-propos`, `/fr/secteurs`, `/fr/mentions-legales` etc. |
| 5.2 | Arabic RTL | Direction, logical CSS, 4 RTL rules | Mixed Latin/Arabic isolation, arrow mirroring, focus order | All visual/semantic RTL testing | Doc 15 §20 requires reading-order verification, not mirrored screenshots |
| 5.3 | Page inventory | All 12 types reachable | Blueprint blocks missing: experience preview, delivery model, sectors preview, breadcrumbs, related links | Blueprint traceability | Doc 03 blocks not implemented |
| 5.4 | Metadata | Titles/descriptions from JSON; relative canonical + `alternates.languages` | Absolute URLs, OG image, OG locale, reciprocity validation | hreflang reciprocity | Doc 12 §8.2 requires absolute URLs |
| 5.5 | Contact form markup | Correct Netlify attributes in prerendered HTML | No detection path, no delivery, no consent, 5 of 11 spec fields | End-to-end delivery | See §8 — form **cannot work** |
| 5.6 | Security headers | 4 headers in `netlify.toml` | **CSP and HSTS absent** | Header delivery in production | Doc 08 §20 lists both as required |
| 5.7 | Placeholders | 2 branded SVGs | 5 of 7 required placeholders missing; no favicon, manifest or OG images | Visual review | Doc 10 §9.2 |
| 5.8 | Design tokens | Correct values, centrally defined | Token *names* deviate (`--ink` vs `--color-ink-950`); global CSS not CSS Modules | — | Doc 06 §23, Doc 08 §10 |

---

## 6. What is implemented incorrectly

### 6.1 Factual violations

| ID | Finding | Evidence |
|---|---|---|
| F-1 | **Invented contact data published in all three locales** | `content/site-{en,fr,ar}.json → navigation`: `address: "Casablanca, Morocco"`, `email: "hello@salimiengineering.ma"`, `phone: "+212 5 20 00 00 00"`. Rendered unqualified in the footer of every page (`ContentPage.tsx:97–99`, `HomePage.tsx:160`). Doc 01 §3 lists all three as `INFORMATION_NOT_AVAILABLE`. |
| F-2 | **Fabricated geographic coordinates** | `HomePage.tsx:93`: `33.5731° N` / `7.5898° W` — Casablanca's coordinates, hardcoded, asserting an unconfirmed operating location. |
| F-3 | **Project relationship type absent from data model** | `ProjectItem` type has only `sector`, `title`, `location`, `scope`, `role`. The label used — "Illustrative capability profile" — is **not** one of the three mandatory values (`founder_prior_experience`, `company_assignment`, `partner_assignment`) required by Doc 04 §12 and Doc 13 §13. |

### 6.2 Architecture shortcuts

| ID | Finding |
|---|---|
| A-1 | **No stable page IDs.** System keys on public slugs (`owners-engineering-amo`) instead of stable IDs (`owners_engineering`). Blocks the entire editor architecture, which addresses documents by stable ID (Doc 09 §4). |
| A-2 | **No central route map.** `lib/site-content.ts` holds one flat English slug array applied to all locales. |
| A-3 | **Components import JSON directly.** `lib/site-content.ts` does `import en from "@/content/site-en.json"` — contradicts Doc 08 §8.1. |
| A-4 | **No schemas, no Zod, no validation.** Invalid content cannot fail because nothing validates. Unknown section types cannot fail safely — there is no section model at all. |
| A-5 | **No draft/published state.** Doc 04 §22 lifecycle absent; all content is unconditionally public. |
| A-6 | **Content structure deviates** from Doc 04 §3 (`site-*.json` / `pages-shared.json` instead of `/content/shared/` + per-page files). |

### 6.3 Hardcoded content (Doc 04 §2.1 violations)

Verified instances in `components/`:

- `"Morocco · Engineering & Project Advisory"` — `ContentPage.tsx:110`, `HomePage.tsx:164`
- `SALIMI` / `ENGINEERING` wordmark — 4 locations
- `aria-label="Salimi Engineering"` — 2 locations
- `localeLabels` (`EN` / `FR` / `العربية`) — both components
- `"MOROCCO"` decorative text — 2 locations
- Honeypot label `"Website"` — `ContentPage.tsx:260`
- `serviceSlugs` route array embedded in `HomePage.tsx`

### 6.4 Dependency and security problems

**Verified via `npm audit` on the exact declared versions.** Totals: **1 critical, 2 high, 3 total.**

| Package | Declared | Vulnerable range | Severity | Key advisory |
|---|---|---|---|---|
| `next` | **16.0.0** | `9.3.4-canary.0 – 16.3.0-preview.10` | **Critical** | RCE in React flight protocol — [GHSA-9qr9-h5gf-34mp](https://github.com/advisories/GHSA-9qr9-h5gf-34mp), vulnerable `>=16.0.0-canary.0 <16.0.7` |
| `postcss` | transitive | `<=8.5.22` | High | [GHSA-6g55-p6wh-862q](https://github.com/advisories/GHSA-6g55-p6wh-862q), [GHSA-r28c-9q8g-f849](https://github.com/advisories/GHSA-r28c-9q8g-f849) |
| `sharp` | transitive | `<0.35.0` | High | [GHSA-f88m-g3jw-g9cj](https://github.com/advisories/GHSA-f88m-g3jw-g9cj) |

`next@16.0.0` is additionally **flagged deprecated by npm** (CVE-2025-66478). A further 14 high-severity `next` advisories apply, including middleware/proxy bypasses, cache poisoning and multiple DoS vectors. **Patched version available: `16.3.0`** (non-semver-major; npm reports `fixAvailable` resolving all three packages). The critical RCE alone is fixed from `16.0.7`.

**Reproducibility:** `package-lock.json` is **not committed**. Netlify will run a fresh dependency resolution on every build, so the deployed dependency tree is not guaranteed to match any tested tree. Doc 08 §4.3 and Doc 16 §28 both require the lock file. This is a genuine reproducibility defect — though **not** a build blocker.

### 6.5 Misleading status claims

| Claim | Verdict |
|---|---|
| HEAD commit `de79094`: *"feat: publish complete multilingual corporate site"* | **Unsupported.** "Publish" implies deployment — never evidenced. "Complete" contradicts Doc 16 §13, which forbids completion claims without evidence. |
| `README.md`: *"complete Arabic RTL direction"* | **Partially accurate.** Direction is set and logical CSS is used; semantic RTL review has never been performed. |
| `README.md`: *"responsive smartphone, tablet and desktop layouts"* | **Partially accurate.** Breakpoints exist (500/800/1000/1080 px, deviating from Doc 06 §7.5's 640/768/1024/1280/1536); **no viewport was ever tested.** |
| `repository-assessment.md`: *"Netlify is reported by the project owner as already connected"* | **Unverified owner report.** Correctly labelled as a report, but has since been treated as fact. No deploy ID, site ID or URL exists. |

### 6.6 Accessibility defects

| ID | Finding |
|---|---|
| X-1 | Main navigation carries `aria-label={nav.language}` → accessible name "Language". Incorrect for primary navigation. Both components. |
| X-2 | Mobile menu uses `<details>`/`<summary>` with `aria-label={nav.services}` on the toggle — mislabelled, no expanded-state announcement, no focus trap, no Escape handling. Contradicts Doc 11 §15. |
| X-3 | Form has no error handling, no `aria-describedby`, no consent checkbox, no privacy link. |
| X-4 | Placeholder images use `alt=""` with no JSON-sourced alt field — Doc 10 §11 requires locale-specific alt text. |

### 6.7 SEO inconsistencies

- `app/robots.ts` returns `Disallow: /` for all agents. Appropriate as a deliberate pre-launch guard, but it is **inconsistent** with the per-page `robots: {index:false}` already applied, and with Doc 12 §18.2, which warns that blocking a path in `robots.txt` prevents crawlers from reading `noindex` directives.
- No `app/sitemap.ts`.
- No JSON-LD anywhere.
- Canonicals are relative, not absolute — impossible to make correct without a confirmed domain.
- No AI crawler policy; `GPTBot` / `ClaudeBot` decisions never made (Doc 13 §15–16).

**Can the site be advertised while noindex?** Yes — paid traffic reaches a URL directly and does not require indexing. But the practical consequences are material: no organic impressions or clicks accrue; Search Console reports nothing; no launch benchmark can be captured (Doc 14 §18); and the `Disallow: /` robots rule will also block ad-platform landing-page quality crawlers, which can depress Google Ads Quality Score and in some cases trigger landing-page disapproval. **No configuration was changed.**

---

## 7. What is missing

**Public pages:** breadcrumbs, custom 404 (`not-found.tsx`), global error boundary, blueprint sections (H02/H04/H05/H06/H08 equivalents).

**Content model:** stable page IDs, central route map, base page model, section registry, draft/published lifecycle, shared/localised separation, `relationshipType`.

**Validation:** `/schemas`, Zod, content loader, `validate-content`, `validate-translations`, `validate-media`, `validate-entities`, `audit:copy`.

**Editor:** entire `/editjson` route tree, field renderer, array editor, diff preview, password dialog.

**Persistence:** `netlify/functions/save-content.ts`, password hashing, GitHub Contents API integration, SHA conflict handling, threat assessment.

**Contact delivery:** `__forms.html` blueprint, submission handler, server validation, spam controls, consent, recipient configuration.

**SEO:** sitemap, absolute canonicals, reciprocal hreflang, JSON-LD, launch robots policy.

**AI-readable data:** `entity-facts.json`, `/ai/company-profile.json`, `/llms.txt`, entity-consistency script, crawler matrix.

**Analytics:** everything — wrapper, consent model, events, environment separation.

**Accessibility:** axe-core, manual matrix, zoom/reflow testing, screen-reader testing.

**Security:** CSP, HSTS, `.env.example`, rate limiting, dependency remediation.

**Testing:** all of it — Vitest, Playwright, visual regression, Lighthouse, browser matrix, rollback test.

**Legal content:** legally reviewed Legal Notice, Privacy Policy, Cookie Policy matching actual implementation.

**Verified business data:** see `/implementation/missing-information.md` §A.

**Production handover:** deployment guide, content-editing guide, password-rotation guide, rollback guide, image-replacement guide, translation guide, final implementation report.

---

## 8. Exact reason the website does not work

### 8.1 What is definitively excluded

| Suspected cause | Verdict | Evidence |
|---|---|---|
| (9) Next.js runtime incompatibility | **Excluded** | Netlify changelog: *"Next.js 16 is ready to deploy on Netlify… zero configuration."* Adapter supports 13.5+. |
| (10) Node version incompatibility | **Excluded** | Node 24 is now Netlify's **default** for Builds and Functions. |
| (11) Netlify adapter problem | **Excluded as a config error** | Adapter auto-installs; no manual configuration required. |
| (12) Missing dependency / build failure | **Excluded as a blocker** | Build succeeds locally; 39 routes generated. Missing lock file harms reproducibility but does not break builds. |
| (13) Missing environment variables | **Excluded** | The current code reads **no** environment variables at build or runtime. |
| (8) Dynamic route failure | **Excluded** | All 33 slug routes prerender successfully as static SSG. |

### 8.2 The concrete code-level fragility

**There is no `/` route in the build output.** The prerender manifest contains `/en`, `/fr`, `/ar` and 33 slug routes — but no root route. `/` depends **entirely** on this rule in `netlify.toml`:

```toml
[[redirects]]
  from = "/"
  to = "/en/"
  status = 302
  force = true
```

Additionally, `trailingSlash` is unset (default `false`), so Next generates `/en`, not `/en/`. A visitor to `/` therefore experiences: `/` → **302** → `/en/` → **308** → `/en`. This chain resolves correctly on a standard Netlify Next.js deployment and is **not** a redirect loop — but it means **the root URL has a single point of failure outside the application**. If the redirect is not applied (wrong publish directory, static-export deployment, or the rule being overridden), the root URL returns 404 while `/en` still works.

**This is the single most likely code-adjacent explanation for "the site does not open":** the owner visits the bare domain and receives nothing, while `/en` would have worked.

### 8.3 The primary root cause

**No production URL has ever existed in the project record.**

A repository-wide search across all source, configuration and documentation for `netlify.app`, `NETLIFY_SITE` and `site_id` returned **zero results**. No implementation document records a production URL, deploy ID or site ID. No prior report provided one.

Therefore the ranked diagnosis is:

1. **(21) Invalid or never-communicated production URL** — *most probable.* The owner cannot open a site whose address was never established.
2. **No Netlify site connected at all** — the "already connected" statement is an unverified owner report, and no deploy has ever been evidenced.
3. **(2) Only a deploy preview exists** — plausible if a preview was generated from a branch but never promoted.
4. **(7) Root redirect failure** — see §8.2; would present as "the domain does nothing" while `/en` works.

**Cannot be excluded without dashboard access:** (1) incorrect URL, (3) production branch not `main`, (4) latest commit not deployed, (5) failed production deploy, (6) stale deploy, (14) DNS failure, (15) custom-domain failure, (16) HTTPS certificate problem, (17) password protection, (18) access control, (19) geographic/network restriction, (20) browser-specific failure.

**Where the problem is:** **Not in the application code.** It is in deployment configuration and/or communication of the production address.

### 8.4 Evidence required to close this

The owner must supply, from the Netlify dashboard:

1. Whether a Netlify site exists and is linked to `gaart1981/YunesWEB`
2. The production URL (`*.netlify.app` and any custom domain)
3. The production branch setting
4. The latest production deploy ID, its commit SHA and its status
5. The full deploy log of the most recent production build
6. Whether password protection or access control is enabled
7. The exact URL the owner is typing, and the exact browser result

**None of these require pasting a token into chat.** They are all readable in the Netlify UI.

---

## 9. Deployment status table

| Item | Actual value | Verified status | Evidence |
|---|---|---|---|
| Repository | `gaart1981/YunesWEB` (public) | **Verified** | `git clone`; GitHub metadata `repository_public: true` |
| Production branch | `main` (repo default) | **Verified in repo**; Netlify setting **unverified** | `git branch -r`, `origin/HEAD → origin/main` |
| Current `main` SHA | `4396f430ff82565f4c31d0ac767fa9272901c086` | **Verified** | `git rev-parse HEAD` |
| Latest production deploy SHA | Unknown | **Not verified** | No Netlify access |
| Latest deploy-preview SHA | Unknown | **Not verified** | No Netlify access |
| Production URL | **Not recorded anywhere** | **Verified absent** | Repo-wide search: 0 matches |
| Deploy-preview URL | **Not recorded anywhere** | **Verified absent** | Repo-wide search: 0 matches |
| Root URL `/` | No route in build; depends on `netlify.toml` 302 | **Verified in build output** | Prerender manifest contains no `/` |
| `/en/` | Route generated as `/en` (308 from `/en/`) | **Verified in build**; live status unverified | Prerender manifest |
| `/fr/` | Route generated as `/fr` | **Verified in build**; live status unverified | Prerender manifest |
| `/ar/` | Route generated as `/ar`, `dir="rtl"` | **Verified in build**; live status unverified | Prerender manifest + layout code |
| Build status | Succeeds — 39 routes | **Verified locally** | `next build` output |
| Form status | **Cannot receive submissions** | **Verified** | No `public/__forms.html`; Server Component; no action; no JS handler |
| Indexing status | Blocked site-wide + per-page noindex | **Verified** | `app/robots.ts`, `generateMetadata` |
| Dependency vulnerabilities | 1 critical, 2 high | **Verified** | `npm audit --json` |
| Lock file | Absent | **Verified** | File listing |

---

## 10. Findings by severity

### CRITICAL

**C-1 — Invented contact, address and telephone data published in all three locales**
*Evidence:* `content/site-{en,fr,ar}.json → navigation`; rendered at `ContentPage.tsx:97–99`, `HomePage.tsx:160`.
*Root cause:* Placeholder data authored as if verified, then rendered unconditionally.
*Affected:* 3 content files, 2 components.
*Consequence:* Doc 15 §32 classifies a false claim as Critical. Publishing a non-existent Moroccan phone number and address is a factual misrepresentation.
*Correction:* Remove the values; suppress rendering when empty (Doc 04 §14).
*Verification:* Grep for the values; confirm footer omits the block.

**C-2 — Critical dependency vulnerability in `next@16.0.0`**
*Evidence:* `npm audit`: 1 critical, 2 high. RCE — GHSA-9qr9-h5gf-34mp, vulnerable `>=16.0.0-canary.0 <16.0.7`.
*Root cause:* Version pinned at initial scaffold, never updated.
*Affected:* `package.json`.
*Consequence:* Remote code execution exposure on a deployed SSR surface. Doc 08 §4.3 forbids unresolved critical vulnerabilities.
*Correction:* Upgrade to `16.3.0`; commit `package-lock.json`.
*Verification:* `npm audit` reports 0 critical; build and typecheck pass.

**C-3 — Fabricated geographic coordinates presented as company location**
*Evidence:* `HomePage.tsx:93` — `33.5731° N` / `7.5898° W`.
*Root cause:* Decorative "datum" element populated with real Casablanca coordinates.
*Affected:* `components/HomePage.tsx`.
*Consequence:* Asserts an unconfirmed operating location. `aria-hidden` hides it from assistive technology but not from sighted users.
*Correction:* Remove or replace with non-locational content.
*Verification:* Grep returns no coordinate literals.

**C-4 — Contact form cannot receive submissions**
*Evidence:* `public/__forms.html` **absent**; `ContentPage.tsx` has no `"use client"`; form has `method="POST"` and **no `action`**; no JS submit handler. Prerendered HTML confirms: `<form class="project-form" name="project-enquiry" data-netlify="true" netlify-honeypot="company-website" method="POST">`.
*Root cause:* Netlify Forms auto-detection does not work with modern Next.js. Per OpenNext's official documentation: *"modern Next.js versions do not generate fully-static HTML pages… Create a new HTML file in the public directory… for deploy-time form detection only."*
*Affected:* `components/ContentPage.tsx`, `public/`, `netlify.toml`.
*Consequence:* The form will not be detected by Netlify, and a submission POSTs to `/en/contact` — a route with no POST handler. **Every enquiry is lost silently.** Doc 15 §32: "form does not deliver" is Critical.
*Correction:* Add `public/__forms.html` blueprint and a client-side handler POSTing URL-encoded data to it; or implement `netlify/functions/contact-enquiry.ts` (Doc 08 §19 Option A).
*Verification:* Form appears in Netlify Forms tab; labelled test submission received.

### HIGH

**H-1 — No production URL exists in the project record.** Repo-wide search: 0 matches. Owner has no verified address to open. *Correction:* Confirm/create the Netlify site; record URL and deploy ID in `/implementation/`. *Verification:* Documented URL returns HTTP 200.

**H-2 — Root URL has a single external point of failure.** No `/` route in build; depends solely on `netlify.toml` 302 (§8.2). *Correction:* Add an explicit root handler or verify the redirect in production. *Verification:* `curl -I /` returns the expected chain.

**H-3 — French and Arabic public slugs are wrong.** `lib/site-content.ts` applies English slugs to all locales; Doc 02 §6 requires localised French routes. No central route map.

**H-4 — No stable page IDs.** Blocks the editor architecture entirely (Doc 09 §4).

**H-5 — No schemas, validation or content loader.** Invalid content cannot fail; components import JSON directly (Doc 08 §8.1).

**H-6 — Zero tests.** 1 of 10 mandated validation commands exists (`typecheck`).

**H-7 — `package-lock.json` not committed.** Deployed dependency tree not reproducible.

**H-8 — Project `relationshipType` absent.** Mandatory disclosure field missing from the data model (Doc 04 §12, Doc 13 §13).

**H-9 — Hardcoded business copy in components.** 7 categories verified (§6.3), violating Doc 04 §2.1.

**H-10 — Mobile navigation not accessible.** No focus trap, no Escape, no expanded state, mislabelled toggle (Doc 11 §15).

### MEDIUM

M-1 Missing `not-found.tsx` / `global-error.tsx` · M-2 No JSON-LD, sitemap or absolute canonicals · M-3 CSP and HSTS absent · M-4 Global CSS instead of CSS Modules; token names deviate · M-5 5 of 7 placeholders, favicon, manifest and OG images missing · M-6 No breadcrumbs · M-7 Main nav mislabelled `aria-label` · M-8 No analytics or consent layer · M-9 Legal pages not legally reviewed · M-10 Breakpoints deviate from Doc 06 §7.5 · M-11 No `.env.example`, decision log or operational guides · M-12 Contact form has 5 of 11 specified fields, no consent checkbox

### LOW

L-1 `baseline-browser-mapping` data staleness warning during build · L-2 Next.js rewrites `tsconfig.json` at build time (`jsx` → `react-jsx`), causing uncommitted drift · L-3 No `.gitignore` entry for `tsconfig.tsbuildinfo`

### INFORMATIONAL

I-1 Repository is **public** — all content, structure and future editor allowlists are publicly readable. Acceptable for a website repo, but worth a conscious decision.
I-2 `feat/full-public-site` is identical to `main` and can be deleted.
I-3 A GitHub personal access token was previously shared in plaintext chat. **It must be revoked.** It is not reproduced here and is **not** present in the repository (verified).

---

## 11. Review of previous implementation claims

| Claim | Verdict | Basis |
|---|---|---|
| "The production site is published" | **Unsupported** | No URL, deploy ID or site ID exists anywhere |
| "The full public site works" | **Unsupported** | Never tested against a live deployment; form provably cannot work |
| "The permanent production address is available" | **Unsupported** | No address recorded in any file or report |
| "The form is operational" | **Contradicted** | §10 C-4 — no detection path, no handler, no delivery |
| "All three languages work" | **Partially accurate** | All three build and render; French URLs are wrong; Arabic never semantically reviewed |
| "The site is mobile-ready" | **Partially accurate** | Responsive CSS exists; zero viewports tested; mobile nav fails accessibility |
| "Netlify is connected" | **Unverified** | Recorded as an owner report, not evidence; since treated as fact |
| Commit message "publish complete multilingual corporate site" | **Unsupported** | Violates Doc 16 §13 |

The prior audit at commit `4396f43` recorded three Critical findings. **All three are independently confirmed accurate** by this audit — invented contact data, vulnerable Next.js, and hardcoded coordinates. The prior audit **understated** the situation in one respect: it did not identify that the contact form cannot function, which is a fourth Critical issue.

---

## 12. Correction plan

### Immediate containment — before any public promotion

| Priority | Action | Files | Expected result | Verification |
|---|---|---|---|---|
| 0.1 | Obtain Netlify facts (§8.4 list) from the dashboard | — | Root cause of inaccessibility resolved | Documented URL + deploy ID |
| 0.2 | Do not advertise or share any URL | — | No traffic to a broken form | — |
| 0.3 | Revoke the previously exposed GitHub token | GitHub settings | Credential invalidated | Token absent from account |
| 0.4 | Record verified deployment facts | `/implementation/` | Single source of truth | Committed |

### Phase R1 — Critical remediation

| Priority | Action | Dependency | Files | Verification |
|---|---|---|---|---|
| R1.1 | Remove invented address/email/phone; suppress empty rendering | none | `content/site-*.json`, both components | Grep clean; footer omits block |
| R1.2 | Remove hardcoded coordinates | none | `HomePage.tsx` | Grep clean |
| R1.3 | Upgrade `next` → `16.3.0` | none | `package.json` | `npm audit`: 0 critical |
| R1.4 | Commit `package-lock.json` | R1.3 | root | File present; Netlify uses `npm ci` |
| R1.5 | Fix contact form (blueprint + handler, or Function) | none | `public/__forms.html`, `ContentPage.tsx` | Test submission received |
| R1.6 | Add `relationshipType` to project model | none | `lib/site-content.ts`, `content/pages-shared.json` | Field renders on every card |
| R1.7 | Verify root redirect in production | 0.1 | `netlify.toml` | `curl -I /` → 302 → 308 → 200 |

### Phase R2 — Architecture correction

Stable page IDs → central route map with localised FR slugs → restructure content to Doc 04 §3 → Zod schemas → content loader → section registry → validation scripts → remove hardcoded copy → CSS Modules + `tokens.css` → `not-found.tsx` + `global-error.tsx`.

*Verification:* build succeeds; validation fails correctly on bad input; all 36 routes resolve with correct localised slugs; no component imports JSON.

### Subsequent phases

**Phase 2** component library (Doc 07 §3) — fixes M-6, M-7, H-10.
**Phase 3** blueprint-complete public pages + media structure.
**Phase 4** JSON editor — requires threat assessment first; depends on R2 stable IDs.
**Phase 5** contact hardening + analytics + consent.
**Phase 6** SEO/AI layer — requires confirmed domain; requires owner decisions on `GPTBot`/`ClaudeBot`.
**Phase 7** full test suite, accessibility, Lighthouse, visual regression, **performed rollback test**.
**Phase 8** verified content, legal review, professional translation, production handover, final report.

---

## 13. Overall technical recommendation

### **Partially refactor.**

**Keep:** the design token system and exact brand palette; the logical-property RTL CSS foundation (24 logical, 0 physical — genuinely well done); the EN/FR/AR content copy; the Next.js 16 App Router + TypeScript-strict scaffold; the Netlify configuration skeleton.

**Rebuild:** the content architecture (stable IDs, route map, schemas, loader, validation); the component layer (two 300-line monoliths → the Doc 07 library); the forms layer.

**Add:** editor, tests, SEO/AI layer, analytics, accessibility remediation.

**Why not "continue with targeted fixes":** the missing stable-ID and validation layer is not a defect to patch — it is a prerequisite that Phases 4, 5 and 6 all depend on. Building the editor on the current slug-keyed model would require throwing it away later.

**Why not "significantly rebuild" or "replace":** the build is healthy, TypeScript is strict and clean, the palette is exactly correct, the RTL foundation is better than most first attempts, and the translations are genuine. Discarding that would waste real value and reintroduce risk.

---

## 14. Verification limitations

The following **could not be independently verified**, and no conclusion in this report should be read as covering them:

1. **All Netlify facts** — site existence, connection, production branch, build command, publish directory, base directory, deploy status, deploy IDs, deploy logs, environment variables, form detection, redirect processing, build plugins, failed/cancelled deploys. *No Netlify API or dashboard access; no credential requested, per audit rule §18.*
2. **Live HTTP behaviour of every URL in §9** — no production URL was ever supplied, so nothing could be requested. **No URL in this report is claimed to work.**
3. **DNS, HTTPS certificates, custom domains, password protection, geographic accessibility** — all require the live deployment.
4. **Browser rendering, console errors, font loading, visual appearance** — no browser automation was run against a live site. The §11 visual assessment is based on code inspection only, not observation.
5. **The seven required viewports** — no responsive testing was performed. Responsive CSS exists; its behaviour is unverified.
6. **Accessibility conformance** — no axe-core run, no screen-reader test, no zoom/reflow test. Findings X-1 to X-4 are code-inspection findings only. **No WCAG conformity is claimed.**
7. **Open and merged pull requests** — GitHub REST API was rate-limited unauthenticated; PR history was not retrieved.
8. **Production build on Netlify** — the successful build in §4.1 was run locally with `next/font/google` stubbed, because this audit environment blocks `fonts.googleapis.com`. Netlify's build environment can reach Google Fonts, so the build is expected to succeed there, but **this has not been observed**.
9. **Arabic linguistic quality** — the text is genuine Modern Standard Arabic, but no qualified reviewer has assessed terminology or register.

**Nothing in this report claims a URL was tested, a deploy succeeded, or a feature works, unless the evidence column names the specific command or file that demonstrates it.**
