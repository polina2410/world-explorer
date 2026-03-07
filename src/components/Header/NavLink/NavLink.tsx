'use client';

import Link from 'next/link';
import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import styles from './NavLink.module.css';
import { APP_ROUTES } from '@/routes/appRoutes';

type NavLinkProps = {
  href: (typeof APP_ROUTES)[keyof typeof APP_ROUTES];
  children: ReactNode;
  variant?: 'nav' | 'logo';
};

export function NavLink({ href, children, variant = 'nav' }: NavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={[
        styles.link,
        isActive && styles.active,
        variant === 'logo' && styles.logo,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </Link>
  );
}
