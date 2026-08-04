# Salimi Engineering — Content Model and JSON Specification

**Document ID:** SE-WEB-04  
**Version:** 1.0  
**Status:** Approved working specification  
**Target repository path:** `/source_docs/04_content_model_and_json_specification.md`

---

## 1. Purpose

This document defines the JSON-based content architecture for the Salimi Engineering website.

The purpose is to ensure:

- no business content is hardcoded in UI components;
- every page can be edited without changing component source code;
- English, French and Arabic share stable content identities;
- content changes are validated;
- image files are replaceable through paths;
- the JSON editor can render fields predictably;
- the repository remains the source of truth.

---

## 2. Core rules

### 2.1 No hardcoded business text

Components must not contain:

- headings;
- paragraphs;
- navigation labels;
- CTA labels;
- service descriptions;
- legal text;
- contact details;
- user-facing error messages;
- image alt text;
- SEO metadata.

Exceptions:

- technical fallback messages required to prevent application failure;
- developer-only diagnostic strings;
- framework-required accessibility defaults where no content alternative is possible.

Even exceptions should preferably be supplied through global content JSON.

### 2.2 Stable keys

JSON keys are part of the content API.

Keys:

- must use English;
- must use `camelCase`;
- must remain stable;
- must describe purpose, not visual position;
- must not include translated words;
- must not be changed through the editor.

Preferred:

```json
{
  "hero": {
    "title": "",
    "summary": ""
  }
}
```

Avoid:

```json
{
  "blueBoxText": "",
  "leftColumnParagraph": ""
}
```

### 2.3 Stable IDs for repeatable items

Every repeatable entity must have a stable ID.

```json
{
  "id": "service_local_partner",
  "title": "Local Engineering Partner in Morocco"
}
```

IDs must not be translated.

---

## 3. Recommended repository structure

```text
/
├── content/
│   ├── shared/
│   │   ├── company.json
│   │   ├── routes.json
│   │   ├── settings.json
│   │   ├── projects.json
│   │   ├── services.json
│   │   └── sectors.json
│   ├── en/
│   │   ├── global.json
│   │   ├── navigation.json
│   │   ├── home.json
│   │   ├── services.json
│   │   ├── owners_engineering.json
│   │   ├── electrical_mep.json
│   │   ├── local_partner.json
│   │   ├── sectors.json
│   │   ├── experience.json
│   │   ├── about.json
│   │   ├── contact.json
│   │   ├── legal_notice.json
│   │   ├── privacy.json
│   │   └── cookies.json
│   ├── fr/
│   │   └── same page files
│   └── ar/
│       └── same page files
├── schemas/
│   ├── global.schema.json
│   ├── page.schema.json
│   ├── project.schema.json
│   ├── service.schema.json
│   └── sector.schema.json
└── public/
    └── images/
```

---

## 4. Shared versus localised data

### 4.1 Shared data

Use shared JSON for values that must remain identical across languages:

- stable IDs;
- project dates;
- country codes;
- coordinates, if used;
- image paths;
- publish status;
- relationship type;
- technical tags;
- route identity;
- analytics IDs;
- feature flags.

### 4.2 Localised data

Use locale JSON for:

- titles;
- descriptions;
- labels;
- CTA text;
- alt text;
- meta titles;
- meta descriptions;
- legal content;
- founder message;
- service explanations;
- project narrative.

### 4.3 Hybrid entities

Projects, services and sectors may use shared structural data plus locale-specific copy.

Recommended pattern:

```text
/content/shared/projects.json
/content/en/entities/projects.json
/content/fr/entities/projects.json
/content/ar/entities/projects.json
```

An alternative implementation may place all locale content in one file per language, but stable IDs must remain identical.

---

## 5. Locale identifiers

Supported locale codes:

```json
["en", "fr", "ar"]
```

Locale metadata:

```json
{
  "en": {
    "label": "English",
    "shortLabel": "EN",
    "direction": "ltr"
  },
  "fr": {
    "label": "Français",
    "shortLabel": "FR",
    "direction": "ltr"
  },
  "ar": {
    "label": "العربية",
    "shortLabel": "العربية",
    "direction": "rtl"
  }
}
```

---

## 6. Base page model

Every page file should follow a common top-level structure.

```json
{
  "pageId": "home",
  "locale": "en",
  "status": "draft",
  "version": 1,
  "updatedAt": "2026-08-04T00:00:00Z",
  "seo": {},
  "hero": {},
  "sections": [],
  "finalCta": {},
  "editor": {}
}
```

### Required properties

| Property | Type | Required | Notes |
|---|---|---:|---|
| `pageId` | string | yes | Stable page ID |
| `locale` | enum | yes | `en`, `fr`, `ar` |
| `status` | enum | yes | `draft`, `review`, `published`, `archived` |
| `version` | integer | yes | Increment on structural change |
| `seo` | object | yes | Locale-specific metadata |
| `hero` | object | yes | Page hero content |
| `sections` | array | yes | Ordered content blocks |
| `finalCta` | object | no | Final conversion block |
| `editor` | object | yes | Editor field rules |

---

## 7. SEO object

```json
{
  "seo": {
    "metaTitle": "",
    "metaDescription": "",
    "canonicalPath": "/en/",
    "indexing": "noindex",
    "openGraphTitle": "",
    "openGraphDescription": "",
    "openGraphImage": "/images/social/default-og.webp",
    "schemaTypes": ["Organization", "ProfessionalService"]
  }
}
```

Validation:

- `metaTitle`: recommended 30–60 characters;
- `metaDescription`: recommended 120–165 characters;
- `canonicalPath`: must begin with `/`;
- `indexing`: `index` or `noindex`;
- Open Graph image must exist before production publication.

---

## 8. Hero object

```json
{
  "hero": {
    "eyebrow": "",
    "title": "",
    "summary": "",
    "primaryCta": {
      "label": "",
      "href": "/en/contact",
      "analyticsId": "hero_primary_cta"
    },
    "secondaryCta": {
      "label": "",
      "href": "/en/services",
      "analyticsId": "hero_secondary_cta"
    },
    "media": {
      "type": "placeholder",
      "src": "/images/placeholders/hero-engineering.webp",
      "alt": "",
      "placeholderLabel": "HERO — MOROCCO ENGINEERING / INFRASTRUCTURE"
    }
  }
}
```

---

## 9. Section model

Generic section:

```json
{
  "id": "home_service_pillars",
  "type": "cardGrid",
  "enabled": true,
  "eyebrow": "",
  "title": "",
  "summary": "",
  "items": [],
  "settings": {
    "columnsDesktop": 3,
    "columnsTablet": 2,
    "columnsMobile": 1
  }
}
```

Required fields:

- `id`;
- `type`;
- `enabled`;
- content fields relevant to the component.

The component registry must map `type` to an approved component.

Unknown section types must fail validation.

---

## 10. Approved initial section types

```text
richText
cardGrid
serviceCards
projectCards
sectorCards
trustPoints
processSteps
founderIntro
founderMessage
logoStrip
contactMethods
contactForm
faq
callout
stats
timeline
relatedLinks
legalText
```

A section type may not be added without:

- component definition;
- schema update;
- editor support;
- responsive test;
- accessibility test.

---

## 11. Service entity model

Shared structural example:

```json
{
  "id": "service_local_partner",
  "pageId": "local_partner",
  "icon": "map-pin",
  "image": "/images/services/local-partner.webp",
  "status": "draft",
  "sortOrder": 3
}
```

Localised example:

```json
{
  "id": "service_local_partner",
  "title": "Local Engineering Partner in Morocco",
  "shortDescription": "",
  "clientProblem": "",
  "clientOutcome": "",
  "ctaLabel": "Explore Local Project Support",
  "alt": ""
}
```

---

## 12. Project entity model

Shared project record:

```json
{
  "id": "project_001",
  "status": "draft",
  "relationshipType": "founder_prior_experience",
  "countryCode": "MA",
  "city": "",
  "yearStart": null,
  "yearEnd": null,
  "sectorIds": [],
  "serviceIds": [],
  "image": "/images/projects/project-001.webp",
  "imagePermission": "unknown",
  "sortOrder": 1
}
```

Localised project copy:

```json
{
  "id": "project_001",
  "displayTitle": "INFORMATION_NOT_AVAILABLE",
  "clientName": "",
  "confidentialityLabel": "",
  "locationLabel": "",
  "role": "",
  "scopeSummary": "",
  "systems": [],
  "result": "",
  "imageAlt": ""
}
```

### Relationship types

```text
founder_prior_experience
company_assignment
partner_assignment
```

### Image permission values

```text
unknown
approved
restricted
not_applicable
```

Production must not display project images with `unknown` or `restricted` permission.

---

## 13. Sector entity model

```json
{
  "id": "sector_industrial",
  "status": "published",
  "icon": "factory",
  "image": "/images/sectors/industrial.webp",
  "relatedServiceIds": [
    "service_owners_engineering",
    "service_electrical_mep",
    "service_local_partner"
  ],
  "relatedProjectIds": []
}
```

Localised fields:

```json
{
  "id": "sector_industrial",
  "title": "Industrial Facilities",
  "summary": "",
  "typicalNeeds": [],
  "imageAlt": ""
}
```

---

## 14. Company object

File: `/content/shared/company.json`

```json
{
  "brandName": "Salimi Engineering",
  "legalName": "",
  "founder": {
    "personId": "yunes_salimi",
    "displayName": "Yunes Salimi",
    "legalName": "",
    "titleKey": "founder_managing_director",
    "portrait": "/images/founder/yunes-salimi.webp"
  },
  "registeredAddress": "",
  "countryCode": "MA",
  "email": "",
  "phone": "",
  "whatsapp": "",
  "linkedin": "",
  "registrationNumber": "",
  "taxNumber": "",
  "professionalInsurance": "",
  "dataCompleteness": "incomplete"
}
```

Empty values must not be rendered publicly.

---

## 15. Navigation model

```json
{
  "items": [
    {
      "id": "home",
      "label": "Home",
      "href": "/en/",
      "enabled": true
    },
    {
      "id": "services",
      "label": "Services",
      "href": "/en/services",
      "enabled": true,
      "children": [
        {
          "id": "owners_engineering",
          "label": "Owner’s Engineering & AMO",
          "href": "/en/owners-engineering-amo"
        }
      ]
    }
  ],
  "primaryCta": {
    "label": "Discuss a Project",
    "href": "/en/contact"
  }
}
```

---

## 16. Contact form model

Form labels and validation messages must come from JSON.

```json
{
  "form": {
    "id": "project_enquiry",
    "submitLabel": "Send Project Enquiry",
    "successTitle": "",
    "successMessage": "",
    "errorTitle": "",
    "errorMessage": "",
    "fields": [
      {
        "id": "fullName",
        "type": "text",
        "label": "Full name",
        "required": true,
        "maxLength": 120,
        "autocomplete": "name"
      }
    ]
  }
}
```

The editor may change labels and messages but may not change security-critical field IDs without developer action.

---

## 17. Editor metadata

Each page file includes editor guidance.

```json
{
  "editor": {
    "schemaVersion": 1,
    "readOnlyPaths": [
      "pageId",
      "locale",
      "version"
    ],
    "hiddenPaths": [
      "editor"
    ],
    "fieldHelp": {
      "hero.title": "Primary page heading. Keep concise.",
      "seo.metaTitle": "Recommended maximum: 60 characters."
    }
  }
}
```

This metadata may alternatively be stored in schemas to avoid duplication.

---

## 18. Field types in the JSON editor

The editor must support:

- single-line text;
- multiline text;
- rich text limited to approved Markdown;
- boolean;
- integer;
- select;
- URL;
- image path;
- email;
- telephone;
- array of strings;
- repeatable object groups;
- read-only stable ID;
- date;
- status.

The editor must not expose arbitrary executable code.

---

## 19. Rich text rules

Preferred storage:

- plain text for simple copy;
- restricted Markdown for longer content.

Allowed Markdown:

- paragraphs;
- bold;
- italic;
- links;
- unordered lists;
- ordered lists;
- headings below page H1.

Disallowed:

- raw HTML;
- scripts;
- iframes;
- inline event handlers;
- embedded forms;
- arbitrary style attributes.

Rendered rich text must be sanitised.

---

## 20. Image references

Image paths must be absolute from the public root.

Preferred:

```text
/images/founder/yunes-salimi.webp
```

Avoid:

```text
../../public/images/founder/yunes-salimi.webp
```

Every image object should include:

```json
{
  "src": "/images/founder/yunes-salimi.webp",
  "alt": "",
  "width": 1200,
  "height": 1500,
  "focalPoint": {
    "x": 0.5,
    "y": 0.35
  },
  "placeholderLabel": "FOUNDER PORTRAIT — YUNES SALIMI"
}
```

Width and height prevent layout shift.

---

## 21. Missing content behaviour

### Development

Missing required values:

- produce clear validation errors;
- may render labelled placeholders.

### Production

Missing required values:

- block publication or build;
- do not display `undefined`, empty headings or technical keys.

Optional empty values:

- omit the component or field.

Missing translation:

- do not silently mix languages unless explicitly configured;
- show an approved fallback or block publication.

---

## 22. Publication workflow

Recommended page state progression:

```text
draft → review → published → archived
```

Rules:

- `draft`: visible in editor and preview only;
- `review`: visible in preview only;
- `published`: public route allowed;
- `archived`: no public route, historical record retained.

---

## 23. Validation rules

Validation occurs:

1. in the editor before save;
2. in the Netlify Function;
3. during build;
4. in automated tests.

The server-side validation is authoritative.

Examples:

- page ID must match target file;
- locale must match target directory;
- no unknown section types;
- URLs must be valid;
- image paths must begin with `/images/`;
- stable IDs must be unique;
- no duplicate project IDs;
- published pages require metadata;
- title fields cannot be whitespace only;
- editor cannot modify protected paths;
- JSON must contain no executable content.

---

## 24. JSON formatting

- UTF-8 encoding;
- two-space indentation;
- trailing newline;
- no comments inside JSON;
- deterministic key order where practical;
- ISO 8601 dates;
- no trailing commas.

---

## 25. Versioning

Each schema and page includes a version.

```json
{
  "version": 1
}
```

Structural changes require:

- schema version increment;
- migration plan;
- editor compatibility review;
- test update.

Copy changes do not require schema version increment.

---

## 26. Content file naming

Use stable English snake_case file names:

```text
owners_engineering.json
electrical_mep.json
local_partner.json
legal_notice.json
```

Public routes may be localised separately.

---

## 27. Hardcode audit

The implementation must include an automated or manual audit for visible text inside:

- `.tsx`;
- `.jsx`;
- `.vue`;
- templates;
- route files;
- components.

Allowed exceptions must be listed explicitly.

A component must be rejected if business copy is embedded directly.

---

## 28. Example home JSON skeleton

```json
{
  "pageId": "home",
  "locale": "en",
  "status": "draft",
  "version": 1,
  "updatedAt": "2026-08-04T00:00:00Z",
  "seo": {
    "metaTitle": "Salimi Engineering | Engineering Support in Morocco",
    "metaDescription": "Founder-led engineering, owner’s representation and local project delivery support for international and Moroccan clients.",
    "canonicalPath": "/en/",
    "indexing": "noindex",
    "openGraphTitle": "Salimi Engineering",
    "openGraphDescription": "International engineering experience. Local project delivery in Morocco.",
    "openGraphImage": "/images/social/default-og.webp",
    "schemaTypes": ["Organization", "ProfessionalService"]
  },
  "hero": {
    "eyebrow": "Salimi Engineering",
    "title": "Engineering and Project Delivery Support in Morocco",
    "summary": "Salimi Engineering supports international and local clients with engineering coordination, owner’s representation and local project delivery in Morocco.",
    "primaryCta": {
      "label": "Discuss a Project",
      "href": "/en/contact",
      "analyticsId": "hero_primary_cta"
    },
    "secondaryCta": {
      "label": "Explore Our Services",
      "href": "/en/services",
      "analyticsId": "hero_secondary_cta"
    },
    "media": {
      "type": "placeholder",
      "src": "/images/placeholders/hero-engineering.webp",
      "alt": "Engineering and infrastructure project support in Morocco",
      "placeholderLabel": "HERO — MOROCCO ENGINEERING / INFRASTRUCTURE"
    }
  },
  "sections": [],
  "finalCta": {
    "title": "Planning or delivering a project in Morocco?",
    "summary": "Discuss your technical, engineering or local delivery requirements directly with Yunes Salimi.",
    "primaryCta": {
      "label": "Discuss a Project",
      "href": "/en/contact"
    }
  },
  "editor": {
    "schemaVersion": 1,
    "readOnlyPaths": ["pageId", "locale", "version"]
  }
}
```

---

## 29. Acceptance criteria

The content model is accepted when:

- all visible business content can be changed without component edits;
- all pages have stable IDs;
- all repeatable items have stable IDs;
- all three locales use equivalent structures;
- Arabic direction metadata is supported;
- images are referenced only through JSON;
- missing required content prevents unsafe publication;
- editor fields can be generated from schema;
- protected keys cannot be changed in the editor;
- server-side validation exists;
- every accepted edit creates a traceable Git change.
