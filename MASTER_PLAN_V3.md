# POSTLAIN — MASTER IMPLEMENTATION BLUEPRINT v3.0
## Apple-Grade Minimalist Kinetic Typography Showcase (SOTY Awwwards Standard)

> **Core Axiom:** POSTLAIN is an **Apple Pro Minimalist Kinetic Typography Portfolio** celebrating the real-world operational mastery and creative vision of **Ngô Phúc**.  
> **Positioning:** THE DUAL-ENGINE ARCHITECT — Logic Vận Hành (Process, AI & Systems) × Cảm Xúc Nghệ Thuật (Music, Cinema & Web Art).  
> **Slogan:** *"Quản lí bằng logic. Thổi hồn bằng nghệ thuật."* (Led by logic. Elevated by art.)

---

# 01. CREATIVE & TYPOGRAPHIC THESIS

1. **Pure Typographic Mastery:** Zero fantasy 3D landscape meshes, zero tacky confetti, zero visual clutter. Every story beat is communicated through **kinetic typography**, extreme scale contrast, and hairline structural dividers.
2. **Apple Pro Aesthetic Standard:**
   - Deep obsidian canvas (`#000000`, `#080808`, `#121214`).
   - Titanium muted grey (`#86868B`), pure white (`#F5F5F7`), warm amber (`#E5A93C`) & cyan (`#38BDF8`) spec accents.
   - Frosted glass surfaces (`rgba(255,255,255,0.03)` with `backdrop-blur-3xl` and `border border-white/8`).
   - Micro-stickers & delicate vector badges (`[OP_STATUS: ACTIVE]`, `[VERIFIED]`, `[2019 — 2026]`, `[MCN_PARTNER]`).
3. **Hybrid Scroll Architecture:**
   - **Hero & Tuyên Ngôn:** Continuous natural smooth vertical scroll (Lenis) with staggered split-text entry.
   - **Triết Lý Vận Hành (Philosophy):** Apple Signature Word-by-Word Scroll Scrubbing (text starts at 20% opacity and illuminates word-by-word to 100% pure white with scroll position).
   - **Cột Mốc Thực Chiến (4 Milestone Runway):** Vertical scroll is pinned to scrub horizontally through 4 Apple Pro Spec Monolith cards (Viva Star Coffee 2019, SB Studio 2023, Phủi Steak 2024, ALDO GO! 2025).
   - **Khối Năng Lực Cốt Lõi (Bento Matrix 2x2):** Interactive Bento grid with live widgets:
     - *Widget 1:* Quản trị & Giữ lửa nhân sự (Interactive Team Energy Gauge).
     - *Widget 2:* Tự động hóa & Phần mềm AI (Live Node Workflow Simulator).
     - *Widget 3:* Nền tảng Thiết kế Web & Hệ thống số (FPT Web Design, UI architecture).
     - *Widget 4:* Sonic Artistry & Hidden Music (Interactive Web Audio waveform player).
   - **Kênh Liên Hệ Trực Tiếp (Outro & Direct Channels):** Minimalist contact monolith with 1-click clipboard copy for Hotline `0938-649-420` and Email `studionopu@gmail.com` with instant toast feedback.
4. **Motion & Interaction on Everything (GSAP + Spring Physics):**
   - Magnetic velocity-deformed cursor with difference blend mode.
   - Hover glare reflections, subtle sound haptics, and micro-audio synthesizer.
   - Sound toggle `[SOUND ON / OFF]` both on preloader and fixed in header.

---

# 02. AUTHENTIC CONTENT MODEL (100% Grounded in CV)

All data is strictly derived from `NGOPHUC_CV_2026.pdf` (`PROFILE_NGOPHUC.md`):

| Section | Headline & Badge | Authentic Content Summary |
| :--- | :--- | :--- |
| **01. Hero** | `NGÔ PHÚC` · `[POSTLAIN // OPERATIONS & STUDIO MANAGER]` | Tuyên ngôn: *"Là một người đam mê với nghệ thuật và công nghệ, đặc biệt yêu thích việc quản lí và sắp xếp các quy trình một cách logic và tự động hoá."* |
| **02. Philosophy** | `[ 01 · TRIẾT LÝ VẬN HÀNH ]` | Apple Scroll Scrubbing: *"Quản lí bằng logic. Thổi hồn bằng nghệ thuật."* Kết hợp tư duy PR (Văn Lang) + Web Design (FPT). |
| **03. Milestone 01** | `05/2019 — 01/2020` · **VIVA STAR COFFEE** | **Ca Trưởng Pha Chế:** Pha chế đúng chuẩn công thức hãng; Phân chia ca làm việc cho nhân sự; Rèn luyện kỷ luật quy trình đầu đời. |
| **04. Milestone 02** | `03/2023 — 10/2024` · **SB STUDIO** | **Quản Lý Phòng Thu (Studio Manager):** Quản lý doanh thu; Định hướng Marketing; CSKH; Sắp xếp lịch thu âm/ghi hình; Quản lý nghệ sĩ công ty & kết nối đối tác MCN. |
| **05. Milestone 03** | `10/2024 — 06/2025` · **PHỦI STEAK** | **Ca Trưởng Bếp & Bếp Chính:** Đảm bảo món ăn trong ngày; Chuyên trách Steak bò Âu cao cấp (mì Ý, súp, cá hồi, salad); Điều phối nhân sự ca cao điểm. |
| **06. Milestone 04** | `06/2025 — 07/2026` · **ALDO GO! ĐÀ LẠT** | **Quản Lí Cửa Hàng (Store Manager):** Quản lý toàn diện cửa hàng; Quản lý kho tồn; Quản lý nhân sự; Thúc đẩy tăng trưởng ngành bán lẻ (Retail). |
| **07. Bento Matrix** | `[ 03 · VŨ KHÍ NĂNG LỰC ]` | 4 Widget: (1) Quản trị & Giữ lửa; (2) AI & Tự động hoá; (3) Web & Tech; (4) Hidden Music & Nghệ thuật. |
| **08. Contact** | `[ 04 · KẾT NỐI TRỰC TIẾP ]` | Hotline: `0938-649-420` · Email: `studionopu@gmail.com` · Địa chỉ: Kim Đồng, TP. Đà Lạt, Lâm Đồng. |

---

# 03. COMPONENT ARCHITECTURE

```
src/frontend/
├── components/
│   └── apple/
│       ├── AppleNavbar.tsx            # Sticky glass header with Sound, Lang (VI/EN), Jump links
│       ├── ApplePreloader.tsx         # Minimalist typographic 0-100% loader + Sound toggle
│       ├── AppleHero.tsx              # Giant kinetic typography + SplitText GSAP entry
│       ├── AppleScrubPhilosophy.tsx   # Word-by-word opacity scrub reveal
│       ├── AppleMilestonesRunway.tsx  # Pinned horizontal runway + 4 Spec Monolith cards
│       ├── AppleBentoSpecs.tsx        # 2x2 Bento matrix with 4 live interactive widgets
│       ├── AppleContactFooter.tsx     # Hidden Music player + 1-touch copy contact monolith
│       ├── AppleCustomCursor.tsx      # Magnetic spring cursor with difference blend mode
│       └── AppleToast.tsx             # Discreet Apple-style pill toast on clipboard copy
│
├── audio/
│   └── AppleHapticAudio.ts            # Web Audio API procedural clicks, sweeps & synth drone
│
├── content/
│   └── appleContent.ts                # Full bilingual (VI/EN) ground-truth copy
│
├── App.tsx                            # Root orchestration (Lenis smooth scroll + GSAP ScrollTrigger)
└── index.css                          # Apple Pro tokens, typography scale & noise texture
```

---

# 04. DEFINITION OF DONE & QUALITY BENCHMARKS

1. **Awwwards SOTY Standard:** Score $\ge 9.0/10$ on Design, Usability, Creativity, and Content.
2. **Apple Minimalism:** Absolute clarity, extreme negative space, zero visual gimmicks.
3. **Fluid 60/120 FPS:** Zero dropped frames during horizontal scroll scrub and word illumination.
4. **Autonomous Puppeteer Verification:** 100% clean test (`npm run test:browser`), 0 console errors, 0 network failures, high-res visual captures for all sections.
