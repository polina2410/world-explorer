'use client';

import styles from './Modal.module.css';
import Button from '@/components/UI/Button/Button';
import SecondaryTitle from '@/components/UI/SecondaryTitle/SecondaryTitle';

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
  if (!isOpen) return null;

  return (
    <div
      className={`${styles.overlay} flex-center`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-modal-title"
      onClick={onCancel}
    >
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <SecondaryTitle id="confirm-modal-title">{message}</SecondaryTitle>

        <div className={`${styles.buttons} flex-center`}>
          <Button size="xs" onClick={onCancel}>
            No
          </Button>
          <Button variant="confirm" size="xs" onClick={onConfirm}>
            Yes
          </Button>
        </div>
      </div>
    </div>
  );
}
