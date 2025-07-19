import { apiController } from '@controllers';
import { recipesResponse } from '@tests-mocks';

describe('apiController', () => {
  it('should return recipes data', async () => {
    vi.spyOn(window, 'fetch').mockImplementation(() =>
      Promise.resolve(new Response(JSON.stringify(recipesResponse)))
    );

    const recipes = await apiController.getItems({ limit: '5' });
    expect(recipes.recipes).toHaveLength(recipesResponse.recipes.length);
  });

  it('should throw error', async () => {
    vi.spyOn(window, 'fetch').mockImplementation(() =>
      Promise.resolve(new Response('{"message": "test error"}', { status: 404 }))
    );

    await expect(apiController.getItems({ limit: '5' })).rejects.toThrow();
  });
});
