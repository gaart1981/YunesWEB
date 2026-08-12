# Trust Redesign — Final Implementation Report

**Specification:** `YUNESWEB_TRUST_REDESIGN_TECHNICAL_SPEC.md`
**Branch:** `redesign/trust-engineering-bureau`
**Baseline:** `f8fbca5ea610be79f3f2085bf7bff697827e2d46` — verified as an ancestor of the working head with `git merge-base --is-ancestor`
**Branched from:** `e641ae0` (`feat(seo): set the canonical origin to salimiengineering.com`)
**Status:** Implementation complete for the items listed below. Browser-rendered visual QA **not executed** — see §9.

---

## 1. Design changes

The redesign moves the site from a landing-page cadence to a business-document cadence, per §4 "Quiet Engineering Authority".

| Metric | Before | After | Spec target |
|---|---|---|---|
| Hero height | `min-height: calc(100vh - 82px)` | content-driven, `min-height: 0` | §24.1 remove 100vh |
| H1 scale | `clamp(3rem, 6vw, 6.25rem)` → 48–100px | `clamp(2.125rem, 3.4vw, 3.5rem)` → 34–56px | §5.2 desktop 48–64, mobile 34–42 |
| Content H1 | `clamp(3.2rem, 6vw, 6.1rem)` | `clamp(2.125rem, 3.2vw, 3.25rem)` | §5.2 |
| Internal hero | `min-height: 610px` | `min-height: 0`, padding 48–80px | §7.S01 ~380–500px |
| Section padding | up to `155px` | `44–100px` | §5.4 desktop 72–104, mobile 44–64 |
| Service cards | `min-height: 420px` | content-driven | §24.1 |
| Process cards | `min-height: 345px` | content-driven | §24.1 |
| Fact strip | `min-height: 145px` | content-driven | §24.1 |

New composition patterns were added instead of repeating the card grid: a bordered credibility strip, bordered evidence rows, a two-column delivery block with an accountability chain, and a sector matrix. These use thin rules and `border-block-end` separators rather than boxed cards.

---

## 2. Page architecture changes

### Homepage — reordered per §24.3

Before: `Hero → audience problem cells → services → approach → founder → CTA`
After: `Hero → credibility → services → selected experience → delivery/team model → sectors → founder → CTA`

- **Hero (H02)** — compact, two CTAs instead of three, primary now routes to `/{locale}/contact` rather than `tel:`. Decorative `DESIGN / SUPERVISION / MOROCCO` datum removed (§24.1).
- **Credibility strip (H03)** — new. Four factual signals: founder-led bureau, international project experience, project-specific teams, Morocco-based delivery. No statistics, no invented numbers.
- **Selected experience (H05)** — new. Three projects drawn from the existing verified `experience` page data via `getPageContent`, chosen to span corporate, banking/technical and industrial environments. No new projects invented. Founder-attribution disclosure rendered above the list and the per-project role line retained.
- **Delivery and team model (H06)** — new, replaces the generic "approach" section. Explains scope definition, lead-engineer accountability, mobilised specialists, site presence and reporting. Includes a direction-neutral `Client → Lead engineer → Project team → Contractors / site` chain. Wording uses *engaged / mobilised / hired for the project*; no permanent-employee claim.
- **Sectors preview (H07)** — new, sourced from existing sectors content.
- **Founder (H08)** — retained; CTA changed from `tel:` to the contact page.

### Header (H01)

- **Contact added to desktop navigation** — it was previously absent (§5.5).
- Header CTA changed from a telephone link to a project-oriented link to the Contact page.

### Experience page (E03 / §18.2)

Project visuals are illustrative SVGs, not photographs. Each now carries a visible `<figcaption>` reading "Illustrative image — not the actual project", localised in all four languages. This was previously `aria-hidden` with no label, which risked implying the image was the project.

---

## 3. Files changed

```
components/HomePage.tsx        header, hero, credibility, experience, delivery, sectors
components/ContentPage.tsx     illustrative-image caption on project cards
lib/site-content.ts            Navigation type: illustrativeImage
content/{en,fr,ar,ru}/home.json    hero rewrite + credibility, experiencePreview,
                                    delivery, sectorsPreview blocks
content/site-{en,fr,ar,ru}.json    canonical email, illustrativeImage label
styles/globals.css             metrics + new section styles
styles/content-pages.css       compact heroes, project figure caption
package.json                   check:export, check:design, test scripts
scripts/check-export.mjs       new
scripts/check-design.mjs       new
```

---

## 4. Tests executed

Commands run from the repository root, against a build produced with `next build`:

```bash
npx tsc --noEmit          # typecheck
npm run build             # static export
node scripts/check-export.mjs
node scripts/check-design.mjs
```

| Check | Result | Evidence |
|---|---|---|
| `typecheck` | **PASS** | exit 0, no diagnostics |
| `build` | **PASS** | 51 routes prerendered, 50 `index.html` files |
| Static routes (§22.2) | **PASS** | 48 pages = 4 locales × 12 routes, all present |
| Internal links (§22.3) | **PASS** | every internal `href` resolves to an exported page or asset; `mailto:`/`tel:`/`wa.me` validated as non-empty |
| Media paths (§22.4) | **PASS** | every `<img src="/...">` resolves to an exported asset |
| Locale consistency (§22.5) | **PASS** | `lang` correct per locale, `dir="rtl"` on Arabic only, all four locales present in the switcher on every page |
| Contact form (§22.6) | **PASS** | `form-name=project-enquiry`, `data-netlify` present, every rendered field declared in `public/__forms.html`, ≥4 associated labels |
| Accessibility structure (§19) | **PASS** | exactly one `<h1>`, skip link and `<main>` on all 48 pages |
| Canonical email (§1.4) | **PASS** | `info@salimiengineering.com` on 48 pages; `edsmaroc.com` and `salimiengineering.ma` on **0** |
| Indexing policy (§21) | **PASS** | `robots.txt` still `Disallow: /`; page-level `noindex` on 51 files |
| Design metrics (§5, §24.1) | **PASS** | 66 assertions: banned patterns absent, type scale and spacing within targets |
| Homepage architecture (§6) | **PASS** | required section order verified in all four locales |
| RTL logical properties (§16) | **PASS** | 0 physical `left`/`right` box properties in shipped CSS |
| Illustrative captions (§18.2) | **PASS** | caption count matches project-visual count in all locales |

**Totals: 2551 export assertions + 66 design assertions passed, 0 failures.**

The design check earned its place: its first run failed on five real violations — section paddings of 145px, 140px, 105px and two mobile floors above the 64px target — which were then corrected. It is not a check that trivially passes.

---

## 5. Routes verified

4 locales (`en`, `fr`, `ar`, `ru`) × 12 routes:
`/`, `/services`, `/owners-engineering-amo`, `/electrical-mep-engineering`, `/local-engineering-partner-morocco`, `/sectors`, `/experience`, `/about`, `/contact`, `/legal-notice`, `/privacy-policy`, `/cookie-policy`.

---

## 6. Language status

| Locale | Hero rewritten | New blocks | Notes |
|---|---|---|---|
| EN | yes | yes | semantic source |
| FR | yes | yes | professional French engineering vocabulary; AMO retained |
| RU | yes | yes | технический заказчик, строительный контроль, рабочая документация, пусконаладка, инженерное бюро, проектная команда |
| AR | yes | yes | natural business Arabic; `MEP` retained as a Latin technical abbreviation |

All copy was written per locale rather than machine-translated from English (§25).

---

## 7. Contact form status

Structure verified: rendered fields match the Netlify detection blueprint, form name is correct, labels are associated, the action route exists.

**Delivery is NOT verified.** A prior read of the Netlify project reported `forms: "not enabled"` for site `yunesweb`. Structural correctness does not prove submissions are received. This remains a production-only check (§22.6): submit a test enquiry and confirm it appears in the Netlify Forms tab.

---

## 8. Truth and safety confirmation

- No permanent team size, employee count, office, licence, registration, insurance, certification, testimonial, client logo, budget, completion result or response-time promise was invented.
- No new project records were created. Homepage experience is a filtered view of existing verified data.
- Founder prior experience remains attributed as prior professional experience; the disclosure appears on both the homepage preview and the Experience page.
- Team-model wording uses *engaged*, *mobilised*, *hired for the project* — never *employees*.
- Canonical email is `info@salimiengineering.com` everywhere; legacy addresses render zero times.
- Indexing policy **unchanged**: `robots.txt` still disallows all crawling and every page still carries `noindex, nofollow`. This is asserted by an automated check so it cannot drift silently.
- No secrets added, read or exposed.

---

## 9. Not executed — environment limitations

**Browser-rendered visual QA (§23) was not performed.** Playwright's browser download failed: `Failed to download Chrome for Testing 151.0.7922.34 … Download failure, code=1`. The sandbox network policy permits only npm/PyPI/GitHub domains, and the browser CDN is not among them.

Therefore **no screenshots were captured** at 1440×900, 390×844, 360×800, 768×1024, 1024×768 or 1920×1080, and none of the §23.2 visual-review questions can be answered from evidence. The redesign's numeric targets are verified; its *appearance* is not.

`scripts/check-design.mjs` is the strongest available substitute — it asserts the specification's own numeric targets against the shipped CSS and the section order against built HTML — but it cannot detect overlap, clipping, awkward wrapping or an unconvincing composition.

**Required before this redesign can be declared visually complete:**

1. Open the deploy preview at 1440×900, 390×844, 360×800, 768×1024, 1024×768, 1920×1080.
2. Review EN home desktop and mobile, EN experience, EN about, EN contact mobile, FR home, AR home desktop and mobile, RU home mobile.
3. Confirm no horizontal overflow, no clipped Russian words, correct Arabic RTL flow including the delivery chain.
4. Run Lighthouse — **not executed**, so no performance, accessibility or best-practice scores are claimed.

---

## 10. Deliberate deviations from the specification

1. **No component-library refactor.** §14.1 lists suggested components (`SiteHeader`, `PageHero`, …). The existing two-component structure was extended instead. §14.1 also says not to create abstraction for its own sake and §26 warns against unneeded architectural change; splitting the components would have enlarged the diff without changing the rendered result, making the visual regression risk harder to reason about while browser QA is unavailable.
2. **Services, service-detail, About, Sectors and Contact pages received metric and hero compaction, not full architectural rebuilds.** §7–§12 specify distinct per-page information architectures (S02 engagement roles, D02 client-situation blocks, A02/A04 company-model sections, C02 two-column contact). Those require substantial new per-page content in four languages. They are **not done** and are the largest remaining gap against the Definition of Done.
3. **Playwright was not added as a dev dependency**, since its browser cannot be installed here. Adding an unusable test harness would have produced a script that fails on every run.

---

## 11. Definition of Done — status

**Met:** bureau positioning preserved; compact businesslike hero; credibility strip; concrete services; homepage selected experience; homepage delivery/team model; sectors preview; founder as accountability signal; project CTA; Contact in desktop navigation; internal heroes reduced; oversized typography removed; excessive whitespace reduced; typecheck; build; static routes; internal links; media paths; locale equivalence; contact-form structure; canonical email; no invented facts; attribution preserved; indexing policy unchanged; no secrets exposed.

**Not met, with evidence above:** Services / service-detail / About / Contact per-page information architectures (§10.2 of this report); browser smoke test (§9); responsive verification at the six required viewports (§9); Arabic RTL *visual* verification — attributes and logical properties are verified, rendered layout is not (§9); Lighthouse targets (§9).

This report does not claim the redesign is visually complete. It claims the structural, content and metric work is done and verified, and that the visual review remains outstanding with a specific reason.
