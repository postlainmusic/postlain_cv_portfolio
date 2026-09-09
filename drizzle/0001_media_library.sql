CREATE TABLE IF NOT EXISTS profiles (
  id TEXT PRIMARY KEY NOT NULL,
  name TEXT NOT NULL,
  title TEXT NOT NULL,
  bio TEXT NOT NULL,
  updated_at INTEGER
);

CREATE TABLE IF NOT EXISTS projects (
  id TEXT PRIMARY KEY NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  tech_stack TEXT NOT NULL,
  url TEXT,
  github_url TEXT,
  featured INTEGER DEFAULT 0,
  created_at INTEGER
);

CREATE TABLE IF NOT EXISTS media_assets (
  id TEXT PRIMARY KEY NOT NULL,
  object_key TEXT NOT NULL UNIQUE,
  kind TEXT NOT NULL,
  mime_type TEXT NOT NULL,
  alt_vi TEXT NOT NULL,
  alt_en TEXT NOT NULL,
  caption_vi TEXT,
  caption_en TEXT,
  width INTEGER,
  height INTEGER,
  focal_x REAL DEFAULT 0.5,
  focal_y REAL DEFAULT 0.5,
  sort_order INTEGER DEFAULT 0,
  published INTEGER DEFAULT 0,
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL
);

CREATE INDEX IF NOT EXISTS media_assets_published_order_idx
  ON media_assets (published, sort_order);

CREATE INDEX IF NOT EXISTS media_assets_kind_idx
  ON media_assets (kind);
