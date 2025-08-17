'use client';

import { Link, usePathname } from '@i18n/navigation';
import { clsx } from 'clsx/lite';

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
