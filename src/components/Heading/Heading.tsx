import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface HeadingProps {
  className?: string;
  children: React.ReactNode;
}

export const Heading: React.FC<HeadingProps> = ({ children, className }) => {
  const combinedClasses = twMerge(
    clsx('text-center text-2xl font-bold text-orange-900', className)
  );

  return <h1 className={combinedClasses}>{children}</h1>;
};
