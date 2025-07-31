import { apiController } from '@controllers';
import { instructionsResponse, recipesResponse } from '@tests-mocks';

describe('apiController', () => {
  it('should return recipes data', async () => {
    vi.spyOn(window, 'fetch').mockImplementation(() =>
      Promise.resolve(new Response(JSON.stringify(recipesResponse)))
    );

    const recipes = await apiController.getItems({ limit: '5' });
    expect(recipes.recipes).toHaveLength(recipesResponse.recipes.length);
  });

  it('should throw error when recipes fetch fails', async () => {
    vi.spyOn(window, 'fetch').mockImplementation(() =>
      Promise.resolve(new Response('{"message": "test error"}', { status: 404 }))
    );

    await expect(apiController.getItems({ limit: '5' })).rejects.toThrow();
  });

  it('should return details data', async () => {
    vi.spyOn(window, 'fetch').mockImplementation(() =>
      Promise.resolve(new Response(JSON.stringify(instructionsResponse)))
    );

    const details = await apiController.getDetails('1');
    expect(details).toEqual(instructionsResponse);
  });

  it('should throw error when details fetch fails', async () => {
    vi.spyOn(window, 'fetch').mockImplementation(() =>
      Promise.resolve(new Response('{"message": "test error"}', { status: 404 }))
    );

    await expect(apiController.getDetails('1')).rejects.toThrow();
  });
});
