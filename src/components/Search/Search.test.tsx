import { setupUserWithRouter } from '@test-utils';
import { screen, waitFor } from '@testing-library/react';
import { UrlPath } from '@ts-enums';
import { routes } from 'router';

describe('Search', () => {
  const INITIAL_VALUE = 'initial';
  const TYPED_VALUE = 'typed';

  it('should update search string and change search params', async () => {
    const { user, router } = setupUserWithRouter(routes, [`${UrlPath.RECIPES}?q=${INITIAL_VALUE}`]);

    const input = await screen.findByRole('searchbox');
    expect(input).toHaveValue(INITIAL_VALUE);

    await user.type(input, TYPED_VALUE);
    expect(input).toHaveValue(`${INITIAL_VALUE}${TYPED_VALUE}`);

    const button = screen.getByRole('button');
    await user.click(button);

    await waitFor(() => {
      expect(router.state.location.search).toBe(`?q=${INITIAL_VALUE}${TYPED_VALUE}`);
    });
  });
});
