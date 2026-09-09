# TYPOGRAPHY SYSTEM & EDITORIAL CANON (Layer 3 Memory)

> **Visual Grammar Purpose:** Governs all typographic hierarchy, scale relationships, font pairings, line measures, diacritic handling, and text behaviors for *POSTLAIN / THE OPERATING FREQUENCY*.

---

## 1. Typographic Strategy & Tension

The typography system establishes visual tension between **human editorial storytelling** (warmth, rhythm, observation) and **operational discipline** (precision, inventory, tabular clarity).

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ DISPLAY / WORDMARK       │ Montserrat (900 Black / 800 ExtraBold)           │
│                          │ Muscular, architectural, tracking -0.03em.       │
├──────────────────────────┼──────────────────────────────────────────────────┤
│ HEADINGS & BODY COPY     │ Plus Jakarta Sans (700 Bold / 500 / 400 Regular) │
│                          │ Geometric clarity, generous counters, flawless   │
│                          │ Vietnamese diacritics rendering.                 │
├──────────────────────────┼──────────────────────────────────────────────────┤
│ METADATA & TABULAR DATA  │ Space Grotesk (500 Medium / 400 Regular)         │
│                          │ Tabular numbers, timestamps, coordinates, tags.  │
├──────────────────────────┼──────────────────────────────────────────────────┤
│ POETIC ACCENT (LAYER A)  │ Cormorant Garamond (Italic 400 / 600) (Optional) │
│                          │ High-fashion editorial contrast for rare Layer A │
│                          │ statements (max 1–2 per chapter).                │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Font Candidates & Evaluation

| Font Family | Role | Category | Vietnamese Diacritics | Numerical Clarity | Licensing | Rationale |
| :--- | :--- | :--- | :---: | :---: | :--- | :--- |
| **Montserrat** | Display & Identity | Geometric Sans | 100% (Google Fonts) | Excellent (Bold) | OFL (Open Font) | Massive optical weight; gives identity titles an authored, structural presence. |
| **Plus Jakarta Sans** | Headings & Longform Body | Neo-Grotesque | 100% (Google Fonts) | Excellent (Proportional) | OFL (Open Font) | Modern, clean proportions; avoids generic Inter/Roboto look; high legibility on dark themes. |
| **Space Grotesk** | Metadata & Tabular | Proportional Grotesk | 100% (Google Fonts) | Superior Tabular (Fixed Width) | OFL (Open Font) | Provides ledger/technical structure without the clunky look of a terminal monospace. |
| **Cormorant Garamond** | Poetic Contrast | Editorial Serif | 100% (Google Fonts) | Elegant Old-Style | OFL (Open Font) | Used strictly for italic Layer A philosophical moments to inject acoustic warmth. |

---

## 3. Typographic Scale Hierarchy

```
┌────────────────────────┬───────────────────────────────────────────┬─────────────┬──────────────┬───────────────┐
│ TOKEN                  │ CSS FLUID VALUE                           │ LINE HEIGHT │ TRACKING     │ WEIGHT        │
├────────────────────────┼───────────────────────────────────────────┼─────────────┼──────────────┼───────────────┤
│ `type.display.hero`    │ `clamp(2.75rem, 7vw, 6.0rem)`             │ `0.92`      │ `-0.035em`   │ 900 (Black)   │
│ `type.heading.section` │ `clamp(1.875rem, 4.5vw, 3.5rem)`          │ `1.05`      │ `-0.025em`   │ 800 (Bold)    │
│ `type.heading.chapter` │ `clamp(1.25rem, 2.5vw, 2.0rem)`           │ `1.15`      │ `-0.015em`   │ 700 (Bold)    │
│ `type.heading.sub`     │ `clamp(1.0625rem, 1.75vw, 1.375rem)`      │ `1.30`      │ `-0.01em`    │ 600 (SemiBold)│
│ `type.body.lead`       │ `clamp(1.0625rem, 1.25vw, 1.25rem)`       │ `1.60`      │ `0`          │ 400 (Regular) │
│ `type.body.standard`   │ `0.9375rem (15px)` / `1.0rem (16px)`      │ `1.65`      │ `+0.005em`   │ 400 (Regular) │
│ `type.meta.tabular`    │ `0.75rem (12px)` / `0.8125rem (13px)`     │ `1.40`      │ `+0.06em`    │ 500 (Medium)  │
│ `type.caption`         │ `0.6875rem (11px)`                        │ `1.40`      │ `+0.08em`    │ 400 (Regular) │
└────────────────────────┴───────────────────────────────────────────┴─────────────┴──────────────┴───────────────┘
```

---

## 4. Reading Ergonomics & Line Measure

- **Maximum Text Measure:** Body paragraphs must never exceed `68ch` (`max-w-2xl` to `max-w-3xl`), with `55ch` as the ideal sweet spot.
- **Hyphenation & Overflow:** `overflow-wrap: break-word; word-break: break-word; hyphens: manual;`.
- **Vertical Spacing Rhythm:** Paragraphs utilize `margin-bottom: 1.25em` relative to font size.

---

## 5. Casing & Styling Policies

1. **Uppercase Policy:** Uppercase is restricted to:
   - Primary display mark (`NGÔ PHÚC // POSTLAIN`).
   - Section category indexes (`01 // THE RECORD OF ORCHESTRATION`).
   - Tabular metadata tags and status indicators (`ALDO GO! ĐÀ LẠT`, `GMT+7`).
   - Interactive button action calls (`SEND DIRECT INQUIRY`, `VISIT PLATFORM`).
   *Never use all-caps for body sentences or long explanatory subheaders.*
2. **Italic Policy:** Italic styling is reserved exclusively for:
   - Layer A poetic observations and philosophical quotes.
   - Secondary role nuances (e.g. *Bảo lưu* in academic records).
3. **Numerical Styling:** All metrics, hours, dates, years, and coordinates must use tabular figures (`font-variant-numeric: tabular-nums`) to ensure vertical grid alignment across multi-row tables.

---

## 6. Vietnamese Diacritic Protection Rules

- **Font Precedence:** All fonts must load the full Latin Extended and Vietnamese glyph sets via `subset=vietnamese`.
- **Line-Height Safety Margin:** Because Vietnamese vowel combinations with tone marks (e.g. `ể`, `ở`, `ậ`, `ữ`) require vertical ascent clearance, line-heights for Vietnamese headings must never be clamped below `1.05` to prevent clipped diacritics.
