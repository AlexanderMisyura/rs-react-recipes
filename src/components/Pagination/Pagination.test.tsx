import { apiController } from '@controllers';
import { screen, waitFor } from '@testing-library/react';
import { createMockRecipes, setupUserWithProviders } from 'tests/test-utils';

describe('Pagination', () => {
  it('should be able to navigate between pages and have disabled buttons', async () => {
    vi.spyOn(apiController, 'getItems').mockResolvedValue({
      recipes: createMockRecipes(7),
      skip: 0,
      total: 7,
      limit: 6,
    });
    const { user, router } = setupUserWithProviders();

    const prevButton = await screen.findByTestId('pagination-previous');
    expect(prevButton).toHaveAttribute('disabled');

    const nextButton = screen.getByTestId('pagination-next');

    await user.click(nextButton);

    await waitFor(async () => {
      expect(router.state.location.search).toBe('?page=2');

      const prevButtonAfterUpdate = screen.getByTestId('pagination-previous');
      expect(prevButtonAfterUpdate).not.toHaveAttribute('disabled');

      const nextButtonAfterUpdate = screen.getByTestId('pagination-next');
      expect(nextButtonAfterUpdate).toHaveAttribute('disabled');

      await user.click(prevButtonAfterUpdate);

      await waitFor(() => {
        expect(router.state.location.search).toBe('?page=1');
      });
    });
  });
});
