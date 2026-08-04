# Salimi Engineering — Technical Architecture Specification

**Document ID:** SE-WEB-08  
**Version:** 1.0  
**Status:** Implementation specification  
**Target repository path:** `/source_docs/08_technical_architecture_specification.md`

---

## 1. Purpose

This document defines the technical architecture for the Salimi Engineering website, including:

- framework and runtime;
- repository structure;
- multilingual routing;
- content loading;
- rendering;
- Netlify deployment;
- GitHub workflow;
- serverless functions;
- environment variables;
- contact forms;
- error handling;
- testing boundaries;
- security controls;
- operational rollback.

The architecture must remain proportionate to a multilingual corporate website. It must be robust and maintainable without introducing unnecessary platforms or databases.

---

## 2. Architecture decision summary

### 2.1 Selected stack

- **Framework:** Next.js 16.x stable, App Router
- **Language:** TypeScript with strict mode
- **Runtime:** Node.js 24 LTS
- **Package manager:** npm
- **Styling:** CSS Modules plus central CSS custom-property design tokens
- **Validation:** Zod
- **Icons:** selected Lucide React icons through a local wrapper
- **Content:** repository-managed JSON
- **Hosting and deployment:** Netlify
- **Source control:** GitHub
- **Server operations:** Netlify Functions
- **Contact form:** Netlify Function or Netlify Forms adapter, final choice during implementation
- **Editor persistence:** GitHub REST API, Repository Contents endpoint
- **Analytics:** configurable; disabled until consent and production IDs are provided
- **Testing:** Vitest, React Testing Library, Playwright, axe-core or equivalent

### 2.2 Explicitly rejected for first release

- headless CMS;
- database;
- Supabase;
- WordPress;
- visual page builder;
- external admin portal;
- client authentication;
- public API;
- Tailwind-based design dependency;
- large public UI framework;
- animation framework;
- static HTML-only generator that prevents the approved editor workflow.

---

## 3. Architecture principles

1. GitHub is the source of truth.
2. Public pages are rendered from validated JSON.
3. Public content should be statically generated where practical.
4. Server secrets exist only in Netlify environment variables.
5. The browser never receives the GitHub write token or password hash.
6. Editing content creates a Git commit.
7. A failed content validation must never trigger a production update.
8. Components must remain independent from the physical JSON storage layout.
9. Locale, direction and route mapping are central platform concerns.
10. Production functionality must remain usable if analytics are blocked.

---

## 4. Framework and version policy

### 4.1 Next.js

Use the latest patched stable release in the approved Next.js 16 major line at implementation time.

Requirements:

- App Router;
- Server Components by default;
- Client Components only where interaction requires them;
- framework Metadata API;
- framework sitemap and robots conventions;
- dynamic route segments for locale and editor routes;
- no canary or beta dependencies.

### 4.2 Node.js

Use Node.js 24 LTS.

Required files:

```text
.nvmrc
.node-version
```

Both should specify the same tested version family.

Example:

```text
24
```

The exact patch version should be locked in the deployment record where practical.

### 4.3 Dependency policy

- commit `package-lock.json`;
- no unpinned Git dependencies;
- no packages with unresolved critical vulnerabilities;
- use exact or controlled semver according to repository policy;
- document all runtime dependencies;
- remove unused packages before release;
- update only through reviewed pull requests.

---

## 5. Rendering strategy

### 5.1 Public pages

Preferred strategy:

- static generation at build time;
- server-rendered metadata generated from JSON;
- no client-side fetch for primary page copy;
- no JavaScript required merely to display text.

Benefits:

- speed;
- crawlability;
- stable rendering;
- reduced attack surface;
- predictable multilingual output.

### 5.2 Editor pages

Editor pages are interactive Client Components within a protected server-supported route.

- load JSON through a server endpoint or server action;
- never expose write credentials;
- disable indexing;
- disable caching of authenticated save responses;
- permit public viewing of public-page content if required by the chosen open-editor model;
- protect all mutation operations.

### 5.3 Contact form

The contact form may submit to a Netlify Function.

It must:

- validate on client for usability;
- validate again on server;
- apply spam controls;
- sanitise output;
- avoid logging message contents unnecessarily;
- return structured error codes;
- operate independently of analytics.

---

## 6. Recommended repository structure

```text
/
├── app/
│   ├── [locale]/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── services/
│   │   ├── owners-engineering-amo/
│   │   ├── electrical-mep-engineering/
│   │   ├── local-engineering-partner-morocco/
│   │   ├── sectors/
│   │   ├── experience/
│   │   ├── about/
│   │   ├── contact/
│   │   └── [...resolved localised routes as required]
│   ├── editjson/
│   │   └── [locale]/
│   │       └── [pageSlug]/
│   │           └── page.tsx
│   ├── api/
│   │   └── optional route handlers only where justified
│   ├── global-error.tsx
│   ├── not-found.tsx
│   ├── robots.ts
│   └── sitemap.ts
├── components/
├── content/
│   ├── shared/
│   ├── en/
│   ├── fr/
│   └── ar/
├── lib/
│   ├── content/
│   ├── i18n/
│   ├── routes/
│   ├── seo/
│   ├── validation/
│   ├── security/
│   └── analytics/
├── schemas/
├── public/
│   ├── images/
│   ├── favicon.ico
│   └── site.webmanifest
├── netlify/
│   └── functions/
│       ├── save-content.ts
│       ├── contact-enquiry.ts
│       └── optional-healthcheck.ts
├── styles/
│   ├── tokens.css
│   ├── globals.css
│   ├── typography.css
│   └── utilities.css
├── tests/
│   ├── unit/
│   ├── integration/
│   ├── e2e/
│   └── fixtures/
├── source_docs/
├── scripts/
│   ├── validate-content.ts
│   ├── validate-translations.ts
│   ├── audit-hardcoded-copy.ts
│   └── generate-placeholders.ts
├── netlify.toml
├── next.config.ts
├── tsconfig.json
├── package.json
├── package-lock.json
├── .nvmrc
├── .node-version
├── .env.example
└── README.md
```

Exact localised physical route folders may be resolved through a central route map rather than duplicated manually. The public URLs must still match the approved sitemap.

---

## 7. TypeScript rules

Required:

```json
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true
  }
}
```

Additional requirements:

- no unexplained `any`;
- parse external JSON as `unknown`;
- validate before casting;
- typed component props;
- discriminated unions for section types;
- central types derived from schemas where practical;
- server/client boundaries explicit.

---

## 8. Content loading architecture

### 8.1 Content repository layer

Components must not import JSON directly.

Use a content service such as:

```text
lib/content/getPageContent.ts
lib/content/getGlobalContent.ts
lib/content/getEntities.ts
```

Responsibilities:

- resolve locale;
- resolve stable page ID;
- load JSON;
- validate with Zod;
- merge shared and localised entities;
- remove unpublished data;
- return typed content;
- produce controlled errors.

### 8.2 Build-time validation

Before `next build`, run:

```text
npm run validate:content
npm run validate:translations
npm run audit:copy
```

The build must fail if:

- required JSON is invalid;
- duplicate stable IDs exist;
- a published page has missing required translation;
- image paths are invalid for required production assets;
- protected placeholders are present in published content;
- visible business text is detected in disallowed component locations.

### 8.3 Fallback policy

Production default:

- no silent cross-language fallback for page body copy;
- optional global labels may fall back only if explicitly configured;
- missing page translation returns controlled unavailable state or 404;
- draft content never becomes public.

---

## 9. Multilingual routing

### 9.1 Locale segment

All public routes include:

```text
/[locale]/...
```

Supported locales:

```text
en
fr
ar
```

### 9.2 Default root route

Recommended:

```text
/ → /en/
```

Alternative:

- detect browser language once;
- preserve a visible language choice;
- never create an inaccessible redirect loop.

English remains the default international route unless business decision changes.

### 9.3 Route map

Use stable page IDs mapped to locale routes.

Example:

```ts
const routes = {
  home: {
    en: "/en/",
    fr: "/fr/",
    ar: "/ar/",
  },
  local_partner: {
    en: "/en/local-engineering-partner-morocco",
    fr: "/fr/partenaire-ingenierie-maroc",
    ar: "/ar/local-engineering-partner-morocco",
  },
} as const;
```

Navigation and language switching must use this central map.

### 9.4 Direction

Set on root HTML element:

```html
<html lang="ar" dir="rtl">
```

No component should independently guess page direction.

---

## 10. Styling architecture

### 10.1 CSS approach

Use:

- central design tokens in CSS custom properties;
- global reset and typography;
- CSS Modules for component styles;
- limited shared utility classes;
- logical properties for RTL.

Do not use:

- uncontrolled global selectors;
- inline raw colours;
- arbitrary pixel values repeated throughout components;
- CSS-in-JS runtime dependency;
- public UI kit styles.

### 10.2 Class naming

CSS Modules eliminate global collisions. Within a module use clear semantic names:

```text
.root
.header
.title
.summary
.media
.actions
```

Avoid visual-only names such as:

```text
.blueBox
.leftText
.bigImage
```

---

## 11. Font delivery

Use framework-supported font optimisation.

Requirements:

- Manrope for Latin locales;
- Noto Sans Arabic for Arabic;
- only required weights;
- `font-display: swap` or framework equivalent;
- no externally loaded runtime CSS that delays rendering;
- no font files committed unless licensing and repository policy permit it;
- never distribute font files separately to users.

---

## 12. Image delivery

Use the framework image component where compatible with Netlify.

Requirements:

- width and height supplied;
- responsive `sizes`;
- lazy load below-fold images;
- priority only for true above-fold media;
- AVIF/WebP generation or approved source formats;
- placeholder fallback when file is absent in development;
- alt text from JSON.

No meaningful image may be a CSS background.

---

## 13. Netlify architecture

### 13.1 Continuous deployment

Production site is linked to GitHub.

Recommended:

- production branch: `main`;
- pull-request deploy previews enabled;
- branch deploys optional;
- every push to `main` triggers a production build;
- failed build does not replace the last successful deploy.

### 13.2 Build configuration

Recommended `netlify.toml`:

```toml
[build]
  command = "npm run build"
  publish = ".next"

[build.environment]
  NODE_VERSION = "24"

[functions]
  directory = "netlify/functions"
```

The exact publish handling may be automatically managed by Netlify’s current Next.js adapter. Claude must verify the current official configuration rather than using outdated static-export instructions.

### 13.3 Deploy contexts

Required contexts:

- production;
- deploy-preview;
- branch-deploy or local development where used.

Secrets must be scoped appropriately.

### 13.4 Skew protection

If the deployed Next.js architecture benefits from Netlify skew protection, enable the current official Netlify setting and verify it in a deploy preview before production.

---

## 14. Environment variables

### 14.1 Required editor variables

```text
GITHUB_OWNER
GITHUB_REPO
GITHUB_BRANCH
GITHUB_CONTENT_PATH
GITHUB_TOKEN
CONTENT_EDITOR_PASSWORD_HASH
CONTENT_EDITOR_PASSWORD_SALT
CONTENT_EDITOR_ALLOWED_ORIGIN
```

### 14.2 Contact variables

Possible:

```text
CONTACT_RECIPIENT_EMAIL
CONTACT_FROM_EMAIL
EMAIL_PROVIDER_API_KEY
CONTACT_RATE_LIMIT_ENABLED
```

### 14.3 Public variables

Only values intentionally safe for the browser may use a public prefix.

Never expose:

- GitHub token;
- password hash;
- password salt;
- email provider key;
- private analytics secrets.

### 14.4 `.env.example`

Must list variable names and descriptions without real values.

---

## 15. GitHub integration

### 15.1 Save mechanism

The Netlify save function uses the GitHub Repository Contents API.

Sequence:

1. validate request origin and method;
2. parse request;
3. verify password;
4. validate locale and stable page ID against allowlists;
5. validate JSON against schema;
6. reject protected-key changes;
7. fetch current GitHub file and SHA;
8. compare client base SHA to current SHA;
9. reject or resolve conflict;
10. create or update the file with a descriptive commit;
11. return commit reference and deployment status message.

### 15.2 Token permissions

Use a fine-grained token or GitHub App credential with the minimum repository content permission required.

Do not grant:

- organisation administration;
- workflow modification unless specifically required;
- broader repository permissions than needed.

### 15.3 Commit message

Format:

```text
content({locale}/{pageId}): update via JSON editor
```

Optional metadata:

```text
Editor request ID: ...
Previous SHA: ...
```

Do not store the password or personal form data in commit messages.

### 15.4 Concurrency

The current file SHA must be used to prevent one editor session overwriting a newer change.

On mismatch:

- return HTTP 409;
- show conflict message;
- allow reload and reapply;
- never overwrite silently.

---

## 16. Netlify Functions

### 16.1 `save-content`

Runtime responsibilities:

- method restriction;
- origin policy;
- body-size limit;
- password verification;
- input allowlisting;
- schema validation;
- protected path enforcement;
- GitHub API call;
- structured response;
- safe logging.

### 16.2 `contact-enquiry`

Responsibilities:

- server validation;
- honeypot or approved spam control;
- rate limiting or provider protection;
- email delivery;
- safe response;
- consent data handling;
- no attachment in first release.

### 16.3 Function response format

```json
{
  "ok": true,
  "code": "CONTENT_SAVED",
  "message": "Changes were committed successfully.",
  "data": {
    "commitSha": "",
    "deploymentExpected": true
  }
}
```

Errors:

```json
{
  "ok": false,
  "code": "VALIDATION_FAILED",
  "message": "The content contains fields that must be corrected.",
  "fieldErrors": []
}
```

---

## 17. Password verification

The literal password must not be committed.

Recommended:

- generate a strong password before launch;
- store a salted password hash in Netlify;
- use Node’s cryptographic functions;
- compare using timing-safe equality;
- do not return whether the password length or hash was close;
- do not log entered passwords;
- clear password from client state after request.

The example password `leadline` is a temporary concept only and must not be treated as production-safe.

---

## 18. Open editor model

The approved concept allows the editor page itself to be reachable without login.

Implications:

- viewing public content and stable keys is acceptable;
- mutation remains protected;
- editor routes must be `noindex`;
- server responses must not expose secrets;
- draft or private content must not be shown unless specifically allowed;
- the route must not expose repository credentials or file SHA history beyond what is operationally necessary.

Recommended improvement:

- allow editor loading for published page content;
- require password before loading draft/private content;
- require password for all saves.

---

## 19. Contact form delivery

Two acceptable implementation paths:

### Option A — Netlify Function plus email provider

Preferred when:

- customised validation;
- controlled message format;
- explicit spam checks;
- future CRM integration.

### Option B — Netlify Forms

Acceptable if current Next.js/Netlify implementation is verified and operational requirements remain simple.

Claude must test the selected option in an actual deploy preview. Local success alone is insufficient.

---

## 20. Security headers

Recommended headers, subject to testing:

```text
Content-Security-Policy
Referrer-Policy
X-Content-Type-Options
Permissions-Policy
Strict-Transport-Security
```

CSP must be compatible with:

- framework runtime;
- analytics, if enabled;
- contact provider;
- required fonts and images.

Do not use an ineffective permissive CSP merely to claim compliance.

---

## 21. Caching

Public content:

- static deployment caching through Netlify;
- immutable hashed assets;
- HTML controlled by platform deployment;
- no long-lived browser caching for editor responses.

Editor mutation endpoints:

```text
Cache-Control: no-store
```

Draft preview responses:

```text
Cache-Control: private, no-store
```

---

## 22. Error handling

### Public pages

- custom 404;
- global error boundary;
- no stack traces;
- localised user messages;
- logging without sensitive data.

### Build errors

- fail deployment;
- preserve previous production deploy;
- provide readable validation output.

### Editor errors

Distinct codes:

- invalid password;
- validation failure;
- protected field;
- stale content conflict;
- GitHub API failure;
- rate limit;
- deployment not yet complete.

---

## 23. Logging

Log:

- request ID;
- function result code;
- page ID;
- locale;
- GitHub status;
- commit SHA;
- duration.

Do not log:

- passwords;
- password hashes;
- tokens;
- full contact messages;
- sensitive personal information;
- complete raw request bodies.

---

## 24. Local development

Required commands:

```text
npm install
npm run dev
npm run validate:content
npm run test
npm run test:e2e
npm run build
```

For Netlify Functions, use current Netlify local development tooling.

The README must explain:

- environment setup;
- placeholder content;
- local function testing;
- content validation;
- production deployment;
- rollback.

---

## 25. Branch and review workflow

Recommended:

- `main`: production;
- feature branches;
- pull requests;
- deploy preview;
- merge only after checks.

JSON editor exception:

- approved save function commits directly to `main` for immediate operational simplicity.

Alternative safer mode:

- commit to `content-updates`;
- open pull request;
- manual merge.

The first release may use direct `main` commits, but Git history and rollback must be verified.

---

## 26. Rollback

Rollback options:

1. Netlify restore previous successful deploy;
2. revert Git commit;
3. restore file from GitHub history;
4. redeploy the corrected branch.

The editor UI should display the commit SHA after a save so administrators can identify the change.

---

## 27. Performance architecture

Targets:

- minimal client components;
- no animation framework;
- no video;
- optimised fonts;
- responsive images;
- static content;
- controlled third-party scripts;
- no analytics before consent where required;
- avoid hydration for static sections.

Detailed thresholds belong to the testing specification.

---

## 28. Technical source references

Current official references to verify during implementation:

- Next.js App Router: `https://nextjs.org/docs/app`
- Next.js internationalisation: `https://nextjs.org/docs/app/guides/internationalization`
- Next.js metadata: `https://nextjs.org/docs/app/getting-started/metadata-and-og-images`
- Netlify Next.js support: `https://docs.netlify.com/build/frameworks/framework-setup-guides/nextjs/overview/`
- Netlify environment variables: `https://docs.netlify.com/build/environment-variables/overview/`
- Netlify Functions: `https://docs.netlify.com/build/functions/get-started/`
- GitHub Repository Contents API: `https://docs.github.com/en/rest/repos/contents`
- Node.js release status: `https://nodejs.org/en/about/previous-releases`

Claude must verify these references at implementation time because platform details may change.

---

## 29. Technical acceptance criteria

The architecture is accepted when:

- public pages build from validated JSON;
- no visible business content is hardcoded;
- all three locales work;
- Arabic uses RTL;
- deploy previews work;
- production deploy is connected to GitHub;
- secrets are absent from client bundles;
- editor saves create Git commits;
- content conflicts are detected;
- invalid JSON cannot reach production;
- contact form is server-validated;
- the last successful deploy remains live after build failure;
- rollback is documented and tested;
- Node and dependency versions are locked;
- automated checks run before merge.
