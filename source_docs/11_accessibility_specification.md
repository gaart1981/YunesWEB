# Salimi Engineering — Accessibility Specification

**Document ID:** SE-WEB-11  
**Version:** 1.0  
**Status:** Implementation specification  
**Target repository path:** `/source_docs/11_accessibility_specification.md`

---

## 1. Purpose

This document defines accessibility requirements for the Salimi Engineering website and JSON editor.

The target is practical conformance with **WCAG 2.2 Level AA**, subject to formal audit. This document is an implementation standard, not a legal certification.

Accessibility supports:

- users with visual, motor, auditory and cognitive limitations;
- keyboard-only users;
- older users;
- users on mobile devices;
- users with slow connections;
- search engines and assistive technologies;
- multilingual English, French and Arabic audiences.

---

## 2. Core principles

The implementation must be:

- perceivable;
- operable;
- understandable;
- robust.

Accessibility is not a final testing step. It must be built into:

- design tokens;
- components;
- content;
- forms;
- navigation;
- editor controls;
- testing.

---

## 3. Conformance target

Target:

```text
WCAG 2.2 Level AA
```

Selected enhanced internal targets:

- visible focus stronger than minimum AA expectation;
- common interactive target size approximately 44 × 44 px;
- no normal body text below 14 px;
- no low-contrast decorative text carrying meaning;
- reduced-motion support;
- full keyboard editor workflow.

---

## 4. Document language and direction

Every page must set:

```html
<html lang="en" dir="ltr">
<html lang="fr" dir="ltr">
<html lang="ar" dir="rtl">
```

Requirements:

- language changes inside a page identified where material;
- technical English terms in Arabic handled correctly;
- mixed-direction strings isolated where needed;
- email, phone and codes remain readable;
- page title and metadata match page language.

---

## 5. Semantic structure

Every public page must include:

- one main landmark;
- one H1;
- ordered heading hierarchy;
- semantic navigation;
- footer landmark;
- meaningful sections;
- lists for actual lists;
- buttons for actions;
- links for navigation.

Do not use clickable `div` elements.

Recommended landmarks:

```html
<header>
<nav>
<main>
<section>
<article>
<aside>
<footer>
```

---

## 6. Skip navigation

Every page must provide a first-focus skip link:

```text
Skip to main content
```

Localised in each language.

It must:

- become visible on focus;
- move focus to main content;
- work with sticky header;
- support RTL.

Optional additional skip link:

```text
Skip to contact
```

Only if helpful and consistently available.

---

## 7. Keyboard operation

All interactive functions must work without a mouse.

Required:

- logical tab order;
- no keyboard traps;
- visible focus;
- Escape closes menus/dialogs where appropriate;
- Enter/Space activate controls according to semantic element;
- menu subitems reachable;
- language selector reachable;
- accordion operable;
- editor arrays reorderable without drag;
- validation summary links move focus correctly.

---

## 8. Focus appearance

Use a consistent visible focus token.

Recommended:

```css
outline: 3px solid var(--color-tech-700);
outline-offset: 3px;
```

On dark backgrounds use:

- Warm Sand or White focus indicator;
- sufficient contrast with immediate surroundings.

Do not:

- remove outline without replacement;
- use shadow too subtle to see;
- use colour change alone;
- clip focus ring with overflow.

---

## 9. Target size

Internal design target:

- primary buttons: minimum 48 px high;
- icon buttons: minimum 44 × 44 px;
- navigation links: adequate padding;
- checkboxes: clickable label area;
- mobile menu controls: minimum 44 × 44 px.

Exceptions must still satisfy the applicable WCAG criterion and be documented.

---

## 10. Colour and contrast

### 10.1 Text

Targets:

- normal text: at least 4.5:1;
- large text: at least 3:1;
- prefer higher ratios for body text.

### 10.2 Non-text contrast

Interactive boundaries, focus and meaningful graphics:

- at least 3:1 where required.

### 10.3 Approved brand combinations

Use approved combinations from the Brand Book.

Important:

- Copper `#B0794F` is decorative on light surfaces;
- do not place white normal text on Copper;
- use Dark Copper `#7C4E2F` where a filled accessible accent is required.

### 10.4 Colour independence

Status must include:

- icon;
- label;
- text;
- or shape difference.

Examples:

- form error includes message and error icon;
- editor warning includes `Warning`;
- published status includes text.

---

## 11. Typography and zoom

The site must remain usable at:

- browser zoom 200%;
- text-only scaling where supported;
- narrow reflow equivalent to 320 CSS px.

Requirements:

- no horizontal scrolling for normal page content;
- no clipped headings;
- no text inside fixed-height boxes;
- buttons expand for translated labels;
- navigation adapts rather than overlaps;
- line height remains readable.

Exceptions:

- genuinely two-dimensional technical content, handled with accessible scrolling and explanation.

---

## 12. Reflow and responsive content

At 320 CSS px:

- content remains readable;
- no essential two-column layout;
- tables have an accessible strategy;
- form controls fit viewport;
- editor fields stack;
- no fixed sticky element covers focused content.

Use CSS logical properties for RTL and reflow.

---

## 13. Links

Links must:

- be distinguishable from surrounding text;
- have descriptive labels;
- show visible hover and focus;
- avoid repeated ambiguous `Learn more`;
- indicate external target where helpful;
- not force new windows without warning.

Good:

> View Owner’s Engineering Services

Bad:

> Click here

---

## 14. Buttons

Buttons must:

- have visible text unless icon-only meaning is universally clear;
- include accessible name;
- expose loading state;
- not change label so abruptly that context is lost;
- remain disabled only when necessary;
- explain why action is unavailable if not obvious.

Icon-only editor buttons require tooltips and accessible labels.

---

## 15. Navigation

### Desktop

- submenu opens through keyboard;
- focus can enter and leave;
- hover is not required;
- active page identifiable;
- submenu closure does not unexpectedly move focus.

### Mobile

- menu button exposes expanded state;
- panel has a clear heading or label;
- focus is managed;
- Escape closes;
- close returns focus to menu button;
- background interaction is prevented when modal behaviour is used.

---

## 16. Language selector

Requirements:

- uses language names or clear abbreviations;
- no flag-only representation;
- current language marked programmatically;
- destination language communicated;
- equivalent page route used;
- RTL transition tested.

Suggested accessible label:

```text
Select language
```

---

## 17. Images

### Informative images

- meaningful alt text;
- alt language matches locale;
- no filename as alt;
- no marketing claims in alt.

### Decorative images

- empty alt;
- hidden from assistive technology where appropriate.

### Complex diagrams

Provide:

- short alt;
- adjacent detailed explanation;
- data table or textual equivalent if needed.

### Image text

Avoid text baked into images except logos. Any necessary text must be available as real HTML.

---

## 18. Video and audio

No video or audio is planned for first release.

If introduced later:

- captions;
- transcript;
- controls;
- no autoplay with sound;
- accessible player;
- no essential information only in media.

---

## 19. Motion and animation

Requirements:

- respect `prefers-reduced-motion`;
- no flashing content;
- no parallax required for understanding;
- no auto-advancing carousel;
- no movement triggered by hover only;
- no animation that delays access to text.

Reduced mode:

- remove reveal transitions;
- disable smooth scrolling;
- preserve instant state feedback.

---

## 20. Forms

### 20.1 Labels

Every control has a visible persistent label.

Do not use placeholders as labels.

### 20.2 Instructions

Explain:

- required fields;
- accepted format;
- privacy use;
- optional status.

### 20.3 Errors

Errors must:

- be specific;
- appear near field;
- be linked programmatically;
- appear in an error summary after submission;
- preserve entered values;
- not rely on red only.

Example:

> Enter a valid business email address, such as name@company.com.

### 20.4 Validation timing

Avoid aggressive error display before the user has interacted.

Recommended:

- on blur for clear format issues;
- on submit for complete validation;
- immediate correction update.

### 20.5 Success state

Success must:

- be announced through an appropriate live region;
- not rely on colour;
- explain what happened;
- not promise unavailable response time.

---

## 21. Contact form privacy

- consent checkbox label complete;
- privacy link accessible;
- optional marketing consent separate from required processing consent;
- no preselected optional consent;
- error handling does not expose submitted data.

---

## 22. Editor accessibility

The JSON editor is part of the conformance scope.

Required:

- semantic form groups;
- stable key read aloud;
- help text linked;
- validation summary;
- keyboard array actions;
- dialog focus trap;
- focus restoration;
- Arabic fields in correct direction;
- raw paths and code-like strings readable;
- save result announced;
- conflict resolution understandable.

### 22.1 Key/value relationship

Each control should have:

- visible key;
- human label;
- programmatic label;
- description.

Example accessible name:

```text
Home page, Hero title
```

The raw key may be included in description:

```text
JSON key: hero.title
```

### 22.2 Drag and drop

If drag and drop is implemented:

- keyboard alternative mandatory;
- status announcement after move;
- stable focus.

---

## 23. Dialogs

Password and confirmation dialogs must:

- use semantic dialog role;
- have title;
- have description;
- move focus inside on open;
- constrain focus;
- close on Escape where safe;
- return focus to trigger;
- not close accidentally during submission.

---

## 24. Tables

Avoid tables for general card content.

Where tables are necessary:

- header cells;
- captions where useful;
- proper scope;
- responsive strategy;
- no meaning conveyed only through visual alignment.

For mobile:

- horizontal scrolling with visible affordance; or
- transformed labelled list if semantics remain correct.

---

## 25. Status messages

Use appropriate live regions for:

- form submission;
- editor save;
- validation completion;
- conflict;
- load error.

Do not announce every keystroke or character count continuously.

---

## 26. Time limits

No user-facing time limit is planned.

If rate-limit or session behaviour is introduced:

- explain it;
- allow recovery;
- do not lose content unexpectedly.

---

## 27. Authentication error handling

The save password failure must:

- use generic text;
- be announced;
- preserve edited content;
- return focus appropriately;
- not reveal whether a specific account exists, because no accounts exist.

---

## 28. Content readability

Writing requirements:

- concise paragraphs;
- descriptive headings;
- limited jargon;
- acronyms expanded on first relevant use;
- consistent terminology;
- lists where structure benefits;
- no all-caps paragraphs.

French and Arabic text require equivalent readability, not compressed translations.

---

## 29. Arabic accessibility

Additional checks:

- screen-reader language pronunciation;
- correct DOM order;
- correct visual order;
- mixed Latin/Arabic punctuation;
- telephone and email isolation;
- arrow mirroring;
- form error placement;
- number input direction;
- project codes remain understandable.

Do not reverse the wordmark.

---

## 30. PDF and downloadable documents

Future documents should:

- be tagged and accessible where practical;
- have descriptive link text;
- identify file type and size;
- not contain essential information unavailable in HTML.

Example:

> Download the capability statement — PDF, 2.1 MB

---

## 31. Third-party content

Any third-party tool must be audited:

- cookie banner;
- analytics;
- map;
- form protection;
- embedded LinkedIn or video;
- chat widget.

Prefer links over inaccessible embeds.

No third-party widget is exempt from accessibility review.

---

## 32. Automated testing

Required automated checks:

- axe-core or equivalent on key routes;
- semantic landmark checks;
- colour token contrast audit;
- form label checks;
- missing alt checks;
- invalid ARIA checks.

Automated testing does not replace manual testing.

---

## 33. Manual testing matrix

Test at minimum:

### Keyboard

- complete public navigation;
- language switching;
- service links;
- contact form;
- editor load/edit/save;
- dialogs;
- array reorder.

### Screen reader

At least one desktop combination:

- NVDA + current Chrome or Firefox on Windows.

At least one mobile combination where available:

- TalkBack + Android Chrome.

Optional:

- VoiceOver + Safari.

### Zoom and reflow

- 200% zoom;
- 320 CSS px;
- large text;
- portrait and landscape mobile.

### Motion

- reduced motion setting.

### Languages

- English;
- French;
- Arabic RTL.

---

## 34. Accessibility statement

A short accessibility statement may be added after audit.

It should include:

- target standard;
- known limitations;
- contact method for reporting barriers;
- last review date.

Do not claim full compliance before testing.

---

## 35. Content editor guidance

The editor should provide content warnings when:

- link text is generic;
- alt text is missing;
- heading is empty;
- all-caps text is excessive;
- an image contains text without equivalent;
- a CTA label is unclear.

These may be warnings rather than hard blockers.

---

## 36. Accessibility source references

Current official references to verify during implementation:

- WCAG 2.2: `https://www.w3.org/TR/WCAG22/`
- WAI WCAG overview: `https://www.w3.org/WAI/standards-guidelines/wcag/`
- WCAG 2.2 understanding documents: `https://www.w3.org/WAI/WCAG22/Understanding/`

---

## 37. Acceptance criteria

The accessibility implementation is accepted when:

- key routes pass automated checks without serious violations;
- all content is keyboard reachable;
- focus is visible;
- headings and landmarks are logical;
- forms have labels and recoverable errors;
- language and direction are correct;
- Arabic mixed-direction content is tested;
- content reflows at 320 CSS px;
- 200% zoom remains usable;
- reduced motion works;
- editor arrays can be managed without dragging;
- password dialog manages focus;
- no false conformance claim is published;
- remaining issues are documented with remediation.
