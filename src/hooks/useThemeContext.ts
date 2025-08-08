import { ThemeContext } from '@context';
import { use } from 'react';

export const useThemeContext = () => {
  const themeContext = use(ThemeContext);

  if (!themeContext) {
    throw new Error(
      "ThemeContext doesn't use the default value. It must be used within context provider"
    );
  }

  return themeContext;
};
