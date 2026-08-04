# Salimi Engineering — Page Blueprints

**Document ID:** SE-WEB-03  
**Version:** 1.0  
**Status:** Approved working specification  
**Target repository path:** `/source_docs/03_page_blueprints.md`

---

## 1. Purpose

This document defines the structure, purpose, content blocks, calls to action, trust elements, image placeholders and responsive behaviour of every first-release page.

The blueprints define page intent and block order. They do not define final visual styling; styling is controlled by the Brand Book and Component Library Specification.

---

## 2. Global page framework

Every public page uses the following global structure:

1. Announcement or utility bar, optional
2. Header
3. Main content
4. Contextual CTA
5. Footer
6. Cookie and privacy controls where required

Global elements are loaded from locale-specific JSON.

---

## 3. Home page blueprint

**Stable page ID:** `home`  
**Primary purpose:** Establish positioning, trust and relevance within 30–60 seconds.  
**Primary audience:** International companies, project owners, engineering firms and contractors.  
**Primary CTA:** Discuss a Project  
**Secondary CTA:** Explore Our Services  

### H01 — Hero

**Purpose:** Immediate positioning.

Required content:

- eyebrow, optional;
- primary headline;
- short supporting paragraph;
- primary CTA;
- secondary CTA;
- one hero image placeholder;
- optional trust statement.

Recommended draft headline:

> Engineering and Project Delivery Support in Morocco

Recommended support line:

> Salimi Engineering supports international and local clients with engineering coordination, owner’s representation and local project delivery in Morocco.

Image placeholder label:

```text
HERO — MOROCCO ENGINEERING / INFRASTRUCTURE
```

Constraints:

- headline maximum 75 characters where possible;
- support text maximum 220 characters;
- one primary action only;
- no slider;
- no background video;
- no unsupported numerical claims.

### H02 — Client relevance strip

**Purpose:** Allow visitors to self-identify.

Possible labels:

- International Investors
- Engineering Companies
- EPC Contractors
- Developers
- Industrial Clients

### H03 — Service pillars

Three cards:

1. Owner’s Engineering & AMO
2. Electrical & MEP Engineering
3. Local Engineering Partner in Morocco

Each card includes:

- stable ID;
- title;
- short problem statement;
- short outcome statement;
- destination URL;
- optional icon.

### H04 — Why Salimi Engineering

Four or five evidence-led points:

- direct founder involvement;
- international project experience;
- Morocco-based delivery;
- project-specific specialist teams;
- multilingual coordination, only if confirmed.

### H05 — Selected experience preview

Show three to six project cards.

Each card:

- project title or neutral descriptor;
- location;
- sector;
- founder role;
- short scope;
- image placeholder;
- link to Experience page.

Required disclosure if all projects are prior founder experience:

> Selected projects from Yunes Salimi’s professional experience.

### H06 — Delivery model

Recommended five steps:

1. Initial project review
2. Scope definition
3. Delivery team and plan
4. Engineering and coordination
5. Reporting and close-out

Each step must explain the client outcome.

### H07 — Founder introduction

Content:

- founder portrait placeholder;
- founder name;
- title;
- 80–120 word introduction;
- short quotation;
- link to About page.

Placeholder label:

```text
FOUNDER PORTRAIT — YUNES SALIMI
```

### H08 — Sectors preview

Display four to seven sector tiles.

### H09 — Final CTA

Headline example:

> Planning or delivering a project in Morocco?

Support line:

> Discuss your technical, engineering or local delivery requirements directly with Yunes Salimi.

Primary CTA:

> Discuss a Project

### H10 — Footer

Global footer.

### Mobile behaviour

- hero content before image;
- service cards stacked;
- no hidden essential text;
- CTA remains prominent but must not obstruct content.

### Arabic behaviour

- hero alignment mirrored;
- project metadata direction tested;
- Latin project codes isolated correctly;
- CTA icon direction mirrored where appropriate.

---

## 4. Services overview blueprint

**Stable page ID:** `services`  
**Purpose:** Explain the complete service model and guide visitors to the correct detailed service page.  
**Primary CTA:** Discuss Your Requirements  
**Secondary CTA:** View Selected Experience  

### S01 — Page hero

- page title;
- concise service positioning;
- breadcrumb;
- optional service diagram placeholder.

### S02 — How Salimi Engineering creates value

Explain that the company may act as:

- owner-side adviser;
- engineering coordinator;
- specialist design resource;
- local delivery partner.

### S03 — Three service pillars

Expanded cards with:

- client situation;
- scope;
- typical outputs;
- detailed-page link.

### S04 — Engagement formats

Possible formats:

- defined-scope assignment;
- retained advisory;
- project-based engineering package;
- local representation;
- subcontracting;
- consortium or partnership.

Only publish confirmed formats.

### S05 — Typical project stages

- feasibility;
- concept;
- design;
- tender;
- construction;
- commissioning;
- handover.

### S06 — Delivery principles

- clear scope;
- direct technical leadership;
- project-specific team;
- documented reporting;
- transparent interfaces.

### S07 — Related experience

Three relevant project cards.

### S08 — CTA

Project enquiry.

---

## 5. Owner’s Engineering & AMO blueprint

**Stable page ID:** `owners_engineering`  
**Purpose:** Position Salimi Engineering as the technical representative of the owner.  
**Primary audiences:** Investors, developers, asset owners and foreign project owners.  
**Primary CTA:** Discuss Owner-Side Support  

### OE01 — Hero

Suggested title:

> Owner’s Engineering and AMO in Morocco

Supporting message:

> Independent technical support for project definition, design review, tendering, delivery and handover.

### OE02 — Client problem

Explain common risks:

- unclear scope;
- fragmented design responsibilities;
- contractor interface failures;
- insufficient technical challenge;
- schedule and cost exposure;
- weak reporting.

### OE03 — Service scope

#### Definition and feasibility

- technical brief;
- requirements definition;
- feasibility support;
- risk identification.

#### Design and tender

- design review;
- interface coordination;
- tender package support;
- technical bid comparison.

#### Construction and handover

- technical monitoring;
- change review;
- progress reporting;
- commissioning support;
- handover review.

### OE04 — Typical deliverables

Examples:

- technical brief;
- design review report;
- risk register;
- technical bid evaluation;
- meeting minutes;
- site observation report;
- commissioning action list.

### OE05 — Working model

Explain direct founder leadership and specialist mobilisation.

### OE06 — Who this service is for

- foreign investors;
- developers;
- industrial owners;
- asset managers;
- project sponsors without a local technical team.

### OE07 — Relevant experience

Project cards filtered by owner-side or coordination relevance.

### OE08 — CTA

Short enquiry form or contact button.

---

## 6. Electrical & MEP Engineering blueprint

**Stable page ID:** `electrical_mep`  
**Purpose:** Present technical engineering capability without overstating legal or permanent-team capacity.  
**Primary CTA:** Discuss an Engineering Scope  

### EM01 — Hero

Suggested title:

> Electrical and MEP Engineering Support

Suggested support:

> Design, review and multidisciplinary coordination for buildings, industrial facilities and infrastructure projects.

### EM02 — Capability groups

#### Electrical

- MV/LV distribution;
- power supply;
- backup systems;
- lighting;
- earthing;
- technical specifications.

#### Low-current systems

- fire detection;
- access control;
- security;
- communications, if confirmed.

#### MEP coordination

- interface management;
- coordinated layouts;
- constructability review;
- multidisciplinary design review.

### EM03 — Project stages

- concept;
- developed design;
- tender;
- construction support;
- commissioning.

### EM04 — Deliverables

- calculations;
- single-line diagrams;
- layouts;
- specifications;
- equipment schedules;
- bills of quantities;
- review comments;
- coordination reports.

Only publish deliverables that can actually be produced.

### EM05 — Delivery model

Explain that specialist engineers may be mobilised based on scope.

### EM06 — Technical quality principles

- traceable design inputs;
- interface control;
- code and standard review;
- constructability;
- change control;
- documented approval workflow.

### EM07 — Relevant experience

Technical project cards.

### EM08 — CTA

Project discussion.

### EM09 — Regulatory disclaimer, optional

If required:

> Final design responsibility, approvals and signatures are provided in accordance with applicable Moroccan regulations and the agreed project organisation.

Exact wording requires legal review.

---

## 7. Local Engineering Partner in Morocco blueprint

**Stable page ID:** `local_partner`  
**Purpose:** Convert international visitors needing local support.  
**Primary audience:** Foreign engineering firms, EPC contractors, investors, consultants and suppliers.  
**Primary CTA:** Discuss Local Project Support  

### LP01 — Hero

Suggested title:

> Your Local Engineering Partner in Morocco

Suggested support:

> Local technical presence, engineering coordination and project delivery support for international companies operating in Morocco.

### LP02 — Market-entry problem

Explain typical needs:

- no permanent local engineering team;
- unfamiliar local delivery environment;
- need for reliable site information;
- contractor and supplier coordination;
- multilingual communication;
- technical reporting to international management.

### LP03 — Service modules

- local technical representation;
- site surveys and condition reviews;
- contractor and supplier assessment;
- engineering coordination;
- tender support;
- site monitoring;
- technical reporting;
- commissioning support.

### LP04 — How cooperation works

1. define local support needs;
2. confirm scope and interfaces;
3. mobilise founder and specialists;
4. execute and report;
5. scale support as project evolves.

### LP05 — Why Salimi Engineering

Evidence-led points:

- Morocco-based founder;
- long international engineering career;
- direct access;
- ability to work across local and international teams;
- project-specific resource model.

### LP06 — Typical client profiles

- engineering consultancies;
- EPC contractors;
- industrial investors;
- developers;
- specialist technology suppliers;
- project management firms.

### LP07 — Selected experience

International and coordination-focused examples.

### LP08 — Founder note

Short first-person statement.

### LP09 — CTA

Direct project enquiry.

---

## 8. Sectors blueprint

**Stable page ID:** `sectors`  
**Purpose:** Show where services can be applied.  
**Primary CTA:** Discuss Your Sector Requirements  

### SEC01 — Hero

Title:

> Sectors We Support

Support message must avoid implying experience in every listed sector unless confirmed.

### SEC02 — Sector grid

Initial sectors:

1. Infrastructure and Transport
2. Industrial Facilities
3. Energy and Utilities
4. Commercial and Mixed-Use Development
5. Hospitality
6. Logistics and Warehouses
7. Public and Sports Facilities

Each sector card:

- title;
- short client context;
- relevant services;
- relevant experience IDs;
- placeholder image;
- CTA.

### SEC03 — Cross-sector capabilities

- project definition;
- engineering coordination;
- owner representation;
- technical review;
- local delivery support.

### SEC04 — Relevant experience

Filtered project cards.

### SEC05 — CTA

Project discussion.

---

## 9. Selected Experience blueprint

**Stable page ID:** `experience`  
**Purpose:** Provide evidence of capability and clarify the founder’s role.  
**Primary CTA:** Discuss a Similar Project  

### EXP01 — Hero

Suggested title:

> Selected Professional Experience

Required disclosure:

> Unless otherwise stated, the projects shown reflect Yunes Salimi’s professional experience in previous engineering roles.

### EXP02 — Filters, optional

Possible filters:

- sector;
- country;
- service;
- role.

Do not implement filters if fewer than six projects are published.

### EXP03 — Project cards

Each card requires:

- stable project ID;
- display title;
- client name, optional;
- confidentiality-safe description;
- city;
- country;
- year or period;
- sector;
- founder role;
- scope;
- systems;
- result;
- relationship type;
- image path;
- image alt text;
- permission status;
- publish status.

### EXP04 — Project detail behaviour

Recommended first release:

- expandable cards or inline expansion;
- add dedicated pages later for high-value projects.

### EXP05 — Professional approach

Explain transferable capability across projects.

### EXP06 — CTA

Contact.

---

## 10. About & Founder blueprint

**Stable page ID:** `about`  
**Purpose:** Build personal and organisational trust.  
**Primary CTA:** Contact Yunes Salimi  

### AB01 — Hero

Title:

> About Salimi Engineering

Support message:

> A founder-led engineering and project advisory company based in Morocco.

### AB02 — Company purpose

Explain:

- why the company exists;
- who it supports;
- what problem it solves;
- how it differs.

### AB03 — Founder profile

- portrait;
- full name;
- title;
- concise biography;
- career geography;
- verified languages;
- technical disciplines;
- LinkedIn, if available.

### AB04 — Founder message

Target length:

- 150–250 words.

Required ideas:

- personal connection to Morocco;
- international engineering experience;
- reason for creating Salimi Engineering;
- direct personal involvement;
- project-specific specialist teams;
- client communication and accountability.

### AB05 — Delivery model

Explain:

> Each assignment is led by Yunes Salimi and supported by specialists selected for the project’s technical requirements.

### AB06 — Principles

Suggested:

- technical clarity;
- accountable leadership;
- transparent communication;
- practical delivery;
- respect for scope and evidence.

### AB07 — Timeline, optional

Only if dates are confirmed.

### AB08 — CTA

Discuss a project.

---

## 11. Contact blueprint

**Stable page ID:** `contact`  
**Purpose:** Convert interest into a qualified conversation.  
**Primary CTA:** Send Project Enquiry  

### CON01 — Hero

Title:

> Discuss a Project

Support text:

> Share a short description of your engineering, project advisory or local delivery requirement in Morocco.

### CON02 — Contact methods

- email;
- telephone;
- WhatsApp, if approved;
- LinkedIn;
- location.

Unavailable values must not be invented.

### CON03 — Enquiry form

Fields:

- full name;
- company;
- role;
- email;
- phone, optional;
- country;
- project location;
- service interest;
- project stage;
- message;
- consent checkbox;
- hidden anti-spam field.

### CON04 — What happens next

Example:

1. enquiry review;
2. clarification call;
3. scope discussion;
4. proposal, if relevant.

Do not promise response times until confirmed.

### CON05 — Privacy note

Link to Privacy Policy.

### CON06 — Alternative contact CTA

Direct email.

---

## 12. Legal Notice blueprint

**Stable page ID:** `legal_notice`

Required fields, pending legal advice:

- legal company name;
- legal form;
- registration identifiers;
- registered address;
- publication director;
- hosting provider;
- contact details;
- intellectual property statement;
- liability statement;
- applicable law.

---

## 13. Privacy Policy blueprint

**Stable page ID:** `privacy`

Required topics:

- data controller;
- data collected;
- purpose;
- legal basis;
- retention;
- recipients;
- international transfers;
- rights;
- contact;
- cookies;
- analytics;
- form processing;
- policy updates.

Final wording requires legal review.

---

## 14. Cookie Policy blueprint

**Stable page ID:** `cookies`

Required topics:

- essential cookies;
- analytics cookies;
- marketing cookies, if used;
- consent;
- duration;
- third-party services;
- management and withdrawal.

The page must match the actual implementation.

---

## 15. Shared CTA blueprint

All commercial pages should include a final CTA component with:

- context-specific title;
- concise support line;
- primary action;
- optional secondary action;
- no more than two actions.

---

## 16. Shared image placeholder rules

All initial placeholders must:

- use the final image aspect ratio;
- show the expected asset label;
- show the future path;
- include the intended alt-text field;
- avoid fake photography;
- use consistent placeholder styling;
- be replaceable without component edits.

Example:

```text
[ FOUNDER PORTRAIT ]
Expected file:
 /public/images/founder/yunes-salimi.webp
```

---

## 17. Page-level acceptance criteria

Every commercial page must:

- have one clear H1;
- have a specific audience purpose;
- include at least one evidence or trust block;
- include one primary CTA;
- include internal links;
- load content entirely from JSON;
- have locale-specific metadata;
- support mobile and RTL;
- avoid unsupported claims;
- identify missing content safely;
- render without final images.
