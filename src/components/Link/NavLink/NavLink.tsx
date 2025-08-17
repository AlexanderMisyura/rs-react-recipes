'use client';

import { clsx } from 'clsx/lite';
import type { LinkProps } from 'next/link';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavLinkProps extends LinkProps {
  className?: string;
  activeClassName?: string;
  href: string;
  children: React.ReactNode;
}

export const NavLink: React.FC<NavLinkProps> = ({
  children,
  activeClassName,
  className,
  href,
  ...rest
}) => {
  const pathname = usePathname();
  let isActive = false;

  if (pathname) {
    isActive = href.includes(pathname.split('/')[1]);
  }

  return (
    <Link href={href} className={clsx(className, isActive && activeClassName)} {...rest}>
      {children}
    </Link>
  );
};
