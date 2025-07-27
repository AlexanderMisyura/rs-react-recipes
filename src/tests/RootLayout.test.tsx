import { apiController } from '@controllers';
import { AboutPage, ErrorPage, MainPage } from '@pages';
import { setupUserWithRouter } from '@test-utils';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { recipesResponse } from '@tests-mocks';
import { UrlPath } from '@ts-enums';
import { createRoutesStub, data } from 'react-router';
import { routes } from 'router';

import { RootLayout } from '../RootLayout';

beforeEach(() => {
  vi.spyOn(apiController, 'getItems').mockResolvedValue(recipesResponse);
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe('RootLayout', () => {
  it('navigates from Main page to About page and back', async () => {
    const { user } = setupUserWithRouter(routes, [UrlPath.RECIPES]);

    const aboutLink = screen.getByRole('link', { name: 'About' });
    await user.click(aboutLink);

    const aboutPage = await screen.findByTestId('about-page');
    expect(aboutPage).toBeInTheDocument();

    const homeLink = screen.getByRole('link', { name: 'logo Hot Recipes' });
    await user.click(homeLink);

    await waitFor(() => {
      expect(aboutPage).not.toBeInTheDocument();
      const homePage = screen.getByTestId('main-page');
      expect(homePage).toBeInTheDocument();
    });
  });

  it('displays the Error page when the route is not found', () => {
    const Stub = createRoutesStub([
      {
        Component: RootLayout,
        children: [{ path: UrlPath.NOT_FOUND, Component: ErrorPage }],
      },
    ]);

    render(<Stub initialEntries={['/invalid']} />);

    const errorPage = screen.getByTestId('error-page');
    expect(errorPage).toBeInTheDocument();
  });

  it('displays the Error page when an error occurs', () => {
    vi.spyOn(console, 'error').mockImplementation(() => null);
    const ErrorTrigger = () => {
      throw new Error('test error');
    };
    const Stub = createRoutesStub([
      {
        Component: RootLayout,
        ErrorBoundary: ErrorPage,
        children: [{ index: true, Component: ErrorTrigger }],
      },
    ]);

    render(<Stub />);

    const errorPage = screen.getByTestId('error-page');
    expect(errorPage).toBeInTheDocument();
  });

  it('displays the Error page when loader throws data and navigates back', async () => {
    vi.spyOn(apiController, 'getItems').mockRejectedValue(new Error('test error'));

    const Stub = createRoutesStub([
      {
        Component: RootLayout,
        ErrorBoundary: ErrorPage,
        children: [
          {
            path: UrlPath.RECIPES,
            Component: MainPage,
            loader: () => {
              throw data('test error', { status: 404 });
            },
          },
          { path: UrlPath.ABOUT, Component: AboutPage },
        ],
      },
    ]);

    render(<Stub initialEntries={[UrlPath.ABOUT]} />);

    const homeLink = screen.getByRole('link', { name: 'logo Hot Recipes' });
    await userEvent.click(homeLink);

    const errorPage = screen.getByTestId('error-page');
    expect(errorPage).toBeInTheDocument();

    const backButton = screen.getByRole('button', { name: 'Go Back' });
    await userEvent.click(backButton);

    const aboutPage = screen.getByTestId('about-page');
    expect(aboutPage).toBeInTheDocument();
  });
});
