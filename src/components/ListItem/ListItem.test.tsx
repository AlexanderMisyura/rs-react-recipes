import { apiController } from '@controllers';
import { renderWithRouter } from '@test-utils';
import { screen } from '@testing-library/react';
import { recipe_1 as recipe, recipesResponseSingle } from '@tests-mocks';
import { UrlPath } from '@ts-enums';
import { routes } from 'router';

beforeEach(() => {
  vi.spyOn(apiController, 'getItems').mockResolvedValue(recipesResponseSingle);
});

describe('ListItem', () => {
  it('should display a correct name', async () => {
    renderWithRouter(routes, [UrlPath.RECIPES]);

    const name = await screen.findByText(recipe.name);

    expect(name).toBeInTheDocument();
  });

  it('should display a correct image', async () => {
    renderWithRouter(routes, [UrlPath.RECIPES]);

    const image = await screen.findByAltText(recipe.name);

    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', recipe.image);
    expect(image).toHaveAttribute('alt', recipe.name);
  });

  it('should display correct ingredients', async () => {
    renderWithRouter(routes, [UrlPath.RECIPES]);

    const ingredients = await screen.findAllByTestId('ingredient');
    expect(ingredients).toHaveLength(recipe.ingredients.length);
    ingredients.forEach((ingredient, index) => {
      expect(ingredient).toHaveTextContent(recipe.ingredients[index]);
    });
  });
});
