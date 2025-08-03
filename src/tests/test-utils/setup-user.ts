import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { ReactNode } from 'react';

export function setupUser(
  jsx: ReactNode,
  wrapper?: React.JSXElementConstructor<{ children: React.ReactNode }>
) {
  return {
    user: userEvent.setup(),
    ...render(jsx, { wrapper }),
  };
}
