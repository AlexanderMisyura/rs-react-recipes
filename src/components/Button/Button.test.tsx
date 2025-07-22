import { Button } from '@components';
import { setupUser } from '@test-utils';
import { screen } from '@testing-library/react';

describe('Button', () => {
  it('should call onClick handler', async () => {
    const mockOnClickHandler = vi.fn();
    const { user } = setupUser(<Button onClickHandler={mockOnClickHandler} />);

    const button = screen.getByRole('button');
    await user.click(button);
    expect(mockOnClickHandler).toHaveBeenCalled();
  });
});
