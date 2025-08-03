import { combineReducers, configureStore } from '@reduxjs/toolkit';

import recipesReducer from './recipesSlice';

const rootReducer = combineReducers({
  recipes: recipesReducer,
});

export function setupStore(preloadedState?: Partial<RootState>) {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
}

export type AppStore = ReturnType<typeof setupStore>;
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = AppStore['dispatch'];
