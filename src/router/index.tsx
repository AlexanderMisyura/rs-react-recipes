import { SidePanel } from '@components';
import { AboutPage, ErrorPage, MainPage } from '@pages';
import { UrlPath } from '@ts-enums';
import { createBrowserRouter, redirect, type RouteObject } from 'react-router';
import { RootLayout } from 'RootLayout';

export const routes: RouteObject[] = [
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
            loader: () => redirect(UrlPath.RECIPES),
            Component: () => null,
          },
          {
            path: UrlPath.RECIPES,
            Component: MainPage,
            children: [
              {
                path: ':detailsId',
                Component: SidePanel,
              },
            ],
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
];

export const router = createBrowserRouter(routes);
