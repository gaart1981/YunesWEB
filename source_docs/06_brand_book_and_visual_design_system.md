# Salimi Engineering — Brand Book and Visual Design System

**Document ID:** SE-WEB-06  
**Version:** 1.0  
**Status:** Implementation specification  
**Target repository path:** `/source_docs/06_brand_book_and_visual_design_system.md`

---

## 1. Purpose

This document defines the visual identity and interface design system for the Salimi Engineering website.

The objective is not merely to produce a visually attractive site. The design must create a specific commercial perception:

- technically competent;
- reliable;
- internationally credible;
- locally established in Morocco;
- personally accountable;
- controlled and precise;
- sufficiently premium for investors, engineering firms, developers and EPC contractors.

The website must feel like a carefully designed business instrument, not a generic template, construction catalogue or freelancer portfolio.

---

## 2. Brand design concept

### 2.1 Core design idea

> **Quiet engineering confidence**

The visual identity must communicate confidence through restraint, proportion and precision. It must not attempt to appear expensive through excessive decoration, gold effects, large animations or luxury clichés.

The premium perception must come from:

- disciplined spacing;
- strong typography;
- a limited colour system;
- excellent alignment;
- meaningful photography;
- controlled motion;
- concise copy;
- exact component states;
- consistent image treatment;
- technically credible details.

### 2.2 Intended emotional response

Within the first 15 seconds, the visitor should feel:

1. this company understands serious technical projects;
2. the founder will be personally accountable;
3. the company can communicate with international organisations;
4. the site is controlled, coherent and trustworthy;
5. the company is selective and professional rather than improvised.

### 2.3 Brand personality

Primary attributes:

- assured;
- precise;
- considered;
- pragmatic;
- architectural;
- discreet;
- international;
- dependable.

Secondary attributes:

- modern;
- human;
- flexible;
- locally grounded.

Attributes to avoid:

- flashy;
- aggressive;
- playful;
- futuristic;
- bureaucratic;
- generic;
- luxurious in a decorative sense;
- visually nationalistic;
- oversized-corporation imitation.

---

## 3. Visual positioning

The website should visually sit between:

- an international engineering consultancy;
- an owner’s advisory firm;
- a boutique technical project partner.

It must not resemble:

- a residential contractor;
- a real-estate agency;
- a general construction marketplace;
- a technology start-up;
- an architecture magazine;
- a governmental institution;
- a personal CV website.

---

## 4. Logo direction

### 4.1 Initial wordmark

Until a separate logo design is commissioned, use a typographic wordmark:

```text
SALIMI
ENGINEERING
```

or horizontally:

```text
SALIMI ENGINEERING
```

Recommended hierarchy:

- `SALIMI`: stronger weight;
- `ENGINEERING`: lighter weight or increased tracking;
- no decorative icon required at launch.

### 4.2 Optional mark concept

A future symbol may be developed from:

- structural alignment lines;
- an abstract `S`;
- a controlled grid intersection;
- a technical plan reference;
- an engineering datum or axis.

The symbol must not use:

- gears;
- lightning bolts;
- house roofs;
- hard hats;
- cranes;
- globes;
- Moroccan map silhouettes;
- flags;
- generic circuit icons.

### 4.3 Clear space

Minimum clear space around the wordmark:

- equal to the cap height of the letter `S`;
- no nearby text, border or image may enter this area.

### 4.4 Minimum sizes

- desktop header wordmark: minimum 154 px wide;
- mobile header wordmark: minimum 132 px wide;
- favicon: simplified `S` or `SE`, not the full wordmark.

---

## 5. Colour system

### 5.1 Primary palette

| Token | Name | HEX | Intended use |
|---|---|---:|---|
| `--color-ink-950` | Ink Navy | `#0B1826` | Main dark background, headings, footer |
| `--color-slate-900` | Deep Slate | `#172532` | Secondary dark surfaces |
| `--color-steel-700` | Steel | `#53616D` | Secondary text, dividers, metadata |
| `--color-porcelain-50` | Porcelain | `#F6F4EF` | Main warm page background |
| `--color-white` | White | `#FFFFFF` | Cards, inverse text, clean surfaces |

### 5.2 Accent palette

| Token | Name | HEX | Intended use |
|---|---|---:|---|
| `--color-sand-300` | Warm Sand | `#D8C5A5` | Premium warm accent, selected surfaces |
| `--color-copper-600` | Dark Copper | `#7C4E2F` | Accessible accent text and borders |
| `--color-copper-400` | Copper | `#B0794F` | Decorative accent only on light backgrounds |
| `--color-tech-700` | Technical Blue | `#2F6480` | Links, focus-supporting accents, diagrams |

### 5.3 Functional colours

| Token | Name | HEX |
|---|---|---:|
| `--color-success-700` | Success | `#256348` |
| `--color-warning-700` | Warning | `#865B12` |
| `--color-danger-700` | Error | `#9A2F2F` |
| `--color-info-700` | Information | `#2F6480` |
| `--color-border-light` | Light border | `#D9D8D3` |
| `--color-border-dark` | Dark border | `#40505E` |

Functional colour must never be the only means of communicating status.

### 5.4 Contrast guidance

Approved high-confidence combinations:

- Ink Navy on White;
- Ink Navy on Porcelain;
- White on Ink Navy;
- White on Deep Slate;
- Warm Sand on Deep Slate for large or standard text;
- White on Technical Blue;
- White on Dark Copper;
- Steel on White or Porcelain.

Copper `#B0794F` must not be used for normal-sized white button text because the contrast is insufficient. Use Dark Copper `#7C4E2F` for accessible filled buttons or use Copper only as a line, icon or non-text decorative accent.

### 5.5 Colour distribution

Recommended visual balance:

- 55–65% Porcelain or White;
- 20–30% Ink Navy or Deep Slate;
- 8–12% neutral Steel and borders;
- 3–6% Sand, Copper or Technical Blue accents.

Accent colours must remain scarce. Their rarity is part of the premium effect.

### 5.6 Prohibited colour use

Do not:

- use red and green together as a flag-based theme;
- use bright electric blue gradients;
- use gold metallic effects;
- use pure black `#000000` as the dominant background;
- use more than one accent colour in the same component;
- use coloured backgrounds behind every section;
- create rainbow charts or icon sets.

---

## 6. Typography

### 6.1 Latin typeface

Primary Latin typeface:

> **Manrope**

Use for:

- headings;
- body text;
- navigation;
- buttons;
- captions;
- data labels.

Reasons:

- precise geometric structure;
- modern but not fashionable;
- strong readability;
- suitable for engineering and corporate use;
- available in multiple weights;
- supports a coherent single-family system.

### 6.2 Arabic typeface

Primary Arabic typeface:

> **Noto Sans Arabic**

Use for all Arabic-script content. It must be loaded only where required or through an optimised framework font loader.

### 6.3 Fallback stacks

Latin:

```css
font-family: "Manrope", "Segoe UI", Arial, sans-serif;
```

Arabic:

```css
font-family: "Noto Sans Arabic", Tahoma, Arial, sans-serif;
```

### 6.4 Weights

Approved weights:

- 400 — body;
- 500 — labels and navigation;
- 600 — subheadings and buttons;
- 700 — primary headings.

Avoid:

- 300 for body text;
- 800 or 900 except an approved wordmark treatment;
- mixing more than four weights.

### 6.5 Type scale

Desktop reference scale:

| Token | Size | Line height | Weight | Use |
|---|---:|---:|---:|---|
| `display-xl` | clamp(3.5rem, 6vw, 6.75rem) | 0.98 | 600 | Exceptional homepage statement only |
| `display-lg` | clamp(2.75rem, 5vw, 5.25rem) | 1.02 | 600 | Homepage H1 |
| `heading-1` | clamp(2.4rem, 4vw, 4.25rem) | 1.05 | 600 | Internal page H1 |
| `heading-2` | clamp(1.9rem, 3vw, 3rem) | 1.12 | 600 | Section heading |
| `heading-3` | clamp(1.35rem, 2vw, 1.75rem) | 1.25 | 600 | Card and subsection heading |
| `body-lg` | 1.1875rem | 1.65 | 400 | Lead text |
| `body-md` | 1rem | 1.65 | 400 | Standard body |
| `body-sm` | 0.875rem | 1.55 | 400 | Supporting text |
| `label` | 0.75rem | 1.3 | 600 | Eyebrows and metadata |

### 6.6 Tracking

- large display headings: `-0.035em` to `-0.02em`;
- standard headings: `-0.02em`;
- body: `0`;
- uppercase eyebrow: `0.12em`;
- wordmark `ENGINEERING`: `0.16em` maximum.

### 6.7 Line length

- body text: 55–72 characters;
- lead paragraph: maximum 62 characters;
- founder message: 60–75 characters;
- legal text: maximum 80 characters.

### 6.8 Typography hierarchy

Every page must have:

- one H1;
- logically ordered H2 and H3;
- no heading chosen only for visual size;
- visually distinct eyebrow, title and summary;
- generous separation between heading and body.

---

## 7. Layout grid

### 7.1 Container

Maximum content width:

```css
--container-max: 1440px;
```

Primary reading/content width:

```css
--content-max: 1240px;
```

Narrow reading width:

```css
--reading-max: 760px;
```

Side padding:

```css
clamp(20px, 4vw, 72px)
```

### 7.2 Desktop grid

- 12 columns;
- 24 px gutter at 1024–1279 px;
- 32 px gutter from 1280 px;
- major content starts on intentional column boundaries;
- asymmetric layouts are permitted but must remain aligned to the grid.

### 7.3 Tablet grid

- 8 columns;
- 24 px gutters;
- complex split blocks may become 5/3 or 4/4.

### 7.4 Mobile grid

- 4 columns;
- 16 px gutter;
- minimum 20 px page edge;
- most blocks become single-column.

### 7.5 Breakpoints

Recommended:

```text
sm: 640 px
md: 768 px
lg: 1024 px
xl: 1280 px
2xl: 1536 px
```

Breakpoints must be used according to content behaviour, not device names alone.

---

## 8. Spacing system

Base unit:

```text
4 px
```

Approved spacing tokens:

```text
4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, 120, 160 px
```

Recommended section spacing:

- desktop: 96–160 px;
- tablet: 80–112 px;
- mobile: 64–88 px.

Premium appearance requires whitespace. Do not compress sections to fit more content above the fold.

---

## 9. Surfaces, borders and radii

### 9.1 Border radius

The visual language should be precise, not soft or app-like.

Recommended tokens:

```text
--radius-sm: 4px
--radius-md: 8px
--radius-lg: 12px
--radius-pill: 999px
```

Usage:

- cards: 8–12 px;
- inputs: 6–8 px;
- buttons: 6–8 px;
- status tags: pill only.

Avoid:

- 20–32 px card radii;
- rounded containers on every section;
- bubble-like forms.

### 9.2 Borders

Use thin, quiet borders:

- light surface: `1px solid #D9D8D3`;
- dark surface: `1px solid #40505E`;
- selected state: 1–2 px Technical Blue or Dark Copper.

### 9.3 Shadows

Use shadows rarely.

Approved shadow:

```css
0 18px 50px rgba(11, 24, 38, 0.08)
```

Small interaction shadow:

```css
0 8px 24px rgba(11, 24, 38, 0.09)
```

No strong black drop shadows. Most cards should rely on borders and spacing rather than elevation.

---

## 10. Section rhythm

Pages should alternate between:

1. open Porcelain or White sections;
2. one strong dark section;
3. evidence-rich light sections;
4. a controlled final CTA.

Do not alternate background colour mechanically after every section.

Recommended homepage rhythm:

- dark or split hero;
- light audience/services;
- warm neutral evidence section;
- dark founder or delivery section;
- light projects/sectors;
- dark final CTA.

---

## 11. Photography direction

### 11.1 Required character

Future photography should feel:

- real;
- technically specific;
- composed;
- naturally lit;
- architectural;
- documentary rather than promotional;
- connected to the actual company or founder.

### 11.2 Preferred subjects

- Yunes Salimi in a professional, neutral environment;
- technical discussions;
- site inspections;
- electrical installations;
- controlled infrastructure views;
- technical drawings and details;
- industrial and MEP systems;
- Moroccan project context without tourism clichés.

### 11.3 Founder portrait

Preferred:

- vertical 4:5;
- neutral or site-related environment;
- direct but calm expression;
- eye-level camera;
- natural posture;
- dark blue, grey, white or earth-tone clothing;
- no visible employer branding;
- no hard hat unless genuinely on site;
- uncluttered background.

Avoid:

- crossed-arms corporate cliché;
- artificial white studio cut-out;
- exaggerated smile;
- luxury office;
- smartphone portrait mode artifacts;
- unrelated construction background.

### 11.4 Image treatment

- neutral to slightly warm colour grading;
- controlled saturation;
- deep but readable shadows;
- consistent crop system;
- no heavy overlays;
- no duotone effect on all images;
- optional fine technical line annotation only when meaningful.

---

## 12. Placeholder design

Until real images are available, use branded placeholders.

### 12.1 Placeholder appearance

- Porcelain or Steel background;
- thin technical grid or datum lines;
- image role label;
- expected file path;
- aspect ratio maintained;
- small category marker;
- no fake generated photography.

Example:

```text
FOUNDER PORTRAIT
/public/images/founder/yunes-salimi.webp
4:5
```

### 12.2 Placeholder tokens

- background: Porcelain or Deep Slate;
- label: Ink Navy or White;
- technical line: Steel at 20–30% opacity;
- accent: one Dark Copper line;
- monospaced system font permitted for file path only.

The placeholders should make the unfinished website still appear intentional.

---

## 13. Iconography

### 13.1 Style

- 1.5–1.75 px stroke;
- geometric;
- simple;
- no filled cartoon icons;
- consistent optical size;
- maximum two levels of detail.

Recommended implementation:

- Lucide icon set;
- selected subset only;
- all icons wrapped in project components.

### 13.2 Icon use

Icons may support:

- service categories;
- contact methods;
- process steps;
- metadata;
- editor controls.

Icons must not replace clear labels.

---

## 14. Buttons and links

### 14.1 Primary button

- Ink Navy background on light surfaces;
- White text;
- height: 48–52 px;
- horizontal padding: 24–28 px;
- radius: 6–8 px;
- weight: 600;
- optional right arrow.

Hover:

- subtle shift to Deep Slate or Technical Blue;
- no large movement;
- arrow may move 2–3 px.

### 14.2 Inverse primary button

- Warm Sand background on dark surface;
- Ink Navy text.

### 14.3 Secondary button

- transparent;
- 1 px border;
- Ink Navy text;
- controlled background on hover.

### 14.4 Text link

- descriptive text;
- underline offset;
- visible hover and focus;
- no `Learn more` where a specific label is possible.

---

## 15. Motion

### 15.1 Principle

Motion must demonstrate control, not entertainment.

Allowed:

- 150–240 ms colour transitions;
- 200–320 ms restrained section reveal;
- 2–4 px arrow or underline movement;
- subtle image scale up to 1.015 on hover;
- navigation opening and closing.

Avoid:

- parallax;
- scroll hijacking;
- auto-playing carousels;
- large object movement;
- animated counters without evidence;
- loading animations that delay content;
- continuous decorative motion.

### 15.2 Reduced motion

When `prefers-reduced-motion: reduce` is active:

- remove non-essential movement;
- remove smooth scrolling;
- keep state changes immediate and understandable.

---

## 16. Data and technical diagrams

Where diagrams are used:

- use thin strokes;
- use Ink Navy, Steel and one accent;
- show actual relationships;
- label all units;
- avoid decorative pseudo-data;
- maintain accessible text alternatives.

Technical plan fragments may be used as low-opacity background motifs only when they are real or clearly abstract.

---

## 17. Forms

Forms must look controlled and professional.

- label always visible above field;
- no placeholder-only labels;
- field height minimum 48 px;
- border clearly visible;
- focus ring 2–3 px;
- errors placed immediately below field;
- required status explained;
- optional fields marked explicitly;
- text areas minimum 144 px high;
- submit state shows progress without disabling context.

---

## 18. Header

### Desktop

- height: 76–88 px;
- transparent or dark over hero only if contrast is guaranteed;
- transitions to solid surface on scroll only if implemented without layout shift;
- wordmark left;
- navigation centred or right;
- language selector;
- primary CTA.

### Mobile

- height: 64–72 px;
- wordmark;
- language access;
- menu button;
- no oversized sticky CTA blocking content.

---

## 19. Footer

The footer should be a strong dark closing surface.

- Ink Navy background;
- White and Warm Sand text;
- clear service links;
- company descriptor;
- direct contact;
- legal links;
- sufficient vertical spacing;
- no giant decorative logo;
- no newsletter unless a real process exists.

---

## 20. Arabic RTL adaptation

Arabic design is not created by applying `text-align: right` only.

Requirements:

- reverse major layout flows where semantically appropriate;
- preserve numbers and Latin technical codes correctly;
- mirror directional arrows;
- keep logo unchanged;
- adapt line length;
- verify Arabic font weight and vertical alignment;
- maintain the same premium whitespace;
- avoid compressed Arabic text;
- test mixed-language content.

---

## 21. Responsive visual rules

### Mobile priorities

1. positioning statement;
2. service relevance;
3. founder credibility;
4. selected evidence;
5. contact action.

On mobile:

- avoid decorative side content before key text;
- keep paragraph width readable;
- use full-width media;
- maintain 20–24 px horizontal padding;
- do not shrink desktop typography mechanically;
- cards may become edge-to-edge only where intentional.

---

## 22. Design anti-patterns

The implementation must be rejected if it uses:

- generic stock construction hero;
- dark blue gradient across every page;
- excessive rounded cards;
- glassmorphism;
- neon accents;
- animated numbers without verified data;
- floating decorative blobs;
- full-page video;
- arbitrary icons in coloured circles;
- testimonials that do not exist;
- fake partner logo strips;
- copied template section order;
- identical card grids for every content type;
- three-column layouts on narrow mobile screens;
- low-contrast grey text;
- large red/green flag motif.

---

## 23. Design token implementation

Design tokens must be defined centrally as CSS custom properties.

Example:

```css
:root {
  --color-ink-950: #0B1826;
  --color-slate-900: #172532;
  --color-steel-700: #53616D;
  --color-porcelain-50: #F6F4EF;
  --color-white: #FFFFFF;
  --color-sand-300: #D8C5A5;
  --color-copper-600: #7C4E2F;
  --color-tech-700: #2F6480;

  --font-latin: "Manrope", "Segoe UI", Arial, sans-serif;
  --font-arabic: "Noto Sans Arabic", Tahoma, Arial, sans-serif;

  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;

  --container-max: 1440px;
  --content-max: 1240px;
  --reading-max: 760px;
}
```

Components must use semantic tokens rather than repeating raw colour values.

---

## 24. Visual QA criteria

The visual implementation is accepted only when:

- all pages feel part of one system;
- the homepage has a clear visual hierarchy;
- real and placeholder images use consistent ratios;
- dark sections remain readable;
- mobile layouts preserve premium spacing;
- Arabic pages are visually balanced;
- no component looks like an unmodified UI-library default;
- buttons and forms have complete states;
- section rhythm is varied but coherent;
- the founder remains the central human trust signal;
- visual quality is maintained without final photography;
- no unsupported scale is implied.
