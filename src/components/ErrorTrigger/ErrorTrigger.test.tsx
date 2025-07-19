import { ErrorTrigger } from '@components';
import { render, screen } from '@testing-library/react';

const TRIGGER_TEXT = 'Trigger Error';

describe('ErrorTrigger', () => {
  it('should render the trigger', () => {
    render(<ErrorTrigger />);

    const trigger = screen.getByRole('button', { name: TRIGGER_TEXT });
    expect(trigger).toBeInTheDocument();
  });
});
