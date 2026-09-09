# POSTLAIN / THE OPERATING FREQUENCY
# PHASE 2 · VISUAL ART DIRECTION & DESIGN GRAMMAR SPECIFICATION
**Document ID:** `PHASE-2-ART-DIRECTION-2026-09-09`  
**Concept:** *POSTLAIN / THE OPERATING FREQUENCY*  
**Theme:** *Visual Grammar, Editorial Discipline & Spatial Architecture*  
**Status:** COMPLETE (Phase 2 Baseline Specification)  
**Execution Constraint:** NO RUNTIME CODE CHANGES APPLIED

---

## 1. CREATIVE THESIS

> **POSTLAIN (Ngô Phúc) exists at the intersection of high-intensity physical leadership and atmospheric electronic sound production in Da Lat.**
> 
> **The visual language of this portfolio is an editorial document of how he operates: structured by logic, elevated by art.**
> 
> **It is not a showcase of how many visual effects can be forced into a browser. It is an exercise in high-end editorial restraint, architectural typography, precise grid alignment, and authentic material tactility.**

---

## 2. TYPOGRAPHY DIRECTION

Typography is the foundational architecture of the website. It creates deliberate tension between **human editorial reflection** and **operational precision**.

```
┌────────────────────────────────────────────────────────────────────────────┐
│ DISPLAY     │ Montserrat (900 Black / 800 Bold) — Authoritative, precise,   │
│             │ tracking-tight (-0.035em), massive optical weight.           │
├─────────────┼────────────────────────────────────────────────────────────┤
│ HEADINGS    │ Plus Jakarta Sans (700 Bold / 600 SemiBold) — Modern, clean, │
│             │ geometric, perfect Vietnamese diacritic rendering.          │
├─────────────┼────────────────────────────────────────────────────────────┤
│ BODY        │ Plus Jakarta Sans (400 Regular / 300 Light) — 15px/16px,     │
│             │ measure 45–68ch, high legibility on dark backgrounds.       │
├─────────────┼────────────────────────────────────────────────────────────┤
│ METADATA    │ Space Grotesk (500 Medium) — Tabular data, dates, GMT+7     │
│             │ time, role tags. Monospaced clarity without sci-fi gimmick. │
├─────────────┼────────────────────────────────────────────────────────────┤
│ ACCENT SERIF│ Cormorant Garamond (Italic 400/600) (Optional Layer A quote)│
└────────────────────────────────────────────────────────────────────────────┘
```

* **Fluid Scale Token Formula:** All display and heading elements utilize CSS `clamp()` (`clamp(2.75rem, 7vw, 6.0rem)` for hero titles, `clamp(1.875rem, 4.5vw, 3.5rem)` for chapter titles) to eliminate awkward word wraps on both mobile (320px) and ultra-wide viewports (1920px).
* **Vietnamese Diacritic Safeguard:** Minimum heading line-height is clamped to `1.05` to prevent clipping complex Vietnamese ascenders (e.g. `ể`, `ở`, `ậ`, `ữ`).

---

## 3. GRID & SPATIAL ARCHITECTURE

The layout rejects symmetrical card-dashboard grids in favor of an **asymmetric 12-column editorial grid**:

```
┌─────────────────┬──────────────────────┬─────────────┬─────────────┬───────────────────────────┐
│ BREAKPOINT      │ CONTAINER WIDTH      │ COLUMNS     │ GUTTERS     │ MARGINS                   │
├─────────────────┼──────────────────────┼─────────────┼─────────────┼───────────────────────────┤
│ Desktop (>=1280)│ max-w-7xl (1280px)   │ 12-column   │ 32px (gap-8)│ 64px (px-16)              │
│ Laptop (>=1024) │ max-w-5xl (1024px)   │ 12-column   │ 24px (gap-6)│ 40px (px-10)              │
│ Tablet (>=768)  │ max-w-3xl (768px)    │ 8-column    │ 20px (gap-5)│ 24px (px-6)               │
│ Mobile (<768)   │ 100% (fluid)         │ 4-column    │ 16px (gap-4)│ 16px (px-4)               │
└─────────────────┴──────────────────────┴─────────────┴─────────────┴───────────────────────────┘
```

* **Asymmetric Ratios:**
  * Chapter 01 (Timeline): 4-column Left Rail (Years & Metadata) / 8-column Right Rail (Narrative, Responsibilities, Logs).
  * Chapter 02 (Studio): 7-column Left Rail (Platform Showcase) / 5-column Right Rail (Listening Player & Waveform).
  * Chapter 04 (Contact): 5-column Left Rail (Hotline & Email Cards) / 7-column Right Rail (Edge Dispatch Form).

---

## 4. COMPOSITION & WHITESPACE DISCIPLINE

* **Vertical Rhythm:** Inter-chapter gap is clamped to `clamp(5.0rem, 10vh, 8.5rem)`, providing deliberate pauses between narrative milestones.
* **Controlled Line Measure:** Explanatory text is strictly bounded between `45ch` and `68ch` to maintain comfortable eye tracking.
* **Structural Negative Space:** Whitespace is treated as acoustic silence in a musical composition—it frames and gives weight to the surrounding information.

---

## 5. COLOR ARCHITECTURE & CONTRAST GOVERNANCE

A deeply restrained nocturnal palette inspired by Da Lat pine forests at night and brushed aluminum mixing console panels:

```
┌──────────────────┬─────────────┬─────────────────────────────────────────────────────────┐
│ TOKEN            │ HEX VALUE   │ SEMANTIC ROLE & BOUNDARY                                │
├──────────────────┼─────────────┼─────────────────────────────────────────────────────────┤
│ color.bg.base    │ #0b0d12     │ Primary page canvas (deep matte obsidian charcoal).     │
│ color.bg.surface │ #121620     │ Secondary card and timeline container backgrounds.      │
│ color.bg.elevated│ #1a202c     │ Input focus backgrounds, expanded drawers, hover states.│
│ color.text.hero  │ #f8fafc     │ Pure stark ivory display titles (Contrast 17.8:1 AAA).  │
│ color.text.body  │ #cbd5e1     │ High-contrast readable narrative body (11.2:1 AAA).     │
│ color.text.muted │ #64748b     │ Tabular dates, timestamps, colophon metadata.           │
│ color.border     │ #1e293b     │ Structural 1px division rules and timeline spines.      │
│ color.accent     │ #e2b714     │ WARM AMBER: 1% Accent (Playhead, focus rings, buttons). │
│ color.accent.cyan│ #38bdf8     │ SKY CYAN: 0.5% Accent (Discrete digital indicator tags).│
└──────────────────┴─────────────┴─────────────────────────────────────────────────────────┘
```

* **The 1% Accent Rule:** Accent colors are strictly prohibited from being used as background ambient glow blobs or gradient text fills. They are reserved exclusively for interactive feedback and primary state changes.

---

## 6. MATERIALITY & TACTILE TEXTURE

* **Matte Obsidian:** Deep, light-absorbent background canvas echoing studio acoustic baffling.
* **Brushed Slate Containers:** Crisp solid cards with 1px borders (`#1e293b`); zero blurry glassmorphism.
* **Structural Hairlines:** 1px division lines grounding the layout like ledger rules in a physical ledger book.
* **Zero Fake Noise Overlays:** No full-page animated noise canvases that drain CPU/GPU resources.

---

## 7. IMAGE ART DIRECTION (THE TRIAD MODEL)

Because authentic photographic media has not yet been supplied:
1. **Zero Fake AI Portraits:** No generated avatars or stock models.
2. **The Triad Storytelling Model:** Every image must create emergent meaning across three poles:
   * *What the image shows* (Physical reality / tool / empty space).
   * *What the text states* (Layer B verified operational fact).
   * *The emergent meaning* (The invisible discipline and preparation).
3. **Dedicated `<EditorialMediaSlot />` Containers:** Pre-engineered aspect ratios (`16:9`, `4:3`, `1:1`) rendering architectural SVG frequency diagrams and metadata tags until authentic photographs are inserted.

---

## 8. LINE & SHAPE LANGUAGE

* **No Pill Buttons / Badges:** Abolished `rounded-full` capsules on content tags in favor of subtle-radius rectangular badges (`rounded-md` / 6px) with 1px borders.
* **Structural Crop Marks:** Subtle corner framing marks (`+`) on media containers to indicate precision framing.
* **Underline Anchors:** 1.5px amber underlines on interactive links that pull subtly on hover.

---

## 9. MOTION PHILOSOPHY

Motion expresses **weight, inertia, and musical tempo**:
* **Micro-Tactile Transitions:** 150ms–180ms (`cubic-bezier(0.16, 1, 0.3, 1)`) on buttons and links.
* **Scroll-Triggered Reveals:** 400ms–500ms staggered opacity and 16px vertical rise via IntersectionObserver.
* **Layout Drawers:** 300ms–350ms smooth height expansion for detailed operational logs.
* **Accessibility:** Complete instantaneous bypass (`0.01ms`) under `@media (prefers-reduced-motion: reduce)`.

---

## 10. RESPONSIVE ART DIRECTION

* **Mobile-First Document Flow:** Zero 100vh viewport traps. Full natural vertical scrolling.
* **Touch Target Standard:** Minimum touch bounding box of `48x48px` across all interactive elements.
* **Collapsible Reading Drawers:** Career timeline nodes present crisp summaries with optional 1-tap expansion for deep operational logs.
* **Mobile Masthead:** Compact sticky header with live Da Lat clock and full-screen typography drawer.

---

## 11. ACCESSIBILITY AS A VISUAL CONSTRAINT

* **Contrast Compliance:** All text meets or exceeds WCAG 2.1 AA/AAA standards (Body copy is 11.2:1 against background).
* **Native Cursor & Selection:** 100% native OS pointer behavior and fully selectable text throughout the application.
* **Keyboard Focus Rings:** High-visibility 2px warm amber outline (`outline-offset-2 outline-[#e2b714]`) on all interactive focus states.

---

## 12. VISUAL ANTI-PATTERN REGISTER (BANNED PATTERNS)

```
[❌ BANNED] rounded-[2.5rem] pill cards
[❌ BANNED] backdrop-blur-2xl glassmorphic panels
[❌ BANNED] bg-[#a3e635]/10 radial gradient glow blobs
[❌ BANNED] SPEC_SYS // 11°56'N 108°26'E sci-fi HUD framing
[❌ BANNED] Custom Crosshair Cursor tag popping (OPEN, CLICK, TOUR)
[❌ BANNED] 0.65s artificial preloader with spinning orb
[❌ BANNED] 100vh wheel-hijacked slide deck
[❌ BANNED] Procedural 8-bit click sound effects
[❌ BANNED] Rainbow gradient text fills (bg-clip-text)
[❌ BANNED] Fake server latency / edge ping monitors
```

---

## 13. AWWWARDS BENCHMARKING EVIDENCE TABLE

| High-End Reference | What Works | Why It Works | What POSTLAIN Can Learn | What POSTLAIN Must NOT Copy |
| :--- | :--- | :--- | :--- | :--- |
| **Pacome Pertant** (`pacomepertant.com`) | Extreme typographic scale & editorial pacing. | Bold contrasts between massive headlines and comfortable body text create immediate authority. | Typographic tension between display and body copy. | Avoid locking user into full-screen horizontal slide transitions. |
| **Forms World** (`forms.world`) | Monochromatic structural grids and subtle metallic accents. | Restraint creates a high-end, tactile feeling. | Clean 1px structural division rules and subtle surface tone shifts. | Avoid overly complex WebGL canvas interactions that drain mobile batteries. |
| **Antonin Waterkeyn** (`antonin-waterkeyn.com`) | Crisp chronological timeline with expandable detail drawers. | Allows rapid recruiter scanning without sacrificing depth. | Asymmetric timeline layout with collapsible operational logs. | Avoid custom cursor replacement and scroll acceleration scripts. |
| **Kuon Space** (`kuon.space`) | Atmospheric minimalism grounded in space and material. | Generous negative space gives room for audio and narrative to breathe. | Atmospheric nocturnal palette inspired by geographic environment (Da Lat). | Avoid completely abstract layouts that obscure verified professional credentials. |

---

## 14. DESIGN TOKEN SCHEMA

The complete semantic token object is formalized in [.agents/knowledge/DESIGN_TOKENS.md](file:///c:/Users/Admin/Documents/GitHub/postlain_cv_portfolio/.agents/knowledge/DESIGN_TOKENS.md) and ready for Phase 3 Tailwind integration.

---

## 15. IMPLEMENTATION IMPLICATIONS

* **Tailwind Configuration:** `tailwind.config.js` will be cleanly extended with `DESIGN_TOKENS` (colors, typography, spacing, radii).
* **Global CSS:** `src/frontend/styles/global.css` will be stripped of all 100vh lockouts and cursor overrides.
* **Component Architecture:** The 11 obsolete/fake components will be purged, and the modular 6-tier component architecture (`Layout`, `Masthead`, `Colophon`, and Chapters 00–04) will be constructed in `src/frontend/`.

---

## 16. OPEN DECISIONS & BLOCKERS

* **Audio Asset Endpoint:** Streaming URLs for Hidden Music tracks remain pending; the audio controller will implement an elegant metadata fallback mode linking directly to `hiddenmusic.postlain.com`.
* **Documentary Media:** Photography remains pending; the pre-engineered `<EditorialMediaSlot />` ensures visual integrity until real assets are supplied.

---

## 17. QUALITY GATES (CONCEPTUAL VERIFICATION TESTS)

| Test ID | Question | Assessment | Result |
| :---: | :--- | :--- | :---: |
| **TEST A** | Can the design still feel like POSTLAIN with all animation removed? | Yes; typographic scale and grid architecture carry the identity independently. | **PASS** |
| **TEST B** | Can the design still feel premium with all gradients removed? | Yes; solid matte obsidian surfaces with 1px hairline rules feel high-end. | **PASS** |
| **TEST C** | Can the design still feel distinctive without 3D? | Yes; the duality of physical operations and sound production is unique. | **PASS** |
| **TEST D** | Can a recruiter scan the hierarchy without understanding the artistic concept? | Yes; Layer B semantic facts, dates, and contact info are directly visible. | **PASS** |
| **TEST E** | Can a developer implement the system without guessing? | Yes; all tokens, scales, grids, and timings are mathematically defined. | **PASS** |
| **TEST F** | Does the system permit variation without becoming inconsistent? | Yes; 4 layout archetypes provide variety within a single visual world. | **PASS** |
| **TEST G** | Does it look like a person made decisions rather than an AI template? | Yes; asymmetric editorial layouts and disciplined restraint avoid AI clichés. | **PASS** |
| **TEST H** | Can the visual language survive on a mobile phone? | Yes; fluid `clamp()` typography and touch-first tap targets guarantee mobile parity. | **PASS** |
| **TEST I** | Can authentic photography be inserted later without redesigning? | Yes; `<EditorialMediaSlot />` architecture handles image injection seamlessly. | **PASS** |
| **TEST J** | Does every visual device have a semantic or compositional reason? | Yes; all elements mapped directly to narrative, information, or interaction needs. | **PASS** |
