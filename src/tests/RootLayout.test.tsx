import { apiController } from '@controllers';
import { AboutPage, ErrorPage, MainPage } from '@pages';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { recipesResponse } from '@tests-mocks';
import { UrlPath } from '@ts-enums';
import { data } from 'react-router';
import { setupUserWithProviders } from 'tests/test-utils';

import { RootLayout } from '../RootLayout';

beforeEach(() => {
  vi.spyOn(apiController, 'getItems').mockResolvedValue(recipesResponse);
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe('RootLayout', () => {
  it('navigates from Main page to About page and back', async () => {
    const { user } = setupUserWithProviders();

    const aboutLink = await screen.findByRole('link', { name: 'About' });
    await user.click(aboutLink);

    const aboutPage = await screen.findByTestId('about-page');
    expect(aboutPage).toBeInTheDocument();

    const homeLink = screen.getByRole('link', { name: 'Hot Recipes logo Hot Recipes' });
    await user.click(homeLink);

    await waitFor(() => {
      expect(aboutPage).not.toBeInTheDocument();
      const homePage = screen.getByTestId('main-page');
      expect(homePage).toBeInTheDocument();
    });
  });

  it('displays the Error page when the route is not found', () => {
    setupUserWithProviders({ initialEntries: ['/invalid'] });

    const errorPage = screen.getByTestId('error-page');
    expect(errorPage).toBeInTheDocument();
  });

  it('displays the Error page when an error occurs', () => {
    vi.spyOn(console, 'error').mockImplementation(() => null);
    const ErrorTrigger = () => {
      throw new Error('test error');
    };
    setupUserWithProviders({
      routes: [
        {
          Component: RootLayout,
          ErrorBoundary: ErrorPage,
          children: [{ index: true, Component: ErrorTrigger }],
        },
      ],
      initialEntries: ['/'],
    });

    const errorPage = screen.getByTestId('error-page');
    expect(errorPage).toBeInTheDocument();
  });

  it('displays the Error page when loader throws data and navigates back', async () => {
    vi.spyOn(apiController, 'getItems').mockRejectedValue(new Error('test error'));

    setupUserWithProviders({
      routes: [
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
      ],
      initialEntries: [UrlPath.ABOUT],
    });

    const homeLink = screen.getByRole('link', { name: 'Hot Recipes logo Hot Recipes' });
    await userEvent.click(homeLink);

    const errorPage = screen.getByTestId('error-page');
    expect(errorPage).toBeInTheDocument();

    const backButton = screen.getByRole('button', { name: 'Go Back' });
    await userEvent.click(backButton);

    const aboutPage = screen.getByTestId('about-page');
    expect(aboutPage).toBeInTheDocument();
  });
});
