'use client';

import Link from 'next/link';
import { APP_ROUTES } from '@/constants/routes';
import styles from './not-found.module.css';

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function Error({ reset }: ErrorProps) {
  return (
    <div className={`page container flex-center stack ${styles.wrapper}`}>
      <span className={styles.code}>500</span>
      <h1 className={styles.title}>Something went wrong</h1>
      <p className={styles.description}>
        An unexpected error occurred. You can try again or return home.
      </p>
      <div className="flex-center" style={{ gap: 'var(--space-md)' }}>
        <button className={styles.link} onClick={reset}>
          Try again
        </button>
        <Link href={APP_ROUTES.home} className={styles.link}>
          Go back home
        </Link>
      </div>
    </div>
  );
}