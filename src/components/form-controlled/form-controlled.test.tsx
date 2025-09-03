import { screen } from '@testing-library/react';
import { App } from 'app';
import { setupUserWithProviders } from 'tests/test-utils';

describe('FormControlled (React Hook Form)', () => {
  it('should have submit button disabled initially and on invalid input', async () => {
    const { user } = setupUserWithProviders(<App />);

    const controlledFormButton = screen.getByRole('button', { name: 'Controlled' });
    await user.click(controlledFormButton);

    const saveButton = screen.getByRole('button', { name: 'Save' });
    expect(saveButton).toBeDisabled();

    const nameInput = screen.getByLabelText('Name');
    await user.type(nameInput, 'john');

    const errorText = await screen.findByText('Name must start with a capital letter');
    expect(errorText).toBeInTheDocument();
    expect(saveButton).toBeDisabled();
  });
});
