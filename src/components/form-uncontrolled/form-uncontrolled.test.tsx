import { screen } from '@testing-library/react';
import { App } from 'app';
import { setupUserWithProviders } from 'tests/test-utils';

describe('FormUncontrolled', () => {
  it('should show validation errors after invalid data', async () => {
    const { user } = setupUserWithProviders(<App />);

    await user.click(screen.getByRole('button', { name: 'Uncontrolled' }));

    const nameError = screen.queryByText('Name must start with a capital letter');
    expect(nameError).not.toBeInTheDocument();

    const saveButton = screen.getByRole('button', { name: 'Save' });
    await user.click(saveButton);

    const nameErrorAfterSubmit = await screen.findByText('Name is required');
    expect(nameErrorAfterSubmit).toBeInTheDocument();
  });
});
