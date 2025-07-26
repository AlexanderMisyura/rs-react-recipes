import { Spinner } from '@components';
import { AboutPage, ErrorPage, MainPage } from '@pages';
import { UrlPath } from '@ts-enums';
import { createBrowserRouter, redirect, type RouteObject } from 'react-router';
import { RootLayout } from 'RootLayout';

import { recipesLoader } from './loaders/recipes.loader';

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
          },
          {
            path: UrlPath.RECIPES,
            Component: MainPage,
            loader: recipesLoader,
            HydrateFallback: Spinner,
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
