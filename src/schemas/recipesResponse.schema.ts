import { recipeSchema } from '@schemas';
import { z } from 'zod';
export const recipesResponseSchema = z.object({
  recipes: z.array(recipeSchema),
  skip: z.number(),
  total: z.number(),
  limit: z.optional(z.number()),
});
