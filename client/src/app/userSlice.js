import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'users',
  initialState: {
    users: [],
    isLoading: true,
  },
  reducers: {
    getAllUsers: (state, action) => {
      state.users = action.payload.map((user) => ({
        id: user._id,
        first_name: user.first_name,
        last_name: user.last_name,
        user_name: user.user_name,
        email: user.email,
        role: user.role
      }));
      state.isLoading = false;
    },

    getUserById: (state, action) => {
      const user = state.users.find((u) => u.id === action.payload);
      state.currentuser = user;
    },
    createUser: (state, action) => {
      state.users.push(action.payload);
    },
    updateUser: (state, action) => {;
      const index = state.users.findIndex((u) => u.id === action.payload.id);
      state.users[index] = {
        id: action.payload.id,
        first_name: action.payload.first_name,
        last_name: action.payload.last_name,
        user_name: action.payload.user_name,
        email: action.payload.email,
        password: action.payload.password,
        role: action.payload.role
      }
    },
    deleteUserSuccess: (state, action) => {
      state.users = state.users.filter(user => user.id !== action.payload);
    },

    deleteUserFailure: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { 
  getAllUsers, 
  createUser, 
  getUserById, 
  updateUser, 
  deleteUserSuccess,
  deleteUserFailure
} = userSlice.actions;

export const isLoadingSelector = (state) => state.user.isLoading;
export const usersSelector = (state) => state.user.users;

export default userSlice.reducer;
