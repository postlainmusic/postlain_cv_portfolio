/**
 * POSTLAIN AUTOBIOGRAPHY DATA
 * 100% Factually Grounded in Verified Repository Records
 */

export interface CVMilestone {
  id: string;
  year: string;
  period: string;
  company: string;
  role: string;
  location: string;
  discipline: string;
  summary: { vi: string; en: string };
  responsibilities: { vi: string[]; en: string[] };
}

export interface AutobiographyData {
  identity: {
    name: string;
    brand: string;
    roleTitle: { vi: string; en: string };
    philosophy: { vi: string; en: string };
    hotline: string;
    email: string;
    location: string;
    cvPdfUrl: string;
  };
  project: {
    name: string;
    url: string;
    description: { vi: string; en: string };
  };
  narrativeCopy: {
    desert: {
      greeting: { vi: string; en: string };
      subGreeting: { vi: string; en: string };
    };
    volcano: {
      identityLead: { vi: string; en: string };
    };
    waterfall: {
      phrases: Array<{ vi: string; en: string }>;
    };
    forest: {
      intro: { vi: string; en: string };
    };
    moon: {
      resolution: { vi: string; en: string };
    };
  };
  milestones: CVMilestone[];
}

export const AUTOBIOGRAPHY_DATA: AutobiographyData = {
  identity: {
    name: 'NGÔ PHÚC',
    brand: 'POSTLAIN',
    roleTitle: {
      vi: 'OPERATIONS & STUDIO MANAGER',
      en: 'OPERATIONS & STUDIO MANAGER',
    },
    philosophy: {
      vi: 'Quản lí bằng logic. Thổi hồn bằng nghệ thuật.',
      en: 'Led by logic. Elevated by art.',
    },
    hotline: '0938-649-420',
    email: 'studionopu@gmail.com',
    location: 'Đà Lạt, Lâm Đồng (GMT+7)',
    cvPdfUrl: '/NGOPHUC_CV_2026.pdf',
  },
  project: {
    name: 'HIDDEN MUSIC',
    url: 'https://hiddenmusic.postlain.com',
    description: {
      vi: 'Tác phẩm thực nghiệm âm nhạc số và không gian phân phối do Ngô Phúc trực tiếp phát triển.',
      en: 'An interactive digital sonic artwork and release space developed by Ngô Phúc.',
    },
  },
  narrativeCopy: {
    desert: {
      greeting: {
        vi: 'Không biết không phải là khoảng trống. Đó là nơi hành trình bắt đầu.',
        en: 'Uncertainty is not an empty void. It is where everything begins.',
      },
      subGreeting: {
        vi: 'Nơi mọi thứ bắt đầu trong tĩnh lặng.',
        en: 'Where everything begins in quiet stillness.',
      },
    },
    volcano: {
      identityLead: {
        vi: 'Sức sống bùng lên từ năng lượng nguyên bản.',
        en: 'Vitality erupts from raw creative energy.',
      },
    },
    waterfall: {
      phrases: [
        {
          vi: 'DÒNG CHẢY KHÁT VỌNG',
          en: 'FLOW OF ASPIRATION',
        },
        {
          vi: 'KIÊN TRÌ TÍCH TỤ TỪNG GIỌT NHỎ',
          en: 'PERSISTENT ACCUMULATION OF EVERY DROP',
        },
        {
          vi: 'NHỊP ĐIỆU VẬN HÀNH & KỶ LUẬT',
          en: 'OPERATIONAL RHYTHM & DISCIPLINE',
        },
      ],
    },
    forest: {
      intro: {
        vi: 'Kinh nghiệm tích lũy hóa thành rừng cây cổ thụ.',
        en: 'Accumulated experience materialized as an ancient forest.',
      },
    },
    moon: {
      resolution: {
        vi: 'Bầu trời mở ra. Sẵn sàng cho những cuộc gặp gỡ và kết nối mới.',
        en: 'The sky clears. Open to new resonance and collaboration.',
      },
    },
  },
  milestones: [
    {
      id: 'viva-star',
      year: '2019',
      period: '05/2019 — 01/2020',
      company: 'VIVA STAR COFFEE',
      role: 'Ca Trưởng Pha Chế',
      location: 'Đà Lạt, Lâm Đồng',
      discipline: 'Frontline Discipline & Beverage Ops',
      summary: {
        vi: 'Pha chế cà phê, trà sữa theo quy chuẩn; điều phối ca làm việc và rèn luyện tính kỷ luật vận hành đầu đời.',
        en: 'Beverage standard craft, shift schedule coordination, and early frontline operational discipline.',
      },
      responsibilities: {
        vi: [
          'Pha chế cà phê, trà sữa, thức ăn nhanh theo đúng quy chuẩn chất lượng',
          'Sắp xếp ca làm việc và phân công nhiệm vụ cho nhân viên trong ca',
        ],
        en: [
          'Crafted coffee, tea, and quick service menu items to exact quality standards',
          'Organized shift schedules and delegated frontline operational tasks',
        ],
      },
    },
    {
      id: 'sb-studio',
      year: '2023',
      period: '03/2023 — 10/2024',
      company: 'CÔNG TY TNHH SB STUDIO',
      role: 'Quản Lý Phòng Thu',
      location: 'Đà Lạt, Lâm Đồng',
      discipline: 'Studio Management, MV Production & MCN',
      summary: {
        vi: 'Quản lý tài chính, hoạch định ngân sách; sắp xếp lịch thu âm, quay MV; quản lý nghệ sĩ độc quyền và kết nối đối tác MCN.',
        en: 'Financial planning, production scheduling for records and MVs, exclusive artist management, and MCN network partnerships.',
      },
      responsibilities: {
        vi: [
          'Quản lý tài chính & hoạch định ngân sách phòng thu',
          'Quản lý truyền thông và chăm sóc khách hàng',
          'Sắp xếp lịch thu âm, quay video clip (MV) đạt chuẩn phát hành',
          'Quản lý nghệ sĩ độc quyền của công ty, kết nối đối tác MCN và truyền thông',
        ],
        en: [
          'Managed financial accounting and studio production budgets',
          'Directed client relations, communications, and artist intake',
          'Coordinated studio recording sessions and commercial music video shoots',
          'Managed exclusive recording artists and expanded MCN network partnerships',
        ],
      },
    },
    {
      id: 'phui-steak',
      year: '2024',
      period: '10/2024 — 06/2025',
      company: 'PHỦI STEAK',
      role: 'Ca Trưởng Bếp & Bếp Chính',
      location: 'Đà Lạt, Lâm Đồng',
      discipline: 'Culinary Command & High-Volume Operations',
      summary: {
        vi: 'Chuyên trách Steak bò Âu cao cấp; quản lý nguyên vật liệu, kiểm soát an toàn thực phẩm và điều phối nhân sự trong ca cao điểm.',
        en: 'Western steakhouse culinary mastery, inventory control, food safety command, and kitchen shift leadership during peak services.',
      },
      responsibilities: {
        vi: [
          'Đảm bảo số lượng và chất lượng món ăn phục vụ trong ngày',
          'Chuyên trách kỹ thuật áp chảo Steak bò ngoại nhập, sơ chế thực phẩm Âu',
          'Làm các món Âu: steak bò, mì Ý, soup, cá hồi, salad đặc trưng',
          'Linh hoạt hỗ trợ và điều phối các vị trí khác khi thiếu hụt nhân sự trong ca làm việc',
        ],
        en: [
          'Guaranteed overall culinary output, consistency, and plate presentation',
          'Specialized in imported beef searing techniques and European culinary prep',
          'Prepared signature Western dishes: beef steaks, pasta, soups, salmon, salads',
          'Coordinated cross-station coverage and team leadership during peak rush hours',
        ],
      },
    },
    {
      id: 'aldo-go',
      year: '2025',
      period: '06/2025 — 07/2026',
      company: 'ALDO GO! ĐÀ LẠT',
      role: 'Quản Lí Cửa Hàng',
      location: 'Đà Lạt, Lâm Đồng',
      discipline: 'Retail Store Leadership, Inventory & Revenue Growth',
      summary: {
        vi: 'Quản lý toàn diện cửa hàng, kiểm soát tồn kho hàng hoá, quản lý nhân viên và trực tiếp thúc đẩy tăng trưởng doanh số bán hàng.',
        en: 'Comprehensive retail store management, inventory control, team coaching, and strategic sales revenue acceleration.',
      },
      responsibilities: {
        vi: [
          'Quản lý toàn diện vận hành cửa hàng bán lẻ',
          'Kiểm soát hàng hoá, xuất nhập tồn chính xác',
          'Quản lý, đào tạo và truyền năng lượng tích cực cho nhân viên',
          'Thúc đẩy và tăng trưởng doanh số bán hàng',
        ],
        en: [
          'Directed complete retail store daily operations and visual merchandising',
          'Controlled inventory auditing, stock rotation, and loss prevention',
          'Trained, mentored, and motivated the retail sales team',
          'Drove sales strategies to consistently meet and exceed revenue targets',
        ],
      },
    },
  ],
};
