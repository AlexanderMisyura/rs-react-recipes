import { storageService } from '@services';
import { screen, waitFor } from '@testing-library/react';
import {
  instructionsResponse_1,
  instructionsResponse_2,
  mockServer,
  overrides,
  recipe_1,
} from '@tests-mocks';
import { UrlPath } from '@ts-enums';
import { setupUserWithProviders } from 'tests/test-utils';

beforeEach(() => {
  mockServer.use(overrides.singleItemsResponse);
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
    expect(instructions).toHaveLength(instructionsResponse_1.instructions.length);

    const closeLink = await screen.findByRole('link', { name: 'Close' });
    await user.click(closeLink);

    await waitFor(() => {
      expect(sidePanel).not.toBeInTheDocument();
      expect(router.state.location.pathname).toBe(UrlPath.RECIPES);
    });
  });

  it('should create a correct url with query params after closing the side panel', async () => {
    vi.spyOn(storageService, 'setItem').mockImplementation(() => null);
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

  it('should display the error fallback when error response occurs and able to close it', async () => {
    mockServer.use(overrides.errorDetailsResponse);
    const { user, router } = setupUserWithProviders();

    const detailsLink = await screen.findByRole('link', { name: 'Details' });
    await user.click(detailsLink);

    await waitFor(() => {
      expect(router.state.location.pathname).toBe(`${UrlPath.RECIPES}/${recipe_1.id}`);
    });

    const errorFallback = await screen.findByTestId('error-fallback');
    expect(errorFallback).toBeInTheDocument();
    expect(errorFallback).toHaveTextContent('test error');

    const closeButton = await screen.findByRole('button', { name: 'Close' });
    await user.click(closeButton);

    await waitFor(() => {
      expect(errorFallback).not.toBeInTheDocument();
      expect(router.state.location.pathname).toBe(UrlPath.RECIPES);
    });
  });

  it("should refetch the data and update the component's content when 'Refetch' button is clicked", async () => {
    const { user } = setupUserWithProviders({
      initialEntries: [`${UrlPath.RECIPES}/1`],
    });

    const detailsHeading = await screen.findByText(instructionsResponse_1.name, { exact: false });
    expect(detailsHeading).toBeInTheDocument();

    mockServer.use(overrides.getSpecificDetailsResponse(instructionsResponse_2));

    const refetchButton = await screen.findByTestId('refetch-details');
    await user.click(refetchButton);

    await waitFor(() => {
      const updatedDetailsHeading = screen.getByText(instructionsResponse_2.name, { exact: false });
      expect(updatedDetailsHeading).toBeInTheDocument();
    });
  });
});
