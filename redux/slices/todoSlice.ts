import { IToDoItem } from '@/store/schema';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TodoState {
  tasks: IToDoItem[];
}

const initialState: TodoState = {
  tasks: [],
};

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    setItems: (state, action: PayloadAction<IToDoItem[]>) => {
      state.tasks = action.payload;
    },
    addItem: (state, action: PayloadAction<IToDoItem>) => {
      state.tasks.push(action.payload);
    },
    deleteItem: (state, action: PayloadAction<number>) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
    },
    updateItem: (state, action: PayloadAction<{ id: number; status: string }>) => {
      const { id, status } = action.payload;
      const task = state.tasks.find(task => task.id === id);
      if (task) task.status = status;
    },
  },
});

export const { setItems, addItem, deleteItem, updateItem } = todoSlice.actions;

export const pendingTasks = (state: { todo: TodoState }) => {
  return state.todo.tasks.filter(task => task.status != 'completed').length;
};

export default todoSlice.reducer;
