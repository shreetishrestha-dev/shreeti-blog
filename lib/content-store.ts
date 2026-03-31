import fs from "node:fs";
import path from "node:path";

import Database from "better-sqlite3";

import { siteConfig } from "@/content/site-content";
import { getPoemEntries } from "@/lib/entry-sources";
import { getMediumArticles } from "@/lib/medium";
import type { CreativeEntry, EntryCategory } from "@/lib/types";

type EntryRow = {
  slug: string;
  title: string;
  excerpt: string;
  content_json: string;
  category: EntryCategory;
  tags_json: string;
  published_at: string;
  source_label: string;
  source_url: string | null;
  cover_image: string | null;
  featured: number;
  origin: string;
};

const dbDirectory = path.join(process.cwd(), "content");
const dbPath = path.join(dbDirectory, "creative-content.sqlite");

let database: Database.Database | null = null;
let mediumSyncPromise: Promise<void> | null = null;
let contentStoreInitPromise: Promise<void> | null = null;

function getDatabase() {
  if (database) return database;

  fs.mkdirSync(dbDirectory, { recursive: true });
  database = new Database(dbPath);
  database.pragma("journal_mode = WAL");
  database.exec(`
    CREATE TABLE IF NOT EXISTS entries (
      slug TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      excerpt TEXT NOT NULL,
      content_json TEXT NOT NULL,
      category TEXT NOT NULL,
      tags_json TEXT NOT NULL,
      published_at TEXT NOT NULL,
      source_label TEXT NOT NULL,
      source_url TEXT,
      cover_image TEXT,
      featured INTEGER NOT NULL DEFAULT 0,
      origin TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS content_meta (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL
    );
  `);

  return database;
}

function mapRowToEntry(row: EntryRow): CreativeEntry {
  return {
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt,
    content: JSON.parse(row.content_json) as string[],
    category: row.category,
    tags: JSON.parse(row.tags_json) as string[],
    publishedAt: row.published_at,
    sourceLabel: row.source_label,
    sourceUrl: row.source_url ?? undefined,
    coverImage: row.cover_image ?? undefined,
    featured: Boolean(row.featured),
  };
}

function setMeta(key: string, value: string) {
  const db = getDatabase();
  db.prepare(
    `
      INSERT INTO content_meta (key, value)
      VALUES (?, ?)
      ON CONFLICT(key) DO UPDATE SET value = excluded.value
    `,
  ).run(key, value);
}

function getMeta(key: string) {
  const db = getDatabase();
  const row = db.prepare("SELECT value FROM content_meta WHERE key = ?").get(key) as
    | { value: string }
    | undefined;
  return row?.value;
}

function replaceEntries(entries: CreativeEntry[], origin: string) {
  const db = getDatabase();
  const deleteStatement = db.prepare("DELETE FROM entries WHERE origin = ?");
  const insertStatement = db.prepare(`
    INSERT INTO entries (
      slug,
      title,
      excerpt,
      content_json,
      category,
      tags_json,
      published_at,
      source_label,
      source_url,
      cover_image,
      featured,
      origin
    ) VALUES (
      @slug,
      @title,
      @excerpt,
      @content_json,
      @category,
      @tags_json,
      @published_at,
      @source_label,
      @source_url,
      @cover_image,
      @featured,
      @origin
    )
    ON CONFLICT(slug) DO UPDATE SET
      title = excluded.title,
      excerpt = excluded.excerpt,
      content_json = excluded.content_json,
      category = excluded.category,
      tags_json = excluded.tags_json,
      published_at = excluded.published_at,
      source_label = excluded.source_label,
      source_url = excluded.source_url,
      cover_image = excluded.cover_image,
      featured = excluded.featured,
      origin = excluded.origin
  `);

  const transaction = db.transaction((items: CreativeEntry[]) => {
    deleteStatement.run(origin);

    for (const entry of items) {
      insertStatement.run({
        slug: entry.slug,
        title: entry.title,
        excerpt: entry.excerpt,
        content_json: JSON.stringify(entry.content),
        category: entry.category,
        tags_json: JSON.stringify(entry.tags),
        published_at: entry.publishedAt,
        source_label: entry.sourceLabel,
        source_url: entry.sourceUrl ?? null,
        cover_image: entry.coverImage ?? null,
        featured: entry.featured ? 1 : 0,
        origin,
      });
    }
  });

  transaction(entries);
}

function sortEntries(entries: CreativeEntry[]) {
  return entries.sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );
}

function ensureLocalEntries() {
  const poems = getPoemEntries();
  const contentHash = JSON.stringify(poems);

  if (getMeta("local_hash") === contentHash) return;

  replaceEntries(poems, "local");
  setMeta("local_hash", contentHash);
}

async function initializeContentStore() {
  if (contentStoreInitPromise) return contentStoreInitPromise;

  contentStoreInitPromise = (async () => {
    ensureLocalEntries();
    await syncMediumEntries();
  })();

  try {
    await contentStoreInitPromise;
  } catch (error) {
    contentStoreInitPromise = null;
    throw error;
  }
}

async function syncMediumEntries() {
  if (!siteConfig.mediumFeedUrl) return;
  if (mediumSyncPromise) return mediumSyncPromise;

  mediumSyncPromise = (async () => {
    const articles = await getMediumArticles();
    const contentHash = JSON.stringify(articles);

    if (getMeta("medium_hash") === contentHash) return;

    replaceEntries(articles, "medium");
    setMeta("medium_hash", contentHash);
  })();

  try {
    await mediumSyncPromise;
  } finally {
    mediumSyncPromise = null;
  }
}

export async function getStoredEntries(): Promise<CreativeEntry[]> {
  await initializeContentStore();

  const db = getDatabase();
  const rows = db
    .prepare("SELECT * FROM entries ORDER BY datetime(published_at) DESC")
    .all() as EntryRow[];

  return sortEntries(rows.map(mapRowToEntry));
}

export async function getStoredEntryBySlug(slug: string) {
  const db = getDatabase();
  let row = db.prepare("SELECT * FROM entries WHERE slug = ? LIMIT 1").get(slug) as
    | EntryRow
    | undefined;

  if (!row) {
    await initializeContentStore();
    row = db.prepare("SELECT * FROM entries WHERE slug = ? LIMIT 1").get(slug) as
      | EntryRow
      | undefined;
  }

  return row ? mapRowToEntry(row) : undefined;
}

export function getContentDatabasePath() {
  return dbPath;
}
