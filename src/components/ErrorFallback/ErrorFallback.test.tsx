import { ErrorFallback } from '@components';
import { render, screen } from '@testing-library/react';

const ERROR_HEADING = 'Something went wrong';

describe('ErrorFallback', () => {
  it('should render the error fallback', () => {
    render(<ErrorFallback error={new Error('test error')} />);

    const errorFallback = screen.getByRole('heading', { name: ERROR_HEADING });
    expect(errorFallback).toBeInTheDocument();
  });
});
