import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    currentUser: null,
    error: null,
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.error = null;
      localStorage.setItem('user', JSON.stringify(action.payload));
    },
    loginFail: (state, action) => {
      state.error = action.payload;
    },
    logout: (state) => {
      state.currentUser = null;
      localStorage.removeItem('user');
    },
    loadFromStorage: (state) => {
      const saved = localStorage.getItem('user');
      if (saved) {
        state.currentUser = JSON.parse(saved);
      }
    },
  },
});

export const { loginSuccess, loginFail, logout, loadFromStorage } = userSlice.actions;
export default userSlice.reducer;
