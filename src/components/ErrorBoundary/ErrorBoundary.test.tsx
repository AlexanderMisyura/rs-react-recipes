import { ErrorBoundary, ErrorTrigger } from '@components';
import { setupUser } from '@test-utils';
import { screen } from '@testing-library/react';

const TRIGGER_TEXT = 'Trigger Error';
const FIX_TEXT = 'Fix';
const ERROR_HEADING = 'Something went wrong';

describe('ErrorBoundary', () => {
  it('should handle error', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => null);
    const { user } = setupUser(
      <ErrorBoundary>
        <ErrorTrigger />
      </ErrorBoundary>
    );

    const trigger = screen.getByRole('button', { name: TRIGGER_TEXT });
    await user.click(trigger);

    const errorFallback = screen.getByRole('heading', { name: ERROR_HEADING });
    expect(errorFallback).toBeInTheDocument();
    expect(console.error).toHaveBeenCalled();
    expect(trigger).not.toBeInTheDocument();

    const fix = screen.getByRole('button', { name: FIX_TEXT });
    await user.click(fix);

    const triggerAfterFix = screen.getByRole('button', { name: TRIGGER_TEXT });
    expect(errorFallback).not.toBeInTheDocument();
    expect(triggerAfterFix).toBeInTheDocument();
  });
});
