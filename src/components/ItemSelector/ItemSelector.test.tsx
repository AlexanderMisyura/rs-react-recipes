import { apiController } from '@controllers';
import { screen, waitFor } from '@testing-library/react';
import { recipesResponseSingle } from '@tests-mocks';
import { setupUserWithProviders } from 'tests/test-utils';

beforeEach(() => {
  URL.createObjectURL = vi.fn();
  URL.revokeObjectURL = vi.fn();
  vi.spyOn(apiController, 'getItems').mockResolvedValue(recipesResponseSingle);
});

describe('ItemSelector', () => {
  it('should not be checked if item is not in store', async () => {
    const { store } = setupUserWithProviders();

    const itemSelector = await screen.findByRole('checkbox', { name: 'Select' });

    expect(store.getState().recipes.recipesChecked).toHaveLength(0);
    expect(itemSelector).not.toBeChecked();
  });

  it('should be checked if item is in store', async () => {
    const { store } = setupUserWithProviders({
      preloadedState: { recipes: { recipesChecked: [recipesResponseSingle.recipes[0]] } },
    });

    const itemSelector = await screen.findByRole('checkbox', { name: 'Select' });

    expect(store.getState().recipes.recipesChecked).toHaveLength(1);
    expect(itemSelector).toBeChecked();
  });

  it('should add and remove item from redux store', async () => {
    const { user, store } = setupUserWithProviders();

    const itemSelector = await screen.findByRole('checkbox', { name: 'Select' });
    await user.click(itemSelector);

    await waitFor(() => {
      expect(store.getState().recipes.recipesChecked).toHaveLength(1);
    });

    await user.click(itemSelector);

    await waitFor(() => {
      expect(store.getState().recipes.recipesChecked).toHaveLength(0);
    });
  });
});
