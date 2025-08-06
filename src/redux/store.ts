import { STORAGE_KEY } from '@constants';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { storageService } from '@services';

import { recipesApi } from './apiRecipesSlice';
import recipesReducer from './recipesSlice';

const rootReducer = combineReducers({
  recipes: recipesReducer,
  [recipesApi.reducerPath]: recipesApi.reducer,
});

function setupStore(preloadedState?: Partial<RootState>) {
  const store = configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(recipesApi.middleware),
  });

  store.subscribe(() => {
    const state = store.getState();
    storageService.setItem(
      STORAGE_KEY.RECIPES_CHECKED,
      JSON.stringify(state.recipes.recipesChecked)
    );
  });

  return store;
}

export const store = setupStore();

export const dispatch = store.dispatch;

export type AppStore = ReturnType<typeof setupStore>;
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof dispatch;
