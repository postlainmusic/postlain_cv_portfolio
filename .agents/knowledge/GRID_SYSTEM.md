# GRID + SPATIAL COMPOSITION SYSTEM (Layer 3 Memory)

> **Visual Grammar Purpose:** Defines the asymmetric editorial grid, responsive column collapse, edge alignments, section pacing, and whitespace architecture for *POSTLAIN / THE OPERATING FREQUENCY*.

---

## 1. Asymmetric Editorial Grid Architecture

The spatial system rejects symmetrical card-dashboard layouts in favor of an **asymmetric 12-column editorial grid** that creates deliberate architectural tension between columns.

```
Desktop (12 Columns / max-w-7xl / 1280px container)
┌──┬──┬──┬──┬──┬──┬──┬──┬──┬──┬──┬──┐
│Col 1-3: Index / Metadata │Col 4-12: Primary Narrative / Media │
└──┴──┴──┴──┴──┴──┴──┴──┴──┴──┴──┴──┘
```

---

## 2. Breakpoint Grid Specifications

| Breakpoint | Viewport Width | Container Width | Columns | Gutters | Outer Margins | Primary Layout Structure |
| :--- | :--- | :--- | :---: | :---: | :---: | :--- |
| **Wide Desktop** | $\ge 1440\text{px}$ | `max-w-7xl` (1280px) | 12 | 32px (`gap-8`) | 80px (`px-20`) | 3-col Metadata / 9-col Editorial Content |
| **Desktop** | $1280\text{px} – 1439\text{px}$ | `max-w-7xl` (1280px) | 12 | 32px (`gap-8`) | 48px (`px-12`) | 4-col Sidebar / 8-col Content |
| **Laptop / Tablet Horiz** | $1024\text{px} – 1279\text{px}$ | `max-w-5xl` (1024px) | 12 | 24px (`gap-6`) | 32px (`px-8`) | 4-col Sidebar / 8-col Content |
| **Tablet Portrait** | $768\text{px} – 1023\text{px}$ | `max-w-3xl` (768px) | 8 | 20px (`gap-5`) | 24px (`px-6`) | Stacked 8-col with 2-col metadata indent |
| **Mobile** | $< 768\text{px}$ | $100\%$ fluid | 4 | 16px (`gap-4`) | 16px (`px-4`) | Linear single-column flow with 1px top dividers |

---

## 3. Structural Column Layout Archetypes

### Archetype A: Asymmetric Timeline Ledger (Chapter 01)
- **Left Rail (Cols 1–4):** Sticky chapter indicator, period metadata (`2025–2026`), role title, location.
- **Right Rail (Cols 5–12):** Company name, Layer A narrative reflection, verified responsibility bullets, expandable operational logs.

### Archetype B: Studio Showcase & Listening Room (Chapter 02)
- **Left Rail (Cols 1–7):** Platform thesis, venture narrative, 3 operational pillars, direct portal button.
- **Right Rail (Cols 8–12):** Tactical listening player, audio visualizer, release metadata card.

### Archetype C: Capabilities Matrix (Chapter 03)
- **Row 1 (3 Columns / Cols 1–4, 5–8, 9–12):** Executive Management, Workflow Tooling, Creative Direction.
- **Row 2 (2 Columns / Cols 1–6, 7–12):** Academic Foundation & Training Ledger.

### Archetype D: Direct Transmission Station (Chapter 04)
- **Left Rail (Cols 1–5):** Direct contact thesis, 1-touch hotline card (`0938-649-420`), direct email (`studionopu@gmail.com`), Da Lat address.
- **Right Rail (Cols 6–12):** Edge contact dispatch form (Name, Email, Message, Submit).

---

## 4. Section Pacing & Vertical Rhythm

Vertical spacing follows a musical cadence:

```
Section Inter-Chapter Gap: clamp(5.0rem, 10vh, 8.5rem)
├── Section Header: margin-bottom clamp(2.5rem, 5vh, 4.0rem)
│   ├── Layer A Observation: margin-bottom 1.75rem
│   └── Layer B Content Grid: gap clamp(1.5rem, 3vw, 2.5rem)
└── Transition Anchor: margin-top clamp(3.0rem, 6vh, 5.0rem)
```

- **Whitespace Discipline:** Negative space is not empty space; it acts as structural silence that allows the eye to process operational gravity before transitioning to the next narrative milestone.

---

## 5. Edge Alignment & Full-Bleed Rules

- **Masthead & Colophon:** Full-bleed edge-to-edge width with constrained internal padding (`px-4 sm:px-8 lg:px-12`).
- **Dividers:** 1px horizontal structural rules (`border-white/[0.08]`) run full-width across the container to reinforce architectural boundaries.
- **Editorial Media Slots:** Contained within the 12-column grid to maintain clean typographic alignment; never stretched uncontrollably to the viewport edge.
