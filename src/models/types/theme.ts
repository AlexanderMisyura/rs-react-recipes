import type { themeModeSchema, themeSchema } from '@schemas';
import type { z } from 'zod';

export type Theme = z.infer<typeof themeSchema>;

export type ThemeMode = z.infer<typeof themeModeSchema>;
