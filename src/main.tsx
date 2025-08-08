import '@styles/global.css';

import { ErrorBoundary } from '@components';
import { ThemeProvider } from '@context';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider as ReduxProvider } from 'react-redux';
import { RouterProvider } from 'react-router';
import { setupStore } from 'redux/store';
import { router } from 'router';

const root = document.createElement('div');
root.classList.add('flex', 'flex-col', 'grow', 'h-full', 'items-center', 'justify-center');
document.body.append(root);

const store = setupStore();

createRoot(root).render(
  <StrictMode>
    <ThemeProvider>
      <ErrorBoundary>
        <ReduxProvider store={store}>
          <RouterProvider router={router} />
        </ReduxProvider>
      </ErrorBoundary>
    </ThemeProvider>
  </StrictMode>
);
