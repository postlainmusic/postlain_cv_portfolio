---
version: alpha
name: POSTLAIN Narrative Experience
description: A bilingual editorial portfolio where typography and direct manipulation reveal a multidisciplinary artistic practice.
colors:
  primary: "#e8e5dc"
  ink: "#10110f"
  paper: "#e8e5dc"
  fog: "#aca89f"
  ember: "#cf4525"
  water: "#7890a3"
typography:
  display:
    fontFamily: "Georgia, 'Times New Roman', 'Noto Serif', serif"
  sans:
    fontFamily: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
rounded:
  DEFAULT: "0px"
spacing:
  DEFAULT: "1rem"
  page-edge: "clamp(1.25rem, 7vw, 9rem)"
  world-block: "clamp(5rem, 12vh, 8rem)"
components:
  world-navigation: {}
  composition-control: {}
---

# POSTLAIN Narrative Experience Design System

## Overview

### Creative North Star

POSTLAIN is a field note made in space, type, and response: a quiet darkroom where a reader's movement shifts the arrangement without ever obscuring it. The brand surface is editorial rather than product-like; the first view should feel like entering an unfinished but deliberate composition.

### Product context and register

- **Audience and primary job:** Potential collaborators and recruiters discover the breadth and point of view behind NGÔ PHÚC / POSTLAIN.
- **Target market(s) and evidence:** No specific market is defined. Vietnamese and English are first-class content locales.
- **Locale(s) and language policy:** UI follows the existing Vietnamese/English Zustand locale toggle. English preserves the intent of Vietnamese copy rather than translating word-for-word.
- **Usage scene:** A direct, exploratory portfolio visit on touch and pointer devices; text remains legible without interaction.
- **Register:** Brand / editorial art experience.
- **Memorable signature:** The VOID typographic field visibly responds to a pointer or touch and can be composed with a keyboard-accessible control.
- **Restraint:** The composition uses one warm ember response and thin orbital rules; no glass, cards, generic gradients, particle field, or animated decorative noise.
- **Anti-references:** SaaS dashboard navigation, skill-card grids, HUD chrome, and passive scroll-only reveals.
- **Token ownership/runtime mapping:** This document records the canonical palette and type roles. `src/frontend/styles/global.css` is the runtime adapter via `:root` custom properties.

## Colors

`ink` is the uninterrupted field, `paper` is high-contrast reading type, and `fog` handles non-primary labels. `ember` is reserved for active response and the composition index. `water` is held for a later WATER world. Forced-colors remains system-controlled.

## Typography

Display typography uses the installed serif fallback stack with extreme scale, tight tracking, and intentionally split lines. The sans stack carries small labels and reading copy with Vietnamese-capable system fallbacks. The layout does not use italic as a styling default; the display face is a structural material, not body copy.

## Layout

Each world owns a viewport-height composition with `page-edge` and `world-block` spacing. The header and numeric world navigation are quiet fixed navigation, not a tab bar. At narrow widths the VOID orbit expands beyond the viewport and type remains the focal point; touch changes the same field variables as pointer movement.

## Elevation & Depth

Depth comes from scale, contrast, overlapping orbital lines, and negative space. Static cards, shadows, blur, and glass surfaces are forbidden.

## Shapes

The system is square-edged except for the single VOID orbit, whose mutable circular geometry represents response. Rules are one CSS pixel and low contrast.

## Components

### Foundational visual states

Navigation and composition controls expose hover, focus-visible, and active states through contrast, border, and transform. Reduced-motion users receive a static field plus the explicit composition control.

### Buttons and actions

Actions are text-first, unboxed, and use the warm ember index only as orientation. Native buttons and links retain their expected keyboard behavior and visible focus state.

### Navigation and data display

The active world is represented by a restrained numeric rail. It has accessible labels and direct section navigation without presenting six world names as a dashboard menu.

### Forms and overlays

This brand experience currently has no forms or overlays.

### Iconography

No decorative icon library is used in the narrative layer. The downward arrow is text to preserve the typographic language.

### Motion

Motion is direct manipulation: pointer/touch coordinates set CSS variables through `requestAnimationFrame`, changing position, orbit, and type alignment. The keyboard button cycles three named composition states. CSS transitions stay under 350ms, operate on composited transforms where possible, and are removed under reduced motion.

### Content and data visualization

Copy stays sparse and bilingual.
- **VOID (00):** Typographic orbit field responding directly to pointer coordinates and composition controls.
- **WATER (01):** Interactive 2D fluid ripple simulation ($128 \times 72$ discrete wave grid, damping $0.965$) reflecting the early convergence of disparate experiences (Viva Star Coffee 2019–2020). Supports three flow states (Still Pond, Slow Stream, Ripple Surge) and full reduced-motion bypass.
- **FIRE (03):** Real work, Hidden Music, will be given depth in FIRE rather than padded with fictional projects.

## Do's and Don'ts

- **Do:** Use large type and negative space to make discovery feel intentional.
- **Do:** Give every pointer-only behavior an equivalent touch and keyboard path.
- **Do:** Use discrete fluid simulation equations with restrained color grading (`#7890a3`, `#12191f`) rather than generic noisy particle effects.
- **Don't:** Use interaction merely as a scroll-triggered fade or translate effect.
- **Don't:** Introduce dashboards, rounded cards, WebGL backgrounds, or generic portfolio decoration.

