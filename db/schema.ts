import {sqliteTable,text,integer,primaryKey} from 'drizzle-orm/sqlite-core';
export const course=sqliteTable('course',{id:text('id').primaryKey(),payload:text('payload').notNull(),revision:integer('revision').notNull(),updatedAt:text('updated_at').notNull()});
export const progress=sqliteTable('progress',{userId:text('user_id').notNull(),lessonId:text('lesson_id').notNull()},t=>[primaryKey({columns:[t.userId,t.lessonId]})]);
