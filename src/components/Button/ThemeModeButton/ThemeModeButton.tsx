'use client';

import ComputerIcon from '@assets/computer.svg';
import MoonIcon from '@assets/moon.svg';
import SunIcon from '@assets/sun.svg';
import { MODE_TOGGLE_MAP, THEME_MODE } from '@constants';
import { useThemeContext } from '@hooks';
import { clsx } from 'clsx';

const MODE_ICON_MAP = {
  [THEME_MODE.LIGHT]: <SunIcon width={32} height={32} className="h-8" alt="light theme mode" />,
  [THEME_MODE.DARK]: <MoonIcon width={32} height={32} className="h-8" alt="dark theme mode" />,
  [THEME_MODE.SYSTEM]: (
    <ComputerIcon width={32} height={32} className="h-8" alt="system theme mode" />
  ),
} as const;

export const ThemeModeButton: React.FC = () => {
  const { mode, toggleMode } = useThemeContext();
  const { theme } = useThemeContext();

  return (
    <button
      type="button"
      onClick={toggleMode}
      className={clsx(
        'cursor-pointer rounded-md border-2 border-transparent p-2',
        `${theme}-theme-button`
      )}
      title={`change ${mode} mode to ${MODE_TOGGLE_MAP[mode]}`}
    >
      {MODE_ICON_MAP[mode]}
    </button>
  );
};
