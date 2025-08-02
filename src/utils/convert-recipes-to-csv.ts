import type { Recipe } from '@ts-types';

function createCSVHeadingRow(longestRecipeList: number) {
  const ingredientsColumnNames = Array.from(
    { length: longestRecipeList },
    (_, i) => `ingredients/${i}`
  );

  return `id,name,image,${ingredientsColumnNames.join(',')}\n`;
}

function createRecipeCSVRow(recipe: Recipe, maxColumns: number) {
  const { id, name, image, ingredients } = recipe;
  const columnsDifference = maxColumns - ingredients.length;

  const ingredientsRow = ingredients.reduce(
    (acc, curr, i) => `${acc}${i === 0 ? '' : ','}${curr.includes(',') ? `"${curr}"` : curr}`,
    ''
  );

  return `${id},${name},${image},${ingredientsRow}${','.repeat(columnsDifference)}\n`;
}

function createCSVData(recipes: Recipe[], maxColumns: number) {
  return recipes.reduce((acc, recipe) => `${acc}${createRecipeCSVRow(recipe, maxColumns)}`, '');
}

export function convertRecipesToCSV(recipes: Recipe[]) {
  if (!recipes.length) {
    return '';
  }

  const longestRecipeList = recipes.reduce((acc, recipe) => {
    return recipe.ingredients.length > acc ? recipe.ingredients.length : acc;
  }, 0);

  return `${createCSVHeadingRow(longestRecipeList)}${createCSVData(recipes, longestRecipeList)}`;
}
