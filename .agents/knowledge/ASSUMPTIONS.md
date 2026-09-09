# ASSUMPTION REGISTRY & EPISTEMIC CLASSIFICATION (Layer 2 Memory)

> **Governance Purpose:** Strictly classifies every key project proposition to prevent speculation or aesthetic preferences from being treated as immutable facts.

---

## 1. Epistemic Classification Scheme

- **FACT:** Directly verifiable from source documents (`NGOPHUC_CV_2026.pdf`, Git history, `package.json`, production Cloudflare dashboard).
- **INFERENCE:** Logical deduction drawn from verified facts, subject to confirmation.
- **PREFERENCE:** Creative or aesthetic direction choice that can be changed or tuned.
- **UNKNOWN:** Missing information requiring user clarification before final production.
- **EXPERIMENT:** Hypotheses tested during design/engineering to validate feasibility or quality.

---

## 2. Active Assumptions Matrix

| ID | Item / Claim | Classification | Evidence / Rationale | Status |
| :--- | :--- | :--- | :--- | :--- |
| **ASM-01** | Ngô Phúc is an operations leader with extensive F&B, retail, and studio management experience. | **FACT** | `NGOPHUC_CV_2026.pdf`, `profile.ts` | Confirmed |
| **ASM-02** | Ngô Phúc actively produces electronic / acoustic music under the alias POSTLAIN and runs Hidden Music. | **FACT** | `https://hiddenmusic.postlain.com`, `profile.ts` | Confirmed |
| **ASM-03** | Ngô Phúc is a senior fullstack software engineer building enterprise SaaS. | **INFERENCE (REJECTED)** | Source data indicates web design, automation tooling, and edge script integration, not fullstack SaaS engineering. | Rejected / Refined |
| **ASM-04** | A 100vh locked slide-deck is the best format for an Awwwards-level storytelling experience. | **EXPERIMENT (FAILED)** | Forensic audit proved it damages mobile usability, scroll physics, and text accessibility. | Deprecated |
| **ASM-05** | Dark mode with high-contrast typography and subtle atmospheric grain fits POSTLAIN's brand identity. | **PREFERENCE** | Aligns with Da Lat mood, studio evening sessions, and modern editorial art direction. | Active Candidate |
| **ASM-06** | Real audio tracks from Hidden Music can be embedded via streaming audio player instead of synthetic drum synth. | **INFERENCE** | Requires confirming whether audio stream URLs or preview clips from Hidden Music are available. | Pending Asset Check |
| **ASM-07** | High-resolution photography or portrait assets exist for Ngô Phúc. | **UNKNOWN** | Currently zero personal photography or media assets exist in `public/` or `src/`. | Open Question |
| **ASM-08** | Cloudflare Pages + Cloudflare Workers is the ideal target deployment platform. | **FACT** | Validated working deployment pipelines in `wrangler.toml` and `wrangler.worker.toml`. | Confirmed |
| **ASM-09** | Storybook components and unit tests are strictly required before shipping frontend components. | **PREFERENCE** | Standard engineering practice defined in `AGENT_RULES.md`, currently absent in implementation. | Active Requirement |
| **ASM-10** | Bilingual support (Vietnamese primary, English secondary) is mandatory for international and local opportunities. | **FACT** | Confirmed by CV structure and bilingual dictionary data. | Confirmed |
