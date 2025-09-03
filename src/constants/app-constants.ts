export const PORTAL_ROOT_ID = 'portal-root';
export const GENDERS = ['Male', 'Female'] as const;
export const IMAGE_TYPES = ['image/jpg', 'image/jpeg', 'image/png'] as const;
export const MAX_IMAGE_SIZE = 1024 * 1024 * 3;

export const PASSWORD_STRENGTH_MAP = {
  0: 'Strong',
  1: 'Medium',
  2: 'Medium',
  3: 'Medium',
  4: 'Weak',
} as const;
