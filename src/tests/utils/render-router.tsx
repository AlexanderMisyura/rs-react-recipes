import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryRouter, type RouteObject, RouterProvider } from 'react-router';

export const renderWithRouter = (routes: RouteObject[], initialEntries: string[]) => {
  const router = createMemoryRouter(routes, { initialEntries });
  const renderResult = render(<RouterProvider router={router} />);

  return { ...renderResult, router };
};

export const setupUserWithRouter = (routes: RouteObject[], initialEntries: string[]) => {
  return {
    user: userEvent.setup(),
    ...renderWithRouter(routes, initialEntries),
  };
};
