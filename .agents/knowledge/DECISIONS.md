# ARCHITECTURAL & CREATIVE DECISIONS (Layer 2 Memory)

> **Governance Purpose:** Records all intentional architectural, creative, narrative, and technical decisions. Each decision specifies: Decision, Reason, Evidence, Tradeoff, and Status.

---

## DEC-001: Pivot from Sci-Fi Slide-Deck to "THE OPERATING FREQUENCY" Editorial Narrative
- **Decision:** Terminate the 100vh locked slide-deck with fake sci-fi HUD chrome and adopt **POSTLAIN / THE OPERATING FREQUENCY**: an authored, editorial publication communicating the single underlying superpower of **ORCHESTRATION** across physical operations (culinary, retail, studio) and sonic artistry (Hidden Music).
- **Reason:** Forensic audit (`POSTLAIN_CREATIVE_FORENSIC_AUDIT.md`) proved the previous UI alienated recruiters, broke mobile scroll physics, obscured Ngô Phúc's real achievements, and stacked generic AI tropes.
- **Evidence:** `src/frontend/styles/global.css` (cursor/scroll hijacking), `src/frontend/components/ViewfinderFrame.tsx` (fake sci-fi tags), `src/frontend/constants/profile.ts` (authentic operational track record).
- **Tradeoff:** Removes flashy instant 3D particle animations in exchange for deep editorial typographic tension, narrative resonance, and authentic craft.
- **Status:** **APPROVED & ACTIVE (Phase 1 Baseline)**

---

## DEC-002: Rejection of Global Cursor Hijacking & Selection Suppression
- **Decision:** Permanently purge `cursor: none !important;` and `user-select: none;` from `global.css`. Retain native OS pointer and 100% selectable text.
- **Reason:** Cursor hijacking violates WCAG 2.1 accessibility, causes pointer latency, prevents copying contact info, and is a hallmark of amateur AI design.
- **Evidence:** `src/frontend/styles/global.css:30-33`, `src/frontend/components/CustomCursor.tsx`.
- **Tradeoff:** No custom hovering crosshair circle tag popping; interface relies on subtle CSS cursor states and focus indicators.
- **Status:** **APPROVED & ACTIVE**

---

## DEC-003: Continuous Hybrid Scroll Architecture
- **Decision:** Replace the 5-act 100vh locked stage with a continuous vertical document flow featuring sticky editorial section headers and smooth anchor navigation.
- **Reason:** Allows content-driven variable section heights, native touch scrolling, mobile browser address bar auto-resizing, and bookmarkable section states.
- **Evidence:** Accessibility failures on mobile devices in previous build (`src/frontend/App.tsx:58-85`).
- **Tradeoff:** Requires careful spatial composition and scroll-reveal threshold tuning.
- **Status:** **APPROVED & ACTIVE**

---

## DEC-004: Removal of Imperative Canvas 3D & Procedural Soundboard
- **Decision:** Delete `ScrollyScene3D.tsx`, `SpatialSpiral3D.tsx`, `CareerTour3D.tsx` (misnomer), `SonicDeck.tsx`, and `CinematicPreloader.tsx`. Replace audio engine with an opt-in HTML5/WebAudio streaming player for authentic Hidden Music releases.
- **Reason:** These components consumed CPU/GPU cycles running continuous RAF loops, faked loading times, and played 8-bit synthetic bleeps that trivialized real music production credentials.
- **Evidence:** `src/frontend/components/ScrollyScene3D.tsx:1-285`, `src/frontend/lib/audio.ts:1-449`.
- **Tradeoff:** No interactive synth drum pads; audio experience is focused on real musical listening.
- **Status:** **APPROVED & ACTIVE**

---

## DEC-005: Preserved Fullstack Edge Architecture (React 18 + Vite 6 + Hono + Cloudflare)
- **Decision:** Preserve the underlying tech foundation (React 18, TypeScript, Vite 6, Tailwind CSS, Zustand, Hono on Cloudflare Workers, Cloudflare Pages).
- **Reason:** The infrastructure is performant, lightweight, zero-overhead, and perfectly suited for an Awwwards-tier fast web experience. The previous failure was creative and architectural, not a framework failure.
- **Evidence:** `package.json`, `wrangler.toml`, `wrangler.worker.toml`, `src/backend/worker.ts`.
- **Tradeoff:** None.
- **Status:** **APPROVED & ACTIVE**

---

## DEC-006: Two-Layer Content System & Content Art Direction
- **Decision:** Adopt a strict Two-Layer Content Architecture across all sections: **Layer A (Artistic / Human Storytelling)** for atmosphere, observation, rhythm, and tension; **Layer B (Semantic / Professional)** for crystal clarity, recruiter 20-second scannability, WCAG accessibility, and Schema.org SEO.
- **Reason:** Solves the core tension between high-end editorial artistry and professional recruiter utility. Eliminates AI writing clichés while guaranteeing facts from `CONTENT_FACTS.md` remain directly indexed and readable.
- **Evidence:** Phase 1 Amendment specifications, `CONTENT_FACTS.md`.
- **Tradeoff:** Requires disciplined copy architecture so poetic lines never obfuscate semantic job titles or contact details.
- **Status:** **APPROVED & ACTIVE**

---

## DEC-007: Purposeful Interaction System & Archival State Architecture
- **Decision:** Restrict all interactive behaviors to communicating hierarchy, state, sequence, navigation, feedback, physicality, or access. Implement discrete 5-state lifecycle in `ContactForm.tsx`, authentic audio states (`READY`, `LOADING`, `PLAYING`, `PAUSED`, `UNAVAILABLE`, `ERROR`) in `useAudioController.ts` and `AudioPlayerBar.tsx`, accessible disclosures (`TimelineNode.tsx`), and robust boundary-aware viewport tracking in `useActiveSection.ts`. Strictly prohibit fake waveforms, procedural bleeps, and global magnetic buttons.
- **Reason:** Upholds the core principle "Interaction must have a job". Eliminates decorative noise and guarantees WCAG 2.1 AA compliance, keyboard navigation parity, and zero layout shifts.
- **Evidence:** `src/frontend/hooks/useAudioController.ts`, `src/frontend/components/ContactForm.tsx`, `src/frontend/components/TimelineNode.tsx`.
- **Tradeoff:** Zero decorative micro-glows or particle trails; interface relies on crisp state changes, accessible focus rings, and natural typography.
- **Status:** **APPROVED & ACTIVE (Phase 3B Baseline)**

---

## DEC-008: Cinematic Editorial Choreography & Restrained Motion System
- **Decision:** Govern all page-level rhythm, transition timing, typographic hierarchy, and intentional stillness via the 7-token motion grammar (`motion.tactile`, `motion.reveal`, `motion.disclosure`, `motion.drawer`, `motion.status`, `motion.focus`, `motion.rest`). Enforce the Triad Storytelling Model for future photographic assets and maintain an unambiguous 20–30 second recruiter path across Chapter 00–04.
- **Reason:** Guarantees that the website reads and breathes as an authored monograph rather than a collection of animated cards or an AI template, while preserving 100% WCAG 2.1 AA accessibility and sub-250kB lightweight bundle performance.
- **Evidence:** `POSTLAIN_PHASE_4A_CINEMATIC_CHOREOGRAPHY.md`, `IMAGE_ART_DIRECTION.md`, `MOTION_PRINCIPLES.md`.
- **Tradeoff:** Prohibits complex animation engines (GSAP/Framer Motion) and scrolljacking; relies strictly on CSS transitions and native layout hierarchy.
- **Status:** **APPROVED & ACTIVE (Phase 4A Baseline)**


