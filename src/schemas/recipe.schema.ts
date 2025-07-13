import { z } from 'zod';

export const recipeSchema = z.object({
  id: z.number(),
  name: z.string(),
  image: z.string(),
  ingredients: z.array(z.string()),
});
