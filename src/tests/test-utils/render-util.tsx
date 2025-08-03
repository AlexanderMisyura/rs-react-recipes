import { ThemeProvider } from '@context';
import type { RenderOptions } from '@testing-library/react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { UrlPath } from '@ts-enums';
import type { PropsWithChildren } from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { createMemoryRouter, type RouteObject, RouterProvider } from 'react-router';
import type { AppStore, RootState } from 'redux/store';
import { setupStore } from 'redux/store';
import { routes as routeObjects } from 'router';

interface RenderWithRouterProps {
  routes: RouteObject[];
  initialEntries: string[];
  wrapper?: React.JSXElementConstructor<{
    children: React.ReactNode;
  }>;
}

export const renderWithRouter = ({ routes, initialEntries, wrapper }: RenderWithRouterProps) => {
  const router = createMemoryRouter(routes, { initialEntries });
  const renderResult = render(<RouterProvider router={router} />, { wrapper });

  return { ...renderResult, router };
};

interface ExtendedRenderOptions extends RenderOptions {
  routes?: RouteObject[];
  initialEntries?: string[];
  preloadedState?: Partial<RootState>;
  store?: AppStore;
}

export const setupUserWithProviders = ({
  routes = routeObjects,
  initialEntries = [UrlPath.RECIPES],
  preloadedState = {},
  store = setupStore(preloadedState),
  ...restOptions
}: ExtendedRenderOptions = {}) => {
  const router = createMemoryRouter(routes, { initialEntries });

  const Wrapper = ({ children }: PropsWithChildren) => (
    <ThemeProvider>
      <ReduxProvider store={store}>{children}</ReduxProvider>
    </ThemeProvider>
  );

  const renderResult = render(<RouterProvider router={router} />, {
    wrapper: Wrapper,
    ...restOptions,
  });

  return { ...renderResult, user: userEvent.setup(), router, store };
};
