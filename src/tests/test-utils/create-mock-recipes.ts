export function createMockRecipes(count: number) {
  return Array.from({ length: count }, (_, index) => ({
    id: index + 1,
    name: `test_name-${index + 1}`,
    image: `test_image-${index + 1}`,
    ingredients: [
      `test_ingredient-${index + 1}-1`,
      `test_ingredient-${index + 1}-2`,
      `test_ingredient-${index + 1}-3`,
    ],
  }));
}
