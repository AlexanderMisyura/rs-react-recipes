import { useBrowserDarkMode } from '@hooks';
import { act, renderHook } from '@testing-library/react';

type MockMediaQueryListener = (event: { matches: boolean }) => void;

describe('useBrowserDarkMode', () => {
  it("should return a correct initial browser's theme mode", () => {
    const hook = renderHook(() => useBrowserDarkMode());

    expect(hook.result.current).toBe(false);
  });

  it("should make an update if browser's theme mode changes", () => {
    const mockedMediaQueryList = {
      matches: false,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    };

    vi.spyOn(window, 'matchMedia').mockReturnValue(
      mockedMediaQueryList as unknown as MediaQueryList
    );

    const hook = renderHook(() => useBrowserDarkMode());

    expect(mockedMediaQueryList.addEventListener).toHaveBeenCalledTimes(1);

    const mockedMediaQueryListener = mockedMediaQueryList.addEventListener.mock
      .calls[0][1] as MockMediaQueryListener;

    act(() => {
      mockedMediaQueryListener({ matches: true });
    });

    expect(hook.result.current).toBe(true);
  });
});
