import { sql } from "drizzle-orm";
import { pgTable, pgEnum, serial, text, integer, timestamp, uuid } from 'drizzle-orm/pg-core';

export const enumFeedItemType = pgEnum('FeedItemType', ['YouTubeChannel']);
export const enumVisiblity = pgEnum('Visiblity', ['Public', 'Unlisted', 'Private']);

export const user = pgTable('User', {
	id: uuid('id').notNull().default(sql`gen_random_uuid()`).primaryKey(),
	age: integer('age'),
	username: text('username').notNull().unique(),
	passwordHash: text('password_hash').notNull(),
	createdAt: timestamp('createdAt').notNull().defaultNow(),
	updatedAt: timestamp('updatedAt').notNull(),
});

export const feed = pgTable('Feed', {
	id: uuid('id').notNull().default(sql`gen_random_uuid()`).primaryKey(),
	name: text('name').notNull(),
	description: text('description'),
	visibility: enumVisiblity('visibility').notNull(),
	userId: uuid('userId').notNull().references(() => user.id),
	createdAt: timestamp('createdAt').notNull().defaultNow(),
	updatedAt: timestamp('updatedAt').notNull(),
});

export const feedItem = pgTable('FeedItem', {
	id: serial('id').notNull().primaryKey(),
	name: text('name').notNull(),
	description: text('description'),
	feedId: uuid('feedId').notNull().references(() => feed.id),
	feedItemMetaId: uuid('feedItemMetaId').notNull().references(() => feedItemMeta.id),
	createdAt: timestamp('createdAt').notNull().defaultNow(),
	updatedAt: timestamp('updatedAt').notNull(),
});

export const feedItemMeta = pgTable('FeedItemMeta', {
	id: uuid('id').notNull().default(sql`gen_random_uuid()`).primaryKey(),
	name: text('name').notNull(),
	originId: text('originId').notNull(),
	type: enumFeedItemType('type').notNull(),
	createdAt: timestamp('createdAt').notNull().defaultNow(),
	updatedAt: timestamp('updatedAt').notNull(),
});

export const session = pgTable('session', {
	id: text('id').primaryKey(),
	userId: uuid('user_id')
		.notNull().default(sql`gen_random_uuid()`)
		.references(() => user.id),
	expiresAt: timestamp('expires_at', { withTimezone: true, mode: 'date' }).notNull()
});

export type Session = typeof session.$inferSelect;

export type User = typeof user.$inferSelect;
