---
name: backend-db-stack
description: >-
  Architectural patterns and strict typesafe standards for Hono API routes, Drizzle ORM schemas & queries,
  Zod input/output validation, Atlas schema migrations, and SQLGlot query handling.
---

# Backend & Database Stack Skill (Hono + Drizzle + Zod + Atlas + SQLGlot)

## 1. Hono API Routes
- Lightweight, fast, type-safe API routing.
- Integrate `@hono/zod-validator` for automatic request payload/params validation.
```typescript
import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { z } from 'zod';

const app = new Hono();

export const schema = z.object({
  title: z.string().min(1),
});

app.post('/api/items', zValidator('json', schema), async (c) => {
  const data = c.req.valid('json');
  return c.json({ success: true, data });
});
```

## 2. Drizzle ORM + Zod Schema Bridge
- Define schemas declaratively in `src/db/schema.ts`.
- Derive Zod validation schemas using `drizzle-zod`.
```typescript
import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';

export const projects = pgTable('projects', {
  id: uuid('id').defaultRandom().primaryKey(),
  title: text('title').notNull(),
  description: text('description'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const insertProjectSchema = createInsertSchema(projects);
export const selectProjectSchema = createSelectSchema(projects);
```

## 3. Atlas Declarative Migrations
- Use Atlas to compute migration diffs automatically against Drizzle schemas or PostgreSQL containers.
- Declarative DDL verification before pushing schema changes.

## 4. SQLGlot Parsing & Transpilation
- When doing multi-dialect SQL migrations or static SQL analysis, utilize SQLGlot AST parsing.
