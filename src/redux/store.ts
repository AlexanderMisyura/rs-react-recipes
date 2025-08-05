import { STORAGE_KEY } from '@constants';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { storageService } from '@services';

import recipesReducer from './recipesSlice';

const rootReducer = combineReducers({
  recipes: recipesReducer,
});

export function setupStore(preloadedState?: Partial<RootState>) {
  const store = configureStore({
    reducer: rootReducer,
    preloadedState,
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

export type AppStore = ReturnType<typeof setupStore>;
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = AppStore['dispatch'];
