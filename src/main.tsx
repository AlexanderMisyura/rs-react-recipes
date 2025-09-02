import '@styles/global.css';

import { createRoot } from 'react-dom/client';

import { App } from './app.tsx';

const root = document.createElement('div');
root.id = 'root';
document.body.append(root);

createRoot(root).render(<App />);
