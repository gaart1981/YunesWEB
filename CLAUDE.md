# CLAUDE.md — Salimi Engineering Website

This file is the mandatory entry point for Claude Code and any delegated agents working in this repository.

## 1. Project

Build the production website for **Salimi Engineering**, a small Morocco-based, founder-led engineering and project advisory bureau serving international and Moroccan clients.

The website must position the company as a credible, technically accountable boutique engineering partner—not as a large fictional corporation, and not as a solo freelance portfolio. Salimi Engineering may take on focused assignments as well as medium-sized project scopes and scale the delivery team with engineers and project specialists according to the disciplines, workload and site presence required by each assignment.

The founder and lead engineer remains directly accountable for technical quality and the client relationship while the project team may expand around the assignment. Do not imply a fixed permanent headcount unless it is separately confirmed.

Primary audiences:

- international engineering firms;
- EPC contractors;
- investors and project owners;
- developers;
- industrial clients;
- companies entering or operating in Morocco.

Primary service pillars:

1. Owner’s Engineering & AMO;
2. Electrical & MEP Engineering;
3. Local Engineering Partner in Morocco.

## 2. Authoritative specifications

The complete requirements are in `/source_docs`.

Before substantial implementation, read all 16 documents in numerical order:

1. `01_product_and_website_brief.md`
2. `02_sitemap_and_information_architecture.md`
3. `03_page_blueprints.md`
4. `04_content_model_and_json_specification.md`
5. `05_content_master_document.md`
6. `06_brand_book_and_visual_design_system.md`
7. `07_component_library_specification.md`
8. `08_technical_architecture_specification.md`
9. `09_admin_json_editor_specification.md`
10. `10_media_and_asset_specification.md`
11. `11_accessibility_specification.md`
12. `12_seo_specification.md`
13. `13_ai_discoverability_and_machine_readable_content.md`
14. `14_analytics_and_conversion_tracking_plan.md`
15. `15_testing_and_acceptance_criteria.md`
16. `16_claude_implementation_and_agent_control_protocol.md`

Do not rely on this file alone. It is a concise operating guide; `/source_docs` contains the binding detail.

Before coding, create:

- `/implementation/source-docs-review.md`;
- `/implementation/decision-log.md`;
- `/quality/requirements-traceability.md`;
- `/implementation/missing-information.md`.

Record all material ambiguities and decisions. Do not silently override a specification.

## 3. Non-negotiable requirements

- Brand name: **Salimi Engineering**.
- Founder: **Yunes Salimi**; exact legal spelling must be verified before final publication.
- Business model: **small founder-led engineering bureau**, not a solo freelance practice and not a fictional large consultancy.
- Commercial scope: focused engineering assignments and **medium-sized project scopes** are within the intended positioning.
- Team model: the delivery team may be expanded by engaging or hiring engineers and project specialists for the assignment according to required disciplines, workload and site presence.
- Accountability: the founder and lead engineer remains responsible for technical quality and the client relationship while the delivery team scales around the project.
- Exact permanent staff count remains unconfirmed and must not be invented.
- Confirmed public business email: **info@salimiengineering.com**. The machine-readable source is `/content/business-facts.json`.
- Languages: English, French and Arabic.
- Arabic must be a complete RTL implementation.
- The site must be fully responsive for smartphones, tablets and desktop screens.
- Mobile must preserve full content, trust, visual quality and conversion paths.
- The visual direction is **Quiet Engineering Confidence**: premium through precision, restraint and evidence.
- All visible business content must come from validated JSON.
- Do not hardcode headings, paragraphs, CTA labels, navigation, legal text, SEO copy or contact details in components.
- Stable JSON keys and IDs must not be renamed casually.
- All public images must live under `/public/images`.
- Use approved branded placeholders until real, authorised images are supplied.
- GitHub is the source of truth.
- Deployment is through Netlify.
- The page editor must use `/editjson/{locale}/{pageSlug}`.
- Saving editor changes must verify the password server-side, validate content and create a GitHub commit.
- Never expose the editor password, password hash, GitHub token or provider secrets to the browser.
- Detect stale-file SHA conflicts; never overwrite newer content silently.
- Accessibility target: WCAG 2.2 AA, subject to formal audit.
- SEO, structured data and AI-readable outputs must match visible verified content.

## 4. Truth and evidence rules

Never invent or imply unavailable facts, including:

- projects;
- client names;
- project budgets;
- dates;
- testimonials;
- employees or permanent team size;
- offices or addresses;
- registrations;
- licences;
- insurance;
- certifications;
- awards;
- partners;
- response times;
- World Cup participation;
- legal authority to sign engineering documents.

The confirmed team model allows Salimi Engineering to engage or hire project-specific engineers and specialists. This does **not** confirm any particular permanent employee count, named team member, current payroll size or permanent multidisciplinary department.

Use the internal markers below only in draft data and internal documents:

- `INFORMATION_NOT_AVAILABLE`
- `REQUIRES_CONFIRMATION`
- `TBD`

These markers must never appear on production public pages.

Clearly distinguish:

- Yunes Salimi’s prior professional experience;
- assignments completed by Salimi Engineering;
- partner assignments.

Use the required relationship types:

- `founder_prior_experience`
- `company_assignment`
- `partner_assignment`

Do not publish client logos, project photographs or former-employer assets without permission.

## 5. Technical baseline

Follow Document 08 unless an officially documented incompatibility requires a recorded decision.

Target stack:

- Next.js 16 stable, App Router;
- TypeScript strict mode;
- Node.js 24 LTS;
- npm with committed `package-lock.json`;
- CSS Modules plus central CSS custom-property design tokens;
- Zod validation;
- Netlify Functions;
- GitHub REST API for editor saves;
- Server Components by default;
- Client Components only where interaction requires them.

Do not introduce without explicit approval:

- a CMS;
- a database;
- WordPress;
- Supabase;
- a public user-account system;
- a large UI framework defining the public design;
- Tailwind as a substitute for the approved design system;
- an animation framework;
- a public image-upload system.

## 6. Content and media architecture

Expected content root:

```text
/content/
  shared/
  en/
  fr/
  ar/
```

Expected media root:

```text
/public/images/
  brand/
  founder/
  projects/
  services/
  sectors/
  backgrounds/
  diagrams/
  icons/
  placeholders/
```

Components must consume typed, validated content through a content-loading layer. Components must not import arbitrary JSON directly.

Unknown section types, invalid IDs, prohibited paths or invalid published content must fail validation rather than render silently.

## 7. Visual implementation

Use the approved brand tokens and layouts in Documents 06 and 07.

The site must feel:

- technically credible;
- calm;
- deliberate;
- internationally professional;
- founder-led;
- capable of scaling a project team without pretending to be a large permanent organisation;
- premium without decorative luxury.

Reject implementations that look like:

- a generic construction template;
- a residential contractor website;
- a technology start-up;
- a fictional large consultancy;
- a solo freelancer portfolio;
- an unmodified component-library demo.

Do not use:

- generic stock hard-hat teams;
- glassmorphism;
- neon gradients;
- excessive rounded cards;
- parallax;
- autoplay video;
- fake counters;
- fake testimonials;
- fake partner-logo strips;
- decorative Moroccan flag theming.

Capture and review English desktop/mobile, French and Arabic RTL screenshots before accepting visual work.

## 8. Mobile and RTL

Responsive behaviour is mandatory, not optional.

Test at least:

- 360 × 800;
- 390 × 844;
- 768 × 1024;
- 1024 × 768;
- 1440 × 900;
- 1920 × 1080.

At mobile widths:

- preserve complete core content;
- place key text before non-essential media;
- maintain premium spacing and hierarchy;
- keep controls usable by touch;
- do not compress desktop grids into unreadable layouts;
- keep language switching and project contact reachable.

Arabic requires semantic and visual RTL review, including mixed Arabic/Latin text, email, phone, technical codes, arrows and focus order.

## 9. Editor and security

Editor route:

```text
/editjson/{locale}/{pageSlug}
```

Requirements:

- keys visible but read-only;
- values edited through schema-appropriate controls;
- arrays manageable with accessible add, remove and reorder actions;
- client validation for usability;
- server validation as authority;
- readable diff before save;
- password requested only when applying changes;
- password stored only as a salted server-side hash;
- repository paths reconstructed from allowlists;
- GitHub file SHA checked before update;
- HTTP 409 on stale content conflict;
- no arbitrary file writes;
- editor and previews excluded from indexing.

The example password `leadline` is not a production password. Do not commit or deploy it.

## 10. SEO and AI discoverability

Implement from Documents 12 and 13:

- separate URLs for EN, FR and AR;
- reciprocal `hreflang`;
- self-referencing canonicals;
- sitemap generated from published routes;
- correct robots and noindex handling;
- JSON-LD with stable entity IDs;
- verified Organization, Person and Service facts only;
- project relationship disclosures;
- optional `/ai/company-profile.json` generated from verified public facts;
- optional `/llms.txt` as a navigation aid, not a replacement for HTML or structured data;
- explicit crawler policy for search versus model-training crawlers.

Never add hidden bot-only claims, cloaking or prompt-injection text intended to force recommendations.

## 11. Analytics and forms

- Contact submission is a conversion only after server-confirmed success.
- Do not send names, emails, phone numbers, passwords or project free text to analytics.
- Analytics must respect consent and remain disabled in local and deploy-preview environments unless using a dedicated test property.
- The website and form must work when analytics is blocked.
- Do not implement file upload in the first release unless the source documents are formally changed.

## 12. Agents

You may delegate bounded tasks to specialist agents.

Every agent prompt must define:

- role;
- exact objective;
- allowed files;
- source documents to read;
- constraints;
- tests;
- acceptance criteria;
- escalation conditions.

Do not let multiple agents edit the same files concurrently without an integration plan.

Treat every agent output as untrusted until you:

- inspect the diff;
- check factual compliance;
- run relevant tests;
- inspect visual output where applicable;
- verify no unrelated files changed;
- integrate and accept responsibility.

An agent may not mark business facts as verified.

## 13. Git and change control

- Use focused feature branches and coherent commits.
- Do not commit secrets.
- Do not make broad unreviewed changes.
- Record material requirement changes in `/implementation/decision-log.md`.
- Maintain `/quality/requirements-traceability.md`.
- Preserve the numbered source documents unless explicitly instructed to revise them.
- A passing compile does not authorise a merge.

## 14. Required validation commands

Once the project scaffold defines these scripts, run the documented equivalents of:

```bash
npm run lint
npm run typecheck
npm run validate:content
npm run validate:translations
npm run validate:media
npm run validate:entities
npm run audit:copy
npm run test
npm run test:e2e
npm run build
```

Do not omit failed commands from reporting. Do not claim success without outputs or other evidence.

## 15. Definition of done

Do not declare implementation complete until:

- all release gates in Document 15 pass;
- Critical issues are zero;
- High issues are zero;
- all business claims are approved;
- mobile and Arabic RTL are approved;
- visual quality is approved;
- contact delivery is verified;
- JSON editor save is verified against GitHub;
- a Netlify production deploy succeeds;
- rollback is tested;
- SEO and indexing controls are checked;
- accessibility checks are documented;
- final implementation report exists.

Required final report:

```text
/implementation/final-implementation-report.md
```

Report facts, evidence, commit SHAs, deploy IDs, test results, limitations and unresolved information. Never claim that the site is perfectly secure, fully compliant or guaranteed to rank.
