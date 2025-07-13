import type { recipesResponseSchema } from '@schemas';
import type { z } from 'zod';

export type RecipesResponse = z.infer<typeof recipesResponseSchema>;
