# VISUAL GRAMMAR & ARCHITECTURAL CANON (Layer 3 Memory)

> **Master Grammar Document:** Unifies typography, grid, color, material, line, and shape language into a cohesive, authored visual grammar for *POSTLAIN / THE OPERATING FREQUENCY*.

---

## 1. The Visual Grammar Core

The visual grammar of POSTLAIN is founded on **structural precision, material honesty, and typographic authority**. It deliberately rejects the decorative excess of generic AI web templates.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ 1. STRUCTURAL ASYMMETRY: Controlled grid offsets that create optical tension│
│ 2. MATERIAL RESTRAINT: Matte obsidian surfaces with 1px hairline rules      │
│ 3. TYPOGRAPHIC DOMINANCE: Words, scale, and whitespace form the architecture│
│ 4. SCARCE ACCENTUATION: 1% Warm Amber for interactive focal points only      │
│ 5. INTENTIONAL SILENCE: Whitespace is treated as an active structural force  │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Line & Shape Language

1. **Hairline Rules (`border-white/[0.08]` / `#1e293b`):** 1px structural lines run horizontally between narrative milestones and vertically between timeline columns.
2. **Subtle Corner Radii (`rounded-lg` / 8px max):** Abolishes oversized `rounded-[2.5rem]` pills in favor of crisp, modern geometric bounds.
3. **Framing Crop Marks (`+` crosshairs in media corners):** Used strictly as architectural framing in `<EditorialMediaSlot />` components to signal precise photographic bounds.
4. **Underline Anchors (`border-b border-[#e2b714]`):** Clean 1.5px underlines for interactive text links that pull subtly on hover (`transform: translateY(-1px)`).

---

## 3. Materiality & Tactile Texture

* **Matte Obsidian (`#0b0d12`):** Non-reflective, deeply absorbent background resembling black studio acoustic panels.
* **Brushed Studio Slate (`#121620`):** Solid tactile card containers with crisp 1px borders; zero muddy glassmorphism.
* **Warm Metallic Grain:** Subtle warm amber highlights (`#e2b714`) echoing incandescent indicator lamps on analog mixing consoles.
* **Zero Fake Noise Overlays:** No full-page animated noise canvases that drain CPU/GPU resources.

---

## 4. Visual Grammar Consistency Matrix

| Element | Allowed Treatment | Forbidden Treatment |
| :--- | :--- | :--- |
| **Containers** | Solid `#121620` with 1px `#1e293b` border, `rounded-lg` (8px). | `backdrop-blur-2xl`, `rounded-[2.5rem]`, ambient blur blobs. |
| **Badges / Tags** | Square/subtle-radius (`rounded-md`), `bg-white/[0.04]`, 1px border. | `rounded-full` pill capsules, neon glows, gradient fills. |
| **Dividers** | 1px horizontal rule `#1e293b`. | Thick dashed gradient dividers, animated rainbow lines. |
| **Buttons** | Solid `#e2b714` text-black (Primary) or 1px border hover lift. | Glowing neon halos, pulsating borders, custom cursor tags. |
| **Typography** | Monochromatic white/slate with tight tracking on display. | Rainbow gradient text (`bg-clip-text`), excessive monospace body. |
