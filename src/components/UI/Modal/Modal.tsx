'use client';

import { motion, AnimatePresence } from 'motion/react';
import styles from './Modal.module.css';
import Button from '@/components/UI/Button/Button';
import SecondaryTitle from '@/components/UI/SecondaryTitle/SecondaryTitle';
import { SCALE } from '@/animations/animations';

type ConfirmModalProps = {
  isOpen: boolean;
  message?: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export default function Modal({
  isOpen,
  message = 'Are you sure?',
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={`${styles.overlay} flex-center`}
          role="dialog"
          aria-modal="true"
          aria-labelledby="confirm-modal-title"
          onClick={onCancel}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            className={styles.modal}
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: SCALE.ENTER, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: SCALE.ENTER, y: 8 }}
            transition={{ duration: 0.2 }}
          >
            <SecondaryTitle id="confirm-modal-title">{message}</SecondaryTitle>

            <div className={`${styles.buttons} flex-center`}>
              <Button size="xs" onClick={onCancel}>
                No
              </Button>
              <Button variant="confirm" size="xs" onClick={onConfirm}>
                Yes
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
