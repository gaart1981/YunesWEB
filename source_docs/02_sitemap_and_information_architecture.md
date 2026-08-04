# Salimi Engineering — Sitemap and Information Architecture

**Document ID:** SE-WEB-02  
**Version:** 1.0  
**Status:** Approved working specification  
**Target repository path:** `/source_docs/02_sitemap_and_information_architecture.md`

---

## 1. Purpose

This document defines:

- the website page hierarchy;
- navigation;
- URL structure;
- page slugs;
- language routing;
- internal linking;
- future landing-page architecture;
- footer structure;
- page relationships;
- indexing principles.

The structure is designed for a multilingual B2B engineering website targeting international and Moroccan clients.

---

## 2. Information architecture principles

The architecture must:

- make the company’s positioning understandable within one page view;
- keep the top navigation short;
- separate broad service overview from detailed service pages;
- create a dedicated route for international companies seeking a local partner;
- make founder experience easy to verify;
- support future SEO landing pages without changing the main navigation;
- maintain identical page identities across English, French and Arabic;
- support right-to-left Arabic presentation;
- allow every public page to be edited through a stable `pageSlug`.

---

## 3. Public page inventory

The first release contains 12 public page types.

### Commercial pages

1. Home
2. Services
3. Owner’s Engineering & AMO
4. Electrical & MEP Engineering
5. Local Engineering Partner in Morocco
6. Sectors
7. Selected Experience
8. About & Founder
9. Contact / Discuss a Project

### Legal pages

10. Legal Notice
11. Privacy Policy
12. Cookie Policy

---

## 4. Primary navigation

Recommended desktop navigation:

```text
Home
Services
Sectors
Experience
About
Contact
EN | FR | العربية
```

Persistent primary CTA:

```text
Discuss a Project
```

### Services submenu

```text
Services Overview
Owner’s Engineering & AMO
Electrical & MEP Engineering
Local Engineering Partner in Morocco
```

### Navigation constraints

- Maximum six primary textual navigation items excluding language selector.
- The main CTA must remain visually distinct.
- Mobile navigation must use an accessible menu button.
- The language selector must remain visible or reachable in one interaction.
- The current page and language must be identifiable.
- No navigation label may be hardcoded; all labels must come from global JSON.

---

## 5. Canonical route pattern

All public pages use explicit language prefixes.

```text
/{locale}/{pageSlug}
```

Examples:

```text
/en/
/en/services
/en/owners-engineering-amo
/en/electrical-mep-engineering
/en/local-engineering-partner-morocco
/en/sectors
/en/experience
/en/about
/en/contact

/fr/
/fr/services
/fr/ingenierie-maitre-ouvrage-amo
/fr/ingenierie-electrique-mep
/fr/partenaire-ingenierie-maroc
/fr/secteurs
/fr/experience
/fr/a-propos
/fr/contact

/ar/
/ar/services
/ar/owners-engineering-amo
/ar/electrical-mep-engineering
/ar/local-engineering-partner-morocco
/ar/sectors
/ar/experience
/ar/about
/ar/contact
```

### Recommended implementation rule

Public slugs may be localised for English and French. Arabic slugs may remain Latin-character slugs in the first release for operational simplicity.

Every page must also have an internal stable identifier independent of the visible URL:

```text
home
services
owners_engineering
electrical_mep
local_partner
sectors
experience
about
contact
legal_notice
privacy
cookies
```

The stable identifier is the `pageSlug` used by the editor and content system.

---

## 6. Recommended route table

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

Exact Arabic slugs may be revised after technical and linguistic review.

---

## 7. Editor route architecture

The content editor uses stable page IDs, not translated public slugs.

```text
/editjson/{locale}/{pageSlug}
```

Examples:

```text
/editjson/en/home
/editjson/fr/home
/editjson/ar/home
/editjson/en/local_partner
```

Global content editors:

```text
/editjson/en/global
/editjson/fr/global
/editjson/ar/global
/editjson/shared/company
/editjson/shared/settings
```

The editor routes must be excluded from indexing.

---

## 8. Page hierarchy

```text
Home
├── Services
│   ├── Owner’s Engineering & AMO
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

---

## 9. Homepage role

The homepage is the primary orientation and trust page.

It must link directly to:

- all three detailed service pages;
- selected experience;
- about/founder;
- contact;
- sectors.

The homepage must not attempt to contain every detail from every page.

---

## 10. Services overview role

The Services page must:

- explain the overall service model;
- compare the three service pillars;
- help visitors choose the relevant detailed page;
- explain engagement formats;
- link to experience and contact.

It must not duplicate all detailed service content.

---

## 11. Detailed service page roles

### 11.1 Owner’s Engineering & AMO

Primary audiences:

- project owners;
- investors;
- developers;
- asset owners;
- international companies requiring owner-side representation.

Primary internal links:

- selected experience;
- sectors;
- contact;
- local partner page.

### 11.2 Electrical & MEP Engineering

Primary audiences:

- engineering firms;
- contractors;
- project owners;
- developers;
- industrial clients.

Primary internal links:

- selected experience;
- sectors;
- contact;
- services overview.

### 11.3 Local Engineering Partner in Morocco

Primary audiences:

- international engineering firms;
- EPC contractors;
- foreign investors;
- equipment suppliers;
- consultants entering Morocco.

Primary internal links:

- about/founder;
- selected experience;
- contact;
- services overview.

This page is expected to become a principal target for international SEO and advertising.

---

## 12. Sectors page role

The Sectors page groups capabilities by client environment, not by internal discipline.

Initial sector groups:

- infrastructure and transport;
- industrial facilities;
- energy and utilities;
- commercial and mixed-use development;
- hospitality;
- logistics and warehouses;
- public and sports facilities.

Each sector must link to:

- relevant services;
- relevant selected experience;
- contact.

Sector claims must be supported by founder experience or clearly described as service capability rather than past experience.

---

## 13. Selected Experience page role

The Experience page must distinguish:

- Salimi Engineering assignments;
- Yunes Salimi’s prior professional experience.

Until the company has its own completed assignments, the page heading should be:

```text
Selected Professional Experience
```

Recommended disclosure:

> The projects presented on this page reflect the professional experience of Yunes Salimi in previous roles unless otherwise stated.

Every project card must include a `relationshipType` field:

```text
founder_prior_experience
company_assignment
partner_assignment
```

This prevents misleading presentation.

---

## 14. About & Founder page role

The page must combine:

- company purpose;
- founder biography;
- international experience;
- delivery model;
- direct responsibility;
- founder message;
- professional values;
- languages, if confirmed;
- contact CTA.

The founder page must not be hidden under a generic corporate biography.

---

## 15. Contact page role

The Contact page must:

- provide a short project enquiry form;
- provide direct contact details when available;
- explain the expected next step;
- avoid requesting confidential documents;
- include privacy consent where required;
- link to relevant privacy information.

---

## 16. Footer information architecture

Recommended footer columns:

### Company

- About
- Selected Experience
- Sectors

### Services

- Owner’s Engineering & AMO
- Electrical & MEP Engineering
- Local Engineering Partner in Morocco

### Contact

- Email
- Telephone
- LinkedIn
- Location

### Legal

- Legal Notice
- Privacy Policy
- Cookie Policy

Footer content must be JSON-driven.

---

## 17. Breadcrumbs

Breadcrumbs are recommended on all pages except Home.

Example:

```text
Home > Services > Local Engineering Partner in Morocco
```

Breadcrumb labels must be localised.

Breadcrumb structured data will be defined in the SEO specification.

---

## 18. Internal linking rules

Every commercial page must contain:

- at least one link to a relevant service page;
- at least one link to Selected Experience or About;
- one clear contact CTA;
- one link back to a higher-level page where applicable.

Avoid generic link text such as `Learn more` when a descriptive label is possible.

Preferred:

```text
Explore Owner’s Engineering Services
View Selected Professional Experience
Discuss a Project in Morocco
```

---

## 19. Future SEO landing pages

Future landing pages must not be added to the main navigation unless they become permanent core pages.

Potential English pages:

```text
/en/engineering-company-morocco
/en/owners-engineer-morocco
/en/electrical-engineering-morocco
/en/mep-engineering-morocco
/en/technical-due-diligence-morocco
/en/construction-project-support-morocco
/en/engineering-consultant-casablanca
/en/engineering-consultant-rabat
/en/engineering-consultant-tangier
```

Potential French pages:

```text
/fr/bureau-etudes-maroc
/fr/assistance-maitrise-ouvrage-maroc
/fr/ingenierie-electrique-maroc
/fr/ingenierie-mep-maroc
/fr/audit-technique-maroc
```

Each future page requires:

- distinct search intent;
- non-duplicated content;
- relevant service connection;
- evidence;
- clear CTA;
- canonical and hreflang handling.

---

## 20. URL rules

- Use lowercase only.
- Use hyphens, not underscores, in public URLs.
- Do not include file extensions.
- Do not include dates in evergreen page URLs.
- Avoid changing public URLs after launch.
- Use permanent redirects for changed URLs.
- Keep tracking parameters out of canonical URLs.
- Use stable page IDs internally even if public URLs change.

---

## 21. Language switching behaviour

When a user switches language:

- route to the equivalent page in the selected language;
- preserve the page identity;
- do not always return to the homepage;
- if a translation is unavailable, show a controlled message or an approved fallback;
- never silently display a different language without indication.

Example:

```text
/en/local-engineering-partner-morocco
→ /fr/partenaire-ingenierie-maroc
```

---

## 22. RTL architecture

Arabic pages must:

- set document direction to `rtl`;
- mirror layout where appropriate;
- retain correct direction for email addresses, phone numbers and Latin technical terms;
- use RTL-aware spacing and icons;
- maintain logical tab and keyboard order;
- be visually tested independently.

---

## 23. Error pages

Required error states:

### 404

Must include:

- clear message;
- language-aware content;
- links to Home, Services and Contact;
- no technical stack details.

### Content unavailable

Used when a page is configured but unpublished.

### Form error

Must preserve entered content where possible.

### Editor error

Must show validation and save errors without exposing secrets.

---

## 24. Indexing rules

Indexable:

- approved public pages;
- approved language variants;
- approved future landing pages.

Non-indexable:

- `/editjson/*`;
- preview routes;
- internal diagnostics;
- draft pages;
- Netlify function endpoints;
- test routes;
- staging environment, unless explicitly required.

---

## 25. Navigation JSON ownership

Recommended global navigation files:

```text
/content/en/navigation.json
/content/fr/navigation.json
/content/ar/navigation.json
```

Recommended stable navigation item IDs:

```json
[
  "home",
  "services",
  "sectors",
  "experience",
  "about",
  "contact"
]
```

Labels and routes may vary by locale, but IDs must remain stable.

---

## 26. Page publication states

Every page JSON should support:

```json
{
  "status": "draft | review | published | archived",
  "indexing": "index | noindex"
}
```

Only `published` pages may be routed publicly in production.

---

## 27. Sitemap acceptance criteria

The architecture is accepted when:

- all 12 first-release page types are represented;
- every page has a stable internal ID;
- all languages map to equivalent page identities;
- editor routes use stable IDs;
- primary navigation remains concise;
- service detail pages are reachable in two interactions or fewer;
- the founder is reachable from the homepage;
- contact is reachable from every commercial page;
- legal pages are present in the footer;
- future landing pages can be added without restructuring the main site.
