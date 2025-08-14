import { screen, waitFor } from '@testing-library/react';
import { mockServer, overrides, recipe_1 as recipe } from '@tests-mocks';
import { setupUserWithProviders } from 'tests/test-utils';

describe('ListItem', () => {
  it('should display a correct name', async () => {
    setupUserWithProviders();
    const name = await screen.findByText(recipe.name);

    expect(name).toBeInTheDocument();
  });

  it('should display a correct image', async () => {
    setupUserWithProviders();
    const image = await screen.findByAltText(recipe.name);

    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', recipe.image);
    expect(image).toHaveAttribute('alt', recipe.name);
  });

  it('should display correct ingredients', async () => {
    setupUserWithProviders();
    mockServer.use(overrides.singleItemsResponse);

    await waitFor(async () => {
      const ingredients = await screen.findAllByTestId('ingredient');
      expect(ingredients).toHaveLength(recipe.ingredients.length);

      ingredients.forEach((ingredient, index) => {
        expect(ingredient).toHaveTextContent(recipe.ingredients[index]);
      });
    });
  });
});
