# ARCHITECTURE FACTS & REPOSITORY FORENSICS (Layer 1 Memory)

> **Ground Truth Assessment:** Forensic comparison between claimed system architecture and actual implemented codebase.

---

## 1. Actual vs Claimed vs Missing vs Broken vs Uncertain

| Area | Claimed in Documentation | Actual in Source Code | Status | Evidence File Reference |
| :--- | :--- | :--- | :--- | :--- |
| **Frontend Framework** | React 18 + Vite 6 + TypeScript | React 18.3.1 + Vite 6.1.0 + TS 5.7.3 | **ACTUAL** | `package.json:29,56,57` |
| **Styling** | Tailwind CSS 3.4 + PostCSS | Tailwind CSS 3.4.17 + PostCSS 8.5.2 | **ACTUAL** | `package.json:51,55`, `tailwind.config.js` |
| **State Management** | Zustand 5 | Modular Zustand store | **ACTUAL** | `src/frontend/stores/usePortfolioStore.ts` |
| **Icons** | Lucide React | Lucide React 0.475.0 | **ACTUAL** | `package.json:28` |
| **Backend API** | Hono running on Cloudflare Workers | Hono 4.13.7 Worker handling `/api/health`, `/api/profile`, `/api/contact` | **ACTUAL** | `src/backend/worker.ts`, `wrangler.worker.toml` |
| **Email Dispatch** | MailChannels transactional email | Fetch to `api.mailchannels.net/tx/v1/send` in Worker | **ACTUAL** | `src/backend/worker.ts:97-124` |
| **Database & ORM** | Drizzle ORM + SQLite / PostgreSQL | Drizzle ORM schema defined in `src/db/schema.ts`, but **never imported or connected** in `worker.ts` | **BROKEN / ORPHANED** | `src/db/schema.ts:1-29`, `src/backend/worker.ts` |
| **Storybook** | Storybook component documentation | Storybook installed in `package.json`, but **zero `.stories.tsx` files** exist in `src/` | **CLAIMED / MISSING** | `package.json:37-43`, `src/frontend/components/` |
| **3D Rendering** | Awwwards-grade 3D engine | Imperative 2D Canvas drawing rotating rings & lerped particle points (`ScrollyScene3D.tsx`). Component `CareerTour3D.tsx` has **zero 3D code** (pure 2D card carousel). | **CLAIMED / DECEPTIVE** | `src/frontend/components/ScrollyScene3D.tsx`, `CareerTour3D.tsx` |
| **Custom Cursor** | Cinematic crosshair cursor | Custom div following mouse via RAF, but overrides OS cursor with `cursor: none !important;` globally. | **BROKEN UX** | `src/frontend/styles/global.css:30-33`, `CustomCursor.tsx` |
| **Preloader** | High-speed asset preloader | Dummy timer counting to 100% over 650ms; loads no actual assets. | **CLAIMED / FAKE** | `src/frontend/components/CinematicPreloader.tsx` |
| **Audio Engine** | Procedural sound engine | Web Audio API synth generating square/sine blips on UI click and a 16-step sequencer. | **ACTUAL (AESTHETIC MISMATCH)** | `src/frontend/lib/audio.ts` |
| **Viewport Architecture** | 100vh locked 5-act presentation | `overflow: hidden; height: 100%;` on body, wheel event intercepted with 600ms debounce. | **ACTUAL (ACCESSIBILITY DEFECT)** | `src/frontend/styles/global.css:9`, `src/frontend/App.tsx:58-85` |
| **Deployment** | Cloudflare Pages (Frontend) + Workers (API) | Live endpoints defined in `wrangler.toml` & `wrangler.worker.toml`. | **ACTUAL** | `wrangler.toml`, `wrangler.worker.toml` |

---

## 2. Structural Dependency Inventory

### Runtime Dependencies
- `react`, `react-dom` (v18.3.1): Frontend rendering.
- `zustand` (v5.0.15): Global store (`activeAct`, `locale`, `soundEnabled`).
- `lucide-react` (v0.475.0): Iconography.
- `clsx`, `tailwind-merge` (v3.6.0): Dynamic CSS class resolution.
- `hono` (v4.13.7): Lightweight Edge router.
- `zod` (v3.25.76), `@hono/zod-validator`: Type-safe request payload validation.
- `drizzle-orm` (v0.38.4), `drizzle-zod` (v0.7.1): Schema definitions (present but currently dormant).

### Development Dependencies
- `vite` (v6.1.0), `@vitejs/plugin-react`: Fast modern build tool.
- `tailwindcss` (v3.4.17), `postcss`, `autoprefixer`: Utility styling.
- `wrangler` (v3.109.1): Cloudflare deployment CLI.
- `typescript` (v5.7.3): Static typing.
- `storybook`, `@storybook/react-vite`: Present in package.json, zero stories in repo.
- `promptfoo`, `repomix`, `mem0ai`: Present in devDependencies for context/eval tooling.
