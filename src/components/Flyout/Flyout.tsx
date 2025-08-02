import { BoxWrapper } from '@components';
import { useThemeContext } from '@hooks';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface FlyoutProps {
  children?: React.ReactNode;
  isOpen?: boolean;
}

export const Flyout: React.FC<FlyoutProps> = ({ children, isOpen }) => {
  const { theme } = useThemeContext();

  return (
    <BoxWrapper
      className={twMerge(
        clsx(
          'fixed right-4 bottom-4 flex translate-y-[calc(100%+1rem)] gap-4 shadow-lg transition-all duration-300 ease-in-out',
          'border-2 border-amber-900 opacity-0',
          `${theme}-text`,
          isOpen && 'translate-y-0 opacity-100'
        )
      )}
      testId={'flyout'}
    >
      {children}
    </BoxWrapper>
  );
};
