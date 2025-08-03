import { screen } from '@testing-library/react';
import { setupUserWithProviders } from 'tests/test-utils';

beforeAll(() => {
  URL.createObjectURL = vi.fn();
  URL.revokeObjectURL = vi.fn();
});

describe('Flyout', () => {
  it('should appear on the screen after isOpen prop is true', async () => {
    const { user } = setupUserWithProviders();

    const flyout = await screen.findByTestId('flyout');

    expect(flyout).to.not.toHaveClass('translate-y-0 opacity-100');

    const itemSelector = await screen.findAllByTestId('item-selector');
    await user.click(itemSelector[0]);

    expect(flyout).toHaveClass('translate-y-0 opacity-100');
  });
});
