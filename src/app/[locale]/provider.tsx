'use client';

import { STORAGE_KEY } from '@constants';
import { ThemeProvider } from '@context';
import { restore } from '@redux/recipesSlice';
import { store } from '@redux/store';
import { recipeSchema } from '@schemas';
import { storageService } from '@services';
import { useEffect } from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { z } from 'zod';

const ReduxToStorageSynchronizer: React.FC = () => {
  useEffect(() => {
    const savedCheckedRecipes = storageService.getItem(STORAGE_KEY.RECIPES_CHECKED);

    if (savedCheckedRecipes) {
      const parsedResult = z.array(recipeSchema).safeParse(JSON.parse(savedCheckedRecipes));

      if (parsedResult.success) {
        store.dispatch(restore(parsedResult.data));
      }
    }

    const unsubscribe = store.subscribe(() => {
      const state = store.getState();
      storageService.setItem(
        STORAGE_KEY.RECIPES_CHECKED,
        JSON.stringify(state.recipes.recipesChecked)
      );
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return null;
};

export const Provider: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ThemeProvider>
    <ReduxProvider store={store}>
      <ReduxToStorageSynchronizer />
      {children}
    </ReduxProvider>
  </ThemeProvider>
);
