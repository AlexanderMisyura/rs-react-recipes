import { PARAMS_MAP, STORAGE_KEY } from '@constants';
import { storageService } from '@services';
import { getRecipesFetchParams } from '@utils';
import { data, type LoaderFunctionArgs, redirect } from 'react-router';
import { recipesApi } from 'redux/apiRecipesSlice';
import { dispatch } from 'redux/store';

export async function recipesLoader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);

  const searchFromParams = url.searchParams.get(PARAMS_MAP[STORAGE_KEY.SEARCH_STRING]);
  const searchFromStorage = storageService.getItem(STORAGE_KEY.SEARCH_STRING);

  if (searchFromParams === null && searchFromStorage) {
    const newParams = new URLSearchParams(url.searchParams);
    newParams.set('q', searchFromStorage);

    throw redirect(`${url.pathname}?${newParams.toString()}`);
  }

  const recipesParams = getRecipesFetchParams(url.searchParams);
  const recipesPromise = dispatch(recipesApi.endpoints.getItems.initiate(recipesParams));

  try {
    const recipesResult = await recipesPromise;

    return recipesResult.data;
  } catch (error) {
    if (error instanceof Error) {
      const dataResponse = data<string>(error.message, { status: 404 });

      throw dataResponse;
    }
  } finally {
    recipesPromise.unsubscribe();
  }
}
