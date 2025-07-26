import config from '@config/api.config';
import { apiController } from '@controllers';
import { storageService } from '@services';
import { data, type LoaderFunctionArgs } from 'react-router';

export async function recipesLoader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const search = url.searchParams.get('q') ?? storageService.getItem('searchString') ?? '';
  const page = Number(url.searchParams.get('page') ?? '1');

  const limit = String(config.ITEMS_PER_PAGE);
  const skip = String(config.ITEMS_PER_PAGE * (page - 1));

  try {
    const response = await apiController.getItems({
      q: search,
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
