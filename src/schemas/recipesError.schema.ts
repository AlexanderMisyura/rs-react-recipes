import { z } from 'zod';

export const recipesErrorSchema = z.object({
  message: z.string(),
});
