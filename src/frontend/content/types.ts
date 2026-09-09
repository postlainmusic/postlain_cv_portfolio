/**
 * BILINGUAL CONTENT CONTRACT SCHEMA (POSTLAIN / THE OPERATING FREQUENCY)
 * Defines semantic roles and content shapes shared identically between Vietnamese & English.
 */

export interface NavItem {
  id: string;
  label: string;
  href: string;
}

export interface TimelineMilestone {
  id: string;
  period: string;       // e.g. "06/2025 — 07/2026"
  year: string;         // e.g. "2025"
  role: string;         // e.g. "Quản Lý Cửa Hàng (Store General Manager)"
  company: string;      // e.g. "ALDO Flagship (GO! Đà Lạt)"
  location: string;     // e.g. "Đà Lạt, Lâm Đồng"
  type: 'retail' | 'culinary' | 'studio' | 'fnb';
  observation: string;  // Layer A (Artistic / Human)
  responsibilities: string[]; // Layer B (Semantic / Verified Facts)
  operationalScope: string;   // Layer B Summary
}

export interface PillarItem {
  title: string;
  desc: string;
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
    monogram: string;
    city: string;
    timezone: string;
    statusBadge: string;
    nav: NavItem[];
    soundToggle: {
      on: string;
      off: string;
    };
  };
  chapter00: {
    index: string;
    thesisTop: string;
    thesisBottom: string;
    name: string;
    title: string;
    layerAObservation: string;
    recruiterSummary: string;
    statusLine: string;
    locationAnchor: string;
    ctaRecord: string;
    ctaContact: string;
    transitionText: string;
  };
  chapter01: {
    index: string;
    title: string;
    subtitle: string;
    layerAObservation: string;
    milestones: TimelineMilestone[];
    expandLogsLabel: string;
    collapseLogsLabel: string;
    transitionText: string;
  };
  chapter02: {
    index: string;
    title: string;
    subtitle: string;
    ventureName: string;
    ventureUrl: string;
    ventureDescription: string;
    layerAObservation: string;
    pillars: PillarItem[];
    listeningRoom: {
      title: string;
      status: string;
      trackTitle: string;
      trackMeta: string;
      audioNotice: string;
      visitPlatformBtn: string;
    };
    transitionText: string;
  };
  chapter03: {
    index: string;
    title: string;
    subtitle: string;
    layerAObservation: string;
    capabilitiesTitle: string;
    capabilities: PillarItem[];
    educationTitle: string;
    education: EducationItem[];
    transitionText: string;
  };
  chapter04: {
    index: string;
    title: string;
    subtitle: string;
    layerAObservation: string;
    hotlineLabel: string;
    hotlineNumber: string;
    emailLabel: string;
    emailAddress: string;
    locationLabel: string;
    locationAddress: string;
    copyNotice: string;
    copiedNotice: string;
    form: {
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
    coordinates: string;
    copyright: string;
  };
}
