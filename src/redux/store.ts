import { combineReducers, configureStore } from '@reduxjs/toolkit';

import userReducer from './userSlice';

const rootReducer = combineReducers({ users: userReducer });

export function setupStore(preloadedState?: Partial<RootState>) {
  const store = configureStore({
    reducer: rootReducer,
    preloadedState,
  });

  return store;
}

export const store = setupStore();

export const dispatch = store.dispatch;

export type AppStore = ReturnType<typeof setupStore>;
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof dispatch;
