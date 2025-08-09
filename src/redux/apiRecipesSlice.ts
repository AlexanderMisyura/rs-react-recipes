import config from '@config/api.config';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { recipeInstructionsResponseSchema, recipesResponseSchema } from '@schemas';
import type { RecipeInstructionsResponse, RecipesResponse } from '@ts-types';

export const recipesApi = createApi({
  reducerPath: 'recipes_api',
  baseQuery: fetchBaseQuery({
    baseUrl: config.API_URL,
  }),
  endpoints: (builder) => ({
    getItems: builder.query<RecipesResponse, Record<string, string>>({
      query: (params) => {
        const requiredParams = new URLSearchParams(params);
        requiredParams.set('select', config.SELECT_RECIPES_PARAM);

        return {
          url: '/search',
          params: requiredParams,
        };
      },
      responseSchema: recipesResponseSchema,
    }),
    getDetails: builder.query<RecipeInstructionsResponse, string>({
      query: (recipeId) => ({
        url: recipeId,
        params: {
          select: config.SELECT_DETAILS_PARAM,
        },
      }),
      responseSchema: recipeInstructionsResponseSchema,
    }),
  }),
});

export const { useGetItemsQuery, useGetDetailsQuery } = recipesApi;
