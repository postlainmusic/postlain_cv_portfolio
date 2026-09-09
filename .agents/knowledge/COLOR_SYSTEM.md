# COLOR ARCHITECTURE & CONTRAST GOVERNANCE (Layer 3 Memory)

> **Visual Grammar Purpose:** Defines the restrained nocturnal color system, contrast ratios, Day/Document vs Night/Studio palette transitions, and semantic boundaries for *POSTLAIN / THE OPERATING FREQUENCY*.

---

## 1. Color Strategy & Mood

The color system is built on **atmospheric obsidian charcoal and warm metallic accents**, evoking Da Lat pine timber at night, studio dampening materials, and brushed aluminum audio hardware.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ Obsidian Base       │ #0b0d12 — Primary page canvas (deep matte black)      │
│ Studio Surface      │ #121620 — Secondary card and container background    │
│ Elevated Surface    │ #1a202c — Active cards, hover states, input surfaces  │
│ Stark White Text    │ #f8fafc — Primary display headlines & active labels   │
│ Slate Body Text     │ #cbd5e1 — High-contrast readable narrative body       │
│ Muted Metadata      │ #64748b — Tabular dates, colophon, inactive labels   │
│ Structural Hairline │ #1e293b — 1px division rules & card borders           │
│ Warm Amber Accent   │ #e2b714 — 1% Accent: Active playhead, focus rings     │
│ Sky Cyan Accent     │ #38bdf8 — 0.5% Accent: Subtle digital indicator tags  │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Palette Token Schema

| Semantic Token | Hex Code | Contrast Ratio vs Base (`#0b0d12`) | WCAG 2.1 Level | Allowed Surface Placement |
| :--- | :--- | :---: | :---: | :--- |
| `color.bg.base` | `#0b0d12` | — | — | Main document background canvas. |
| `color.bg.surface` | `#121620` | $1.2 : 1$ | — | Timeline nodes, capability cards, contact box. |
| `color.bg.elevated` | `#1a202c` | $1.5 : 1$ | — | Hovered cards, expanded accordions, input fields. |
| `color.text.hero` | `#f8fafc` | $17.8 : 1$ | **AAA** | Display headers (`<h1>`, `<h2>`), active titles. |
| `color.text.body` | `#cbd5e1` | $11.2 : 1$ | **AAA** | Standard body copy, responsibility bullets. |
| `color.text.muted` | `#64748b` | $3.5 : 1$ (large) | **AA (large)** | Tabular numbers, timestamps, inactive categories. |
| `color.border.subtle`| `#1e293b` | — | — | 1px horizontal and vertical layout rules. |
| `color.border.active`| `#334155` | — | — | Focused inputs, hovered card boundaries. |
| `color.accent.amber` | `#e2b714` | $9.8 : 1$ | **AAA** | Active audio playhead, primary button hovers, focus rings. |
| `color.accent.cyan`  | `#38bdf8` | $10.4 : 1$ | **AAA** | Discrete tags (`HIDDEN MUSIC`, `CLOUDFLARE EDGE`). |

---

## 3. The 1% Accent Governance Rule

Accent colors (`#e2b714` Warm Amber and `#38bdf8` Sky Cyan) are strictly governed by **extreme scarcity**:

* **ALLOWED USAGE:**
  1. Active audio waveform scrubbers and play state.
  2. Selected navigation section underline.
  3. Interactive button hover backgrounds and focus rings.
  4. Single status dot indicator (`● AVAILABLE 2026`).
* **FORBIDDEN USAGE:**
  1. **NO ambient radial glow blobs** (`blur-[100px]` circles).
  2. **NO gradient text fills** (`bg-clip-text text-transparent`).
  3. **NO glowing card borders** or box shadows.
  4. **NO multi-colored decorative icons**.

---

## 4. Day / Document vs Night / Studio Transitions

The interface maintains a unified, deep nocturnal palette throughout the document. However, subtle contextual shifts reflect the environment of each chapter:
* **Chapters 00, 01, 03 (The Document / Physical World):** Obsidian canvas (`#0b0d12`) with structured slate dividers (`#1e293b`) and stark ivory typography (`#f8fafc`).
* **Chapter 02 (The Studio / Sonic Space):** Deeper nocturnal depth (`#07080b`) with a single warm amber baseline rule (`#e2b714/40`) representing the glow of hardware preamps in a dark control room.
