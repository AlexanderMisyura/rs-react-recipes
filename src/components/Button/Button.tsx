import { clsx } from 'clsx/lite';
import { twMerge } from 'tailwind-merge';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClickHandler?: () => void;
  testId?: string;
}

export const Button: React.FC<ButtonProps> = ({
  type,
  children,
  onClickHandler,
  className,
  testId,
}) => {
  const combinedClasses = twMerge(
    clsx(
      'px-4 py-2',
      'cursor-pointer rounded-md border-2 border-transparent bg-sky-200 font-bold shadow-sm tracking-wide',
      'hover:border-sky-300',
      'active:border-sky-200 active:bg-sky-100 active:text-gray-500 active:shadow-inner',
      'transition-colors',
      className
    )
  );

  return (
    <button
      data-testid={testId}
      type={type ?? 'button'}
      className={combinedClasses}
      onClick={onClickHandler}
    >
      {children}
    </button>
  );
};
