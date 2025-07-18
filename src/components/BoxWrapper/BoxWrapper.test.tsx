import { BoxWrapper } from '@components';
import { render, screen } from '@testing-library/react';

const TEST_ID = 'test_component';
const ChildComponent = <div data-testid={TEST_ID}></div>;

describe('BoxWrapper', () => {
  it('should render the wrapper and its children', () => {
    render(<BoxWrapper children={ChildComponent} />);

    const wrapperChild = screen.getByTestId(TEST_ID);
    expect(wrapperChild).toBeInTheDocument();
  });
});
