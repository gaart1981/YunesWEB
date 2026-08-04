# Salimi Engineering — SEO Specification

**Document ID:** SE-WEB-12  
**Version:** 1.0  
**Status:** Implementation specification  
**Target repository path:** `/source_docs/12_seo_specification.md`  
**Review date:** 2026-08-04

---

## 1. Purpose

This document defines the technical, multilingual, content and measurement requirements for organic search visibility.

It is designed for a founder-led engineering and project advisory company based in Morocco and primarily targeting:

- international companies operating or planning projects in Morocco;
- investors and project owners;
- engineering consultancies;
- EPC contractors;
- developers;
- industrial companies;
- selected Moroccan clients.

SEO does not guarantee rankings, enquiries or revenue. The website must first provide accurate, useful and credible information. Search optimisation supports discovery; it does not replace business development, partnerships, outreach or references.

---

## 2. SEO objectives

### 2.1 Primary objectives

1. Establish the branded entity `Salimi Engineering`.
2. Make the website discoverable for international engineering support in Morocco.
3. Create qualified traffic to the three core service families.
4. make Yunes Salimi’s verified experience understandable.
5. support future Google Ads landing pages.
6. make all three language versions crawlable and correctly related.
7. avoid duplicate, misleading or thin content.
8. provide clean technical signals for Google and other search engines.

### 2.2 Secondary objectives

- support branded searches after LinkedIn, email and networking contact;
- earn visibility for local-partner and owner-side engineering queries;
- support regional searches after a real operating location is confirmed;
- provide credible pages that can be shared internally by decision-makers;
- create a foundation for future project case studies and technical insights.

### 2.3 Non-objectives

The first release is not intended to:

- rank nationally for every engineering term;
- create hundreds of city pages;
- publish generic AI-generated articles;
- compete through keyword repetition;
- create false local offices;
- imitate a large bureau d’études;
- target World Cup searches without directly relevant services and evidence;
- publish news merely to increase page count.

---

## 3. SEO principles

1. **Accuracy before optimisation.**
2. **One clear search intent per primary page.**
3. **Separate URLs for each language.**
4. **Equivalent pages linked with `hreflang`.**
5. **Self-referencing canonical URL for each genuine language version.**
6. **Public content rendered in HTML, not dependent on client-side loading.**
7. **Structured data must match visible content.**
8. **No claim or keyword may be added only for search engines.**
9. **Mobile content must be complete because indexing is mobile-first.**
10. **Search performance is measured in Search Console and analytics, not inferred from position-checking alone.**

---

## 4. Search audience and intent model

### 4.1 International company intent

Typical needs:

- engineering partner in Morocco;
- local technical representative;
- owner’s engineer;
- project delivery support;
- site surveys;
- engineering subcontracting;
- design coordination;
- MEP or electrical support;
- contractor assessment;
- commissioning support.

Commercial intent is high when the query combines:

- service;
- Morocco;
- project phase;
- location;
- industry.

### 4.2 Moroccan and Francophone intent

Typical French terms to validate:

- bureau d’études Maroc;
- assistance à maîtrise d’ouvrage Maroc;
- AMO technique Maroc;
- ingénierie électrique Maroc;
- ingénierie MEP Maroc;
- partenaire ingénierie Maroc;
- représentation technique maître d’ouvrage;
- suivi technique chantier Maroc;
- audit technique bâtiment Maroc.

### 4.3 Arabic intent

Arabic query research must be performed by a qualified Arabic-speaking reviewer. Literal translation of English keywords is not sufficient.

The Arabic site should initially support:

- branded discovery;
- company verification;
- service comprehension;
- local trust.

It should not be assigned large search-volume assumptions without research.

---

## 5. Initial keyword hypothesis map

This map is a strategic hypothesis, not verified search-volume data. It must be tested using Google Ads Keyword Planner, Search Console after launch, relevant market tools and actual enquiries.

| Page ID | Primary English intent | Supporting English terms | Primary French intent | Supporting French terms |
|---|---|---|---|---|
| `home` | engineering company Morocco | engineering consultancy Morocco, project engineering Morocco | société d’ingénierie Maroc | bureau d’études Maroc, conseil ingénierie Maroc |
| `services` | engineering services Morocco | project advisory Morocco | services d’ingénierie Maroc | conseil technique Maroc |
| `owners_engineering` | owner’s engineer Morocco | owner representative Morocco, project technical advisor Morocco | assistance maîtrise d’ouvrage Maroc | AMO technique Maroc, représentant technique maître d’ouvrage |
| `electrical_mep` | electrical engineering Morocco | MEP engineering Morocco, electrical design Morocco | ingénierie électrique Maroc | ingénierie MEP Maroc, études électriques Maroc |
| `local_partner` | local engineering partner Morocco | engineering representative Morocco, local project support Morocco | partenaire ingénierie Maroc | représentation technique Maroc |
| `sectors` | engineering support Morocco sectors | industrial engineering support Morocco | ingénierie secteurs Maroc | ingénierie industrielle Maroc |
| `experience` | Yunes Salimi engineering experience | Salimi Engineering projects | expérience Yunes Salimi | références Salimi Engineering |
| `about` | Salimi Engineering Morocco | Yunes Salimi engineer | Salimi Engineering Maroc | Yunes Salimi ingénieur |
| `contact` | engineering project contact Morocco | discuss engineering project Morocco | contact ingénierie Maroc | demande étude ingénierie Maroc |

Do not force exact-match phrases into every heading. Use natural, client-relevant language.

---

## 6. Page search-intent rules

Each page must define in JSON:

```json
{
  "seo": {
    "primaryIntent": "",
    "primaryKeyword": "",
    "supportingKeywords": [],
    "audience": [],
    "funnelStage": "awareness | consideration | enquiry"
  }
}
```

These fields are internal guidance. They do not all need to render publicly.

A page must not target multiple unrelated services.

Example:

- `local_partner` may target local engineering support.
- It should not simultaneously target electrical contractor, architecture studio, stadium construction and solar installer.

---

## 7. Multilingual URL architecture

Required:

```text
/en/
/fr/
/ar/
```

Each language version must have a unique URL.

Do not serve different languages from one URL based only on:

- browser language;
- cookies;
- IP;
- JavaScript state.

Google recommends separate URLs for language versions and supports `hreflang` annotations to relate equivalent pages.

---

## 8. `hreflang`

### 8.1 Required implementation

Each equivalent page must reference:

- itself;
- English version;
- French version;
- Arabic version;
- optional `x-default`.

Example:

```html
<link rel="alternate" hreflang="en" href="https://salimiengineering.com/en/services" />
<link rel="alternate" hreflang="fr" href="https://salimiengineering.com/fr/services" />
<link rel="alternate" hreflang="ar" href="https://salimiengineering.com/ar/services" />
<link rel="alternate" hreflang="x-default" href="https://salimiengineering.com/en/services" />
```

### 8.2 Rules

- URLs must be absolute.
- Every referenced page must reciprocate.
- Language codes must be valid.
- Do not use `ma` as a language code.
- Do not use country variants unless content genuinely differs by country.
- `ar` is adequate initially.
- `fr` and `en` are adequate initially.
- The equivalent page identity is resolved through the central route map.
- Draft or unavailable translations must not appear in the `hreflang` cluster.

### 8.3 Sitemap alternative

Language alternates may also be represented in XML sitemap entries. HTML metadata remains recommended for clarity and testability.

---

## 9. Canonical URLs

Every indexable page uses a self-referencing canonical URL.

English page:

```html
<link rel="canonical" href="https://salimiengineering.com/en/local-engineering-partner-morocco" />
```

French equivalent has its own French canonical.

Do not canonicalise all translated pages to English. Translations are separate legitimate pages.

Canonical rules:

- production HTTPS only;
- preferred host only;
- no UTM parameters;
- no trailing-slash inconsistency;
- no editor routes;
- no preview domain;
- no Netlify subdomain;
- no fragment;
- match route map.

---

## 10. Root-domain behaviour

Recommended:

```text
https://salimiengineering.com/
→ 302 or 307 language-selection/default redirect to /en/
```

After business review, a permanent redirect may be used if English is definitively the default.

Do not create search-indexable duplicate homepage content at both `/` and `/en/`.

The `www` variant must permanently redirect to the selected canonical host, or the reverse. Use one consistently.

---

## 11. Metadata requirements

Every indexable page requires:

- unique meta title;
- unique meta description;
- canonical URL;
- robots directive;
- Open Graph title;
- Open Graph description;
- Open Graph image;
- Open Graph locale;
- alternates;
- one H1.

### 11.1 Title guidance

Recommended:

- approximately 30–60 characters;
- brand near the end unless the page is branded;
- primary service and Morocco where natural;
- no repeated boilerplate.

Examples:

```text
Engineering Support in Morocco | Salimi Engineering
Owner’s Engineering & AMO Morocco | Salimi Engineering
Local Engineering Partner Morocco | Salimi Engineering
```

These are drafts and must be checked for actual length and content.

### 11.2 Description guidance

Recommended:

- approximately 120–165 characters;
- describe service and audience;
- do not promise rank or response time;
- avoid duplication.

Example:

> Founder-led engineering coordination, owner’s representation and local project delivery support for international and Moroccan clients.

### 11.3 Metadata JSON

```json
{
  "metaTitle": "",
  "metaDescription": "",
  "canonicalPath": "",
  "indexing": "index",
  "openGraphTitle": "",
  "openGraphDescription": "",
  "openGraphImage": "/images/brand/social/default-og-1200x630.webp",
  "openGraphLocale": "en_US"
}
```

Suggested locales:

- English: `en_US` or a chosen international English convention;
- French: `fr_FR`;
- Arabic: `ar_MA` if technically supported and appropriate.

Visible content remains more important than metadata alone.

---

## 12. Heading rules

- one H1;
- H2 for principal sections;
- H3 for subdivisions;
- no skipped hierarchy for styling;
- headings describe content;
- no keyword-stuffed headings;
- page H1 must correspond to search intent and user expectation.

Example:

```text
H1: Your Local Engineering Partner in Morocco
H2: Local Technical Support for International Project Teams
H2: Services Across the Project Lifecycle
H2: How Salimi Engineering Works
H2: Selected Professional Experience
```

---

## 13. Content quality rules

Content must demonstrate:

- who performs the work;
- what is delivered;
- who the service is for;
- project stage;
- geographical context;
- working method;
- limitations;
- evidence;
- contact path.

Avoid:

- generic definitions copied from the internet;
- pages created only by changing a city name;
- repeated service descriptions;
- hidden keywords;
- exaggerated World Cup references;
- AI-generated filler;
- unsupported market statistics;
- invented frequently asked questions;
- claims that the company has experience merely because Morocco invests in a sector.

---

## 14. Founder and experience SEO

### 14.1 Founder identity

Use the same verified spelling everywhere:

- website;
- title tags;
- JSON-LD;
- LinkedIn;
- Google Business Profile;
- proposals;
- company registration.

Until passport spelling is confirmed, the public identity remains subject to verification.

### 14.2 Experience disclosure

The Experience page must distinguish:

- founder’s prior professional projects;
- Salimi Engineering company assignments;
- partner assignments.

Search snippets must not imply that the new company delivered all founder projects.

Recommended visible disclosure:

> Unless otherwise stated, the projects shown reflect Yunes Salimi’s professional experience in previous engineering roles.

---

## 15. Structured data strategy

Use JSON-LD.

Structured data must match visible page content. It must not contain hidden claims.

### 15.1 Home page

Recommended types:

- `Organization`;
- `ProfessionalService`, where applicable;
- `WebSite`.

### 15.2 About page

Recommended:

- `Person` for Yunes Salimi;
- relationship to organisation through `founder` or `employee` as applicable.

### 15.3 Service pages

Possible:

- `Service`;
- provider references the organisation;
- area served only when verified.

### 15.4 Breadcrumbs

Use:

- `BreadcrumbList`.

### 15.5 Contact/local presence

Use `LocalBusiness` or a suitable subtype only after:

- real address confirmed;
- business is legally operating;
- public contact and location are correct.

Do not add fake opening hours or a virtual office as operational premises.

### 15.6 FAQ

FAQ structured data should only be used if:

- genuine visible questions and answers exist;
- it remains supported and relevant;
- content is not created merely for markup.

Rich-result display is never guaranteed.

---

## 16. Organisation JSON-LD minimum

Example structure:

```json
{
  "@context": "https://schema.org",
  "@type": ["Organization", "ProfessionalService"],
  "@id": "https://salimiengineering.com/#organization",
  "name": "Salimi Engineering",
  "url": "https://salimiengineering.com/",
  "logo": "https://salimiengineering.com/images/brand/wordmark/salimi-engineering-logo.svg",
  "founder": {
    "@id": "https://salimiengineering.com/#yunes-salimi"
  },
  "areaServed": {
    "@type": "Country",
    "name": "Morocco"
  }
}
```

Do not include:

- unavailable address;
- unverified founding date;
- unverified number of employees;
- unverified awards;
- fake reviews;
- unsupported `sameAs` links.

---

## 17. Person JSON-LD minimum

```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": "https://salimiengineering.com/#yunes-salimi",
  "name": "Yunes Salimi",
  "jobTitle": "Founder",
  "worksFor": {
    "@id": "https://salimiengineering.com/#organization"
  },
  "url": "https://salimiengineering.com/en/about"
}
```

Add:

- alumni;
- credentials;
- languages;
- sameAs;
- exact title;

only after verification.

---

## 18. `robots.txt`

### 18.1 Objectives

Allow public content crawling and exclude non-public operational routes.

Example:

```text
User-agent: *
Allow: /
Disallow: /editjson/
Disallow: /api/
Disallow: /.netlify/
Disallow: /preview/

Sitemap: https://salimiengineering.com/sitemap.xml
```

### 18.2 Important distinction

`robots.txt` controls crawl access. It is not a reliable mechanism for removing a public URL from search results.

For non-indexable but publicly reachable pages such as the editor shell:

- allow the crawler to access the page if it must read `noindex`;
- or protect the route;
- apply `noindex, nofollow`;
- avoid linking publicly.

Implementation must be tested because blocking `/editjson/` in robots and relying only on `noindex` can prevent the crawler from seeing the directive.

Preferred for editor:

- no public navigation links;
- `X-Robots-Tag: noindex, nofollow, noarchive`;
- optional password protection for non-public content;
- robots policy aligned with this behaviour.

---

## 19. XML sitemap

Generate automatically from:

- published page state;
- route map;
- language availability.

Include:

- canonical public pages;
- language alternatives;
- accurate `lastmod` only when content meaningfully changes.

Exclude:

- editor routes;
- draft pages;
- API routes;
- preview deployments;
- test pages;
- redirects;
- non-canonical URLs;
- legal pages marked noindex.

Sitemap submission is a discovery hint, not a guarantee of indexing.

---

## 20. `noindex` policy

Apply `noindex` to:

- editor routes;
- previews;
- draft pages;
- test routes;
- internal status pages;
- duplicate campaign variants where canonical strategy requires it.

Do not:

- block a page in robots while expecting a crawler to read its `noindex`;
- use `noindex` on production pages accidentally through inherited staging settings.

Production build must include an automated noindex audit.

---

## 21. Internal linking

Every commercial page should link to:

- one relevant higher-level page;
- one related service;
- Experience or About;
- Contact.

Anchor text should be descriptive.

Examples:

- `View selected professional experience`
- `Explore owner’s engineering support`
- `Discuss local project support in Morocco`

Avoid excessive exact-match repeated anchors.

---

## 22. Image SEO

Requirements:

- descriptive filename;
- real HTML image;
- localised alt text;
- correct dimensions;
- nearby explanatory copy;
- no image-only evidence;
- image sitemap only if later needed;
- project rights verified.

Do not optimise unrelated stock images as if they represented Salimi Engineering work.

---

## 23. Performance and page experience

SEO implementation must support good user experience.

Target field thresholds at the 75th percentile:

- LCP: 2.5 seconds or less;
- INP: 200 milliseconds or less;
- CLS: 0.1 or less.

These are quality targets, not ranking guarantees.

Implementation priorities:

- server-rendered/static text;
- optimised images;
- limited JavaScript;
- no autoplay media;
- font optimisation;
- stable image dimensions;
- no intrusive interstitial;
- consent UI that does not obscure primary content unnecessarily.

---

## 24. Mobile-first requirements

Google primarily indexes mobile content.

Therefore:

- mobile must contain the same core text and links;
- no experience evidence may be desktop-only;
- structured data must be equivalent;
- alt text and metadata remain complete;
- mobile menu must expose all primary pages;
- lazy loading must not prevent indexing;
- language selector remains reachable.

---

## 25. Future content strategy

Recommended content types after core pages are complete:

1. verified project case studies;
2. technical service explainers;
3. Morocco market-entry engineering guides;
4. owner-side project checklists;
5. engineering coordination articles;
6. commissioning and tender-support insights;
7. founder commentary based on actual experience.

Do not publish on a fixed schedule merely to create volume.

A future article requires:

- defined audience;
- business relevance;
- original expertise;
- verified claims;
- internal links;
- named reviewer;
- update date.

---

## 26. Future landing-page governance

Each future landing page requires a content brief.

Required fields:

- target query;
- target audience;
- service;
- distinct value;
- evidence;
- conversion path;
- geographical truth;
- duplication check;
- index/noindex decision.

Reject:

- dozens of near-identical city pages;
- location pages without presence or service evidence;
- World Cup pages not connected to actual service capability;
- pages created only for ad keywords with no useful content.

---

## 27. Google Ads landing-page compatibility

SEO and advertising may share content, but the intent may differ.

Advertising landing page requirements:

- exact service-message alignment;
- one primary CTA;
- fast mobile load;
- clear founder/company identity;
- privacy-compliant conversion tracking;
- no hidden navigation if trust requires access to main pages;
- unique canonical decision;
- organic indexing only when the page has standalone value.

---

## 28. Local visibility

After legal setup and real business contact details are confirmed:

- create or claim Google Business Profile if eligible;
- use exact legal and public business details;
- select accurate categories;
- use real address/service-area configuration;
- add real business photographs;
- avoid keyword stuffing in business name;
- keep contact and website data consistent.

No local listing should be created using a false address.

---

## 29. Search Console setup

Required:

1. verify domain property;
2. submit sitemap;
3. inspect key language URLs;
4. monitor indexing;
5. monitor Core Web Vitals;
6. monitor security/manual-action reports;
7. review query and page performance;
8. validate redirects and canonical selection;
9. monitor structured data where reported.

Recommended review cadence:

- weekly during first two months;
- monthly after stability;
- immediately after major migration or route change.

---

## 30. Measurement framework

Primary SEO KPIs:

- indexed canonical pages;
- impressions by language;
- branded impressions;
- non-branded service impressions;
- clicks;
- click-through rate;
- qualified enquiry conversions;
- landing pages generating enquiries;
- country of traffic;
- referral and organic source quality.

Do not treat average position alone as business success.

---

## 31. SEO content validation

Build must fail for published pages when:

- meta title missing;
- meta description missing;
- canonical missing or mismatched;
- duplicate page ID;
- invalid locale;
- H1 absent from page model;
- prohibited placeholder token appears;
- non-indexable environment generates `index`;
- alternate language route points to draft;
- structured data contains unverified required fields;
- public page accidentally links to editor.

Warnings:

- duplicate descriptions;
- title outside recommendation;
- no internal service link;
- no evidence link;
- missing optional OG image;
- very short page copy;
- excessive repeated phrase.

---

## 32. Launch SEO checklist

### Domain

- canonical domain selected;
- HTTPS active;
- www/non-www redirect;
- Netlify subdomain not indexable;
- staging noindex verified.

### Pages

- all approved pages published;
- one H1 each;
- metadata complete;
- language correct;
- canonical correct;
- hreflang reciprocal;
- internal links valid.

### Crawl/index

- robots verified;
- sitemap verified;
- editor excluded;
- no accidental production noindex;
- 404 returns real 404;
- redirects use correct status.

### Structured data

- visible facts match JSON-LD;
- Organization validated;
- Person validated;
- Breadcrumbs validated;
- no fake LocalBusiness data.

### Performance

- mobile tested;
- images optimised;
- layout shift controlled;
- third-party scripts limited.

### Monitoring

- Search Console verified;
- analytics configured with consent;
- conversion events tested;
- launch benchmark saved.

---

## 33. Official references

The implementation team must verify current guidance at implementation time:

- Google SEO Starter Guide: `https://developers.google.com/search/docs/fundamentals/seo-starter-guide`
- Google Search Essentials: `https://developers.google.com/search/docs/essentials`
- Multilingual sites: `https://developers.google.com/search/docs/specialty/international/managing-multi-regional-sites`
- Localised versions and hreflang: `https://developers.google.com/search/docs/specialty/international/localized-versions`
- Canonical URLs: `https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls`
- Robots introduction: `https://developers.google.com/search/docs/crawling-indexing/robots/intro`
- Robots meta: `https://developers.google.com/search/docs/crawling-indexing/robots-meta-tag`
- Sitemaps: `https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview`
- Organization structured data: `https://developers.google.com/search/docs/appearance/structured-data/organization`
- LocalBusiness structured data: `https://developers.google.com/search/docs/appearance/structured-data/local-business`
- Structured data policies: `https://developers.google.com/search/docs/appearance/structured-data/sd-policies`
- Core Web Vitals: `https://web.dev/articles/vitals`
- Search Console: `https://search.google.com/search-console/about`

---

## 34. Acceptance criteria

SEO implementation is accepted when:

- all public language pages have unique URLs;
- equivalent pages have reciprocal `hreflang`;
- canonical URLs are self-referencing;
- published pages are server-rendered or statically rendered;
- sitemap contains only approved canonical pages;
- editor and previews are not indexable;
- metadata is JSON-driven;
- structured data matches visible verified content;
- mobile content is complete;
- Search Console is configured;
- conversion measurement is testable;
- no false location, project, team or certification claim is introduced;
- the site provides useful content rather than keyword-only pages.
