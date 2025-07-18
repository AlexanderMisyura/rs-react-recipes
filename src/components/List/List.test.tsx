import { List } from '@components';
import { render, screen } from '@testing-library/react';
import { recipesResponse } from '@tests-mocks';

describe('List', () => {
  it('should render list', () => {
    render(<List recipesData={recipesResponse} />);

    const list = screen.getByTestId('list');
    expect(list).toBeInTheDocument();
  });

  it('should render heading with correct number of recipes', () => {
    render(<List recipesData={recipesResponse} />);

    const heading = screen.getByTestId('list-heading');
    expect(heading.textContent).toContain(recipesResponse.total.toString());
  });

  it('should render a correct number of list items', () => {
    render(<List recipesData={recipesResponse} />);

    const listItems = screen.getAllByTestId('list-item', { exact: false });
    expect(listItems).toHaveLength(recipesResponse.recipes.length);
  });
});
