import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryRouter, type RouteObject, RouterProvider } from 'react-router';

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
