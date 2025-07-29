import '@styles/global.css';

import { ErrorBoundary } from '@components';
import { ThemeProvider } from '@context';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router';
import { router } from 'router';

const root = document.createElement('div');
root.classList.add('flex', 'flex-col', 'grow', 'h-full', 'items-center', 'justify-center');
document.body.append(root);

createRoot(root).render(
  <StrictMode>
    <ErrorBoundary>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </ErrorBoundary>
  </StrictMode>
);
