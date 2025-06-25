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
    },
    loginFail: (state, action) => {
      state.error = action.payload;
    },
    logout: (state) => {
      state.currentUser = null;
    },
    loadUser: (state, action) => {
      state.currentUser = action.payload;
    },
  },
});

export const { loginSuccess, loginFail, logout, loadUser } = userSlice.actions;
export default userSlice.reducer;
