import computerIcon from '@assets/computer.svg';
import moonIcon from '@assets/moon.svg';
import sunIcon from '@assets/sun.svg';
import { MODE_TOGGLE_MAP, THEME_MODE } from '@constants';
import { useThemeContext } from '@hooks';
import { useState } from 'react';

const MODE_ICON_MAP = {
  [THEME_MODE.LIGHT]: sunIcon,
  [THEME_MODE.DARK]: moonIcon,
  [THEME_MODE.SYSTEM]: computerIcon,
} as const;

export const ThemeModeButton = () => {
  const { mode, toggleMode } = useThemeContext();
  const [icon, setIcon] = useState<string>(MODE_ICON_MAP[mode]);

  const changeToHoverIcon = () => {
    setIcon(MODE_ICON_MAP[MODE_TOGGLE_MAP[mode]]);
  };

  const changeToDefaultIcon = () => {
    setIcon(MODE_ICON_MAP[mode]);
  };

  return (
    <button
      type="button"
      onClick={toggleMode}
      onMouseOver={changeToHoverIcon}
      onFocus={changeToHoverIcon}
      onMouseOut={changeToDefaultIcon}
      onBlur={changeToDefaultIcon}
      className="cursor-pointer p-2"
      title={`change to ${MODE_TOGGLE_MAP[mode]} theme mode`}
    >
      <img src={icon} alt={`${MODE_TOGGLE_MAP[mode]} theme mode`} className="h-8" />
    </button>
  );
};
