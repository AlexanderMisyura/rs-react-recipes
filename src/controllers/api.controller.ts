import config from '@config/api.config';
import { recipesResponseSchema } from '@schemas';
import type { RecipesResponse } from '@ts-types';

export class ApiController {
  constructor(
    private apiUrl: string,
    private params: Record<string, string>
  ) {}

  public async getItems(
    params: Record<string, string>,
    isSearch = false
  ): Promise<RecipesResponse> {
    const combinedParams = this.getCombinedParams(params);
    const endpoint = isSearch ? `${this.apiUrl}/search` : this.apiUrl;

    const response = await fetch(`${endpoint}?${combinedParams.toString()}`);
    const data = recipesResponseSchema.parse(await response.json());

    return data;
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

export default new ApiController(config.API_URL, { select: config.SELECT_PARAM });
