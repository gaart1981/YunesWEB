# Salimi Engineering — Product and Website Brief

**Document ID:** SE-WEB-01  
**Version:** 1.1  
**Status:** Approved working specification  
**Updated:** 2026-08-12  
**Target repository path:** `/source_docs/01_product_and_website_brief.md`  
**Language of specification:** English  
**Project:** Multilingual corporate website for Salimi Engineering  
**Primary deployment:** Netlify  
**Source control:** GitHub  

---

## 1. Purpose of this document

This document defines the business purpose, positioning, audiences, goals, constraints and decision principles for the Salimi Engineering website.

It is the highest-level reference for all other website documents. If a later design, content or technical decision conflicts with this brief, this brief takes precedence unless it is formally revised.

The website is not intended to present Salimi Engineering as a large established engineering corporation or as a solo freelance practice. It must present the company truthfully as a small, founder-led engineering and project advisory bureau based in Morocco, able to take on focused assignments and medium-sized project scopes and to scale project-specific teams according to the work required.

---

## 2. Confirmed business facts

The following facts are confirmed for the initial website concept:

- Commercial brand: **Salimi Engineering**
- Founder: **Yunes Salimi**
- Founder age: approximately 45
- Founder origin: Morocco
- Founder professional base: Morocco
- Founder lived and worked in Moscow from approximately 2001 to 2020
- Founder has experience as:
  - chief project engineer;
  - design engineer;
  - engineering coordinator;
  - technical project leader.
- Founder participated in significant Russian projects.
- Confirmed business model:
  - small founder-led engineering bureau;
  - not a solo freelance practice;
  - capable of focused assignments and medium-sized project scopes;
  - delivery teams may be expanded by engaging or hiring engineers and project specialists according to required disciplines, workload and site presence;
  - direct founder leadership of technical quality and the client relationship;
  - exact permanent staff count remains unconfirmed and must not be implied.
- Confirmed public business email:
  - `info@salimiengineering.com`
- Intended services:
  - engineering design;
  - electrical engineering;
  - MEP and multidisciplinary coordination;
  - owner’s engineering;
  - AMO / assistance à maîtrise d’ouvrage;
  - technical client representation;
  - tender and contractor support;
  - local engineering support for international companies operating in Morocco.
- Target market:
  - Morocco;
  - international companies entering or operating in Morocco;
  - Moroccan private and institutional clients.
- Website languages:
  - English;
  - French;
  - Arabic.
- Initial website images:
  - placeholders only;
  - all image references must be replaceable through files and JSON;
  - all physical image files must be stored under `/public/images`.
- Website content:
  - no business text hardcoded in UI components;
  - content must be loaded from structured JSON files.

---

## 3. Information not yet available

The following information must not be invented. Until it is provided, it must be represented as `INFORMATION_NOT_AVAILABLE`, `TBD`, or omitted from public pages:

- exact passport spelling of the founder’s name;
- company registration number;
- legal entity type;
- registered office;
- VAT or tax identifiers;
- professional licences and authorisations;
- insurance details;
- exact years of experience;
- exact list of past projects;
- project budgets;
- project clients;
- project dates;
- project photographs;
- testimonials;
- partner companies;
- permanent staff count;
- exact service coverage by city or region;
- phone number;
- LinkedIn profile URL;
- legal notices required under Moroccan law;
- professional qualifications required to sign specific engineering documents in Morocco.

No placeholder may be published in a way that suggests the missing information is confirmed.

---

## 4. Business objective

The website must create qualified commercial conversations with organisations that need engineering, technical representation, project coordination or local delivery support in Morocco.

The website must support three commercial entry routes:

1. **International companies**
   - entering Morocco;
   - bidding for Moroccan work;
   - delivering projects in Morocco;
   - needing a local technical representative or engineering partner.

2. **Moroccan project owners and developers**
   - needing owner’s engineering;
   - design review;
   - tender support;
   - technical coordination;
   - construction follow-up.

3. **Engineering firms and contractors**
   - needing local capacity;
   - specialist subcontracting;
   - site surveys;
   - local coordination;
   - additional engineering resources.

---

## 5. Website objectives

### 5.1 Primary objectives

The website must:

- explain the company’s positioning within the first screen;
- establish trust in Yunes Salimi as the accountable technical lead;
- explain the three principal service families;
- make clear that Salimi Engineering is a small bureau rather than a solo freelancer;
- explain that the bureau can scale a project team for focused assignments and medium-sized project scopes without pretending to maintain a large permanent organisation;
- present selected professional experience transparently;
- generate project enquiries;
- support English, French and Arabic audiences;
- provide dedicated content structures suitable for future SEO and Google Ads campaigns;
- provide structured machine-readable information for search engines and AI systems;
- allow non-developers to edit text through an internal JSON editor.

### 5.2 Secondary objectives

The website should:

- support partnership discussions with foreign engineering firms;
- support subcontracting discussions;
- allow future publication of sector-specific landing pages;
- serve as a professional reference after networking, email outreach and LinkedIn contact;
- support downloadable capability statements in a later phase;
- create a consistent base for proposals, presentations and LinkedIn branding.

### 5.3 Non-objectives for the first release

The first release is not intended to provide:

- e-commerce;
- client portals;
- project management software;
- engineering calculation tools;
- document sharing with clients;
- online payment;
- public user accounts;
- employee recruitment workflows;
- complex CRM functionality;
- instant quotations;
- public tender aggregation.

---

## 6. Strategic positioning

### 6.1 Core positioning statement

> Salimi Engineering is a small, Morocco-based, founder-led engineering and project advisory bureau supporting international and local clients with engineering coordination, owner’s representation and local project delivery. It can take on focused assignments and medium-sized project scopes and scale the delivery team with the engineers and specialists required by each project.

### 6.2 Short brand description

> International engineering experience. Local project delivery in Morocco. A project team scaled to the assignment. Direct senior accountability.

### 6.3 Expanded positioning

Salimi Engineering should be presented as a technically accountable, flexible and locally present engineering bureau. The company does not sell the appearance of corporate scale and must not look like a solo freelance portfolio. It sells:

- direct senior accountability through the founder and lead engineer;
- international project experience;
- disciplined engineering coordination;
- local understanding;
- the ability to form and expand a project team according to required disciplines, workload and site presence;
- capability to handle focused assignments and medium-sized project scopes;
- clear communication;
- controlled technical delivery.

The project team may include engineers and project specialists engaged or hired specifically for the assignment. This scalable model must not be presented as evidence of any fixed permanent headcount that has not been confirmed.

### 6.4 Positioning boundaries

The website must not describe Salimi Engineering as:

- a market leader;
- a large multidisciplinary group;
- a contractor capable of executing any project;
- a single-person freelance practice;
- an established company with decades of corporate history;
- an organisation with offices or a permanent staff count not confirmed;
- an authorised signatory for engineering disciplines not legally confirmed;
- a participant in projects that only involved the founder in another employment context without clear disclosure.

---

## 7. Core service architecture

The public website must organise services into three principal commercial pillars.

### 7.1 Owner’s Engineering and AMO

Possible services, subject to confirmation:

- technical brief development;
- design review;
- owner’s technical representation;
- consultant and contractor coordination;
- tender documentation support;
- technical bid evaluation;
- schedule and cost risk review;
- site monitoring;
- commissioning support;
- handover support;
- technical reporting.

### 7.2 Electrical and MEP Engineering

Possible services, subject to confirmation:

- MV and LV systems;
- power distribution;
- backup power;
- lighting;
- low-current systems;
- fire detection;
- access control and security systems;
- MEP coordination;
- technical specifications;
- quantities and tender documentation;
- constructability review;
- construction support.

### 7.3 Local Engineering Partner in Morocco

Possible services:

- local technical representation;
- site surveys;
- project feasibility support;
- local stakeholder coordination;
- local engineering resource identification;
- contractor and supplier assessment;
- tender support;
- construction monitoring;
- technical reporting;
- adaptation of international project requirements to local execution conditions;
- commissioning assistance.

---

## 8. Priority target audiences

### 8.1 International engineering companies

**Typical need:** local technical presence in Morocco.

**Questions the website must answer:**

- Can Salimi Engineering represent us locally?
- Can it coordinate with local contractors and authorities?
- Can it report in English or French?
- Is the founder technically credible?
- Can it assemble and scale specialist resources for the required project scope?

### 8.2 International EPC contractors

**Typical need:** project delivery support, local engineering or subcontracting.

**Questions:**

- Can the company mobilise quickly?
- Can it support tendering and execution?
- Can it coordinate electrical and MEP interfaces?
- Can it operate professionally within our reporting structure?

### 8.3 Foreign investors and developers

**Typical need:** independent technical support and owner representation.

**Questions:**

- Who will protect our technical interests?
- Who will verify design and contractor proposals?
- Who will monitor delivery locally?
- Who is directly accountable?

### 8.4 Moroccan private clients

**Typical need:** structured technical management and international standards.

**Questions:**

- What services are available?
- What experience supports those services?
- Can the company coordinate multiple disciplines?
- Is the scope and delivery model clear?

### 8.5 Local engineering firms and contractors

**Typical need:** specialist capacity, coordination or international-facing support.

**Questions:**

- Can Salimi Engineering complement our team?
- Can it support English-speaking clients?
- Can it provide technical leadership?
- Can it work as a subcontractor or consortium partner?

---

## 9. Audience priority

The first-release content priority is:

1. international companies operating or entering Morocco;
2. international and Moroccan project owners;
3. engineering firms and EPC contractors;
4. Moroccan contractors and specialist partners;
5. public-sector clients, mainly through partnerships or consortiums.

The website must therefore use internationally understandable terminology while preserving French AMO terminology where commercially useful.

---

## 10. User jobs to be done

The website must help a visitor complete one or more of the following jobs:

- verify whether Salimi Engineering is relevant to a Moroccan project;
- understand the founder’s experience;
- identify a suitable service;
- evaluate whether the company can act as a local partner;
- understand whether the bureau can scale a team to the size and disciplines of the assignment;
- review selected professional experience;
- understand the delivery model;
- contact the founder or bureau;
- submit an initial project brief;
- share the website internally with decision-makers;
- return later through a memorable brand and URL.

---

## 11. Core trust model

Trust must be built through evidence and transparency.

### 11.1 Required trust signals

- clear founder identity;
- professional founder portrait;
- honest description of the company’s size and scalable delivery model;
- clear distinction between a small bureau and a solo freelance practice;
- selected experience with role clarity;
- specific service descriptions;
- physical base in Morocco;
- professional contact information, including `info@salimiengineering.com`;
- consistent English, French and Arabic versions;
- valid legal information when available;
- professional design;
- fast loading;
- secure HTTPS;
- clear privacy handling;
- direct project enquiry process.

### 11.2 Evidence hierarchy

Use evidence in this order:

1. verified project facts;
2. verified roles and responsibilities;
3. verified qualifications;
4. verified client references or recommendations;
5. verified certifications;
6. verified partner relationships;
7. general capability descriptions.

General marketing claims must never substitute for missing evidence.

---

## 12. Brand personality

The website should communicate:

- technical competence;
- accountability;
- discretion;
- reliability;
- international professionalism;
- local presence;
- pragmatic execution;
- clarity.

The website should not communicate:

- exaggerated ambition;
- aggressive salesmanship;
- luxury branding;
- start-up experimentation;
- bureaucratic institutional style;
- generic construction imagery;
- artificial corporate scale.

---

## 13. Tone of voice

### 13.1 Writing principles

Content must be:

- concise;
- factual;
- technically credible;
- client-oriented;
- specific;
- free from unsupported superlatives;
- consistent across languages;
- written in clear international business language.

### 13.2 Preferred style

Prefer:

> We support international project owners with local engineering coordination and technical representation in Morocco, scaling the project team to the scope required.

Avoid:

> We are a leading and innovative engineering company delivering world-class, cutting-edge and tailor-made solutions for every challenge.

### 13.3 Founder message style

The founder message should:

- use the first person;
- remain professional;
- explain the company’s reason for existence;
- state direct personal involvement;
- describe international experience without exaggeration;
- explain the scalable project-specific team model;
- make clear that Salimi Engineering is a bureau, not a one-person freelance offer;
- invite serious project discussions.

---

## 14. Language strategy

### 14.1 English

English is the primary source language for international positioning and the default language for the first public release.

### 14.2 French

French is essential for Moroccan business, AMO terminology and local/international companies operating in Francophone environments.

### 14.3 Arabic

Arabic must be a complete right-to-left version, not a visual copy of the English layout. It must be professionally reviewed before publication.

### 14.4 Translation governance

- English source copy is approved first.
- French and Arabic translations follow the same content IDs.
- Translation must preserve meaning, not word order.
- Technical terminology must be reviewed by a competent professional.
- Missing translations must not silently fall back in production unless the fallback is explicitly approved.
- The language selector must always remain available.

---

## 15. Primary conversion actions

### 15.1 Main CTA

**Discuss a Project**

Equivalent labels:

- French: `Discuter de votre projet`
- Arabic: to be professionally translated and validated.

### 15.2 Secondary CTAs

- Explore Our Services
- View Selected Experience
- Contact Salimi Engineering
- Request an Introductory Call
- Send a Project Brief

### 15.3 Conversion hierarchy

1. project enquiry form;
2. direct email click;
3. telephone click;
4. WhatsApp click, if approved;
5. LinkedIn profile visit;
6. capability statement download, future phase.

---

## 16. Contact form principles

The contact form should request only information useful for qualification:

- name;
- company;
- role;
- corporate email;
- country;
- project location;
- service of interest;
- project stage;
- short project description;
- optional attachment, future phase;
- consent checkbox where legally required.

The form must not ask for confidential technical documents in the first release unless secure handling is implemented.

---

## 17. Content governance

### 17.1 Source of truth

Public content must be stored in version-controlled JSON files in GitHub.

### 17.2 Content changes

Changes may be made through:

- direct GitHub editing;
- local development;
- the approved JSON editor.

All production changes must result in a traceable Git commit.

### 17.3 Content ownership

Initial owner:

- Yunes Salimi or a formally designated administrator.

Technical owner:

- repository maintainer.

Translation owner:

- designated reviewer for each language.

### 17.4 Approval requirement

The following content requires explicit approval before publication:

- project names;
- client names;
- logos;
- budgets;
- dates;
- project photographs;
- testimonials;
- legal claims;
- certifications;
- authorisations;
- insurance information;
- personal contact details other than already confirmed public business contact facts.

---

## 18. Performance expectations

The site should be designed to:

- load quickly on mobile networks;
- minimise JavaScript;
- optimise images;
- avoid background video;
- avoid unnecessary animation;
- provide stable layouts;
- remain usable without high-end devices;
- support current major browsers.

Performance targets will be defined in the testing specification.

---

## 19. Accessibility expectations

The site should:

- use semantic HTML;
- support keyboard navigation;
- provide visible focus states;
- meet appropriate colour contrast;
- provide text alternatives for images;
- support RTL layout;
- avoid motion that is essential to comprehension;
- clearly label forms and errors.

Detailed criteria will be defined in the accessibility specification.

---

## 20. Legal and ethical constraints

The site must:

- avoid false or misleading claims;
- distinguish company experience from founder experience;
- publish third-party logos only with permission;
- publish project photographs only with permission;
- comply with applicable privacy and cookie requirements;
- not expose passwords or secrets in frontend code;
- not claim regulatory authority without proof;
- not create fictitious testimonials;
- not create fictitious team members;
- not imply a permanent staff count that has not been confirmed;
- not imply responsibility for projects beyond the founder’s actual role.

---

## 21. Initial success indicators

The first release should be assessed using:

- qualified project enquiries;
- contact form completion rate;
- email and phone clicks;
- visits to service pages;
- visits to selected experience;
- language usage;
- organic search impressions;
- branded search growth;
- performance and accessibility quality;
- proportion of enquiries from target audiences.

No revenue or enquiry volume guarantee is implied.

---

## 22. Decision principles

When trade-offs occur, use the following order:

1. factual accuracy;
2. trust;
3. clarity;
4. conversion relevance;
5. accessibility;
6. performance;
7. visual distinction;
8. implementation convenience.

---

## 23. Definition of a successful first release

The first release is successful when:

- the company positioning is immediately clear;
- the visitor understands that Salimi Engineering is a small engineering bureau, not a solo freelancer and not a fictional large organisation;
- the scalable project-team model is understandable;
- the founder is visible and credible as the accountable technical lead;
- all three principal service pillars are explained;
- the delivery model is honest and understandable;
- selected experience can be published without ambiguity;
- the site works in English, French and Arabic;
- all business text is JSON-driven;
- images can be replaced through `/public/images`;
- visitors can submit a project enquiry;
- the website can be indexed correctly;
- the content can be edited through the approved workflow;
- no unsupported claims are published.
