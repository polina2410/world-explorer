import styles from './Loading.module.css';

export default function Loading() {
  return (
    <div
      id="loading-screen"
      className={`${styles.loadingWrapper} flex-center`}
      role="status"
      aria-live="polite"
    >
      <div id="loading-spinner" className={styles.spinner} />
    </div>
  );
}
