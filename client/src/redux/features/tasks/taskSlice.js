import { createSlice } from '@reduxjs/toolkit';

const taskSlice = createSlice({
  name: 'task',
  initialState: {
    items: [],
    error: null,
  },
  reducers: {
    loadSuccess: (state, action) => {
      state.items = action.payload;
    },
    loadFail: (state, action) => {
      state.error = action.error;
    },
    addTask: (state, action) => {
      const { content, ...rest } = action.payload;
      state.items.unshift({
        id: Date.now(),
        content: String(content).trim(),
        ...rest,
      });
      console.log(state.items);
    },

    deleteTask: (state, action) => {
      state.items = state.items.filter(t => t.id !== action.payload);
    },

    toggleDone: (state, action) => {
      const task = state.items.find(t => t.id === action.payload);
      if (task) task.isDone = !task.isDone;
    },

    editTask: (state, action) => {
      const { id, ...updates } = action.payload;
      const task = state.items.find(t => t.id === id);
      if (task) {
        Object.entries(updates).forEach(([key, value]) => {
          if (value !== undefined) {
            task[key] = value;
          }
        });
      }
    },
  },
});

export const { addTask, deleteTask, toggleDone, editTask } = taskSlice.actions;
export default taskSlice.reducer;
