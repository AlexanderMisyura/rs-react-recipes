import { List } from '@components';
import { render, screen } from '@testing-library/react';
import { recipesResponse, recipesResponseSingle } from '@tests-mocks';

describe('List', () => {
  it('should display heading with single recipe', () => {
    render(<List recipesData={recipesResponseSingle} />);

    const heading = screen.getByText('1 Recipe Found');
    expect(heading).toBeInTheDocument();
  });

  it('should display heading with multiple recipes', () => {
    render(<List recipesData={recipesResponse} />);

    const heading = screen.getByText(`${recipesResponse.recipes.length.toString()} Recipes Found`);
    expect(heading).toBeInTheDocument();
  });

  it('should render a correct number of list items', () => {
    render(<List recipesData={recipesResponse} />);

    const listItems = screen.getAllByTestId('list-item', { exact: false });
    expect(listItems).toHaveLength(recipesResponse.recipes.length);
  });
});
