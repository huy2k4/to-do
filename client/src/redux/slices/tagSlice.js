import { createSlice } from '@reduxjs/toolkit';

const tagSlice = createSlice({
  name: 'tags',
  initialState: {
    items: [], 
  },
  reducers: {
    addTag: (state, action) => {
      state.items.push(action.payload);
    },
    updateTag: (state, action) => {
      const index = state.items.findIndex(tag => tag.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = { ...state.items[index], ...action.payload };
      }
    },
    deleteTag: (state, action) => {
      state.items = state.items.filter(tag => tag.id !== action.payload);
    },
  },
});

export const {
  addTag,
  updateTag,
  deleteTag,
} = tagSlice.actions;

export default tagSlice.reducer;
