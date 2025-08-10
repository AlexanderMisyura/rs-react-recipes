import { ThemeProvider } from '@context';
import { screen } from '@testing-library/react';
import { mockServer, overrides, recipesResponse } from '@tests-mocks';
import { UrlPath } from '@ts-enums';
import { routes } from 'router';
import { renderWithRouter, setupUserWithProviders } from 'tests/test-utils';

describe('List', () => {
  it('should display heading with single recipe', async () => {
    mockServer.use(overrides.singleItemResponse);
    setupUserWithProviders();

    const heading = await screen.findByText('1 Recipe Found');
    expect(heading).toBeInTheDocument();
  });

  it('should display heading with multiple recipes', async () => {
    setupUserWithProviders();

    const heading = await screen.findByText(`${recipesResponse.recipes.length} Recipes Found`);
    expect(heading).toBeInTheDocument();
  });

  it('should render a correct number of list items', async () => {
    setupUserWithProviders();

    const listItems = await screen.findAllByTestId('list-item', { exact: false });
    expect(listItems).toHaveLength(recipesResponse.recipes.length);
  });

  it('should display the spinner after the detailsId appear in the url', () => {
    renderWithRouter({ routes, initialEntries: [`${UrlPath.RECIPES}/1/`], wrapper: ThemeProvider });

    const spinner = screen.getByText('Loading...');
    expect(spinner).toBeInTheDocument();
  });
});
