---
name: frontend-ui-stack
description: >-
  Rules, best practices, and integration patterns for the frontend stack: React/Next.js,
  Tailwind CSS with tailwind-merge (twMerge + clsx), Zustand state management, and Storybook components.
---

# Frontend Stack Skill (Tailwind + Zustand + Storybook)

## 1. Tailwind & Tailwind Merge (`cn` utility)
Always construct class merging with `clsx` and `tailwind-merge`:
```typescript
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```
- Never concatenate classes with basic string interpolation if dynamic overrides are possible.
- Adhere to design tokens in `tailwind.config.ts`.

## 2. Zustand State Management
- Create modular stores with typed actions.
- Avoid stuffing huge monolithic state into one store.
- Use immutable state updaters.
```typescript
import { create } from 'zustand';

interface PortfolioState {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const usePortfolioStore = create<PortfolioState>((set) => ({
  activeTab: 'overview',
  setActiveTab: (tab) => set({ activeTab: tab }),
}));
```

## 3. Storybook Component-Driven Development
- Isolate component UI states (Default, Hover, Loading, Disabled, Dark/Light variants).
- Use `Meta<typeof Component>` and `StoryObj<typeof Component>`.
- Keep stories co-located with components (`Component.stories.tsx`).
