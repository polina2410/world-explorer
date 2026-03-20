import Link from 'next/link';
import { APP_ROUTES } from '@/constants/routes';
import styles from './not-found.module.css';

export default function NotFound() {
  return (
    <div className={`page container flex-center stack ${styles.wrapper}`}>
      <span className={styles.code}>404</span>
      <h1 className={styles.title}>Page not found</h1>
      <p className={styles.description}>
        The page you are looking for does not exist or has been moved.
      </p>
      <Link href={APP_ROUTES.home} className={styles.link}>
        Go back home
      </Link>
    </div>
  );
}
