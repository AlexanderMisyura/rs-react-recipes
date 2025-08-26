'use client';

import { Link, usePathname } from '@i18n/navigation';
import { clsx } from 'clsx/lite';
import { useRef } from 'react';

interface NavLinkProps {
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
  const isActiveRef = useRef(false);

  if (pathname) {
    isActiveRef.current = href.includes(pathname.split('/')[1]);
  }

  return (
    <Link href={href} className={clsx(className, isActiveRef.current && activeClassName)} {...rest}>
      {children}
    </Link>
  );
};
