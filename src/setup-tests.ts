import * as matchers from '@testing-library/jest-dom/matchers';
import { expect } from 'vitest';

window.scrollTo = vi.fn();

beforeAll(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: (query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }),
  });
});

expect.extend(matchers);
