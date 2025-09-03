import { combineReducers, configureStore } from '@reduxjs/toolkit';

import userReducer from './userSlice';

const rootReducer = combineReducers({ users: userReducer });

export const store = configureStore({ reducer: rootReducer });

export const dispatch = store.dispatch;

export type AppStore = typeof store;
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof dispatch;
