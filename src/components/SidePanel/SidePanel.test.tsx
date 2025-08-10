import { screen, waitFor } from '@testing-library/react';
import { instructionsResponse, mockServer, overrides, recipe_1 } from '@tests-mocks';
import { UrlPath } from '@ts-enums';
import { setupUserWithProviders } from 'tests/test-utils';

beforeEach(() => {
  mockServer.use(overrides.singleItemResponse);
});

describe('SidePanel', () => {
  it('should display a correct list of instructions after clicking on a recipe and close the list', async () => {
    const { user, router } = setupUserWithProviders();

    const recipe = await screen.findByRole('link', { name: 'Details' });
    await user.click(recipe);

    await waitFor(() => {
      expect(router.state.location.pathname).toBe(`${UrlPath.RECIPES}/${recipe_1.id}`);
    });

    const sidePanel = await screen.findByTestId('side-panel');
    expect(sidePanel).toBeInTheDocument();
    expect(recipe).toBeInTheDocument();

    const instructionsHeading = await screen.findByText(recipe_1.name);
    expect(instructionsHeading).toBeInTheDocument();

    const instructions = await screen.findAllByTestId('instruction');
    expect(instructions).toHaveLength(instructionsResponse.instructions.length);

    const closeLink = await screen.findByRole('link', { name: 'Close' });
    await user.click(closeLink);

    await waitFor(() => {
      expect(sidePanel).not.toBeInTheDocument();
      expect(router.state.location.pathname).toBe(UrlPath.RECIPES);
    });
  });

  it('should create a correct url with query params after closing the side panel', async () => {
    const searchParamsString = '?q=test&page=1';
    const { user, router } = setupUserWithProviders({
      initialEntries: [`${UrlPath.RECIPES}/1/${searchParamsString}`],
    });

    const closeLink = await screen.findByRole('link', { name: 'Close' });
    await user.click(closeLink);

    await waitFor(() => {
      expect(router.state.location.search).toBe(searchParamsString);
    });
  });
});
