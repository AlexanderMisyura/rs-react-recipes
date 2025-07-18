import { Heading } from '@components';
import { render, screen } from '@testing-library/react';

const TEST_ID = 'test_component';
const ChildComponent = <div data-testid={TEST_ID}></div>;

describe('Heading', () => {
  it('should render the heading and its children', () => {
    render(<Heading children={ChildComponent} />);

    const headingChild = screen.getByTestId(TEST_ID);
    expect(headingChild).toBeInTheDocument();
  });
});
