# Salimi Engineering — Admin JSON Editor Specification

**Document ID:** SE-WEB-09  
**Version:** 1.0  
**Status:** Implementation specification  
**Target repository path:** `/source_docs/09_admin_json_editor_specification.md`

---

## 1. Purpose

This document defines the open page-content editor for the Salimi Engineering website.

The editor allows a non-developer to change page text without editing raw files or source components.

Approved route pattern:

```text
/editjson/{locale}/{pageSlug}
```

Examples:

```text
/editjson/en/home
/editjson/fr/about
/editjson/ar/local_partner
```

The editor displays stable JSON keys as read-only labels and their values as editable controls. Saving requires server-side password verification and results in a GitHub commit followed by a Netlify deployment.

---

## 2. Scope

The editor supports:

- public page copy;
- navigation labels;
- footer copy;
- SEO fields;
- CTA labels;
- service cards;
- project descriptions;
- sector descriptions;
- image paths and alt text;
- publication status where authorised;
- ordered arrays where authorised.

The editor does not support:

- source code;
- component structure;
- arbitrary CSS;
- environment variables;
- passwords;
- GitHub credentials;
- analytics secrets;
- route definitions;
- schema changes;
- executable JavaScript;
- server function changes.

---

## 3. User model

The first release has no account system.

Permitted model:

- anyone may reach the editor URL;
- public page content may be visible;
- all mutation requires password;
- draft or sensitive content must remain protected;
- editor URLs are excluded from indexing.

This simplicity is accepted because the site is informational. It does not eliminate the need to protect mutation endpoints.

---

## 4. Route resolution

Input:

```text
locale = en | fr | ar
pageSlug = allowlisted stable page ID
```

Allowed page slugs:

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
global
navigation
```

Shared editor routes may use:

```text
/editjson/shared/company
/editjson/shared/projects
/editjson/shared/services
/editjson/shared/sectors
```

Unknown values return 404.

No arbitrary file path may be accepted.

---

## 5. Editor layout

### 5.1 Desktop

Recommended structure:

- top toolbar;
- left navigation or compact document tree;
- central field editor;
- optional right context panel.

Primary field row:

| Left | Right |
|---|---|
| stable key and help text | editable control |

Recommended proportions:

- key column: 32–38%;
- value column: 62–68%.

### 5.2 Tablet

- compact document selector;
- key and value may remain two-column where space permits;
- contextual help collapses.

### 5.3 Mobile

- stacked key then control;
- sticky bottom action bar permitted if it does not cover fields;
- no raw two-column squeeze;
- arrays use collapsible groups.

---

## 6. Visual separation from public site

The editor should use the same brand tokens but a more functional interface.

- Porcelain base;
- Ink Navy toolbar;
- Technical Blue focus and selection;
- status colours;
- denser spacing than public pages;
- no decorative photography;
- clear indication that this is an editing interface.

Display a persistent label:

```text
Content Editor
```

Display current identity:

```text
English / Home / Draft
```

---

## 7. Editor toolbar

Required elements:

- Salimi Engineering wordmark;
- document label;
- locale;
- page ID;
- page status;
- unsaved changes state;
- Validate;
- Preview changes;
- Reset;
- Apply changes;
- link to public page.

Optional:

- last update time;
- last commit SHA;
- build/deploy status.

---

## 8. Field rendering

### 8.1 Key display

Every field shows:

- complete dot path;
- human-readable description;
- validation guidance;
- required/optional status.

Example:

```text
hero.title
Primary page heading. Recommended maximum 75 characters.
```

The key cannot be edited.

### 8.2 Field types

| JSON type / schema | Editor control |
|---|---|
| short string | text input |
| long string | textarea |
| restricted Markdown | Markdown textarea with preview |
| boolean | switch or checkbox |
| enum | select |
| integer | number input |
| URL | URL input |
| email | email input |
| image path | path input plus preview |
| array of strings | repeatable inputs |
| array of objects | grouped repeatable editor |
| object | collapsible section |
| stable ID | read-only field |
| date | date/datetime input |
| status | restricted select |

### 8.3 Character guidance

Display:

- current character count;
- recommended maximum;
- blocking maximum only where schema requires it.

Do not block valid content merely because it exceeds SEO recommendations; show a warning unless the schema defines a hard limit.

---

## 9. Object hierarchy

Fields must be grouped in a way that matches the page:

```text
SEO
Hero
Sections
Final CTA
Editor metadata
```

Sections must show:

- section ID;
- component type;
- enabled state;
- content fields;
- item arrays;
- settings allowed for content editors.

Protected settings must be hidden or read-only.

---

## 10. Arrays and repeated content

### 10.1 Permitted actions

Where schema allows:

- add;
- remove;
- duplicate;
- reorder;
- enable/disable.

### 10.2 Stable IDs

Each repeatable item has an ID.

Rules:

- key is visible;
- stable ID is read-only after creation;
- reorder does not change ID;
- duplicate creates a new validated ID;
- deletion of a published project requires confirmation;
- referenced items cannot be deleted without resolving dependencies.

### 10.3 Reordering

Use accessible up/down controls in addition to drag and drop.

Drag and drop must never be the only method.

---

## 11. Image path editing

The editor does not upload files in the first release.

It allows:

- editing image path;
- previewing the path;
- displaying expected aspect ratio;
- displaying alt text;
- showing placeholder if file does not exist in the current deploy.

Field example:

```text
/images/founder/yunes-salimi.webp
```

Validation:

- must begin with `/images/`;
- no `..`;
- allowed file extension;
- no external URL unless schema explicitly permits it.

A future uploader may be added separately.

---

## 12. SEO editing

SEO fields appear in a dedicated group.

Required:

- meta title;
- meta description;
- canonical path;
- indexing;
- Open Graph title;
- Open Graph description;
- Open Graph image.

Editor guidance must show:

- recommended lengths;
- public search preview;
- warning for empty published fields;
- warning if canonical path differs from route map;
- no direct editing of schema types unless authorised.

---

## 13. Validation

### 13.1 Client validation

Runs:

- on field blur;
- on explicit Validate;
- before save.

Purpose:

- immediate usability;
- field error display;
- warning display.

### 13.2 Server validation

Runs on every save and is authoritative.

Must verify:

- request format;
- locale and page allowlists;
- schema;
- protected paths;
- stable IDs;
- URL safety;
- image path safety;
- page/file identity;
- Git SHA conflict;
- password;
- body size;
- prohibited content structures.

### 13.3 Blocking errors

Examples:

- invalid JSON structure;
- required field empty;
- unknown section type;
- changed stable page ID;
- invalid locale;
- duplicate item ID;
- raw HTML in restricted Markdown;
- invalid image path;
- published page containing prohibited placeholder token;
- canonical route mismatch.

### 13.4 Warnings

Examples:

- long SEO title;
- long paragraph;
- missing optional image;
- project with limited evidence;
- incomplete Open Graph description;
- untranslated optional item.

Warnings may allow save but must remain visible.

---

## 14. Diff preview

Before password entry, the editor must offer a readable diff.

Display:

- changed key;
- previous value;
- new value;
- added items;
- removed items;
- reordered items.

Do not show unchanged content by default.

For long values:

- highlight changed lines or segments;
- allow expand;
- preserve Arabic direction.

Raw JSON diff may be available as an advanced view but not the default.

---

## 15. Save workflow

### 15.1 User sequence

1. edit fields;
2. click Validate;
3. correct blocking errors;
4. click Preview changes;
5. review diff;
6. click Apply changes;
7. enter password;
8. submit;
9. server validates and commits;
10. editor shows commit result;
11. Netlify deploy begins;
12. public update appears after successful deploy.

### 15.2 Save password dialog

Fields:

- password;
- cancel;
- confirm.

Copy should explain:

> The password authorises a content commit. The public site will update after the new deployment succeeds.

No exact deployment time should be promised.

### 15.3 Password handling

Client:

- password held only in memory;
- cleared after response;
- never written to local storage;
- never included in URL;
- never included in analytics.

Server:

- compares against stored salted hash;
- generic error;
- no password logging;
- no hash returned.

---

## 16. GitHub save payload

Client-to-function request:

```json
{
  "locale": "en",
  "pageId": "home",
  "baseSha": "CURRENT_FILE_SHA",
  "content": {},
  "changeSummary": "Updated homepage hero and founder introduction"
}
```

Password transport:

- in request body over HTTPS or approved authorisation header;
- never query string.

The server reconstructs the repository path from allowlisted values. The client may not submit an arbitrary path.

---

## 17. Conflict handling

A conflict occurs if the repository file changed after the editor loaded it.

Server response:

```text
HTTP 409
CONTENT_CONFLICT
```

UI response:

- explain that a newer version exists;
- do not overwrite;
- offer:
  - reload latest;
  - copy current unsaved changes;
  - compare versions;
  - cancel.

Automatic merging is not required in the first release.

---

## 18. Save success state

Display:

- success message;
- commit SHA;
- changed document;
- expected deployment update;
- link to GitHub commit if repository visibility and policy allow;
- link to public page;
- button to reload current content.

Copy example:

> Changes were committed successfully. The public page will update after Netlify completes the deployment.

---

## 19. Save failure states

Distinct user-facing states:

### Invalid password

> The password was not accepted. No changes were saved.

### Validation failure

> The content no longer passes server validation. Review the highlighted fields.

### Conflict

> A newer version of this page exists. Reload it before saving.

### GitHub unavailable

> The repository could not be updated. No changes were saved.

### Deploy failure

A successful commit may still produce a failed deploy.

The editor should explain:

> The content was committed, but the latest deployment did not complete successfully. The previous public version remains active.

Deployment status integration is optional for first release; the message may remain generic if status is not queried.

---

## 20. Reset and navigation protection

When unsaved changes exist:

- page navigation prompts for confirmation;
- language switch prompts;
- browser close/reload uses native before-unload protection where supported;
- Reset requires confirmation;
- successful save clears dirty state.

Do not store drafts automatically in browser storage unless explicitly approved.

Optional future improvement:

- local draft backup with clear privacy warning.

---

## 21. Preview

First-release preview modes:

### Field-level preview

Always required:

- text appearance;
- Markdown rendering;
- image preview;
- search snippet.

### Full-page preview

Recommended:

- render unsaved content in an isolated preview route or iframe;
- do not expose draft to search engines;
- ensure iframe restrictions;
- maintain locale and RTL.

If full preview substantially increases complexity, it may be deferred, but the diff preview remains mandatory.

---

## 22. Editor accessibility

The editor must:

- be fully keyboard operable;
- use semantic fieldsets and legends;
- provide error summary links;
- preserve focus after add/remove/reorder;
- announce save status;
- provide non-drag reorder controls;
- support RTL;
- avoid colour-only status;
- keep password dialog focus controlled.

---

## 23. Editor security minimum

Even under the open-editor concept:

- HTTPS only;
- save endpoint POST only;
- origin allowlist;
- body-size limit;
- locale/page allowlist;
- server schema validation;
- password hash in environment variables;
- GitHub token server-side only;
- generic authentication errors;
- no raw path input;
- no script-capable content;
- no secrets in logs;
- `noindex`, `nofollow`;
- no permissive cross-origin save endpoint.

Recommended additional protections:

- simple attempt throttling;
- request ID;
- optional delay after repeated failures;
- secret rotation process.

---

## 24. Password policy

The original example `leadline` is not adequate as a production password.

Before launch:

- create a unique password of at least 14 characters;
- avoid company name and domain;
- store only salted hash;
- document rotation;
- do not share through source code;
- change after any suspected disclosure.

---

## 25. Editor content permissions

Recommended permission matrix:

| Content type | View without password | Save with password |
|---|---:|---:|
| Published page copy | yes | yes |
| Draft page copy | no or limited | yes |
| Navigation labels | yes | yes |
| SEO copy | yes | yes |
| Company public contact | yes | yes |
| Legal identifiers | yes if public | yes |
| Secrets | no | no |
| Environment settings | no | no |
| Route map | no | no |
| Schemas | no | no |

---

## 26. Editor analytics

Do not send:

- edited text;
- password;
- project details;
- legal copy;
- form values.

Permitted operational events:

- editor opened;
- validation completed;
- save succeeded;
- save failed by category.

Editor analytics should be disabled unless explicitly useful.

---

## 27. Testing requirements

Unit:

- schema field mapping;
- protected paths;
- validation messages;
- dirty state;
- diff calculation.

Integration:

- load content;
- valid save;
- invalid password;
- server rejection;
- conflict;
- GitHub failure mock.

End-to-end:

- edit a field;
- validate;
- save through test repository or safe branch;
- verify commit;
- verify deploy preview;
- test Arabic;
- keyboard-only workflow.

---

## 28. Acceptance criteria

The editor is accepted when:

- approved editor URLs resolve;
- keys remain read-only;
- values are editable through suitable controls;
- arrays can be managed accessibly;
- validation runs client and server side;
- password is checked only server side;
- GitHub token never reaches browser;
- a save creates a traceable commit;
- stale changes cannot overwrite newer content;
- password clears after use;
- editor is excluded from indexing;
- draft/private content is not exposed unintentionally;
- public site remains online if a new build fails;
- a non-developer can update copy without touching code.
