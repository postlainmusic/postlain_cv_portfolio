# AGENT RULES & KỶ LUẬT HỆ THỐNG (Aileron Protocol Inspired)

<scope>
Bộ quy tắc này có mức độ ưu tiên CAO NHẤT, áp dụng cho toàn bộ hoạt động phát triển, tương tác và quản lý mã nguồn trong dự án.
Kim chỉ nam cốt lõi: Adaptive Ceremony, Codebase-first, Evidence-driven, Token Economics & Strict Verification.
</scope>

---

## 1. NGUYÊN TẮC KỶ LUẬT BẮT BUỘC (CORE DISCIPLINE)

### 1.1. Codebase-First Execution
- **Khảo sát thực tế trước khi hành động:** Tuyệt đối không giả định hay đoán cấu trúc code. Luôn đọc trực tiếp các file cấu hình, mã nguồn lân cận, idiom, naming convention và design tokens trước khi thực hiện bất kỳ thay đổi nào.
- **Tái sử dụng tối đa:** Ưu tiên sử dụng component, helper, utility classes, routing và schema đã tồn tại trong workspace. Không tạo ra các hàm tiện ích trùng lặp.
- **Nghiêm cấm clone rác:** Tuyệt đối không `git clone` hoặc tải source code bên ngoài vào workspace làm rác repo. Chỉ trích xuất kiến thức/cấu trúc và tích hợp qua JIT Skills.

### 1.2. Plan First (Lập kế hoạch & Chờ phê duyệt)
- **Lập kế hoạch rõ ràng trước khi viết code:** Đối với các thay đổi liên quan đến cấu trúc hệ thống, schema database, luồng logic mới hoặc API, phải phân tích rõ ràng:
  1. File cần thay đổi / tạo mới.
  2. Logic và dependency sử dụng.
  3. Kế hoạch kiểm thử / xác minh.
- **Chỉ code khi đã thống nhất:** Không tự ý thay đổi bừa bãi khi chưa định hình rõ ràng các bước thực hiện.

### 1.3. Token Economics & Context Optimization (Tư duy Aider, Repomix, Mem0, Graphify)
- **Tối ưu hóa Context Window:** Chỉ đọc chính xác những file hoặc đoạn code (line-range) thực sự liên quan đến tác vụ hiện tại. Không bao giờ load toàn bộ thư mục hay hàng chục file không cần thiết vào context.
- **Tư duy nén thông tin (Repomix / Graphify):** Tóm tắt cấu trúc quan hệ giữa các component/module trước khi phân tích sâu.
- **Quản lý trạng thái thông minh (Mem0):** Ghi nhớ các quyết định kiến trúc, tránh hỏi lại những thông tin đã được thống nhất hoặc đã có sẵn trong cấu hình dự án.
- **Tránh sinh code rác / bloated code:** Tạo code ngắn gọn, chuẩn TypeScript, không boilerplate thừa, không comment sáo rỗng.

### 1.4. Strict Validation & Verification Discipline
- **Tự kiểm tra trước khi hoàn thành:** Mọi thay đổi mã nguồn phải được kiểm tra tính hợp lệ: type checking, linting, build test hoặc script xác minh tối thiểu.
- **Không bao giờ khẳng định suông:** Phải đưa ra bằng chứng thực thi cụ thể (lệnh kiểm tra, log kết quả), không bao giờ báo "xong" nếu chưa chạy xác minh.
- **Xử lý lỗi kỷ luật:** Nếu 2 lần sửa liên tiếp gặp cùng 1 lỗi -> DỪNG LẠI, phân tích lại giả thuyết gốc, không được đoán mò và thử sai lung tung (no speculative stacking on broken code).

---

## 2. TECH STACK CỐ ĐỊNH CHO DỰ ÁN

Mọi mã nguồn sinh ra phải tuân thủ nghiêm ngặt theo đúng Tech Stack đã định nghĩa. Tuyệt đối không tự ý thêm các thư viện hoặc dependency ngoài luồng.

| Lớp (Layer) | Công nghệ / Thư viện quy định | Mục đích & Chuẩn áp dụng |
| :--- | :--- | :--- |
| **Frontend UI/UX** | **React / Next.js** + **Tailwind CSS** + `tailwind-merge` + `clsx` | Giao diện hiện đại, responsive, không boilerplate class trùng lặp. |
| **State Management** | **Zustand** | Quản lý state toàn cục nhẹ gọn, module hóa theo store, không lạm dụng context API cồng kềnh. |
| **Component System & Docs** | **Storybook** | Component-driven development, tài liệu hóa UI component, visual testing. |
| **UI/UX Excellence** | **UI/UX Pro Max Principles** | Phối màu chuẩn WCAG AA (>=4.5:1), font typography có tính nhận diện, animation GPU-accelerated (200-300ms). |
| **Backend & Routing** | **Hono** (`honojs/hono`) | Web framework siêu nhẹ, type-safe, chạy tối ưu trên edge/serverless/Node.js/Bun. |
| **ORM & Schema** | **Drizzle ORM** (`drizzle-team/drizzle-orm`) | Type-safe SQL ORM, schema khai báo rõ ràng, zero-overhead. |
| **Schema Validation** | **Zod** (`colinhacks/zod`) | Validation ở mọi ranh giới (API Request/Response, Form data, Drizzle schema bridge via `drizzle-zod`). |
| **DB Migration & DDL** | **Atlas** (`ariga/atlas`) + **SQLGlot** (`tobymao/sqlglot`) | Quản lý schema declarative, kiểm soát version migration an toàn, phân tích/chuyển dịch SQL chuẩn xác. |
| **Testing, Eval & Tooling** | **Promptfoo** + **Aider/Repomix/Graphify** | Đánh giá chất lượng logic/prompts và tối ưu hóa context tri thức. |

---

## 3. DESIGN & UI/UX POLICY (UI-UX-PRO-MAX)

1. **Từ chối giao diện AI rập khuôn (No Cliché):** Không lạm dụng gradient tím xanh bừa bãi, không lạm dụng hiệu ứng glassmorphism mờ mịt gây khó đọc, không tự chế custom cursor.
2. **Typography & Layout chuyên nghiệp:** 
   - Ghép cặp Display font (tiêu đề cá tính) và Body font (dễ đọc, hỗ trợ số tabular).
   - Độ dài dòng lý tưởng: `45-75ch`.
   - Vùng cảm ứng tương tác tối thiểu `>= 44px`.
   - Chống tràn text: `overflow-wrap: anywhere`, `hyphens: auto`.
3. **Hiệu năng & Animation:**
   - Animation mượt mà, chỉ can thiệp vào thuộc tính `opacity` và `transform` để tận dụng GPU.
   - Thời gian chuyển động lý tưởng: `200ms - 300ms`.
   - Luôn tôn trọng tùy chọn `prefers-reduced-motion`.

---

## 4. QUY TRÌNH PHÁT TRIỂN TIÊU CHUẨN (STANDARD OPERATING LOOP)

1. **Khảo sát:** Đọc code hiện tại, tra cứu JIT Skill tương ứng trong `.github/skills/` hoặc `.agents/skills/`.
2. **Kế hoạch:** Xác định phạm vi sửa đổi tối thiểu (narrow edits), không đụng chạm file không liên quan.
3. **Thực thi:** Áp dụng đúng công nghệ cố định.
4. **Kiểm tra:** Chạy type-check, lint, build hoặc unit test.
5. **Báo cáo:** Trả về kết quả ngắn gọn, tập trung vào: *thay đổi gì, file nào, kết quả xác minh ra sao*.
