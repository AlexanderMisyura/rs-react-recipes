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
}) => {
  const combinedClasses = twMerge(
    clsx(
      'px-4 py-2',
      'cursor-pointer rounded-md border-2 border-transparent bg-sky-200 font-bold shadow-sm tracking-wide',
      'active:border-sky-200 active:bg-sky-100 active:text-gray-500 active:shadow-inner',
      disabled ? 'pointer-events-none opacity-50' : 'hover:border-sky-300',
      'transition-colors',
      className
    )
  );

  if (linkTo) {
    return (
      <Link data-testid={testId} to={linkTo} className={combinedClasses}>
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
    >
      {children}
    </button>
  );
};
