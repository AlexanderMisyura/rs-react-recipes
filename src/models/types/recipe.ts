import type { recipeSchema } from '@schemas';
import type { z } from 'zod';

export type Recipe = z.infer<typeof recipeSchema>;
