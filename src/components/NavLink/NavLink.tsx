'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './NavLink.module.css';
import { APP_ROUTES } from '@/routes/appRoutes';
import { ReactNode } from 'react';

type NavLinkProps = {
  href: (typeof APP_ROUTES)[keyof typeof APP_ROUTES];
  children: ReactNode;
  variant?: 'nav' | 'logo';
  onClick?: () => void;
};

export function NavLink({
  href,
  children,
  variant = 'nav',
  onClick,
}: NavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      onClick={onClick}
      className={[
        styles.link,
        isActive && styles.active,
        variant === 'logo' && styles.logo,
      ]
        .filter(Boolean)
        .join(' ')}
      aria-current={isActive ? 'page' : undefined}
    >
      {children}
    </Link>
  );
}
