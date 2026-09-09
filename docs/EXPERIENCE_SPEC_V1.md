# POSTLAIN Experience Spec v1

## 01. Product thesis

POSTLAIN is not a portfolio defined by one profession. It is an artistic space made by a multidisciplinary person who works across code, sound, image, type, systems, and other forms of making.

The site should feel like an interactive editorial artwork that happens to contain portfolio information.

Core principles:

- Art is the primary identity. No single job title defines the experience.
- All six worlds should carry comparable visual weight and a memorable moment.
- Interaction is part of composition, not decoration added after the layout is finished.
- Scroll is navigation only. Pointer, touch, drag, tap, proximity, timing, and state should create the actual sense of participation.
- No background 3D or WebGL-heavy foundation.
- Typography, elements, images, and layout are the main moving materials.
- Every interaction must have a touch/mobile equivalent.
- Content must remain understandable. Experimental behavior must never bury the work.
- Respect reduced-motion preferences and keep the experience lightweight.

## 02. Narrative architecture

The six worlds remain as the structural language:

| World | Role | Interaction grammar | Content |
| --- | --- | --- | --- |
| VOID | Identity / arrival | Respond | Opening statement, identity |
| WATER | Absorption | Flow | Experience / things learned |
| WOOD | Growth | Grow | Ways of making / capabilities |
| FIRE | Impact | React | Hidden Music / selected work |
| METAL | Refinement | Compose | Craft, methods, selected capabilities |
| EARTH | Return | Settle | Person, contact, closing |

The elemental names are visual language. They should not turn the site into a fantasy-game interface.

## 03. World specifications

### VOID · Respond

Purpose: establish the feeling that the page is alive before explaining anything.

Primary material: oversized typography and negative space.

Desktop interaction: pointer position subtly changes the composition of the main type and nearby elements.

Touch interaction: touch position or a short drag produces the same compositional response.

Important constraint: response should be subtle enough that the typography remains legible.

### WATER · Flow

Purpose: introduce experience as accumulated movement rather than a conventional CV list.

Primary material: type, lines, fragments, and flowing groups of information.

Desktop interaction: pointer proximity or horizontal movement influences how experience fragments gather and separate.

Touch interaction: swipe or drag moves the information field.

Important constraint: the user must always be able to understand the chronology/content without discovering a hidden control system.

### WOOD · Grow

Purpose: show the breadth of making without presenting a generic skills grid.

Primary material: words and branching typographic structures.

Desktop interaction: hover/proximity activates a capability and allows related material to grow outward.

Touch interaction: tap activates a branch; drag can move through the field.

Important constraint: no skill cards, progress bars, or SaaS-style dashboard UI.

### FIRE · React

Purpose: make Hidden Music the strongest proof that POSTLAIN is a practice, not a résumé.

Primary material: project imagery, title, fragments of process, and typography.

Desktop interaction: pointer movement, hover, or drag changes the composition of the project presentation rather than merely revealing an overlay.

Touch interaction: swipe/tap changes project states and composition.

Project: Hidden Music, currently the only active project.

Reference: https://hiddenmusic.postlain.com

Important constraint: do not invent additional projects to fill space.

### METAL · Compose

Purpose: express precision and craft after the impact of FIRE.

Primary material: typography as an editable-looking composition.

Desktop interaction: pointer/tap states can split, align, compress, reorder, or reform typographic groups.

Touch interaction: tap and drag manipulate the same states with simplified gestures.

Important constraint: interaction must feel intentional, not like random text distortion.

### EARTH · Settle

Purpose: return from the constructed world to the person behind it.

Primary material: restrained typography, identity, contact.

Desktop interaction: minimal. Elements settle in response to navigation and small pointer/touch movement.

Touch interaction: same calm response, with no gesture required to access contact.

Closing identity: NGÔ PHÚC / POSTLAIN.

Important constraint: this section should feel like resolution, not another visual spectacle.

## 04. Interaction system

Use a small shared interaction layer rather than independent animation logic in every section.

Conceptual inputs:

- pointer position
- pointer velocity
- touch position
- drag distance
- swipe direction
- proximity to interactive regions
- active world
- reduced-motion preference

Conceptual output:

- transform
- position
- scale
- clipping/reveal
- typographic arrangement
- opacity where useful
- world transition state

The implementation should prefer CSS transforms and lightweight React state/requestAnimationFrame patterns where appropriate. Avoid adding GSAP, Three.js, Lenis, or other heavy animation infrastructure unless a later, concrete interaction requires it.

## 05. Responsive contract

Mobile is not a reduced desktop version.

Each interaction must have an equivalent touch behavior. Where pointer precision is unavailable, use tap, swipe, or drag. Where an interaction would become ambiguous on small screens, simplify the gesture while preserving the same conceptual behavior.

Required targets:

- mobile portrait
- mobile landscape
- tablet
- desktop mouse/trackpad
- keyboard navigation
- reduced motion

## 06. Content contract

Current active project:

- Hidden Music: https://hiddenmusic.postlain.com

Do not create placeholder projects or fictional achievements.

The portfolio should communicate breadth through the way content is presented, not through inflated claims or an artificial list of technologies.

## 07. Visual direction

Thesis:

> Symmetry establishes gravity. Asymmetry creates character.

Typography should act as the primary visual center. Secondary information may deliberately break the axis to create tension.

Avoid:

- generic portfolio cards
- dashboard layouts
- glassmorphism
- floating SaaS UI
- pill-heavy controls
- decorative gradients without purpose
- WebGL background scenes
- excessive particles
- cursor hijacking

Favor:

- oversized type
- editorial spacing
- negative space
- controlled asymmetry
- image cropping
- masks and reveals
- restrained elemental motifs
- purposeful motion

## 08. Build order

1. Stabilize TypeScript and Cloudflare build.
2. Build the shared interaction primitives.
3. Complete VOID as the first interaction benchmark.
4. Complete FIRE using Hidden Music as the second benchmark.
5. Build WATER, WOOD, METAL, and EARTH using the proven system.
6. Replace remaining placeholder copy with real content.
7. Perform mobile, accessibility, performance, and reduced-motion pass.
8. Final visual polish and deployment verification.

## 09. Definition of done

A world is not complete because its animation looks good.

It is complete when:

- its interaction changes the composition or information state;
- the interaction works with mouse and touch;
- content remains understandable without discovering a hidden gesture;
- the visual language belongs to POSTLAIN;
- the implementation remains lightweight;
- reduced motion has a sensible static/low-motion state;
- the section feels distinct from the other worlds without looking like another website.
