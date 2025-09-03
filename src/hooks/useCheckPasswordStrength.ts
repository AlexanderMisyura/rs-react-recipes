import { PasswordStrengthSchema } from '@schemas';
import type { PasswordStrengthKey } from '@ts-types';
import { useState } from 'react';

export const useCheckPasswordStrength = () => {
  const [passwordStrength, setPasswordStrength] = useState<PasswordStrengthKey>(0);

  const checkPasswordStrength = (value: string) => {
    const result = PasswordStrengthSchema.safeParse(value);

    if (!result.success) {
      setPasswordStrength(result.error.issues.length as PasswordStrengthKey);
    } else {
      setPasswordStrength(0);
    }
  };

  return {
    passwordStrength,
    checkPasswordStrength,
  };
};
