export const recipe_1 = {
  id: 1,
  name: 'test_name-1',
  image: 'test_image-1',
  ingredients: ['test_ingredient-1-1', 'test_ingredient-1-2', 'test_ingredient-1-3'],
};

export const recipe_2 = {
  id: 2,
  name: 'test_name-2',
  image: 'test_image-2',
  ingredients: ['test_ingredient-2-1', 'test_ingredient-2-2', 'test_ingredient-2-3'],
};

export const recipesResponse = {
  recipes: [recipe_1, recipe_2],
  skip: 0,
  total: 2,
  limit: 2,
};

export const recipesResponseSingle = {
  recipes: [recipe_1],
  skip: 0,
  total: 1,
  limit: 1,
};

export const recipesResponseEmpty = {
  recipes: [],
  skip: 0,
  total: 0,
  limit: 0,
};

export const instructionsResponse_1 = {
  id: 1,
  instructions: ['test_instruction-1-1', 'test_instruction-1-2', 'test_instruction-1-3'],
  name: 'test_name-1',
};

export const instructionsResponse_2 = {
  id: 2,
  instructions: ['test_instruction-2-1', 'test_instruction-2-2', 'test_instruction-2-3'],
  name: 'test_name-2',
};
