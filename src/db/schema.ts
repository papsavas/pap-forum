import { InferModel, relations } from "drizzle-orm";
import { int, mysqlTable, serial, text, timestamp, varchar, } from "drizzle-orm/mysql-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

const [MAX_USERNAME, MAX_FULLNAME] = [20, 64];

export const users = mysqlTable('users', {
  id: serial('id').primaryKey(),
  //TODO: set to unique
  username: varchar('username', { length: MAX_USERNAME }).notNull(),
  email: text("email").notNull(),
  fullName: varchar('full_name', { length: MAX_FULLNAME }).notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  editedAt: timestamp("edited_at").onUpdateNow(),
})

export type DBUser = InferModel<typeof users, 'select'>;
export type InsertUser = InferModel<typeof users, 'insert'>;

export const insertUserSchema = createInsertSchema(users, {
  email: (schema) => schema.email.email(),
  username: z.string().max(MAX_USERNAME),
  fullName: z.string().max(MAX_FULLNAME)
})

export const posts = mysqlTable('posts', {
  id: serial('id').primaryKey(),
  authorId: int("author_id").notNull(),
  title: text('title').notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  editedAt: timestamp("edited_at").onUpdateNow(),
})

export type DBPost = InferModel<typeof posts>;

export const comments = mysqlTable('comments', {
  id: serial('id').primaryKey(),
  text: text('text').notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  editedAt: timestamp("edited_at").onUpdateNow(),
  authorId: int('author_id').notNull(),
  postId: int('post_id').notNull(),
});

export const usersRelations = relations(users, ({ many }) => ({
  posts: many(posts),
}));

export const postsRelations = relations(posts, ({ one, many }) => ({
  author: one(users, {
    fields: [posts.authorId],
    references: [users.id]
  }),
  comments: many(comments)
}))

export const commentsRelations = relations(comments, ({ one }) => ({
  post: one(posts, {
    fields: [comments.postId],
    references: [posts.id],
  }),
}));