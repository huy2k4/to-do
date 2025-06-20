// src/redux/features/tasks/taskSlice.js
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
      state.error = null;
    },
    loadFail: (state, action) => {
      state.error = action.payload;
    },
    addTask: (state, action) => {
      state.items.unshift(action.payload);
    },
    deleteTask: (state, action) => {
      state.items = state.items.filter(t => t.id !== action.payload);
    },
    editTask: (state, action) => {
      const { id, ...updates } = action.payload;
      const task = state.items.find(t => t.id === id);
      if (task) {
        Object.entries(updates).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            task[key] = value;
          }
        });
      }
    },
  },
});

export const { loadSuccess, loadFail, addTask, deleteTask, editTask } = taskSlice.actions;
export default taskSlice.reducer;
