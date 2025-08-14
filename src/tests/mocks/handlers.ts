import config from '@config/api.config';
import type { RecipeInstructionsResponse, RecipesResponse } from '@ts-types';
import { http, HttpResponse } from 'msw';

import {
  instructionsResponse_1,
  recipesResponse,
  recipesResponseEmpty,
  recipesResponseSingle,
} from './mock-recipes';

const getRecipesHandler = (response: RecipesResponse) => {
  return http.get(`${config.API_URL}${config.SEARCH_ENDPOINT}`, () => {
    return HttpResponse.json(response);
  });
};

const getDetailsHandler = (response: RecipeInstructionsResponse) => {
  return http.get<{ detailsId: string }>(`${config.API_URL}/:detailsId`, () => {
    return HttpResponse.json(response);
  });
};

export const handlers = [
  getRecipesHandler(recipesResponse),
  getDetailsHandler(instructionsResponse_1),
];

export const overrides = {
  singleItemsResponse: getRecipesHandler(recipesResponseSingle),
  emptyItemsResponse: getRecipesHandler(recipesResponseEmpty),
  errorItemsResponse: http.get(`${config.API_URL}${config.SEARCH_ENDPOINT}`, () => {
    return HttpResponse.json('test error', { status: 404 });
  }),
  getSpecificItemsResponse: (response: RecipesResponse) => getRecipesHandler(response),

  errorDetailsResponse: http.get<{ detailsId: string }>(
    `${config.API_URL}/:detailsId`,
    ({ params }) => {
      if (params.detailsId !== config.SEARCH_ENDPOINT.slice(1)) {
        return HttpResponse.json('test error', { status: 404 });
      }
    }
  ),
  getSpecificDetailsResponse: (response: RecipeInstructionsResponse) => getDetailsHandler(response),
};
