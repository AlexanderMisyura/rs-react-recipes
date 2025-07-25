import { apiController } from '@controllers';
import { AboutPage, ErrorPage, MainPage } from '@pages';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { recipesResponse } from '@tests-mocks';
import { UrlPath } from '@ts-enums';
import { createRoutesStub, data } from 'react-router';

import { RootLayout } from '../RootLayout';

beforeEach(() => {
  vi.spyOn(apiController, 'getItems').mockResolvedValue(recipesResponse);
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe('RootLayout', () => {
  it('navigates from Main page to About page and back', async () => {
    const user = userEvent.setup();
    const Stub = createRoutesStub([
      {
        Component: RootLayout,
        children: [
          { path: UrlPath.HOME, Component: () => <MainPage /> },
          { path: UrlPath.ABOUT, Component: () => <AboutPage /> },
        ],
      },
    ]);

    render(<Stub />);

    const aboutLink = screen.getByRole('link', { name: 'About' });
    await user.click(aboutLink);

    const aboutPage = screen.getByTestId('about-page');
    expect(aboutPage).toBeInTheDocument();

    const homeLink = screen.getByRole('link', { name: 'logo Hot Recipes' });
    await user.click(homeLink);

    expect(aboutPage).not.toBeInTheDocument();
    const homePage = screen.getByTestId('main-page');
    expect(homePage).toBeInTheDocument();
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
            index: true,
            Component: MainPage,
            loader: () => {
              // eslint-disable-next-line @typescript-eslint/only-throw-error
              throw data('test error', { status: 404 });
            },
          },
          { path: UrlPath.ABOUT, Component: AboutPage },
        ],
      },
    ]);

    render(<Stub initialEntries={[UrlPath.ABOUT]} />);

    const aboutLink = screen.getByRole('link', { name: 'logo Hot Recipes' });
    await userEvent.click(aboutLink);

    const errorPage = screen.getByTestId('error-page');
    expect(errorPage).toBeInTheDocument();

    const backButton = screen.getByRole('button', { name: 'Go Back' });
    await userEvent.click(backButton);

    const aboutPage = screen.getByTestId('about-page');
    expect(aboutPage).toBeInTheDocument();
  });
});
