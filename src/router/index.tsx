import { SidePanel, Spinner } from '@components';
import { AboutPage, ErrorPage, MainPage } from '@pages';
import { UrlPath } from '@ts-enums';
import {
  createBrowserRouter,
  redirect,
  type RouteObject,
  type ShouldRevalidateFunctionArgs,
} from 'react-router';
import { RootLayout } from 'RootLayout';

import { detailsLoader, recipesLoader } from './loaders';

const shouldRevalidate = ({ currentUrl, nextUrl }: ShouldRevalidateFunctionArgs) =>
  currentUrl.search !== nextUrl.search;

export const routes: RouteObject[] = [
  {
    Component: RootLayout,
    path: UrlPath.HOME,
    ErrorBoundary: ErrorPage,
    HydrateFallback: Spinner,
    children: [
      {
        ErrorBoundary: ErrorPage,
        children: [
          {
            index: true,
            loader: () => redirect(UrlPath.RECIPES),
            HydrateFallback: Spinner,
            Component: () => null,
          },
          {
            path: UrlPath.RECIPES,
            Component: MainPage,
            loader: recipesLoader,
            shouldRevalidate: shouldRevalidate,
            children: [
              {
                path: ':detailsId',
                Component: SidePanel,
                loader: detailsLoader,
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
