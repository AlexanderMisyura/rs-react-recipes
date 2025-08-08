import config from '@config/api.config';
import { PARAMS_MAP, STORAGE_KEY } from '@constants';
import { apiController } from '@controllers';
import { storageService } from '@services';
import { data, type LoaderFunctionArgs, redirect } from 'react-router';

export async function recipesLoader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);

  const searchFromParams = url.searchParams.get(PARAMS_MAP[STORAGE_KEY.SEARCH_STRING]);
  const searchFromStorage = storageService.getItem(STORAGE_KEY.SEARCH_STRING);

  if (searchFromParams === null && searchFromStorage) {
    const newParams = new URLSearchParams(url.searchParams);
    newParams.set('q', searchFromStorage);

    throw redirect(`${url.pathname}?${newParams.toString()}`);
  }

  const search = searchFromParams ?? searchFromStorage;
  const page = +(url.searchParams.get('page') ?? '1');

  const limit = config.ITEMS_PER_PAGE.toString();
  const skip = (config.ITEMS_PER_PAGE * (page - 1)).toString();

  try {
    const response = await apiController.getItems({
      q: search ?? '',
      limit,
      skip,
    });

    return response;
  } catch (error) {
    if (error instanceof Error) {
      const dataResponse = data<string>(error.message, { status: 404 });

      throw dataResponse;
    }
  }
}
