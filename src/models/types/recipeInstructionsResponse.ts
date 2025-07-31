import type { recipeInstructionsResponseSchema } from '@schemas';
import type { z } from 'zod';

export type RecipeInstructionsResponse = z.infer<typeof recipeInstructionsResponseSchema>;
