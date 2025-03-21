import * as SQLite from 'expo-sqlite';
import { drizzle } from 'drizzle-orm/expo-sqlite';
import { IToDoItem, tasksTable } from '../store/schema';
import { eq } from 'drizzle-orm';

const expo = SQLite.openDatabaseSync('db.db');
const db = drizzle(expo);

export const getTasks = async () => {
  return await db.select().from(tasksTable);
};

export const addTask = async (task: typeof tasksTable.$inferInsert) => {
  await db.insert(tasksTable).values(task);
};

export const deleteTask = async (id: number) => {
  await db.delete(tasksTable).where(eq(tasksTable.id, id));
};

export const updateTask = async (id: number, newStatus: string) => {
  await db.update(tasksTable).set({ status: newStatus }).where(eq(tasksTable.id, id));
};
