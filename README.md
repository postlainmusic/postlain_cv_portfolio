# Ngô Phúc (POSTLAIN) - Modern CV & Engineering Portfolio

[![Tech Stack: React](https://img.shields.io/badge/React-18-blue?style=flat-square&logo=react)](https://react.dev/)
[![Styling: TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![State: Zustand](https://img.shields.io/badge/Zustand-5.0-brown?style=flat-square)](https://github.com/pmndrs/zustand)
[![Backend: Hono](https://img.shields.io/badge/Hono-Edge%20API-orange?style=flat-square&logo=hono)](https://hono.dev/)
[![ORM: Drizzle](https://img.shields.io/badge/Drizzle-ORM-C5F74F?style=flat-square&logo=drizzle)](https://orm.drizzle.team/)
[![Validation: Zod](https://img.shields.io/badge/Zod-Typesafe-3068b7?style=flat-square&logo=zod)](https://zod.dev/)
[![Deploy: Cloudflare](https://img.shields.io/badge/Deploy-Cloudflare%20Workers-F38020?style=flat-square&logo=cloudflare)](https://workers.cloudflare.com/)

Hệ thống Portfolio & CV kỹ thuật số của **Ngô Phúc (POSTLAIN)**, được xây dựng theo kiến trúc hiện đại, hiệu năng cao, tối ưu hóa trải nghiệm người dùng với chuẩn **UI/UX Pro Max** và quy chuẩn kỷ luật **Aileron Protocol**.

---

## 🚀 Kiến Trúc & Công Nghệ Cốt Lõi

### Frontend & Giao diện người dùng
- **React + Vite + TypeScript**: Nền tảng SPA tốc độ cao, type-safe toàn diện.
- **Tailwind CSS + `tailwind-merge` + `clsx`**: Utility-first styling chuẩn studio, giải quyết triệt để class conflicts qua hàm tiện ích `cn()`.
- **Zustand**: Quản lý state toàn cục nhẹ gọn, module hóa theo store.
- **Storybook**: Component-Driven Development (CDD), tài liệu hóa và visual testing từng UI component.
- **UI/UX Pro Max Standards**: Bảng màu đạt chuẩn tương phản WCAG AA (>= 4.5:1), hệ thống typography ghép cặp Display/Body font, animation tối ưu GPU (200-300ms).

### Backend & Cơ sở dữ liệu
- **Hono (`honojs/hono`)**: Framework edge API siêu nhẹ chạy trực tiếp trên Cloudflare Workers / Node.js.
- **Drizzle ORM (`drizzle-team/drizzle-orm`)**: Typesafe SQL ORM declarative, không overhead.
- **Zod (`colinhacks/zod`)**: Validation schemas hai chiều cho API requests và Drizzle models thông qua `drizzle-zod`.
- **Atlas & SQLGlot**: Quản lý declarative schema migrations và phân tích cú pháp SQL.

### Quy Chuẩn Kỷ Luật & Context Tooling
- **Aileron Protocol (`AGENT_RULES.md`)**: Ép kỷ luật Codebase-first, Plan-first, Token economics và Strict validation.
- **JIT Skills (`.github/skills/`)**: Kỹ năng Just-In-Time tải theo ngữ cảnh, không rác source code.
- **Add-on Tooling**: `repomix` (Context packing), `promptfoo` (LLM/Prompt eval), `mem0ai` (Long-term state memory).

---

## 📂 Cấu Trúc Thư Mục

```text
postlain_cv_portfolio/
├── .github/
│   └── skills/                 # Hệ thống Just-In-Time (JIT) Skills
│       ├── ui-ux-pro-max/
│       ├── frontend-ui-stack/
│       ├── backend-db-stack/
│       └── context-evals-toolbox/
├── src/
│   ├── backend/                # Backend API & Workers (Hono + Drizzle)
│   │   ├── routes/             # API Route handlers
│   │   ├── middleware/         # Hono middlewares (Auth, CORS, Zod validation)
│   │   └── worker.ts           # Entrypoint Cloudflare Worker
│   ├── db/                     # Database schemas & client
│   │   ├── schema/             # Drizzle tables & Zod schemas
│   │   └── index.ts            # Drizzle database connection
│   ├── frontend/               # Frontend Application (React + Vite)
│   │   ├── components/         # Reusable UI & Layout components
│   │   ├── stores/             # Zustand stores
│   │   ├── hooks/              # Custom React hooks
│   │   ├── styles/             # Tailwind & global CSS
│   │   ├── types/              # Frontend TypeScript types
│   │   ├── App.tsx             # Root React Component
│   │   └── main.tsx            # Frontend Entrypoint
│   ├── shared/                 # Shared schemas, DTOs & constants
│   │   ├── schemas/            # Shared Zod validation schemas
│   │   └── constants/          # Shared configuration constants
│   └── index.ts                # Main application bridge
├── AGENT_RULES.md              # Quy tắc kỷ luật hệ thống
├── AGENTS.md                   # Antigravity Root Instructions
├── drizzle.config.ts           # Cấu hình Drizzle Kit
├── package.json                # Dependencies & scripts
├── tailwind.config.js          # Cấu hình Tailwind CSS tokens
├── tsconfig.json               # TypeScript configuration
├── vite.config.ts              # Vite bundler configuration
└── wrangler.toml               # Cloudflare Workers configuration
```

---

## 🛠️ Hướng Dẫn Cài Đặt & Phát Triển

### 1. Cài đặt Dependencies
```bash
npm install
```

### 2. Chạy Môi trường Phát triển (Local Dev)
```bash
# Chạy Frontend (Vite)
npm run dev

# Chạy Backend Cloudflare Worker (Wrangler)
npm run worker:dev

# Chạy Storybook Component Explorer
npm run storybook
```

### 3. Quản lý Cơ sở dữ liệu (Drizzle Kit)
```bash
# Tạo migration từ schema
npm run db:generate

# Đẩy schema trực tiếp lên DB
npm run db:push

# Mở giao diện trực quan Drizzle Studio
npm run db:studio
```

---

## 👤 Tác Giả
- **Ngô Phúc (POSTLAIN)** - Software Engineer & Music Producer
- Tài liệu đính kèm: [NGOPHUC_CV_2026.pdf](file:///c:/Users/Admin/Documents/github/postlain_cv_portfolio/NGOPHUC_CV_2026.pdf)
