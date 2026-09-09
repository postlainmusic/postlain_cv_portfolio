import { sqliteTable, text, integer, real } from 'drizzle-orm/sqlite-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';

export const profiles = sqliteTable('profiles', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  title: text('title').notNull(),
  bio: text('bio').notNull(),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
});

export const projects = sqliteTable('projects', {
  id: text('id').primaryKey(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  techStack: text('tech_stack').notNull(),
  url: text('url'),
  githubUrl: text('github_url'),
  featured: integer('featured', { mode: 'boolean' }).default(false),
  createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
});

export const mediaAssets = sqliteTable('media_assets', {
  id: text('id').primaryKey(),
  objectKey: text('object_key').notNull().unique(),
  kind: text('kind').notNull(),
  mimeType: text('mime_type').notNull(),
  altVi: text('alt_vi').notNull(),
  altEn: text('alt_en').notNull(),
  captionVi: text('caption_vi'),
  captionEn: text('caption_en'),
  width: integer('width'),
  height: integer('height'),
  focalX: real('focal_x').default(0.5),
  focalY: real('focal_y').default(0.5),
  sortOrder: integer('sort_order').default(0),
  published: integer('published', { mode: 'boolean' }).default(false),
  createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()).notNull(),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).$defaultFn(() => new Date()).notNull(),
});

export const insertProfileSchema = createInsertSchema(profiles);
export const selectProfileSchema = createSelectSchema(profiles);
export const insertProjectSchema = createInsertSchema(projects);
export const selectProjectSchema = createSelectSchema(projects);
export const insertMediaAssetSchema = createInsertSchema(mediaAssets);
export const selectMediaAssetSchema = createSelectSchema(mediaAssets);
