import { z } from 'zod';

export const searchFormDataSchema = z.object({
  q: z.string(),
});
