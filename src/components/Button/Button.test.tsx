import { Button } from '@components';
import { ThemeProvider } from '@context';
import { setupUser } from '@test-utils';
import { screen } from '@testing-library/react';

describe('Button', () => {
  it('should call onClick handler', async () => {
    const mockOnClickHandler = vi.fn();
    const { user } = setupUser(<Button onClickHandler={mockOnClickHandler} />, ThemeProvider);

    const button = screen.getByRole('button');
    await user.click(button);
    expect(mockOnClickHandler).toHaveBeenCalled();
  });
});
