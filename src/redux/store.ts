import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { recipesApi } from './apiRecipesSlice';
import recipesReducer from './recipesSlice';

const rootReducer = combineReducers({
  recipes: recipesReducer,
  [recipesApi.reducerPath]: recipesApi.reducer,
});

export function setupStore(preloadedState?: Partial<RootState>) {
  const store = configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(recipesApi.middleware),
  });

  return store;
}

export const store = setupStore();

export const dispatch = store.dispatch;

export type AppStore = ReturnType<typeof setupStore>;
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof dispatch;
