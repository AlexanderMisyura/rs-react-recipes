import { screen, waitFor } from '@testing-library/react';
import { recipe_1 } from '@tests-mocks';
import { setupUserWithProviders } from 'tests/test-utils';

beforeEach(() => {
  URL.createObjectURL = vi.fn();
  URL.revokeObjectURL = vi.fn();
});

describe('ItemSelector', () => {
  it('should not be checked if item is not in store', async () => {
    const { store } = setupUserWithProviders();

    const itemSelectors = await screen.findAllByRole('checkbox', { name: 'Select' });

    expect(store.getState().recipes.recipesChecked).toHaveLength(0);
    expect(itemSelectors[0]).not.toBeChecked();
    expect(itemSelectors[1]).not.toBeChecked();
  });

  it('should be checked if item is in store', async () => {
    const { store } = setupUserWithProviders({
      preloadedState: { recipes: { recipesChecked: [recipe_1] } },
    });

    const itemSelectors = await screen.findAllByRole('checkbox', { name: 'Select' });

    expect(store.getState().recipes.recipesChecked).toHaveLength(1);
    expect(itemSelectors[0]).toBeChecked();
    expect(itemSelectors[1]).not.toBeChecked();
  });

  it('should add and remove item from redux store', async () => {
    const { user, store } = setupUserWithProviders();

    const itemSelectors = await screen.findAllByRole('checkbox', { name: 'Select' });
    await user.click(itemSelectors[0]);

    await waitFor(() => {
      expect(store.getState().recipes.recipesChecked).toHaveLength(1);
    });

    await user.click(itemSelectors[0]);

    await waitFor(() => {
      expect(store.getState().recipes.recipesChecked).toHaveLength(0);
    });
  });
});
