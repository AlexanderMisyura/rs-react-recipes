import '@styles/global.css';

import { ErrorBoundary } from '@components';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { App } from './App.tsx';

const root = document.createElement('div');
root.classList.add('flex', 'flex-col', 'grow', 'h-full', 'items-center', 'justify-center');
document.body.append(root);

createRoot(root).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>
);
