import config from '@config/app.config';
import { STORAGE_KEY, THEME } from '@constants';
import { storageService } from '@services';
import { screen, waitFor } from '@testing-library/react';
import { mockServer, overrides } from '@tests-mocks';
import { UrlPath } from '@ts-enums';
import { createMockRecipes, setupUserWithProviders } from 'tests/test-utils';

const { DATA_PREFIX } = config;
const SEARCH_VALUE = 'test';

describe('MainPage', () => {
  it('displays the spinner until the data is loaded', async () => {
    setupUserWithProviders();

    const spinner = screen.getByText('Loading...');
    expect(spinner).toBeInTheDocument();

    await screen.findByTestId('list');
    expect(spinner).not.toBeInTheDocument();
  });

  it('displays the initial data with empty search value', async () => {
    setupUserWithProviders();

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
    setupUserWithProviders();

    const list = await screen.findByTestId('list');
    expect(list).toBeInTheDocument();

    const search = screen.getByRole('searchbox');
    expect(search).toHaveValue(SEARCH_VALUE);
  });

  it('displays the empty data fallback', async () => {
    mockServer.use(overrides.emptyItemsResponse);
    setupUserWithProviders();

    const fallback = await screen.findByTestId('empty-fallback');
    expect(fallback).toBeInTheDocument();
  });

  it('displays the search results', async () => {
    const { user } = setupUserWithProviders();

    const search = await screen.findByRole('searchbox');
    await user.type(search, SEARCH_VALUE);

    const searchButton = screen.getByTestId('search-button');
    await user.click(searchButton);

    const list = await screen.findByTestId('list');
    expect(list).toBeInTheDocument();
  });

  it('displays the error fallback', async () => {
    mockServer.use(overrides.errorItemsResponse);
    setupUserWithProviders();

    const fallback = await screen.findByTestId('error-fallback');
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

    const { user } = setupUserWithProviders();

    const search = await screen.findByRole('searchbox');
    await user.clear(search);
    await user.type(search, ` ${SEARCH_VALUE} `);

    const searchButton = screen.getByTestId('search-button');
    await user.click(searchButton);

    const searchValue = storageService.getItem(STORAGE_KEY.SEARCH_STRING);

    expect(searchValue).toBe(SEARCH_VALUE);
  });

  it('should display the error fallback when loader throws data and able to navigate back', async () => {
    mockServer.use(
      overrides.getSpecificItemsResponse({
        recipes: createMockRecipes(7),
        skip: 0,
        total: 7,
        limit: 6,
      })
    );
    const { user, router } = setupUserWithProviders();

    const nextPageButton = await screen.findByTestId('pagination-next');
    mockServer.use(overrides.errorItemsResponse);
    await user.click(nextPageButton);

    const errorFallback = await screen.findByTestId('error-fallback');
    expect(errorFallback).toBeInTheDocument();
    expect(errorFallback).toHaveTextContent('test error');

    const backButton = await screen.findByRole('button', { name: 'Back' });
    await user.click(backButton);

    await waitFor(() => {
      expect(errorFallback).not.toBeInTheDocument();
      expect(router.state.location.pathname).toBe(UrlPath.RECIPES);
    });
  });

  it('should refetch data and update the list when "Refetch" button is clicked', async () => {
    const { user } = setupUserWithProviders();

    const initialList = await screen.findAllByTestId('list-item', { exact: false });
    expect(initialList).toHaveLength(2);

    mockServer.use(
      overrides.getSpecificItemsResponse({
        recipes: createMockRecipes(6),
        skip: 0,
        total: 6,
        limit: 6,
      })
    );

    const refetchButton = await screen.findByRole('button', { name: 'Refetch' });
    await user.click(refetchButton);

    await waitFor(() => {
      const updatedList = screen.getAllByTestId('list-item', { exact: false });
      expect(updatedList).toHaveLength(6);
    });
  });
});
