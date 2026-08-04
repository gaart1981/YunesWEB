# Salimi Engineering — Testing and Acceptance Criteria

**Document ID:** SE-WEB-15  
**Version:** 1.0  
**Status:** Mandatory acceptance specification  
**Target repository path:** `/source_docs/15_testing_and_acceptance_criteria.md`  
**Review date:** 2026-08-04

---

## 1. Purpose

This document defines the tests, review gates and evidence required before Salimi Engineering may be considered complete.

A successful build is not sufficient.

The website is accepted only when it satisfies:

- business positioning;
- content accuracy;
- visual quality;
- responsive behaviour;
- multilingual behaviour;
- Arabic RTL;
- JSON architecture;
- content editor workflow;
- Netlify deployment;
- GitHub persistence;
- accessibility;
- SEO;
- AI discoverability;
- analytics;
- performance;
- security minimums.

---

## 2. Acceptance authority

Final acceptance belongs to the project owner.

Claude and its agents may report that tests pass, but they may not self-approve unresolved deviations.

Every deviation must be:

- corrected;
- explicitly accepted;
- or listed as an open issue with impact.

---

## 3. Test environments

Required:

1. local development;
2. automated CI;
3. Netlify deploy preview;
4. production after launch.

The public editor-save workflow must be tested against:

- a safe test branch or repository;
- then production with a controlled low-risk content change.

---

## 4. Definition of done

The website is done only when:

- all 16 source documents have been reviewed;
- all mandatory pages exist;
- content is JSON-driven;
- no business copy is hardcoded;
- placeholders are intentional;
- all languages render;
- Arabic RTL is verified;
- editor saves through server-side password validation;
- GitHub commit succeeds;
- Netlify deploy succeeds;
- forms work;
- metadata and structured data are correct;
- tests pass;
- visual review is approved;
- documentation is complete;
- unresolved issues are disclosed.

---

## 5. Test categories

1. source-document compliance;
2. content and factual accuracy;
3. unit;
4. component;
5. integration;
6. end-to-end;
7. visual regression;
8. responsive;
9. browser compatibility;
10. multilingual and RTL;
11. accessibility;
12. performance;
13. SEO;
14. AI discoverability;
15. analytics;
16. security;
17. deployment and rollback;
18. user acceptance.

---

## 6. Requirements traceability

Create:

```text
/quality/requirements-traceability.md
```

Each mandatory requirement maps to:

- source document;
- section;
- implementation file;
- test;
- result;
- evidence.

Example:

| Requirement | Source | Implementation | Test | Result |
|---|---|---|---|---|
| No hardcoded business text | Doc 04 §2 | content loader/components | hardcode audit | pass |
| Arabic RTL | Docs 06/11 | locale layout | Playwright RTL suite | pass |
| Save creates Git commit | Docs 08/09 | save function | editor E2E | pass |

No mandatory requirement may disappear between documents and implementation.

---

## 7. Content accuracy testing

### 7.1 Prohibited placeholders

Published content must not expose:

```text
INFORMATION_NOT_AVAILABLE
REQUIRES_CONFIRMATION
TBD
TODO
LOREM IPSUM
```

Exception:

- visual image placeholders deliberately approved for the initial visual phase.

### 7.2 Claims review

Create:

```text
/quality/claim-register.md
```

For every material claim record:

- claim;
- page;
- source;
- verification status;
- publication approval.

Block publication for:

- unverified project value;
- unverified client;
- unverified job title;
- unverified certification;
- unverified legal status;
- unverified office;
- unsupported years of experience;
- fake scale.

### 7.3 Founder spelling

One exact spelling across:

- public pages;
- metadata;
- structured data;
- JSON;
- image alt;
- footer;
- `llms.txt`;
- company profile.

### 7.4 Experience disclosure

Every prior project must display or inherit:

```text
founder_prior_experience
```

No project may imply it was a Salimi Engineering assignment unless verified.

---

## 8. JSON and content tests

Required scripts:

```text
npm run validate:content
npm run validate:translations
npm run validate:media
npm run validate:entities
npm run audit:copy
```

Tests:

- valid JSON;
- schema match;
- unique IDs;
- valid page ID;
- locale match;
- section type allowlist;
- protected keys;
- route mapping;
- image path;
- project permission;
- publication state;
- translation completeness;
- metadata completeness;
- no executable HTML;
- no arbitrary path traversal.

The build must fail on blocking errors.

---

## 9. Hardcoded-copy audit

Scan:

- `.tsx`;
- `.jsx`;
- `.ts`;
- route templates;
- components;
- functions where user-visible messages appear.

Allowed list:

- technical diagnostics;
- test fixtures;
- schema descriptions;
- developer console messages;
- explicitly approved accessibility fallback.

All user-visible copy should originate from:

- locale JSON;
- shared public JSON;
- validated form configuration.

Generate an audit report.

---

## 10. Unit tests

Required areas:

- content loader;
- locale resolver;
- route resolver;
- schema validation;
- protected path detection;
- Markdown sanitisation;
- image path validation;
- metadata generator;
- JSON-LD generator;
- analytics wrapper;
- diff generator;
- password-verification helper;
- GitHub payload builder;
- contact validation;
- entity consistency.

Coverage target:

- critical business logic: 90% statements/branches where practical;
- overall utility and service layer: 80% minimum;
- no artificial tests merely to increase percentage.

Coverage is an indicator, not acceptance by itself.

---

## 11. Component tests

Test every approved component for:

- required props;
- optional missing props;
- long text;
- Arabic;
- focus state;
- disabled/loading states;
- semantic element;
- dark/light variant;
- image and placeholder;
- external link behaviour;
- error state.

Critical components:

- Header;
- Mobile Navigation;
- Language Switcher;
- Page Hero;
- Service Card;
- Project Card;
- Founder Intro;
- Contact Form;
- Footer;
- JSON Editor;
- Password Dialog;
- Diff Preview.

---

## 12. Integration tests

Required flows:

- page ID → content loader → validated typed page;
- shared project → localised project;
- route map → language switch;
- content JSON → metadata;
- content JSON → structured data;
- form → server validation → delivery adapter;
- editor → validation → save function;
- save function → GitHub API mock;
- GitHub conflict → HTTP 409;
- analytics event → consent wrapper.

---

## 13. End-to-end public tests

For each locale:

1. open Home;
2. navigate primary pages;
3. open Services submenu;
4. switch equivalent language;
5. open a project;
6. open About;
7. reach Contact;
8. submit invalid form;
9. correct form;
10. submit test form;
11. confirm success;
12. verify no console error;
13. verify no broken image.

Locales:

- English;
- French;
- Arabic.

---

## 14. Editor end-to-end tests

Required:

### Load

- valid page route;
- invalid locale;
- invalid page ID;
- published content;
- protected draft behaviour.

### Edit

- text field;
- textarea;
- enum;
- image path;
- array reorder;
- add permitted item;
- remove item;
- reset changes.

### Validation

- missing required field;
- invalid path;
- duplicate ID;
- protected key attempted;
- long SEO warning;
- raw HTML rejection.

### Save

- wrong password;
- correct password;
- server validation failure;
- GitHub success;
- stale SHA conflict;
- GitHub unavailable;
- retry after failure.

### Result

- commit SHA shown;
- dirty state cleared;
- public page update after deploy;
- previous production remains if build fails.

---

## 15. Browser matrix

Minimum current stable versions at testing time:

Desktop:

- Chrome;
- Edge;
- Firefox;
- Safari on macOS if available.

Mobile:

- Android Chrome;
- iOS Safari if available.

The exact versions are recorded in the test report.

Graceful support:

- recent Chromium;
- recent Firefox;
- recent Safari.

No Internet Explorer support.

---

## 16. Viewport matrix

Required screenshots and interaction tests:

```text
360 × 800
390 × 844
768 × 1024
1024 × 768
1280 × 800
1440 × 900
1920 × 1080
```

Arabic at minimum:

```text
360 × 800
768 × 1024
1440 × 900
```

Test browser zoom at 200%.

---

## 17. Visual acceptance

Visual quality is a blocking acceptance criterion.

Review against:

- Brand Book;
- Page Blueprints;
- Component Specification.

### 17.1 Required perception

The site must feel:

- deliberate;
- premium through restraint;
- technically credible;
- internationally professional;
- founder-led;
- calm;
- consistent.

### 17.2 Reject if

- unmodified template appearance;
- generic construction stock look;
- excessive cards;
- low-contrast grey text;
- crowded sections;
- inconsistent spacing;
- cheap gradients;
- excessive rounded corners;
- mobile typography compressed;
- Arabic appears as an afterthought;
- placeholders look accidental;
- fake corporate scale;
- hero feels like a residential contractor.

### 17.3 Screenshot review

Capture every main page:

- desktop English;
- mobile English;
- desktop French;
- mobile Arabic;
- relevant editor screens.

Create:

```text
/quality/visual-review/
```

---

## 18. Visual regression

Use Playwright screenshots or approved equivalent.

Required baseline:

- Home;
- each service detail;
- Experience;
- About;
- Contact;
- editor;
- mobile menu;
- password dialog;
- validation errors.

Threshold must not hide meaningful changes.

Intentional visual changes require baseline review, not automatic acceptance.

---

## 19. Accessibility tests

Automated:

- axe-core through Playwright;
- invalid ARIA;
- missing labels;
- contrast;
- alt text;
- landmarks;
- duplicate IDs.

Manual:

- complete keyboard navigation;
- focus order;
- mobile menu;
- language selector;
- form errors;
- password dialog;
- editor arrays;
- 200% zoom;
- 320 CSS px;
- reduced motion;
- screen reader smoke test;
- Arabic mixed-direction test.

No serious or critical automated violations may remain.

Automated pass does not prove WCAG conformity.

---

## 20. RTL tests

Verify:

- `<html dir="rtl">`;
- navigation;
- header;
- hero split;
- arrows;
- breadcrumb;
- cards;
- process steps;
- forms;
- editor;
- dialogs;
- phone/email;
- project codes;
- numbers;
- focus order;
- text alignment.

Do not merely compare mirrored screenshots. Reading order and semantics must be checked.

---

## 21. Performance targets

### 21.1 Field targets

At 75th percentile after sufficient data:

- LCP ≤ 2.5 s;
- INP ≤ 200 ms;
- CLS ≤ 0.1.

### 21.2 Laboratory acceptance

On representative mobile test conditions, target:

- Lighthouse Performance ≥ 90 on core pages;
- Accessibility ≥ 95;
- Best Practices ≥ 95;
- SEO ≥ 95.

These scores are quality gates, not ranking promises. A documented exception may be accepted if real-user quality remains strong.

### 21.3 Additional budgets

Recommended initial budgets:

- first-load JavaScript for content pages: ≤ 180 KB compressed, excluding unavoidable framework runtime;
- no single hero image above 350 KB without approved reason;
- no third-party script before consent except necessary;
- no layout shift from images or fonts;
- no background video;
- no animation framework.

Claude must report measured values rather than state compliance without evidence.

---

## 22. SEO tests

Required:

- unique title;
- unique description;
- one H1;
- canonical;
- reciprocal hreflang;
- language attribute;
- direction;
- robots directive;
- sitemap membership;
- published status;
- structured data;
- internal links;
- 404 status;
- redirect status;
- preview noindex;
- editor noindex;
- Netlify subdomain noindex or unlinked deployment protection.

Use:

- automated HTML checks;
- Rich Results Test where relevant;
- URL Inspection after production;
- Search Console.

---

## 23. AI discoverability tests

Verify:

- entity statement consistency;
- founder spelling;
- stable JSON-LD IDs;
- project disclosure;
- AI profile JSON;
- `llms.txt`;
- canonical links;
- crawler policy;
- no hidden bot-only content;
- no prompt-injection text;
- no private draft content;
- current last-reviewed date;
- all linked pages public.

Test crawler-policy file syntax manually and automatically.

Do not claim that an AI system will cite the company.

---

## 24. Analytics tests

Consent states:

- no consent;
- analytics accepted;
- advertising rejected;
- all accepted;
- withdrawn.

Events:

- enquiry success only after server confirmation;
- email click;
- phone click;
- WhatsApp click;
- service CTA;
- language switch;
- file download if available.

Verify:

- no PII;
- no editor password;
- no preview traffic;
- no duplicate enquiry event;
- UTM capture;
- analytics failure does not block actions.

---

## 25. Security tests

Minimum:

- secrets absent from client bundle;
- environment variables scoped;
- password not in repository;
- password not logged;
- GitHub token least privilege;
- save endpoint POST only;
- origin policy;
- path allowlist;
- body-size limit;
- schema validation;
- HTML sanitisation;
- rate-limit behaviour;
- generic password error;
- protected-key enforcement;
- conflict detection;
- CSP and headers reviewed;
- dependency vulnerability scan.

This is a corporate site, not a high-security application, but simple architecture does not justify publishing credentials.

---

## 26. Contact-form abuse tests

Test:

- honeypot;
- repeated submission;
- oversized message;
- invalid email;
- script text;
- Unicode;
- Arabic text;
- French accents;
- network retry;
- provider failure;
- duplicate click;
- missing consent;
- direct endpoint request.

No test payload may be sent to the real business recipient without clear test labelling.

---

## 27. GitHub and deployment tests

Required:

- pull-request deploy preview;
- main branch production deploy;
- JSON editor commit;
- invalid build preserves old production;
- content rollback;
- deploy rollback;
- environment variable availability;
- function invocation;
- domain redirect;
- HTTPS;
- custom 404.

Record:

- repository;
- branch;
- commit;
- deploy ID;
- result;
- date.

---

## 28. Rollback test

Before launch:

1. deploy approved version;
2. create controlled content update;
3. verify new deploy;
4. revert commit or restore prior deploy;
5. verify public site restored;
6. document exact procedure.

Rollback that exists only theoretically is not accepted.

---

## 29. Broken-link tests

Check:

- internal links;
- alternate languages;
- image files;
- social links;
- legal links;
- canonical URLs;
- structured-data URLs;
- `llms.txt`;
- AI profile;
- sitemap;
- contact methods.

External links should return an acceptable status at review time. External availability cannot be guaranteed permanently.

---

## 30. Content-editor user acceptance

A non-developer must complete:

1. open editor;
2. select page/language;
3. find `hero.title`;
4. edit value;
5. validate;
6. preview diff;
7. enter password;
8. save;
9. understand result;
10. verify public update;
11. restore original text.

Observe:

- confusion;
- inaccessible terminology;
- errors;
- risk of accidental deletion;
- missing explanations.

The workflow is not accepted solely because a developer can use it.

---

## 31. Test evidence

Create:

```text
/quality/
├── requirements-traceability.md
├── claim-register.md
├── test-report.md
├── visual-review/
├── lighthouse/
├── accessibility/
├── seo/
├── editor/
└── deployment/
```

The repository may exclude large transient files if links to CI artifacts are retained.

Final report must include:

- environment;
- date;
- commit SHA;
- tests run;
- results;
- exceptions;
- screenshots;
- performance data;
- unresolved issues.

---

## 32. Severity

### Critical

- false claim;
- leaked secret;
- save endpoint bypass;
- production unavailable;
- form does not deliver;
- wrong project attribution;
- language route broken;
- destructive editor overwrite.

### High

- major page missing;
- Arabic unreadable;
- editor save fails;
- accidental noindex;
- serious accessibility failure;
- severe mobile break;
- structured data contradicts page.

### Medium

- isolated visual inconsistency;
- optional image missing;
- non-critical metadata warning;
- minor browser issue;
- analytics event missing.

### Low

- cosmetic refinement;
- optional documentation improvement.

No Critical or High issue may remain at launch without explicit written acceptance.

---

## 33. Release gates

### Gate 1 — Architecture

- project builds;
- JSON validates;
- routes work;
- no hardcoded copy.

### Gate 2 — Design

- component system complete;
- key pages visually approved;
- mobile and RTL approved.

### Gate 3 — Functional

- contact form;
- editor;
- GitHub;
- Netlify;
- language switch.

### Gate 4 — Quality

- automated tests;
- accessibility;
- performance;
- SEO;
- security.

### Gate 5 — Content

- verified claims;
- translations;
- project permissions;
- legal pages.

### Gate 6 — Production

- domain;
- HTTPS;
- Search Console;
- analytics consent;
- backup and rollback;
- final smoke test.

A later gate cannot override a failed earlier gate.

---

## 34. Official references

Verify current tools and thresholds:

- Web Vitals: `https://web.dev/articles/vitals`
- Lighthouse: `https://developer.chrome.com/docs/lighthouse/`
- Playwright: `https://playwright.dev/docs/intro`
- Playwright accessibility: `https://playwright.dev/docs/accessibility-testing`
- WCAG 2.2: `https://www.w3.org/TR/WCAG22/`
- Google structured data testing: `https://developers.google.com/search/docs/appearance/structured-data`
- Netlify documentation: `https://docs.netlify.com/`
- GitHub REST contents API: `https://docs.github.com/en/rest/repos/contents`

---

## 35. Final acceptance checklist

The site may be released only if:

- Critical issues: 0;
- High issues: 0;
- Medium issues: documented and accepted;
- content claims verified;
- founder approval obtained;
- visual review approved;
- mobile approved;
- Arabic approved;
- editor tested by non-developer;
- form delivery verified;
- rollback tested;
- production SEO checked;
- analytics consent checked;
- source and operational documentation complete.
