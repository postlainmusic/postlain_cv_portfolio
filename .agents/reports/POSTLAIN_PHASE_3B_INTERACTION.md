# POSTLAIN // PHASE 3B — BEHAVIOR + INTERACTION FOUNDATION REPORT
**Project:** POSTLAIN CV / Portfolio (`postlainmusic/postlain_cv_portfolio`)  
**Creative North Star:** *POSTLAIN / THE OPERATING FREQUENCY*  
**Date:** 2026-09-09T08:48:00+07:00  
**Phase 3B Status:** **COMPLETE** (All Amendment Gates Passed)

---

## 1. Interaction Inventory & Justification Ledger

In accordance with Amendment 07 (*"Every interaction must have a job and a documented user benefit"*), every non-trivial interaction has been justified below:

| Interaction | Purpose | User Benefit | Behavior Without It |
| :--- | :--- | :--- | :--- |
| **Section Anchor Navigation** | Direct chapter routing | Allows instant access to specific career or sonic sections | User must scroll through entire document manually |
| **Mobile Drawer Disclosure** | Viewport-responsive chapter links | Clean, accessible navigation on touch/small screens without layout shift | Navigation links would clutter or overflow mobile viewport |
| **Drawer Focus Management** | Keyboard accessibility | Preserves keyboard user position; moves focus in on open, restores to trigger on close | Keyboard users get lost in DOM hierarchy on drawer toggle |
| **Timeline Log Disclosure** | Progressive disclosure of operational details | Keeps timeline scannable for recruiters while allowing deep inspection on demand | Page becomes overwhelmingly dense with 40+ bullet items |
| **Audio Controller States** | Authentic audio playback management | Communicates clear streaming state (READY, UNAVAILABLE, PLAYING, etc.) with platform fallback | Confusion over whether audio is playing, missing, or broken |
| **Copy-to-Clipboard Direct** | 1-touch capture of phone & email | Eliminates manual text selection errors on mobile and desktop | User must carefully drag-select numbers or switch apps |
| **Contact Inline Validation** | Form field error prevention | Informs user of format issues before submission, preventing lost messages | Silent failure or cryptic server rejection |

---

## 2. Navigation Behavior & Performance

- **Primary Scrolling Physics:** Native OS browser scrolling remains uninhibited. No scroll-jacking, wheel listeners, or snap containers.
- **Anchor Alignment:** Added `scroll-mt-16 sm:scroll-mt-20` on all `<EditorialSection />` components, ensuring that direct hash jumps (`#orchestration`, `#sonic-space`, `#matrix`, `#transmission`) never clip section titles beneath the sticky masthead.
- **Deterministic Active Section Tracking (`useActiveSection.ts`):**
  - Implemented strictly with `IntersectionObserver` (`rootMargin: '-20% 0px -60% 0px'`, `threshold: 0.1`).
  - Purged all secondary scroll/resize event listeners, requestAnimationFrame loops, and timers in compliance with Amendment 03.
- **Mobile Navigation Disclosure:**
  - Simple, accessible disclosure pattern without heavy modal focus trap libraries.
  - Native focus management: moves focus to first link on open, returns focus to toggle button on close.
  - `Escape` key dismiss and click-outside dismissal supported.
  - Automatically closes when any navigation link is clicked.

---

## 3. Native Button Semantics

- **TimelineNode & Disclosures:** Built using native `<button>` elements.
- **No Manual Key Interception:** Relies on browser-native `Enter` / `Space` activation on `<button>` elements without redundant custom `onKeyDown` handlers.

---

## 4. Audio Behavior & Listening Ledger

- **Authenticity Mandate:** Real audio only. Zero procedural synthesizers, zero WebAudio 8-bit beeps, zero synthetic canvas waveforms.
- **Audio Controller Lifecycle (`useAudioController.ts`):**
  - `UNAVAILABLE`: Default state when direct streaming assets are unconfirmed. Controller remains inert; disables play button with accessible tooltip; displays verified external portal link to `https://hiddenmusic.postlain.com`.
  - `READY`: Track metadata loaded; play button armed.
  - `LOADING`: Stream buffering; animated spinning indicator with `aria-label="Buffering audio stream..."`.
  - `PLAYING`: Real playback; progress bar rendered based on authentic `audio.currentTime / audio.duration`.
  - `PAUSED`: Playback suspended; scrub position preserved.
  - `ERROR`: Network stream failure; fallback error state rendered.
- **AudioPlayerBar Editorial Design:** Pinned as an archival listening ledger in the lower dock, featuring high-contrast typography, matte surfaces, and zero floating SaaS widget aesthetics.

---

## 5. Contact Behavior & Dispatch Lifecycle

- **5-State Architecture in `ContactForm.tsx`:**
  1. `IDLE`: Clean inputs with explicit `<label>` bindings (`htmlFor`) and placeholder hints.
  2. `VALIDATION ERROR`: Client-side validation for name (≥ 2 characters), valid email regex (`/^[^\s@]+@[^\s@]+\.[^\s@]+$/`), and message (≥ 10 characters). Displays inline error messages with `aria-invalid="true"` and `aria-describedby` error IDs.
  3. `SUBMITTING`: All inputs and submit button are disabled; loader icon spins; prevents duplicate dispatches.
  4. `SUCCESS`: Confirmation banner (`role="status"`, `aria-live="polite"`); form cleared; "Gửi thêm / Send another" action provided.
  5. `SERVER ERROR`: Alert banner (`role="alert"`, `aria-live="assertive"`); inputs preserved so user does not lose their draft; displays direct fallback contact info (Hotline: `0938-649-420`, Email: `studionopu@gmail.com`).
- **Backend Compatibility:** Interoperates with existing Hono `/api/contact` Cloudflare Worker endpoint without modifying backend schemas.

---

## 6. Anti-Regression Gate Scan Results

A rigorous codebase scan was executed across `src/frontend/` for deprecated AI aesthetics:

| Forbidden Pattern | Scan Result | Status |
| :--- | :--- | :--- |
| **Global cursor: none** | 0 occurrences found | **PASS** |
| **Forced 100vh layout lock** | 0 occurrences found | **PASS** |
| **Global overflow: hidden** | 0 occurrences found | **PASS** |
| **Global user-select: none** | 0 occurrences found | **PASS** |
| **Scroll hijacking** | 0 occurrences found | **PASS** |
| **Procedural audio / WebAudio oscillators** | 0 occurrences found | **PASS** |
| **Synthetic click sounds** | 0 occurrences found | **PASS** |
| **Fake waveform / spectrum generators** | 0 occurrences found | **PASS** |
| **Particle canvas systems / WebGL** | 0 occurrences found | **PASS** |
| **Fake telemetry / fake stats** | 0 occurrences found | **PASS** |
| **Decorative HUD / glow systems** | 0 occurrences found | **PASS** |
| **Gradient text (`bg-clip-text`)** | 0 occurrences found | **PASS** |

---

## 7. Accessibility Validation (WCAG 2.1 AA)

- **Keyboard Navigation:** Full Tab/Shift+Tab traversal across Masthead, Skip-to-content, Section Anchors, Timeline disclosures, Audio controls, Copy buttons, and Form fields.
- **Focus Indicators:** Accessible `:focus-visible` styling (`outline: 2px solid #e2b714; outline-offset: 2px;`) across all interactive elements.
- **Screen Reader Semantics:**
  - Da Lat clock: `<time dateTime={...} aria-label="Giờ hiện tại tại Đà Lạt, Việt Nam (GMT+7)">`.
  - Timeline disclosures: `aria-expanded`, `aria-controls`, and `aria-labelledby`.
  - Copy to clipboard: `aria-live="polite"` dynamic announcement upon successful copy.
  - Audio bar: `aria-label="Editorial Audio Listening Ledger"`, explicit play/pause button state labels.
  - Media slots: `<figure>` and `<figcaption>` markup; SVG architectural diagrams include `role="img"` and descriptive `aria-label`.

---

## 8. Build & Verification Evidence

- **TypeScript Compilation:** `npx tsc --noEmit` passed with **0 errors**.
- **Production Bundle Compilation:** `npm run build` (`tsc && vite build`) passed with **0 errors**:
  - `dist/index.html`: 1.44 kB (gzip: 0.84 kB)
  - `dist/assets/index-C83KpjoV.css`: 23.40 kB (gzip: 5.08 kB)
  - `dist/assets/index-tfUA6skT.js`: 243.86 kB (gzip: 75.67 kB)
- **Zero New Dependencies Added:** Zero npm packages were installed.

---

## 9. Dependencies Added & Rejected

- **Added:** **NONE** (0 npm packages added).
- **Rejected:** Framer Motion, GSAP, Lenis, Three.js, Howler.js, Tone.js.

---

## 10. Risks & Mitigations

- **Risk:** Direct Hidden Music audio file URLs are unconfirmed.
  - **Mitigation:** `useAudioController` cleanly manages `UNAVAILABLE` state and routes listeners to `https://hiddenmusic.postlain.com` without throwing runtime errors.
- **Risk:** MailChannels Cloudflare Worker sending limits or DNS propagation delays.
  - **Mitigation:** `ContactForm` preserves user input on `SERVER_ERROR` and provides direct 1-touch hotline and email fallbacks.

---

## 11. Recommended Phase 4 Scope

1. **Authentic Photography & Media Asset Integration:** Replace SVG archival placeholders in `EditorialMediaSlot.tsx` with authentic high-resolution images of Da Lat studio sessions, ALDO retail leadership, and kitchen management.
2. **Typography Micro-Kerning & Editorial Polish:** Final typographic spacing, fluid font clamp scaling, and editorial print-inspired hairline rules.
3. **Lighthouse & Core Web Vitals Optimization Campaign:** Performance profiling for 98+ scores across Performance, Accessibility, Best Practices, and SEO.
4. **End-to-End Edge Deployment:** Cloudflare Pages & Workers deployment verification.
