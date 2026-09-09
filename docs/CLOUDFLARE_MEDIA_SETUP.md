# POSTLAIN Media Storage / Bộ nhớ media

## Purpose / Mục đích

R2 stores the actual image/video objects. D1 stores searchable metadata, bilingual copy, ordering, publication state, and focal points.

R2 lưu file ảnh/video. D1 lưu metadata, nội dung song ngữ, thứ tự hiển thị, trạng thái publish và focal point.

## Resource names / Tên resource

- R2 bucket: `postlain-media`
- D1 database: `postlain-db`
- Worker bindings: `MEDIA_BUCKET`, `DB`

## Data model / Mô hình dữ liệu

`media_assets` intentionally keeps Vietnamese and English fields together:

- `alt_vi`, `alt_en`
- `caption_vi`, `caption_en`
- `kind`, `mime_type`
- `width`, `height`
- `focal_x`, `focal_y`
- `sort_order`, `published`

This lets the visual layer stay language-aware without duplicating the actual media object.

## Cloudflare setup / Thiết lập Cloudflare

1. Create the R2 bucket:

```bash
npx wrangler r2 bucket create postlain-media
```

2. Create the D1 database:

```bash
npx wrangler d1 create postlain-db
```

3. Copy the returned D1 `database_id` into `wrangler.worker.toml` using the binding template in `wrangler.storage.example.toml`.

4. Apply the migration to the remote database:

```bash
npx wrangler d1 migrations apply postlain-db --remote --config wrangler.worker.toml
```

5. Deploy the API Worker:

```bash
npm run worker:deploy
```

Cloudflare bindings provide the Worker with direct access to D1 and R2 without exposing storage API keys in application code.

## Upload policy / Chính sách upload

The repository currently prepares the storage and read layer only. Do not expose an unauthenticated upload endpoint. The future admin uploader should authenticate first, then write the object to R2 and its metadata row to D1.

## UI integration / Tích hợp UI

The existing frontend already has separate Vietnamese and English content contracts. Media metadata follows the same pattern, so a future media component can select `alt_vi/caption_vi` or `alt_en/caption_en` from the active locale while both locales reference the same R2 object.
