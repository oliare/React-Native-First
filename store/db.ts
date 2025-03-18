import * as SQLite from 'expo-sqlite';
import IToDoItem from "@/interfaces/ToDoList";

const db = SQLite.openDatabaseSync('todoList.db');

export async function init() {
    await db.execAsync(`PRAGMA journal_mode = WAL;`);

    const result = await db.getFirstAsync<{ count: number }>(`SELECT COUNT(*) as count FROM tasks;`);

    if (result && result.count === 0) {
        await db.execAsync(`
      CREATE TABLE IF NOT EXISTS tasks (
        id INTEGER PRIMARY KEY NOT NULL, 
        todo TEXT NOT NULL,
        date TEXT NOT NULL,
        priority TEXT NOT NULL,
        status TEXT NOT NULL,
        completed BOOLEAN NOT NULL
      );
  
      INSERT OR IGNORE INTO tasks (id, todo, date, priority, status, completed) 
      VALUES 
        (1, 'Task 1', '2025-03-01', 'low', 'to-do', 0),
        (2, 'Task 2', '2025-03-02', 'low', 'to-do', 0),
        (3, 'Task 3', '2025-03-03', 'low', 'to-do', 0);
    `);
    }
}

export async function addTask(task: IToDoItem) {
    await db.runAsync(` INSERT INTO tasks (todo, date, priority, status, completed) VALUES (?, ?, ?, ?, ?);`,
        [task.todo, task.date, task.priority, task.status, task.completed ? 1 : 0]);
}

export async function deleteTask(id: number) {
    await db.runAsync(`DELETE FROM tasks WHERE id = ?; `, [id]);
}

export async function updateTask(id: number, status: string) {
    const completed = status === 'completed' ? 1 : 0;
    await db.runAsync(`UPDATE tasks SET status = ?, completed = ? WHERE id = ?;`,
        [status, completed, id]
    );
}

export async function getTasks(): Promise<IToDoItem[]> {
    const result = await db.getAllAsync<IToDoItem>('SELECT * FROM tasks');
    return result.map((task: any) => ({
        ...task,
        completed: task.completed === 1,
    }));
}

export async function deleteAllTasks() {
    await db.runAsync(` DELETE FROM tasks;`);
}  