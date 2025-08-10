import config from '@config/api.config';
import { PARAMS_MAP, STORAGE_KEY } from '@constants';

export function getRecipesFetchParams(pageParams: URLSearchParams) {
  const search = pageParams.get(PARAMS_MAP[STORAGE_KEY.SEARCH_STRING]) ?? '';

  const page = +(pageParams.get('page') ?? '1');

  const limit = config.ITEMS_PER_PAGE.toString();
  const skip = (config.ITEMS_PER_PAGE * (page - 1)).toString();

  return { q: search, limit, skip };
}
