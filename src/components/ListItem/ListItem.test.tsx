import { ListItem } from '@components';
import { render, screen } from '@testing-library/react';
import { recipe_1 as recipe } from '@tests-mocks';

describe('ListItem', () => {
  it('should display a correct name', () => {
    render(<ListItem recipe={recipe} />);

    const name = screen.getByText(recipe.name);

    expect(name).toBeInTheDocument();
  });

  it('should display a correct image', () => {
    render(<ListItem recipe={recipe} />);

    const image = screen.getByAltText(recipe.name);

    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', recipe.image);
    expect(image).toHaveAttribute('alt', recipe.name);
  });

  it('should display correct ingredients', () => {
    render(<ListItem recipe={recipe} />);

    const ingredients = screen.getAllByRole('listitem');

    expect(ingredients).toHaveLength(recipe.ingredients.length);
    ingredients.forEach((ingredient, index) => {
      expect(ingredient).toHaveTextContent(recipe.ingredients[index]);
    });
  });
});
