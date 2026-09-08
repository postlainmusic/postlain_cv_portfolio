export interface ExperienceData {
  id: string;
  period: string;
  episode: string;
  roleVi: string;
  roleEn: string;
  companyVi: string;
  companyEn: string;
  type: 'retail' | 'culinary' | 'studio' | 'beverage';
  tagVi: string;
  tagEn: string;
  highlightsVi: string[];
  highlightsEn: string[];
}

export interface SkillItem {
  categoryVi: string;
  categoryEn: string;
  levelVi: string;
  levelEn: string;
  skills: string[];
}

export interface EducationData {
  year: string;
  schoolVi: string;
  schoolEn: string;
  majorVi: string;
  majorEn: string;
  statusVi?: string;
  statusEn?: string;
}

export const DICTIONARY = {
  vi: {
    hero: {
      status: "SẴN SÀNG CHO VAI TRÒ ĐIỀU HÀNH & AI AUTOMATION • 2026",
      name: "NGÔ PHÚC",
      alias: "POSTLAIN",
      subtitle: "Multi-Disciplinary Operations Lead & Sound Producer",
      bio: "Đam mê nghệ thuật và công nghệ, định hình tương lai vận hành bằng tư duy hệ thống logic, tự động hóa với AI và trải nghiệm thị giác chuẩn Awwwards.",
      scrollHint: "CUỘN ĐỂ KHÁM PHÁ HÀNH TRÌNH",
      stats: {
        domain: "Lĩnh vực",
        domainVal: "Quản trị chuỗi & Studio",
        art: "Nghệ thuật",
        artVal: "Sản xuất âm nhạc & MCN",
        tech: "Công nghệ",
        techVal: "AI Agents & Web Systems",
        location: "Vị trí",
        locationVal: "Đà Lạt, Lâm Đồng",
      }
    },
    nav: {
      overview: "Tổng quan",
      experience: "Hành trình",
      skills: "Năng lực & AI",
      education: "Học vấn",
      contact: "Liên hệ",
      soundOn: "BẬT ÂM",
      soundOff: "TẮT ÂM",
    },
    manifesto: {
      badge: "01 // TRIẾT LÝ VẬN HÀNH",
      title1: "QUẢN TRỊ BẰNG LOGIC.",
      title2: "THỔI HỒN BẰNG NGHỆ THUẬT.",
      quote: "Giao thoa giữa kỷ luật điều hành doanh nghiệp thực chiến và tư duy bay bổng của nhà sản xuất âm nhạc. Tôi biến mọi ma sát trong quy trình nhân sự và bán lẻ thành dòng chảy tự động, mạch lạc và giàu cảm hứng.",
      pillars: [
        {
          title: "Điều Phối & Giữ Lửa",
          desc: "Quan sát sâu sắc, bố trí nhân sự chính xác theo thế mạnh và xây dựng nguồn năng lượng tích cực cho toàn bộ tổ chức."
        },
        {
          title: "Tự Động Hóa Cùng AI",
          desc: "Ứng dụng các Agentic Workflow vào quản lý hàng tồn, chấm công và chăm sóc khách hàng, xóa bỏ các điểm nghẽn thủ công."
        },
        {
          title: "Sáng Tạo Đa Chiều",
          desc: "Sản xuất âm nhạc, thiết kế trải nghiệm thương hiệu và tư duy thẩm mỹ cao cấp tạo sự khác biệt ngay từ cái nhìn đầu tiên."
        }
      ]
    },
    experiences: {
      badge: "02 // HÀNH TRÌNH ĐIỆN ẢNH",
      title: "EXPERIENCE ODYSSEY",
      desc: "Trải nghiệm thực chiến đa lĩnh vực: Quản lý chuỗi thời trang quốc tế, giám đốc studio sản xuất âm nhạc, và dẫn dắt bếp ẩm thực Âu.",
      itemsCount: "trách nhiệm then chốt",
    },
    skills: {
      badge: "03 // HỆ THỐNG NĂNG LỰC & AI",
      title: "SKILLS & AI ECOSYSTEM",
      desc: "Vũ khí vận hành kết hợp công nghệ hiện đại và năng lực lãnh đạo con người.",
      thesisTitle: "TRIẾT LÝ HỆ ĐIỀU HÀNH AI THẾ HỆ MỚI",
      thesisDesc: "Không dừng lại ở việc dùng AI để sinh văn bản đơn giản, tôi thiết kế kiến trúc các tác nhân AI (Autonomous Agents) tự động phân tích doanh thu, rà soát kho vận và điều phối luồng công việc tự động không cần giám sát thủ công."
    },
    education: {
      badge: "04 // NỀN TẢNG ĐÀO TẠO",
      title: "EDUCATION & ROOTS",
    },
    contact: {
      badge: "05 // KẾT NỐI HỢP TÁC",
      title1: "CÙNG TẠO NÊN",
      title2: "ĐIỀU PHI THƯỜNG.",
      desc: "Sẵn sàng đón nhận cơ hội Quản lý Vận hành, Tư vấn Triển khai AI hoặc Hợp tác Sản xuất Âm nhạc / Nghệ thuật cao cấp.",
      emailBtn: "Gửi Email Trực Tiếp",
      phoneBtn: "Gọi Điện Thoại",
      locationNote: "Kim Đồng, Phường 6, Đà Lạt (Sẵn sàng Onsite tại Đà Lạt hoặc Remote toàn cầu)"
    }
  },
  en: {
    hero: {
      status: "AVAILABLE FOR OPERATIONS & AI LEADERSHIP • 2026",
      name: "NGO PHUC",
      alias: "POSTLAIN",
      subtitle: "Multi-Disciplinary Operations Lead & Sound Producer",
      bio: "Fusing logic-driven management with creative music production, engineered through automated AI workflows and award-winning aesthetic standards.",
      scrollHint: "SCROLL TO WITNESS THE ODYSSEY",
      stats: {
        domain: "Domain",
        domainVal: "Retail & Studio Operations",
        art: "Creative",
        artVal: "Music Production & MCN",
        tech: "Engineering",
        techVal: "AI Agents & Web Architecture",
        location: "Base",
        locationVal: "Da Lat, Vietnam",
      }
    },
    nav: {
      overview: "Overview",
      experience: "Odyssey",
      skills: "Skills & AI",
      education: "Education",
      contact: "Connect",
      soundOn: "AUDIO ON",
      soundOff: "AUDIO OFF",
    },
    manifesto: {
      badge: "01 // OPERATING THESIS",
      title1: "POWERED BY LOGIC.",
      title2: "ELEVATED BY ART.",
      quote: "At the intersection of rigorous corporate execution and limitless musical creativity, I eliminate operational friction by constructing seamless, automated, and inspiring human-machine systems.",
      pillars: [
        {
          title: "Team Orchestration",
          desc: "Sharp observational empathy, agile resource scheduling, and cultivating unstoppable morale across cross-functional teams."
        },
        {
          title: "Autonomous AI Systems",
          desc: "Deploying production-grade agentic workflows for inventory reconciliation, workforce scheduling, and client success pipelines."
        },
        {
          title: "Multi-Disciplinary Art",
          desc: "Music production, acoustic branding, and cutting-edge visual design ensuring unforgettable first impressions."
        }
      ]
    },
    experiences: {
      badge: "02 // CAREER CHRONICLES",
      title: "EXPERIENCE ODYSSEY",
      desc: "Versatile operational leadership spanning multinational retail flagship management, creative studio direction, and fine culinary execution.",
      itemsCount: "core impact vectors",
    },
    skills: {
      badge: "03 // CAPABILITIES MATRIX",
      title: "SKILLS & AI ECOSYSTEM",
      desc: "A multidisciplinary toolkit uniting technical execution with executive human leadership.",
      thesisTitle: "THE NEXT-GEN AGENTIC OPERATIONS THESIS",
      thesisDesc: "Beyond basic generative prompts, I architect autonomous AI loops that monitor store-level P&L, balance inventory flux, and streamline human communications without micro-management overhead."
    },
    education: {
      badge: "04 // ACADEMIC FOUNDATION",
      title: "EDUCATION & ROOTS",
    },
    contact: {
      badge: "05 // INITIATE DIALOGUE",
      title1: "LET'S SHAPE",
      title2: "THE EXTRAORDINARY.",
      desc: "Open for Store / Operations Management, AI Workflow Consultancy, or High-Impact Music & Media Production.",
      emailBtn: "Direct Email Dispatch",
      phoneBtn: "Direct Hotline",
      locationNote: "Kim Dong St, Ward 6, Da Lat (Available Onsite in Da Lat or Remote Worldwide)"
    }
  }
};

export const EXPERIENCES_DATA: ExperienceData[] = [
  {
    id: "aldo-retail",
    period: "06/2025 - 07/2026",
    episode: "ACT IV",
    roleVi: "Quản Lý Cửa Hàng (Store Manager)",
    roleEn: "Store General Manager",
    companyVi: "ALDO GO! Đà Lạt",
    companyEn: "ALDO Flagship — GO! Da Lat",
    type: "retail",
    tagVi: "Bán lẻ cao cấp & Chuỗi",
    tagEn: "Luxury Fashion Retail",
    highlightsVi: [
      "Quản lý toàn diện vận hành cửa hàng ALDO tại trung tâm thương mại sầm uất bậc nhất GO! Đà Lạt.",
      "Kiểm soát tối ưu hệ thống kho bãi, định mức tồn kho và luân chuyển hàng hóa không thất thoát.",
      "Tuyển dụng, huấn luyện kỹ năng chốt sale và xây dựng văn hóa phục vụ khách hàng chuẩn quốc tế.",
      "Đạt và vượt các chỉ tiêu KPI doanh số thông qua chiến lược thúc đẩy trải nghiệm mua sắm."
    ],
    highlightsEn: [
      "Directed full-scope store operations at the prime retail hub GO! Da Lat mall.",
      "Orchestrated warehouse logistics, inventory auditing, and zero-shrinkage stock rotations.",
      "Recruited, coached, and inspired a high-performing retail team committed to luxury service benchmarks.",
      "Consistently achieved revenue targets through data-informed visual merchandising and CRM tactics."
    ]
  },
  {
    id: "phui-steak-lead",
    period: "10/2024 - 02/2025",
    episode: "ACT III",
    roleVi: "Ca Trưởng Bếp (Kitchen Shift Lead)",
    roleEn: "Kitchen Shift Supervisor",
    companyVi: "PHỦI STEAK Đà Lạt",
    companyEn: "PHUI STEAK Gastronomy",
    type: "culinary",
    tagVi: "Ẩm thực Âu & Vận hành ca",
    tagEn: "European Cuisine Operations",
    highlightsVi: [
      "Chịu trách nhiệm đảm bảo chất lượng và số lượng toàn bộ món ăn phục vụ trong ca cao điểm.",
      "Kỹ thuật áp chảo chuyên sâu các loại Steak bò ngoại nhập với nhiệt độ và độ chín chuẩn xác.",
      "Linh hoạt điều phối nhân sự, bù đắp các vị trí khuyết và xử lý sự cố bếp theo thời gian thực."
    ],
    highlightsEn: [
      "Guaranteed consistent gastronomic quality and service cadence during peak dining hours.",
      "Mastered high-heat pan-searing techniques for imported beef steaks across exact doneness levels.",
      "Dynamically re-allocated line cooks to eliminate bottlenecks and uphold kitchen rhythm."
    ]
  },
  {
    id: "phui-steak-chef",
    period: "02/2025 - 06/2025",
    episode: "ACT II-B",
    roleVi: "Bếp Chính (Line Chef)",
    roleEn: "Senior Line Chef",
    companyVi: "PHỦI STEAK Đà Lạt",
    companyEn: "PHUI STEAK Gastronomy",
    type: "culinary",
    tagVi: "Chế biến chuyên nghiệp",
    tagEn: "Culinary Line Craft",
    highlightsVi: [
      "Chuẩn bị nguyên liệu tươi sống, sơ chế thực phẩm đảm bảo tuyệt đối an toàn vệ sinh.",
      "Làm chủ thực đơn Âu đa dạng: steak, mì Ý hand-crafted, sốt béo, cá hồi Na Uy áp chảo, salad tươi."
    ],
    highlightsEn: [
      "Prepared premium raw ingredients under stringent hygiene and culinary precision protocols.",
      "Mastered a diverse European repertoire: gourmet steaks, artisanal pasta, pan-seared salmon, and seasonal salads."
    ]
  },
  {
    id: "sb-studio",
    period: "03/2023 - 10/2024",
    episode: "ACT II-A",
    roleVi: "Quản Lý Phòng Thu & Điều Hành Sản Xuất",
    roleEn: "Recording Studio Director & Operations Lead",
    companyVi: "Công ty TNHH SB Studio",
    companyEn: "SB Studio Co., Ltd",
    type: "studio",
    tagVi: "Sản xuất âm nhạc & MCN",
    tagEn: "Music Production & Talent Management",
    highlightsVi: [
      "Quản lý doanh thu, chi phí vận hành và xây dựng chiến lược kinh doanh dịch vụ âm nhạc.",
      "Định hướng Marketing, chăm sóc các đối tác lớn, nghệ sĩ tên tuổi và hệ thống kênh MCN truyền thông.",
      "Điều phối lịch trình thu âm, mixing/mastering và quay MV đạt tiêu chuẩn phát hành thị trường.",
      "Quản lý trực tiếp các nghệ sĩ độc quyền của công ty, phát triển định hướng hình ảnh và tác phẩm."
    ],
    highlightsEn: [
      "Steered financial P&L, budget forecasting, and commercial growth strategies for music production services.",
      "Directed strategic marketing campaigns and cultivated partnerships with leading artists and MCN digital networks.",
      "Scheduled tracking, recording, mixing/mastering sessions, and music video shoots under tight release deadlines.",
      "Managed exclusive signed talent, directing their creative brand personas and market releases."
    ]
  },
  {
    id: "viva-coffee",
    period: "05/2019 - 01/2020",
    episode: "ACT I",
    roleVi: "Ca Trưởng Pha Chế (Barista Shift Lead)",
    roleEn: "Barista Shift Lead",
    companyVi: "VIVA STAR COFFEE",
    companyEn: "VIVA STAR COFFEE Chain",
    type: "beverage",
    tagVi: "Chuỗi F&B & Quản lý ca",
    tagEn: "F&B Chain Leadership",
    highlightsVi: [
      "Pha chế cà phê và đồ uống theo công thức chuẩn chuỗi thương hiệu lớn.",
      "Sắp xếp ca làm việc, đào tạo nhân viên mới và kiểm soát chất lượng dịch vụ khách hàng tại quầy."
    ],
    highlightsEn: [
      "Prepared signature espresso drinks and beverages adhering to strict franchise consistency standards.",
      "Scheduled shift rosters, mentored incoming team members, and maintained exemplary customer service at the bar."
    ]
  }
];

export const SKILL_GROUPS_DATA: SkillItem[] = [
  {
    categoryVi: "QUẢN TRỊ & ĐIỀU HÀNH",
    categoryEn: "EXECUTIVE OPERATIONS",
    levelVi: "Chuyên sâu",
    levelEn: "Core Mastery",
    skills: [
      "Quản lý cửa hàng bán lẻ (Store Management)",
      "Điều hành phòng thu & MCN Media",
      "Quản trị nhân sự & Tạo động lực đội ngũ",
      "Quản lý tồn kho, P&L & Doanh thu",
      "Xây dựng quy trình vận hành không ma sát"
    ]
  },
  {
    categoryVi: "AI & CÔNG NGHỆ TỰ ĐỘNG HÓA",
    categoryEn: "AI & AUTOMATION LAB",
    levelVi: "Thực chiến",
    levelEn: "Applied Engineering",
    skills: [
      "Agentic AI Workflows & Prompt Engineering",
      "Tự động hóa báo cáo & dữ liệu nhân sự",
      "TypeScript, React, Next.js",
      "Cloudflare Workers, Hono, Drizzle ORM",
      "UI/UX Design chuẩn Awwwards Standard"
    ]
  },
  {
    categoryVi: "NGHỆ THUẬT & TRUYỀN THÔNG",
    categoryEn: "AUDIO & CREATIVE MEDIA",
    levelVi: "Tài năng",
    levelEn: "Creative Talent",
    skills: [
      "Sản xuất âm nhạc & Audio Engineering (FL Studio/Logic)",
      "Định hướng truyền thông nghệ sĩ & MCN",
      "Ẩm thực Âu cao cấp & Quản lý bếp",
      "Tiếng Anh giao tiếp & làm việc chuyên nghiệp"
    ]
  }
];

export const EDUCATION_DATA: EducationData[] = [
  {
    year: "2020",
    schoolVi: "Tốt nghiệp THPT",
    schoolEn: "High School Diploma",
    majorVi: "Trình độ 12/12",
    majorEn: "General Education (12/12)",
  },
  {
    year: "2021",
    schoolVi: "Đại học Văn Lang",
    schoolEn: "Van Lang University",
    majorVi: "Chuyên ngành Quan hệ công chúng (PR)",
    majorEn: "Public Relations (PR)",
    statusVi: "Bảo lưu",
    statusEn: "Deferred",
  },
  {
    year: "2021",
    schoolVi: "Cao đẳng FPT Polytechnic",
    schoolEn: "FPT Polytechnic College",
    majorVi: "Chuyên ngành Thiết kế Web (Web Design)",
    majorEn: "Web Design & Digital Media",
    statusVi: "Bảo lưu",
    statusEn: "Deferred",
  }
];
