/**
 * AUTHENTIC PROFILE CONTENT (VIETNAMESE & ENGLISH)
 * 100% Grounded in NGOPHUC_CV_2026.pdf & PROFILE_NGOPHUC.md
 */

export interface CareerMilestone {
  id: string;
  badge: string;
  company: string;
  role: { vi: string; en: string };
  period: string;
  location: { vi: string; en: string };
  coreValue: { vi: string; en: string };
  responsibilities: { vi: string[]; en: string[] };
  specTags: string[];
}

export interface BentoItem {
  id: string;
  badge: string;
  title: { vi: string; en: string };
  subtitle: { vi: string; en: string };
  description: { vi: string; en: string };
  tags: string[];
}

export interface AppleContentData {
  hero: {
    statusBadge: { vi: string; en: string };
    name: string;
    alias: string;
    role: { vi: string; en: string };
    statement: { vi: string; en: string };
    location: { vi: string; en: string };
    scrollPrompt: { vi: string; en: string };
  };
  philosophy: {
    sectionBadge: string;
    slogan: { vi: string; en: string };
    lead: { vi: string; en: string };
    body: { vi: string; en: string };
    dualEngine: {
      left: {
        title: { vi: string; en: string };
        desc: { vi: string; en: string };
        points: { vi: string[]; en: string[] };
      };
      right: {
        title: { vi: string; en: string };
        desc: { vi: string; en: string };
        points: { vi: string[]; en: string[] };
      };
    };
  };
  milestonesHeader: {
    sectionBadge: string;
    title: { vi: string; en: string };
    subtitle: { vi: string; en: string };
  };
  milestones: CareerMilestone[];
  bentoHeader: {
    sectionBadge: string;
    title: { vi: string; en: string };
    subtitle: { vi: string; en: string };
  };
  bento: BentoItem[];
  contact: {
    sectionBadge: string;
    title: { vi: string; en: string };
    subtitle: { vi: string; en: string };
    hotline: string;
    email: string;
    location: { vi: string; en: string };
    hiddenMusicTitle: string;
    hiddenMusicDesc: { vi: string; en: string };
    hiddenMusicUrl: string;
    copyHotlineSuccess: { vi: string; en: string };
    copyEmailSuccess: { vi: string; en: string };
  };
}

export const APPLE_CONTENT: AppleContentData = {
  hero: {
    statusBadge: {
      vi: "ĐANG HOẠT ĐỘNG // SẴN SÀNG ĐIỀU HÀNH",
      en: "ACTIVE STATUS // READY FOR OPERATIONS",
    },
    name: "NGÔ PHÚC",
    alias: "POSTLAIN",
    role: {
      vi: "OPERATIONS & STUDIO MANAGER",
      en: "OPERATIONS & STUDIO MANAGER",
    },
    statement: {
      vi: "Có kinh nghiệm quản lý vận hành trong bán lẻ, F&B và studio. Quan tâm đến việc xây dựng quy trình rõ ràng và ứng dụng công nghệ để nâng cao hiệu quả.",
      en: "Operations experience across retail, F&B and studio environments, with a focus on clear processes and practical use of technology.",
    },
    location: {
      vi: "ĐÀ LẠT, LÂM ĐỒNG · VIỆT NAM",
      en: "DA LAT, LAM DONG · VIETNAM",
    },
    scrollPrompt: {
      vi: "CUỘN ĐỂ KHÁM PHÁ HỆ THỐNG",
      en: "SCROLL TO EXPLORE THE SYSTEM",
    },
  },

  philosophy: {
    sectionBadge: "01 · TRIẾT LÝ VẬN HÀNH // DUAL-ENGINE",
    slogan: {
      vi: "VẬN HÀNH VÀ SÁNG TẠO",
      en: "OPERATIONS AND CREATIVE WORK",
    },
    lead: {
      vi: "Tập trung vào con người, quy trình và hiệu quả trong công việc hằng ngày.",
      en: "Focused on people, process and practical results in day-to-day operations.",
    },
    body: {
      vi: "Kinh nghiệm thực tế kết hợp với nền tảng Quan hệ công chúng tại Đại học Văn Lang và Thiết kế Web tại FPT Polytechnic.",
      en: "Practical experience supported by a background in Public Relations at Van Lang University and Web Design at FPT Polytechnic.",
    },
    dualEngine: {
      left: {
        title: {
          vi: "VẬN HÀNH & CÔNG NGHỆ",
          en: "OPERATIONS & TECHNOLOGY",
        },
        desc: {
          vi: "Chuẩn hóa quy trình, quản lý hàng hóa và doanh thu, đồng thời ứng dụng AI cho các công việc lặp lại.",
          en: "Process standardization, inventory and revenue management, with practical AI automation for repetitive tasks.",
        },
        points: {
          vi: [
            "Quản lý doanh thu và dòng tiền",
            "Thiết lập SOP và phân ca",
            "Ứng dụng AI cho công việc lặp lại",
          ],
          en: [
            "Revenue and cash-flow management",
            "SOPs and shift scheduling",
            "AI-assisted workflow automation",
          ],
        },
      },
      right: {
        title: {
          vi: "STUDIO & TRUYỀN THÔNG",
          en: "STUDIO & COMMUNICATION",
        },
        desc: {
          vi: "Quản lý nghệ sĩ, điều phối lịch sản xuất, làm việc với đối tác truyền thông và phát triển dự án âm nhạc.",
          en: "Artist management, production scheduling, media partnerships and independent music projects.",
        },
        points: {
          vi: [
            "Làm việc với nghệ sĩ và đối tác truyền thông",
            "Marketing và chăm sóc khách hàng",
            "Phát triển dự án âm nhạc Hidden Music",
          ],
          en: [
            "Artist and media partner coordination",
            "Marketing and client care",
            "Hidden Music / digital music",
          ],
        },
      },
    },
  },

  milestonesHeader: {
    sectionBadge: "02 · CỘT MỐC THỰC CHIẾN // CAREER RUNWAY",
    title: {
      vi: "KINH NGHIỆM LÀM VIỆC",
      en: "WORK EXPERIENCE",
    },
    subtitle: {
      vi: "Kinh nghiệm trong bán lẻ, F&B và studio.",
      en: "Experience across retail, F&B and studio operations.",
    },
  },

  milestones: [
    {
      id: "viva-star",
      badge: "OP_01 // DISCIPLINE",
      company: "VIVA STAR COFFEE",
      role: {
        vi: "CA TRƯỞNG PHA CHẾ",
        en: "BARISTA SHIFT LEAD",
      },
      period: "05/2019 — 01/2020",
      location: {
        vi: "Đà Lạt, Lâm Đồng",
        en: "Da Lat, Lam Dong",
      },
      coreValue: {
        vi: "Phân công ca, kiểm soát chất lượng phục vụ và tuân thủ quy trình.",
        en: "Shift coordination, service quality and operational standards.",
      },
      responsibilities: {
        vi: [
          "Pha chế cà phê, trà sữa, thức ăn nhanh chính xác theo công thức chuẩn hãng.",
          "Phân công nhiệm vụ, sắp xếp lịch ca làm việc và kiểm soát chất lượng phục vụ.",
          "Rèn luyện tính kỷ luật, kiểm soát định lượng nguyên liệu và vệ sinh an toàn thực phẩm.",
        ],
        en: [
          "Crafted coffee, tea, and fast food strictly adhering to standardized brand recipes.",
          "Scheduled team shifts, assigned stations, and enforced service excellence standards.",
          "Instilled early operational rigor, inventory portion control, and food safety standards.",
        ],
      },
      specTags: ["SOP_COMPLIANCE", "SHIFT_SCHEDULING", "QUALITY_ASSURANCE"],
    },
    {
      id: "sb-studio",
      badge: "OP_02 // STUDIO & MCN",
      company: "CÔNG TY TNHH SB STUDIO",
      role: {
        vi: "QUẢN LÝ PHÒNG THU",
        en: "STUDIO & ARTIST MANAGER",
      },
      period: "03/2023 — 10/2024",
      location: {
        vi: "Đà Lạt, Lâm Đồng",
        en: "Da Lat, Lam Dong",
      },
      coreValue: {
        vi: "Quản lý doanh thu, khách hàng, lịch sản xuất và hoạt động nghệ sĩ.",
        en: "Revenue, client relationships, production scheduling and artist operations.",
      },
      responsibilities: {
        vi: [
          "Quản lý toàn diện doanh thu, dòng tiền và định hướng Marketing phát triển studio.",
          "Chăm sóc khách hàng (CSKH), thiết lập lịch trình thu âm và lịch quay hình chuyên nghiệp.",
          "Quản lý trực tiếp các nghệ sĩ thuộc công ty, kết nối và hợp tác với các đối tác MCN, đơn vị truyền thông.",
          "Định hướng chiến lược phát triển sản phẩm âm nhạc và mở rộng quan hệ đối tác.",
        ],
        en: [
          "Managed revenue streams, financial budgeting, and studio growth marketing campaigns.",
          "Maintained VIP client relationships and scheduled precision recording/filming sessions.",
          "Managed exclusive studio artists and spearheaded partnerships with MCNs and media channels.",
          "Formulated music production pipelines and expanded long-term commercial relationships.",
        ],
      },
      specTags: ["REVENUE_GROWTH", "ARTIST_MANAGEMENT", "MCN_LIAISON", "MARKETING_OPS"],
    },
    {
      id: "phui-steak",
      badge: "OP_03 // KITCHEN COMMAND",
      company: "PHỦI STEAK",
      role: {
        vi: "CA TRƯỞNG BẾP & BẾP CHÍNH",
        en: "KITCHEN LEAD & HEAD COOK",
      },
      period: "10/2024 — 06/2025",
      location: {
        vi: "Đà Lạt, Lâm Đồng",
        en: "Da Lat, Lam Dong",
      },
      coreValue: {
        vi: "Điều phối ca bếp, chuẩn bị nguyên liệu và đảm bảo chất lượng món ăn.",
        en: "Kitchen shift coordination, preparation and food quality control.",
      },
      responsibilities: {
        vi: [
          "Ca trưởng bếp (10/2024 – 02/2025): Đảm bảo số lượng món ăn trong ngày đầy đủ; Hỗ trợ các vị trí thiếu trong ngày.",
          "Bếp chính (02/2025 – 06/2025): Chuẩn bị nguyên liệu, chuyên trách kỹ thuật áp chảo Steak bò Âu cao cấp.",
          "Tự học và làm chủ thực đơn món Âu đặc trưng: steak bò, mì Ý, súp, cá hồi sốt, salad phong cách cao cấp.",
          "Kiểm soát nghiêm ngặt vệ sinh an toàn thực phẩm và điều phối phân công nhân sự ca cao điểm.",
        ],
        en: [
          "Kitchen Lead (10/2024 – 02/2025): Ensured full daily menu availability and reinforced critical station deficits.",
          "Head Cook (02/2025 – 06/2025): Prepared high-grade ingredients; specialized in European steak searing techniques.",
          "Self-learned and mastered classic European culinary lines: steak, pasta, soups, salmon, and signature salads.",
          "Maintained strict hygiene standards and orchestrated peak-hour line operations under heavy ticket volumes.",
        ],
      },
      specTags: ["HIGH_PRESSURE_OPS", "EUROPEAN_CUISINE", "PRECISION_TIMING", "ADAPTABILITY"],
    },
    {
      id: "aldo-go",
      badge: "OP_04 // RETAIL LEADERSHIP",
      company: "ALDO GO! ĐÀ LẠT",
      role: {
        vi: "QUẢN LÍ CỬA HÀNG",
        en: "STORE MANAGER",
      },
      period: "06/2025 — 07/2026",
      location: {
        vi: "Đà Lạt, Lâm Đồng",
        en: "Da Lat, Lam Dong",
      },
      coreValue: {
        vi: "Quản lý cửa hàng, nhân sự, hàng hóa, doanh số và trải nghiệm khách hàng.",
        en: "Store operations, people, inventory, sales and customer experience.",
      },
      responsibilities: {
        vi: [
          "Quản lý toàn diện hoạt động vận hành, hình ảnh và trải nghiệm khách hàng tại cửa hàng.",
          "Quản lý kho hàng: kiểm soát nhập xuất tồn, giảm thiểu thất thoát và tối ưu hóa dòng luân chuyển hàng hóa.",
          "Quản lý nhân sự: tuyển dụng, phân công ca kíp, đào tạo nghiệp vụ và duy trì năng lượng làm việc tích cực.",
          "Phát triển doanh số ngành bán lẻ (Retail) và xây dựng kế hoạch bán hàng theo mùa cao điểm.",
        ],
        en: [
          "Directed full-scope store operations, brand standards, visual merchandising, and customer service excellence.",
          "Controlled warehouse inventory logistics, minimized shrinkage, and optimized product turnover cycles.",
          "Led human resource operations: recruitment, scheduling, staff coaching, and maintaining team motivation.",
          "Drove retail sales velocity and tailored tactical promotional strategies for peak tourist seasons.",
        ],
      },
      specTags: ["RETAIL_OPERATIONS", "INVENTORY_CONTROL", "TEAM_LEADERSHIP", "SALES_VELOCITY"],
    },
  ],

  bentoHeader: {
    sectionBadge: "03 · NĂNG LỰC CỐT LÕI // CAPABILITY MATRIX",
    title: {
      vi: "NĂNG LỰC",
      en: "CAPABILITIES",
    },
    subtitle: {
      vi: "Những năng lực hỗ trợ trực tiếp cho công việc vận hành và sáng tạo.",
      en: "Capabilities supporting operations, technology and creative work.",
    },
  },

  bento: [
    {
      id: "flame-keeper",
      badge: "LEADERSHIP // 01",
      title: {
        vi: "QUẢN LÝ ĐỘI NGŨ",
        en: "TEAM LEADERSHIP",
      },
      subtitle: {
        vi: "Phân công, đào tạo và phối hợp đội ngũ trong công việc hằng ngày.",
        en: "Team coordination, training and day-to-day people management.",
      },
      description: {
        vi: "Có kinh nghiệm làm việc và điều phối nhân sự tại môi trường bán lẻ, F&B và studio.",
        en: "Experience coordinating teams across retail, F&B and studio environments.",
      },
      tags: ["TEAM_MORALE", "OBSERVATION", "CONFLICT_RESOLUTION", "EMPATHY"],
    },
    {
      id: "ai-automation",
      badge: "AI & SYSTEMS // 02",
      title: {
        vi: "AI & TỰ ĐỘNG HÓA",
        en: "AI & AUTOMATION",
      },
      subtitle: {
        vi: "Ứng dụng AI và công cụ số để đơn giản hóa quy trình.",
        en: "Using AI and digital tools to simplify operational workflows.",
      },
      description: {
        vi: "Tự nghiên cứu, xây dựng và ứng dụng các giải pháp tự động hóa bằng AI vào quản trị nội bộ: tự động sắp xếp ca kíp, đồng bộ hóa lịch trình thu âm - quay hình, cảnh báo hàng tồn kho và theo dõi chỉ số hiệu suất (KPI) giúp bộ máy vận hành luôn tinh gọn, chính xác.",
        en: "Researching, building, and deploying custom AI automation workflows for internal management: automated shift scheduling, synchronized audio/video shoot calendars, real-time inventory alerts, and KPI tracking for lean operations.",
      },
      tags: ["AI_AGENTS", "WORKFLOW_AUTOMATION", "CUSTOM_TOOLS", "DATA_PIPELINES"],
    },
    {
      id: "web-engineering",
      badge: "TECHNOLOGY // 03",
      title: {
        vi: "WEB & CÔNG NGHỆ",
        en: "WEB & DIGITAL",
      },
      subtitle: {
        vi: "Nền tảng Thiết kế Web tại FPT Polytechnic và khả năng làm việc với các công cụ số.",
        en: "Web Design foundation at FPT Polytechnic and practical digital tools.",
      },
      description: {
        vi: "Nền tảng đào tạo bài bản về Thiết kế Web tại FPT Polytechnic giúp Ngô Phúc có tư duy kiến trúc giao diện, chuẩn hóa dữ liệu số và làm việc hiệu quả với các đội ngũ kỹ thuật phần mềm. Thành thạo tin học, phân tích báo cáo và số hóa tài liệu quản trị.",
        en: "Academic grounding in Web Design from FPT Polytechnic provides deep UI/UX architectural instincts, digital data standardization, and seamless technical collaboration with engineering teams. Highly proficient in data reporting and workflow digitization.",
      },
      tags: ["UI_UX_DESIGN", "SYSTEMS_ARCHITECTURE", "DIGITAL_OFFICE", "FPT_FOUNDATION"],
    },
    {
      id: "sonic-artistry",
      badge: "CREATIVE & AUDIO // 04",
      title: {
        vi: "ÂM NHẠC & HIDDEN MUSIC",
        en: "ÂM NHẠC & HIDDEN MUSIC",
      },
      subtitle: {
        vi: "Sáng tác, sản xuất âm nhạc số thực nghiệm & Tư duy thẩm mỹ phim ảnh",
        en: "Experimental digital sound production & cinematic visual aesthetic",
      },
      description: {
        vi: "Không chỉ dừng lại ở vai trò quản lý, Ngô Phúc trực tiếp sáng tác và sản xuất các tác phẩm âm nhạc số thực nghiệm dưới dự án Hidden Music (postlain.com). Tư duy thẩm mỹ về âm thanh, hình ảnh và nhịp điệu chính là chiếc chìa khóa 'thổi hồn nghệ thuật' vào các hệ thống vận hành.",
        en: "Beyond managerial duties, directly produces experimental digital sound pieces under the Hidden Music venture (postlain.com). A refined ear for audio texture, cinematography, and rhythm breathes soulful artistry into every operational system.",
      },
      tags: ["HIDDEN_MUSIC", "AUDIO_PRODUCTION", "CINEMATOGRAPHY", "CREATIVE_DIRECTION"],
    },
  ],

  contact: {
    sectionBadge: "04 · KẾT NỐI TRỰC TIẾP // DIRECT CHANNELS",
    title: {
      vi: "LIÊN HỆ",
      en: "CONTACT",
    },
    subtitle: {
      vi: "Trao đổi về cơ hội quản lý, vận hành, studio hoặc các dự án số.",
      en: "Open to management, operations, studio and digital opportunities.",
    },
    hotline: "0938-649-420",
    email: "studionopu@gmail.com",
    location: {
      vi: "Kim Đồng, TP. Đà Lạt, Tỉnh Lâm Đồng (GMT+7)",
      en: "Kim Dong, Da Lat City, Lam Dong Province (GMT+7)",
    },
    hiddenMusicTitle: "HIDDEN MUSIC // DIGITAL SONIC ART",
    hiddenMusicDesc: {
      vi: "Khám phá không gian âm nhạc số thực nghiệm được Ngô Phúc trực tiếp phát triển và thử nghiệm.",
      en: "Explore experimental digital soundscapes independently authored by Ngô Phúc.",
    },
    hiddenMusicUrl: "https://hiddenmusic.postlain.com",
    copyHotlineSuccess: {
      vi: "Đã sao chép số Hotline: 0938-649-420",
      en: "Copied Hotline: 0938-649-420",
    },
    copyEmailSuccess: {
      vi: "Đã sao chép Email: studionopu@gmail.com",
      en: "Copied Email: studionopu@gmail.com",
    },
  },
};
