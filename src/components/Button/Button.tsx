'use client';

import { useThemeContext } from '@hooks';
import { Link } from '@i18n/navigation';
import { clsx } from 'clsx/lite';
import { twMerge } from 'tailwind-merge';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClickHandler?: () => void;
  testId?: string;
  linkTo?: string;
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  type,
  children,
  onClickHandler,
  className,
  testId,
  linkTo,
  disabled,
  ...rest
}) => {
  const { theme } = useThemeContext();
  const combinedClasses = twMerge(
    clsx(
      'px-4 py-2',
      'cursor-pointer text-center text-orange-900 rounded-md border-2 border-transparent font-bold shadow-sm tracking-wide',
      'active:shadow-inner',
      `${theme}-button`,
      disabled && 'pointer-events-none opacity-50 hover:border-transparent',
      'transition-colors',
      className
    )
  );

  if (linkTo) {
    return (
      <Link data-testid={testId} href={linkTo} className={combinedClasses}>
        {children}
      </Link>
    );
  }

  return (
    <button
      data-testid={testId}
      type={type ?? 'button'}
      className={combinedClasses}
      onClick={onClickHandler}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
};
