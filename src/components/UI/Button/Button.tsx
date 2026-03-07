'use client';

import React, { ButtonHTMLAttributes } from 'react';
import styles from './Button.module.css';

type ButtonVariant = 'default' | 'start' | 'success' | 'danger';
type ButtonSize = 'md' | 'lg';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  active?: boolean;
  variant?: ButtonVariant;
  size?: ButtonSize;
};

export default function Button({
  children,
  active = false,
  variant = 'default',
  size,
  ...props
}: ButtonProps) {
  return (
    <button
      className={[
        styles.button,
        active && styles.active,
        variant !== 'default' && styles[variant],
        size && styles[size],
      ]
        .filter(Boolean)
        .join(' ')}
      {...props}
    >
      {children}
    </button>
  );
}
