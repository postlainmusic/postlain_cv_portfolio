# POSTLAIN — MASTER IMPLEMENTATION BLUEPRINT v2.0
## The Cinematic Interactive Visual Autobiography

> **Core Axiom:** POSTLAIN is NOT a portfolio with WebGL effects. It is an **interactive visual autobiography** where the visitor physically travels through a continuous landscape that embodies a person's life journey:  
> **DESERT (The Beginning / Uncertainty) $\rightarrow$ VOLCANO (Energy / Birth of Ngô Phúc) $\rightarrow$ WATERFALL (Aspiration / Dedication) $\rightarrow$ ANCIENT FOREST (Real Career Milestones Carved into Trees) $\rightarrow$ STORM (Pressure / Transformation) $\rightarrow$ MOON & STARS (Dream, Future & Genuine Connection).**

---

# 01. CREATIVE THESIS

1. **The Purpose:** The visitor does not browse a catalog of projects or read a resume document. They move through an authored, cinematic, physical world. The technology disappears completely into the atmosphere, materiality, and emotional resonance of the story.
2. **Restraint Over Spectacle:** The interface is silent and spacious where the story begins in uncertainty, intense and kinetic where passion erupts, deep and continuous where aspiration flows, grounded and historical where real experience was earned, and vast and quiet where the future resolves.
3. **Physical Consequence:** Every user movement (pointer velocity, touch drag, wheel inertia) is a physical force that acts upon environmental materials, which in turn act upon typography, causing composition shifts and revealing narrative milestones. Interaction creates consequence, never just isolated animation.
4. **Authenticity:** No fake metrics, no generic 3D asset clutter, no AI-generated cyber neon gradients, no SaaS cards. The career history is 100% factual and grounded in Ngô Phúc's real journey (Viva Star Coffee $\rightarrow$ SB Studio $\rightarrow$ Phủi Steak $\rightarrow$ ALDO GO! $\rightarrow$ Hidden Music).

---

# 02. NARRATIVE MODEL

The narrative is a single, continuous, unbroken transformation across 6 physical states:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         THE AUTOBIOGRAPHICAL ARC                            │
├─────────────────────────────────────────────────────────────────────────────┤
│ 1. DESERT      │ The starting point: dry, spacious, quiet mineral silence.  │
│                │ Represents uncertainty, the first step, an open canvas.    │
│ 2. VOLCANO     │ Subsurface heat build-up, cracks, magma, eruption.         │
│                │ Represents passion, energy, the physical birth of NGÔ PHÚC.│
│ 3. WATERFALL   │ Molten rock cools, condenses, liquefies into a torrent.   │
│                │ Represents aspiration, dedication, relentless flow.        │
│ 4. FOREST      │ Water divides and nourishes soil; ancient trees sprout.    │
│                │ Represents accumulated experience; the trees ARE the CV.   │
│ 5. STORM       │ Wind gathers, leaves tear away, atmosphere destabilizes.   │
│                │ Represents pressure, transition, clearing the unnecessary. │
│ 6. MOON/STARS  │ Clouds part to reveal nocturnal starlight and lunar calm. │
│                │ Represents dream, future, Hidden Music, and human contact. │
└─────────────────────────────────────────────────────────────────────────────┘
```

There are **zero hard cuts**, **zero page reloads**, and **zero UI section indicators**.

---

# 03. GLOBAL STAGE

- **Viewport Dimension:** Locked strictly to `100dvh` $\times$ `100vw` with `overflow: hidden`.
- **Single-Stage Paradigm:** The viewport is a cinematic lens looking into a boundless coordinate space.
- **Multi-Directional Spatial Axes:** While user scroll is normalized to a 1D timeline $[0.00, 1.00]$, the world's physical camera translates across multi-dimensional axes:
  - *Desert:* Forward camera dolly into the z-plane (depth).
  - *Volcano:* Upward camera tilt & vertical ascent (y-positive).
  - *Waterfall:* Downward camera plunge following the water current (y-negative).
  - *Forest:* 90-degree spatial pivot $\rightarrow$ continuous horizontal tracking shot (x-positive).
  - *Storm:* Multi-axis rotational shake & atmospheric vortex.
  - *Moon:* Upward crane tilt to vast open nocturnal celestial sphere.

---

# 04. SCROLL / TIMELINE MODEL

The global timeline is normalized continuously as $T \in [0.00, 1.00]$:

```
[0.00 ─────── 0.12]  DESERT (Stillness, subtle dust wake)
[0.12 ─────── 0.22]  TRANSITION: Desert → Volcano (Tension, subsurface glow, cracks)
[0.22 ─────── 0.36]  VOLCANO (Eruption, magma letters form NGÔ PHÚC / POSTLAIN)
[0.36 ─────── 0.46]  TRANSITION: Volcano → Waterfall (Cooling, steam condensation, liquefaction)
[0.46 ─────── 0.60]  WATERFALL (Drifting refractive typography, fluid turbulence)
[0.60 ─────── 0.68]  TRANSITION: Waterfall → Forest (Water divides, moist earth, sprouting roots)
[0.68 ─────── 0.84]  FOREST (Horizontal CV journey across 4 ancient trees)
[0.84 ─────── 0.90]  TRANSITION: Forest → Storm (Wind acceleration, foliage dispersion)
[0.90 ─────── 0.94]  STORM (Peak atmospheric turbulence, clouds clearing)
[0.94 ─────── 1.00]  MOON + STARS (Lunar stillness, Hidden Music, celestial Contact)
```

- **Tuning Mechanism:** Progress is governed by a virtual spring-damper timeline interpolator:
  $$\Delta T = \frac{v_{\text{scroll}} \cdot \text{sensitivity}}{1 + \text{friction}}$$
- **Reverse Scrubbing:** Scrolling upward reverses physical simulations symmetrically (steam re-condenses to lava, trees recede to saplings, water climbs upward), maintaining temporal continuity.

---

# 05. INPUT MODEL

The Input Engine coalesces mouse, trackpad wheel, touch drag, and keyboard navigation into normalized **Force Events**:

```
Input Sources (Mouse / Touch / Wheel / Keyboard)
                     │
                     ▼
          ┌─────────────────────┐
          │   Input Coalescer   │ (4–8 ForceEvents per frame budget)
          └──────────┬──────────┘
                     │
         ┌───────────┴───────────┐
         ▼                       ▼
┌──────────────────┐   ┌──────────────────┐
│  Timeline Engine │   │   Physics Grid   │
│ (Scroll Progress)│   │ (Local Impulse)  │
└──────────────────┘   └──────────────────┘
```

- **ForceEvent Properties:** $\{x, y, dx, dy, \text{velocity}, \text{pressure}, \text{radius}, \text{duration}\}$.
- **Pointer Impulse:** Pointer movement deposits localized velocity vectors $\vec{F}$ into the active material simulation grid.
- **Wheel/Touch Velocity:** Scroll velocity feeds directly into environmental atmospheric energy (wind speed, wave frequency, magma turbulence).

---

# 06. DESERT (The Beginning / Uncertainty)

### Visual Composition Map
```
┌─────────────────────────────────────────────────────────────┐
│ (0,0)                                                       │
│                PALE DRY ATMOSPHERE [35% vh]                 │
│                                                             │
│  [Embedded Greeting: "Nơi mọi thứ bắt đầu trong tĩnh lặng"] │
│                                                             │
│ ──────────────── HORIZON LINE (y = 58% vh) ──────────────── │
│                                                             │
│          MINERAL DUST & DRY GROUND [42% vh]                 │
│          (Subtle dune ridges, mineral grain)                │
│                                                       (w,h) │
└─────────────────────────────────────────────────────────────┘
```

- **Camera & Lighting:** Wide angle ($FOV = 50^\circ$), camera height $y = 1.2m$, gazing slightly down toward horizon. Warm, low-contrast, diffused mineral sunlight ($2800K$) casting long, pale shadows from the left.
- **Negative Space:** Over $70\%$ of the viewport is unencumbered open landscape.
- **Typography:**
  - *Content (VI):* `"Không biết không phải là khoảng trống. Đó là nơi hành trình bắt đầu."`
  - *Content (EN):* `"Uncertainty is not an empty void. It is where everything begins."`
  - *Style & Placement:* Cormorant Garamond, 24px/32px, opacity $0.45$, tracking $+0.08em$, centered at $y = 48\% vh$, rendered as ground-embedded mineral engraving.
  - *Interaction:* Pointer movement disperses fine sand particles away from the text, temporarily increasing contrast. High scroll velocity creates a low dust wake across the dune floor.

---

# 07. TRANSITION: DESERT $\rightarrow$ VOLCANO

- **Trigger ($T: 0.12 \rightarrow 0.22$):** Continuous scroll input increases subterranean temperature.
- **Physical Sequence:**
  1. *Ground Tension ($T = 0.14$):* Horizon line darkens; low-frequency ambient vibration begins.
  2. *Fracture & Glow ($T = 0.17$):* Fine linear cracks propagate across the dry desert bed. An inner amber/crimson glow ($1200^\circ C$) bleeds through the fractures.
  3. *Thermal Convection ($T = 0.20$):* Mineral dust particles ignite into glowing thermal embers, rising vertically under buoyancy forces.
  4. *Elevation ($T = 0.22$):* The desert floor bulges upward, displacing the camera perspective into the base of a volcanic crater.

---

# 08. VOLCANO (Energy / Birth of Ngô Phúc)

### Visual Composition Map
```
┌─────────────────────────────────────────────────────────────┐
│ (0,0)                                                       │
│             VOLCANIC SKY & SMOKE PLUME [25% vh]             │
│                                                             │
│              [ NGÔ PHÚC ] (Primary Mass)                    │
│             [ P O S T L A I N ] (Ember Core)                │
│                                                             │
│             MOLTEN CRATER & MAGMA CORE [50% vh]             │
│                                                             │
│           BASALT ROCK BASE & FRACTURES [25% vh]             │
│                                                       (w,h) │
└─────────────────────────────────────────────────────────────┘
```

- **The Physical Birth of Identity:**
  - The letters do NOT drop in as CSS text.
  - Magma bubbles reach critical pressure at the crater center. Molten rock fragments erupt upward.
  - Under surface tension and gravitational attraction, incandescent magma clots coalesce into letterforms:
    1. **`NGÔ PHÚC`** (Dominant display serif, $72\text{px} - 110\text{px}$, fiery amber core `#cf4525` cooling to deep basalt `#10110f`).
    2. **`POSTLAIN`** (Sub-identity, spaced monospace tracking $+0.25em$, nestled beneath).
- **Physics Behavior:** Elastic stretch under eruption force $\rightarrow$ upward acceleration $\rightarrow$ gravitational deceleration $\rightarrow$ crisp, locked editorial settling at $y = 38\% vh$.
- **Interaction:** Pointer dragging pulls magma tendrils; release triggers an elastic snap-back with flying ember sparks.

---

# 09. TRANSITION: VOLCANO $\rightarrow$ WATERFALL

- **Trigger ($T: 0.36 \rightarrow 0.46$):** Downward scroll initiates thermodynamic cooling.
- **Physical Sequence:**
  1. *Thermal Quenching ($T = 0.38$):* Magma color grades rapidly from brilliant yellow-orange `#ff8833` to slate basalt `#2a2b28`.
  2. *Condensation Vapor ($T = 0.41$):* White steam plumes billow across the viewport, diffusing the sharp lighting.
  3. *Liquefaction ($T = 0.44$):* The dense vapor condenses into heavy liquid droplets. Droplets merge into fluid streams.
  4. *Gravity Shift ($T = 0.46$):* The volcanic caldera fractures open, releasing a roaring mineral torrent downward into the waterfall chasm.

---

# 10. WATERFALL (Aspiration / Dedication)

### Visual Composition Map
```
┌─────────────────────────────────────────────────────────────┐
│ (0,0)                                                       │
│            UPPER CHASM & FALLING WATERFALL [30% vh]         │
│                                                             │
│   "KHÁT VỌNG" / "DEDICATION" (Drifting Inside Current)      │
│                                                             │
│            DEEP MINERAL WATER SURFACE [45% vh]              │
│            (Refractive Voronoi Caustics, Vortices)          │
│                                                             │
│            SUBMERGED BEDROCK & MIST [25% vh]                │
│                                                       (w,h) │
└─────────────────────────────────────────────────────────────┘
```

- **Baseline Preservation:** Retains the verified 2D discrete wave grid simulation ($128 \times 72$, damping $0.965$) as the physics engine, enhanced with refractive caustics.
- **Typography in Current:**
  - *Phrases:*
    1. `DÒNG CHẢY KHÁT VỌNG` (Aspiration Flow)
    2. `KIÊN TRÌ TÍCH TỤ TỪNG GIỌT NHỎ` (Persistent accumulation of every single drop)
  - *Fluid Physics Coupling:* Letters act as buoyant rigid bodies immersed in the fluid grid:
    $$\vec{v}_{\text{glyph}}(t+1) = \vec{v}_{\text{glyph}}(t) \cdot 0.92 + \vec{v}_{\text{fluid}}(x, y) \cdot 0.15$$
  - Refraction shader distorts glyph contours dynamically based on local surface slope $(\frac{\partial h}{\partial x}, \frac{\partial h}{\partial y})$.
- **Interaction:** Rapid scroll accelerates the downward water flow; pointer scrubbing creates wide ripple wakes and whirlpools that spin passing glyphs.

---

# 11. TRANSITION: WATERFALL $\rightarrow$ FOREST

- **Trigger ($T: 0.60 \rightarrow 0.68$):** The waterfall impacts the bedrock pool.
- **Physical Sequence:**
  1. *Water Division ($T = 0.62$):* The downward torrent parts into two lateral streams running left and right.
  2. *Soil Saturation ($T = 0.64$):* Dark, rich forest earth emerges between the parting streams. Moisture absorbs into the soil.
  3. *Sprouting Network ($T = 0.66$):* Fine mycorrhizal roots germinate and race across the ground, thickening into structural root systems.
  4. *Spatial Pivot ($T = 0.68$):* The camera smoothly pivots $90^\circ$ to horizontal orientation, looking down a majestic forest aisle.

---

# 12. FOREST SPATIAL SYSTEM (The Horizontal Autobiography)

- **Spatial Coordinate Architecture:**
  - Continuous horizontal plane of length $L = 400\text{vw}$.
  - Vertical user scroll $[0.68, 0.84]$ maps bijectively to camera x-position $X \in [0, 400\text{vw}]$:
    $$X_{\text{cam}}(T) = \left( \frac{T - 0.68}{0.84 - 0.68} \right) \cdot 400\text{vw}$$
- **Parallax Depth Layers ($z$-depth):**
  1. *Layer 0 (Far Background, $z = -800\text{px}$, speed $0.15\times$):* Distant mountain ridge, morning mist, dense silhouette tree canopies.
  2. *Layer 1 (Midground, $z = -300\text{px}$, speed $0.5\times$):* Ancient secondary trunks, hanging moss, shafts of volumetric sunlight (god rays).
  3. *Layer 2 (Narrative Focus Plane, $z = 0\text{px}$, speed $1.0\times$):* The 4 Primary CV Milestone Trees.
  4. *Layer 3 (Foreground Foreground, $z = +200\text{px}$, speed $1.4\times$):* Giant foreground oak boughs and drifting leaves passing close to the lens.

---

# 13. FOREST CV CONTENT (The 4 Milestone Trees)

All content is 100% strictly derived from the verified CV repository:

```
[ TREE 01: x = 40vw ]      [ TREE 02: x = 140vw ]     [ TREE 03: x = 240vw ]     [ TREE 04: x = 340vw ]
 VIVA STAR COFFEE           SB STUDIO                  PHỦI STEAK                 ALDO GO! ĐÀ LẠT
 05/2019 — 01/2020          03/2023 — 10/2024          10/2024 — 06/2025          06/2025 — 07/2026
 Ca Trưởng Pha Chế          Quản Lý Phòng Thu          Ca Trưởng & Bếp Chính      Quản Lí Cửa Hàng
 (Frontline Discipline)     (Studio & MCN Ops)         (Culinary Command)         (Retail Operations)
```

### Detailed Milestone Information Model:
1. **Tree 01 // Viva Star Coffee (05/2019 — 01/2020):**
   - *Carved Title:* `VIVA STAR COFFEE · 2019`
   - *Role:* `CA TRƯỞNG PHA CHẾ` (Shift Lead / Barista Lead)
   - *Core Narrative:* Pha chế cà phê & trà theo quy chuẩn; điều phối ca làm việc và rèn luyện tính kỷ luật vận hành đầu đời.
2. **Tree 02 // SB Studio (03/2023 — 10/2024):**
   - *Carved Title:* `SB STUDIO · 2023`
   - *Role:* `QUẢN LÝ PHÒNG THU` (Studio & Artist Manager)
   - *Core Narrative:* Quản lý tài chính, lịch sản xuất MV/Audio chuẩn phát hành; quản lý nghệ sĩ độc quyền & kết nối đối tác MCN.
3. **Tree 03 // Phủi Steak (10/2024 — 06/2025):**
   - *Carved Title:* `PHỦI STEAK · 2024`
   - *Role:* `CA TRƯỞNG BẾP & BẾP CHÍNH` (Kitchen Lead & Head Cook)
   - *Core Narrative:* Chuyên trách Steak bò Âu cao cấp; quản lý nguyên vật liệu & điều phối nhân sự trong ca cao điểm.
4. **Tree 04 // ALDO GO! Đà Lạt (06/2025 — 07/2026):**
   - *Carved Title:* `ALDO GO! ĐÀ LẠT · 2025`
   - *Role:* `QUẢN LÍ CỬA HÀNG` (Store Manager)
   - *Core Narrative:* Quản lý toàn diện cửa hàng, kiểm soát tồn kho, tối ưu hóa nhân sự và trực tiếp thúc đẩy tăng trưởng doanh số.

---

# 14. CARVED TYPOGRAPHY SYSTEM

To prevent "flat text pasted over trees", the Carved Typography System uses a **2.5D Surface Normal Displacement Hybrid**:

```
┌─────────────────────────────────────────────────────────────┐
│ 1. Base Trunk Geometry / Texture (Bark roughness & depth)   │
│ 2. Normal Map Inversion Mask (Letters carved -2mm into bark)│
│ 3. Directional Sunlight Ray (Catches top bevel of incision) │
│ 4. Ambient Occlusion Crevice Shadow (Inside deep cuts)      │
│ 5. Semantic DOM Anchor (Invisible, 100% accessible to a11y)│
└─────────────────────────────────────────────────────────────┘
```

- **Visual Illusion:** Incised letters share the cylindrical warp and grain orientation of the trunk. As the camera tracks past, specular light glints off the carved edges.
- **Hierarchy:**
  - *Primary (Carved Deep into Bark):* Company Name & Year ($36\text{px}$, Cormorant Garamond Small Caps).
  - *Secondary (Lichen/Embossed Wood):* Role & Period ($18\text{px}$, Space Grotesk).
  - *Tertiary (Revealed on Proximity):* Key operational bullet points, subtle warm amber glow.

---

# 15. TRANSITION: FOREST $\rightarrow$ STORM

- **Trigger ($T: 0.84 \rightarrow 0.90$):** Passing Tree 04 triggers atmospheric turbulence.
- **Physical Sequence:**
  1. *Wind Build-Up ($T = 0.85$):* Ambient lighting cools from golden morning rays to ominous charcoal green. Tree boughs bend rightward.
  2. *Leaf Detachment ($T = 0.87$):* Thousands of foliage particles break free, streaming horizontally across the camera lens.
  3. *Camera Shudder ($T = 0.89$):* Camera tracking loses rigid constraint, experiencing smooth micro-tremors and rotational tilt.
  4. *Atmospheric Obscuration ($T = 0.90$):* Swirling vortex of wind, dust, and rain blankets the forest, sweeping the physical trunks away.

---

# 16. STORM (Pressure / Transformation / Clearing)

- **Narrative Meaning:** The chaotic pressure of life, career shifts, creative struggle, and the stripping away of all non-essential noise.
- **Visual Composition:** Fullscreen kinetic particle vortex ($8,000$ wind vectors). Lightning flashes illuminate deep volumetric storm clouds.
- **Typography Behavior:** Residual career glyphs tear apart into kinetic lines under heavy drag forces, sweeping across the viewport before disintegrating into pure energy.
- **Auditory Intensity:** Bass rumble with surging high-frequency wind shears.

---

# 17. TRANSITION: STORM $\rightarrow$ MOON

- **Trigger ($T: 0.90 \rightarrow 0.94$):** Peak storm reaches critical entropy.
- **Physical Sequence:**
  1. *Wind Decay ($T = 0.91$):* Rotational particle velocity rapidly decelerates with high damping factor ($0.88$).
  2. *Cloud Dissipation ($T = 0.92$):* Heavy storm clouds split along a central vertical fault line, rolling outward to the screen margins.
  3. *Celestial Emergence ($T = 0.93$):* A deep, quiet midnight indigo sky (`#080a0f`) appears behind the parting storm.
  4. *Lunar Stillness ($T = 0.94$):* A radiant, silver-mineral crescent moon crests into view. Total silence settles.

---

# 18. MOON + STARS (Dream / Future / Resolution)

### Visual Composition Map
```
┌─────────────────────────────────────────────────────────────┐
│ (0,0)                                                       │
│            VAST NOCTURNAL CELESTIAL FIELD [35% vh]          │
│            (Subtle twinkling starlight, silver dust)        │
│                                                             │
│            RADIANT CRESCENT MOON (x = 75% vw, y = 20% vh)   │
│                                                             │
│   [ HIDDEN MUSIC ARTIFACT ]      [ HUMAN CONTACT PORTAL ]   │
│   (Sonic living gateway)         (Ngô Phúc / Direct Email)  │
│                                                             │
│            SETTLED MINERAL HORIZON [20% vh]                 │
│                                                       (w,h) │
└─────────────────────────────────────────────────────────────┘
```

- **Emotional Atmosphere:** Immense negative space, sublime clarity, profound calm.
- **Lighting:** Cool silver moonlight ($5600K$) bathing subtle floating mineral dust.

---

# 19. CONTACT DISCOVERY (The Human Ground)

Contact is NOT a jarring white corporate form. It is a **Moonlit Translucent Mineral Surface**:

```
┌─────────────────────────────────────────────────────────────┐
│  NGÔ PHÚC                                                   │
│  Operations & Studio Manager · Multidisciplinary Creator    │
│  ─────────────────────────────────────────────────────────  │
│  Hotline:  0938-649-420   [ CALL NOW ]  [ COPY NUMBER ]     │
│  Email:    hello@postlain.com  /  studionopu@gmail.com      │
│  Location: Đà Lạt, Lâm Đồng (GMT+7)                         │
│  ─────────────────────────────────────────────────────────  │
│  "Led by logic. Elevated by art."                           │
└─────────────────────────────────────────────────────────────┘
```

- **Interactive Physics:** Approaching the contact region aligns celestial particles into subtle connection lines (constellation effect).
- **Usability:** 1-touch telephone dial, 1-click clipboard copy with tactile spring feedback, semantic `<form>` and accessible links.

---

# 20. HIDDEN MUSIC (The Living Artifact)

- **Authenticity:** [https://hiddenmusic.postlain.com](https://hiddenmusic.postlain.com) is Ngô Phúc's real, active digital audio research venture.
- **Visual Representation:** An ethereal, pulsating harmonic ring suspended in the moonlit field.
- **Behavior:** Pointer proximity excites harmonic resonance (subtle procedural sine drone). Clicking opens the live artifact gateway with a spatial expansion transition.

---

# 21. TYPOGRAPHY SYSTEM (The Material Language)

Typography is a physical substance possessing real mass, elasticity, and recovery:

```typescript
export interface GlyphPhysicsState {
  x: number;
  y: number;
  vx: number;
  vy: number;
  originX: number;
  originY: number;
  mass: number;
  damping: number;
  stiffness: number;
  deformation: number;
  temperature: number;
  isSettled: boolean;
}
```

- **Physics Integration (Semi-Implicit Euler):**
  $$v(t + \Delta t) = v(t) + \frac{F_{\text{spring}} + F_{\text{drag}} + F_{\text{external}}}{m} \Delta t$$
  $$x(t + \Delta t) = x(t) + v(t + \Delta t) \Delta t$$
- **Absolute Readability Law:** All primary content (headings, company names, contact numbers) must enforce maximum displacement clamping ($\le 12\text{px}$) and settle back to $100\%$ crisp, static geometry within $600\text{ms}$ of interaction cessation.

---

# 22. MATERIAL SYSTEM (Data-Driven Profiles)

| Profile | Viscosity | Friction | Drag | Temperature | Buoyancy | Restitution |
|---|---|---|---|---|---|---|
| `DESERT` | $0.05$ | $0.85$ | $0.12$ | $45^\circ C$ | $0.00$ | $0.10$ |
| `VOLCANO` | $0.95$ | $0.20$ | $0.05$ | $1200^\circ C$ | $+0.80$ | $0.40$ |
| `WATERFALL`| $0.15$ | $0.02$ | $0.08$ | $16^\circ C$ | $+0.25$ | $0.65$ |
| `FOREST` | $0.70$ | $0.60$ | $0.35$ | $22^\circ C$ | $0.00$ | $0.05$ |
| `STORM` | $0.01$ | $0.01$ | $0.95$ | $10^\circ C$ | $+0.50$ | $0.80$ |
| `MOON` | $0.00$ | $0.98$ | $0.01$ | $-20^\circ C$ | $0.00$ | $0.90$ |

---

# 23. CAMERA / SPATIAL SYSTEM

The global camera is driven by a smooth Catmull-Rom spline trajectory parametrized by $T \in [0.00, 1.00]$:

```
T = 0.00 (Desert)   : Pos(  0,  1.2,  5.0), LookAt(  0,  1.0,  0.0), FOV = 50°
T = 0.30 (Volcano)  : Pos(  0,  4.5,  3.2), LookAt(  0,  6.0, -1.0), FOV = 65°
T = 0.52 (Waterfall): Pos(  0, -2.0,  4.0), LookAt(  0, -8.0,  0.0), FOV = 55°
T = 0.75 (Forest)   : Pos(X(T), 1.5,  3.5), LookAt(X(T), 1.5,  0.0), FOV = 45°
T = 0.96 (Moon)     : Pos(  0,  2.0,  6.0), LookAt(  0,  3.5,  0.0), FOV = 40°
```

---

# 24. MOTION SYSTEM

- **Single RAF Ticker:** GSAP ticker serves as the single heartbeat (`gsap.ticker.add(engine.tick)`).
- **Zero Allocations in Loop:** All vectors, matrices, and arrays are pre-allocated at module scope.
- **Physics vs Choreography:** GSAP coordinates macro staging and camera target interpolation; the custom semi-implicit physics solver computes local particle and typography deformations.

---

# 25. AUDIO SYSTEM (Procedural Web Audio Engine)

A custom, procedural Web Audio synthesizer operating with zero external MP3 dependencies:

```
[ Central AudioContext ]
         │
         ├── Sub-Bass Drone (35Hz – 55Hz): Modulated by Volcano & Storm energy
         ├── Mineral Fluid Resonance (Bandpass Filtered White Noise): Modulated by Water velocity
         ├── Foliage Wind Shear (Pink Noise + Low-Frequency LFO): Modulated by Forest x-velocity
         ├── Tactile UI Click (700Hz Sine Burst with 35ms decay): Interactive feedback
         └── Master Gain & Mute Controller (User toggle + Autoplay safety)
```

---

# 26. MOBILE EXPERIENCE

- **Vertical Framing:** In the Forest chapter, horizontal traversal translates seamlessly into a stacked vertical parallax column with left/right alternating carved tree trunks.
- **Touch Physics:** Touch radius expanded ($48\text{px}$ minimum), multi-touch force coalescing, and reduced particle counts ($30\%$ of desktop).
- **Viewport Resilience:** `100dvh` dynamically recalculated to prevent mobile address bar jumping.

---

# 27. ACCESSIBILITY (WCAG 2.2 AA Compliance)

1. **Dual-Layer Architecture:** While WebGL and Canvas render the visual atmosphere, a complete, semantic DOM tree (`<main>`, `<section>`, `<h1>`, `<h2>`, `<article>`, `<a>`, `<button>`) exists in the accessibility tree.
2. **Screen Reader Live Regions:** As chapters transform, non-visual aria announcements inform assistive tech users of narrative transitions.
3. **`prefers-reduced-motion`:** Automatically disables particle physics, camera shake, and fluid turbulence, presenting calm, fade-based editorial typography.
4. **Contrast Verification:** Text on all colored or translucent surfaces strictly exceeds $4.5:1$ contrast ratio.

---

# 28. PERFORMANCE BUDGET & GOVERNOR

- **Desktop 60Hz Budget:** $\le 16.67\text{ms}$ per frame.
- **Desktop 120Hz Budget:** $\le 8.33\text{ms}$ per frame where supported.
- **Adaptive Performance Governor:** If average frame time exceeds $15\text{ms}$ over 60 consecutive frames:
  1. Clamps DPR from $2.0 \rightarrow 1.0$.
  2. Reduces fluid simulation resolution from $128\times 72 \rightarrow 64\times 36$.
  3. Reduces particle pool allocation by $50\%$.
  4. Drops physics solver from $60\text{Hz} \rightarrow 30\text{Hz}$ with render interpolation.

---

# 29. DATA MODEL

```typescript
export interface CVMilestone {
  id: string;
  yearStart: string;
  yearEnd: string;
  period: string;
  company: string;
  role: string;
  location: string;
  responsibilities: string[];
  subRoles?: Array<{ role: string; period: string; details: string[] }>;
}

export interface NarrativeChapter {
  id: 'desert' | 'volcano' | 'waterfall' | 'forest' | 'storm' | 'moon';
  range: [number, number];
  title: { vi: string; en: string };
  statement: { vi: string; en: string };
  materialProfile: string;
}
```

---

# 30. RENDERER STRATEGY (Hybrid Multi-Layer)

```
┌─────────────────────────────────────────────────────────────┐
│ LAYER 4: Accessible Semantic DOM & Tactile UI (HTML5 / CSS) │
├─────────────────────────────────────────────────────────────┤
│ LAYER 3: Kinetic Typography & Incised Tree Carving (Canvas) │
├─────────────────────────────────────────────────────────────┤
│ LAYER 2: 2D Fluid Simulation & Particle Physics (Canvas 2D) │
├─────────────────────────────────────────────────────────────┤
│ LAYER 1: 3D Celestial, Magma & Atmospheric Shaders (WebGL)  │
├─────────────────────────────────────────────────────────────┤
│ LAYER 0: Background Atmosphere & Vignette (CSS Gradient)    │
└─────────────────────────────────────────────────────────────┘
```

---

# 31. RUNTIME ARCHITECTURE

```typescript
export class PostlainExperienceRuntime {
  private timeline: NarrativeTimeline;
  private input: InputEngine;
  private physics: TypographyPhysicsEngine;
  private audio: ProceduralAudioEngine;
  private renderer: HybridRenderer;
  private governor: PerformanceGovernor;

  constructor(container: HTMLElement) {
    this.timeline = new NarrativeTimeline();
    this.input = new InputEngine(container);
    this.physics = new TypographyPhysicsEngine();
    this.audio = new ProceduralAudioEngine();
    this.renderer = new HybridRenderer(container);
    this.governor = new PerformanceGovernor();

    gsap.ticker.add(this.tick.bind(this));
  }

  private tick(time: number, deltaTime: number) {
    const forces = this.input.consumeForces();
    const progress = this.timeline.update(deltaTime);
    this.physics.update(forces, progress, deltaTime);
    this.audio.update(progress, forces);
    this.renderer.render(progress, this.physics.getGlyphStates(), forces);
    this.governor.sample(deltaTime);
  }
}
```

---

# 32. EXACT FILE ARCHITECTURE

```
src/frontend/narrative/
├── runtime/
│   ├── ExperienceRuntime.ts          # Central ticker & lifecycle manager
│   ├── NarrativeTimeline.ts          # Continuous [0.0, 1.0] scrub interpolator
│   └── PerformanceGovernor.ts        # Dynamic DPR & quality scaling
│
├── input/
│   ├── InputEngine.ts                # Coalesces mouse, wheel, touch & keys
│   └── ForceField.ts                 # 2D spatial force accumulation grid
│
├── typography/
│   ├── TypographyPhysicsEngine.ts   # Semi-implicit mass-spring glyph solver
│   ├── CarvedTypography.ts          # 2.5D bark normal-displacement renderer
│   └── GlyphPool.ts                 # Zero-allocation particle pool
│
├── materials/
│   └── MaterialProfiles.ts           # Physics parameters (Desert, Volcano, etc.)
│
├── scenes/
│   ├── DesertScene.ts                # Desert mineral dust & camera dolly
│   ├── VolcanoScene.ts               # Magma eruption & identity birth
│   ├── WaterfallScene.ts             # 2D Fluid stream & refractive caustics
│   ├── ForestScene.ts                # 400vw horizontal CV milestone aisle
│   ├── StormScene.ts                 # Kinetic vortex & cloud fault lines
│   └── MoonScene.ts                  # Starlight, Hidden Music & Contact
│
├── audio/
│   └── ProceduralAudioEngine.ts      # Web Audio procedural synthesizers
│
├── data/
│   └── autobiographyData.ts          # Ground-truth CV milestones & copy
│
├── renderer/
│   ├── HybridRenderer.ts             # Multi-layer canvas/webgl compositor
│   └── ResourcePool.ts               # Texture & geometry disposal routines
│
└── components/
    ├── NarrativeExperience.tsx       # Root React container & a11y DOM tree
    ├── CarvedTreeItem.tsx            # Tree milestone DOM anchor
    ├── MoonlitContactModal.tsx       # Translucent contact & hotline dialer
    └── AudioToggle.tsx               # Discreet audio wave status button
```

---

# 33. EXISTING REPOSITORY INTEGRATION

1. **Preserve Water Baseline:** `src/frontend/narrative/interaction/useWaterSimulation.ts` is wrapped and elevated by `WaterfallScene.ts`, retaining the proven 2D discrete wave grid math.
2. **Preserve CV Truth:** Integrates `CONTENT_VI` and `CONTENT_EN` from `src/frontend/content/` directly into `autobiographyData.ts`.
3. **Preserve Backend Cloudflare Integration:** Direct contact and email dispatch continue targeting the live Cloudflare Worker API `/api/contact`.

---

# 34. IMPLEMENTATION PHASES (Vertical Slices)

### Phase 1: Core Runtime & The Desert $\rightarrow$ Volcano Odyssey (Slice 1)
- **Deliverables:** `ExperienceRuntime.ts`, `NarrativeTimeline.ts`, `InputEngine.ts`, `TypographyPhysicsEngine.ts`, `DesertScene.ts`, `VolcanoScene.ts`.
- **Result:** Fully interactive beginning where desert dust responds to pointer, heats into cracks, and erupts into **NGÔ PHÚC / POSTLAIN**.

### Phase 2: Waterfall & Fluid Typography (Slice 2)
- **Deliverables:** `WaterfallScene.ts`, `MaterialProfiles.ts` water integration.
- **Result:** Magma cools into falling torrent; typography floats inside refractive water currents.

### Phase 3: The Ancient Forest CV Journey (Slice 3)
- **Deliverables:** `ForestScene.ts`, `CarvedTypography.ts`, `CarvedTreeItem.tsx`.
- **Result:** Vertical scroll translates to $400\text{vw}$ horizontal forest walk; 4 trees reveal Viva Star 2019, SB Studio 2023, Phủi Steak 2024, ALDO GO! 2025 incised into bark.

### Phase 4: Storm, Moonlit Sky & Contact Resolution (Slice 4)
- **Deliverables:** `StormScene.ts`, `MoonScene.ts`, `MoonlitContactModal.tsx`, `ProceduralAudioEngine.ts`.
- **Result:** Storm sweeps the forest clean; moon rises over quiet starlight; Hidden Music and direct contact hotline emerge.

### Phase 5: Mobile Optimization, Accessibility & SOTY Self-Audit
- **Deliverables:** Performance governor, touch physics adaptation, WCAG AA screen reader testing, and 60/120 FPS validation.

---

# 35. DEFINITION OF DONE

Every chapter and the complete experience must satisfy:
1. **Story Advance:** Every visual shift communicates an autobiographical phase.
2. **Tactile Consequence:** Pointer and scroll create tangible physical reactions.
3. **Readability Guaranteed:** All primary names, roles, and contacts return to $100\%$ crisp legibility.
4. **CV Truth:** All 4 milestones match historical employment facts.
5. **Continuous Continuity:** Zero abrupt scene cuts or blank transitions.
6. **Zero Memory Leaks:** WebGL geometries and canvas buffers strictly pooled and disposed.
7. **Performance Locked:** Minimum 60 FPS on standard desktop/mobile hardware.
8. **Awwwards Rubric:** Design $\ge 9.0$, Usability $\ge 9.0$, Creativity $\ge 9.0$, Content $\ge 8.5$.

---

# 36. FAILURE MODES / ANTI-PATTERNS (Prohibited)

- ❌ **Prohibited:** Generic SaaS cards, rectangular white forms, or dashboard HUDs.
- ❌ **Prohibited:** Neon cyber gradients, rainbow fluid shaders, or glassmorphism everywhere.
- ❌ **Prohibited:** Section numbers (`01/06`), progress bars, or "Scroll down" helper text.
- ❌ **Prohibited:** Multiple disconnected `requestAnimationFrame` loops or React `setState` inside the frame loop.
- ❌ **Prohibited:** Floating text overlaid over tree photos without bark integration.

---

# 37. FINAL END-TO-END USER JOURNEY (First-Time Visitor Experience)

1. **$0.00\text{s}$ (Arrival):** The screen opens onto a quiet, sun-baked mineral desert. No menus, no instructions. An embedded greeting rests quietly on the ground.
2. **First Movement:** The visitor moves their pointer; fine mineral dust stirs and catches the light.
3. **First Scroll:** The camera dollies forward. Ground temperature rises; fine fissures spread across the sand, glowing with subterranean amber heat.
4. **The Eruption:** Magma wells up from a volcanic fissure. Incandescent clots burst upward and cool under surface tension, forming the words **`NGÔ PHÚC`** and **`POSTLAIN`**.
5. **The Cooling & Plunge:** Magma turns to basalt; thick steam condenses into water. The crater falls away into a vertical chasm as a deep mineral waterfall surges downward, carrying refractive words of dedication.
6. **The Forest Aisle:** Water divides into the soil. Roots sprout, raising 4 monumental ancient trees. As the user continues scrolling vertically, the camera glides horizontally down the forest corridor.
7. **The Career Milestones:** Passing each tree, the visitor sees the actual career history carved deep into the weathered bark: Viva Star Coffee ($2019$), SB Studio ($2023$), Phủi Steak ($2024$), and ALDO GO! Đà Lạt ($2025$).
8. **The Storm:** Wind tears foliage from the boughs. A storm sweeps across the lens, dissolving the physical trees into kinetic lines of energy.
9. **The Moonlit Sky:** Clouds separate. A serene silver crescent moon illuminates a vast nocturnal expanse.
10. **The Resolution:** A living sonic artifact opens to **Hidden Music**. Starlight connects into constellations revealing **Ngô Phúc**, the direct hotline `0938-649-420`, and email `hello@postlain.com`. The journey is complete.
