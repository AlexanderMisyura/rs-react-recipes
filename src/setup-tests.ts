import * as matchers from '@testing-library/jest-dom/matchers';
import { expect } from 'vitest';

window.scrollTo = vi.fn();

expect.extend(matchers);
