import { STORAGE_KEY } from '@constants';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { recipeSchema } from '@schemas';
import { storageService } from '@services';
import type { Recipe } from '@ts-types';
import { z } from 'zod';

import type { RootState } from './store';

export interface RecipesState {
  recipesChecked: Recipe[];
}

function getInitialState() {
  const initialState: RecipesState = { recipesChecked: [] };
  const storedState = storageService.getItem(STORAGE_KEY.RECIPES_CHECKED);

  if (storedState) {
    const parsedResult = z.array(recipeSchema).safeParse(JSON.parse(storedState));

    if (parsedResult.success) {
      initialState.recipesChecked = parsedResult.data;
    }
  }

  return initialState;
}

export const recipesSlice = createSlice({
  name: 'recipes_checked',
  initialState: getInitialState(),
  reducers: {
    add: (state, action: PayloadAction<Recipe>) => {
      state.recipesChecked.push(action.payload);
    },
    remove: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      state.recipesChecked = state.recipesChecked.filter((recipe) => recipe.id !== id);
    },
    wipe: (state) => {
      state.recipesChecked = [];
    },
  },
});

export const { add, remove, wipe } = recipesSlice.actions;

export default recipesSlice.reducer;

export const selectCheckedTotal = (state: RootState) => state.recipes.recipesChecked.length;

export const selectAllChecked = (state: RootState) => state.recipes.recipesChecked;
