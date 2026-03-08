'use client';

import React, { ButtonHTMLAttributes } from 'react';
import styles from './Button.module.css';

type ButtonVariant = 'default' | 'start' | 'success' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

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
  size = 'sm',
  ...props
}: ButtonProps) {
  const variantClass = variant !== 'default' ? styles[variant] : '';

  return (
    <button
      aria-pressed={active || undefined}
      className={[
        styles.button,
        active && styles.active,
        variantClass,
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
