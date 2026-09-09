# MOTION PRINCIPLES & INTERACTION LANGUAGE (Layer 3 Memory)

> **Visual Grammar Purpose:** Governs all motion timings, easing curves, entrance behaviors, interactive hover states, and reduced-motion fallbacks for *POSTLAIN / THE OPERATING FREQUENCY*.

---

## 1. Motion Philosophy: Physics, Weight & Tempo

Motion on this website is an expression of **physicality, momentum, and musical timing**—never decorative flashiness.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ 1. MOTION MUST SERVE MEANING: Explaining relationships, reveals, and state. │
│ 2. SILENCE OVER CONTINUOUS MOTION: No endless ambient loops or particles.  │
│ 3. WEIGHT & RESISTANCE: Elements enter with natural deceleration.          │
│ 4. DISAPPEAR ON COMPLETION: Animations exit the GPU pipeline once done.     │
│ 5. TOTAL RESPECT FOR PREFERS-REDUCED-MOTION: Instant 0ms accessibility.    │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Easing Curves & Timing Tokens

| Motion Token | Duration | Cubic Bezier Curve | Semantic Purpose |
| :--- | :--- | :--- | :--- |
| `motion.tactile` | `150ms – 180ms` | `cubic-bezier(0.16, 1, 0.3, 1)` | Button depressions, link underlines, copy button triggers. |
| `motion.reveal` | `400ms – 500ms` | `cubic-bezier(0.16, 1, 0.3, 1)` | Staggered entrance of section headers, cards, and text blocks on scroll. |
| `motion.drawer` | `300ms – 350ms` | `cubic-bezier(0.25, 1, 0.5, 1)` | Expansion of timeline case studies and mobile navigation menu. |
| `motion.fade` | `250ms` | `ease-out` | Tooltip visibility, tab transitions, audio player mute/unmute. |

---

## 3. Interaction Behaviors

### A. Button & Link Hovers
- **Behavior:** Subtle 1px border brightness shift (`#1e293b` $\rightarrow$ `#334155`), background lift (`#121620` $\rightarrow$ `#1a202c`), and a crisp `1.5px` vertical lift (`translateY(-1.5px)`).
- **Prohibited:** Over-the-top magnetic warps, 3D card tilt transformations, or pulsating neon halos.

### B. Scroll Reveal Mechanics
- **Mechanism:** Triggered via lightweight `IntersectionObserver` with a `0.15` threshold.
- **Visuals:** Opacity transitions from `0` to `1` combined with a subtle vertical rise from `16px` to `0px`.
- **Throttling:** Elements animate once and then remain static in the DOM to eliminate ongoing GPU composite overhead.

### C. Audio Visualizer (The Listening Room)
- **Mechanism:** When user explicitly plays an audio track, SVG/Canvas frequency bars react with smooth height scaling.
- **Performance Guard:** Render loop throttled to 30fps with automatic suspension on pause or tab backgrounding.

---

## 4. Accessibility & Reduced Motion Governance

```css
@media (prefers-reduced-motion: reduce) {
  *, ::before, ::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

- When reduced motion is requested, all layout components render in their final, fully-visible state immediately.
