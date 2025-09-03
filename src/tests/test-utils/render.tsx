import type { AppStore, RootState } from '@redux/store';
import { store as reduxStore } from '@redux/store';
import type { RenderOptions } from '@testing-library/react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { PropsWithChildren } from 'react';
import { Provider as ReduxProvider } from 'react-redux';

interface ExtendedRenderOptions extends RenderOptions {
  preloadedState?: Partial<RootState>;
  store?: AppStore;
}

export const setupUserWithProviders = (
  ui: React.ReactElement,
  { store = reduxStore, ...restOptions }: ExtendedRenderOptions = {}
) => {
  const Wrapper = ({ children }: PropsWithChildren) => (
    <ReduxProvider store={store}>{children}</ReduxProvider>
  );

  const renderResult = render(ui, {
    wrapper: Wrapper,
    ...restOptions,
  });

  return { ...renderResult, user: userEvent.setup(), store };
};
