# Missing Information Register

**Updated:** 2026-08-12 (contact and positioning update only; other audit entries retain their prior status until separately reverified)
**Rule:** Nothing in this register may be invented. Until supplied, each item stays out of production rendering or is held in draft JSON under `INFORMATION_NOT_AVAILABLE`, `REQUIRES_CONFIRMATION` or `TBD`. **These markers must never appear on a production public page.** (CLAUDE.md §4; Doc 16 §6)

---

## Section A — Blocking for public launch

### A1. Founder identity and record

| # | Item | Status | Needed for |
|---|---|---|---|
| A1.1 | Official passport spelling of the founder's full name | Missing | All pages, metadata, JSON-LD, `llms.txt` — Doc 15 §7.3 requires one exact spelling everywhere |
| A1.2 | Professional CV | Missing | About page, founder biography |
| A1.3 | Exact employment chronology and dates | Missing | Doc 05 §13.2 — "approximately 2001 to 2020" is currently unconfirmed |
| A1.4 | Exact job titles held | Missing | Experience attribution |
| A1.5 | Diplomas and certificates | Missing | Only publishable after verification |
| A1.6 | Languages and proficiency levels | Missing | About page; multilingual coordination claim |
| A1.7 | Confirmation of the title "Managing Director" | Requires confirmation | Depends on legal formation |
| A1.8 | Whether professional work was performed **in Morocco** (not only origin/residence) | Requires confirmation | Doc 05 §3.3 — determines whether "in Morocco and Russia" may be used |
| A1.9 | LinkedIn profile URL | Missing | `sameAs`, footer, contact |

### A2. Legal and company identity

| # | Item | Status |
|---|---|---|
| A2.1 | Legal company name and legal form | Missing |
| A2.2 | Company registration number | Missing |
| A2.3 | VAT / tax identifiers | Missing |
| A2.4 | Registered office address | Missing — prior repository values must not be treated as verified |
| A2.5 | Professional licences and authorisations | Missing |
| A2.6 | Professional insurance details | Missing |
| A2.7 | Publication director and hosting provider (for Legal Notice) | Missing |
| A2.8 | Legal notices required under Moroccan law | Missing — requires Moroccan legal advice |
| A2.9 | Qualifications required to sign specific engineering documents in Morocco | Missing — determines whether the Doc 03 EM09 regulatory disclaimer is needed |
| A2.10 | Legally reviewed Privacy Policy and Cookie Policy text | Missing — must match actual implementation |

### A3. Contact information

| # | Item | Status |
|---|---|---|
| A3.1 | Business email address | **Confirmed: `info@salimiengineering.com` — owner confirmation 2026-08-12** |
| A3.2 | Business telephone number | Current public number exists in repository but independent confirmation status has not been reverified in this update |
| A3.3 | Whether WhatsApp contact is approved | Requires decision |
| A3.4 | Contact-form recipient address | Missing — a public business email does not by itself confirm form-delivery routing |
| A3.5 | Email provider and API credentials | Missing — provision as Netlify environment variables only |
| A3.6 | Physical location to display (city or service-area) | Requires confirmation |

### A4. Project experience

| # | Item | Status |
|---|---|---|
| A4.1 | List of 10–15 candidate projects | Missing |
| A4.2 | Public-use permission for each project | Missing |
| A4.3 | Project location and period per project | Missing |
| A4.4 | Founder's exact role and scope of responsibility per project | Missing |
| A4.5 | Project value and permission to publish it | Missing |
| A4.6 | Client names and permission to name them | Missing |
| A4.7 | Employer at the time of each project | Missing |
| A4.8 | Relationship type per project (`founder_prior_experience` / `company_assignment` / `partner_assignment`) | Missing — **mandatory field, currently absent from the data model** |
| A4.9 | Client or employer references | Missing |

**Current state note:** project evidence and permissions require a separate current-state review before public launch. This update does not validate project claims or media rights.

### A5. Media and rights

| # | Item | Status |
|---|---|---|
| A5.1 | Authorised founder portrait | Portrait files are present; authorisation/rights status requires separate verification |
| A5.2 | Authorised project photographs with written permission | Missing |
| A5.3 | Drawings or diagrams cleared for publication | Missing |
| A5.4 | Open Graph images (1200×630) | Missing |
| A5.5 | Favicon and application icon set | Missing |
| A5.6 | Completed `/content/shared/media-rights.json` register | Missing |

### A6. Translation

| # | Item | Status |
|---|---|---|
| A6.1 | Professional French review by a named reviewer | Not done — current French is working draft |
| A6.2 | Professional Arabic review by a named reviewer | Not done — current Arabic is working draft |
| A6.3 | Arabic keyword research by a qualified Arabic speaker | Not done — Doc 12 §4.3 forbids literal keyword translation |
| A6.4 | Named translation reviewer per language | Missing — Doc 13 §30 requires assigned owners |

### A7. Platform and credentials

| # | Item | Status |
|---|---|---|
| A7.1 | Confirmed canonical production domain | Missing — blocks canonical URLs, `hreflang`, sitemap, JSON-LD `@id` values |
| A7.2 | JSON-editor production password (≥ 14 characters) and its salted hash | Missing |
| A7.3 | Minimum-permission GitHub token for the save function | Missing — **must be provisioned directly in Netlify, never in chat or the repository** |
| A7.4 | GA4 measurement ID and Search Console access | Missing |
| A7.5 | Google Ads conversion IDs (when campaigns begin) | Not yet required |
| A7.6 | Netlify site ID and confirmation the repository is connected | **[VERIFY]** — reported by the owner in a prior record but not verified during this analysis |

### A8. Deployment facts — blocking the "site does not open" diagnosis

**Added 2026-08-04 following the deployment audit.** These items were not reverified during the 2026-08-12 positioning/contact update.

| # | Item | Why it is needed |
|---|---|---|
| A8.1 | Does a Netlify site exist, and is it linked to `gaart1981/YunesWEB`? | Distinguishes "no site" from "broken site" |
| A8.2 | Production URL (`*.netlify.app` and any custom domain) | Needed for direct production testing |
| A8.3 | Production branch setting | Confirms whether `main` is deployed |
| A8.4 | Latest production deploy ID, its commit SHA and its status | Detects stale or failed deploys |
| A8.5 | Full deploy log of the most recent production build | Detects build failure causes |
| A8.6 | Whether password protection or access control is enabled | Explains inaccessibility despite a successful deploy |
| A8.7 | Whether Netlify Forms detection is enabled, and whether any form appears in the Forms tab | Needed to verify form handling |
| A8.8 | Custom domain DNS and HTTPS certificate status | Explains domain-level failure |
| A8.9 | The exact production URL and browser result | Distinguishes wrong-URL from broken-site |

---

## Section B — Decisions requiring project-owner confirmation

These are **decisions**, not missing facts. Each needs an explicit answer before the dependent work proceeds.

| # | Decision | Options | Blocks |
|---|---|---|---|
| B1 | Remaining unverified contact/address/phone data: verify, remove or keep site noindex? | Verify / remove / keep noindex | Public launch |
| B2 | Arabic public slugs: keep Latin-character slugs (Doc 02 §5 recommendation) or use Arabic slugs? | Latin (recommended) / Arabic | Route map, R2 |
| B3 | Root redirect `/` → `/en/`: keep 302, or make it permanent (301)? | 302 now / 301 after business decision | Phase 6 |
| B4 | `GPTBot` (OpenAI model-training crawler): allow or disallow? | Allow / Disallow | Phase 6 — Doc 13 §15 requires an explicit, recorded decision |
| B5 | `ClaudeBot` (Anthropic training crawler): allow or disallow? | Allow / Disallow | Phase 6 — separate from search crawlers |
| B6 | Contact delivery: Netlify Function + email provider (Option A) or Netlify Forms (Option B)? | A (more control) / B (simpler) | Phase 5 |
| B7 | Editor commits: direct to `main`, or to a `content-updates` branch with manual merge? | Direct (simpler) / Branch (safer) | Phase 4 |
| B8 | Which engagement formats in Doc 05 §7.3 are commercially intended? | Per-item confirmation | Services page content |
| B9 | Which Electrical/MEP capabilities in Doc 05 §9.3 can actually be delivered? | Per-item confirmation | Doc 05 marks every item `REQUIRES_CONFIRMATION` |
| B10 | Which of the seven sectors may be presented, and as experience or as capability? | Per-sector confirmation | Sectors page — Doc 02 §12 |
| B11 | Is WhatsApp contact approved? | Yes / No | Contact page, analytics events |
| B12 | Should the Experience page publish illustrative capability profiles at all, or wait for verified projects? | Publish labelled / wait | Experience page |
| B13 | Analytics: GA4 now, or defer until traffic justifies it? | Now / defer | Phase 5, cookie policy |
| B14 | Should the site launch publicly before verified project evidence exists? | Yes with limited claims / wait | Overall release timing |
| B15 | Who is the named content owner, technical owner and crawler-policy owner? | Named individuals | Doc 13 §30 governance |

---

## Section C — Security action required

**C1. Exposed GitHub personal access token.**

A GitHub personal access token was transmitted in plain text in the chat session on 2026-08-04. Any credential shared this way must be considered compromised.

**Required action:** revoke the token immediately at `https://github.com/settings/tokens`, then issue a replacement as a **fine-grained** token limited to Contents write access on `gaart1981/YunesWEB` only, and store it exclusively as a Netlify environment variable.

**Verified in the 2026-08-04 audit:** the token was not present anywhere in the repository. This status was not rescanned during the present positioning/contact update.

**C2. Dependency-security status.**

The prior 2026-08-04 audit described vulnerabilities in `next@16.0.0`. The repository has since moved to a later Next.js version. Dependency-security status must be reverified with a current `npm audit`; the old vulnerability count must not be treated as current without rerunning the audit.

---

## Section D — Confirmed by the owner, previously withheld

| # | Item | Status | Confirmed |
|---|---|---|---|
| D1 | Response-time commitment: **within one working day** | **Confirmed** | 2026-08-13 |

Doc 03 §11 (CON04) and Doc 11 §20 both required that no response-time promise
be published until confirmed. The owner has now confirmed it, so the line is
published beside the contact actions in all six languages.

Two things follow from that, and they are commitments rather than copy:

1. It must hold across time zones. "One working day" was chosen over a fixed
   number of hours precisely so it survives a visitor writing from Mexico or
   the Gulf, and survives a day spent on site.
2. If it stops being true, it must come out of `content/site-*.json` →
   `navigation.responseTime` and `content/*/home.json` → `contact.responseTime`.
   A published promise that is not kept damages trust more than no promise at
   all — which is why it was withheld until now.

