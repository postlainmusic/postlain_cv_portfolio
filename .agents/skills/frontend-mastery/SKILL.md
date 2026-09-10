---
name: frontend-mastery
description: "Comprehensive modern frontend engineering skill covering React 19, Next.js, Astro Islands, Core Web Vitals (INP, LCP, CLS), Modern CSS (Container queries, subgrid, OKLCH), State synchronization, Web Workers, and WCAG 2.2 accessibility standards."
---

# Frontend Mastery & Modern Architecture Skill

This skill governs the architecture, implementation, and optimization of enterprise-grade, high-performance modern web applications.

---

## 1. Modern Rendering Paradigms

| Pattern | Best Used For | Key Mechanism |
| :--- | :--- | :--- |
| **Astro Islands** | Content/Showcase sites | 0-KB JavaScript by default. Hydrate isolated islands only when needed (`client:visible`, `client:idle`). |
| **React 19 Server Components (RSC)** | Data-heavy dashboards & apps | Zero bundle size for backend fetchers. Seamless streaming with `<Suspense>`. |
| **Client Islands / Sub-trees** | Interactive widgets & canvas | Isolated client boundaries using Zustand stores to prevent full-page re-renders. |

---

## 2. Core Web Vitals & Real-Time Performance Discipline

### 2.1. INP (Interaction to Next Paint < 200ms)
- Break long tasks (> 50ms) using `scheduler.yield()` or `setTimeout(..., 0)`.
- Offload expensive parsing / heavy computation to dedicated **Web Workers**.

```typescript
// Breaking up long computation tasks to preserve 60 FPS INP
export async function processDataChunked<T>(
  items: T[],
  processItem: (item: T) => void,
  chunkSize = 100
) {
  for (let i = 0; i < items.length; i += chunkSize) {
    const chunk = items.slice(i, i + chunkSize);
    for (const item of chunk) {
      processItem(item);
    }
    
    // Yield execution back to the browser event loop
    if (typeof (window as any).scheduler !== 'undefined') {
      await (window as any).scheduler.yield();
    } else {
      await new Promise((resolve) => setTimeout(resolve, 0));
    }
  }
}
```

### 2.2. LCP (Largest Contentful Paint < 2.5s)
- Always preload the hero image or primary display font in `<head>`:
  `<link rel="preload" as="image" href="/hero.webp" fetchpriority="high" />`
- Avoid render-blocking third-party scripts. Inline critical CSS tokens.

### 2.3. CLS (Cumulative Layout Shift < 0.1)
- Explicit `aspect-ratio` on all images, video frames, and WebGL canvases.
- Fallback font override metrics with `size-adjust`, `ascent-override`, and `descent-override` to avoid text re-flow when custom web fonts finish loading.

---

## 3. Advanced Modern CSS & Token Architecture

### 3.1. Container Queries (`@container`)
Component-driven responsiveness independent of global viewport:

```css
.card-container {
  container-type: inline-size;
  container-name: card;
}

@container card (min-width: 480px) {
  .card-inner {
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 1.5rem;
  }
}
```

### 3.2. Subgrid for Aligned Micro-Layouts
Align nested child items across separate cards within a master CSS Grid:

```css
.grid-parent {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-template-rows: auto auto 1fr auto;
}

.card-item {
  display: grid;
  grid-row: span 4;
  grid-template-rows: subgrid;
}
```

### 3.3. OKLCH Perceptual Color Palette
Use uniform lightness and chroma to avoid muddy dark-mode shifts:

```css
:root {
  --color-primary: oklch(0.65 0.24 260);
  --color-surface: oklch(0.18 0.02 260);
  --color-text: oklch(0.96 0.01 260);
}
```

---

## 4. State Synchronization & Architecture (Zustand + TanStack)

- **Atomic Selectors:** Always use fine-grained selectors (`useStore(state => state.activeItem)`) to avoid re-rendering entire component trees.
- **Transient State vs Global State:**
  - High-frequency mutations (mouse pointer, audio frequency, scroll delta) -> Store in `useRef` or canvas uniforms.
  - Business / UI State (active filter, modal, audio mute) -> Store in Zustand.

```typescript
import { create } from 'zustand';

interface AppState {
  isMuted: boolean;
  activeFilter: string;
  setMuted: (muted: boolean) => void;
  setActiveFilter: (filter: string) => void;
}

export const useAppStore = create<AppState>((set) => ({
  isMuted: false,
  activeFilter: 'all',
  setMuted: (isMuted) => set({ isMuted }),
  setActiveFilter: (activeFilter) => set({ activeFilter })
}));
```

---

## 5. Accessibility (WCAG 2.2 AA Standards)

1. **Focus Rings & Trapping:** Ensure modal dialogs trap keyboard `Tab` cycle and restore focus to the trigger on close.
2. **Reduced Motion:** Always respect OS-level motion preferences:
```css
@media (prefers-reduced-motion: reduce) {
  *, ::before, ::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```
3. **Screen Reader Ergonomics:** Include hidden ARIA live regions (`aria-live="polite"`) for asynchronous status changes.
