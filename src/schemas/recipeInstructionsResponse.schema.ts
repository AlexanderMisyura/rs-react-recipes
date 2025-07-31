import { z } from 'zod';

export const recipeInstructionsResponseSchema = z.object({
  id: z.number(),
  instructions: z.array(z.string()),
  name: z.string(),
});
