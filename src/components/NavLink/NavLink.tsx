'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import styles from './NavLink.module.css';
import { ReactNode } from 'react';
import { APP_ROUTES } from '@/routes/appRoutes';
import { useNavigationGuardContext } from '@/context/NavigationGuardContext';

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
  const router = useRouter();
  const isActive = pathname === href;
  const { guardRef } = useNavigationGuardContext();

  const handleClick = (e: React.MouseEvent) => {
    if (guardRef.current) {
      e.preventDefault();
      guardRef.current(() => {
        onClick?.();
        router.push(href);
      });
      return;
    }
    onClick?.();
  };

  return (
    <Link
      href={href}
      onClick={handleClick}
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
