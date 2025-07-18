import { Spinner } from '@components';
import { render, screen } from '@testing-library/react';

describe('Spinner', () => {
  it('should render spinner', () => {
    render(<Spinner />);

    const spinner = screen.getByText('Loading...');

    expect(spinner).toBeInTheDocument();
  });
});
