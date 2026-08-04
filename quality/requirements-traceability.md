# Requirements Traceability Matrix

**Updated:** 2026-08-04
**Baseline commit:** `de79094` on `main`
**Method:** Every status below was determined by direct inspection of the repository during this analysis cycle. Prior status claims were **not** carried forward. Where a previous record and the repository disagreed, the repository was treated as authoritative.

**Status vocabulary (Doc 16 §19):** `not_started` · `in_progress` · `implemented` · `verified` · `blocked` · `accepted_exception`

**`implemented` is not equivalent to `verified`.** Nothing in this matrix is marked `verified`, because no test suite, accessibility audit, visual review, deploy evidence or owner approval exists in the repository.

> **Revision — 2026-08-04, deployment audit** (`/implementation/current-state-and-deployment-audit.md`, commit `4396f43`). Changes to this matrix, with reasons recorded rather than silently overwritten:
>
> | Row | Was | Now | Reason |
> |---|---|---|---|
> | H4 (contact delivery) | `blocked` — "not configured, not tested" | `blocked` — **root cause now identified** | Audit C-4 proved the form *cannot* work: no `public/__forms.html`, Server Component, no `action`, no client handler. Netlify Forms does not auto-detect forms in modern Next.js (OpenNext official guidance). |
> | B2 (no critical vulnerabilities) | `blocked` | `blocked` — **advisory now precise** | RCE GHSA-9qr9-h5gf-34mp, vulnerable `>=16.0.0-canary.0 <16.0.7`; totals 1 critical + 2 high; fix available at `16.3.0`. |
> | New: B18 | — | `implemented` | Production build verified to succeed — 39 routes prerendered. Previously untested. |
> | New: B19 | — | `blocked` | No `/` route exists in the build; root depends entirely on a `netlify.toml` redirect. |
> | New: L14 | — | `blocked` | No production URL recorded anywhere; repo-wide search returned 0 matches. |
>
> The prior matrix's three Critical entries (A1, A2, A3) were **independently re-verified and all remain accurate**. No status was improved by the audit; two were made more precise, and three new rows were added.

### Rows added by the deployment audit

| # | Requirement | Source | Implementation found | Status |
|---|---|---|---|---|
| B18 | Project builds for production | Doc 15 §33 Gate 1 | `next build` succeeds; 39 routes prerendered; TypeScript clean | implemented |
| B19 | Root URL resolves to default locale | Doc 08 §9.2; Doc 12 §10 | **No `/` route in build output**; depends solely on `netlify.toml` 302 → then 308 to `/en` | blocked |
| L14 | Production deployment exists and is reachable | Doc 15 §27 | **No production URL, site ID or deploy ID recorded anywhere** | blocked |
| K7 | Netlify Forms detection compatible with Next.js | Doc 08 §19 | `public/__forms.html` absent; form is a Server Component with no action or handler | blocked |

---

## A. Content and factual integrity

| # | Requirement | Source | Implementation found | Test | Status |
|---|---|---|---|---|---|
| A1 | No invented business facts | CLAUDE.md §4; Doc 01 §3 | `content/site-*.json` publishes invented address, email and phone | none | **blocked** |
| A2 | No invented location claim | CLAUDE.md §4 | `HomePage.tsx:93` hardcodes Casablanca coordinates | none | **blocked** |
| A3 | Founder prior experience separated from company assignments | Doc 02 §13; Doc 04 §12 | Projects labelled "Illustrative capability profile"; **no `relationshipType` field** | none | **blocked** |
| A4 | Mandatory relationship types in data model | Doc 04 §12; Doc 13 §13 | Absent from `ProjectItem` type | none | not_started |
| A5 | Prohibited markers absent from published output | Doc 15 §7.1 | No markers found in rendered content | no automated check | in_progress |
| A6 | One exact founder-name spelling everywhere | Doc 15 §7.3 | Consistent in current content | no automated check | in_progress |
| A7 | No unsupported numeric claims / fake counters | Doc 05 §19; Doc 06 §22 | Fact strips use qualitative values only — compliant | none | implemented |
| A8 | Claim register maintained | Doc 15 §7.2 | `/quality/claim-register.md` absent | — | not_started |

## B. Architecture and content model

| # | Requirement | Source | Implementation found | Status |
|---|---|---|---|---|
| B1 | Next.js 16 App Router, TypeScript strict | Doc 08 §2.1 | Next 16.0.0, React 19.2.0, strict + `noUncheckedIndexedAccess` + `exactOptionalPropertyTypes` | implemented |
| B2 | No critical dependency vulnerabilities | Doc 08 §4.3 | `npm audit`: **critical** (next@16.0.0) | **blocked** |
| B3 | `package-lock.json` committed | Doc 08 §4.3 | Absent | not_started |
| B4 | Node 24 declared | Doc 08 §4.2 | `.nvmrc`, `.node-version`, `netlify.toml`, `engines` all set to 24 | implemented |
| B5 | Stable page IDs independent of public URL | Doc 02 §5 | Absent — system keys on public slugs | not_started |
| B6 | Central route map | Doc 08 §9.3 | Absent — flat slug array in `lib/site-content.ts` | not_started |
| B7 | Localised FR/AR public slugs | Doc 02 §6 | English slugs served for all locales | not_started |
| B8 | Content structure `/content/{shared,en,fr,ar}/` | Doc 04 §3 | Deviating structure (`site-*.json`, `pages-shared.json`) | not_started |
| B9 | Base page model (`pageId`, `status`, `version`, `sections`…) | Doc 04 §6 | Absent | not_started |
| B10 | Zod schemas in `/schemas` | Doc 04 §3; Doc 08 §2.1 | Absent — no Zod dependency | not_started |
| B11 | Content-loading layer; components never import JSON | Doc 08 §8.1 | Violated — `lib/site-content.ts` imports JSON directly | not_started |
| B12 | Section-type registry; unknown types fail validation | Doc 04 §9 | Absent | not_started |
| B13 | Publication states `draft/review/published/archived` | Doc 04 §22 | Absent | not_started |
| B14 | Build-time content validation | Doc 08 §8.2 | Absent | not_started |
| B15 | No hardcoded business copy | Doc 04 §2.1 | **Violated** — 15 verified instances incl. `"Morocco · Engineering & Project Advisory"`, wordmark ×4, locale labels, honeypot label | not_started |
| B16 | CSS Modules + central token file | Doc 08 §10 | Global CSS only; no `tokens.css` | not_started |
| B17 | TypeScript compiles clean | Doc 08 §7 | `npx tsc --noEmit` exit 0 | implemented |

## C. Multilingual and RTL

| # | Requirement | Source | Implementation found | Status |
|---|---|---|---|---|
| C1 | EN/FR/AR routes render | Doc 02 §5 | All three locales resolve | implemented |
| C2 | `<html lang dir>` set at root | Doc 08 §9.4; Doc 11 §4 | Correct in `app/[locale]/layout.tsx` | implemented |
| C3 | Logical CSS properties for RTL | Doc 07 §15 | 24 logical usages, 0 physical `left`/`right` | implemented |
| C4 | RTL-specific adjustments | Doc 06 §20 | 4 `[dir="rtl"]` rules present | in_progress |
| C5 | Language switch to equivalent page | Doc 02 §21 | Switches by slug; breaks once FR slugs are localised | in_progress |
| C6 | Genuine professional translations | Doc 01 §14.4 | Genuine human-quality FR/AR draft; **no professional review** | blocked |
| C7 | Mixed Arabic/Latin isolation tested | Doc 11 §29 | Not tested | not_started |
| C8 | No silent cross-language fallback | Doc 08 §8.3 | No fallback logic exists | not_started |

## D. Design system

| # | Requirement | Source | Implementation found | Status |
|---|---|---|---|---|
| D1 | Approved colour palette | Doc 06 §5 | All 8 brand hex values present and exact | implemented |
| D2 | Inaccessible Copper `#B0794F` not used for text | Doc 06 §5.4 | Absent from CSS — compliant | implemented |
| D3 | Token naming per Doc 06 §23 | Doc 06 §23 | Deviating names (`--ink` vs `--color-ink-950`) | accepted_exception (pending owner note) |
| D4 | Manrope + Noto Sans Arabic | Doc 06 §6 | Loaded via `next/font/google`, `display: swap` | implemented |
| D5 | Container widths 1440/1240/760 | Doc 06 §7.1 | Only `--container: 1240px` defined | in_progress |
| D6 | Reduced-motion support | Doc 06 §15.2 | `prefers-reduced-motion` block present | implemented |
| D7 | Component library per Doc 07 §3 | Doc 07 | Two monolithic page components instead | not_started |
| D8 | Visual QA across viewports/languages | Doc 07 §16; Doc 15 §17 | No screenshots; `/quality/visual-review/` absent | not_started |
| D9 | No template/UI-library appearance | Doc 06 §22 | Custom CSS, no UI library — appears compliant, **owner review pending** | in_progress |

## E. Pages and blueprints

| # | Requirement | Source | Implementation found | Status |
|---|---|---|---|---|
| E1 | 12 public page types exist | Doc 02 §3 | All 12 routes render | implemented |
| E2 | Homepage blocks H01–H10 | Doc 03 §3 | Hero, audience strip, services, approach, founder, CTA present; **experience preview, delivery model, sectors preview missing** | in_progress |
| E3 | Service detail page blocks | Doc 03 §5–7 | Generic shared template, not blueprint-specific | in_progress |
| E4 | One H1 per page | Doc 03 §17; Doc 12 §12 | Satisfied | implemented |
| E5 | Breadcrumbs on non-home pages | Doc 02 §17 | Absent | not_started |
| E6 | Custom 404 and error boundary | Doc 02 §23 | `not-found.tsx` and `global-error.tsx` absent | not_started |
| E7 | Internal linking rules | Doc 02 §18 | Partial | in_progress |

## F. Media

| # | Requirement | Source | Implementation found | Status |
|---|---|---|---|---|
| F1 | All images under `/public/images` | Doc 10 §2 | Satisfied | implemented |
| F2 | Required folder structure | Doc 10 §3 | Only `placeholders/` exists | not_started |
| F3 | 7 required placeholder SVGs | Doc 10 §9.2 | 2 of 7 present | in_progress |
| F4 | Branded placeholders look intentional | Doc 10 §9.3 | Present; **visual review pending** | in_progress |
| F5 | Image permission gating | Doc 10 §10 | No permission field or gating logic | not_started |
| F6 | `media-rights.json` register | Doc 10 §13 | Absent | not_started |
| F7 | Alt text from locale JSON | Doc 10 §11 | Placeholder images use `alt=""`; no JSON alt field | not_started |
| F8 | Media validation script | Doc 10 §21 | Absent | not_started |
| F9 | Favicon / manifest / OG images | Doc 10 §6.6–6.7, §20 | Absent | not_started |

## G. JSON editor and GitHub

| # | Requirement | Source | Implementation found | Status |
|---|---|---|---|---|
| G1 | `/editjson/{locale}/{pageSlug}` route | Doc 09 §1 | Absent | not_started |
| G2 | Keys read-only, schema-driven controls | Doc 09 §8 | Absent | not_started |
| G3 | Accessible array management | Doc 09 §10 | Absent | not_started |
| G4 | Readable diff before save | Doc 09 §14 | Absent | not_started |
| G5 | Server-side password verification (salted hash) | Doc 08 §17; Doc 09 §15.3 | Absent | not_started |
| G6 | GitHub commit on save | Doc 08 §15 | Absent | not_started |
| G7 | SHA conflict detection → HTTP 409 | Doc 08 §15.4 | Absent | not_started |
| G8 | Path allowlist; no arbitrary file writes | Doc 09 §23 | Absent | not_started |
| G9 | Editor excluded from indexing | Doc 09 §23 | N/A — route does not exist | not_started |
| G10 | Threat assessment before implementation | Doc 16 §23 | Absent | not_started |

## H. Contact and analytics

| # | Requirement | Source | Implementation found | Status |
|---|---|---|---|---|
| H1 | Enquiry form with specified fields | Doc 03 §11 | 5 fields only; **role, phone, country, project location, project stage, consent missing** | in_progress |
| H2 | Server-side validation | Doc 08 §5.3 | Absent — no function | not_started |
| H3 | Honeypot / spam control | Doc 08 §16.2 | Honeypot field present; unverified | in_progress |
| H4 | Verified delivery | Doc 15 §26 | Not configured, not tested | **blocked** |
| H5 | Consent checkbox + privacy link | Doc 11 §21 | Absent | not_started |
| H6 | No response-time promise | Doc 03 §11 CON04 | Compliant | implemented |
| H7 | Analytics wrapper; no direct `gtag` | Doc 14 §28 | No analytics implemented | not_started |
| H8 | Conversion only after server confirmation | Doc 14 §13 | N/A | not_started |
| H9 | Site works with analytics blocked | Doc 14 §29 | Trivially satisfied (none present) | implemented |

## I. SEO and AI discoverability

| # | Requirement | Source | Implementation found | Status |
|---|---|---|---|---|
| I1 | Separate URL per language | Doc 12 §7 | Satisfied | implemented |
| I2 | Reciprocal `hreflang` | Doc 12 §8 | Simple `alternates.languages` map; relative not absolute; no reciprocity validation | in_progress |
| I3 | Self-referencing canonical | Doc 12 §9 | Relative canonical set; no production domain | in_progress |
| I4 | Sitemap from published routes | Doc 12 §19 | `app/sitemap.ts` absent | not_started |
| I5 | robots policy | Doc 12 §18; Doc 13 §18 | Blanket `Disallow: /` — correct pre-launch, wrong for launch | in_progress |
| I6 | JSON-LD structured data | Doc 12 §15 | Absent | not_started |
| I7 | Metadata JSON-driven | Doc 12 §11.3 | Titles/descriptions from JSON; OG image and locale absent | in_progress |
| I8 | Pre-launch noindex | Doc 12 §20 | `robots: {index:false}` on all pages | implemented |
| I9 | Entity fact ledger | Doc 13 §7 | Absent | not_started |
| I10 | `/ai/company-profile.json` | Doc 13 §11 | Absent | not_started |
| I11 | `/llms.txt` | Doc 13 §19 | Absent | not_started |
| I12 | Explicit AI crawler policy | Doc 13 §14–17 | Absent — **owner decision required** | blocked |
| I13 | No hidden bot-only content or prompt injection | Doc 13 §20–21 | None found — compliant | implemented |
| I14 | Entity-consistency script | Doc 13 §29 | Absent | not_started |

## J. Accessibility

| # | Requirement | Source | Implementation found | Status |
|---|---|---|---|---|
| J1 | Localised skip link | Doc 11 §6 | Present in both components | implemented |
| J2 | Semantic landmarks, one main | Doc 11 §5 | `header`/`main`/`footer`/`nav` used | implemented |
| J3 | Correct accessible name on main nav | Doc 11 §15 | **Incorrect** — `aria-label={nav.language}` ("Language") on primary nav | not_started |
| J4 | Mobile menu: expanded state, focus management, Escape | Doc 11 §15 | `<details>` element; no focus trap, no Escape handling, mislabelled toggle | not_started |
| J5 | Visible focus token 3 px | Doc 11 §8 | Present in CSS; not audited | in_progress |
| J6 | Contrast ≥ 4.5:1 | Doc 11 §10 | Palette supports it; no audit run | not_started |
| J7 | Form labels persistent and associated | Doc 11 §20 | Visible labels present; no error handling or `aria-describedby` | in_progress |
| J8 | 200% zoom / 320 px reflow | Doc 11 §11–12 | Not tested | not_started |
| J9 | axe-core automated checks | Doc 11 §32 | Absent | not_started |
| J10 | Manual screen-reader testing | Doc 11 §33 | Not performed | not_started |
| J11 | Language selector uses names not flags | Doc 11 §16 | Text labels used | implemented |

## K. Security

| # | Requirement | Source | Implementation found | Status |
|---|---|---|---|---|
| K1 | No secrets in repository | CLAUDE.md §13 | **Verified clean** — scans for `github_pat_`, `ghp_`, `GITHUB_TOKEN`, `PASSWORD_HASH`, `leadline` all returned zero matches | implemented |
| K2 | No secrets in client bundle | Doc 08 §3 | No secrets exist yet | implemented |
| K3 | Security headers | Doc 08 §20 | 4 of 5 present in `netlify.toml`; **CSP and HSTS absent** | in_progress |
| K4 | `.env.example` documenting variables | Doc 08 §14.4 | Absent | not_started |
| K5 | Dependency vulnerability scan | Doc 15 §25 | Run during this analysis: **critical findings** | **blocked** |
| K6 | Rate limiting / throttling | Doc 09 §23 | Absent | not_started |

## L. Testing and release

| # | Requirement | Source | Implementation found | Status |
|---|---|---|---|---|
| L1 | 10 mandated validation commands | Doc 16 §24 | 1 of 10 (`typecheck`); `build` present but unverified | not_started |
| L2 | Unit tests | Doc 15 §10 | Absent | not_started |
| L3 | Component tests | Doc 15 §11 | Absent | not_started |
| L4 | Integration tests | Doc 15 §12 | Absent | not_started |
| L5 | E2E tests (3 locales) | Doc 15 §13 | Absent | not_started |
| L6 | Visual regression baselines | Doc 15 §18 | Absent | not_started |
| L7 | Viewport matrix screenshots | Doc 15 §16 | Absent | not_started |
| L8 | Lighthouse evidence | Doc 15 §21.2 | Absent | not_started |
| L9 | Rollback performed and documented | Doc 15 §28 | Not performed | not_started |
| L10 | Editor UAT by non-developer | Doc 15 §30 | Not possible — no editor | not_started |
| L11 | `/quality/` evidence structure | Doc 15 §31 | Only this file exists | not_started |
| L12 | Netlify production deploy evidence | Doc 15 §27 | **[VERIFY]** — no deploy ID recorded in repository | not_started |
| L13 | Final implementation report | Doc 16 §29 | Absent | not_started |

---

## Summary

| Status | Count |
|---|---|
| `verified` | **0** |
| `implemented` | 22 |
| `in_progress` | 20 |
| `not_started` | 55 |
| `blocked` | 8 |
| `accepted_exception` | 1 |

**Blocked items require owner action before they can progress:** A1, A2, A3 (factual data), B2/K5 (dependency upgrade decision), C6 (professional translation), H4 (contact credentials), I12 (crawler policy decision).

**No requirement is `verified`.** Verification requires test evidence, deploy evidence and owner approval, none of which exists in the repository at commit `de79094`.
