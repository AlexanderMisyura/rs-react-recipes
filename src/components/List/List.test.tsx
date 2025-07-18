import { List } from '@components';
import { render, screen } from '@testing-library/react';
import { recipesResponse, recipesResponseSingle } from '@tests-mocks';

describe('List', () => {
  it('should render list', () => {
    render(<List recipesData={recipesResponse} />);

    const list = screen.getByTestId('list');
    expect(list).toBeInTheDocument();
  });

  it('should display heading with single recipe', () => {
    render(<List recipesData={recipesResponseSingle} />);

    const heading = screen.getByTestId('list-heading');
    expect(heading.textContent).toEqual('1 Recipe Found');
  });

  it('should display heading with multiple recipes', () => {
    render(<List recipesData={recipesResponse} />);

    const heading = screen.getByTestId('list-heading');
    expect(heading.textContent).toEqual(
      `${recipesResponse.recipes.length.toString()} Recipes Found`
    );
  });

  it('should render a correct number of list items', () => {
    render(<List recipesData={recipesResponse} />);

    const listItems = screen.getAllByTestId('list-item', { exact: false });
    expect(listItems).toHaveLength(recipesResponse.recipes.length);
  });
});
