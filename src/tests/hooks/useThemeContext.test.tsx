import { ThemeContext } from '@context';
import { useThemeContext } from '@hooks';
import { renderHook } from '@testing-library/react';
import type { ThemeContextValue } from '@ts-interfaces';

describe('useThemeContest', () => {
  it("provides the context's data", () => {
    const testContext: ThemeContextValue = { mode: 'system', theme: 'light', toggleMode: vi.fn() };
    const testProvider = ({ children }: { children: React.ReactNode }) => (
      <ThemeContext value={testContext}>{children}</ThemeContext>
    );

    const hook = renderHook(() => useThemeContext(), { wrapper: testProvider });

    expect(hook.result.current).toEqual(testContext);
  });

  it('throws an error when calling without a corresponding context provider', () => {
    expect(() => renderHook(() => useThemeContext())).toThrowError(
      "ThemeContext doesn't use the default value. It must be used within context provider"
    );
  });
});
