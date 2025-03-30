import { db } from './db';
import { tasksTable } from '../store/schema';
import { eq } from 'drizzle-orm';
import { cancelNotification, scheduleNotification } from '@/hooks/useNotifications';
import IToDoItem from '@/interfaces/ToDoList';

export const getTasks = async () => {
  return await db.select().from(tasksTable);
};

export const addTask = async (task: IToDoItem) => {
  const notificationId = await scheduleNotification(task) ?? null;
  console.log("notification Id", notificationId)
  await db.insert(tasksTable).values({ ...task, notificationId });
};

export const deleteTask = async (id: number) => {
  const task = await getTask(id);
  if (task?.notificationId) {
    await cancelNotification(task.notificationId);
  }
  await db.delete(tasksTable).where(eq(tasksTable.id, id));
};

export const updateTask = async (id: number, newStatus: string) => {
  const task = await getTask(id);
  if (newStatus == "completed" && task?.notificationId) {
    await cancelNotification(task.notificationId);
  }
  await db.update(tasksTable).set({ status: newStatus }).where(eq(tasksTable.id, id));
};

export const getTask = async (id: number) => {
  return await db.select().from(tasksTable).where(eq(tasksTable.id, id)).get();
};

