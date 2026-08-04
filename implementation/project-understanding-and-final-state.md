# Project Understanding and Final State — Salimi Engineering Website

**Document status:** Analysis only. No production code was created or modified during this task.
**Analysis date:** 2026-08-04
**Repository analysed:** `gaart1981/YunesWEB`
**Branch analysed:** `main`
**Commit analysed:** `de79094` — "feat: publish complete multilingual corporate site"
**Repository visibility:** Public (confirmed via GitHub metadata `repository_public: true`)
**Basis of analysis:** actual repository contents at commit `de79094`, root `CLAUDE.md`, and all 16 documents in `/source_docs` read in numerical order.

Nothing in this document is derived from previous chat messages, prior reports or commit messages. Where a prior record and the repository disagree, the repository is treated as authoritative.

---

## 0. Evidence classification used throughout

| Marker | Meaning |
|---|---|
| **[FACT]** | Directly verified in the repository or specifications during this analysis |
| **[ASSUMPTION]** | Reasonable inference, not verified |
| **[VERIFY]** | Must be confirmed by the project owner |
| **[RISK]** | Identified risk or limitation |

---

## 1. Commercial purpose of the website

**[FACT — Doc 01 §4, §5]** The website exists to create qualified commercial conversations with organisations that need engineering, technical representation, project coordination or local delivery support in Morocco.

It is a **B2B lead-generation and credibility instrument**, not a brochure and not a portfolio. Three commercial entry routes must be supported:

1. **International companies** entering Morocco, bidding for Moroccan work, or delivering projects there and needing a local technical representative.
2. **Moroccan project owners and developers** needing owner's engineering, design review, tender support, technical coordination and construction follow-up.
3. **Engineering firms and contractors** needing local capacity, specialist subcontracting, site surveys or additional engineering resources.

**[FACT — Doc 01 §5.3]** Explicitly out of scope for the first release: e-commerce, client portals, project management software, engineering calculation tools, document sharing, online payment, public user accounts, recruitment workflows, CRM, instant quotations, tender aggregation.

**[FACT — Doc 01 §21]** Success is measured by qualified enquiries, form completion, contact clicks, service-page and experience-page visits, language usage, organic impressions and branded search growth. No revenue or enquiry-volume guarantee is implied.

---

## 2. Salimi Engineering positioning

**[FACT — Doc 01 §6.1]** Core positioning statement:

> Salimi Engineering is a Morocco-based, founder-led engineering and project advisory partner supporting international and local clients with engineering coordination, owner's representation and local project delivery.

**[FACT — Doc 01 §6.2]** Short brand description:

> International engineering experience. Local project delivery in Morocco. Direct founder involvement.

**[FACT — Doc 01 §6.3]** The company sells direct access to the founder, international project experience, disciplined engineering coordination, local understanding, project-specific team formation, clear communication and controlled technical delivery. It **does not** sell the appearance of corporate scale.

**[FACT — Doc 01 §6.4]** The site must **not** describe the company as a market leader, a large multidisciplinary group, a contractor able to execute any project, a company with decades of corporate history, an organisation with unconfirmed offices or staff, an authorised signatory for legally unconfirmed disciplines, or a participant in projects where the founder's involvement was in another employment context without clear disclosure.

**[FACT — Doc 01 §7]** Three service pillars, and only three:

1. Owner's Engineering & AMO
2. Electrical & MEP Engineering
3. Local Engineering Partner in Morocco

**[FACT — Doc 01 §22]** Decision-priority order when trade-offs occur: factual accuracy → trust → clarity → conversion relevance → accessibility → performance → visual distinction → implementation convenience.

---

## 3. Target clients and markets

**[FACT — Doc 01 §8, §9]** Audience priority for the first release:

| Rank | Audience | Core question the site must answer |
|---|---|---|
| 1 | International companies entering/operating in Morocco | Can this company represent us locally and report in EN/FR? |
| 2 | International and Moroccan project owners / investors | Who protects our technical interests and is directly accountable? |
| 3 | Engineering firms and EPC contractors | Can it mobilise quickly and coordinate MEP/electrical interfaces? |
| 4 | Moroccan contractors and specialist partners | Can it complement our team or act as subcontractor/consortium partner? |
| 5 | Public-sector clients (mainly via partnership/consortium) | — |

**Markets:** Morocco as the delivery geography; international companies as the primary demand source; Francophone business environment as a linguistic necessity; Arabic for local trust and verification.

**[FACT — Doc 01 §9]** Terminology must be internationally understandable while preserving French AMO vocabulary where commercially useful.

---

## 4. Expected final visual impression

**[FACT — Doc 06 §2.1]** The design concept is **Quiet Engineering Confidence** — confidence through restraint, proportion and precision.

**[FACT — Doc 06 §2.2]** Within the first 15 seconds the visitor should feel:

1. this company understands serious technical projects;
2. the founder will be personally accountable;
3. the company can communicate with international organisations;
4. the site is controlled, coherent and trustworthy;
5. the company is selective and professional rather than improvised.

**[FACT — Doc 06 §2.1]** Premium perception must come from disciplined spacing, strong typography, a limited colour system, excellent alignment, meaningful photography, controlled motion, concise copy, exact component states, consistent image treatment and technically credible details — **not** decoration.

**[FACT — Doc 06 §3]** The site must sit visually between an international engineering consultancy, an owner's advisory firm and a boutique technical project partner. It must not resemble a residential contractor, real-estate agency, construction marketplace, technology start-up, architecture magazine, governmental institution or personal CV site.

---

## 5. Approved design system and visual restrictions

### 5.1 Colour system **[FACT — Doc 06 §5]**

| Token | Name | HEX | Use |
|---|---|---|---|
| `--color-ink-950` | Ink Navy | `#0B1826` | Dark backgrounds, headings, footer |
| `--color-slate-900` | Deep Slate | `#172532` | Secondary dark surfaces |
| `--color-steel-700` | Steel | `#53616D` | Secondary text, dividers, metadata |
| `--color-porcelain-50` | Porcelain | `#F6F4EF` | Main warm page background |
| `--color-white` | White | `#FFFFFF` | Cards, inverse text |
| `--color-sand-300` | Warm Sand | `#D8C5A5` | Premium warm accent |
| `--color-copper-600` | Dark Copper | `#7C4E2F` | Accessible accent text/borders |
| `--color-copper-400` | Copper | `#B0794F` | **Decorative only** on light backgrounds |
| `--color-tech-700` | Technical Blue | `#2F6480` | Links, focus, diagrams |

**[FACT — Doc 06 §5.4]** Copper `#B0794F` must **not** carry normal-sized white button text — insufficient contrast. Use Dark Copper `#7C4E2F` for accessible filled accents.

**[FACT — Doc 06 §5.5]** Colour distribution: 55–65% Porcelain/White; 20–30% Ink Navy/Deep Slate; 8–12% Steel and borders; 3–6% accents. Accent scarcity is part of the premium effect.

### 5.2 Typography **[FACT — Doc 06 §6]**

- Latin: **Manrope** — weights 400/500/600/700 only.
- Arabic: **Noto Sans Arabic**.
- Type scale from `display-xl` (homepage statement only) down to `label`.
- Line length: body 55–72 characters; lead paragraph max 62; founder message 60–75; legal max 80.

### 5.3 Layout and spacing **[FACT — Doc 06 §7, §8]**

- `--container-max: 1440px`, `--content-max: 1240px`, `--reading-max: 760px`.
- Side padding `clamp(20px, 4vw, 72px)`.
- Grids: 12 columns desktop, 8 tablet, 4 mobile.
- Base spacing unit 4 px; approved tokens 4…160 px.
- Section spacing: desktop 96–160 px, tablet 80–112 px, mobile 64–88 px.
- Radii: cards 8–12 px, inputs/buttons 6–8 px, pill for status tags only.
- Shadows used rarely; borders and spacing carry most separation.

### 5.4 Section rhythm **[FACT — Doc 06 §10]**

Recommended homepage rhythm: dark/split hero → light audience/services → warm neutral evidence → dark founder/delivery → light projects/sectors → dark final CTA. Background colour must **not** alternate mechanically.

### 5.5 Absolute visual prohibitions **[FACT — Doc 06 §22, CLAUDE.md §7]**

The implementation must be **rejected** if it uses: generic stock construction hero; dark blue gradient on every page; excessive rounded cards; glassmorphism; neon accents; animated counters without verified data; floating decorative blobs; full-page video; arbitrary icons in coloured circles; non-existent testimonials; fake partner logo strips; copied template section order; identical card grids for every content type; three-column layouts on narrow mobile; low-contrast grey text; large red/green flag motif; parallax; autoplay video; decorative Moroccan flag theming.

### 5.6 Motion **[FACT — Doc 06 §15]**

Allowed: 150–240 ms colour transitions; 200–320 ms restrained reveal; 2–4 px arrow movement; image scale ≤ 1.015 on hover. Prohibited: parallax, scroll hijacking, auto-carousels, large object movement, animated counters, loading animations that delay content. `prefers-reduced-motion: reduce` must remove non-essential movement.

---

## 6. Complete sitemap and page structure

**[FACT — Doc 02 §3]** Twelve public page types in the first release.

### 6.1 Route table **[FACT — Doc 02 §6]**

| Stable page ID | English route | French route | Arabic route |
|---|---|---|---|
| `home` | `/en/` | `/fr/` | `/ar/` |
| `services` | `/en/services` | `/fr/services` | `/ar/services` |
| `owners_engineering` | `/en/owners-engineering-amo` | `/fr/ingenierie-maitre-ouvrage-amo` | `/ar/owners-engineering-amo` |
| `electrical_mep` | `/en/electrical-mep-engineering` | `/fr/ingenierie-electrique-mep` | `/ar/electrical-mep-engineering` |
| `local_partner` | `/en/local-engineering-partner-morocco` | `/fr/partenaire-ingenierie-maroc` | `/ar/local-engineering-partner-morocco` |
| `sectors` | `/en/sectors` | `/fr/secteurs` | `/ar/sectors` |
| `experience` | `/en/experience` | `/fr/experience` | `/ar/experience` |
| `about` | `/en/about` | `/fr/a-propos` | `/ar/about` |
| `contact` | `/en/contact` | `/fr/contact` | `/ar/contact` |
| `legal_notice` | `/en/legal-notice` | `/fr/mentions-legales` | `/ar/legal-notice` |
| `privacy` | `/en/privacy-policy` | `/fr/politique-confidentialite` | `/ar/privacy-policy` |
| `cookies` | `/en/cookie-policy` | `/fr/politique-cookies` | `/ar/cookie-policy` |

**Critical architectural rule [FACT — Doc 02 §5]:** every page has a **stable internal identifier independent of the visible URL**. The stable ID (`owners_engineering`, `local_partner`, …) is what the editor and content system use; public slugs may be localised.

### 6.2 Navigation **[FACT — Doc 02 §4]**

Maximum six primary textual items plus language selector: Home, Services, Sectors, Experience, About, Contact. Persistent primary CTA: **Discuss a Project**. Services submenu exposes the three detail pages. No navigation label may be hardcoded.

### 6.3 Page hierarchy **[FACT — Doc 02 §8]**

```
Home
├── Services
│   ├── Owner's Engineering & AMO
│   ├── Electrical & MEP Engineering
│   └── Local Engineering Partner in Morocco
├── Sectors
├── Selected Experience
├── About & Founder
└── Contact
Footer only
├── Legal Notice
├── Privacy Policy
└── Cookie Policy
```

### 6.4 Page blueprints summary **[FACT — Doc 03]**

- **Home** — H01 Hero, H02 Client relevance strip, H03 Service pillars (3 cards), H04 Why Salimi Engineering (4–5 evidence points), H05 Selected experience preview (3–6 cards), H06 Delivery model (5 steps), H07 Founder introduction, H08 Sectors preview (4–7 tiles), H09 Final CTA, H10 Footer. Hero: max 75-char headline, max 220-char support text, one primary action, no slider, no background video.
- **Services** — S01 hero, S02 value model, S03 three expanded pillars, S04 engagement formats, S05 project stages, S06 delivery principles, S07 related experience, S08 CTA.
- **Owner's Engineering & AMO** — OE01–OE08: hero, client problem, three-part scope, deliverables, working model, audience, relevant experience, CTA.
- **Electrical & MEP** — EM01–EM09: hero, capability groups (electrical / low-current / MEP coordination), stages, deliverables, delivery model, quality principles, experience, CTA, optional regulatory disclaimer (legal review required).
- **Local Partner** — LP01–LP09: hero, market-entry problem, service modules, cooperation model, why Salimi, client profiles, experience, founder note, CTA. **Principal target for international SEO and advertising.**
- **Sectors** — SEC01–SEC05, seven initial sectors.
- **Experience** — EXP01–EXP06, with mandatory relationship disclosure. Filters must **not** be implemented with fewer than six projects.
- **About & Founder** — AB01–AB08, founder message 150–250 words.
- **Contact** — CON01–CON06.
- **Legal / Privacy / Cookies** — field lists pending legal advice.

### 6.5 Error pages **[FACT — Doc 02 §23]**

Required: 404 (language-aware, links to Home/Services/Contact, no stack details), content-unavailable state, form error preserving input, editor error without secret exposure.

---

## 7. Multilingual architecture (EN / FR / AR)

**[FACT — Doc 08 §9, Doc 12 §7]**

- Every public route carries an explicit locale segment `/[locale]/...`; supported locales `en`, `fr`, `ar`.
- `/` redirects to `/en/`. English is the default international route.
- A **central route map** maps stable page IDs to locale routes. Navigation and language switching must use this map — not string concatenation.
- No language may be served from a shared URL based on browser language, cookies, IP or JavaScript state.

**[FACT — Doc 02 §21]** Language switching must route to the **equivalent page** in the target language, preserve page identity, and never silently return to the homepage. If a translation is unavailable, show a controlled message or approved fallback — never silently mix languages.

**[FACT — Doc 01 §14.4]** English source copy is approved first; French and Arabic follow the same content IDs. Translation preserves meaning, not word order. Technical terminology requires competent professional review. Missing translations must not silently fall back in production unless explicitly approved. The language selector must always remain available.

**[FACT — Doc 08 §8.3]** Production fallback policy: no silent cross-language fallback for page body copy; missing page translation returns a controlled unavailable state or 404; draft content never becomes public.

---

## 8. Arabic RTL requirements

**[FACT — Doc 06 §20, Doc 02 §22, Doc 11 §29]** Arabic is **not** created by applying `text-align: right`.

Required:

- `<html lang="ar" dir="rtl">` set at the root; no component may independently guess direction.
- Major layout flows reversed where semantically appropriate.
- Numbers, Latin technical codes, email addresses, telephone numbers and project codes retain correct direction and remain readable.
- Directional arrows and chevrons mirror; telephone, email and neutral icons do not.
- The wordmark is **not** reversed.
- Logical CSS properties throughout (`margin-inline`, `padding-inline`, `border-inline-start`, `inset-inline`, `text-align: start`).
- Line length adapted; Arabic font weight and vertical alignment verified; premium whitespace maintained; Arabic text not compressed.
- Logical tab and keyboard order maintained; focus order tested.
- Mixed Arabic/Latin content tested.
- Screen-reader language pronunciation checked; form error placement and number input direction verified.

**[FACT — Doc 15 §20]** RTL acceptance requires checking reading order and semantics — **not** merely comparing mirrored screenshots.

**[FACT — Doc 01 §14.3]** Arabic must be professionally reviewed before publication.

---

## 9. Mobile and responsive requirements

**[FACT — CLAUDE.md §8, Doc 15 §16]** Responsive behaviour is mandatory, not optional.

Required test viewports:

```
360 × 800    390 × 844    768 × 1024
1024 × 768   1280 × 800   1440 × 900   1920 × 1080
```

Arabic at minimum: 360 × 800, 768 × 1024, 1440 × 900. Browser zoom tested at 200%.

**[FACT — CLAUDE.md §8, Doc 06 §21]** At mobile widths: preserve complete core content; place key text before non-essential media; maintain premium spacing and hierarchy; keep controls touch-usable; do not compress desktop grids into unreadable layouts; keep language switching and project contact reachable; maintain 20–24 px horizontal padding; do not shrink desktop typography mechanically.

**Mobile content priority [FACT — Doc 06 §21]:** positioning statement → service relevance → founder credibility → selected evidence → contact action.

**[FACT — Doc 12 §24]** Because indexing is mobile-first, mobile must contain the same core text, links, structured data, alt text and metadata as desktop. No experience evidence may be desktop-only.

**[FACT — Doc 11 §11, §12]** Content must reflow at 320 CSS px with no horizontal scrolling, no clipped headings, no text in fixed-height boxes, and no sticky element covering focused content.

---

## 10. JSON-driven content architecture

**[FACT — Doc 04 §2.1]** Components must **not** contain headings, paragraphs, navigation labels, CTA labels, service descriptions, legal text, contact details, user-facing error messages, image alt text or SEO metadata. Permitted exceptions: technical fallback messages preventing application failure, developer-only diagnostics, and framework-required accessibility defaults where no content alternative exists.

**[FACT — Doc 04 §3]** Specified content root:

```
/content/
├── shared/    company.json, routes.json, settings.json,
│              projects.json, services.json, sectors.json
├── en/        global.json, navigation.json, home.json, services.json,
│              owners_engineering.json, electrical_mep.json, local_partner.json,
│              sectors.json, experience.json, about.json, contact.json,
│              legal_notice.json, privacy.json, cookies.json
├── fr/        (same page files)
└── ar/        (same page files)
/schemas/      global, page, project, service, sector schemas
```

**[FACT — Doc 04 §6]** Base page model:

```json
{
  "pageId": "home", "locale": "en", "status": "draft", "version": 1,
  "updatedAt": "...", "seo": {}, "hero": {}, "sections": [],
  "finalCta": {}, "editor": {}
}
```

**[FACT — Doc 04 §10]** Approved section types: `richText`, `cardGrid`, `serviceCards`, `projectCards`, `sectorCards`, `trustPoints`, `processSteps`, `founderIntro`, `founderMessage`, `logoStrip`, `contactMethods`, `contactForm`, `faq`, `callout`, `stats`, `timeline`, `relatedLinks`, `legalText`. A component registry maps `type` → component. **Unknown section types must fail validation, not render silently.**

**[FACT — Doc 04 §22]** Publication states: `draft` → `review` → `published` → `archived`. Only `published` may be routed publicly in production.

**[FACT — Doc 04 §2.2]** JSON keys are part of the content API: English, `camelCase`, stable, purpose-describing, never translated, never changed through the editor.

**[FACT — Doc 04 §19]** Rich text is restricted Markdown (paragraphs, bold, italic, links, lists, headings below H1). Raw HTML, scripts, iframes, inline event handlers, embedded forms and arbitrary style attributes are disallowed. Rendered rich text must be sanitised.

**[FACT — Doc 08 §8.1]** Components must **not** import JSON directly. A content service layer (`lib/content/getPageContent.ts` etc.) resolves locale and page ID, loads JSON, validates with Zod, merges shared and localised entities, removes unpublished data and returns typed content.

**[FACT — Doc 04 §23, Doc 08 §8.2]** Validation runs in the editor, in the Netlify Function, during build and in tests. **Server-side validation is authoritative.** The build must fail on invalid JSON, duplicate stable IDs, missing required translations, invalid image paths, prohibited placeholders in published content, or hardcoded business text in components.

---

## 11. Media and image architecture

**[FACT — Doc 10 §2, §3]** All public visual assets live under `/public/images` with this structure:

```
/public/images/
├── brand/ (wordmark, symbol, favicon, social)
├── founder/
├── projects/project-001/ …
├── services/ (owners-engineering, electrical-mep, local-partner)
├── sectors/ (7 sector folders)
├── backgrounds/  ├── diagrams/  ├── icons/
├── placeholders/ └── documents/
```

**[FACT — Doc 10 §6]** Size standards: founder portrait 4:5 (master ≥ 1600×2000); homepage hero 16:10 or 3:2 (master ≥ 2400 px wide); project cards 16:10 (≥ 1800×1125); sector cards 4:3; service media 3:2 or 4:3; Open Graph 1200×630.

**[FACT — Doc 10 §7]** Weight targets: hero ≤ 300 KB, project/sector ≤ 180 KB, founder ≤ 220 KB, thumbnail ≤ 120 KB, SVG icon ≤ 20 KB, OG ≤ 250 KB.

**[FACT — Doc 10 §9.2]** Required placeholder files: `founder-portrait-4x5.svg`, `hero-engineering-16x10.svg`, `project-image-16x10.svg`, `sector-image-4x3.svg`, `service-image-3x2.svg`, `og-image-1200x630.svg`, `logo-mark-square.svg`. Placeholders must show role label, expected file path and aspect ratio, and must look intentional.

**[FACT — Doc 10 §10]** Image permission values: `unknown`, `approved`, `restricted`, `expired`, `not_required`. **Only `approved` or `not_required` may display in production.**

**[FACT — Doc 10 §13]** A media rights register `/content/shared/media-rights.json` records owner, source, permission status, dates, permitted uses and evidence reference for each asset.

**[FACT — Doc 10 §17]** AI-generated imagery must **not** be used as project evidence, founder portrait, team photography, client asset or factual facility image.

**[FACT — Doc 10 §16]** Stock photography is prohibited for trust-critical sections: no fake founder/team, no fake client meeting, no generic hard-hat group, no unrelated stadium near experience content, no fake Moroccan project.

**[FACT — Doc 10 §22]** Replacing a placeholder must require **no component source-code edit** — only file placement plus JSON update (`src`, dimensions, alt, permission status), media validation, crop review, alt-text review in three languages, then deploy preview and approval.

---

## 12. Founder and project attribution rules

**[FACT — CLAUDE.md §4, Doc 02 §13, Doc 04 §12, Doc 13 §13]** This is one of the most heavily protected requirements in the specification set.

Three mandatory relationship types, which must never be omitted, translated or abbreviated away:

```
founder_prior_experience
company_assignment
partner_assignment
```

Rules:

- Every project card carries `relationshipType`.
- The distinction must appear in visible project content, project JSON, project structured data **and** AI profile summaries.
- An AI-oriented output may **not** drop the disclosure for brevity.
- Until the company has its own completed assignments, the Experience page heading is **"Selected Professional Experience"**.
- Required visible disclosure: *"Unless otherwise stated, the projects shown reflect Yunes Salimi's professional experience in previous engineering roles."*
- Search snippets must not imply the new company delivered all founder projects.

**[FACT — Doc 05 §12.3]** Prohibited: describing prior-employer projects as Salimi Engineering projects; using client logos without permission; publishing confidential values; attributing full project delivery to Yunes if his role was narrower; using images from unrelated projects; inventing results.

**[FACT — CLAUDE.md §4]** Never invent: projects, client names, budgets, dates, testimonials, employees, permanent team size, offices, addresses, registrations, licences, insurance, certifications, awards, partners, response times, World Cup participation, or legal authority to sign engineering documents.

**[FACT — Doc 15 §7.3]** One exact founder-name spelling across public pages, metadata, structured data, JSON, image alt text, footer, `llms.txt` and company profile.

---

## 13. Required public pages

The twelve page types in §6.1 above. **[FACT — Doc 03 §17]** Every commercial page must have one clear H1, a specific audience purpose, at least one evidence or trust block, one primary CTA, internal links, content loaded entirely from JSON, locale-specific metadata, mobile and RTL support, no unsupported claims, safe handling of missing content, and must render without final images.

---

## 14. Contact and lead-generation process

**[FACT — Doc 03 §11, Doc 01 §16]** Enquiry form fields: full name, company, role, email, phone (optional), country, project location, service interest, project stage, message, consent checkbox, hidden anti-spam field.

**[FACT — Doc 05 §14.3, §14.4]** Service options: Owner's Engineering & AMO; Electrical & MEP Engineering; Local Engineering Partner in Morocco; Other / Not Yet Defined. Project stage options: early assessment, feasibility, design, tender, construction, commissioning, existing asset review, not yet defined.

**[FACT — Doc 03 §11 CON04]** "What happens next": enquiry review → clarification call → scope discussion → proposal if relevant. **No response-time promise may be published** until confirmed.

**[FACT — Doc 08 §5.3, §16.2]** The form validates on the client for usability and **again on the server**, applies spam controls, sanitises output, avoids logging message contents unnecessarily, returns structured error codes and operates independently of analytics.

**[FACT — CLAUDE.md §11]** File upload must **not** be implemented in the first release unless the source documents are formally changed.

**[FACT — Doc 01 §15.3]** Conversion hierarchy: project enquiry form → direct email click → telephone click → WhatsApp click (if approved) → LinkedIn visit → capability statement download (future).

**[FACT — Doc 08 §19]** Two acceptable delivery paths: (A) Netlify Function plus email provider, or (B) Netlify Forms. **The selected option must be tested in an actual deploy preview — local success alone is insufficient.**

---

## 15. JSON content editor requirements

**[FACT — Doc 09, CLAUDE.md §9]**

- Route: `/editjson/{locale}/{pageSlug}` using **stable page IDs**, not translated public slugs.
- Allowed page slugs (allowlist): `home`, `services`, `owners_engineering`, `electrical_mep`, `local_partner`, `sectors`, `experience`, `about`, `contact`, `legal_notice`, `privacy`, `cookies`, `global`, `navigation`. Shared routes: `/editjson/shared/{company|projects|services|sectors}`. Unknown values return 404. No arbitrary file path may be accepted.
- Keys visible but **read-only**; values edited through schema-appropriate controls.
- Arrays manageable with accessible add, remove, duplicate and reorder actions — **drag and drop must never be the only method**.
- Client validation for usability; **server validation is authoritative**.
- Readable field-level diff before save (raw JSON diff may exist as an advanced view, not the default).
- Password requested **only when applying changes**; held in memory only; cleared after response; never in local storage, URL or analytics.
- Password stored only as a **salted server-side hash**; compared with timing-safe equality; generic error messages; never logged.
- Repository paths reconstructed **server-side from allowlists**.
- GitHub file SHA checked before update; **HTTP 409 on stale conflict**; never overwrite silently; automatic merge not required in first release.
- Image path editing only (no upload in first release); must begin with `/images/`, no `..`, allowed extension, no external URL.
- Editor and previews excluded from indexing (`noindex, nofollow`).
- Save success shows commit SHA, changed document, expected deployment update and link to the public page.

**[FACT — Doc 09 §24, CLAUDE.md §9]** The example password `leadline` is **not** a production password and must not be committed or deployed. Production password: unique, ≥ 14 characters, not containing company name or domain, stored only as salted hash, with a documented rotation process.

**[FACT — Doc 09 §15.1]** Save workflow: edit → Validate → correct blocking errors → Preview changes → review diff → Apply changes → enter password → submit → server validates and commits → editor shows commit result → Netlify deploy begins → public update after successful deploy.

**[FACT — Doc 15 §30]** Acceptance requires a **non-developer** to complete the full workflow including restoring the original text. Developer capability alone is not acceptance.

---

## 16. GitHub and Netlify architecture

**[FACT — Doc 08 §2.1]** Target stack: Next.js 16.x stable (App Router), TypeScript strict, Node.js 24 LTS, npm with committed `package-lock.json`, CSS Modules plus central CSS custom-property design tokens, Zod validation, selected Lucide icons via a local wrapper, repository-managed JSON, Netlify hosting, GitHub source control, Netlify Functions, GitHub REST Contents API for editor saves, Vitest + React Testing Library + Playwright + axe-core.

**[FACT — Doc 08 §2.2]** Explicitly rejected: headless CMS, database, Supabase, WordPress, visual page builder, external admin portal, client authentication, public API, Tailwind-based design dependency, large public UI framework, animation framework.

**[FACT — Doc 08 §13]** Netlify: production branch `main`; PR deploy previews enabled; every push to `main` triggers a production build; **a failed build does not replace the last successful deploy**.

**[FACT — Doc 08 §14.1, §14.2]** Environment variables:

```
GITHUB_OWNER, GITHUB_REPO, GITHUB_BRANCH, GITHUB_CONTENT_PATH, GITHUB_TOKEN,
CONTENT_EDITOR_PASSWORD_HASH, CONTENT_EDITOR_PASSWORD_SALT, CONTENT_EDITOR_ALLOWED_ORIGIN,
CONTACT_RECIPIENT_EMAIL, CONTACT_FROM_EMAIL, EMAIL_PROVIDER_API_KEY, CONTACT_RATE_LIMIT_ENABLED
```

Never exposed to the browser: GitHub token, password hash, password salt, email provider key, private analytics secrets.

**[FACT — Doc 08 §15.1]** Save sequence: validate origin/method → parse → verify password → validate locale and page ID against allowlists → validate JSON against schema → reject protected-key changes → fetch current GitHub file and SHA → compare base SHA → reject or resolve conflict → create/update file with descriptive commit → return commit reference.

**[FACT — Doc 08 §15.3]** Commit format: `content({locale}/{pageId}): update via JSON editor`. No password or personal form data in commit messages.

**[FACT — Doc 08 §26]** Rollback options: Netlify restore previous successful deploy; revert Git commit; restore file from GitHub history; redeploy corrected branch.

---

## 17. SEO requirements

**[FACT — Doc 12]**

- Separate URLs for each language; no language served from one URL by browser/cookie/IP/JS state.
- Reciprocal `hreflang` on every equivalent page (en, fr, ar, plus optional `x-default`), absolute URLs, valid language codes. `ma` is **not** a language code. Draft or unavailable translations must not appear in the `hreflang` cluster.
- **Self-referencing canonical** per language version. Translations must **not** be canonicalised to English.
- Canonical rules: HTTPS only, preferred host only, no UTM parameters, no trailing-slash inconsistency, no editor routes, no preview domain, no Netlify subdomain, no fragment, matches route map.
- `/` → `/en/` (302/307 initially; permanent only after business decision). No indexable duplicate homepage at both `/` and `/en/`.
- Metadata per indexable page: unique title (~30–60 chars), unique description (~120–165 chars), canonical, robots directive, OG title/description/image/locale, alternates, one H1.
- Sitemap generated from published page state, route map and language availability. Excludes editor routes, drafts, API routes, previews, test pages, redirects, non-canonical URLs.
- `robots.txt` allows public content, disallows `/editjson/`, `/api/`, `/.netlify/`, `/preview/`, and declares the sitemap.
- **[Doc 12 §18.2 — important]** Blocking `/editjson/` in robots while relying on `noindex` can prevent the crawler from reading the directive. Preferred: no public navigation links, `X-Robots-Tag: noindex, nofollow, noarchive`, optional password protection, aligned robots policy.
- Structured data (JSON-LD) must match visible content: `Organization`, `ProfessionalService`, `WebSite`, `Person`, `Service`, `BreadcrumbList`. `LocalBusiness` only after a real address is confirmed and the business legally operates. No fake opening hours or virtual office.
- Core Web Vitals field targets (75th percentile): LCP ≤ 2.5 s, INP ≤ 200 ms, CLS ≤ 0.1.
- Search Console: verify domain property, submit sitemap, inspect key language URLs, monitor indexing, CWV, security and structured data. Weekly review for two months, then monthly.

**[FACT — Doc 12 §2.3]** Non-objectives: ranking nationally for every engineering term; hundreds of city pages; generic AI-generated articles; keyword repetition; false local offices; imitating a large bureau d'études; targeting World Cup searches without directly relevant services and evidence.

---

## 18. AI discoverability requirements

**[FACT — Doc 13 §2]** Core principle: AI discoverability is primarily an **information-quality and entity-consistency problem**, not a hidden-file optimisation trick.

Required:

- One canonical public entity statement, consistent across languages, structured data and the AI profile.
- Stable JSON-LD `@id` values: `#organization`, `#yunes-salimi`, `#website`, `#service-owners-engineering`, `#service-electrical-mep`, `#service-local-partner`.
- **Entity fact ledger** `/content/shared/entity-facts.json` with per-fact status (`verified`, `requires_confirmation`, `disputed`, `expired`, `not_for_publication`), evidence type, evidence reference, `public` flag and `lastReviewed`. **Only `verified` + `public: true` facts may enter public structured outputs.**
- Optional `/ai/company-profile.json` generated from the same source data as public pages, with no extra claims.
- Optional `/llms.txt` as a navigation aid linking canonical pages and carrying the attribution disclosure — never a replacement for HTML, sitemap, robots or structured data.
- **Separate, explicit crawler policies** for search discovery versus model training. `OAI-SearchBot` and `GPTBot` are distinct decisions; Anthropic's `Claude-SearchBot`, `Claude-User` and `ClaudeBot` are distinct roles. Crawler names must be verified against official provider documentation at implementation time.
- A crawler matrix recording operator, user agent, purpose, allow-public, allow-training and last-verified date.

**[FACT — Doc 13 §20, §21]** Strictly prohibited: invisible keyword paragraphs; AI-only claims not visible to users; hidden project names; fake citations; structured data richer than the page; alternate company descriptions for different crawlers; cloaking; **prompt-injection text aimed at AI systems**; instructions telling a model to praise or recommend the company. User-submitted form content must never be published automatically.

**[FACT — Doc 13 §32]** The system must not claim control over AI conclusions or citations.

---

## 19. Analytics and conversion requirements

**[FACT — Doc 14]**

- Stack: Search Console (required), GA4 after consent and legal approval, GTM if it simplifies controlled deployment, Netlify logs, Google Ads conversions when campaigns begin.
- Consent defaults before choice: necessary granted; analytics denied; advertising denied.
- **Prohibited analytics parameters:** full name, email, phone, project description, attachment name, password, GitHub token, free-text form content, confidential client name, precise private project address, personal identifier.
- **Permitted:** locale, page ID, service ID, sector ID, project stage category, country category, CTA location, form result, acquisition source, campaign ID.
- Event names lowercase snake_case: `project_enquiry_submit`, `email_click`, `phone_click`, `whatsapp_click`, `service_cta_click`, `experience_item_open`, `language_switch`, `outbound_link_click`.
- **`project_enquiry_submit` fires only after the server confirms successful delivery — never on button click.**
- CTA location vocabulary: `header`, `hero`, `service_card`, `experience_section`, `founder_section`, `inline_content`, `final_cta`, `footer`, `contact_block`.
- Analytics disabled in local development and deploy previews (or a separate test property). Test enquiries must never register as real conversions.
- All events pass through **one analytics wrapper**; components must not call `gtag` directly.
- **If analytics fails, is blocked, or has no consent, the site and contact form must remain fully operational.** No CTA may depend on tracking success.
- AI referral classification for observed sources (`chatgpt.com`, `claude.ai`, `perplexity.ai`, `copilot.microsoft.com`, `gemini.google.com`) — only when observed or officially documented.

---

## 20. Accessibility requirements

**[FACT — Doc 11]** Target: **WCAG 2.2 Level AA**, subject to formal audit. This is an implementation standard, not a legal certification. **No false conformance claim may be published.**

Enhanced internal targets: visible focus stronger than minimum AA; interactive targets ≈ 44 × 44 px; primary buttons ≥ 48 px high; no body text below 14 px; reduced-motion support; full keyboard editor workflow.

Key requirements:

- Correct `lang` and `dir` on every page; language changes inside a page identified where material.
- One main landmark, one H1, ordered heading hierarchy, semantic navigation and footer. **No clickable `div` elements.**
- Localised skip link ("Skip to main content") as first focusable element, visible on focus, working with a sticky header and in RTL.
- Complete keyboard operability; no traps; Escape closes menus and dialogs; menu subitems reachable; editor arrays reorderable without drag.
- Focus appearance: `outline: 3px solid var(--color-tech-700); outline-offset: 3px`; Warm Sand or White on dark surfaces. Never removed without replacement; never clipped by overflow.
- Contrast: normal text ≥ 4.5:1, large text ≥ 3:1, non-text ≥ 3:1. Status never conveyed by colour alone.
- Usable at 200% zoom and 320 CSS px reflow.
- Forms: visible persistent labels (never placeholder-as-label), programmatic association, errors near the field and in a summary, values preserved, success announced via live region, no response-time promise.
- Language selector uses language names, not flags; current language marked programmatically.
- Dialogs: semantic role, title, description, focus moved in and constrained, Escape where safe, focus returned to trigger, no accidental close during submission.
- **The JSON editor is inside the conformance scope.**
- Automated axe-core checks plus manual testing: NVDA + Chrome/Firefox on Windows minimum; TalkBack + Android Chrome where available.

---

## 21. Security requirements

**[FACT — Doc 08 §20, Doc 09 §23, Doc 15 §25]**

- HTTPS only; save endpoint POST only; origin allowlist; body-size limit.
- Locale and page allowlists; server schema validation; protected-path enforcement; no raw path input; no arbitrary file writes.
- Password hash and salt in environment variables only; GitHub token server-side only; generic authentication errors; no secrets in logs.
- GitHub token: fine-grained, minimum repository content permission. No organisation administration, no workflow modification unless required.
- SHA conflict detection preventing destructive overwrite.
- Security headers: `Content-Security-Policy`, `Referrer-Policy`, `X-Content-Type-Options`, `Permissions-Policy`, `Strict-Transport-Security`. A permissive CSP used merely to claim compliance is explicitly rejected.
- `Cache-Control: no-store` on editor mutation endpoints; `private, no-store` on draft previews.
- Logging: request ID, result code, page ID, locale, GitHub status, commit SHA, duration. **Never** passwords, hashes, tokens, full contact messages, sensitive personal information or complete raw request bodies.
- Dependency vulnerability scan; **no packages with unresolved critical vulnerabilities**.
- Recommended additional protections: attempt throttling, request IDs, delay after repeated failures, documented secret rotation.

**[FACT — Doc 16 §23]** Before implementing the editor, a brief threat assessment is required covering exposed editor URL, password guessing, GitHub token, arbitrary file writing, stale overwrite, script injection, secret logging, origin misuse and denial through oversized body.

---

## 22. Testing and acceptance criteria

**[FACT — Doc 15]** A successful build is **not** sufficient.

Required command group **[Doc 16 §24, CLAUDE.md §14]**:

```
npm run lint            npm run typecheck        npm run validate:content
npm run validate:translations   npm run validate:media   npm run validate:entities
npm run audit:copy      npm run test             npm run test:e2e      npm run build
```

Eighteen test categories, from source-document compliance through user acceptance. Required quality artefacts:

```
/quality/requirements-traceability.md   /quality/claim-register.md
/quality/test-report.md                 /quality/visual-review/
/quality/lighthouse/                    /quality/accessibility/
/quality/seo/                           /quality/editor/       /quality/deployment/
```

**Laboratory acceptance [Doc 15 §21.2]:** Lighthouse Performance ≥ 90 on core pages, Accessibility ≥ 95, Best Practices ≥ 95, SEO ≥ 95. Budgets: first-load JS ≤ 180 KB compressed for content pages; no hero image above 350 KB without approved reason.

**Severity model [Doc 15 §32]:**

- **Critical** — false claim; leaked secret; save endpoint bypass; production unavailable; form does not deliver; wrong project attribution; broken language route; destructive editor overwrite.
- **High** — major page missing; Arabic unreadable; editor save fails; accidental noindex; serious accessibility failure; severe mobile break; structured data contradicting the page.

**No Critical or High issue may remain at launch without explicit written acceptance.**

**Six release gates [Doc 15 §33]:** Architecture → Design → Functional → Quality → Content → Production. **A later gate cannot override a failed earlier gate.**

**[FACT — Doc 15 §28]** Rollback must be actually performed and documented before launch. "Rollback that exists only theoretically is not accepted."

---

## 23. Release and production requirements

**[FACT — CLAUDE.md §15, Doc 15 §35, Doc 16 §30]** The project is complete only when:

- all release gates pass; Critical issues = 0; High issues = 0; Medium issues documented and accepted;
- all business claims are approved and verified;
- mobile and Arabic RTL are approved; visual quality is approved;
- contact delivery is verified; JSON editor save is verified against GitHub;
- a Netlify production deploy succeeds; **rollback is tested**;
- SEO and indexing controls are checked; accessibility checks are documented;
- the editor has been tested by a non-developer;
- `/implementation/final-implementation-report.md` exists, containing production URL, repository branch, final commit SHA, Netlify deploy ID, test results, screenshots and accepted exceptions — and **no secrets**.

**[FACT — Doc 16 §30]** Approved completion wording: *"Implementation is complete against the recorded requirements, with the exceptions listed in the final report."* Prohibited wording: *"Everything is perfect and fully secure."*

---

## 24. Current repository state (verified 2026-08-04)

### 24.1 What exists **[FACT]**

| Area | State |
|---|---|
| Branches | `main` (HEAD `de79094`), `docs/add-claude-md`, `feat/foundation-preview`, `feat/full-public-site` (identical to `main`) |
| Framework | Next.js `16.0.0`, React `19.2.0`, TypeScript `5.9.3`, App Router |
| Routes | `app/[locale]/page.tsx` (home), `app/[locale]/[slug]/page.tsx` (11 pages), `app/[locale]/layout.tsx`, `app/robots.ts` |
| Locales | `en`, `fr`, `ar` — all three render; `dir="rtl"` correctly set for Arabic at the root |
| Content | `content/{en,fr,ar}/home.json`, `content/site-{en,fr,ar}.json`, `content/pages-shared.json` |
| Components | `components/HomePage.tsx` (168 lines), `components/ContentPage.tsx` (297 lines) |
| Styles | `styles/globals.css` (842 lines), `styles/content-pages.css` (44 lines) |
| Images | 2 placeholder SVGs: `founder-portrait-4x5.svg`, `hero-engineering-16x10.svg` |
| Netlify | `netlify.toml` with build command, `NODE_VERSION=24`, `/` → `/en/` 302 redirect, 4 security headers |

**Verified positives [FACT]:**

- **Colour palette matches the Brand Book exactly** — `#0b1826`, `#172532`, `#53616d`, `#f6f4ef`, `#d8c5a5`, `#7c4e2f`, `#2f6480` all present. Inaccessible Copper `#B0794F` is correctly **absent**.
- **CSS uses logical properties throughout** — 24 logical property usages, **0** physical `left`/`right` properties. Four explicit `[dir="rtl"]` rules exist.
- `prefers-reduced-motion: reduce` is handled.
- A localised skip link is implemented on both page components.
- Arabic and French content is genuine human-quality translation, not machine placeholder text (professional review still required).
- Fonts loaded via `next/font/google` (Manrope + Noto Sans Arabic) with `display: swap`.
- **No secrets are committed.** Scans for `github_pat_`, `ghp_`, `leadline`, `GITHUB_TOKEN`, `PASSWORD_HASH` returned zero matches.
- `npx tsc --noEmit` **passes** (exit code 0).
- Experience "projects" are labelled *"Illustrative capability profile — not a claimed completed project."*

### 24.2 Verified defects and gaps **[FACT]**

**Critical:**

1. **Invented contact and location data is published.** `content/site-{en,fr,ar}.json → navigation` contains `address: "Casablanca, Morocco"`, `email: "hello@salimiengineering.ma"`, `phone: "+212 5 20 00 00 00"`. These render in the footer of every page and on the Contact page. Doc 01 §3 lists registered office, phone and public email as `INFORMATION_NOT_AVAILABLE`. CLAUDE.md §4 forbids inventing addresses and contact details. The word "Provisional" on the contact page and the footer disclaimer reduce but do not remove the violation, and the footer values carry no qualifier at all.
2. **Critical dependency vulnerabilities.** `npm audit` reports **critical** severity for `next@16.0.0`, including RCE in the React flight protocol (GHSA-9qr9-h5gf-34mp), Server Actions source-code exposure, middleware/proxy bypasses, cache poisoning and multiple DoS vectors. npm marks this version deprecated (CVE-2025-66478). Latest patched line at analysis time: **16.3.0**. Doc 08 §4.3 forbids packages with unresolved critical vulnerabilities.
3. **Fabricated geographic precision.** `components/HomePage.tsx:93` hardcodes `33.5731° N` / `7.5898° W` — Casablanca's coordinates — as a visual "datum" element, asserting an unconfirmed operating location.

**High:**

4. **French and Arabic public URLs are wrong.** `lib/site-content.ts` defines one flat English slug list applied to all locales, producing `/fr/services`, `/fr/about`, `/fr/legal-notice`. Doc 02 §6 requires `/fr/a-propos`, `/fr/secteurs`, `/fr/ingenierie-maitre-ouvrage-amo`, `/fr/ingenierie-electrique-mep`, `/fr/partenaire-ingenierie-maroc`, `/fr/mentions-legales`, `/fr/politique-confidentialite`, `/fr/politique-cookies`. There is **no central route map**.
5. **No stable page IDs.** The system keys on public slugs (`owners-engineering-amo`) instead of the mandated stable IDs (`owners_engineering`). This blocks the editor architecture, which addresses documents by stable ID.
6. **No JSON editor.** `/editjson` does not exist. No `netlify/functions/`, no `save-content`, no password verification, no GitHub Contents API integration, no SHA conflict handling.
7. **No content validation layer.** No `/schemas`, no Zod, no `lib/content/`. Components import JSON directly via `lib/site-content.ts`, contradicting Doc 08 §8.1. Unknown data cannot fail validation because no validation exists.
8. **No tests of any kind.** No `/tests`, no Vitest, no Playwright, no axe-core. Only `dev`, `build`, `start`, `typecheck` scripts exist — 6 of the 10 mandated validation commands are absent.
9. **Contact form does not deliver.** The form posts with `data-netlify="true"` but `netlify.toml` declares no functions directory and no form handling is configured or verified. There is no server-side validation, no consent checkbox and no privacy link.
10. **Hardcoded business copy.** Verified instances: `"Morocco · Engineering & Project Advisory"` (ContentPage.tsx:110, HomePage.tsx:164); the `SALIMI` / `ENGINEERING` wordmark in four places; `aria-label="Salimi Engineering"`; `localeLabels` (`EN`/`FR`/`العربية`) in both components; `"MOROCCO"` in decorative elements; the honeypot label `"Website"`; the `serviceSlugs` route array embedded in `HomePage.tsx`.
11. **`package-lock.json` is not committed**, contradicting Doc 08 §4.3 and Doc 16 §28. Builds are therefore not reproducible.
12. **Project records lack `relationshipType`.** The `ProjectItem` type has `sector`, `title`, `location`, `scope`, `role` only. The label used — "Illustrative capability profile" — is **not** one of the three mandatory relationship values.
13. **Site-wide crawl block.** `app/robots.ts` returns `disallow: "/"` for all agents. Appropriate as a pre-launch safety measure, but it must be replaced by the Doc 12 §18 / Doc 13 §18 policy before launch, and no `sitemap.ts` exists.

**Medium:**

14. Missing `app/not-found.tsx` and `app/global-error.tsx` — no custom 404, contradicting Doc 02 §23.
15. No JSON-LD structured data anywhere; no `hreflang` reciprocity beyond a simple `alternates.languages` map; no `/ai/company-profile.json`; no `/llms.txt`; no `entity-facts.json`.
16. Global CSS files instead of the mandated CSS Modules; no separate `styles/tokens.css`. Token names deviate (`--ink` vs `--color-ink-950`).
17. Missing media folders (`brand/`, `founder/`, `projects/`, `services/`, `sectors/`, `backgrounds/`, `diagrams/`, `icons/`), 5 of 7 required placeholder SVGs, favicon set, `site.webmanifest`, OG images and `media-rights.json`.
18. Mobile navigation uses a `<details>`/`<summary>` element with no accessible name for the toggle (`aria-label={nav.services}` mislabels it), no focus trap, no Escape handling and no expanded-state announcement — contradicting Doc 11 §15.
19. No breadcrumbs on internal pages (Doc 02 §17).
20. Header `<nav>` carries `aria-label={nav.language}` ("Language") — an incorrect accessible name for the main navigation.
21. Missing `.env.example`, `/implementation/decision-log.md`, `/implementation/external-reference-log.md`, `/implementation/implementation-manifest.json` and the six operational guides required by Doc 16 §28.
22. Breakpoints (500/800/1000/1080 px) deviate from the Doc 06 §7.5 recommendation (640/768/1024/1280/1536).
23. No analytics layer, no consent mechanism, and Privacy/Cookie policy pages whose content cannot yet match a non-existent implementation.
24. The HEAD commit message — "feat: publish complete multilingual corporate site" — asserts completion, contrary to Doc 16 §13.

### 24.3 Build verification limitation **[VERIFY]**

`npm run build` **could not be completed** in this analysis environment. The failure is caused by this sandbox's network policy blocking `fonts.googleapis.com`, which `next/font/google` requires at build time. This is an environment limitation, **not** demonstrated evidence of a repository defect. Build status on Netlify is **unverified** from here and must be confirmed against an actual Netlify deploy log.

`npx tsc --noEmit` completed successfully (exit 0) and is reliable evidence.

---

## 25. Precise description of the finished website

When complete, the website will be a **statically generated Next.js 16 application on Netlify**, built from validated JSON in GitHub, presenting twelve page types in three languages at thirty-six locale-specific URLs.

**A visitor's experience.** A technical director at an international EPC contractor searches for local engineering support in Morocco and lands on `/en/local-engineering-partner-morocco`. The page loads fast, with text rendered server-side and no client-side fetch for copy. A restrained hero on a controlled dark or split surface states the proposition in one line under 75 characters. The palette is porcelain and ink navy with a single warm sand accent; whitespace is generous; there is no stock hard-hat photography, no gradient, no carousel. Sections alternate deliberately rather than mechanically: the market-entry problem, service modules, how cooperation works, why Salimi Engineering, client profiles, selected experience, a short first-person founder note, and one clear CTA. Every project card carries a visible relationship disclosure identifying it as the founder's prior professional experience unless it is a verified company assignment. Nothing on the page claims a permanent team, an office, a certification or a response time that has not been verified.

The visitor switches to French. The language selector — text labels, never flags — routes to `/fr/partenaire-ingenierie-maroc`, the **equivalent page**, preserving page identity. Switching to Arabic loads `/ar/local-engineering-partner-morocco` with `<html lang="ar" dir="rtl">`, mirrored layout, mirrored arrows, an unreversed wordmark, correctly isolated Latin technical codes and email addresses, and the same premium spacing — not a compressed afterthought.

On a 360 px phone the same complete content is present: key text before media, single-column stacking, 44 px touch targets, readable line lengths, no hidden desktop-only evidence, and the contact path always reachable. At 200% zoom and 320 CSS px the layout reflows without horizontal scrolling.

The visitor submits a project enquiry. Client validation gives immediate feedback with persistent visible labels; the server validates again, applies honeypot and rate-limit controls, delivers the message and returns a structured success code. Only then does the frontend show success and fire `project_enquiry_submit` — and only if analytics consent was granted. If analytics is blocked entirely, the form still works.

**The owner's experience.** Yunes Salimi opens `/editjson/en/home`. Stable JSON keys appear as read-only labels with plain-language help; values appear as schema-appropriate controls. He edits the hero title, clicks Validate, reviews a readable field-level diff, clicks Apply changes and enters the password. The password travels in the request body over HTTPS, is verified against a salted hash in a Netlify Function, is never logged and never reaches the browser as a hash. The function reconstructs the repository path from an allowlist, checks the current file SHA, commits `content(en/home): update via JSON editor` through the GitHub Contents API and returns the commit SHA. Netlify rebuilds. If someone else changed the file first, he receives HTTP 409 and a clear conflict message — never a silent overwrite. If the build fails, the previous production deploy stays live.

**Machine readers.** Search engines find reciprocal `hreflang` across all three languages, self-referencing canonicals, a sitemap containing only published canonical pages, and JSON-LD `Organization`, `Person`, `Service`, `WebSite` and `BreadcrumbList` entities whose every claim also appears visibly on the page. `/editjson/`, `/api/` and `/preview/` are excluded. AI systems find `/llms.txt` pointing to canonical pages and `/ai/company-profile.json` generated from verified public facts — carrying the same founder-attribution disclosure a human reads, with no hidden bot-only content and no prompt-injection text.

**The overall impression** is of a small, precise, technically serious firm that says exactly what it can do and nothing more — where the restraint itself is the credibility signal.

---

## 26. Gap list: current state → production-ready launch

| # | Gap | Severity | Source |
|---|---|---|---|
| 1 | Invented contact details, address and phone published | Critical | CLAUDE.md §4; Doc 01 §3 |
| 2 | Critical dependency vulnerabilities (`next@16.0.0`) | Critical | Doc 08 §4.3; Doc 15 §25 |
| 3 | Fabricated coordinates asserting an unconfirmed location | Critical | CLAUDE.md §4 |
| 4 | No `relationshipType` on project records | Critical | Doc 04 §12; Doc 13 §13 |
| 5 | Localised FR (and AR) public slugs missing; no central route map | High | Doc 02 §6; Doc 08 §9.3 |
| 6 | No stable page IDs | High | Doc 02 §5; Doc 09 §4 |
| 7 | No JSON editor, save function, password verification or SHA conflict handling | High | Doc 09; Doc 08 §15 |
| 8 | No schemas, Zod validation or content-loading layer | High | Doc 04 §23; Doc 08 §8 |
| 9 | No test infrastructure; 6 of 10 validation commands absent | High | Doc 15; Doc 16 §24 |
| 10 | Contact form does not deliver; no server validation or consent | High | Doc 08 §5.3, §16.2 |
| 11 | Hardcoded business copy in components | High | Doc 04 §2.1, §27 |
| 12 | `package-lock.json` not committed | High | Doc 08 §4.3 |
| 13 | Page sections do not follow blueprints (missing H02/H04/H05/H06/H08 equivalents, breadcrumbs, related links) | High | Doc 03 |
| 14 | No sitemap; robots blocks everything; no launch crawler policy | High | Doc 12 §18–19 |
| 15 | No JSON-LD, `hreflang` reciprocity, AI profile, `llms.txt` or entity-facts ledger | Medium | Docs 12, 13 |
| 16 | No custom 404 or global error boundary | Medium | Doc 02 §23 |
| 17 | Global CSS instead of CSS Modules; token names deviate | Medium | Doc 08 §10; Doc 06 §23 |
| 18 | Media folder structure, 5 placeholders, favicon set, OG images, `media-rights.json` missing | Medium | Doc 10 §3, §9.2, §13 |
| 19 | Mobile nav lacks focus trap, Escape, expanded state; nav mislabelled | Medium | Doc 11 §15 |
| 20 | No analytics wrapper or consent mechanism | Medium | Doc 14 |
| 21 | Legal/Privacy/Cookie content not legally reviewed and cannot match implementation | Medium | Doc 03 §12–14 |
| 22 | Operational documentation and decision/reference logs missing | Medium | Doc 16 §28 |
| 23 | No accessibility, performance, visual-regression or browser-matrix evidence | Medium | Doc 15 |
| 24 | Rollback never performed or documented | Medium | Doc 15 §28 |

---

## 27. Requirements that must never change without explicit written approval

1. Brand name **Salimi Engineering**; founder **Yunes Salimi** (exact legal spelling pending verification).
2. Founder-led boutique positioning; no implied corporate scale, permanent team, offices or certifications.
3. The three service pillars and their identity.
4. English, French and Arabic — no language may be removed.
5. Complete Arabic RTL implementation (semantic, not cosmetic).
6. Full responsive support with complete mobile content parity.
7. **Quiet Engineering Confidence** visual system, the approved palette, and the visual prohibitions in Doc 06 §22.
8. All visible business content driven by validated JSON; no hardcoded business copy.
9. Stable JSON keys and stable page IDs; no casual renaming.
10. The approved sitemap, route table and localised public URLs.
11. The three project relationship types and their visible disclosure.
12. The prohibition on inventing any business, legal, project, contact or credential fact.
13. All public images under `/public/images`; branded placeholders until authorised assets exist.
14. GitHub as source of truth; Netlify as deployment platform.
15. Editor route `/editjson/{locale}/{pageSlug}` using stable IDs.
16. Server-side password verification, salted hash storage, GitHub commit on save, SHA conflict detection, HTTP 409 on stale content.
17. No secrets in client code or the repository.
18. WCAG 2.2 AA target with no false conformance claim.
19. Separate URLs per language, reciprocal `hreflang`, self-referencing canonicals.
20. Structured data and AI-readable output matching visible verified content; no hidden bot-only content or prompt injection.
21. Conversion counted only after server-confirmed success; no PII in analytics; site functional without analytics.
22. No CMS, database, Supabase, WordPress, user accounts, public file upload, e-commerce, animation framework, or UI library defining the public design.
23. Testing evidence before any completion claim; release gates in order.
