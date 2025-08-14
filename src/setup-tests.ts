import * as matchers from '@testing-library/jest-dom/matchers';
import { mockServer } from '@tests-mocks';
import { expect } from 'vitest';

window.scrollTo = vi.fn();

Element.prototype.scrollIntoView = vi.fn();

beforeAll(() => {
  mockServer.listen({ onUnhandledRequest: 'error' });

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

afterEach(() => {
  mockServer.resetHandlers();
});
afterAll(() => {
  mockServer.close();
});

expect.extend(matchers);
