import { configureStore } from '@reduxjs/toolkit';

import recipesReducer from './recipesSlice';

export const store = configureStore({
  reducer: {
    recipes: recipesReducer,
  },
});

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
