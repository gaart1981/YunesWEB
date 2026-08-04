# Salimi Engineering — Media and Asset Specification

**Document ID:** SE-WEB-10  
**Version:** 1.0  
**Status:** Implementation specification  
**Target repository path:** `/source_docs/10_media_and_asset_specification.md`

---

## 1. Purpose

This document defines how all visual assets are named, stored, prepared, referenced and replaced.

The objective is to ensure that:

- initial placeholders preserve the final premium layout;
- real images can later be inserted without component changes;
- all media remains organised in one predictable location;
- image rights and factual relevance are controlled;
- page speed and accessibility remain acceptable;
- Claude does not scatter images across source folders;
- multilingual alt text remains in JSON rather than image files or components.

---

## 2. Root asset location

All public visual assets must be placed under:

```text
/public/images
```

Do not use:

```text
/public/pictures
/public/photo
/src/assets/images
/components/images
```

The single public root provides predictable replacement paths and direct mapping from JSON.

---

## 3. Required folder structure

```text
/public/images/
├── brand/
│   ├── wordmark/
│   ├── symbol/
│   ├── favicon/
│   └── social/
├── founder/
├── projects/
│   ├── project-001/
│   ├── project-002/
│   └── ...
├── services/
│   ├── owners-engineering/
│   ├── electrical-mep/
│   └── local-partner/
├── sectors/
│   ├── infrastructure-transport/
│   ├── industrial/
│   ├── energy-utilities/
│   ├── commercial/
│   ├── hospitality/
│   ├── logistics/
│   └── public-sports/
├── backgrounds/
├── diagrams/
├── icons/
├── placeholders/
└── documents/
```

`documents` is reserved for visual thumbnails or preview images of future downloadable PDFs. Actual downloadable documents should use a separate `/public/documents` folder if introduced.

---

## 4. Naming convention

### 4.1 General rules

Use:

- lowercase;
- Latin characters;
- hyphens;
- descriptive names;
- stable project IDs;
- version suffix only when necessary.

Do not use:

- spaces;
- accents;
- Cyrillic or Arabic filenames;
- camera names such as `IMG_9284`;
- words such as `final-final`;
- client-confidential names in public filenames.

### 4.2 Examples

Approved:

```text
yunes-salimi-portrait-01.webp
yunes-salimi-site-review-01.webp
project-001-electrical-room-01.webp
project-001-overview-01.webp
service-local-partner-site-coordination.webp
sector-industrial-facility-01.webp
default-og-1200x630.webp
```

Rejected:

```text
IMG_20260804.jpg
Photo Younes Final.JPG
Big Project Client Name.jpg
header2-final-new.png
```

---

## 5. File formats

### 5.1 Photographs

Preferred source delivery:

- high-quality JPEG or TIFF master retained outside the repository;
- website derivative in AVIF and/or WebP;
- JPEG fallback only if required.

Repository preference:

```text
.webp
```

The framework or build platform may generate optimised variants.

### 5.2 Logos and technical line icons

Preferred:

```text
.svg
```

Rules:

- clean viewBox;
- no embedded raster image;
- no scripts;
- no external font reference;
- no hidden metadata containing confidential information;
- current colour or controlled fills where appropriate.

### 5.3 Diagrams

Use:

- SVG for simple vector diagrams;
- WebP for complex raster technical views;
- accessible textual explanation in page content.

### 5.4 Prohibited formats

Do not publish:

- PSD;
- AI;
- EPS;
- TIFF;
- unoptimised multi-megabyte PNG photographs;
- animated GIF;
- SVG with scripts;
- unknown binary formats.

---

## 6. Image size standards

### 6.1 Founder portrait

| Property | Requirement |
|---|---|
| Aspect ratio | 4:5 |
| Master crop | minimum 1600 × 2000 px |
| Display derivative | 960 × 1200 px minimum |
| Preferred format | WebP |
| Focal point | eyes near upper third |
| File | `/images/founder/yunes-salimi-portrait-01.webp` |

### 6.2 Homepage hero

| Property | Requirement |
|---|---|
| Aspect ratio | 16:10 or 3:2 depending approved layout |
| Master | minimum 2400 px wide |
| Display | responsive |
| File | `/images/backgrounds/home-hero-engineering-01.webp` |

The hero must not depend on a panoramic image too shallow to work on mobile.

### 6.3 Project cards

| Property | Requirement |
|---|---|
| Aspect ratio | 16:10 |
| Master | minimum 1800 × 1125 px |
| Card derivative | minimum 960 × 600 px |

### 6.4 Sector cards

| Property | Requirement |
|---|---|
| Aspect ratio | 4:3 |
| Master | minimum 1600 × 1200 px |

### 6.5 Service editorial media

| Property | Requirement |
|---|---|
| Aspect ratio | 3:2 or 4:3 |
| Master | minimum 1800 px wide |

### 6.6 Open Graph

```text
1200 × 630 px
```

Safe zone:

- critical text/logo within central 1000 × 500 px;
- minimal text;
- brand name and page category only.

### 6.7 Favicon and application icons

Required set:

- favicon.ico;
- 32 × 32 PNG;
- 180 × 180 Apple touch icon;
- 192 × 192 and 512 × 512 manifest icons;
- SVG favicon where supported.

---

## 7. File weight targets

Target compressed weights:

| Asset type | Target |
|---|---:|
| Hero image | ≤ 300 KB preferred |
| Project/sector image | ≤ 180 KB preferred |
| Founder portrait | ≤ 220 KB preferred |
| Card thumbnail | ≤ 120 KB preferred |
| SVG icon | ≤ 20 KB |
| OG image | ≤ 250 KB |

These are targets, not absolute limits. Visual damage from overcompression is not acceptable. The build must still flag unusually large assets.

---

## 8. Responsive image requirements

Every meaningful image component must provide:

- intrinsic width;
- intrinsic height;
- responsive sizes;
- suitable loading priority;
- correct crop;
- focal point where required;
- alt text from locale JSON.

Example conceptual configuration:

```json
{
  "src": "/images/founder/yunes-salimi-portrait-01.webp",
  "alt": "Yunes Salimi, founder of Salimi Engineering",
  "width": 960,
  "height": 1200,
  "focalPoint": {
    "x": 0.5,
    "y": 0.32
  }
}
```

---

## 9. Placeholder asset system

### 9.1 Purpose

The first-release development phase uses placeholders instead of invented or unrelated photographs.

Placeholders must:

- preserve final aspect ratio;
- provide the expected filename;
- appear intentionally designed;
- allow visual QA before final photography;
- avoid suggesting that an artificial image is a real project.

### 9.2 Placeholder files

Required initial placeholders:

```text
/public/images/placeholders/
├── founder-portrait-4x5.svg
├── hero-engineering-16x10.svg
├── project-image-16x10.svg
├── sector-image-4x3.svg
├── service-image-3x2.svg
├── og-image-1200x630.svg
└── logo-mark-square.svg
```

### 9.3 Placeholder appearance

Required visual language:

- Porcelain or Deep Slate base;
- thin engineering datum/grid;
- stable label;
- expected file path;
- aspect-ratio label;
- one Dark Copper accent line;
- no fake image noise;
- no AI-generated site scene.

### 9.4 Placeholder content

Example:

```text
FOUNDER PORTRAIT
Replace with:
/public/images/founder/yunes-salimi-portrait-01.webp
Required ratio: 4:5
```

For public production launch, placeholders may remain only where intentionally approved. Project placeholders must not be misread as project evidence.

---

## 10. JSON media object

Recommended object:

```json
{
  "type": "image",
  "src": "/images/projects/project-001/project-001-overview-01.webp",
  "alt": "REQUIRES_TRANSLATION",
  "width": 1800,
  "height": 1125,
  "focalPoint": {
    "x": 0.5,
    "y": 0.5
  },
  "caption": "",
  "credit": "",
  "permissionStatus": "unknown",
  "placeholderSrc": "/images/placeholders/project-image-16x10.svg"
}
```

Allowed `permissionStatus`:

```text
unknown
approved
restricted
expired
not_required
```

Production rule:

- `approved` or `not_required`: may display;
- `unknown`, `restricted`, `expired`: use approved placeholder or omit.

---

## 11. Alt text rules

Alt text is locale-specific and stored in page/entity JSON.

### 11.1 Informative images

Describe the relevant visible content and context.

Good:

> Yunes Salimi reviewing engineering documents during a project meeting.

Bad:

> image123

Bad:

> Professional experienced leading international world-class engineer.

### 11.2 Decorative images

Use empty alt:

```text
alt=""
```

The implementation must not announce decorative technical grid motifs.

### 11.3 Project photographs

Alt text must not claim:

- ownership;
- completion;
- scale;
- client identity;
- exact equipment;

unless visible and verified.

### 11.4 Logos

Use the organisation name as alt text when the logo conveys identity.

---

## 12. Captions and credits

Use captions when they add factual context.

Project caption template:

```text
[Project type], [location]. Yunes Salimi’s role: [verified role].
```

Credit fields:

- photographer;
- employer/client permission note;
- source;
- licence.

Credits may be visually hidden from card view but retained in project detail or legal asset register.

---

## 13. Image rights register

Create and maintain:

```text
/content/shared/media-rights.json
```

Suggested fields:

```json
{
  "assetId": "project_001_overview_01",
  "path": "/images/projects/project-001/project-001-overview-01.webp",
  "owner": "",
  "source": "",
  "permissionStatus": "unknown",
  "permissionDate": "",
  "expiryDate": "",
  "permittedUses": [],
  "evidenceReference": "",
  "notes": ""
}
```

No client or former-employer asset may be published without a checked status.

---

## 14. Founder photo production brief

Required shots:

1. principal portrait, 4:5;
2. wider environmental portrait, 3:2;
3. seated or standing technical discussion;
4. site inspection, only on a real authorised site;
5. close-up detail reviewing plans, optional.

Wardrobe:

- navy, charcoal, stone or white;
- no visible brand logos;
- no overly formal black tie;
- clean professional appearance.

Lighting:

- natural or soft controlled;
- no harsh flash;
- accurate skin tone;
- background separation without artificial blur.

Expression:

- calm;
- attentive;
- confident;
- not theatrical.

---

## 15. Project photography selection

For each project, aim for:

- one contextual exterior or overview;
- one technical systems image;
- one detail or process image;
- one drawing/diagram where publishable.

Selection priority:

1. directly relevant to Yunes’s responsibility;
2. permission confirmed;
3. technically credible;
4. compositionally strong;
5. visually consistent.

Do not select a beautiful image if it creates a false impression of responsibility.

---

## 16. Stock photography policy

Stock photography should be avoided for trust-critical sections.

Permitted limited uses:

- neutral abstract infrastructure detail;
- general sector background where clearly illustrative;
- licensed geographic context.

Prohibited uses:

- fake founder/team;
- fake client meeting;
- generic hard-hat group;
- unrelated stadium presented near experience;
- fake Moroccan project;
- imagery implying proprietary engineering work.

All stock images require:

- licence evidence;
- source record;
- no recognisable false attribution.

---

## 17. AI-generated imagery policy

AI-generated images must not be used as:

- project evidence;
- founder portrait;
- team photography;
- client asset;
- factual facility image.

Potentially acceptable:

- clearly abstract decorative texture;
- non-factual conceptual background;
- internally labelled placeholder.

Public use requires explicit approval and must not mislead.

---

## 18. Icon assets

Preferred:

- selected Lucide icons rendered through React;
- no loose copies unless required;
- local wrapper maps stable icon IDs.

Stable IDs:

```text
briefcase-business
building-2
factory
hard-hat
map-pin
route
ruler
shield-check
workflow
zap
```

Final selection must be restrained. Similar concepts must not use visually inconsistent icons.

---

## 19. Diagrams and line motifs

The brand may use:

- coordinate lines;
- plan grid;
- connection paths;
- structural nodes;
- dimension lines;
- simplified system diagrams.

Rules:

- lines must support meaning or composition;
- no fake engineering calculations;
- no meaningless technical numbers;
- opacity generally below 18% when decorative;
- decorative SVG must be hidden from assistive technology.

---

## 20. Social preview system

Required default assets:

```text
/images/brand/social/default-og-1200x630.webp
/images/brand/social/home-og-1200x630.webp
/images/brand/social/services-og-1200x630.webp
/images/brand/social/about-og-1200x630.webp
```

Design:

- Ink Navy;
- wordmark;
- page title;
- subtle technical grid;
- Warm Sand or Dark Copper detail;
- no dense paragraph;
- safe cropping.

Page-specific OG generation may be added later.

---

## 21. Media validation script

Required script:

```text
scripts/validate-media.ts
```

Checks:

- referenced path exists;
- extension allowed;
- filename compliant;
- width and height present in JSON;
- aspect ratio close to declared ratio;
- file size within warning threshold;
- published project image permission valid;
- alt field exists for informative image;
- no confidential filename pattern;
- no duplicate path with conflicting metadata.

Build-blocking errors:

- missing required hero/founder production image after placeholder prohibition;
- invalid path traversal;
- prohibited extension;
- published restricted image;
- SVG with script;
- missing meaningful alt text where required.

Warnings:

- oversized file;
- unusual crop;
- missing caption;
- placeholder still active.

---

## 22. Replacement workflow

To replace a placeholder:

1. prepare the final asset to required ratio;
2. confirm rights;
3. name file according to convention;
4. place it in the required `/public/images` folder;
5. update JSON `src`, dimensions, alt and permission status;
6. run media validation;
7. review desktop/mobile crop;
8. review English/French/Arabic alt text;
9. commit and deploy preview;
10. approve production.

A component source-code edit must not be necessary.

---

## 23. Repository policy

Commit:

- website derivatives;
- approved logos;
- placeholders;
- optimised SVG;
- lightweight diagrams.

Do not commit:

- RAW camera files;
- PSD;
- full-resolution TIFF;
- confidential drawings;
- rights contracts;
- personal identity documents;
- redundant exports;
- unapproved client assets.

Large masters should be stored separately in a controlled archive.

---

## 24. Acceptance criteria

The media system is accepted when:

- every visual asset is under `/public/images`;
- placeholders preserve final ratios;
- real images can be replaced through files and JSON;
- filenames are predictable;
- project rights are recorded;
- restricted images cannot publish;
- alt text is localised;
- hero and founder images remain sharp on large screens;
- mobile crops are controlled;
- the first site version remains visually intentional without real photography;
- no fake visual evidence is used.
