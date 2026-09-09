import { drizzle } from 'drizzle-orm/d1';
import { and, asc, eq } from 'drizzle-orm';
import { mediaAssets } from '../db/schema';

export interface StorageEnv {
  DB?: D1Database;
  MEDIA_BUCKET?: R2Bucket;
}

export async function listPublishedMedia(env: StorageEnv, kind?: string) {
  if (!env.DB) throw new Error('D1 binding DB is not configured.');

  const db = drizzle(env.DB);
  const where = kind
    ? and(eq(mediaAssets.published, true), eq(mediaAssets.kind, kind))
    : eq(mediaAssets.published, true);

  return db
    .select()
    .from(mediaAssets)
    .where(where)
    .orderBy(asc(mediaAssets.sortOrder), asc(mediaAssets.createdAt));
}

export async function getPublishedMediaObject(env: StorageEnv, objectKey: string) {
  if (!env.DB || !env.MEDIA_BUCKET) {
    throw new Error('D1/R2 storage bindings are not configured.');
  }

  const db = drizzle(env.DB);
  const [asset] = await db
    .select()
    .from(mediaAssets)
    .where(and(eq(mediaAssets.objectKey, objectKey), eq(mediaAssets.published, true)))
    .limit(1);

  if (!asset) return null;

  const object = await env.MEDIA_BUCKET.get(objectKey);
  if (!object) return null;

  const headers = new Headers();
  object.writeHttpMetadata(headers);
  headers.set('etag', object.httpEtag);
  headers.set('cache-control', 'public, max-age=31536000, immutable');

  return { asset, response: new Response(object.body, { headers }) };
}
