import { screen, waitFor } from '@testing-library/dom';
import { recipesResponse } from '@tests-mocks';
import { createMockRecipes, setupUserWithProviders } from 'tests/test-utils';

beforeAll(() => {
  URL.createObjectURL = vi.fn();
  URL.revokeObjectURL = vi.fn();
});

describe('SelectionFlyout', () => {
  it('should display the correct heading with a single selected item', async () => {
    setupUserWithProviders({
      preloadedState: { recipes: { recipesChecked: [recipesResponse.recipes[0]] } },
    });

    const heading = await screen.findByRole('heading', { name: '1 Recipe Checked' });
    expect(heading).toBeInTheDocument();
  });

  it('should display the correct heading with multiple selected item', async () => {
    setupUserWithProviders({
      preloadedState: { recipes: { recipesChecked: createMockRecipes(5) } },
    });

    const heading = await screen.findByRole('heading', { name: '5 Recipes Checked' });
    expect(heading).toBeInTheDocument();
  });

  it('should remove all items from the store on "Unselect All" click', async () => {
    const { user, store } = setupUserWithProviders({
      preloadedState: { recipes: { recipesChecked: createMockRecipes(5) } },
    });

    const unselectButton = await screen.findByRole('button', { name: 'Unselect All' });
    await user.click(unselectButton);

    await waitFor(() => {
      expect(store.getState().recipes.recipesChecked).toHaveLength(0);
    });
  });

  it('should receive a correct download link', async () => {
    const TEST_URL = 'blob-test';
    URL.createObjectURL = vi.fn().mockReturnValue(TEST_URL);
    setupUserWithProviders({
      preloadedState: { recipes: { recipesChecked: [recipesResponse.recipes[0]] } },
    });

    const downloadLink = await screen.findByRole('link', { name: 'Download' });

    expect(downloadLink).toHaveAttribute('href', TEST_URL);
    expect(downloadLink).toHaveAttribute(
      'download',
      'alexandermisyura_rs-react-recipes__1-items.csv'
    );
  });
});
