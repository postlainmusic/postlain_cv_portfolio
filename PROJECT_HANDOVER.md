# PROJECT HANDOVER & TRẠNG THÁI HỆ THỐNG (SESSION STATE HANDOVER)

> **Dự án**: Postlain CV Portfolio — Ngô Phúc Digital Experience  
> **Chủ sở hữu**: Ngô Phúc (POSTLAIN) — Operations & Studio Manager  
> **Cập nhật lần cuối**: 2026-09-08  
> **Phiên bản kiến trúc**: v2.0 — Awwwards 100vh Fullscreen Storytelling Stage  

---

## 1. TRẠNG THÁI HIỆN TẠI CỦA DỰ ÁN

Dự án đã hoàn thành toàn diện việc chuyển đổi từ trang cuộn dọc truyền thống sang **100vh Fullscreen Cinematic Act Deck** (Trải nghiệm Viewport 100vh không cuộn thẳng tuột), tương đương các chuẩn mực Awwwards Site of the Year (`pacomepertant.com`, `forms.world`, `sidewave.it`).

### Các tính năng & nội dung đã hoàn thành 100%:

1. **Chuẩn hóa dữ liệu định danh 100% từ CV gốc (`NGOPHUC_CV_2026.pdf`)**:
   - **Họ và Tên**: **NGÔ PHÚC** (POSTLAIN)
   - **Chức danh định vị**: **MANAGER — QUẢN LÍ** (Operations & Studio Manager)
   - **Số điện thoại**: **`0938-649-420`** (Hotline trực tiếp, hỗ trợ gọi & sao chép 1 chạm)
   - **Email liên hệ**: **`studionopu@gmail.com`**
   - **Địa chỉ**: Kim Đồng, Đà Lạt, Lâm Đồng
   - **Triết lý**: *"Quản lí bằng logic. Thổi hồn bằng nghệ thuật."* (*"Led by logic. Elevated by art."*)

2. **Cấu trúc 5 Acts Điện Ảnh Toàn Màn Hình (100vh Viewport Locked)**:
   - **ACT 00 // THE OVERTURE (Hero Viewport)**: Kinetic Typography *NGÔ PHÚC*, Đà Lạt GMT+7 Live Clock, Capsule trạng thái sẵn sàng nhận việc 2026, phím tắt chuyển Act.
   - **ACT 01 // CHRONOLOGICAL CAREER TOUR (2019 $\rightarrow$ 2026)**:
     - Trình tự thời gian thực tế:
       1. *Viva Star Coffee* (5/2019 – 1/2020): Ca Trưởng Pha Chế
       2. *Công Ty TNHH SB Studio* (3/2023 – 10/2024): Quản Lý Phòng Thu
       3. *PHỦI STEAK Đà Lạt* (10/2024 – 2/2025): Ca Trưởng Bếp
       4. *PHỦI STEAK Đà Lạt* (2/2025 – 6/2025): Bếp Chính
       5. *ALDO GO! Đà Lạt* (6/2025 – 7/2026): Quản Lí Cửa Hàng
     - Hiển thị duy nhất 1 thẻ chặng trung tâm với 2–3 gạch đầu dòng đắt giá, có bộ điều hướng Prev/Next nội bộ và chỉ số tiến trình `01 / 05`.
   - **ACT 02 // FEATURED VENTURE (HIDDEN MUSIC)**:
     - Showcase nền tảng âm nhạc số thực tế [hiddenmusic.postlain.com](https://hiddenmusic.postlain.com) phát triển và vận hành bởi Ngô Phúc.
     - 3 trụ cột: Audio Engineering, Quản lý bản quyền & MCN, Tự động hóa phân phối số.
   - **ACT 03 // EXECUTIVE MATRIX & EDUCATION**:
     - Tích hợp 2 tab: **Thế Mạnh Cốt Lõi** (Quản lý, Tự động hóa, Sáng tạo) và **Nền Tảng Đào Tạo** (THPT 12/12, ĐH Văn Lang PR, Cao đẳng FPT Web Design).
   - **ACT 04 // DIRECT INITIATION & EMAIL DISPATCH**:
     - Form liên hệ gửi email HTML trực tiếp về **`studionopu@gmail.com`** qua Cloudflare Worker Backend.
     - Nút gọi hotline `0938-649-420` và nút copy nhanh.

3. **Tương tác & Hiệu năng Awwwards**:
   - **Preloader siêu tốc 0.65s**: Tự động ghi nhớ phiên qua `sessionStorage`, hỗ trợ nhấp chuột để vào ngay.
   - **Custom Crosshair Cursor**: Con trỏ ngắm bắn chính xác có độ trễ mượt (lerp), nhãn phản hồi (`TOUR`, `OPEN`, `CALL`, `MAIL`, `SEND`, `LANG`), tự động vô hiệu hóa trên mobile cảm ứng.
   - **Thanh lọc giao diện**: Loại bỏ 100% các từ ngữ kỹ thuật rác (Cloudflare, GitHub, Aileron, v.v.).

4. **Trạng thái Triển khai Live (Production Deployment)**:
   - **Frontend**: Đã deploy lên Cloudflare Pages $\rightarrow$ [https://postlain-cv-portfolio.pages.dev](https://postlain-cv-portfolio.pages.dev)
   - **Backend API**: Đã deploy lên Cloudflare Workers $\rightarrow$ [https://postlain-api.postlain-music.workers.dev](https://postlain-api.postlain-music.workers.dev)
   - **GitHub Remote**: Đã đồng bộ commit lên branch `main` $\rightarrow$ [https://github.com/postlainmusic/postlain_cv_portfolio](https://github.com/postlainmusic/postlain_cv_portfolio)

---

## 2. CÁC QUYẾT ĐỊNH KỸ THUẬT (TECHNICAL ARCHITECTURE DECISIONS)

### 2.1. Tech Stack Cố Định
- **Frontend Core**: React 18, TypeScript, Vite 6.
- **Styling**: Tailwind CSS 3.4 + PostCSS + `tailwind-merge` + `clsx`.
- **State Management**: Zustand (`src/frontend/stores/usePortfolioStore.ts`).
- **Icons & UI Assets**: Lucide React (`lucide-react`).
- **Sound Engine**: Web Audio API Procedural Synthesizer (`src/frontend/lib/audio.ts`) không phụ thuộc file âm thanh ngoài.
- **Backend API**: Hono framework (`honojs/hono`) + Zod validation (`@hono/zod-validator`).

### 2.2. Kiến Trúc 100vh Fullscreen Act Stage
- Khóa cứng toàn bộ màn hình qua CSS: `html, body, #root { height: 100%; width: 100%; overflow: hidden; }`.
- Quản lý slide qua `activeAct` (0 đến 4). Mỗi Act được định vị bằng GPU-accelerated CSS `transform: translate3d(0, ${(idx - activeAct) * 100}%, 0)` kết hợp `transition: transform 700ms cubic-bezier(0.16, 1, 0.3, 1)`.
- Đa phương thức điều hướng:
  1. **Wheel / Trackpad**: Lắng nghe `wheel` với bộ debounce 600ms chống nhảy cóc.
  2. **Touch Gestures**: Lắng nghe `touchstart` và `touchend` đo $\Delta Y$ vuốt trên mobile.
  3. **Keyboard**: Phím mũi tên `[↑ / ↓]`, `[← / →]`, `PageUp / PageDown`, `Space`, hoặc phím số `1 - 5`.
  4. **Act Ribbon & Pagination Dots**: Nhấp chọn trực tiếp trên Header hoặc Footer.

### 2.3. Hệ Thống Typography Độc Bản
- **Display Heading**: *Montserrat* (Weight 900 Black, tracking tight, uppercase).
- **Serif High Fashion**: *Cormorant Garamond* (Italic, weight 400/600).
- **Body & UI**: *Plus Jakarta Sans* (Weight 300/400/500/700, hỗ trợ tiếng Việt 100%).
- **Technical & Tabular Numbers**: *Space Grotesk* (Monospace tabular data, GMT+7 clock, badges).

### 2.4. Phản Ứng 3D Canvas Background
- `ScrollyScene3D.tsx` sử dụng HTML5 Canvas 2D/3D Engine tự tạo, mô phỏng con quay hồi chuyển 3 trục và trường hạt lượng tử (Particle Field).
- Tự động lerp góc nhìn (rotX, rotY) và mood ánh sáng theo từng `activeAct` từ 0 đến 4.

### 2.5. Hạ Tầng Cloudflare (Pages + Workers)
- **Frontend Pages**: Cấu hình qua `wrangler.toml` (`pages_build_output_dir = "dist"`).
- **Backend Worker API**: Cấu hình qua `wrangler.worker.toml` (`main = "src/backend/worker.ts"`).
- **Email Dispatch**: Tích hợp MailChannels Transactional API trong Worker `/api/contact`, gửi trực tiếp email HTML format chuẩn về `studionopu@gmail.com` kèm geolocation metadata và Reply-To header.

---

## 3. CÁC BƯỚC THỰC HIỆN KHI MỞ DỰ ÁN Ở MÁY KHÁC

### Yêu cầu môi trường (Prerequisites):
- **Node.js**: Phiên bản `>= 18.0.0` (Khuyến nghị Node.js 20 LTS).
- **Git**: Đã cài đặt và cấu hình SSH/HTTPS token cho GitHub.
- **Wrangler**: Cloudflare CLI (có sẵn trong `devDependencies`).

### Quy trình khởi chạy & kiểm tra:

```bash
# 1. Clone hoặc mở thư mục dự án
cd postlain_cv_portfolio

# 2. Cài đặt toàn bộ dependencies
npm install

# 3. Chạy môi trường Local Development (Vite Dev Server)
npm run dev
# Truy cập: http://localhost:5173

# 4. Kiểm tra biên dịch Production Build
npm run build
# Đảm bảo dist/ được tạo ra sạch sẽ và không có lỗi TypeScript

# 5. Triển khai lên Cloudflare (khi có thay đổi)
# Deploy Backend API Worker:
npx wrangler deploy --config wrangler.worker.toml

# Deploy Frontend Cloudflare Pages:
npx wrangler pages deploy dist --project-name=postlain-cv-portfolio
```

---

## 4. TÓM TẮT KỶ LUẬT HỆ THỐNG TỪ `AGENT_RULES.md`

Mọi can thiệp mã nguồn trong tương lai bắt buộc phải tuân thủ nghiêm ngặt các nguyên tắc sau:

1. **Codebase-First Execution**:
   - Khảo sát kỹ mã nguồn, cấu hình và design tokens hiện có trước khi sửa đổi.
   - Tuyệt đối không clone rác hoặc đưa thư viện ngoài luồng vào workspace.
2. **Plan First**:
   - Phải lập kế hoạch rõ ràng trước khi thực hiện các thay đổi kiến trúc lớn và chờ phê duyệt.
3. **Token Economics & Context Optimization**:
   - Chỉ tải đúng các file/dòng code liên quan trực tiếp đến tác vụ.
   - Code ngắn gọn, chuẩn TypeScript, không boilerplate thừa.
4. **Strict Verification**:
   - Luôn chạy `vite build` và kiểm tra tính toàn vẹn trước khi báo hoàn thành.
5. **Tech Stack Cố Định**:
   - Frontend: React + Tailwind CSS + Zustand.
   - Backend: Hono + Zod.
   - Hạ tầng: Cloudflare Pages + Workers.
6. **UI/UX Pro Max**:
   - Không đưa từ ngữ kỹ thuật thừa (Cloudflare, GitHub, etc.) lên giao diện người dùng.
   - Dữ liệu thực tế 100% chuẩn xác (SĐT `0938-649-420`, Email `studionopu@gmail.com`).
   - Thứ tự kinh nghiệm luôn đi từ quá khứ đến hiện tại (2019 $\rightarrow$ 2026).
