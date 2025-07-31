import { ErrorBoundary } from '@components';
import { ThemeProvider } from '@context';
import { setupUser } from '@test-utils';
import { screen } from '@testing-library/react';

const FIX_TEXT = 'Fix';
const ERROR_HEADING = 'Something went wrong';

describe('ErrorBoundary', () => {
  it('should handle error', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => null);
    const ErrorTrigger = () => {
      throw new Error();
    };
    const { user } = setupUser(
      <ErrorBoundary>
        <ErrorTrigger />
      </ErrorBoundary>,
      ThemeProvider
    );

    const errorFallback = screen.getByRole('heading', { name: ERROR_HEADING });
    expect(errorFallback).toBeInTheDocument();
    expect(console.error).toHaveBeenCalled();

    const fix = screen.getByRole('button', { name: FIX_TEXT });
    await user.click(fix);

    expect(errorFallback).not.toBeInTheDocument();
  });
});
