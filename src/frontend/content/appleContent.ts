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
      vi: "Đam mê nghệ thuật và công nghệ, đặc biệt yêu thích việc quản lí và sắp xếp các quy trình một cách logic và tự động hoá.",
      en: "Passionate about art and technology, specializing in architecting operations with rigorous logic and automated workflows.",
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
      vi: "Quản lí bằng logic. Thổi hồn bằng nghệ thuật.",
      en: "Led by logic. Elevated by art.",
    },
    lead: {
      vi: "Vận hành xuất sắc không bắt nguồn từ những bảng tính khô khan, mà là nghệ thuật đồng điệu hóa con người, công nghệ và nhịp đập sáng tạo.",
      en: "Operational excellence is not born from cold spreadsheets alone, but from orchestrating people, technology, and creative rhythm into unison.",
    },
    body: {
      vi: "Hành trình thực chiến kết hợp nền tảng Quan hệ công chúng (ĐH Văn Lang) và Tư duy thiết kế Web (Cao đẳng FPT) tạo nên một năng lực quản trị lưỡng cực hiếm có: kiểm soát kỷ luật quy trình bằng số liệu và tự động hóa AI, đồng thời giữ lửa nhiệt huyết và truyền cảm hứng nghệ thuật cho toàn bộ đội ngũ nhân sự.",
      en: "Bridging Public Relations (Van Lang University) with Web Design Systems (FPT Polytechnic) yields a rare dual-engine operational capability: executing rigorous process discipline via metrics and AI automation, while maintaining cultural resonance, team morale, and creative elevation.",
    },
    dualEngine: {
      left: {
        title: {
          vi: "BÁN CẦU VẬN HÀNH & AI",
          en: "OPERATIONAL & AI ENGINE",
        },
        desc: {
          vi: "Chuẩn hóa quy trình, tối ưu hóa kho vận chuỗi bán lẻ, quản trị doanh thu phòng thu và xây dựng phần mềm quản lý nhân sự bằng AI.",
          en: "Process standardization, retail supply-chain control, studio revenue management, and developing internal AI human capital workflows.",
        },
        points: {
          vi: [
            "Quản trị doanh thu & dòng tiền thực chiến",
            "Thiết lập SOP và phân ca làm việc tối ưu",
            "Tự động hóa tác vụ lặp bằng giải pháp AI",
          ],
          en: [
            "Real-world revenue & cash-flow governance",
            "Standard Operating Procedures & shift scheduling",
            "Automating repetitive workflows with AI tools",
          ],
        },
      },
      right: {
        title: {
          vi: "BÁN CẦU NGHỆ THUẬT & TRUYỀN THÔNG",
          en: "CREATIVE & PR ENGINE",
        },
        desc: {
          vi: "Quản lý nghệ sĩ độc quyền, điều phối sản xuất thu âm/ghi hình, đối tác MCN truyền thông và sáng tạo âm nhạc số thực nghiệm.",
          en: "Artist management, session production scheduling, MCN media partnerships, and experimental digital sound production.",
        },
        points: {
          vi: [
            "Cầu nối đàm phán giữa nghệ sĩ và đối tác MCN",
            "Định hướng Marketing và trải nghiệm khách hàng",
            "Nghiên cứu âm thanh số thực nghiệm (Hidden Music)",
          ],
          en: [
            "Strategic liaison between artists & MCN media",
            "Marketing trajectory & high-touch client care",
            "Sonic art & digital sound research (Hidden Music)",
          ],
        },
      },
    },
  },

  milestonesHeader: {
    sectionBadge: "02 · CỘT MỐC THỰC CHIẾN // CAREER RUNWAY",
    title: {
      vi: "HÀNH TRÌNH RÈN GIŨA",
      en: "PROVEN MILESTONES",
    },
    subtitle: {
      vi: "4 môi trường áp lực cao định hình bản lĩnh quản trị toàn diện",
      en: "4 high-intensity arenas shaping multidisciplinary operational command",
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
        vi: "Kỷ luật quy trình vận hành đầu đời & Quản lý nhịp độ ca kíp.",
        en: "Foundational operational discipline & shift cadence management.",
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
        vi: "Quản trị doanh thu, định hướng Marketing & Điều phối hệ sinh thái nghệ sĩ - MCN.",
        en: "Revenue governance, marketing strategy & artist-MCN ecosystem orchestration.",
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
        vi: "Kiểm soát áp lực nhiệt độ cao, tính chính xác từng giây và kỹ năng tự học vượt bậc.",
        en: "High-temperature pressure mastery, split-second timing & rapid autodidactic skill acquisition.",
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
        vi: "Quản trị chuỗi bán lẻ hiện đại, kiểm soát kho vận và tối ưu hóa hiệu suất nhân sự.",
        en: "Modern retail chain governance, inventory supply management & human capital optimization.",
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
      vi: "VŨ KHÍ NĂNG LỰC",
      en: "CORE CAPABILITIES",
    },
    subtitle: {
      vi: "4 trụ cột vững chắc kết nối công nghệ AI và nghệ thuật vận hành",
      en: "4 foundational pillars bridging AI technology with high-touch operational art",
    },
  },

  bento: [
    {
      id: "flame-keeper",
      badge: "LEADERSHIP // 01",
      title: {
        vi: "QUẢN TRỊ & GIỮ LỬA NHÂN SỰ",
        en: "TEAM LEADERSHIP & FLAME KEEPER",
      },
      subtitle: {
        vi: "Khả năng quan sát, điều phối và duy trì năng lượng cho toàn thể đội ngũ",
        en: "Observational acuity, seamless dispatch & sustaining team morale",
      },
      description: {
        vi: "Thấu hiểu tâm lý nhân sự qua từng môi trường thực tế (quầy pha chế, phòng thu âm nhạc, bếp nóng áp lực cao, cửa hàng bán lẻ). Khả năng điều phối hài hòa và luôn là ngọn lửa gắn kết, giữ vững nhiệt huyết làm việc cho toàn đội ngũ ngay cả trong những giai đoạn áp lực cao điểm.",
        en: "Deep psychological understanding across frontline environments (barista bars, music studios, high-heat kitchens, and retail floors). Skilled at conflict mediation and acting as the cultural anchor that keeps team energy high under peak stress.",
      },
      tags: ["TEAM_MORALE", "OBSERVATION", "CONFLICT_RESOLUTION", "EMPATHY"],
    },
    {
      id: "ai-automation",
      badge: "AI & SYSTEMS // 02",
      title: {
        vi: "TỰ ĐỘNG HÓA & PHẦN MỀM AI",
        en: "AI WORKFLOWS & SOFTWARE AUTOMATION",
      },
      subtitle: {
        vi: "Phát triển phần mềm quản lý nhân sự & triển khai tự động hóa quy trình",
        en: "Developing internal HR software & deploying automated operational workflows",
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
        vi: "NỀN TẢNG CÔNG NGHỆ & WEB",
        en: "WEB DESIGN & DIGITAL SYSTEMS",
      },
      subtitle: {
        vi: "Chuyên ngành Thiết kế WEB (Cao đẳng FPT) & Tin học văn phòng nâng cao",
        en: "FPT Web Design foundation & advanced digital management systems",
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
        vi: "SONIC ARTISTRY & HIDDEN MUSIC",
        en: "SONIC ARTISTRY & HIDDEN MUSIC",
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
      vi: "SẴN SÀNG ĐỒNG HÀNH",
      en: "DIRECT ENGAGEMENT",
    },
    subtitle: {
      vi: "Mở rộng cơ hội hợp tác điều hành, quản trị studio và cố vấn tự động hóa",
      en: "Open for operational leadership, studio management, and AI workflow consulting",
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
