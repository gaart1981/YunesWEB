# Implementation Plan — Salimi Engineering Website

**Status:** Proposed. Not started. Requires project-owner approval before Phase R1 begins.
**Analysis date:** 2026-08-04
**Baseline commit:** `de79094` on `main`
**Aligned to:** `/source_docs/16` §7 phase model, with a remediation phase inserted first.

> **Revision — 2026-08-04, deployment audit.** Amended following `/implementation/current-state-and-deployment-audit.md` (audited at commit `4396f43`). Three changes, all evidence-driven:
>
> 1. **A new Phase 0 (Immediate containment) is inserted before R1.** The audit found no production URL recorded anywhere in the project. Netlify facts must be established before any further work is scheduled.
> 2. **A fourth Critical issue was discovered:** the contact form cannot receive submissions. Netlify Forms does not auto-detect forms in modern Next.js, and the form is a Server Component with no `action` and no client handler. Added as R1.8.
> 3. **Two prior assumptions were disproven and are recorded here so they are not re-raised:** Next.js 16 and Node 24 are both fully supported by Netlify, so neither is a deployment blocker. The original plan did not claim otherwise, but the possibility is now closed with evidence.
>
> Nothing else in this plan was invalidated by the audit. The phase order and the R2-first architecture argument were both confirmed correct.

---

## Phase 0 — Immediate containment

**Objective:** Establish the actual deployment state. No further implementation should be scheduled until this is known.
**Gate:** A production URL is documented and returns a verified HTTP status.

| # | Task | Verification |
|---|---|---|
| 0.1 | Obtain from the Netlify dashboard: site existence and repository link; production URL; production branch; latest deploy ID, commit SHA and status; full deploy log; whether password protection is enabled | Facts recorded in `/implementation/` |
| 0.2 | Record the exact URL the owner is opening and the exact browser result | Reproduction step documented |
| 0.3 | Revoke the GitHub personal access token previously shared in plaintext; reissue as a fine-grained token stored only in Netlify environment variables | Old token invalid |
| 0.4 | Suspend any public promotion until R1.8 is complete — the contact form currently loses every enquiry silently | No traffic driven to a broken form |

**Estimated effort:** under 1 hour of owner time. **No credential may be pasted into chat.**

---

## 1. Planning basis

The repository already contains a working multilingual Next.js foundation with a correct colour system, genuine EN/FR/AR content and a solid RTL CSS approach. **This is worth preserving.** The plan therefore refactors and extends rather than rebuilds.

However, three Critical issues exist in the current `main` branch (invented contact data, critical dependency vulnerabilities, fabricated coordinates). Phase R1 addresses these first, because Doc 15 §33 states a later gate cannot override a failed earlier gate, and Doc 01 §22 places factual accuracy above every other consideration.

**[VERIFY]** Effort ranges below are estimates for planning only. They assume one principal executor with bounded specialist agents, and exclude project-owner turnaround time for content, legal review and professional translation — which is likely to be the true critical path.

---

## Phase R1 — Immediate risk remediation

**Objective:** Remove factual violations and critical vulnerabilities from `main`.
**Branch:** `fix/factual-and-security-remediation`
**Gate:** No invented business fact renders publicly; `npm audit` reports zero critical vulnerabilities; typecheck and build pass.

| # | Task | Files |
|---|---|---|
| R1.1 | Remove invented `address`, `email`, `phone` from all three `site-*.json` navigation blocks; suppress rendering when values are empty (Doc 04 §14) | `content/site-{en,fr,ar}.json`, `components/*.tsx` |
| R1.2 | Replace contact-page "provisional" fact values with an approved "contact details pending" state or omit the block | `content/site-*.json`, `content/pages-shared.json` |
| R1.3 | Remove hardcoded Casablanca coordinates from the hero datum element | `components/HomePage.tsx` |
| R1.4 | Upgrade Next.js to the latest patched 16.x (16.3.0 at analysis time); re-run audit | `package.json` |
| R1.5 | Generate and commit `package-lock.json` | repository root |
| R1.6 | Verify Netlify deploy-preview build succeeds on Node 24 and record the deploy ID | Netlify |
| R1.7 | Create `/implementation/decision-log.md` and record every R1 decision | `/implementation` |
| R1.8 | **Fix the contact form.** Add `public/__forms.html` detection blueprint and a client-side handler POSTing URL-encoded data to it, **or** implement `netlify/functions/contact-enquiry.ts` (Doc 08 §19 Option A). Verified against OpenNext official guidance. | `public/__forms.html`, `components/ContentPage.tsx` or `netlify/functions/` |
| R1.9 | Verify the root redirect in production. There is **no `/` route in the build** — the root depends entirely on the `netlify.toml` 302. Confirm `/` → `/en/` → `/en` resolves live. | `netlify.toml` |
| R1.10 | Add `relationshipType` to the project model with the three mandatory values | `lib/site-content.ts`, `content/pages-shared.json` |

**Estimated effort:** 1–2 days (revised upward from 0.5–1 day to cover R1.8–R1.10).
**Risk if skipped:** Publishing invented contact and location data is a Critical issue under Doc 15 §32 and would block launch regardless of later work.

---

## Phase R2 — Architecture correction

**Objective:** Introduce the stable-ID and validation architecture the entire specification depends on. This is prerequisite to the editor, SEO and testing phases.
**Branch:** `feat/content-architecture`
**Gate:** Build succeeds; content validation runs and fails correctly on bad input; all 36 locale routes resolve; no component imports JSON directly.

| # | Task | Source |
|---|---|---|
| R2.1 | Define stable page IDs (`home`, `services`, `owners_engineering`, `electrical_mep`, `local_partner`, `sectors`, `experience`, `about`, `contact`, `legal_notice`, `privacy`, `cookies`) | Doc 02 §5 |
| R2.2 | Build central route map (`lib/routes/`) mapping stable ID → locale route, including localised French slugs | Doc 02 §6; Doc 08 §9.3 |
| R2.3 | Restructure content to `/content/shared/`, `/content/{en,fr,ar}/{pageId}.json` with the base page model (`pageId`, `locale`, `status`, `version`, `seo`, `hero`, `sections`, `finalCta`, `editor`) | Doc 04 §3, §6 |
| R2.4 | Create `/schemas` with Zod schemas: global, page, project, service, sector | Doc 04 §3 |
| R2.5 | Build `lib/content/` loader: resolve locale + page ID, parse as `unknown`, validate, merge shared/localised, strip unpublished, return typed content | Doc 08 §8.1 |
| R2.6 | Implement the section-type registry; unknown types fail validation | Doc 04 §9, §10 |
| R2.7 | Add `relationshipType` to the project model with the three mandatory values | Doc 04 §12 |
| R2.8 | Write `scripts/validate-content.ts`, `validate-translations.ts`, `audit-hardcoded-copy.ts`; wire into `package.json` and pre-build | Doc 08 §8.2 |
| R2.9 | Remove all hardcoded business copy identified in the audit; move wordmark, locale labels, footer descriptor and honeypot label to JSON | Doc 04 §2.1 |
| R2.10 | Split global CSS into `tokens.css` + CSS Modules per component; rename tokens to the Doc 06 §23 scheme | Doc 08 §10 |
| R2.11 | Add `app/not-found.tsx` and `app/global-error.tsx` | Doc 02 §23 |

**Estimated effort:** 4–7 days.
**Dependency:** None. Can begin immediately after R1.
**Risk:** This is the highest-leverage phase. Deferring it makes the editor, SEO and testing phases substantially more expensive.

---

## Phase 2 — Design system and component library

**Objective:** Replace the two monolithic page components with the specified component library.
**Branch:** `feat/design-system`
**Gate:** Component review passed; responsive screenshots at all seven viewports; no generic UI-library appearance; French and Arabic long-content tested.

Build the Doc 07 §3 structure: primitives (`Button`, `TextLink`, `Container`, `Section`, `Surface`, `Icon`, `Badge`, `Divider`); navigation (`Header`, `MobileNavigation`, `LanguageSwitcher`, `Breadcrumbs`, `Footer`); content (`PageHero`, `RichText`, `ServiceCard`, `ProjectCard`, `SectorCard`, `TrustPoint`, `ProcessSteps`, `FounderIntro`, `FounderMessage`, `RelatedLinks`, `FinalCTA`, `ImagePlaceholder`); forms; layout (`PageShell`, `ContentSplit`, `CardGrid`, `MediaFrame`).

Priority fixes carried in: accessible mobile navigation with focus trap, Escape handling and expanded-state announcement; correct `aria-label` on the main navigation; breadcrumbs on all pages except Home; `ProjectCard` with non-hideable relationship disclosure.

**Estimated effort:** 6–9 days.
**Dependency:** R2 complete.

---

## Phase 3 — Public pages

**Objective:** Implement all twelve page types against the Doc 03 blueprints.
**Branch:** `feat/public-pages`
**Gate:** All pages render in three languages or an approved draft state; every blueprint block traceable; metadata and structured data present.

Build out the missing homepage blocks (client relevance strip, why-Salimi evidence points, experience preview, delivery model, sectors preview) and the full section sets for the three service detail pages, Sectors, Experience, About and Contact. Add the media folder structure and the five missing placeholder SVGs.

**Estimated effort:** 6–9 days.
**Dependency:** Phase 2 complete; content structure from R2.

---

## Phase 4 — JSON editor and GitHub persistence

**Objective:** Deliver the editor with server-side protection.
**Branch:** `feat/json-editor`
**Gate:** Test-branch commit succeeds; wrong password rejected with a generic error; stale SHA returns HTTP 409; no secret reaches the browser.

Produce the Doc 16 §23 threat assessment **first**. Then implement `/editjson/{locale}/{pageSlug}`, the schema-driven `FieldRenderer`, `ArrayEditor` with keyboard reorder, `DiffPreview`, `SavePasswordDialog`, `ValidationSummary`, and `netlify/functions/save-content.ts` following the Doc 08 §15.1 eleven-step sequence.

**Estimated effort:** 7–10 days.
**Dependency:** R2 schemas and stable IDs.
**Blocked by:** GitHub token and password hash must be provisioned as Netlify environment variables — **never pasted into chat or committed**.

---

## Phase 5 — Contact delivery and analytics

**Objective:** Working, server-validated enquiry delivery and consent-gated measurement.
**Branch:** `feat/contact-analytics`
**Gate:** A labelled test enquiry is received; no PII in analytics; analytics disabled in previews; the form works with analytics blocked.

Implement `netlify/functions/contact-enquiry.ts` with server validation, honeypot, rate limiting and structured error codes. Add the consent checkbox and privacy link. Build the single analytics wrapper; components never call `gtag` directly. Fire `project_enquiry_submit` only after server confirmation.

**Estimated effort:** 4–6 days.
**Blocked by:** contact recipient address, email provider credentials and legal approval of the consent model.

---

## Phase 6 — SEO and AI machine-readable layer

**Objective:** Correct indexing signals and consistent machine-readable identity.
**Branch:** `feat/seo-ai`
**Gate:** Technical validation passes; no contradictory claims; entity-consistency script passes.

Implement canonical URLs, reciprocal `hreflang`, `app/sitemap.ts` generated from published state, the launch `robots.txt` policy, JSON-LD with stable `@id` values, `/content/shared/entity-facts.json`, `/ai/company-profile.json`, `/llms.txt` and `scripts/validate-entity-consistency.ts`.

**Requires an explicit owner decision** on `GPTBot` and `ClaudeBot` training-crawler access, recorded in the crawler matrix. Verify current crawler user-agent names against official provider documentation and log them in `/implementation/external-reference-log.md`.

**Estimated effort:** 4–6 days.
**Blocked by:** confirmed production domain.

---

## Phase 7 — Quality, accessibility and visual refinement

**Objective:** Produce the evidence Doc 15 requires.
**Branch:** `test/release-quality`
**Gate:** Release criteria satisfied; Critical = 0; High = 0.

Vitest unit tests (90% on critical business logic, 80% on the service layer), component tests, integration tests, Playwright E2E for all three locales, visual regression baselines, axe-core automated checks plus the full manual matrix, Lighthouse runs, the seven-viewport screenshot set, cross-browser testing, Arabic RTL semantic review, editor UAT by a non-developer, and a **performed and documented rollback test**.

Populate `/quality/` with `claim-register.md`, `test-report.md`, `visual-review/`, `lighthouse/`, `accessibility/`, `seo/`, `editor/`, `deployment/`.

**Estimated effort:** 8–12 days.

---

## Phase 8 — Content finalisation and production handover

**Objective:** Replace all draft content with verified content and go live.
**Gate:** All Doc 15 §35 criteria met.

Replace every `INFORMATION_NOT_AVAILABLE` / `REQUIRES_CONFIRMATION` / `TBD` marker with verified content or remove it. Professional French and Arabic review. Legal review of Legal Notice, Privacy Policy and Cookie Policy. Replace placeholders with authorised photography and complete `media-rights.json`. Configure domain, HTTPS, environment variables and Search Console. Write the six operational guides and `/implementation/final-implementation-report.md`.

**Estimated effort:** 3–5 days of technical work, plus owner-dependent content and legal turnaround.

---

## 2. Critical path

The technical critical path is **R1 → R2 → Phase 2 → Phase 3 → Phase 7**.

The **business** critical path is different and probably longer: founder CV and project permissions → verified content → professional translation → legal review → authorised photography. Phases 4, 5 and 6 can run in parallel with content gathering, but **Phase 8 cannot start until the owner supplies the missing information listed in `/implementation/missing-information.md`.**

**Recommendation:** begin collecting founder and legal information **now**, in parallel with R1 and R2, rather than after technical work completes.

---

## 3. Agent allocation

Per Doc 16 §8–10, each agent receives role, objective, allowed files, source documents, constraints, tests, acceptance criteria and escalation conditions. Recommended split, with no two agents editing the same files concurrently:

| Agent | Phase | Owns |
|---|---|---|
| Content-schema | R2 | `/schemas`, `lib/content/`, `lib/routes/`, `/content`, `scripts/validate-*` |
| Design-system | 2 | `styles/`, `components/primitives/`, `components/layout/` |
| Public-page | 3 | `app/[locale]/`, `components/content/` |
| Editor & GitHub | 4 | `app/editjson/`, `netlify/functions/save-content.ts`, `lib/security/` |
| SEO & entity | 6 | `lib/seo/`, `app/sitemap.ts`, `app/robots.ts`, `/public/llms.txt`, `/ai/` |
| QA | 7 | `/tests`, `/quality` |

Every agent output is untrusted until independently reviewed, tested and integrated. **No agent may mark a business fact as verified.**
