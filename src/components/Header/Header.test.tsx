import { Header } from '@components';
import { render, screen } from '@testing-library/react';

const TEST_ID = 'test_component';
const ChildComponent = <div data-testid={TEST_ID}></div>;

describe('Header', () => {
  it('should render the header and its children', () => {
    render(<Header children={ChildComponent} />);

    const headerChild = screen.getByTestId(TEST_ID);
    expect(headerChild).toBeInTheDocument();
  });
});
