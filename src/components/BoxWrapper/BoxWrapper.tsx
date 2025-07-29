import { useThemeContext } from '@hooks';
import { clsx } from 'clsx/lite';
import { twMerge } from 'tailwind-merge';

interface BowWrapperProps {
  className?: string;
  children: React.ReactNode;
  testId?: string;
}

export const BoxWrapper: React.FC<BowWrapperProps> = ({ children, className, testId }) => {
  const { theme } = useThemeContext();

  const combinedClasses = twMerge(
    clsx(
      'rounded-sm bg-amber-50 shadow-xl',
      'p-4 flex flex-col place-items-center gap-4',
      'max-w-5xl',
      `${theme}-wrapper`,
      className
    )
  );

  return (
    <div data-testid={testId} className={combinedClasses}>
      {children}
    </div>
  );
};
