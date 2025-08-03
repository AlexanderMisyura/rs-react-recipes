import { ThemeProvider } from '@context';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { UrlPath } from '@ts-enums';
import { createMemoryRouter, type RouteObject, RouterProvider } from 'react-router';
import { routes } from 'router';

import { ReduxStoreWrapper } from './store-wrapper';

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

export const setupUserWithRouter = ({ routes, initialEntries, wrapper }: RenderWithRouterProps) => {
  return {
    user: userEvent.setup(),
    ...renderWithRouter({ routes, initialEntries, wrapper }),
  };
};

export const setupUserWithProviders = ({
  routeObjects = routes,
  initialEntries = [UrlPath.RECIPES],
}: { routeObjects?: RouteObject[]; initialEntries?: string[] } = {}) => {
  const Wrapper = ({ children }: React.PropsWithChildren) => (
    <ThemeProvider>
      <ReduxStoreWrapper>{children}</ReduxStoreWrapper>
    </ThemeProvider>
  );

  return {
    user: userEvent.setup(),
    ...renderWithRouter({ routes: routeObjects, initialEntries, wrapper: Wrapper }),
  };
};
