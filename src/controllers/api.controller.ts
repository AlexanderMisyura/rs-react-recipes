import config from '@config/api.config';
import { recipesErrorSchema, recipesResponseSchema } from '@schemas';
import type { RecipesResponse } from '@ts-types';

export class ApiController {
  constructor(
    private apiUrl: string,
    private params: Record<string, string>
  ) {}

  public async getItems(params: Record<string, string>): Promise<RecipesResponse> {
    const combinedParams = this.getCombinedParams(params);
    const response = await fetch(`${this.apiUrl}?${combinedParams.toString()}`);

    if (!response.ok) {
      const data = recipesErrorSchema.parse(await response.json());
      throw new Error(data.message);
    }

    const recipesData = recipesResponseSchema.parse(await response.json());
    return recipesData;
  }

  private getCombinedParams(params: Record<string, string>): URLSearchParams {
    const combinedParams = new URLSearchParams();

    Object.entries(this.params).forEach(([key, value]) => {
      combinedParams.append(key, value);
    });
    Object.entries(params).forEach(([key, value]) => {
      combinedParams.append(key, value);
    });

    return combinedParams;
  }
}

const apiController = new ApiController(config.API_URL, { select: config.SELECT_PARAM });

export { apiController };
