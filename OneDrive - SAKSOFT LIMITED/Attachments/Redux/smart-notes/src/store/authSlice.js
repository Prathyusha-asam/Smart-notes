import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: JSON.parse(localStorage.getItem('smartnotes_user')) || null,
    users: JSON.parse(localStorage.getItem('smartnotes_users')) || [],
  },
  reducers: {
    signup: (state, action) => {
      const { username, password } = action.payload;
      const exists = state.users.find(u => u.username === username);
      if (exists) throw new Error('User already exists');
      const newUser = { username, password };
      state.users.push(newUser);
      state.user = { username };
      localStorage.setItem('smartnotes_users', JSON.stringify(state.users));
      localStorage.setItem('smartnotes_user', JSON.stringify({ username }));
    },
    login: (state, action) => {
      const { username, password } = action.payload;
      const found = state.users.find(u => u.username === username && u.password === password);
      if (!found) throw new Error('Invalid credentials');
      state.user = { username };
      localStorage.setItem('smartnotes_user', JSON.stringify({ username }));
    },
    logout: (state) => {
      state.user = null;
      localStorage.removeItem('smartnotes_user');
    },
  },
});

export const { signup, login, logout } = authSlice.actions;
export default authSlice.reducer;