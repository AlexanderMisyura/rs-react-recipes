import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { Recipe } from '@ts-types';

import type { RootState } from './store';

export interface RecipesState {
  recipesChecked: Recipe[];
}

const initialState: RecipesState = {
  recipesChecked: [],
};

export const recipesSlice = createSlice({
  name: 'recipes_checked',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<Recipe>) => {
      state.recipesChecked.push(action.payload);
    },
    remove: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      state.recipesChecked = state.recipesChecked.filter((recipe) => recipe.id !== id);
    },
    clear: (state) => {
      state.recipesChecked = [];
    },
    restore: (state, action: PayloadAction<Recipe[]>) => {
      state.recipesChecked = action.payload;
    },
  },
});

export const { add, remove, clear, restore } = recipesSlice.actions;

export default recipesSlice.reducer;

export const selectCheckedTotal = (state: RootState) => state.recipes.recipesChecked.length;

export const selectAllChecked = (state: RootState) => state.recipes.recipesChecked;
