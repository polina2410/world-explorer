'use client';

import React, { ButtonHTMLAttributes } from 'react';
import styles from './Button.module.css';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  active?: boolean;
};

export default function Button({
  children,
  active = false,
  className = '',
  ...props
}: ButtonProps) {
  return (
    <button
      className={`${styles.button} ${active ? styles.active : ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
