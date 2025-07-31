import { apiController } from '@controllers';
import { setupUserWithRouter } from '@test-utils';
import { screen, waitFor } from '@testing-library/react';
import { instructionsResponse, recipesResponseSingle } from '@tests-mocks';
import { UrlPath } from '@ts-enums';
import { routes } from 'router';

beforeEach(() => {
  vi.spyOn(apiController, 'getItems').mockResolvedValue(recipesResponseSingle);
  vi.spyOn(apiController, 'getDetails').mockResolvedValue(instructionsResponse);
});

describe('SidePanel', () => {
  it('should display a correct list of instructions after clicking on a recipe and close the list', async () => {
    const { user, router } = setupUserWithRouter(routes, [UrlPath.RECIPES]);

    const recipe = await screen.findByTestId('list-item-', { exact: false });
    await user.click(recipe);

    expect(router.state.location.pathname).toBe(
      `${UrlPath.RECIPES}/${recipesResponseSingle.recipes[0].id}/`
    );

    await waitFor(async () => {
      const sidePanel = await screen.findByTestId('side-panel');
      expect(sidePanel).toBeInTheDocument();
      expect(recipe).toBeInTheDocument();

      const instructionsHeading = await screen.findByText(recipesResponseSingle.recipes[0].name);
      expect(instructionsHeading).toBeInTheDocument();

      const instructions = await screen.findAllByTestId('instruction');
      expect(instructions).toHaveLength(instructionsResponse.instructions.length);

      const closeLink = await screen.findByRole('link', { name: 'Close' });
      await user.click(closeLink);

      expect(sidePanel).not.toBeInTheDocument();

      expect(router.state.location.pathname).toBe(`${UrlPath.RECIPES}/`);
    });
  });

  it('should create a correct url with query params after closing the side panel', async () => {
    const searchParamsString = '?q=test&page=1';
    const { user, router } = setupUserWithRouter(routes, [
      `${UrlPath.RECIPES}/1/${searchParamsString}`,
    ]);

    const closeLink = await screen.findByRole('link', { name: 'Close' });
    await user.click(closeLink);

    expect(router.state.location.search).toBe(searchParamsString);
  });
});
