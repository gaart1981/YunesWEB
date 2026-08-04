# Salimi Engineering — Analytics and Conversion Tracking Plan

**Document ID:** SE-WEB-14  
**Version:** 1.0  
**Status:** Implementation specification  
**Target repository path:** `/source_docs/14_analytics_and_conversion_tracking_plan.md`  
**Review date:** 2026-08-04

---

## 1. Purpose

This document defines how the Salimi Engineering website will measure:

- qualified interest;
- contact actions;
- project enquiries;
- service engagement;
- language usage;
- organic search performance;
- advertising performance;
- AI referral traffic;
- technical quality.

The system must remain proportionate to a B2B engineering website. It must not collect unnecessary personal data or create a complex marketing stack before there is enough traffic to justify it.

---

## 2. Measurement principle

> Measure decisions and commercial intent, not superficial activity.

Primary questions:

- Which audiences reach the site?
- Which pages create serious engagement?
- Which services generate enquiries?
- Which languages are used?
- Which acquisition channels generate qualified opportunities?
- Does the site convert international visitors working in Morocco?
- Does the site perform technically?
- Are AI and search referrals producing relevant visits?

Page views alone are not a business result.

---

## 3. Recommended tool stack

### Required

- Google Search Console;
- Google Analytics 4, after consent and legal approval;
- Google Tag Manager, if it simplifies controlled deployment;
- Netlify deployment and function logs;
- Google Ads conversion tracking when campaigns begin.

### Optional, later

- CRM;
- call tracking;
- consent management platform;
- privacy-focused analytics alternative;
- dashboard in Looker Studio;
- server-side tagging;
- Microsoft Clarity or similar session tools, only after privacy and accessibility review.

Do not install optional tools by default.

---

## 4. Privacy and consent

Analytics implementation must comply with applicable privacy requirements.

Requirements:

- obtain legally required consent before non-essential tracking;
- do not send analytics events before allowed consent state;
- provide cookie controls;
- respect withdrawal;
- document retention;
- document processors;
- update Privacy and Cookie Policies;
- do not collect sensitive project information in analytics;
- do not send contact form content to analytics;
- do not send full email, name, phone or message;
- do not store the JSON-editor password or edited content.

Google Consent Mode may be used to communicate consent status to Google tags, but legal review remains required.

---

## 5. Data minimisation

Prohibited analytics parameters:

- full name;
- email address;
- phone number;
- project description;
- attached document name;
- password;
- GitHub token;
- free-text form content;
- confidential client name;
- precise private project address;
- personal identifier stored in JSON.

Permitted parameters:

- locale;
- page ID;
- service ID;
- sector ID;
- project stage category;
- country category where voluntarily selected and privacy-approved;
- CTA location;
- form result;
- acquisition source;
- campaign ID.

---

## 6. Account structure

Recommended:

```text
Google Analytics account:
Salimi Engineering

GA4 property:
Salimi Engineering Website

Web data stream:
salimiengineering.com
```

Use production domain only.

Exclude or separately identify:

- developer traffic;
- test traffic;
- Netlify deploy previews;
- localhost;
- editor routes.

Search Console should use a domain property where possible.

---

## 7. Environment separation

### Production

- real GA4 measurement ID;
- consent controls active;
- conversions enabled;
- editor analytics disabled or minimal.

### Deploy preview

- analytics disabled;
- or separate test property;
- never send test enquiries as real conversions.

### Local development

- analytics disabled;
- debugging through a mock data layer.

Environment variables:

```text
NEXT_PUBLIC_GA_MEASUREMENT_ID
NEXT_PUBLIC_GTM_CONTAINER_ID
NEXT_PUBLIC_ANALYTICS_ENABLED
NEXT_PUBLIC_ADS_CONVERSION_ID
NEXT_PUBLIC_ADS_ENQUIRY_LABEL
```

Only safe public IDs may use public environment variables.

---

## 8. Consent-state model

Suggested categories:

- necessary;
- analytics;
- advertising.

Default before consent:

- necessary: granted;
- analytics: denied;
- advertising: denied.

The exact implementation must follow the approved legal policy.

Consent event:

```text
consent_update
```

Permitted parameters:

- analytics_storage;
- ad_storage;
- ad_user_data;
- ad_personalization;
- locale;
- action: accept_all | reject_all | customise | withdraw.

Do not record a user identifier.

---

## 9. Event naming standard

Use lowercase snake_case.

Examples:

```text
project_enquiry_submit
email_click
phone_click
whatsapp_click
service_cta_click
project_case_open
language_switch
```

Rules:

- concise;
- stable;
- action-oriented;
- no language-specific event names;
- no spaces;
- avoid renaming after launch;
- document every event.

---

## 10. Event taxonomy

### 10.1 Primary conversion events

#### `project_enquiry_submit`

Trigger:

- server confirms successful form delivery.

Parameters:

```text
locale
page_id
service_interest
project_stage
form_id
```

Do not fire merely on button click.

Mark as GA4 key event after validation.

#### `direct_email_click`

Trigger:

- click on business email link.

Parameters:

```text
locale
page_id
cta_location
```

Secondary conversion, not equivalent to confirmed enquiry.

#### `phone_click`

Trigger:

- click on telephone link.

Parameters:

```text
locale
page_id
cta_location
```

#### `whatsapp_click`

Trigger:

- click on approved WhatsApp link.

Parameters:

```text
locale
page_id
cta_location
```

### 10.2 Engagement events

#### `service_page_view`

Parameters:

```text
service_id
locale
```

GA4 already records `page_view`; this event is optional if analysis can use page paths.

#### `service_cta_click`

Parameters:

```text
service_id
source_page_id
destination_page_id
locale
cta_location
```

#### `experience_item_open`

Parameters:

```text
project_id
relationship_type
locale
```

#### `founder_profile_view`

Optional; page view may already be sufficient.

#### `language_switch`

Parameters:

```text
from_locale
to_locale
page_id
```

#### `outbound_link_click`

Only for approved business-relevant external links:

- LinkedIn;
- official partner or registry link.

Do not duplicate automatic enhanced-measurement events without reason.

### 10.3 File events

Future:

```text
capability_statement_download
```

Parameters:

```text
document_id
locale
source_page_id
```

---

## 11. CTA location vocabulary

Use controlled values:

```text
header
hero
service_card
experience_section
founder_section
inline_content
final_cta
footer
contact_block
```

Do not use CSS class names as analytics values.

---

## 12. Contact-form funnel

Optional funnel events:

1. `project_enquiry_start`
2. `project_enquiry_validation_error`
3. `project_enquiry_submit`
4. `project_enquiry_server_error`

### 12.1 Start

Trigger only after meaningful interaction, not focus from browser autofill.

### 12.2 Validation error

Parameters:

```text
form_id
error_count
error_category
locale
```

Do not send field values.

### 12.3 Server error

Parameters:

```text
form_id
error_code
locale
```

Use safe categories:

```text
validation
rate_limit
delivery_failure
network
unknown
```

---

## 13. Server-confirmed conversion

The public frontend must not treat a click as a successful enquiry.

Sequence:

1. user submits;
2. client validates;
3. server validates;
4. email/provider confirms acceptance;
5. server returns success;
6. frontend shows success;
7. analytics event fires.

For stronger integrity, a future server-side event may supplement the client event. It must avoid duplicate counting.

---

## 14. Google Ads conversions

When Google Ads begins:

Primary conversion:

- successful project enquiry.

Secondary observation actions:

- email click;
- phone click;
- WhatsApp click;
- capability statement download.

Do not optimise campaigns initially toward:

- page views;
- 10-second sessions;
- generic CTA clicks.

Recommended settings require campaign review:

- count: one per interaction for lead submission;
- attribution: data-driven where available and justified;
- conversion window: based on B2B sales cycle;
- enhanced conversions: only after legal and technical review;
- value: no invented monetary value.

---

## 15. UTM taxonomy

Required lower-case controlled structure:

```text
utm_source
utm_medium
utm_campaign
utm_content
utm_term
```

### 15.1 Examples

LinkedIn founder outreach:

```text
utm_source=linkedin
utm_medium=organic_social
utm_campaign=founder_launch
utm_content=founder_profile
```

Email outreach:

```text
utm_source=direct_outreach
utm_medium=email
utm_campaign=international_engineering_partners
utm_content=local_partner_page
```

Google Ads:

```text
utm_source=google
utm_medium=cpc
utm_campaign=local_engineering_partner_morocco
utm_content=ad_variant_a
utm_term={keyword}
```

Partner referral:

```text
utm_source=partner_name
utm_medium=referral
utm_campaign=market_entry
```

Do not include personal names, private project names or email addresses in UTMs.

---

## 16. Campaign naming

Format:

```text
{market}_{service}_{audience}_{period}
```

Examples:

```text
morocco_local_partner_international_engineering_2026q4
morocco_owners_engineering_investors_2027q1
```

Exact campaign date and market are operational values, not SEO page content.

---

## 17. AI referral classification

OpenAI currently states that ChatGPT search referral links may include:

```text
utm_source=chatgpt.com
```

Create a channel grouping for observed AI referrals.

Candidate sources, only when observed or officially documented:

```text
chatgpt.com
claude.ai
perplexity.ai
copilot.microsoft.com
gemini.google.com
```

Classification:

```text
AI Referral
```

Do not claim that all AI systems preserve referrer data.

Metrics:

- sessions;
- landing page;
- language;
- service page;
- enquiry conversion;
- direct-contact click;
- engagement quality.

---

## 18. Search Console measurement

Monitor by:

- query;
- page;
- country;
- device;
- search appearance;
- date;
- language URL.

Key reports:

- branded queries;
- service queries;
- Morocco-related queries;
- page indexing;
- Core Web Vitals;
- HTTPS;
- structured data;
- security issues;
- manual actions.

Store launch benchmarks:

- indexed pages;
- first impressions;
- first non-branded query;
- first enquiry from organic search.

---

## 19. Core Web Vitals measurement

Field targets at the 75th percentile:

- LCP ≤ 2.5 s;
- INP ≤ 200 ms;
- CLS ≤ 0.1.

Use:

- Search Console field data;
- PageSpeed Insights;
- optional `web-vitals` library;
- Lighthouse for laboratory diagnostics.

Do not treat a single Lighthouse score as real-user performance.

---

## 20. Dashboard structure

Recommended monthly dashboard:

### Acquisition

- users/sessions by channel;
- organic search;
- paid search;
- referral;
- direct;
- AI referral.

### Commercial intent

- project enquiries;
- email clicks;
- phone clicks;
- WhatsApp clicks;
- conversion rate.

### Content

- top landing pages;
- top service pages;
- experience interactions;
- language distribution;
- contact-page visits.

### Search

- impressions;
- clicks;
- branded/non-branded split;
- top service queries;
- indexed pages.

### Quality

- Core Web Vitals;
- form failure rate;
- deploy incidents;
- broken links;
- accessibility issues.

---

## 21. Qualified lead definition

A qualified website enquiry may be defined as one containing:

- identifiable company;
- valid business contact;
- project in Morocco or directly related market-entry need;
- relevant service requirement;
- credible timing or project context.

The website cannot automatically determine full commercial qualification. Human review is required.

Do not count spam, recruitment messages or generic sales solicitations as qualified leads.

---

## 22. Lead-source capture

Contact form may include hidden attribution fields:

- first landing page;
- current page;
- UTM source;
- UTM medium;
- UTM campaign;
- referrer domain;
- locale.

Privacy rules:

- disclose as required;
- no fingerprinting;
- no long-term cross-device identity;
- do not include full URL if it may contain personal information;
- sanitise values.

---

## 23. Attribution limits

B2B engineering sales may involve:

- multiple visits;
- direct follow-up;
- email forwarding;
- offline meetings;
- LinkedIn contact;
- long decision cycles.

Analytics attribution is incomplete.

Reports must distinguish:

- measured digital touch;
- confirmed lead source;
- sales-origin information from human review.

Do not state that a channel caused a contract solely because it was the last click.

---

## 24. Content editor analytics

Default:

- disabled.

If enabled, only operational events:

```text
editor_open
editor_validation_complete
editor_save_success
editor_save_failure
```

Allowed parameters:

- page ID;
- locale;
- result code.

Prohibited:

- edited text;
- field names containing private information;
- password;
- commit content;
- draft project details.

---

## 25. Data retention

Set retention based on:

- legal advice;
- business need;
- platform options.

Avoid retaining user-level data longer than required.

Document:

- GA4 retention;
- contact email retention;
- Netlify function-log retention;
- consent records;
- deletion process.

---

## 26. Access control

Analytics access should follow least privilege.

Roles:

- business owner;
- marketing/analytics administrator;
- technical administrator;
- read-only reviewer.

Requirements:

- no shared Google account;
- multi-factor authentication;
- periodic access review;
- remove former collaborators;
- document property ownership.

---

## 27. Data quality controls

Before launch:

- verify production domain;
- exclude internal traffic where practical;
- test consent states;
- test every event once;
- prevent duplicate enquiry event;
- prevent preview traffic;
- test UTM persistence;
- verify cross-language route tracking;
- verify outbound links;
- verify Search Console ownership.

Monthly:

- check unexplained event spikes;
- check `(not set)`;
- check duplicate page paths;
- check bot/referral spam;
- check form-event versus received-enquiry count;
- check campaign naming.

---

## 28. Event implementation layer

Recommended data-layer object:

```ts
type AnalyticsEvent = {
  event: string;
  locale?: "en" | "fr" | "ar";
  page_id?: string;
  service_id?: string;
  project_id?: string;
  cta_location?: string;
  form_id?: string;
  result_code?: string;
};
```

All events must pass through one analytics wrapper.

Components must not call `gtag` directly.

Example:

```ts
trackEvent({
  event: "service_cta_click",
  locale,
  page_id: pageId,
  service_id: serviceId,
  cta_location: "service_card",
});
```

The wrapper must respect consent and environment.

---

## 29. Analytics failure behaviour

If analytics:

- fails to load;
- is blocked;
- has no consent;
- is unavailable;

the site and contact form must remain fully operational.

No CTA may depend on tracking success.

---

## 30. Launch measurement checklist

- GA4 property created;
- production stream correct;
- consent state tested;
- analytics disabled in preview;
- Search Console verified;
- sitemap submitted;
- project enquiry event server-confirmed;
- key event marked;
- email/phone/WhatsApp events tested;
- language switch tested;
- UTM campaign tested;
- AI referral grouping configured;
- privacy and cookie text matches implementation;
- internal access documented;
- baseline dashboard saved.

---

## 31. Official references

Verify current official guidance at implementation time:

- Google Analytics developer documentation: `https://developers.google.com/analytics/devguides/collection/ga4`
- Google Consent Mode: linked through current Google Analytics documentation
- Google Tag Manager: `https://developers.google.com/tag-platform/tag-manager`
- Google Search Console: `https://search.google.com/search-console/about`
- OpenAI publisher FAQ: `https://help.openai.com/en/articles/12627856-publishers-and-developers-faq`
- Web Vitals: `https://web.dev/articles/vitals`

---

## 32. Acceptance criteria

Analytics implementation is accepted when:

- no unnecessary personal data is sent;
- consent rules are implemented;
- analytics is disabled in previews;
- successful enquiry is server-confirmed;
- events use stable names;
- component code uses one tracking wrapper;
- AI referrals can be reported where observed;
- Search Console is configured;
- UTM standards are documented;
- tracking failure never blocks the site;
- privacy documents match actual collection;
- test events are distinguishable from production data.
