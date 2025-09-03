import { setupUserWithProviders } from '@test-utils';
import { screen, waitFor } from '@testing-library/react';
import { App } from 'app';

describe('Modal', () => {
  it('should not be in the document initially', () => {
    setupUserWithProviders(<App />);
    const modal = screen.queryByRole('dialog');
    expect(modal).not.toBeInTheDocument();
  });

  it('should open and close when buttons are clicked', async () => {
    const { user } = setupUserWithProviders(<App />);

    const openButton = screen.getByRole('button', { name: 'Controlled' });
    await user.click(openButton);
    const modal = screen.getByRole('dialog');
    expect(modal).toBeInTheDocument();

    const closeButton = screen.getByRole('button', { name: 'Close' });
    await user.click(closeButton);

    await waitFor(() => {
      expect(modal).not.toBeInTheDocument();
    });
  });

  it('should close on outside click', async () => {
    const { user } = setupUserWithProviders(
      <div id="root">
        <App />
      </div>
    );

    const openButton = screen.getByRole('button', { name: 'Controlled' });
    await user.click(openButton);

    const dialog = await screen.findByRole('dialog');
    expect(dialog).toBeInTheDocument();

    const backdrop = await screen.findByTestId('backdrop');
    await user.click(backdrop);

    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
  });

  it('should close on escape key press', async () => {
    const { user } = setupUserWithProviders(
      <div id="root">
        <App />
      </div>
    );

    const openButton = screen.getByRole('button', { name: 'Controlled' });
    await user.click(openButton);

    const dialog = screen.getByRole('dialog');
    expect(dialog).toBeInTheDocument();

    await user.keyboard('{Escape}');

    await waitFor(() => {
      expect(dialog).not.toBeInTheDocument();
    });
  });

  it('should render its children using a Portal', async () => {
    const { user, container } = setupUserWithProviders(<App />);

    await user.click(screen.getByRole('button', { name: 'Controlled' }));
    const modal = screen.getByRole('dialog');

    expect(container).not.toContain(modal);
    expect(document.body).toContain(modal);
  });
});
