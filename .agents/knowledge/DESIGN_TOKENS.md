# DESIGN TOKENS & SYSTEM SCHEMA (Layer 3 Memory)

> **Visual Grammar Purpose:** Concrete, machine-readable design token schema ready for injection into `tailwind.config.js` and component styles during Phase 3.

---

## 1. Complete Design Tokens Object

```typescript
export const DESIGN_TOKENS = {
  colors: {
    bg: {
      base: '#0b0d12',        // Deep Obsidian Charcoal
      surface: '#121620',     // Studio Slate Card Background
      elevated: '#1a202c',    // Elevated Input & Hover Background
      overlay: 'rgba(11, 13, 18, 0.88)', // Masthead & Modal Backdrop
    },
    text: {
      hero: '#f8fafc',        // Pure Stark Ivory Title
      body: '#cbd5e1',        // Slate High-Contrast Body
      muted: '#64748b',       // Tabular Numbers & Metadata
      accent: '#e2b714',      // Warm Amber Accent
      accentCyan: '#38bdf8',  // Sky Cyan Discrete Tag
    },
    border: {
      subtle: '#1e293b',      // 1px Structural Divider
      active: '#334155',      // Hovered Card Border
      accent: '#e2b714',      // Focused Input / Active State
    },
    accent: {
      amber: '#e2b714',
      amberMuted: 'rgba(226, 183, 20, 0.12)',
      cyan: '#38bdf8',
      cyanMuted: 'rgba(56, 189, 248, 0.12)',
    },
  },
  typography: {
    fontFamilies: {
      display: ['Montserrat', '-apple-system', 'sans-serif'],
      heading: ['"Plus Jakarta Sans"', '-apple-system', 'sans-serif'],
      body: ['"Plus Jakarta Sans"', '-apple-system', 'sans-serif'],
      mono: ['"Space Grotesk"', 'monospace'],
      serif: ['"Cormorant Garamond"', 'serif'],
    },
    fontSize: {
      displayHero: 'clamp(2.75rem, 7vw, 6.0rem)',
      headingSection: 'clamp(1.875rem, 4.5vw, 3.5rem)',
      headingChapter: 'clamp(1.25rem, 2.5vw, 2.0rem)',
      headingSub: 'clamp(1.0625rem, 1.75vw, 1.375rem)',
      bodyLead: 'clamp(1.0625rem, 1.25vw, 1.25rem)',
      bodyStandard: '0.9375rem', // 15px
      metaTabular: '0.75rem',     // 12px
      caption: '0.6875rem',       // 11px
    },
    lineHeight: {
      tight: '0.95',
      heading: '1.10',
      body: '1.65',
      meta: '1.40',
    },
    letterSpacing: {
      tighter: '-0.035em',
      tight: '-0.02em',
      normal: '0',
      wide: '+0.06em',
      wider: '+0.10em',
    },
  },
  spacing: {
    sectionGap: 'clamp(4.5rem, 9vh, 8.5rem)',
    cardPadding: 'clamp(1.25rem, 2.5vw, 2.5rem)',
    containerMax: '1280px',
  },
  radii: {
    none: '0px',
    sm: '4px',
    md: '8px',
    lg: '12px',
  },
  motion: {
    tactile: '180ms cubic-bezier(0.16, 1, 0.3, 1)',
    reveal: '450ms cubic-bezier(0.16, 1, 0.3, 1)',
    drawer: '350ms cubic-bezier(0.25, 1, 0.5, 1)',
  },
} as const;
```
