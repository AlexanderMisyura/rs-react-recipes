import config from '@config/app.config';
import { STORAGE_KEY, THEME } from '@constants';
import { ThemeProvider } from '@context';
import { apiController } from '@controllers';
import { storageService } from '@services';
import { renderWithRouter, setupUserWithRouter } from '@test-utils';
import { screen } from '@testing-library/react';
import { recipesResponse, recipesResponseEmpty } from '@tests-mocks';
import { UrlPath } from '@ts-enums';
import { routes } from 'router';

const { DATA_PREFIX } = config;
const SEARCH_VALUE = 'test';

beforeEach(() => {
  vi.spyOn(apiController, 'getItems').mockResolvedValue(recipesResponse);
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe('MainPage', () => {
  it('displays the spinner until the data is loaded', async () => {
    renderWithRouter({ routes, initialEntries: [UrlPath.RECIPES], wrapper: ThemeProvider });

    const spinner = screen.getByText('Loading...');
    expect(spinner).toBeInTheDocument();

    await screen.findByTestId('list');
    expect(spinner).not.toBeInTheDocument();
  });

  it('displays the initial data with empty search value', async () => {
    renderWithRouter({ routes, initialEntries: [UrlPath.RECIPES], wrapper: ThemeProvider });

    const list = await screen.findByTestId('list');
    expect(list).toBeInTheDocument();
  });

  it('displays the initial data with saved search value', async () => {
    vi.spyOn(storageService, 'getItem').mockImplementation((storageKey: string) => {
      if (storageKey === STORAGE_KEY.SEARCH_STRING) {
        return SEARCH_VALUE;
      } else if (storageKey === STORAGE_KEY.THEME) {
        return THEME.LIGHT;
      }

      return null;
    });
    const mockGetItems = vi.spyOn(apiController, 'getItems').mockResolvedValue(recipesResponse);
    renderWithRouter({ routes, initialEntries: [UrlPath.RECIPES], wrapper: ThemeProvider });

    const list = await screen.findByTestId('list');
    expect(list).toBeInTheDocument();
    expect(mockGetItems).toHaveBeenCalledWith({ limit: '5', q: SEARCH_VALUE, skip: '0' });

    const search = screen.getByRole('searchbox');
    expect(search).toHaveValue(SEARCH_VALUE);
  });

  it('displays the empty data fallback', async () => {
    vi.spyOn(apiController, 'getItems').mockResolvedValue(recipesResponseEmpty);
    renderWithRouter({ routes, initialEntries: [UrlPath.RECIPES], wrapper: ThemeProvider });

    const fallback = await screen.findByTestId('empty-fallback');
    expect(fallback).toBeInTheDocument();
  });

  it('displays the search results', async () => {
    const { user } = setupUserWithRouter({
      routes,
      initialEntries: [UrlPath.RECIPES],
      wrapper: ThemeProvider,
    });

    const search = await screen.findByRole('searchbox');
    await user.type(search, SEARCH_VALUE);

    const searchButton = screen.getByTestId('search-button');
    await user.click(searchButton);

    const list = await screen.findByTestId('list');
    expect(list).toBeInTheDocument();
  });

  it('displays the error fallback', async () => {
    vi.spyOn(apiController, 'getItems').mockImplementation(() =>
      Promise.reject(new Error('test error'))
    );
    renderWithRouter({ routes, initialEntries: [UrlPath.RECIPES], wrapper: ThemeProvider });

    const fallback = await screen.findByTestId('error-page');
    expect(fallback).toBeInTheDocument();
  });

  it('trims and overwrites the search value in localStorage', async () => {
    const mockedStorage: Record<string, string> = {
      [`${DATA_PREFIX}_searchString`]: 'overwrite',
    };

    const getFromMockedStorage = (key: string) => mockedStorage[`${DATA_PREFIX}_${key}`] ?? null;
    const setToMockedStorage = (key: string, value: string) => {
      mockedStorage[`${DATA_PREFIX}_${key}`] = value;
    };

    vi.spyOn(storageService, 'getItem').mockImplementation(getFromMockedStorage);
    vi.spyOn(storageService, 'setItem').mockImplementation(setToMockedStorage);
    vi.spyOn(apiController, 'getItems').mockResolvedValue(recipesResponse);

    const { user } = setupUserWithRouter({
      routes,
      initialEntries: [UrlPath.RECIPES],
      wrapper: ThemeProvider,
    });

    const search = await screen.findByRole('searchbox');
    await user.clear(search);
    await user.type(search, ` ${SEARCH_VALUE} `);

    const searchButton = screen.getByTestId('search-button');
    await user.click(searchButton);

    const searchValue = storageService.getItem(STORAGE_KEY.SEARCH_STRING);

    expect(searchValue).toBe(SEARCH_VALUE);
  });
});
