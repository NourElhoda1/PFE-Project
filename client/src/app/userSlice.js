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
        role: user.role,
      }));
      state.isLoading = false;
    },
    createUser: (state, action) => {
      state.users.push(action.payload);
    },
    updateUser: (state, action) => {
      const { id, ...updatedUserData } = action.payload;
      const index = state.users.findIndex((user) => user.id === id);
      if (index !== -1) {
        state.users[index] = {
          ...state.users[index],
          ...updatedUserData,
        };
      }
    },
   
  },
});

export const { getAllUsers, createUser, updateUser } = userSlice.actions;

export const isLoadingSelector = (state) => state.user.isLoading;
export const usersSelector = (state) => state.user.users;

export default userSlice.reducer;
