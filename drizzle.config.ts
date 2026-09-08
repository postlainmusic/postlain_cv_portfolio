import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './src/db/schema.ts',
  out: './drizzle',
  dialect: 'sqlite', // hoặc 'postgresql' tùy driver cấu hình
  dbCredentials: {
    url: process.env.DATABASE_URL || 'file:./local.db',
  },
});
