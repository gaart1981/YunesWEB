# Salimi Engineering — Claude Implementation and Agent Control Protocol

**Document ID:** SE-WEB-16  
**Version:** 1.0  
**Status:** Binding execution protocol  
**Target repository path:** `/source_docs/16_claude_implementation_and_agent_control_protocol.md`  
**Review date:** 2026-08-04

---

## 1. Purpose

This document instructs Claude how to implement the Salimi Engineering website from the complete `/source_docs` package.

Claude is the principal technical executor and integration owner.

Claude may create specialist agents for defined subtasks. Agent work is advisory or contributory until Claude has:

- reviewed it;
- checked it against source documents;
- tested it;
- integrated it;
- accepted responsibility for the result.

Claude must not use agents as a substitute for verification.

---

## 2. Mandatory first action

Before writing code, Claude must read all documents in `/source_docs` in numerical order:

```text
01_product_and_website_brief.md
02_sitemap_and_information_architecture.md
03_page_blueprints.md
04_content_model_and_json_specification.md
05_content_master_document.md
06_brand_book_and_visual_design_system.md
07_component_library_specification.md
08_technical_architecture_specification.md
09_admin_json_editor_specification.md
10_media_and_asset_specification.md
11_accessibility_specification.md
12_seo_specification.md
13_ai_discoverability_and_machine_readable_content.md
14_analytics_and_conversion_tracking_plan.md
15_testing_and_acceptance_criteria.md
16_claude_implementation_and_agent_control_protocol.md
```

Claude must create:

```text
/implementation/source-docs-review.md
```

It must contain:

- each document read;
- key requirements;
- dependencies;
- unresolved contradictions;
- implementation consequences.

Claude must not start substantial implementation before completing this review.

---

## 3. Authority hierarchy

When documents conflict, apply:

1. factual accuracy and explicit latest user instruction;
2. Document 01 — Product and Website Brief;
3. Document 02 — Sitemap and Information Architecture;
4. Document 03 — Page Blueprints;
5. Document 04 — Content and JSON Specification;
6. Document 06 — Brand Book;
7. Document 08 — Technical Architecture;
8. Document 09 — Admin Editor;
9. Document 11 — Accessibility;
10. Document 12 — SEO;
11. Document 13 — AI Discoverability;
12. Document 15 — Testing;
13. remaining documents.

Claude must not silently resolve a material contradiction.

It must record the resolution in:

```text
/implementation/decision-log.md
```

---

## 4. Non-negotiable requirements

Claude must preserve:

- brand name `Salimi Engineering`;
- founder-led positioning;
- honest project attribution;
- English/French/Arabic architecture;
- Arabic RTL;
- JSON-driven visible business content;
- stable JSON keys;
- images under `/public/images`;
- branded placeholders;
- Netlify deployment;
- GitHub source of truth;
- open editor routes;
- server-side save password verification;
- GitHub commit on save;
- conflict detection;
- no secrets in client;
- premium restrained visual system;
- accessibility;
- SEO and AI entity consistency;
- testing evidence.

Claude may not downgrade these requirements to simplify delivery.

---

## 5. Prohibited autonomous changes

Claude and agents must not independently:

- rename the company;
- alter positioning;
- remove a language;
- replace JSON with hardcoded text;
- introduce a CMS;
- introduce a database;
- add fake projects;
- add fake team members;
- invent a legal address;
- invent company registration;
- invent certifications;
- claim World Cup participation;
- use fake testimonials;
- use former employer logos without permission;
- replace the visual system with a template;
- place the save password in frontend code;
- expose GitHub credentials;
- add user accounts;
- add public file uploads;
- add e-commerce;
- add tracking without consent;
- permit an agent to merge unreviewed code.

---

## 6. Information-not-available rule

Where source information is missing:

- do not invent it;
- keep it in draft JSON;
- omit it from production rendering;
- use approved image placeholder where relevant;
- register it in `/implementation/missing-information.md`.

Allowed internal markers:

```text
INFORMATION_NOT_AVAILABLE
REQUIRES_CONFIRMATION
TBD
```

These markers must not appear on production public pages.

---

## 7. Required implementation phases

Claude must work in controlled phases.

### Phase 0 — Repository inspection

Tasks:

- inspect current repository;
- identify existing code;
- preserve useful authorised work;
- identify conflicts;
- create baseline branch/commit;
- verify Netlify/GitHub context.

Deliverable:

```text
/implementation/repository-assessment.md
```

### Phase 1 — Architecture foundation

Tasks:

- initialise approved stack;
- configure TypeScript;
- create repository structure;
- design tokens;
- locale routing;
- content loader;
- schemas;
- validation scripts;
- test foundation.

Gate:

- build succeeds;
- three locale roots render;
- content validation works.

### Phase 2 — Design system and core components

Tasks:

- primitives;
- header/footer;
- typography;
- grid;
- hero;
- cards;
- placeholders;
- form components;
- RTL foundations.

Gate:

- component review;
- responsive screenshots;
- no generic UI-library appearance.

### Phase 3 — Public pages

Tasks:

- implement 12 page types;
- connect JSON;
- internal links;
- placeholders;
- metadata;
- structured data;
- 404 and errors.

Gate:

- all pages render in three languages or approved draft state;
- page blueprints traceable.

### Phase 4 — JSON editor

Tasks:

- editor routes;
- schema-driven controls;
- arrays;
- validation;
- diff;
- password dialog;
- save function;
- GitHub API;
- SHA conflict handling.

Gate:

- test branch commit succeeds;
- wrong password rejected;
- conflict safe.

### Phase 5 — Contact and analytics

Tasks:

- contact form;
- server validation;
- delivery;
- consent;
- analytics wrapper;
- conversion events;
- preview exclusion.

Gate:

- test enquiry received;
- no PII in analytics.

### Phase 6 — SEO and AI machine-readable layer

Tasks:

- canonical;
- hreflang;
- sitemap;
- robots;
- JSON-LD;
- AI profile;
- optional `llms.txt`;
- entity consistency script.

Gate:

- technical validation;
- no contradictory claims.

### Phase 7 — Quality and visual refinement

Tasks:

- E2E;
- accessibility;
- performance;
- visual regression;
- cross-browser;
- Arabic;
- editor UAT;
- rollback test.

Gate:

- release criteria satisfied.

### Phase 8 — Production handover

Tasks:

- production deploy;
- domain;
- environment variables;
- Search Console;
- analytics;
- operational documentation;
- final report.

---

## 8. Agent use policy

Claude may create agents for parallel analysis or implementation.

Each agent must receive:

- role;
- exact scope;
- source documents;
- input files;
- output files;
- constraints;
- acceptance criteria;
- prohibited actions.

Agents must not receive broad instructions such as:

> Build the website.

---

## 9. Recommended agents

### 9.1 Design-system agent

Scope:

- tokens;
- component styling;
- responsive variants;
- RTL styling;
- visual QA.

Must read:

- Docs 03, 06, 07, 10, 11, 15.

May not:

- change colour palette;
- add a design framework;
- invent imagery;
- change page structure.

### 9.2 Content-schema agent

Scope:

- JSON schemas;
- loaders;
- stable IDs;
- validation;
- translation completeness.

Must read:

- Docs 02, 03, 04, 05, 12, 13.

May not:

- rewrite approved positioning;
- invent translations;
- change stable page IDs.

### 9.3 Public-page agent

Scope:

- implement assigned pages using approved components.

Must receive:

- exact page IDs;
- page blueprint;
- content JSON;
- component API.

May not:

- create one-off visual system;
- hardcode text;
- change navigation.

### 9.4 Editor and GitHub agent

Scope:

- editor;
- server validation;
- password verification;
- GitHub commit;
- conflict handling.

Must read:

- Docs 04, 08, 09, 15.

May not:

- put password or token in client;
- accept arbitrary repository path;
- bypass schema;
- overwrite conflict.

### 9.5 SEO and entity agent

Scope:

- metadata;
- hreflang;
- sitemap;
- robots;
- JSON-LD;
- AI profile;
- consistency validation.

Must read:

- Docs 02, 04, 12, 13, 15.

May not:

- add unsupported claims;
- create fake local business data;
- change crawler policy without record.

### 9.6 QA agent

Scope:

- tests;
- visual screenshots;
- accessibility;
- performance;
- traceability.

Must read:

- all documents, especially 06, 11 and 15.

May not:

- mark a failed requirement as passed;
- reduce thresholds;
- alter production merely to make a test pass without review.

---

## 10. Agent task contract

Every agent instruction must include:

```text
Role:
Objective:
Files allowed to read:
Files allowed to change:
Source-document requirements:
Constraints:
Tests to run:
Output format:
Acceptance criteria:
Escalation conditions:
```

Example:

```text
Role:
Editor security implementation agent

Objective:
Implement the server-side content-save function.

Files allowed to change:
netlify/functions/save-content.ts
lib/security/*
tests/integration/editor-save.test.ts

Source documents:
04, 08, 09, 15, 16

Constraints:
No client secrets.
Allowlisted locale/page IDs.
Zod validation.
SHA conflict detection.
No arbitrary paths.

Acceptance:
Wrong password rejected.
Protected keys rejected.
Valid change creates test commit.
Conflict returns 409.
```

---

## 11. Agent output is untrusted until reviewed

Claude must check each output for:

- source-document compliance;
- code correctness;
- security;
- visual consistency;
- types;
- tests;
- hidden assumptions;
- invented facts;
- integration effects.

Claude must not report:

> The agent completed the task successfully.

unless Claude independently validates it.

---

## 12. Evidence policy

For every current external technical claim, Claude must prefer official documentation.

Examples:

- Next.js;
- Netlify;
- GitHub;
- Google Search;
- OpenAI crawlers;
- Anthropic crawlers;
- WCAG;
- Google Analytics;
- Playwright.

Claude must not rely on:

- random SEO blogs;
- outdated code snippets;
- unverified forum comments;
- package behaviour from memory where current documentation is material.

Record external decisions in:

```text
/implementation/external-reference-log.md
```

Fields:

- decision;
- official source;
- access date;
- implementation consequence.

---

## 13. No hallucinated completion

Claude must not claim:

- deployed;
- tested;
- verified;
- accessible;
- secure;
- connected;
- indexed;
- delivered;

without evidence.

Examples of evidence:

- command output;
- test result;
- deploy URL;
- commit SHA;
- screenshot;
- function response;
- received test email;
- Search Console status;
- Lighthouse report.

If a task cannot be completed, state:

- what was completed;
- what failed;
- evidence;
- exact blocker;
- safest next action.

---

## 14. Change-control protocol

Any change to an approved requirement must create an entry:

```text
Decision ID:
Date:
Requested by:
Affected documents:
Original requirement:
Proposed change:
Reason:
Risks:
Alternatives:
Approval status:
Implementation:
```

No material change may be hidden inside a commit.

---

## 15. Code ownership and file boundaries

Claude must avoid multiple agents editing the same file concurrently.

Before parallel tasks:

- divide file ownership;
- define integration interfaces;
- freeze shared types where possible;
- assign one integrator.

If two agents must touch the same area:

- sequence their work;
- rebase;
- review diff;
- rerun tests.

---

## 16. Branch strategy

Recommended:

- `main`: production;
- feature branches;
- pull request;
- Netlify preview;
- merge after gate.

Agent branches:

```text
feat/design-system
feat/content-schema
feat/public-pages
feat/json-editor
feat/seo-ai
test/release-quality
```

Claude integrates through controlled pull requests or equivalent reviewed commits.

The editor’s production content commits may go directly to `main` only after the save workflow is approved.

---

## 17. Commit rules

Commit messages:

```text
feat(design): implement premium hero and section system
feat(content): add validated multilingual page schemas
feat(editor): add GitHub-backed content save
fix(rtl): correct Arabic breadcrumb direction
test(editor): cover password and conflict flows
docs(implementation): record deployment procedure
```

Rules:

- one coherent purpose;
- no secrets;
- no vague `update`;
- no giant unreviewable final commit;
- source documents not rewritten without instruction.

---

## 18. Implementation manifest

Create:

```text
/implementation/implementation-manifest.json
```

Example:

```json
{
  "project": "Salimi Engineering Website",
  "sourceDocsVersion": "1.0",
  "framework": "",
  "node": "",
  "locales": ["en", "fr", "ar"],
  "pages": {},
  "features": {},
  "environmentVariables": [],
  "tests": {},
  "openIssues": [],
  "lastUpdated": ""
}
```

Update at each phase.

---

## 19. Requirement traceability

Claude must maintain:

```text
/quality/requirements-traceability.md
```

Every non-negotiable requirement maps to:

- implementation;
- test;
- evidence;
- status.

Status:

```text
not_started
in_progress
implemented
verified
blocked
accepted_exception
```

`implemented` is not equivalent to `verified`.

---

## 20. Visual quality protocol

Claude must not treat design as complete after components compile.

Required process:

1. implement tokens;
2. build homepage;
3. capture desktop/mobile screenshots;
4. compare with Brand Book;
5. inspect spacing and hierarchy;
6. inspect dark/light rhythm;
7. inspect founder emphasis;
8. inspect placeholders;
9. inspect French length;
10. inspect Arabic RTL;
11. refine;
12. freeze approved patterns.

Claude must reject agent output that:

- resembles a generic template;
- looks cheap;
- uses excessive gradients;
- overuses cards;
- compresses whitespace;
- implies a large team;
- uses fake photography;
- ignores the approved colour ratios.

---

## 21. Content correctness protocol

Before content enters `published`:

- verify claim register;
- remove internal markers;
- verify client permission;
- verify role;
- verify period;
- verify founder spelling;
- verify translation;
- verify metadata;
- verify structured data;
- verify image rights.

Agents may draft content structure but may not mark business facts verified.

---

## 22. Translation protocol

Claude may create provisional translations only if labelled draft.

Production translation requires:

- semantic equivalence;
- engineering terminology review;
- French professional review;
- Arabic professional review;
- RTL visual review;
- no automatic mixing.

Stable IDs remain identical.

Translation agents may not modify English source meaning.

---

## 23. Security protocol

Before implementing the editor, Claude must produce a brief threat assessment covering:

- exposed editor URL;
- password guessing;
- GitHub token;
- arbitrary file writing;
- stale overwrite;
- script injection;
- secret logging;
- origin misuse;
- denial through oversized body.

Minimum controls from Docs 08 and 09 are mandatory.

The example password `leadline` must not be committed or used as production password.

---

## 24. Testing protocol

Claude must run the tests defined in Document 15.

Required command group:

```text
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

If command names differ, document equivalents.

Do not omit a failing command from final reporting.

---

## 25. Definition of agent failure

An agent task fails if:

- output contradicts source docs;
- tests absent;
- claims invented;
- files outside scope changed;
- secrets exposed;
- hardcoded text added;
- visual system changed;
- incomplete output presented as complete;
- only happy path implemented;
- error handling omitted.

Claude must repair or rerun with narrower instructions.

---

## 26. Integration review checklist

For each agent contribution:

- inspect diff;
- inspect files outside scope;
- run typecheck;
- run relevant unit tests;
- run integration tests;
- inspect public UI;
- inspect Arabic;
- check hardcoded copy;
- check secrets;
- update traceability;
- update decision log;
- commit reviewed integration.

---

## 27. Communication and progress reporting

Claude should provide concise milestone reports containing:

- phase;
- completed;
- tests;
- issues;
- next integration action.

Do not report low-level activity continuously.

Do not conceal:

- failed tests;
- incomplete translations;
- unavailable credentials;
- unverified content;
- visual deviations.

---

## 28. Required final deliverables

Repository must include:

```text
/source_docs/                 16 source documents
/implementation/             decisions and execution records
/quality/                    test and acceptance evidence
/content/                    JSON content
/schemas/                    JSON/Zod schemas
/public/images/              assets and placeholders
/netlify/functions/          server functions
README.md
.env.example
netlify.toml
package.json
package-lock.json
```

Operational documentation:

```text
/implementation/deployment-guide.md
/implementation/content-editing-guide.md
/implementation/password-rotation-guide.md
/implementation/rollback-guide.md
/implementation/image-replacement-guide.md
/implementation/translation-guide.md
```

---

## 29. Final report

Claude must create:

```text
/implementation/final-implementation-report.md
```

Required sections:

1. architecture;
2. routes;
3. content model;
4. design system;
5. editor;
6. Netlify/GitHub integration;
7. contact form;
8. SEO;
9. AI discoverability;
10. analytics;
11. accessibility;
12. performance;
13. tests;
14. deployment;
15. unresolved information;
16. known limitations;
17. rollback;
18. evidence.

Include:

- production URL;
- repository branch;
- final commit SHA;
- Netlify deploy ID;
- test results;
- screenshots;
- accepted exceptions.

Do not include secrets.

---

## 30. Completion declaration

Claude may declare the website complete only when:

- all release gates pass;
- final report exists;
- Critical issues are zero;
- High issues are zero;
- content claims are approved;
- visual quality is approved;
- editor is tested;
- production deploy succeeds;
- rollback is tested.

Approved wording:

> Implementation is complete against the recorded requirements, with the exceptions listed in the final report.

Prohibited wording:

> Everything is perfect and fully secure.

---

## 31. Minimal master prompt for Claude

The following may be used to initiate implementation:

```text
Implement the Salimi Engineering website using the complete numbered specifications in /source_docs.

Before coding:
1. Read all 16 documents in numerical order.
2. Create /implementation/source-docs-review.md.
3. Create a requirements traceability matrix.
4. Identify contradictions and record decisions.
5. Produce a phased implementation plan.

You may use specialist agents, but each agent must receive a bounded task, file scope, source-document references and acceptance criteria. Treat every agent output as untrusted until you review, test and integrate it.

Do not invent business facts, projects, legal data, team members, testimonials, certifications or addresses.
Do not hardcode visible business text.
Do not alter the approved brand, sitemap, JSON architecture, languages, RTL requirement, Netlify/GitHub architecture or server-side editor security.
Use approved placeholders under /public/images until real images are supplied.

Implement, test, deploy and document the project. Do not claim completion without test evidence, commit identifiers and deploy evidence.
```

---

## 32. Acceptance criteria

Claude’s implementation process is accepted when:

- all source documents are reviewed;
- agents have bounded scopes;
- agent outputs are independently checked;
- decisions are recorded;
- missing facts are not invented;
- code changes are traceable;
- design is visually reviewed;
- tests provide evidence;
- deployment and rollback are proven;
- final report is factual;
- no unverified completion claim is made.
