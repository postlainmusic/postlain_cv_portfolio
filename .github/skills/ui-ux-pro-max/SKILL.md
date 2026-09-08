---
name: ui-ux-pro-max
description: >-
  Expert UI/UX design intelligence based on ui-ux-pro-max. Provides guidance on color harmony,
  typography pairing, layout hierarchy, GPU-accelerated motion, accessibility (WCAG AA), and avoiding AI design clichés.
---

# UI/UX Pro Max Skill

## Core Directives
1. **No AI Clichés:** Never default to purple/blue gradients on dark mode, excessive glassmorphism blur, or non-functional decorative widgets.
2. **Typography System:**
   - Pair a characterful Display Font for headings with a clean, highly legible Body Font (supporting tabular numbers).
   - Line length strictly within `45ch - 75ch`.
   - Scale with clean typographic hierarchy (e.g. Minor Third or Major Second ratios).
3. **Color & Contrast:**
   - Strict adherence to WCAG AA contrast ratio (>= 4.5:1 for body copy, >= 3.0:1 for large display text).
   - Use HSL semantic tokens: background, surface, elevated, primary, muted, destructive, accent.
4. **Motion & Interaction:**
   - Transitions strictly `200ms - 300ms` using `ease-out` or `cubic-bezier(0.16, 1, 0.3, 1)`.
   - Animate ONLY `opacity` and `transform` properties for 60fps GPU acceleration.
   - Always honor `@media (prefers-reduced-motion: reduce)`.
   - Interactive click/touch targets must be >= 44x44px.
