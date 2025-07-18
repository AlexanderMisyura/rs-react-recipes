import { Button } from '@components';
import { setupUser } from '@test-utils';
import { render, screen } from '@testing-library/react';

const BUTTON_TEXT = 'Test';
const child = <div>{BUTTON_TEXT}</div>;

describe('Button', () => {
  it('should render the button and its children', () => {
    render(<Button children={child} />);

    const buttonChild = screen.getByText(BUTTON_TEXT);
    expect(buttonChild).toBeInTheDocument();
  });

  it('should call onClick handler', async () => {
    const mockOnClickHandler = vi.fn();
    const { user } = setupUser(<Button onClickHandler={mockOnClickHandler} />);

    const button = screen.getByRole('button');
    await user.click(button);
    expect(mockOnClickHandler).toHaveBeenCalled();
  });
});
