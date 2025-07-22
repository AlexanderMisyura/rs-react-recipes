import { ErrorTrigger } from '@components';
import { setupUser } from '@test-utils';
import { screen } from '@testing-library/react';

const TRIGGER_TEXT = 'Trigger Error';

describe('ErrorTrigger', () => {
  it('should throw an error on click', async () => {
    const { user } = setupUser(<ErrorTrigger />);

    const trigger = screen.getByRole('button', { name: TRIGGER_TEXT });

    await expect(user.click(trigger)).rejects.toThrow();
  });
});
