import { recipesResponse } from '@tests-mocks';
import { convertRecipesToCSV } from '@utils';

const FILE_CONTENT = `id,name,image,ingredients/0,ingredients/1,ingredients/2
1,test_name-1,test_image-1,test_ingredient-1-1,test_ingredient-1-2,test_ingredient-1-3
2,test_name-2,test_image-2,test_ingredient-2-1,test_ingredient-2-2,test_ingredient-2-3
`;

const LESSER_INGREDIENTS = `3,test_name-3,test_image-3,test_ingredient-3-1,,
`;

const INGREDIENTS_WITH_COMMAS = `3,test_name-3,test_image-3,test_ingredient-3-1,"test,ingredient,3,2",test_ingredient-3-3
`;

describe('convertRecipesToCSV', () => {
  it('should return an empty string if the array argument was empty', () => {
    expect(convertRecipesToCSV([])).toBe('');
  });

  it('should return a correct csv format string', () => {
    const result = convertRecipesToCSV(recipesResponse.recipes);

    expect(result).toBe(FILE_CONTENT);
  });

  it('should return a correct csv format string with lesser ingredients handling commas correctly', () => {
    const recipes = recipesResponse.recipes.concat({
      id: 3,
      name: 'test_name-3',
      image: 'test_image-3',
      ingredients: ['test_ingredient-3-1'],
    });

    const result = convertRecipesToCSV(recipes);

    expect(result).toBe(FILE_CONTENT + LESSER_INGREDIENTS);
  });

  it('should return a correct csv format string with fields that contain commas', () => {
    const recipes = recipesResponse.recipes.concat({
      id: 3,
      name: 'test_name-3',
      image: 'test_image-3',
      ingredients: ['test_ingredient-3-1', 'test,ingredient,3,2', 'test_ingredient-3-3'],
    });

    const result = convertRecipesToCSV(recipes);

    expect(result).toBe(FILE_CONTENT + INGREDIENTS_WITH_COMMAS);
  });
});
