import { Search } from '@components';
import { setupUser } from '@test-utils';
import { screen } from '@testing-library/react';

describe('Search', () => {
  const mockUpdateHandler = vi.fn();
  const INITIAL_VALUE = 'initial';
  const TYPED_VALUE = 'typed';

  it('should update search string and call update handler', async () => {
    const { user } = setupUser(
      <Search updateHandler={mockUpdateHandler} searchString={INITIAL_VALUE} />
    );
    const input = screen.getByRole('searchbox');

    expect(input).toHaveValue(INITIAL_VALUE);

    await user.type(input, TYPED_VALUE);
    expect(input).toHaveValue(`${INITIAL_VALUE}${TYPED_VALUE}`);

    const button = screen.getByRole('button');

    await user.click(button);
    expect(mockUpdateHandler).toHaveBeenCalledWith(`${INITIAL_VALUE}${TYPED_VALUE}`);
  });
});
