# PHASE 3A · PRE-IMPLEMENTATION ARCHITECTURE AUDIT & MIGRATION PLAN
**Document ID:** `PHASE-3A-MIGRATION-2026-09-09`  
**Target:** `postlain_cv_portfolio / src/frontend`  
**Status:** APPROVED FOR SURGICAL EXECUTION  

---

## 1. RUNTIME ARCHITECTURE AUDIT (BEFORE MIGRATION)

### 1.1. Current Entry Point & Composition
* `index.html`: Loads Google Fonts (Montserrat, Cormorant Garamond, Plus Jakarta Sans, Space Grotesk) and mounts `/src/frontend/main.tsx`.
* `src/frontend/main.tsx`: Renders `<React.StrictMode><App /></React.StrictMode>`.
* `src/frontend/App.tsx` (440 lines): Monolithic component acting as slide-deck state manager, live Da Lat clock runner, touch/wheel swipe interceptor, audio sound blip trigger, and container for 5 full-screen acts.

### 1.2. Global Styles & Constraints (`src/frontend/styles/global.css`)
* `overflow: hidden; height: 100%;` on `html, body, #root` — forces 100vh viewport trapping and disables native scroll.
* `cursor: none !important;` globally — disables native OS cursor.
* `user-select: none;` — prevents text selection.
* `.glass-panel`, `.text-gradient-lime` — legacy AI styling clichés.

### 1.3. Component Inventory & Classification

| Existing File Path | Category | Classification | Rationale & Migration Strategy |
| :--- | :--- | :---: | :--- |
| `src/frontend/App.tsx` | Root Component | **REFACTOR** | Deconstruct into a thin (<100 lines) composition root composing `Layout`, `Masthead`, sections, and `Colophon`. |
| `src/frontend/styles/global.css` | Global CSS | **ADAPT** | Purge 100vh lock, cursor override, user-select override, and gradient clichés. Restore native document flow. |
| `tailwind.config.js` | Styling Config | **ADAPT** | Inject semantic tokens from `DESIGN_TOKENS.md` (colors, typography scales, spacing, radii). |
| `src/frontend/stores/usePortfolioStore.ts` | State Store | **ADAPT** | Refactor into `useAppStore.ts` managing `locale`, `activeSection`, and `audioState` without procedural sound blip triggers. |
| `src/frontend/constants/dictionary.ts` | Content | **REPLACE** | Replace with typed bilingual single-source-of-truth modules (`src/frontend/content/content.vi.ts`, `content.en.ts`). |
| `src/frontend/constants/profile.ts` | Content | **DELETE** | Redundant duplicate of `dictionary.ts`. Fully superseded by `src/frontend/content/`. |
| `src/frontend/lib/audio.ts` | Audio Synth | **REPLACE** | 449-line Web Audio beep synthesizer. Replace with lightweight `src/frontend/hooks/useAudioController.ts` streaming controller. |
| `src/frontend/lib/utils.ts` | Utility | **KEEP** | `clsx` + `tailwind-merge` (`cn` helper) — standard utility. |
| `src/frontend/components/CinematicPreloader.tsx` | Component | **DELETE** | Artificial 0.65s delay timer with fake spinning orb; adds zero value to modern fast web. |
| `src/frontend/components/CustomCursor.tsx` | Component | **DELETE** | Hijacks OS cursor, degrades performance, harms accessibility. |
| `src/frontend/components/ViewfinderFrame.tsx` | Component | **DELETE** | Fake sci-fi HUD brackets (`SPEC_SYS`, `CORE_LOAD 60FPS`). |
| `src/frontend/components/ScrollyScene3D.tsx` | Component | **DELETE** | Imperative 2D canvas drawing fake particle circles; continuous unneeded RAF loop. |
| `src/frontend/components/SpatialSpiral3D.tsx` | Component | **DELETE** | Orphaned 3D carousel with unreadable rotating cards. |
| `src/frontend/components/CareerTour3D.tsx` | Component | **DELETE** | Misnamed 2D carousel box with glow blobs. Superseded by `Chapter01Orchestration.tsx`. |
| `src/frontend/components/SonicDeck.tsx` | Component | **DELETE** | Synthetic 8-bit drum pad soundboard. Superseded by `AudioPlayerBar.tsx`. |
| `src/frontend/components/EdgeDispatch.tsx` | Component | **DELETE** | Duplicate form with fake server latency monitor. |
| `src/frontend/components/DirectDispatch.tsx` | Component | **ADAPT** | Extract and adapt working Hono Worker fetch logic into clean `ContactForm.tsx`. |
| `src/frontend/components/HiddenMusicShowcase.tsx` | Component | **REPLACE** | Superseded by `Chapter02SonicSpace.tsx`. |
| `src/frontend/components/MatrixAndEducation.tsx` | Component | **REPLACE** | Superseded by `Chapter03Matrix.tsx`. |
| `src/backend/worker.ts` | Backend Worker | **KEEP** | Functional Hono Edge Worker with MailChannels email dispatch. No changes required. |
| `src/db/schema.ts` | Database Schema | **KEEP** | Preserved for future database integrations. |

---

## 2. TARGET FOUNDATION ARCHITECTURE (AFTER PHASE 3A)

```
src/frontend/
├── content/
│   ├── types.ts                    # Strict TypeScript bilingual schema contract
│   ├── content.vi.ts               # Single-source-of-truth Vietnamese content
│   └── content.en.ts               # Single-source-of-truth English content
├── core/
│   ├── Layout.tsx                  # Base layout wrapper & skip link
│   ├── Masthead.tsx                # Sticky editorial header (Clock, Locale, Sound, Nav)
│   ├── Colophon.tsx                # Clean colophon footer
│   └── AudioPlayerBar.tsx          # Audio player with streaming fallback states
├── sections/
│   ├── Chapter00Overture.tsx       # Entry, Master Wordmark, Thesis
│   ├── Chapter01Orchestration.tsx  # Chronological operational timeline (2019-2026)
│   ├── Chapter02SonicSpace.tsx     # Hidden Music venture & acoustic showcase
│   ├── Chapter03Matrix.tsx         # Capabilities & Academic foundation
│   └── Chapter04Transmission.tsx   # Contact station & Edge email form
├── components/
│   ├── EditorialGrid.tsx           # Asymmetric 12-column grid primitive
│   ├── EditorialSection.tsx        # Section container with rhythm clamp
│   ├── EditorialMediaSlot.tsx      # Aspect-ratio media container with SVG fallback
│   ├── TimelineNode.tsx            # Expandable timeline item
│   ├── CapabilityCard.tsx          # Structured capability card
│   ├── ContactForm.tsx             # Clean form connected to /api/contact
│   └── Divider.tsx                 # 1px structural hairline rule
├── hooks/
│   ├── useAudioController.ts       # HTML5 Audio controller (READY/UNAVAILABLE/PLAYING/PAUSED)
│   ├── useLiveClock.ts             # Da Lat GMT+7 live clock hook
│   └── useActiveSection.ts         # Section IntersectionObserver hook
├── stores/
│   └── useAppStore.ts              # Clean Zustand store (locale, activeSection, audioState)
├── styles/
│   └── global.css                  # Cleaned global styles (normal scroll, native cursor)
├── lib/
│   └── utils.ts                    # cn helper
├── App.tsx                         # Thin composition root (<100 lines)
└── main.tsx                        # Application mount
```

---

## 3. CHANGE SAFETY & VERIFICATION GATES

1. **Step-by-Step Execution:**
   - Content schema & bilingual data created first.
   - Design tokens injected into `tailwind.config.js`.
   - Global styles cleaned in `global.css`.
   - New primitives, hooks, store, and section contracts created.
   - Obsolete components removed.
   - `App.tsx` composed.
2. **Build Verification:** Run `npm run build` to guarantee zero missing imports, zero dead references, and complete type safety.
