export interface ExperienceData {
  id: string;
  stepNumber: string;
  period: string;
  roleVi: string;
  roleEn: string;
  companyVi: string;
  companyEn: string;
  tagVi: string;
  tagEn: string;
  highlightsVi: string[];
  highlightsEn: string[];
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

export const PROFILE_INFO = {
  name: "Ngô Phúc",
  alias: "POSTLAIN",
  titleVi: "MANAGER — QUẢN LÍ",
  titleEn: "OPERATIONS & STUDIO MANAGER",
  phone: "0938-649-420",
  email: "studionopu@gmail.com",
  locationVi: "Kim Đồng, Đà Lạt, Lâm Đồng",
  locationEn: "Kim Dong St, Da Lat, Lam Dong, Vietnam",
  taglineVi: "Quản lí bằng logic. Thổi hồn bằng nghệ thuật.",
  taglineEn: "Led by logic. Elevated by art.",
  bioVi: "Là một người đam mê với nghệ thuật và công nghệ, đặc biệt yêu thích việc quản lí và sắp xếp các quy trình một cách logic và tự động hoá.",
  bioEn: "Passionate about art and technology, dedicated to managing and structuring operational workflows with logic and automation.",
};

export const DICTIONARY = {
  vi: {
    hero: {
      status: "SẴN SÀNG CHO VAI TRÒ QUẢN LÍ & VẬN HÀNH • 2026",
      name: "NGÔ PHÚC",
      role: "MANAGER — QUẢN LÍ",
      hook1: "Quản lí bằng",
      hook1Bold: "LOGIC.",
      hook2: "Thổi hồn bằng",
      hook2Bold: "NGHỆ THUẬT.",
      bio: "Đam mê nghệ thuật và công nghệ, yêu thích việc quản lí và sắp xếp các quy trình một cách logic và tự động hoá.",
      exploreBtn: "Hành Trình Sự Nghiệp",
      contactBtn: "Liên Hệ Trực Tiếp",
    },
    nav: {
      career: "Kinh Nghiệm",
      project: "Dự Án",
      manifesto: "Triết Lý",
      education: "Học Vấn",
      contact: "Liên Hệ",
    },
    career: {
      badge: "01 // HÀNH TRÌNH PHÁT TRIỂN NGHỀ NGHIỆP",
      title: "CHRONOLOGICAL CAREER TOUR",
      desc: "Lộ trình thực chiến từ năm 2019 đến 2026: Dẫn dắt chuỗi bán lẻ quốc tế, quản lý phòng thu âm nhạc & điều hành ẩm thực.",
      prevBtn: "Chặng Trước",
      nextBtn: "Chặng Tiếp",
      stageLabel: "CHẶNG",
    },
    featured: {
      badge: "02 // DỰ ÁN NỔI BẬT ĐANG PHÁT TRIỂN",
      title: "HIDDEN MUSIC PLATFORM",
      subtitle: "Nền tảng âm nhạc số & mạng lưới sáng tạo nghệ thuật",
      desc: "Hệ sinh thái phân phối, sản xuất âm thanh và định hướng truyền thông cho nghệ sĩ, phát triển và vận hành trực tiếp bởi Ngô Phúc.",
      url: "https://hiddenmusic.postlain.com",
      actionBtn: "Truy Cập Nền Tảng",
      highlights: [
        "Sản xuất âm nhạc & Audio Engineering chuyên nghiệp",
        "Quản lý bản quyền, nghệ sĩ và hệ thống kênh truyền thông MCN",
        "Quy trình phát hành và tối ưu hóa trải nghiệm âm thanh số",
      ],
    },
    capabilities: {
      badge: "03 // THẾ MẠNH & KỸ NĂNG CỐT LÕI",
      title: "CORE CAPABILITIES",
      pillars: [
        {
          title: "Quản Lý & Điều Phối",
          desc: "Khả năng quan sát sắc bén, bố trí nhân sự chính xác và giữ lửa nhiệt huyết cho toàn bộ tổ chức.",
        },
        {
          title: "Tự Động Hóa Quy Trình",
          desc: "Ứng dụng công nghệ và hệ thống logic để tối ưu hóa quản lý tồn kho, chấm công và loại bỏ các điểm nghẽn thủ công.",
        },
        {
          title: "Nghệ Thuật & Truyền Thông",
          desc: "Sản xuất âm nhạc/phim, định hướng hình ảnh thương hiệu và làm việc chuyên nghiệp bằng tiếng Anh.",
        },
      ],
    },
    education: {
      badge: "04 // NỀN TẢNG ĐÀO TẠO",
      title: "ACADEMIC FOUNDATION",
    },
    contact: {
      badge: "05 // KẾT NỐI TRỰC TIẾP",
      title1: "CÙNG KIẾN TẠO",
      title2: "DÒNG CHẢY ĐỘT PHÁ.",
      desc: "Sẵn sàng đón nhận cơ hội Quản lý Vận hành, Giám đốc Cửa hàng / Phòng thu hoặc Hợp tác Dự án Sản xuất Nghệ thuật.",
      formName: "Họ và tên của bạn",
      formEmail: "Địa chỉ email",
      formMessage: "Nội dung trao đổi hợp tác...",
      submitBtn: "GỬI THƯ TRỰC TIẾP",
      sending: "Đang gửi email...",
      success: "Cảm ơn bạn! Email đã được gửi thẳng tới studionopu@gmail.com.",
      error: "Không thể gửi thư lúc này, vui lòng liên hệ qua hotline 0938-649-420.",
    },
  },
  en: {
    hero: {
      status: "AVAILABLE FOR OPERATIONS & MANAGEMENT ROLES • 2026",
      name: "NGO PHUC",
      role: "OPERATIONS & STUDIO MANAGER",
      hook1: "Led by",
      hook1Bold: "LOGIC.",
      hook2: "Elevated by",
      hook2Bold: "ART.",
      bio: "Passionate about art and technology, dedicated to managing and structuring operational workflows with logic and automation.",
      exploreBtn: "Career Timeline",
      contactBtn: "Direct Contact",
    },
    nav: {
      career: "Experience",
      project: "Project",
      manifesto: "Philosophy",
      education: "Education",
      contact: "Contact",
    },
    career: {
      badge: "01 // CHRONOLOGICAL CAREER CHRONICLES",
      title: "CHRONOLOGICAL CAREER TOUR",
      desc: "Field-tested operational track record from 2019 to 2026: Retail store leadership, sound recording studio direction, and culinary management.",
      prevBtn: "Previous Stage",
      nextBtn: "Next Stage",
      stageLabel: "STAGE",
    },
    featured: {
      badge: "02 // ACTIVE FEATURED VENTURE",
      title: "HIDDEN MUSIC PLATFORM",
      subtitle: "Digital Sound Platform & Creative Media Network",
      desc: "A digital audio ecosystem for production, talent direction, and MCN distribution, architected and operated by Ngo Phuc.",
      url: "https://hiddenmusic.postlain.com",
      actionBtn: "Visit Platform",
      highlights: [
        "High-fidelity music production & acoustic engineering",
        "Talent management, copyright governance & MCN media networks",
        "Automated release pipelines and digital distribution",
      ],
    },
    capabilities: {
      badge: "03 // CORE CAPABILITIES",
      title: "CORE CAPABILITIES",
      pillars: [
        {
          title: "Executive Management",
          desc: "Sharp observational empathy, optimal resource allocation, and cultivating strong team morale across operations.",
        },
        {
          title: "Workflow Automation",
          desc: "Designing logic-driven systems for inventory auditing, shift scheduling, and eliminating administrative friction.",
        },
        {
          title: "Creative Direction",
          desc: "Music and media production, creative branding, and fluent bilingual communication in English.",
        },
      ],
    },
    education: {
      badge: "04 // ACADEMIC FOUNDATION",
      title: "ACADEMIC FOUNDATION",
    },
    contact: {
      badge: "05 // INITIATE DIALOGUE",
      title1: "LET'S BUILD",
      title2: "THE EXTRAORDINARY.",
      desc: "Open for Store / Operations Management, Studio Direction, or High-Impact Media & Creative Productions.",
      formName: "Your Full Name",
      formEmail: "Your Email Address",
      formMessage: "Collaboration details or inquiries...",
      submitBtn: "SEND DIRECT INQUIRY",
      sending: "Dispatching email...",
      success: "Thank you! Your email has been delivered directly to studionopu@gmail.com.",
      error: "Unable to dispatch email. Please call directly at +84 938-649-420.",
    },
  },
};

/**
 * EXACT CHRONOLOGICAL ORDER FROM PAST (2019) TO PRESENT (2026)
 * Strict 1-to-1 extraction from NGOPHUC_CV_2026.pdf
 */
export const CAREER_TOUR_DATA: ExperienceData[] = [
  {
    id: "viva-star-coffee",
    stepNumber: "01",
    period: "5/2019 – 1/2020",
    roleVi: "Ca Trưởng Pha Chế",
    roleEn: "Barista Shift Lead",
    companyVi: "VIVA STAR COFFEE",
    companyEn: "Viva Star Coffee Chain",
    tagVi: "Chuỗi F&B & Quản lí ca",
    tagEn: "F&B Chain Leadership",
    highlightsVi: [
      "Pha chế cà phê, trà sữa, thức ăn nhanh theo công thức chuẩn hãng.",
      "Sắp xếp ca làm việc cho nhân sự và duy trì tiêu chuẩn phục vụ.",
    ],
    highlightsEn: [
      "Crafted coffee, tea, and quick-service items adhering strictly to franchise standards.",
      "Scheduled shift rosters and maintained impeccable frontline service standards.",
    ],
  },
  {
    id: "sb-studio",
    stepNumber: "02",
    period: "3/2023 – 10/2024",
    roleVi: "Quản Lý Phòng Thu",
    roleEn: "Recording Studio Manager",
    companyVi: "Công Ty TNHH SB Studio",
    companyEn: "SB Studio Co., Ltd",
    tagVi: "Sản xuất âm nhạc & MCN",
    tagEn: "Music Production & MCN",
    highlightsVi: [
      "Quản lí doanh thu, định hướng Marketing và chăm sóc khách hàng (CSKH).",
      "Sắp xếp thời gian thu âm, lịch quay MV đạt chuẩn phát hành.",
      "Quản lí các nghệ sĩ thuộc công ty, đối tác MCN và truyền thông.",
    ],
    highlightsEn: [
      "Managed business revenue, strategic marketing direction, and client relationship management.",
      "Scheduled tracking, recording sessions, and music video shoots under release milestones.",
      "Managed exclusive company artists, digital MCN partners, and media campaigns.",
    ],
  },
  {
    id: "phui-steak-lead",
    stepNumber: "03",
    period: "10/2024 – 2/2025",
    roleVi: "Ca Trưởng Bếp",
    roleEn: "Kitchen Shift Supervisor",
    companyVi: "PHỦI STEAK Đà Lạt",
    companyEn: "PHUI STEAK Gastronomy",
    tagVi: "Ẩm thực Âu & Điều phối ca",
    tagEn: "European Cuisine Operations",
    highlightsVi: [
      "Đảm bảo món ăn trong ngày đầy đủ và đạt chuẩn chất lượng.",
      "Chuyên về kỹ thuật áp chảo Steak bò ngoại nhập chuẩn xác.",
      "Linh hoạt hỗ trợ và điều phối các vị trí thiếu hụt trong ca.",
    ],
    highlightsEn: [
      "Guaranteed complete daily culinary supply and food quality standards.",
      "Specialized in precision pan-searing techniques for imported beef steaks.",
      "Dynamically supported and filled line gaps across high-volume dining hours.",
    ],
  },
  {
    id: "phui-steak-chef",
    stepNumber: "04",
    period: "2/2025 – 6/2025",
    roleVi: "Bếp Chính",
    roleEn: "Senior Line Chef",
    companyVi: "PHỦI STEAK Đà Lạt",
    companyEn: "PHUI STEAK Gastronomy",
    tagVi: "Chế biến món Âu chuyên sâu",
    tagEn: "European Culinary Craft",
    highlightsVi: [
      "Chuẩn bị nguyên liệu tươi sống đảm bảo vệ sinh an toàn thực phẩm.",
      "Áp chảo và tích lũy kinh nghiệm các món Âu: steak, mì Ý, súp, cá hồi, salad.",
    ],
    highlightsEn: [
      "Prepared premium raw ingredients ensuring strict food safety and hygiene.",
      "Mastered European culinary craft: gourmet steak, artisanal pasta, soups, salmon, and salads.",
    ],
  },
  {
    id: "aldo-store-manager",
    stepNumber: "05",
    period: "6/2025 – 7/2026",
    roleVi: "Quản Lí Cửa Hàng",
    roleEn: "Store General Manager",
    companyVi: "ALDO GO! Đà Lạt",
    companyEn: "ALDO Flagship — GO! Da Lat",
    tagVi: "Quản trị bán lẻ cao cấp",
    tagEn: "Luxury Fashion Retail Management",
    highlightsVi: [
      "Quản lí toàn diện cửa hàng bán lẻ cao cấp tại TTTM GO! Đà Lạt.",
      "Quản lí kho bãi, định mức tồn kho và luân chuyển hàng hóa.",
      "Quản lí, đào tạo nhân sự bán hàng và phát triển doanh số ngành retail.",
    ],
    highlightsEn: [
      "Directed full-scope store operations at prime retail hub GO! Da Lat mall.",
      "Managed warehouse logistics, inventory thresholds, and stock allocation.",
      "Led, trained, and motivated sales teams to drive retail growth and revenue targets.",
    ],
  },
];

export const EDUCATION_DATA: EducationData[] = [
  {
    year: "2020",
    schoolVi: "Tốt Nghiệp THPT",
    schoolEn: "High School Graduation",
    majorVi: "Trình độ 12/12",
    majorEn: "General Education (12/12)",
  },
  {
    year: "2021",
    schoolVi: "Đại Học Văn Lang",
    schoolEn: "Van Lang University",
    majorVi: "Chuyên ngành Quan hệ công chúng (PR)",
    majorEn: "Public Relations (PR)",
    statusVi: "Bảo lưu",
    statusEn: "Deferred",
  },
  {
    year: "2021",
    schoolVi: "Cao Đẳng FPT",
    schoolEn: "FPT Polytechnic College",
    majorVi: "Chuyên ngành Thiết kế WEB",
    majorEn: "Web Design & Digital Media",
    statusVi: "Bảo lưu",
    statusEn: "Deferred",
  },
];
