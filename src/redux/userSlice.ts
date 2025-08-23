import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { User } from '@ts-interfaces';

import type { RootState } from './store';

export interface RecipesState {
  users: User[];
}

const initialState: RecipesState = { users: [] };

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<User>) => {
      state.users.push(action.payload);
    },
  },
});

export const { add } = usersSlice.actions;

export default usersSlice.reducer;

export const selectAllUsers = (state: RootState) => state.users.users;
