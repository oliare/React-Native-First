import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const tasksTable = sqliteTable("tasks", {
    id: integer("id").primaryKey({ autoIncrement: true }),
    todo: text("todo").notNull(),
    date: text("date").notNull(),
    priority: text("priority").notNull(),
    status: text("status").notNull(),
    completed: integer("completed", { mode: "boolean" }).notNull(),
    deadline: text("deadline"),
    notificationId: text("notification_id"),
});

export type IToDoItem = typeof tasksTable.$inferSelect;
export type NewToDoItem = typeof tasksTable.$inferInsert;
