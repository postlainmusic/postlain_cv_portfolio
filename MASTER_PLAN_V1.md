# POSTLAIN MASTER PLAN v1.0 (LOCKED)
## The Awwwards-Level Interactive Art Portfolio Engine

> "POSTLAIN is an interactive digital artwork that happens to contain a portfolio."  
> **Core Thesis:** "Symmetry establishes gravity. Asymmetry creates character."  
> **Aesthetic Identity:** Organic Digital Materialism (Editorial intelligence × physical computation × human imperfection).  
> **Supreme Directive:** Technology must remain subordinate to the experience.

---

## 01. CREATIVE & ART DIRECTION: ORGANIC DIGITAL MATERIALISM

- **Art Direction Keywords:** RAW, TACTILE, SPATIAL, KINETIC, HUMAN.
- **Hierarchy of Value:**
  ```
              HUMAN
                ↑
            ART / IDEA
                ↑
           INTERACTION
                ↑
             MATERIAL
                ↑
            TYPOGRAPHY
                ↑
           COMPOSITION
                ↑
            TECHNOLOGY (Lowest layer / Invisible foundation)
  ```
- **No-Go List:**
  1. No generic SaaS cards, dashboard HUDs, or pill buttons.
  2. No glassmorphism clichés or purple/neon cyber gradients.
  3. No fake statistics, fake client logos, or fabricated metrics.
  4. No full-page static noise overlays (texture must emerge from material simulation).
  5. Technology must never be displayed for its own sake.

---

## 02. EXPERIENCE ARCHITECTURE: SINGLE-FRAME RUNTIME

```
                         USER
                          │
                 Pointer / Touch / Keys
                          │
                          ▼
                 ┌─────────────────┐
                 │  INPUT SAMPLER  │ (Coalesce events, max 4-8 splats/frame)
                 └────────┬────────┘
                          │
                          ▼
                 ┌─────────────────┐
                 │  WORLD ENGINE   │ (Active world state & profile)
                 └────────┬────────┘
                          │
                          ▼
              ┌─────────────────────────┐
              │ MATERIAL SIMULATION     │ (Fixed timestep, adaptive resolution,
              │                         │  GPU-resident state, sleep/wake)
              └───────────┬─────────────┘
                          │
             ┌────────────┴────────────┐
             ▼                         ▼
      MATERIAL OUTPUT          TYPOGRAPHY PHYSICS
    (Velocity/Pressure)      (Mass, tension, glyph state)
             │                         │
             └────────────┬────────────┘
                          ▼
                     COMPOSITION
                          │
                          ▼
                   RENDERER / STAGE (Up to 120 FPS interpolation)
```

---

## 03. THE SIX WORLDS (PHYSICAL BEHAVIORS, NOT COLORS)

1. **00 VOID (RESPOND — Absence / Light):**
   - *Behavior:* Space reacts to visitor. Pointer creates a localized light field with mathematical falloff. Inactive state is quiet absence.
   - *Typography:* Latent letters awaken; tracking and opacity shift dynamically near the cursor.

2. **01 WATER (FLOW — Fluidity / Refraction):**
   - *Behavior:* Continuous dark mineral fluid response (velocity, pressure, density, wave propagation).
   - *Protected Baseline:* `src/frontend/narrative/interaction/useWaterSimulation.ts` is the immutable known-good baseline. Any future WebGL migration must be progressive with guaranteed fallback.
   - *Storytelling:* 2019–2020 early grounding & discipline at Viva Star Coffee before meeting sound.

3. **02 WOOD (GROW — Persistent Interaction Memory):**
   - *Behavior:* User strokes create persistent branching networks. Old strokes remain as historical memory, and new buds sprout from existing structures.
   - *Memory Budgeting:* Capped memory pool (`MAX_SEGMENTS`), spatial pruning, and merging to maintain locked 60/120 FPS performance over extended sessions.

4. **03 FIRE (REACT — Energy / Heat / Hidden Music Artifact):**
   - *Behavior:* High thermal energy and harmonic waveforms radiating around a central gravitational singularity.
   - *Hidden Music:* [https://hiddenmusic.postlain.com](https://hiddenmusic.postlain.com) is a living artifact discovered inside the fire. Proximity excites the core and unlocks entry.
   - *Truth:* Only real project. In active experimental development.

5. **04 METAL (COMPOSE — Composition Instrument):**
   - *Behavior:* 7 Material Nodes (`CODE`, `SOUND`, `IMAGE`, `TYPE`, `SYSTEM`, `SPACE`, `MOTION`).
   - *Physics:* Spring dynamics, magnetic attraction, and collision. Dragging materials close together triggers emergent syntheses and layout shifts.

6. **05 EARTH (SETTLE — Density / Gravity / Human Ground):**
   - *Behavior:* Total settling of energy into quiet, warm, authentic resolution.
   - *Identity:* Natural revelation of **NGÔ PHÚC / POSTLAIN**, direct email `hello@postlain.com`, and philosophy.

---

## 04. TYPOGRAPHY MATERIAL ENGINE

- **Core Axiom:** "Typography is not content placed inside the world. Typography is one of the world's physical substances."
- **Physics Properties:** Mass, Velocity, Inertia, Tension, Density, Deformation, Memory.
- **Strict Readability Law:**
  - *Primary Content (Headings, Identity, Project Links, Email):* Must remain 100% legible and recoverable after interaction settles.
  - *Secondary Content:* Temporarily deformable by fluid/energy forces.
  - *Decorative Glyphs:* Free physical movement and dispersion.

---

## 05. MATERIAL SIMULATION ENGINE & THE 7 RED LAWS

1. **One RAF, One Simulation Clock:** Central ticker coordinates input, physics, and render passes.
2. **Dual-Clock Timestep & Interpolation:**
   - Physics Clock: 60Hz (16.67ms) / 30Hz (33.33ms) / Adaptive.
   - Display Clock: 60Hz (16.67ms) / 120Hz (8.33ms).
   - Render interpolates between physics states.
3. **GPU-Resident State:** Velocity, pressure, and density textures stay in VRAM without expensive `readPixels()` CPU readbacks.
4. **Input Coalescing:** Pointer/touch events are coalesced into maximum 4–8 `ForceEvent` splats per frame.
5. **Zero React State in Loop:** Never call `setState()` inside the animation/physics step.
6. **Active-Only Simulation:** Only the current world runs physics; inactive worlds sleep.
7. **Adaptive Performance Governor:** Quality level scales down automatically before frame drops occur.

---

## 06. WORLD DEFINITION OF DONE

Every World must pass all 12 criteria before being declared complete:

```
┌───────────────────────────────────────────────┐
│ WORLD DEFINITION OF DONE CHECKLIST            │
├───────────────────────────────────────────────┤
│ [✓] 1. Visual identity distinct & non-cliché  │
│ [✓] 2. Material behavior physically motivated │
│ [✓] 3. Real interaction (not auto animation)  │
│ [✓] 4. Interaction has tangible consequence   │
│ [✓] 5. Typography actively participates       │
│ [✓] 6. Desktop pointer & wheel responsiveness │
│ [✓] 7. Mobile touch & gesture responsiveness  │
│ [✓] 8. Keyboard navigation & screen reader a11y│
│ [✓] 9. Prefers-reduced-motion respected       │
│ [✓] 10. Zero runtime console / shader errors  │
│ [✓] 11. No layout shift / safe-area overflow  │
│ [✓] 12. Strict performance budget & fallback   │
└───────────────────────────────────────────────┘
```

---

## 07. REFINED 13-PHASE IMPLEMENTATION ROADMAP

- **Phase 0:** Master Plan + Repository Baseline Audit.
- **Phase 1:** Single-Frame Runtime, Stage Manager & Input Sampler Engine.
- **Phase 2:** Typography Material Engine (Unified physics profiles).
- **Phase 3:** World 00: VOID (Light field & spatial glyph awakening).
- **Phase 4:** World 01: WATER (Protected mineral fluid baseline & typography refraction).
- **Phase 5:** World 02: WOOD (Persistent structural memory branching with budget).
- **Phase 6:** World 03: FIRE (Harmonic thermal field & Hidden Music discovery).
- **Phase 7:** World 04: METAL (7-Material composition instrument).
- **Phase 8:** World 05: EARTH (Quiet human resolution & contact).
- **Phase 9:** Global Transitions & Morphing Choreography.
- **Phase 10:** Performance Governor, Dev-only Performance HUD, Mobile Safe Areas & WCAG AA Scorecard.
- **Phase 11:** Cross-Device Runtime QA (Desktop, Mobile Android/iOS, Small Viewports, Slow Networks).
- **Phase 12:** Production Release & Deployment Readiness.
