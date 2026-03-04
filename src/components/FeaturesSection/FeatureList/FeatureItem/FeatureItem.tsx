import React, { ReactNode } from 'react';
import styles from './FeatureItem.module.css';

type FeatureItemProps = {
  children: ReactNode;
};

export default function FeatureItem({ children }: FeatureItemProps) {
  return <li className={styles.featureItem}>{children}</li>;
}
