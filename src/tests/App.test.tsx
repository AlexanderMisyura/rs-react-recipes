import config from '@config/app.config';
import { apiController } from '@controllers';
import { setupUser } from '@test-utils';
import { render, screen } from '@testing-library/react';
import { recipesResponse, recipesResponseEmpty } from '@tests-mocks';

import { App } from '../App';

const { STORAGE_PREFIX } = config;
const SEARCH_VALUE = 'test';

afterEach(() => {
  vi.restoreAllMocks();
});

describe('App', () => {
  it('displays the spinner until the data is loaded', async () => {
    vi.spyOn(apiController, 'getItems').mockResolvedValue(recipesResponse);
    render(<App />);
    const spinner = screen.getByText('Loading...');
    expect(spinner).toBeInTheDocument();

    await screen.findByTestId('list');
    expect(spinner).not.toBeInTheDocument();
  });

  it('displays the initial data with empty search value', async () => {
    const mockGetItems = vi.spyOn(apiController, 'getItems').mockResolvedValue(recipesResponse);
    render(<App />);

    const list = await screen.findByTestId('list');
    expect(list).toBeInTheDocument();
    expect(mockGetItems).toHaveBeenCalled();
  });

  it('displays the initial data with saved search value', async () => {
    localStorage.setItem(`${STORAGE_PREFIX}_searchString`, SEARCH_VALUE);
    const mockGetItems = vi.spyOn(apiController, 'getItems').mockResolvedValue(recipesResponse);
    render(<App />);

    const list = await screen.findByTestId('list');
    expect(list).toBeInTheDocument();
    expect(mockGetItems).toHaveBeenCalledWith({ limit: '5', q: SEARCH_VALUE });

    const search = screen.getByRole('searchbox');
    expect(search).toHaveValue(SEARCH_VALUE);

    localStorage.removeItem(`${STORAGE_PREFIX}_searchString`);
  });

  it('displays the empty data fallback', async () => {
    const mockGetItems = vi
      .spyOn(apiController, 'getItems')
      .mockResolvedValue(recipesResponseEmpty);
    render(<App />);

    const fallback = await screen.findByTestId('empty-fallback');
    expect(fallback).toBeInTheDocument();
    expect(mockGetItems).toHaveBeenCalledWith({ limit: '50', q: '' });
  });

  it('displays the search results', async () => {
    const mockGetItems = vi.spyOn(apiController, 'getItems').mockResolvedValue(recipesResponse);
    const { user } = setupUser(<App />);

    const search = screen.getByRole('searchbox');
    await user.type(search, SEARCH_VALUE);

    const searchButton = screen.getByTestId('search-button');
    await user.click(searchButton);

    const list = await screen.findByTestId('list');
    expect(list).toBeInTheDocument();
    expect(mockGetItems).toHaveBeenCalled();
  });

  it('displays the error fallback', async () => {
    const mockGetItems = vi
      .spyOn(apiController, 'getItems')
      .mockImplementation(() => Promise.reject(new Error('test error')));
    render(<App />);

    const fallback = await screen.findByTestId('error-fallback');
    expect(fallback).toBeInTheDocument();
    expect(mockGetItems).toHaveBeenCalled();
  });

  it('trims and overwrites the search value in localStorage', async () => {
    const valueToOverwrite = 'overwrite';
    localStorage.setItem(`${STORAGE_PREFIX}_searchString`, valueToOverwrite);
    vi.spyOn(apiController, 'getItems').mockResolvedValue(recipesResponse);
    const { user } = setupUser(<App />);

    const search = screen.getByRole('searchbox');
    await user.clear(search);
    await user.type(search, ` ${SEARCH_VALUE} `);

    const searchButton = screen.getByTestId('search-button');
    await user.click(searchButton);

    const searchValue = localStorage.getItem(`${STORAGE_PREFIX}_searchString`);
    expect(searchValue).toBe(SEARCH_VALUE);
  });
});
