'use client';

import { clsx } from 'clsx/lite';
import { twMerge } from 'tailwind-merge';

interface BowWrapperProps {
  className?: string;
  children: React.ReactNode;
  testId?: string;
  ref?: React.Ref<HTMLDivElement>;
}

export const BoxWrapper: React.FC<BowWrapperProps> = ({ children, className, testId, ref }) => {
  const combinedClasses = twMerge(
    clsx(
      'wrapper text max-w-5xl gap-4 rounded-sm p-4 shadow-xl place-items-center flex-col',
      className
    )
  );

  return (
    <div ref={ref} data-testid={testId} className={combinedClasses}>
      {children}
    </div>
  );
};
