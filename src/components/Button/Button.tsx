import { useThemeContext } from '@hooks';
import { clsx } from 'clsx/lite';
import { Link } from 'react-router';
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
      'cursor-pointer rounded-md border-2 border-transparent font-bold shadow-sm tracking-wide',
      'active:shadow-inner',
      `${theme}-button`,
      disabled && 'pointer-events-none opacity-50 hover:border-transparent',
      'transition-colors',
      className
    )
  );

  if (linkTo) {
    return (
      <Link data-testid={testId} to={linkTo} className={combinedClasses} preventScrollReset>
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
