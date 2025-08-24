import { GENDERS, IMAGE_TYPES, MAX_IMAGE_SIZE } from '@constants';
import { z } from 'zod';

export const UserNameSchema = z
  .string()
  .refine((name) => {
    if (!name) {
      return false;
    }
    return name[0].toUpperCase() === name[0];
  }, 'Name must start with a capital letter')
  .nonempty('Name is required');

export const AgeSchema = z.int('Age must be an integer').positive('Age must be a positive number');

export const EmailSchema = z.email('Invalid email address');

export const PasswordSchema = z.string().nonempty('Password is required');

export const ConfirmPasswordSchema = z.string().nonempty('Confirm password is required');

export const CountrySchema = z.string().nonempty('Country is required');

export const GenderSchema = z.literal(GENDERS, 'Gender is required');

export const ImageSchema = z
  .file('Image is required')
  .min(1, 'Image is required')
  .max(MAX_IMAGE_SIZE, 'Image size must be less than 3MB')
  .mime([...IMAGE_TYPES], 'Only jpeg, jpg, and png formats are allowed');

export const TermsSchema = z.literal(true, 'You must accept the Terms and Conditions');

export const UserSchema = z
  .object({
    name: UserNameSchema,
    age: AgeSchema,
    email: EmailSchema,
    password: PasswordSchema,
    confirmPassword: ConfirmPasswordSchema,
    country: CountrySchema,
    gender: GenderSchema,
    image: ImageSchema,
    areTermsAccepted: TermsSchema,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
    when(payload) {
      return UserSchema.pick({ password: true, confirmPassword: true }).safeParse(payload.value)
        .success;
    },
  });
