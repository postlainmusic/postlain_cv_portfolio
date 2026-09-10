/**
 * BILINGUAL CONTENT CONTRACT SCHEMA (NGÔ PHÚC - POSTLAIN)
 * Ground Truth: NGOPHUC_CV_2026.pdf
 */

export interface NavItem {
  id: string;
  label: string;
  href: string;
}

export interface TimelineMilestone {
  id: string;
  period: string;             // e.g. "06/2025 — 07/2026"
  role: string;               // e.g. "Quản lí cửa hàng"
  company: string;            // e.g. "ALDO GO! ĐL"
  location: string;           // e.g. "Đà Lạt, Lâm Đồng"
  type: 'retail' | 'culinary' | 'studio' | 'fnb';
  responsibilities: string[]; // Strict responsibilities from CV
  subRoles?: {
    period: string;
    role: string;
    details: string[];
  }[];
}

export interface SkillCategory {
  title: string;
  skills: string[];
}

export interface EducationItem {
  year: string;
  school: string;
  major: string;
  status: string;
  note?: string;
}

export interface SiteContent {
  meta: {
    documentTitle: string;
    description: string;
    localeLabel: string;
  };
  masthead: {
    brandName: string;
    brandRole: string;
    downloadCvLabel: string;
    downloadCvUrl: string;
    nav: NavItem[];
    soundToggle: {
      on: string;
      off: string;
    };
  };
  chapter00: {
    badge: string;
    name: string;
    roleTitle: string;
    personalIntro: string;
    ctaDownloadCv: string;
    downloadCvUrl: string;
    ctaContact: string;
    ctaExplore: string;
  };
  chapter01: {
    index: string;
    title: string;
    subtitle: string;
    milestones: TimelineMilestone[];
  };
  chapter02: {
    index: string;
    title: string;
    subtitle: string;
    platformName: string;
    platformUrl: string;
    platformDescription: string;
    interactionHint: string;
    listeningRoom: {
      title: string;
      trackTitle: string;
      trackMeta: string;
      audioNotice: string;
      visitPlatformBtn: string;
    };
  };
  chapter03: {
    index: string;
    title: string;
    subtitle: string;
    skillsTitle: string;
    skillCategories: SkillCategory[];
    educationTitle: string;
    education: EducationItem[];
    hobbiesTitle: string;
    hobbies: string[];
  };
  chapter04: {
    index: string;
    title: string;
    subtitle: string;
    hotlineLabel: string;
    hotlineNumber: string;
    emailLabel: string;
    emailAddress: string;
    locationLabel: string;
    locationAddress: string;
    downloadCvLabel: string;
    downloadCvUrl: string;
    copyNotice: string;
    copiedNotice: string;
    form: {
      title: string;
      namePlaceholder: string;
      emailPlaceholder: string;
      messagePlaceholder: string;
      submitBtn: string;
      submitting: string;
      successMessage: string;
      errorMessage: string;
    };
  };
  colophon: {
    statement: string;
    techStack: string;
    copyright: string;
    backToTop: string;
  };
}
