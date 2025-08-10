import config from '@config/api.config';
import type { RecipesResponse } from '@ts-types';
import { http, HttpResponse } from 'msw';

import {
  instructionsResponse,
  recipesResponse,
  recipesResponseEmpty,
  recipesResponseSingle,
} from './mock-recipes';

const getRecipesHandler = (response: RecipesResponse) => {
  return http.get(`${config.API_URL}${config.SEARCH_ENDPOINT}`, () => {
    return HttpResponse.json(response);
  });
};

export const handlers = [
  getRecipesHandler(recipesResponse),
  http.get(`${config.API_URL}/:detailsId`, () => {
    return HttpResponse.json(instructionsResponse);
  }),
];

export const overrides = {
  singleItemResponse: getRecipesHandler(recipesResponseSingle),
  emptyResponse: getRecipesHandler(recipesResponseEmpty),
  errorResponse: http.get(`${config.API_URL}${config.SEARCH_ENDPOINT}`, () => {
    return HttpResponse.json({ message: 'test error' }, { status: 404 });
  }),
  getSpecificResponse: (response: RecipesResponse) => getRecipesHandler(response),
};
