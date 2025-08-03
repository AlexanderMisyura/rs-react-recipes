import computerIcon from '@assets/computer.svg';
import moonIcon from '@assets/moon.svg';
import sunIcon from '@assets/sun.svg';
import { MODE_TOGGLE_MAP, THEME_MODE } from '@constants';
import { useThemeContext } from '@hooks';
import { clsx } from 'clsx';

const MODE_ICON_MAP = {
  [THEME_MODE.LIGHT]: sunIcon,
  [THEME_MODE.DARK]: moonIcon,
  [THEME_MODE.SYSTEM]: computerIcon,
} as const;

export const ThemeModeButton = () => {
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
      <img src={MODE_ICON_MAP[mode]} alt={`${MODE_TOGGLE_MAP[mode]} theme mode`} className="h-8" />
    </button>
  );
};
