# KNOWN FAILURES & ANTI-PATTERNS CATALOG (Layer 4 Memory)

> **Purpose:** Explicitly records verified failure modes, anti-patterns, and rejected design decisions so they are NEVER re-introduced into the codebase.

---

## 1. Catalog of Past Architectural & UX Failures

### KF-01: Global Cursor Hijacking & Selection Disabling
- **What Occurred:** `global.css` applied `*, *::before, *::after { cursor: none !important; }` and `body { user-select: none; }` to force users to interact through a custom lerped canvas/div cursor.
- **Why It Failed:** Breaks native OS accessibility, creates perceptible pointer lag on high refresh rate monitors, causes motion sickness, and prevents recruiters from selecting and copying text (phone numbers, emails, addresses).
- **Hard Constraint:** Native OS cursor must NEVER be hidden globally. Text selection must remain enabled across all content.

### KF-02: Rigid 100vh Viewport Lockout (Slide-Deck Syndrome)
- **What Occurred:** `html, body, #root` were set to `height: 100%; width: 100%; overflow: hidden;` with wheel/touch events intercepted and debounced by 600ms.
- **Why It Failed:** Destroys natural scroll physics, prevents smooth trackpad gestures, breaks mobile browser address bar resizing, truncates content on short viewports or high-DPI zoom, and prevents standard page bookmarking/deep linking.
- **Hard Constraint:** Page layout must support standard document flow or fluid hybrid scrolling with natural viewport responsiveness.

### KF-03: Deceptive "3D" and "System" Vocabulary
- **What Occurred:** Components and UI elements were decorated with fake sci-fi HUD terminology (`CareerTour3D.tsx` containing zero 3D math, `ViewfinderFrame.tsx` with fake GPS/FPS stats, `EdgeDispatch.tsx` with fake latency monitors).
- **Why It Failed:** Transforms a real human professional portfolio into an AI-generated sci-fi game mockup, alienating hiring managers and serious creative collaborators.
- **Hard Constraint:** Every label, metric, and term on the interface must represent genuine, verifiable facts.

### KF-04: Artificial 0.65s Blocking Preloader
- **What Occurred:** `CinematicPreloader.tsx` ran a dummy `setInterval` for 650ms to display a rotating gradient orb before revealing the page.
- **Why It Failed:** Delays time-to-first-contentful-paint (FCP) without loading any heavy assets, frustrating users on fast connections.
- **Hard Constraint:** No fake progress bars or artificial blocking delays. Preloaders are only permitted when streaming actual heavy 3D/audio binary assets.

### KF-05: Decorative Soundboard vs Authentic Music
- **What Occurred:** `SonicDeck.tsx` and `audio.ts` generated synthetic sine/square bleeps on click and generic 8-bit drum one-shots.
- **Why It Failed:** Trivializes Ngô Phúc's genuine music production venture (Hidden Music) by presenting cheap synth toy clicks instead of curated, high-fidelity audio excerpts.
- **Hard Constraint:** Audio interactions must be opt-in, discreet, and directly connected to authentic creative music productions.

### KF-06: Excessive Visual Noise & Cliché Stacking
- **What Occurred:** Every card combined: `rounded-[2.5rem]`, `backdrop-blur-2xl`, `border-white/10`, ambient radial gradient glow (`bg-[#a3e635]/10 blur-[100px]`), mono badge pills, uppercase headers, and sparkles icons.
- **Why It Failed:** Visual noise drowns out content hierarchy; every element screams for attention, resulting in zero focal clarity.
- **Hard Constraint:** Visual treatment must follow strict semantic restraint. Glows, borders, and blurs must be earned by content importance.
