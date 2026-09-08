export interface ExperienceItem {
  period: string;
  role: string;
  company: string;
  highlights: string[];
  type: 'management' | 'tech' | 'culinary' | 'retail';
}

export interface SkillGroup {
  category: string;
  skills: string[];
  level: string;
}

export interface EducationItem {
  year: string;
  school: string;
  major: string;
  note?: string;
}

export const PROFILE_DATA = {
  name: "Ngô Phúc",
  alias: "POSTLAIN",
  tagline: "Manager / Software Engineer & AI Automation / Music Producer",
  location: "Kim Đồng, Phường 6, Đà Lạt, Lâm Đồng",
  email: "studionopu@gmail.com",
  phone: "0938-649-420",
  bio: "Là một người đam mê nghệ thuật và công nghệ, đặc biệt yêu thích việc quản lý, tối ưu hoá và sắp xếp các quy trình vận hành một cách logic, tự động hoá cùng trí tuệ nhân tạo (AI).",
  strengths: [
    {
      title: "Quản Lý & Điều Phối",
      description: "Khả năng quan sát nhạy bén, điều phối nhân sự logic, xây dựng quy trình và giữ lửa năng lượng tích cực cho toàn bộ đội ngũ."
    },
    {
      title: "AI & Tự Động Hoá",
      description: "Nghiên cứu và phát triển phần mềm quản lý nhân sự, tối ưu hóa workflow và triển khai tự động hoá vận hành với các mô hình AI hiện đại."
    },
    {
      title: "Nghệ Thuật & Sáng Tạo",
      description: "Sản xuất âm nhạc, thiết kế trải nghiệm, định hướng truyền thông đa kênh và tư duy thẩm mỹ hiện đại (Awwwards standard)."
    }
  ],
  education: [
    {
      year: "2020",
      school: "Tốt nghiệp THPT",
      major: "Trình độ 12/12",
    },
    {
      year: "2021",
      school: "Đại học Văn Lang",
      major: "Quan hệ công chúng",
      note: "Bảo lưu"
    },
    {
      year: "2021",
      school: "Cao đẳng FPT Polytechnic",
      major: "Thiết kế WEB",
      note: "Bảo lưu"
    }
  ] as EducationItem[],
  experiences: [
    {
      period: "06/2025 - 07/2026",
      role: "Quản Lý Cửa Hàng",
      company: "ALDO GO! Đà Lạt",
      type: "retail",
      highlights: [
        "Chịu trách nhiệm quản lý toàn diện vận hành cửa hàng ALDO tại trung tâm GO! Đà Lạt.",
        "Quản trị hệ thống kho bãi, kiểm kê hàng hóa và luân chuyển tồn kho chính xác.",
        "Quản lý, đào tạo và phát triển đội ngũ nhân sự bán hàng chuyên nghiệp.",
        "Xây dựng chiến lược thúc đẩy doanh số và phát triển ngành bán lẻ thời trang cao cấp."
      ]
    },
    {
      period: "10/2024 - 02/2025",
      role: "Ca Trưởng Bếp",
      company: "PHỦI STEAK",
      type: "culinary",
      highlights: [
        "Đảm bảo số lượng và chất lượng món ăn phục vụ trong ngày đạt tiêu chuẩn cao nhất.",
        "Chuyên trách kỹ thuật chế biến và áp chảo steak chuẩn Âu.",
        "Điều phối nhân lực và hỗ trợ linh hoạt các vị trí thiếu hụt trong ca làm việc."
      ]
    },
    {
      period: "02/2025 - 06/2025",
      role: "Bếp Chính",
      company: "PHỦI STEAK",
      type: "culinary",
      highlights: [
        "Chuẩn bị nguyên vật liệu và sơ chế thực phẩm đạt chuẩn vệ sinh an toàn.",
        "Áp chảo và làm chủ các món Âu đa dạng: steak, mì Ý, súp, cá hồi sốt, salad đặc trưng."
      ]
    },
    {
      period: "03/2023 - 10/2024",
      role: "Quản Lý Phòng Thu & Điều Hành",
      company: "Công ty TNHH SB Studio",
      type: "management",
      highlights: [
        "Quản lý doanh thu, ngân sách và hoạch định chiến lược kinh doanh dịch vụ âm nhạc.",
        "Lên định hướng Marketing, chăm sóc khách hàng VIP và đối tác chiến lược.",
        "Sắp xếp lịch thu âm, quay video clip và sản xuất âm nhạc chuyên nghiệp.",
        "Quản lý nghệ sĩ độc quyền của công ty, kết nối đối tác MCN, kênh truyền thông giải trí."
      ]
    },
    {
      period: "05/2019 - 01/2020",
      role: "Ca Trưởng Pha Chế (Barista Lead)",
      company: "VIVA STAR COFFEE",
      type: "management",
      highlights: [
        "Pha chế cà phê, trà sữa và các món ăn nhanh chuẩn công thức của chuỗi thương hiệu.",
        "Sắp xếp lịch làm việc theo ca và phân công nhiệm vụ cho đội ngũ nhân viên."
      ]
    }
  ] as ExperienceItem[],
  skillGroups: [
    {
      category: "Quản Trị & Vận Hành",
      skills: ["Quản lý nhân sự & Giữ lửa team", "Điều hành chuỗi bán lẻ & Phòng thu", "Quản lý tồn kho & Doanh thu", "CSKH & Quản trị quan hệ đối tác"],
      level: "Chuyên sâu"
    },
    {
      category: "Công Nghệ & AI Tự Động Hóa",
      skills: ["TypeScript / React / Next.js", "Hono / Cloudflare Workers", "Drizzle ORM / SQLite / PostgreSQL", "Workflow Automation & LLM Tools"],
      level: "Nâng cao"
    },
    {
      category: "Sáng Tạo & Ngôn Ngữ",
      skills: ["Âm nhạc / Music Production", "Thiết kế Web & UI/UX Studio", "Tiếng Anh giao tiếp & chuyên ngành", "Định hướng truyền thông MCN"],
      level: "Thành thạo"
    }
  ] as SkillGroup[]
};
