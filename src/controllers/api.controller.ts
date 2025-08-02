import config from '@config/api.config';
import {
  recipeInstructionsResponseSchema,
  recipesErrorSchema,
  recipesResponseSchema,
} from '@schemas';
import type { RecipeInstructionsResponse, RecipesResponse } from '@ts-types';

export class ApiController {
  constructor(
    private readonly apiUrl: string,
    private readonly recipesParams: Record<string, string>,
    private readonly detailsParams: Record<string, string>
  ) {}

  public async getItems(params: Record<string, string>): Promise<RecipesResponse> {
    const combinedParams = this.getCombinedParams(this.recipesParams, params);
    const response = await fetch(`${this.apiUrl}/search?${combinedParams.toString()}`);

    if (!response.ok) {
      const data = recipesErrorSchema.parse(await response.json());
      throw new Error(data.message);
    }

    const recipesData = recipesResponseSchema.parse(await response.json());
    return recipesData;
  }

  public async getDetails(recipeId: string): Promise<RecipeInstructionsResponse> {
    const combinedParams = this.getCombinedParams(this.detailsParams);

    const response = await fetch(`${this.apiUrl}/${recipeId}?${combinedParams.toString()}`);

    if (!response.ok) {
      const data = recipesErrorSchema.parse(await response.json());
      throw new Error(data.message);
    }

    const recipeData = recipeInstructionsResponseSchema.parse(await response.json());
    return recipeData;
  }

  private getCombinedParams(
    innerParams: Record<string, string>,
    params?: Record<string, string>
  ): URLSearchParams {
    const combinedParams = new URLSearchParams();

    Object.entries(innerParams).forEach(([key, value]) => {
      combinedParams.append(key, value);
    });

    if (!params) {
      return combinedParams;
    }

    Object.entries(params).forEach(([key, value]) => {
      combinedParams.append(key, value);
    });

    return combinedParams;
  }
}

const apiController = new ApiController(
  config.API_URL,
  { select: config.SELECT_RECIPES_PARAM },
  { select: config.SELECT_DETAILS_PARAM }
);

export { apiController };
