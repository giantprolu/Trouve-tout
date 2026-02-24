import { sql } from 'drizzle-orm';
import { text, integer, real, sqliteTable } from 'drizzle-orm/sqlite-core';

// ── Utilisateurs ──────────────────────────────────────────────────────────────
export const users = sqliteTable('users', {
  id: text('id').primaryKey(),
  email: text('email').notNull().unique(),
  name: text('name'),
  // Préférences
  budgetMin: integer('budget_min').default(0),
  budgetMax: integer('budget_max').default(500),
  // 'prix' | 'qualite' | 'equilibre'
  priorite: text('priorite').default('equilibre'),
  marquesFavorites: text('marques_favorites'), // JSON stringifié
  createdAt: text('created_at').default(sql`(datetime('now'))`),
  updatedAt: text('updated_at').default(sql`(datetime('now'))`),
});

// ── Catégories ────────────────────────────────────────────────────────────────
export const categories = sqliteTable('categories', {
  id: text('id').primaryKey(),
  nom: text('nom').notNull(),
  slug: text('slug').notNull().unique(),
  description: text('description'),
  emoji: text('emoji'),
});

// ── Marques ───────────────────────────────────────────────────────────────────
export const marques = sqliteTable('marques', {
  id: text('id').primaryKey(),
  nom: text('nom').notNull(),
  slug: text('slug').notNull().unique(),
  categorieId: text('categorie_id').references(() => categories.id),
  description: text('description'),
  logo: text('logo'),
});

// ── Produits ──────────────────────────────────────────────────────────────────
export const produits = sqliteTable('produits', {
  id: text('id').primaryKey(),
  nom: text('nom').notNull(),
  slug: text('slug').notNull().unique(),
  marqueId: text('marque_id').references(() => marques.id),
  categorieId: text('categorie_id').references(() => categories.id),
  prix: real('prix'),
  // 'meilleur_rapport' | 'milieu' | 'moins_cher'
  segment: text('segment').notNull(),
  // Indicateurs 1–5
  qualite: integer('qualite'),
  durabilite: integer('durabilite'),
  fiabilite: integer('fiabilite'),
  // Verdict
  verdict: text('verdict'),
  pourQui: text('pour_qui'),
  contreQui: text('contre_qui'),
  // Affiliation
  lienAmazon: text('lien_amazon'),
  image: text('image'),
  createdAt: text('created_at').default(sql`(datetime('now'))`),
});

// ── Historique recherches ─────────────────────────────────────────────────────
export const recherches = sqliteTable('recherches', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  userId: text('user_id').references(() => users.id),
  // null si session anonyme
  sessionId: text('session_id'),
  query: text('query').notNull(),
  categorieId: text('categorie_id').references(() => categories.id),
  createdAt: text('created_at').default(sql`(datetime('now'))`),
});

// ── Sélections produits ───────────────────────────────────────────────────────
export const selections = sqliteTable('selections', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  userId: text('user_id').references(() => users.id),
  produitId: text('produit_id').references(() => produits.id),
  createdAt: text('created_at').default(sql`(datetime('now'))`),
});

// ── Types inférés ─────────────────────────────────────────────────────────────
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type Categorie = typeof categories.$inferSelect;
export type Marque = typeof marques.$inferSelect;
export type Produit = typeof produits.$inferSelect;
export type Recherche = typeof recherches.$inferSelect;
