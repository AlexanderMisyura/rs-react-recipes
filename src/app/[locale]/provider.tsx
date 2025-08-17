'use client';

import { ThemeProvider } from '@context';
import { store } from '@redux/store';
import { Provider as ReduxProvider } from 'react-redux';

export const Provider: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ThemeProvider>
    <ReduxProvider store={store}>{children}</ReduxProvider>
  </ThemeProvider>
);
