import { z } from 'zod';

export const searchFormDataSchema = z.object({
  searchString: z.string(),
});
