'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import styles from './FeedbackModal.module.css';
import Button from '@/components/UI/Button/Button';
import SecondaryTitle from '@/components/UI/SecondaryTitle/SecondaryTitle';
import { SCALE, TRANSITION_OVERLAY } from '@/animations';
import { submitFeedback } from '@/actions/submitFeedback';
import { useFocusTrap } from '@/hooks/useFocusTrap';

type FeedbackModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

type FormState = 'idle' | 'loading' | 'submitted';

export default function FeedbackModal({ isOpen, onClose }: FeedbackModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  useFocusTrap(modalRef, isOpen);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [formState, setFormState] = useState<FormState>('idle');
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setFormState('loading');

    try {
      const result = await submitFeedback({ name, email, message });
      if (result.success) {
        setFormState('submitted');
      } else {
        setError(result.error);
        setFormState('idle');
      }
    } catch {
      setError('Something went wrong. Please try again.');
      setFormState('idle');
    }
  }

  function handleClose() {
    onClose();
    setTimeout(() => {
      setName('');
      setEmail('');
      setMessage('');
      setFormState('idle');
      setError(null);
    }, 300);
  }

  function handleOverlayClick() {
    if (formState !== 'submitted' && (email.trim() || message.trim())) return;
    handleClose();
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={`${styles.overlay} flex-center`}
          role="dialog"
          aria-modal="true"
          aria-labelledby="feedback-modal-title"
          onClick={handleOverlayClick}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={TRANSITION_OVERLAY}
        >
          <motion.div
            ref={modalRef}
            className={styles.modal}
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: SCALE.ENTER, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: SCALE.ENTER, y: 8 }}
            transition={TRANSITION_OVERLAY}
          >
            {formState === 'submitted' ? (
              <div className={`${styles.success} flex-center`}>
                <span className={styles.successIcon} aria-hidden="true">
                  ✓
                </span>
                <SecondaryTitle id="feedback-modal-title">
                  Thank you for your feedback!
                </SecondaryTitle>
                <p className={styles.successText}>
                  I appreciate you taking the time to share your thoughts.
                </p>
                <Button size="xs" onClick={handleClose}>
                  Close
                </Button>
              </div>
            ) : (
              <>
                <SecondaryTitle id="feedback-modal-title">
                  Send Feedback
                </SecondaryTitle>
                <form onSubmit={handleSubmit} className={styles.form}>
                  <div className={styles.field}>
                    <label htmlFor="feedback-name" className={styles.label}>
                      Name <span className={styles.optional}>(optional)</span>
                    </label>
                    <input
                      id="feedback-name"
                      type="text"
                      className={styles.input}
                      placeholder="Your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      maxLength={100}
                      disabled={formState === 'loading'}
                    />
                  </div>
                  <div className={styles.field}>
                    <label htmlFor="feedback-email" className={styles.label}>
                      Email <span className={styles.required}>*</span>
                    </label>
                    <input
                      id="feedback-email"
                      type="email"
                      className={styles.input}
                      placeholder="Your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      maxLength={100}
                      disabled={formState === 'loading'}
                      required
                    />
                  </div>
                  <div className={styles.field}>
                    <label htmlFor="feedback-message" className={styles.label}>
                      Message <span className={styles.required}>*</span>
                    </label>
                    <textarea
                      id="feedback-message"
                      className={styles.textarea}
                      placeholder="Share your thoughts, suggestions, or report a bug…"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      required
                      maxLength={1000}
                      rows={4}
                      disabled={formState === 'loading'}
                    />
                  </div>
                  {error && <p className={styles.error}>{error}</p>}
                  <div className={`${styles.actions} flex-center`}>
                    <Button
                      size="xs"
                      type="button"
                      onClick={handleClose}
                      disabled={formState === 'loading'}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="confirm"
                      size="xs"
                      type="submit"
                      disabled={formState === 'loading' || !message.trim() || !email.trim()}
                    >
                      {formState === 'loading' ? 'Sending…' : 'Send'}
                    </Button>
                  </div>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}