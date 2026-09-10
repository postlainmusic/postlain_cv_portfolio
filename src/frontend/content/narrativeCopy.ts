export interface WorldCopy {
  id: string;
  index: string;
  name: string;
  element: string;
  kicker: string;
  title: string;
  subtitle?: string;
  statement: string;
  secondary?: string;
  prompt: string;
}

export interface NarrativeCopy {
  meta: {
    title: string;
    description: string;
  };
  brand: {
    entity: string;
    person: string;
    tagline: string;
    email: string;
  };
  navigation: {
    previous: string;
    next: string;
    switchLang: string;
    instruction: string;
  };
  worlds: {
    void: WorldCopy;
    water: WorldCopy;
    wood: WorldCopy;
    fire: WorldCopy;
    metal: WorldCopy;
    earth: WorldCopy;
  };
  materials: Array<{
    id: string;
    name: string;
    descriptor: string;
    detail: string;
  }>;
  project: {
    name: string;
    url: string;
    status: string;
    description: string;
    action: string;
  };
}

export const NARRATIVE_VI: NarrativeCopy = {
  meta: {
    title: 'POSTLAIN — Hành Trình Nghệ Thuật Đa Chiều',
    description: 'Một người đa zi năng. Không bị định nghĩa bởi thứ gì rõ ràng ngoài nghệ thuật. 6 thế giới tương tác: Hư không, Nước, Mộc, Hỏa, Kim, Đất.',
  },
  brand: {
    entity: 'POSTLAIN',
    person: 'NGÔ PHÚC',
    tagline: 'Không bị định nghĩa bởi thứ gì ngoài nghệ thuật.',
    email: 'hello@postlain.com',
  },
  navigation: {
    previous: 'Thế giới trước',
    next: 'Tiếp tục hành trình',
    switchLang: 'EN',
    instruction: 'Lướt chuột, vuốt chạm hoặc dùng phím ↑ ↓ để chuyển thế giới',
  },
  worlds: {
    void: {
      id: 'void',
      index: '00',
      name: 'Khoảng Không',
      element: 'VOID',
      kicker: '00 / KHỞI NGUYÊN',
      title: 'POSTLAIN',
      statement: 'Một hành trình của những điều nhỏ bé dần tụ hội.',
      secondary: 'Không biết không phải là khoảng trống. Nó là nơi mọi thứ bắt đầu.',
      prompt: 'Di chuyển con trỏ hoặc chạm để làm xao động hư không.',
    },
    water: {
      id: 'water',
      index: '01',
      name: 'Nước',
      element: 'WATER',
      kicker: '01 / DÒNG CHẢY',
      title: 'DÒNG CHẢY',
      subtitle: '2019 — 2020 · Những thứ bắt đầu tụ lại',
      statement: 'Từ những ca làm việc đầu tiên tại Viva Star Coffee — sự kiên nhẫn, kỷ luật và nhịp điệu vận hành dần hình thành trước khi chạm tới âm thanh.',
      secondary: 'Mỗi nơi đi qua để lại một chút. Những điều rời rạc bắt đầu tìm thấy nhau.',
      prompt: 'Chạm hoặc kéo để tạo sóng gợn trên mặt nước khoáng chất.',
    },
    wood: {
      id: 'wood',
      index: '02',
      name: 'Mộc',
      element: 'WOOD',
      kicker: '02 / BÉN RỄ',
      title: 'BÉN RỄ',
      subtitle: 'Sự tích lũy hữu cơ',
      statement: 'Từ những gì đã trải qua, một cách nhìn dần bén rễ. Tri thức không đến từ sự vội vã mà tích lũy như mạng lưới kết nối sâu thẳm.',
      secondary: 'Mỗi va chạm tạo nên nhánh cấu trúc mới, đan xen thành trường ý niệm.',
      prompt: 'Chạm và di chuyển để nuôi dưỡng các nhánh cấu trúc.',
    },
    fire: {
      id: 'fire',
      index: '03',
      name: 'Hỏa',
      element: 'FIRE',
      kicker: '03 / NĂNG LƯỢNG',
      title: 'ẨN NHẠC',
      subtitle: 'Dự án thực nghiệm âm thanh số',
      statement: 'Có những thứ không thể học nếu chưa từng đứng giữa sức nóng của nó. Hidden Music là không gian nơi âm thanh, mã nguồn và cảm xúc hội tụ.',
      secondary: 'Một tác phẩm trực tiếp đang trong quá trình thai nghén thực nghiệm.',
      prompt: 'Tương tác với dải sóng hài để khám phá tác phẩm.',
    },
    metal: {
      id: 'metal',
      index: '04',
      name: 'Kim',
      element: 'METAL',
      kicker: '04 / KẾT TINH',
      title: 'KẾT TINH',
      subtitle: '7 Chất liệu nghệ thuật',
      statement: 'Sau những gì đã trải qua, các chất liệu tìm thấy trật tự của mình. Không phải danh sách kỹ năng sáo rỗng, mà là các chất liệu kiến tạo.',
      secondary: 'Chạm vào từng khối tinh thể để kích hoạt cấu trúc tương tác.',
      prompt: 'Chạm để sắp đặt các khối tinh thể chất liệu.',
    },
    earth: {
      id: 'earth',
      index: '05',
      name: 'Đất',
      element: 'EARTH',
      kicker: '05 / LẮNG ĐỌNG',
      title: 'LẮNG ĐỌNG',
      subtitle: 'Con người & Bản nguyên',
      statement: 'Cuối cùng, mọi thứ trở về với một con người. Không bị ràng buộc bởi danh xưng nào ngoài việc liên tục sáng tạo.',
      secondary: 'Nếu chúng ta cùng một tần số tư duy, hãy kết nối.',
      prompt: 'Hành trình khép lại. Sẵn sàng cho những kết nối mới.',
    },
  },
  materials: [
    { id: 'code', name: 'CODE', descriptor: 'Thuật toán & Chân lý', detail: 'Hệ thống logic, cấu trúc dữ liệu và khả năng tối ưu hóa thực thi.' },
    { id: 'sound', name: 'SOUND', descriptor: 'Tần số & Nhịp điệu', detail: 'Không gian âm học, thiết kế âm thanh và năng lượng sóng âm.' },
    { id: 'image', name: 'IMAGE', descriptor: 'Thị giác & Bố cục', detail: 'Tương phản, ánh sáng, góc nhìn điện ảnh và thẩm mỹ tối giản.' },
    { id: 'type', name: 'TYPE', descriptor: 'Ngữ nghĩa & Chuyển động', detail: 'Nghệ thuật sắp đặt chữ, tỷ lệ nhịp điệu và khả năng biểu đạt.' },
    { id: 'system', name: 'SYSTEM', descriptor: 'Kiến trúc & Quy luật', detail: 'Hệ sinh thái phân tán, tính nhất quán và khả năng mở rộng.' },
    { id: 'space', name: 'SPACE', descriptor: 'Chiều sâu & Khoảng trống', detail: 'Không gian 3D, sự căng thẳng của khoảng trắng và trọng lực thị giác.' },
    { id: 'motion', name: 'MOTION', descriptor: 'Động lực học & Quán tính', detail: 'Vật lý chuyển động, ma sát, độ trễ và cảm giác xúc giác hữu cơ.' },
  ],
  project: {
    name: 'Hidden Music',
    url: 'https://hiddenmusic.postlain.com',
    status: 'Đang phát triển thực nghiệm (Active Research)',
    description: 'Tác phẩm tương tác âm thanh số kết nối không gian hình học và sóng tần số thực nghiệm.',
    action: 'Mở Không Gian Hidden Music',
  },
};

export const NARRATIVE_EN: NarrativeCopy = {
  meta: {
    title: 'POSTLAIN — Multidisciplinary Interactive Art Journey',
    description: 'A multidisciplinary person defined by nothing other than art. Six interactive worlds: Void, Water, Wood, Fire, Metal, Earth.',
  },
  brand: {
    entity: 'POSTLAIN',
    person: 'NGÔ PHÚC',
    tagline: 'Defined by nothing except art.',
    email: 'hello@postlain.com',
  },
  navigation: {
    previous: 'Previous World',
    next: 'Continue Journey',
    switchLang: 'VI',
    instruction: 'Scroll wheel, swipe or use ↑ ↓ keys to navigate worlds',
  },
  worlds: {
    void: {
      id: 'void',
      index: '00',
      name: 'The Void',
      element: 'VOID',
      kicker: '00 / ORIGIN',
      title: 'POSTLAIN',
      statement: 'A journey where small pieces slowly find each other.',
      secondary: 'Not knowing is not an emptiness. It is where everything begins.',
      prompt: 'Move pointer or touch to disturb the empty field.',
    },
    water: {
      id: 'water',
      index: '01',
      name: 'Water',
      element: 'WATER',
      kicker: '01 / FLOW',
      title: 'FLOW',
      subtitle: '2019 — 2020 · Things begin to gather',
      statement: 'From early frontline shifts at Viva Star Coffee — patience, discipline and operational flow took shape before meeting sound.',
      secondary: 'Every place leaves something behind. Disparate pieces begin to find each other.',
      prompt: 'Touch or drag to propagate ripples across the dark mineral surface.',
    },
    wood: {
      id: 'wood',
      index: '02',
      name: 'Wood',
      element: 'WOOD',
      kicker: '02 / ROOTS',
      title: 'ROOTS',
      subtitle: 'Organic Accumulation',
      statement: 'From what was lived through, a way of seeing slowly takes root. Knowledge does not rush; it expands like a deep structural network.',
      secondary: 'Each interaction branches a new structural line into the conceptual field.',
      prompt: 'Touch and move to nurture the generative branching network.',
    },
    fire: {
      id: 'fire',
      index: '03',
      name: 'Fire',
      element: 'FIRE',
      kicker: '03 / ENERGY',
      title: 'HIDDEN MUSIC',
      subtitle: 'Interactive Sonic Research Project',
      statement: 'Some things cannot be understood without standing inside their heat. Hidden Music is where sound, code, and raw emotion intersect.',
      secondary: 'A live, experimental artwork currently in active development.',
      prompt: 'Interact with the harmonic wave field to explore the piece.',
    },
    metal: {
      id: 'metal',
      index: '04',
      name: 'Metal',
      element: 'METAL',
      kicker: '04 / CRYSTALLIZE',
      title: 'CRYSTALLIZE',
      subtitle: 'Seven Materials of Art',
      statement: 'After everything lived through, materials find their order. Not a generic list of skills, but the structural mediums of creation.',
      secondary: 'Touch each crystalline node to activate its magnetic composition.',
      prompt: 'Touch to compose and align the material nodes.',
    },
    earth: {
      id: 'earth',
      index: '05',
      name: 'Earth',
      element: 'EARTH',
      kicker: '05 / SETTLE',
      title: 'SETTLE',
      subtitle: 'The Human Ground',
      statement: 'In the end, everything returns to a person. Undefined by any single label, except the continuous act of creation.',
      secondary: 'If we share the same frequency, let us talk.',
      prompt: 'The journey settles. Open to resonant conversations.',
    },
  },
  materials: [
    { id: 'code', name: 'CODE', descriptor: 'Algorithms & Truth', detail: 'Logical architectures, data structures, and deterministic performance.' },
    { id: 'sound', name: 'SOUND', descriptor: 'Frequency & Rhythm', detail: 'Acoustic spatialization, sound design, and harmonic energy.' },
    { id: 'image', name: 'IMAGE', descriptor: 'Visuals & Composition', detail: 'Cinematic contrast, illumination, and minimalist editorial geometry.' },
    { id: 'type', name: 'TYPE', descriptor: 'Semantics & Kinetic Form', detail: 'Typographic hierarchy, rhythmic pacing, and expressive motion.' },
    { id: 'system', name: 'SYSTEM', descriptor: 'Architecture & Laws', detail: 'Distributed systems, consistency, and modular scalability.' },
    { id: 'space', name: 'SPACE', descriptor: 'Depth & Negative Tension', detail: '3D coordinates, spatial depth, and intentional breathing room.' },
    { id: 'motion', name: 'MOTION', descriptor: 'Dynamics & Inertia', detail: 'Physical motion curves, friction, spring dynamics, and tactile response.' },
  ],
  project: {
    name: 'Hidden Music',
    url: 'https://hiddenmusic.postlain.com',
    status: 'In Active Experimental Development',
    description: 'An interactive digital artwork connecting geometric spaces with harmonic audio frequencies.',
    action: 'Enter Hidden Music Space',
  },
};

export function getNarrativeCopy(locale: 'vi' | 'en'): NarrativeCopy {
  return locale === 'vi' ? NARRATIVE_VI : NARRATIVE_EN;
}
