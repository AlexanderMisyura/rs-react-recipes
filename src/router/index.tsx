import { AboutPage, ErrorPage, MainPage } from '@pages';
import { UrlPath } from '@ts-enums';
import { createBrowserRouter } from 'react-router';
import { RootLayout } from 'RootLayout';

export const router = createBrowserRouter([
  {
    Component: RootLayout,
    path: UrlPath.HOME,
    ErrorBoundary: ErrorPage,
    children: [
      {
        ErrorBoundary: ErrorPage,
        children: [
          {
            index: true,
            Component: MainPage,
          },
          {
            path: UrlPath.ABOUT,
            Component: AboutPage,
          },
          {
            path: UrlPath.NOT_FOUND,
            Component: ErrorPage,
          },
        ],
      },
    ],
  },
]);
