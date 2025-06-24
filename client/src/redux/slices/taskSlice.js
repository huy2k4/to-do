import { createSlice } from '@reduxjs/toolkit';

const taskSlice = createSlice({
  name: 'tasks',
  initialState: {
    items: [],
    error: null,
    userId: null,
  },
  reducers: {
    setUserId: (state, action) => {
      state.userId = action.payload;
      state.items = []; 
    },

    loadSuccess: (state, action) => {
      console.log({state:state.userId});
      state.items = action.payload.filter(t => t.userId === state.userId);
      state.error = null;
    },

    loadFail: (state, action) => {
      state.error = action.payload;
    },

    addTask: (state, action) => {
      if (action.payload.userId === state.userId) {
        state.items.unshift(action.payload);
      }
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

export const { setUserId, loadSuccess, loadFail, addTask, deleteTask, editTask } = taskSlice.actions;
export default taskSlice.reducer;
