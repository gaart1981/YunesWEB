# Salimi Engineering — Component Library Specification

**Document ID:** SE-WEB-07  
**Version:** 1.0  
**Status:** Implementation specification  
**Target repository path:** `/source_docs/07_component_library_specification.md`

---

## 1. Purpose

This document defines the reusable interface components required for the Salimi Engineering website.

The component library must:

- reproduce the approved visual system;
- render all public content from JSON;
- support English, French and Arabic;
- support RTL;
- prevent inconsistent one-off layouts;
- remain sufficiently flexible to avoid a generic template appearance;
- expose predictable props and states;
- meet accessibility requirements.

No external visual component library should define the public visual identity.

---

## 2. Component architecture principles

1. **Content and presentation are separated.**
2. **Components receive typed data, not file paths or arbitrary JSON access.**
3. **Every component has a stable purpose.**
4. **Variants are limited and documented.**
5. **Business text is never embedded in the component.**
6. **Directionality is inherited from locale context.**
7. **Components fail safely when optional data is absent.**
8. **A component is not created for a single paragraph unless it expresses a reusable pattern.**

---

## 3. Recommended directory structure

```text
/components/
├── primitives/
│   ├── Button/
│   ├── TextLink/
│   ├── Container/
│   ├── Section/
│   ├── Surface/
│   ├── Icon/
│   ├── Badge/
│   └── Divider/
├── navigation/
│   ├── Header/
│   ├── MobileNavigation/
│   ├── LanguageSwitcher/
│   ├── Breadcrumbs/
│   └── Footer/
├── content/
│   ├── PageHero/
│   ├── RichText/
│   ├── ServiceCard/
│   ├── ProjectCard/
│   ├── SectorCard/
│   ├── TrustPoint/
│   ├── ProcessSteps/
│   ├── FounderIntro/
│   ├── FounderMessage/
│   ├── RelatedLinks/
│   ├── FinalCTA/
│   └── ImagePlaceholder/
├── forms/
│   ├── Field/
│   ├── SelectField/
│   ├── TextAreaField/
│   ├── CheckboxField/
│   ├── FormMessage/
│   └── ContactForm/
├── editor/
│   ├── EditorShell/
│   ├── EditorToolbar/
│   ├── FieldRenderer/
│   ├── ArrayEditor/
│   ├── SavePasswordDialog/
│   ├── ValidationSummary/
│   └── DiffPreview/
└── layout/
    ├── PageShell/
    ├── ContentSplit/
    ├── CardGrid/
    └── MediaFrame/
```

---

## 4. Primitive components

### 4.1 `Container`

**Purpose:** Maintain page alignment and maximum widths.

Props:

```ts
type ContainerProps = {
  width?: "full" | "content" | "reading";
  as?: "div" | "section" | "article";
  className?: string;
  children: React.ReactNode;
};
```

Rules:

- `content`: max 1240 px;
- `reading`: max 760 px;
- edge padding uses responsive tokens;
- no business content.

### 4.2 `Section`

Props:

```ts
type SectionProps = {
  id?: string;
  tone?: "light" | "white" | "dark" | "sand";
  spacing?: "standard" | "compact" | "large";
  ariaLabelledBy?: string;
  children: React.ReactNode;
};
```

Rules:

- section tone maps to semantic tokens;
- section headings must be linked with `aria-labelledby` where applicable;
- no arbitrary raw background colours.

### 4.3 `Button`

Variants:

- `primary`;
- `secondary`;
- `inverse`;
- `text`.

Sizes:

- `md`;
- `lg`.

States:

- default;
- hover;
- focus-visible;
- pressed;
- disabled;
- loading.

Props:

```ts
type ButtonProps = {
  label: string;
  href?: string;
  type?: "button" | "submit";
  variant?: "primary" | "secondary" | "inverse" | "text";
  size?: "md" | "lg";
  icon?: IconName;
  iconPosition?: "start" | "end";
  analyticsId?: string;
  disabled?: boolean;
  loading?: boolean;
};
```

If `href` exists, render semantic link. Otherwise render button.

### 4.4 `TextLink`

- descriptive label;
- optional directional arrow;
- underline or visible state;
- arrow direction adapts to RTL;
- never rely on colour alone.

### 4.5 `Badge`

Use only for:

- project sector;
- relationship disclosure;
- page status in editor;
- metadata.

Do not use as decorative labels on every card.

---

## 5. Navigation components

### 5.1 `Header`

Data source:

- locale navigation JSON;
- shared company JSON.

Required behaviour:

- desktop and mobile modes;
- active page state;
- accessible submenu;
- language selector;
- primary CTA;
- optional solid-on-scroll mode;
- no layout shift;
- closes mobile menu on route change or Escape.

Visual variants:

- `light`;
- `darkOverlay`;
- `solidDark`.

Default internal-page mode: `light`.

### 5.2 `MobileNavigation`

Requirements:

- full-screen or large controlled panel;
- focus trap while open;
- close button;
- Escape closes;
- body scroll controlled;
- language switch visible;
- CTA visible;
- menu hierarchy no deeper than two levels.

### 5.3 `LanguageSwitcher`

Props:

```ts
type LanguageSwitcherProps = {
  currentLocale: "en" | "fr" | "ar";
  alternatives: Array<{
    locale: "en" | "fr" | "ar";
    label: string;
    href: string;
  }>;
};
```

Requirements:

- equivalent page routes;
- current language marked;
- language names understandable;
- keyboard accessible;
- not a flag selector;
- `hreflang` handled separately in metadata.

### 5.4 `Breadcrumbs`

- hidden on homepage;
- semantic `<nav aria-label>`;
- ordered list;
- final item not linked;
- JSON-LD produced by SEO layer, not by visual component;
- wraps gracefully on mobile.

### 5.5 `Footer`

Data:

- global locale JSON;
- company JSON;
- route map.

Must include:

- wordmark;
- descriptor;
- service links;
- company links;
- contact information if available;
- legal links;
- language-aware copyright.

Empty contact values must not render.

---

## 6. Page hero components

### 6.1 `PageHero`

Variants:

- `homeSplit`;
- `internalText`;
- `internalMedia`;
- `darkStatement`.

Props:

```ts
type PageHeroProps = {
  eyebrow?: string;
  title: string;
  summary?: string;
  primaryCta?: CTA;
  secondaryCta?: CTA;
  media?: MediaAsset;
  variant: "homeSplit" | "internalText" | "internalMedia" | "darkStatement";
  trustNote?: string;
};
```

Rules:

- one H1;
- no carousel;
- title line length controlled;
- media does not precede key text on mobile;
- hero height based on content, not forced to 100vh;
- large display type only where copy length permits.

### 6.2 `ImagePlaceholder`

Props:

```ts
type ImagePlaceholderProps = {
  label: string;
  expectedPath: string;
  aspectRatio: string;
  alt?: string;
  tone?: "light" | "dark";
};
```

Must show an intentional branded placeholder and preserve layout dimensions.

---

## 7. Card components

### 7.1 `ServiceCard`

Variants:

- `summary`;
- `detailed`;
- `dark`.

Required fields:

- service ID;
- title;
- short description;
- client outcome or problem;
- href;
- icon optional.

Interaction:

- whole card may be linked if semantics remain valid;
- visible focus ring;
- no excessive lift animation.

### 7.2 `ProjectCard`

Required fields:

- title;
- relationship disclosure;
- location;
- period;
- role;
- sector;
- image or placeholder;
- short scope;
- optional detail expansion.

Variants:

- `featured`;
- `standard`;
- `compact`.

Rules:

- relationship type must never be visually hidden;
- image permission controls rendering;
- project role must remain visible;
- not all cards must have identical height if it harms readability;
- card may expand inline, not through inaccessible hover-only behaviour.

### 7.3 `SectorCard`

Fields:

- title;
- summary;
- image;
- related service labels;
- href optional.

Visual:

- calmer than service cards;
- image-led only when real images exist;
- placeholder remains branded.

### 7.4 `TrustPoint`

Fields:

- title;
- description;
- optional icon;
- optional evidence link.

Avoid unsupported numbers.

---

## 8. Content components

### 8.1 `SectionHeading`

Props:

```ts
type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  summary?: string;
  align?: "start" | "center";
  width?: "reading" | "wide";
};
```

Centre alignment should be used sparingly.

### 8.2 `RichText`

- renders sanitised Markdown;
- supports headings H2–H4, lists, links and emphasis;
- never renders raw HTML;
- respects reading width;
- external links marked and secure.

### 8.3 `ProcessSteps`

Variants:

- horizontal desktop;
- vertical mobile;
- numbered;
- no animated timeline required.

Fields:

- stable step ID;
- title;
- description;
- optional deliverable.

### 8.4 `FounderIntro`

Fields:

- portrait;
- name;
- title;
- summary;
- quotation;
- CTA.

Required:

- founder name visible;
- portrait placeholder supported;
- no fake signature graphic.

### 8.5 `FounderMessage`

Layout:

- reading-width first-person text;
- optional portrait/detail;
- name and title;
- visual quotation mark optional but restrained.

No carousel or testimonial styling.

### 8.6 `RelatedLinks`

- two to four relevant links;
- descriptive titles;
- optional short explanations;
- used near page end;
- not an unstructured tag cloud.

### 8.7 `FinalCTA`

Variants:

- dark;
- sand;
- split.

Fields:

- title;
- summary;
- primary CTA;
- optional secondary CTA.

Rules:

- maximum two actions;
- one strong visual anchor;
- full-width but not oversized.

---

## 9. Grid and split components

### 9.1 `CardGrid`

Props:

```ts
type CardGridProps = {
  columns?: {
    mobile: 1 | 2;
    tablet: 1 | 2 | 3;
    desktop: 2 | 3 | 4;
  };
  children: React.ReactNode;
};
```

Avoid forcing equal heights when content differs significantly.

### 9.2 `ContentSplit`

Variants:

- 6/6;
- 7/5;
- 5/7;
- 8/4.

Must:

- preserve reading order in DOM;
- support optional visual reversal without changing semantic order;
- adapt to RTL;
- stack with text first where appropriate.

### 9.3 `MediaFrame`

- enforces aspect ratio;
- renders image or placeholder;
- supports focal point;
- uses responsive image sizing;
- provides optional caption;
- never relies on CSS background for meaningful images.

---

## 10. Form components

### 10.1 `Field`

Common props:

```ts
type FieldProps = {
  id: string;
  label: string;
  helpText?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
};
```

Requirements:

- persistent label;
- programmatic association;
- error linkage through `aria-describedby`;
- required indicator explained.

### 10.2 `SelectField`

- native select preferred unless requirements justify custom;
- options from JSON;
- no empty inaccessible placeholder selection;
- long French and Arabic labels tested.

### 10.3 `TextAreaField`

- minimum 144 px;
- optional character count;
- does not resize below minimum;
- preserves line breaks.

### 10.4 `CheckboxField`

- minimum 24 px visual box;
- complete label clickable;
- visible focus;
- consent copy links to privacy page.

### 10.5 `ContactForm`

Data sources:

- form configuration JSON;
- server endpoint configuration.

States:

- idle;
- validating;
- submitting;
- success;
- recoverable error;
- server error.

Requirements:

- preserve entered values after recoverable errors;
- spam protection invisible where possible;
- no confidential-file upload in first release;
- analytics event only after confirmed success;
- success message does not expose user data.

---

## 11. Editor components

### 11.1 `EditorShell`

Purpose:

- display page identity, locale and status;
- house field editor;
- remain visually separate from public site;
- no search indexing.

### 11.2 `EditorToolbar`

Actions:

- return to public page;
- reset unsaved changes;
- validate;
- preview diff;
- apply changes.

Shows:

- locale;
- page ID;
- dirty state;
- validation status;
- last loaded Git SHA if available.

### 11.3 `FieldRenderer`

Maps schema field types to approved controls.

Must never render:

- raw executable code editor;
- editable key names;
- secrets;
- server configuration.

### 11.4 `ArrayEditor`

Supports:

- reorder;
- add permitted item;
- remove permitted item;
- duplicate item;
- collapsed item summary.

Stable IDs:

- autogenerated only where schema allows;
- never regenerated during reorder;
- deletion requires confirmation for published items.

### 11.5 `DiffPreview`

Shows:

- previous value;
- proposed value;
- added/removed fields;
- no secret values.

For non-technical users, default to readable field-level diff, not raw JSON diff.

### 11.6 `SavePasswordDialog`

- modal only after validation passes;
- password field;
- no password persistence;
- no browser autofill recommendation if not necessary;
- generic error response;
- submit disabled during request;
- Escape closes before submission;
- focus restored after close.

### 11.7 `ValidationSummary`

- top-level error summary;
- links to invalid fields;
- errors written in plain language;
- warnings distinct from blocking errors.

---

## 12. Component-to-JSON mapping

Each section type must map to one component.

Example registry:

```ts
const sectionRegistry = {
  richText: RichTextSection,
  serviceCards: ServiceCardsSection,
  projectCards: ProjectCardsSection,
  sectorCards: SectorCardsSection,
  trustPoints: TrustPointsSection,
  processSteps: ProcessStepsSection,
  founderIntro: FounderIntroSection,
  founderMessage: FounderMessageSection,
  relatedLinks: RelatedLinksSection,
  callout: CalloutSection,
};
```

Unknown section types must not render silently.

---

## 13. Loading and error states

Public pages built from repository JSON should normally render statically.

Where client-side state exists:

- use skeletons only if content is genuinely asynchronous;
- avoid simulated loading;
- preserve layout dimensions;
- show language-appropriate errors;
- never show stack traces.

Editor:

- show explicit loading state;
- distinguish load error, validation error, conflict and save error.

---

## 14. Responsive behaviour matrix

| Component | Desktop | Tablet | Mobile |
|---|---|---|---|
| Header | Full nav | Reduced nav | Menu panel |
| Hero split | Two columns | Two or stacked | Text then media |
| Service cards | 3 columns | 2 columns | 1 column |
| Project cards | 2–3 columns | 2 columns | 1 column |
| Process steps | Horizontal | 2-column/vertical | Vertical |
| Founder intro | Split | Split | Portrait then text |
| Footer | 4 columns | 2 columns | 1 column |
| Editor | Key + field columns | Reduced columns | Stacked fields |

---

## 15. RTL requirements by component

All layout components must use logical CSS properties where possible:

- `margin-inline`;
- `padding-inline`;
- `border-inline-start`;
- `inset-inline`;
- `text-align: start`.

Directional icons:

- arrows mirror;
- chevrons mirror;
- telephone, email and neutral icons do not;
- project timelines follow locale direction only when semantically appropriate.

---

## 16. Component visual QA

Each public component requires review in:

- light surface;
- dark surface where supported;
- English;
- French;
- Arabic RTL;
- mobile 360 px;
- tablet 768 px;
- desktop 1440 px;
- keyboard focus;
- long content;
- missing optional content;
- placeholder image state;
- real image state.

---

## 17. Public component restrictions

Do not introduce:

- generic dashboard cards;
- UI-library default buttons;
- tabs for critical content on mobile;
- hidden hover-only information;
- carousels;
- infinite scrolling;
- masonry layout;
- animated backgrounds;
- public modals for normal page reading;
- icon-only navigation without labels.

---

## 18. Acceptance criteria

The component library is accepted when:

- all first-release blueprints can be built without one-off page code;
- components remain visually distinctive;
- no visible business text is hardcoded;
- every component supports RTL where relevant;
- form states are complete;
- editor components cannot modify protected keys;
- long French and Arabic content does not break layouts;
- placeholders look intentional;
- components have semantic HTML;
- focus states are visible;
- the public site does not resemble an unmodified template.
