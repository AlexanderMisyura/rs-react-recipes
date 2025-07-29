import { THEME, THEME_MODE } from '@constants';
import { z } from 'zod';

export const themeSchema = z.enum(Object.values(THEME));

export const themeModeSchema = z.enum(Object.values(THEME_MODE));
