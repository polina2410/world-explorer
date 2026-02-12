import styles from './Loader.module.css';

export default function Loading() {
  return (
    <div className={`${styles.loadingWrapper} flex-center`}>
      <div className={styles.spinner} />
    </div>
  );
}
