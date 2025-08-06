import { data, type LoaderFunctionArgs } from 'react-router';
import { recipesApi } from 'redux/apiRecipesSlice';
import { dispatch } from 'redux/store';

export async function detailsLoader({ params }: LoaderFunctionArgs) {
  const { detailsId } = params;

  if (detailsId) {
    const detailsPromise = dispatch(recipesApi.endpoints.getDetails.initiate(detailsId));

    try {
      const detailsResult = await detailsPromise;

      return detailsResult.data;
    } catch (error) {
      if (error instanceof Error) {
        throw data(error.message, { status: 404 });
      }
    } finally {
      detailsPromise.unsubscribe();
    }
  }
}
