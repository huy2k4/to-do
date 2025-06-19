import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [
    { "id": "tag1", "name": "Cá nhân", "color": "#e67e22" },
    { "id": "tag2", "name": "Học tập", "color": "#2980b9" },
    { "id": "tag3", "name": "Sức khoẻ", "color": "#27ae60" },
    { "id": "tag4", "name": "Lập trình", "color": "#8e44ad" },
    { "id": "tag5", "name": "Công việc", "color": "#2c3e50" },
    { "id": "tag6", "name": "Ẩm thực", "color": "#d35400" },
    { "id": "tag7", "name": "Dọn dẹp", "color": "#95a5a6" },
    { "id": "tag8", "name": "Gia đình", "color": "#c0392b" }
  ],
};

const tagSlice = createSlice({
  name: 'tags',
  initialState,
  reducers: {
    addTag: (state, action) => {
      const { name, color = '#ccc' } = action.payload;
      const existing = state.items.find(
        tag => tag.name.toLowerCase() === name.toLowerCase()
      );
      if (!existing) {
        const newTag = {
          id: `tag-${Date.now()}`,
          name: name.trim(),
          color,
        };
        state.items.push(newTag);
      }
    },
    editTag: (state, action) => {
      const { id, name, color } = action.payload;
      const tag = state.items.find(t => t.id === id);
      if (tag) {
        if (name) tag.name = name;
        if (color) tag.color = color;
      }
    },
    deleteTag: (state, action) => {
      state.items = state.items.filter(tag => tag.id !== action.payload);
    },
  },
});

export const { addTag, editTag, deleteTag } = tagSlice.actions;
export default tagSlice.reducer;
