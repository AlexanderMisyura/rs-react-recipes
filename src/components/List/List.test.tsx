import { ThemeProvider } from '@context';
import { apiController } from '@controllers';
import { renderWithRouter } from '@test-utils';
import { screen } from '@testing-library/react';
import { instructionsResponse, recipesResponse, recipesResponseSingle } from '@tests-mocks';
import { UrlPath } from '@ts-enums';
import { routes } from 'router';

beforeEach(() => {
  vi.spyOn(apiController, 'getItems').mockResolvedValue(recipesResponse);
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe('List', () => {
  it('should display heading with single recipe', async () => {
    vi.spyOn(apiController, 'getItems').mockResolvedValue(recipesResponseSingle);
    renderWithRouter({ routes, initialEntries: [UrlPath.RECIPES], wrapper: ThemeProvider });

    const heading = await screen.findByText('1 Recipe Found');
    expect(heading).toBeInTheDocument();
  });

  it('should display heading with multiple recipes', async () => {
    renderWithRouter({ routes, initialEntries: [UrlPath.RECIPES], wrapper: ThemeProvider });

    const heading = await screen.findByText(`${recipesResponse.recipes.length} Recipes Found`);
    expect(heading).toBeInTheDocument();
  });

  it('should render a correct number of list items', async () => {
    renderWithRouter({ routes, initialEntries: [UrlPath.RECIPES], wrapper: ThemeProvider });

    const listItems = await screen.findAllByTestId('list-item', { exact: false });
    expect(listItems).toHaveLength(recipesResponse.recipes.length);
  });

  it('should display the spinner after the detailsId appear in the url', () => {
    vi.spyOn(apiController, 'getDetails').mockResolvedValue(instructionsResponse);
    renderWithRouter({ routes, initialEntries: [`${UrlPath.RECIPES}/1/`], wrapper: ThemeProvider });

    const spinner = screen.getByText('Loading...');
    expect(spinner).toBeInTheDocument();
  });
});
