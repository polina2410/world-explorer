'use client';

import { motion, HTMLMotionProps } from 'framer-motion';
import React from 'react';
import styles from './Button.module.css';

type ButtonVariant = 'confirm' | 'default' | 'start' | 'success' | 'danger';
type ButtonSize = 'xs' | 'sm' | 'md' | 'lg';

type ButtonProps = HTMLMotionProps<'button'> & {
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
  return (
    <motion.button
      aria-pressed={active || undefined}
      whileTap={{ scale: 0.9 }}
      whileHover={{ scale: 1.1 }}
      transition={{ bounceDamping: 10, bounceStiffness: 600 }}
      className={[
        styles.button,
        active && styles.active,
        variant !== 'default' ? styles[variant] : '',
        styles[size],
      ]
        .filter(Boolean)
        .join(' ')}
      {...props}
    >
      {children}
    </motion.button>
  );
}
