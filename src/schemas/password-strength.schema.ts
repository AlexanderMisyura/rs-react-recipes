import { z } from 'zod';

export const PasswordStrengthSchema = z
  .string()
  .regex(/^(?=.*[A-ZА-Я])/, 'Password must contain at least one uppercase letter')
  .regex(/^(?=.*[a-zа-я])/, 'Password must contain at least one lowercase letter')
  .regex(/^(?=.*[0-9])/, 'Password must contain at least one number')
  .regex(/^(?=.*[!@#$%^&*])/, 'Password must contain at least one special character');
