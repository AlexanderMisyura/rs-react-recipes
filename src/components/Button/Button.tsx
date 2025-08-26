'use client';

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
  const combinedClasses = twMerge(clsx(`button`, className));

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
