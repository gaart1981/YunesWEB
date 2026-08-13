# Trust Redesign — Final Implementation Report

**Specification:** `YUNESWEB_TRUST_REDESIGN_TECHNICAL_SPEC.md`
**Branch:** `redesign/trust-engineering-bureau`
**Baseline:** `f8fbca5ea610be79f3f2085bf7bff697827e2d46` — verified as an ancestor of the working head with `git merge-base --is-ancestor`
**Branched from:** `e641ae0` (`feat(seo): set the canonical origin to salimiengineering.com`)
**Status:** Second pass complete. All public-page information architectures in §7–§13 are now implemented. Browser-rendered visual QA remains **not executed** — see §9.

**Commits:** `cfe7bdf` (homepage and global metrics) then the second-pass commit recorded at the end of this report (Services, service-detail, Sectors, Experience, About, Contact, legal pages).

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
2. ~~Services, service-detail, About, Sectors and Contact pages received metric and hero compaction, not full architectural rebuilds.~~ **Resolved in the second pass** — see §12 below.
3. **Playwright was not added as a dev dependency**, since its browser cannot be installed here. Adding an unusable test harness would have produced a script that fails on every run.

---

## 11. Definition of Done — status

**Met:** bureau positioning preserved; compact businesslike hero; credibility strip; concrete services; homepage selected experience; homepage delivery/team model; sectors preview; founder as accountability signal; project CTA; Contact in desktop navigation; internal heroes reduced; oversized typography removed; excessive whitespace reduced; typecheck; build; static routes; internal links; media paths; locale equivalence; contact-form structure; canonical email; no invented facts; attribution preserved; indexing policy unchanged; no secrets exposed.

**Not met, with evidence above:** Services / service-detail / About / Contact per-page information architectures (§10.2 of this report); browser smoke test (§9); responsive verification at the six required viewports (§9); Arabic RTL *visual* verification — attributes and logical properties are verified, rendered layout is not (§9); Lighthouse targets (§9).

This report does not claim the redesign is visually complete. It claims the structural, content and metric work is done and verified, and that the visual review remains outstanding with a specific reason.


---

## 12. Second pass — per-page information architecture (§7–§13)

The first pass left the internal pages on a single generic template. That gap is now closed. Each page family renders a different set of blocks in a different order, so the site no longer repeats one component shape.

### New content blocks, written per locale in EN / FR / AR / RU

| Block | Pages | Spec |
|---|---|---|
| `engagementRoles` | Services | S02 — four ways the bureau can be engaged, 2×2 grid |
| `engagementFormats` | Services | S04 — focused mission → medium-sized scope |
| `teamModel` | Services, Electrical & MEP, Local Partner | S05 / D06 — capacity without headcount claims |
| `clientSituation` | all three service-detail pages | D02 — "Use this service when…" qualifying list |
| `relatedExperience` | Services, three detail pages, Sectors | S06 / D07 / SE04 — real records from existing data |
| `companyModel` | About | A02 — company before founder |
| `clientWorkflow` | About | A05 — how clients work with the bureau |
| `whatToSend` | Contact | C02 — what information is useful |
| `privacyNote` | Contact | C05 — short note linked to the Privacy page |
| `priorExperienceNote` | shared | attribution line above every related-experience list |

### Resulting page architectures

- **Services** — hero → facts → engagement roles → six capability items → process → engagement formats → team model → related experience → CTA (9 sections).
- **Owner's Engineering & AMO** — hero → facts → *Use this service when* → what we control → intervention sequence → deliverables → related experience → CTA.
- **Electrical & MEP** — as above plus a **team-resourcing** section explaining how discipline specialists are engaged.
- **Local Engineering Partner** — as above plus a **local capacity** section covering mandate, attendance frequency and evidence.
- **Sectors** — hero → sector matrix → cross-sector technical problems → related experience → CTA.
- **About** — hero → facts → **"What Salimi Engineering is"** → founder message → why clients work directly → working relationship → **how clients work with the bureau** → CTA. The company is now the first subject on the page; the founder follows as the accountability signal.
- **Contact** — compact hero → contact details + *what to include* + form + privacy note → WhatsApp CTA.
- **Legal / Privacy / Cookies** — new `content-hero--reference` treatment: no hero CTAs, reduced H1 (`clamp(1.6rem, 2.4vw, 2.25rem)`), 72ch measure, tighter section rhythm.

### A real defect found and fixed by static review

The Russian Privacy page H1 contains **«конфиденциальности» — 18 characters**. At the previous mobile H1 floor this would have needed to break mid-word at 360px. The reference-page treatment reduces the H1 on exactly those pages, which resolves it at source rather than relying on the `overflow-wrap` safety net. Longest H1 word per locale is now: EN 14, FR 15, AR 11, RU 18 on reference pages only (at reduced size).

### Test coverage added, not weakened

`scripts/check-design.mjs` now additionally asserts:

- a **per-page architecture contract** — each route must contain its required blocks (`role-grid`, `format-rows`, `team-model-layout`, `situation-layout`, `model-layout`, `workflow-rows`, `what-to-send`, `privacy-note`, `evidence-rows`) in all four locales;
- **legal pages must not render hero CTAs** (§13);
- **banned marketing copy** — `permanent team/staff/employees`, `world-class`, `cutting-edge`, `best-in-class`, `seamless`, `unmatched`, `guaranteed` (§17.1, §17.3).

Assertions grew from 66 to **292** on the design suite and from 2551 to **2575** on the export suite. No existing assertion was relaxed.

### Second-pass results

```
npx tsc --noEmit            PASS
npm run build               PASS — 51 routes, 50 index.html
node scripts/check-export.mjs   PASS — 48 pages, 2575 assertions
node scripts/check-design.mjs   PASS — 292 assertions
```

### Specification checklist

| Section | Status |
|---|---|
| §5 design system (colour, type, spacing, header, buttons, radii) | implemented, verified by metric assertions |
| §6 homepage blueprint H01–H10 | implemented, order verified in 4 locales |
| §7 Services page S01–S07 | implemented |
| §8 service-detail D01–D08, three distinct architectures | implemented |
| §9 Sectors SE01–SE05 | implemented |
| §10 Experience E01–E05 | implemented — evidence rows, structured metadata, disclosure, illustrative captions in 4 locales |
| §11 About A01–A07 | implemented — company model precedes founder |
| §12 Contact C01–C05 | implemented — C04 delivery **not verifiable here** |
| §13 legal pages | implemented — reference treatment |
| §14 components / content model | implemented — all business copy stays JSON-driven |
| §15 responsive | **blocked by environment** — CSS targets asserted, rendering not observed |
| §16 Arabic RTL | partially verified — `dir`, logical properties, section parity asserted; **visual flow not observed** |
| §17 copy and trust rules | implemented, banned-copy assertion added |
| §18 imagery | implemented — captions prove illustrative status |
| §19 accessibility | structure verified (single h1, skip link, main, labels); **contrast and keyboard not observed** |
| §20 performance | **not measured** — Lighthouse not executed |
| §21 SEO / indexing | preserved and asserted |
| §22 functional tests | implemented and passing |
| §23 visual QA | **blocked by environment** |

### Still blocked by environment (unchanged)

Browser automation cannot run: Playwright's browser download is refused by the sandbox network policy. Therefore **no screenshots, no viewport verification, no Lighthouse scores, no contrast measurement, no keyboard-navigation trace, and no Arabic visual-flow confirmation.** These remain the only outstanding items, and none can be closed from inside this environment.

Nothing has been pushed or merged. All work is local on `redesign/trust-engineering-bureau`.

---

## 13. Third pass — whole-site consistency corrections

Independent review of the pushed branch found that the redesign was applied to the homepage and to page *content* architecture, but several global patterns had survived. All eight points are corrected below.

### 1. Internal-page header now matches the homepage

`ContentPage.tsx` had a different header interaction model from `HomePage.tsx`:

| | Before | After |
|---|---|---|
| Contact in desktop nav | **absent** | present |
| Header CTA target | `tel:` | `/{locale}/contact` |
| Mobile menu CTA | `tel:` | `/{locale}/contact` |

The duplicate Contact link in the mobile menu was removed, since Contact is now part of the shared `links` list. The unused `phoneHref` in the header scope was deleted. Telephone and WhatsApp remain available on the Contact page and in the footer, as the specification intends.

### 2. Header height

`.header-inner` was `82px`. Now `74px`, inside the 72–76px target. The mobile menu is positioned with `top`, which was hard-coded to the old `82px` and would have opened with an 8px gap — it is now `74px` and an assertion binds the two values together so they cannot drift apart again.

### 3. Typography

| Element | Before | After | Target |
|---|---|---|---|
| Global H2 | `clamp(2.25rem, 4vw, 4.15rem)` → up to 66px | `clamp(1.75rem, 2.6vw, 3rem)` → 28–48px | 34–48px desktop |
| Founder blockquote | `clamp(1.3rem, 2.2vw, 2rem)` → up to 32px | `clamp(1.05rem, 1.4vw, 1.5rem)` → up to 24px | accent, not a second heading |

The blockquote measure widened from 27ch to 34ch and its top margin dropped from 44px to 28px, so the reduction reads as deliberate rather than shrunken.

### 4. Hero density

`.hero-media` had `min-height: 520px` in `globals.css` **and** `min-height: 360px` in `marketing.css`. Both are gone. The frame is now driven by `aspect-ratio`, changed from `4 / 5` to `4 / 3`: at a ~40% column the portrait ratio alone produced a ~620px block, which kept the credibility strip below the fold regardless of the min-height removal. No `100vh` behaviour was reintroduced.

### 5. Fixed card heights

Removed: `.content-card` 355px, `.process-grid article` 340px, `.content-card` 270px (mobile), `.project-card` 360px, `.fact-grid > div` 142px, `.hero-drawing` 360px → 240px, `.content-hero-media` 360px, `.project-photo` 360px.

`marketing.css` was the file that kept several of these alive. It had not been audited in the first two passes — the design check now reads all three stylesheets, which is how the surviving `.hero-media` rule was found.

Padding now carries the structure: `.content-card` 26px/28px, `.process-grid article` 26px/24px.

### 6. Service and process heading spacing

Two `margin-top: 72px` rules reduced to `40px`, and `.process-grid h3` from 38px to 18px.

### 7. Related experience is now genuinely related

Previously every page rendered `experienceRecords.slice(0, 3)` — Owner's Engineering, Electrical & MEP, Local Partner, Sectors and Services all showed the same first three records. On pages whose purpose is credibility, that is filler rather than evidence.

Two changes:

1. **Stable ids** added to all eight project records in all four locales (`mailru-office`, `beeline-office`, `microsoft-offices`, `tinkoff-callcentre`, `citibank-callcentre`, `faurecia-plant`, `tram-lighting`, `manor-systems`). Titles and sectors are localised; ids are not, so the mapping is locale-independent.
2. **`lib/related-experience.ts`** maps each page to the records that actually fit its scope, with the rationale recorded in the file.

| Page | Records | Why |
|---|---|---|
| Owner's Engineering & AMO | Manor house, Citibank, Tinkoff | the explicit owner-side review/supervision record, plus two coordinated sets an owner's engineer would sign off |
| Electrical & MEP | Citibank, Tinkoff, Beeline | load calculations, life-safety, coordinated multi-discipline document sets |
| Local Partner | Faurecia, Tram lighting, Manor house | industrial site work, distributed multi-city infrastructure, on-site supervision |
| Sectors | Mail.ru, Faurecia, Tram lighting | deliberately spans three different project environments |
| Services | Mail.ru, Citibank, Faurecia | breadth across corporate, banking and industrial |

No project was invented. The founder-attribution line renders above every list. Unknown ids are skipped rather than throwing, so a content rename degrades to fewer cards instead of breaking the build.

### 8. New regression guards

Each assertion exists because the matching defect shipped once already:

- Contact present in desktop nav on **both** page types, across four locales and six routes;
- header CTA resolves to Contact and is not a `tel:` link;
- `.header-inner` height stays within 72–76px, **and** the mobile-menu `top` equals it;
- global H2 ceiling does not exceed 48px;
- `.content-card` 355px, `.process-grid` 340px and any large fixed `.hero-media` height are absent;
- `ContentPage.tsx` contains no `experienceRecords.slice(`;
- the rendered related-experience sets across the five pages are **not all identical**.

### Third-pass results

```
npx tsc --noEmit                PASS (exit 0)
npm run build                   PASS — 51 routes
node scripts/check-export.mjs   PASS — 48 pages, 2619 assertions
node scripts/check-design.mjs   PASS — 353 assertions
```

Design assertions 292 → **353**; export assertions 2575 → **2619**. No assertion was relaxed. The new hero-media guard failed on its first run and exposed the un-audited `marketing.css`, which is the defect it was written to catch.

Browser-rendered QA remains blocked by the sandbox network policy — unchanged from §9.
