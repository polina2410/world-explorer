import { createPortal } from 'react-dom';
import { useState, useRef, useEffect, useId, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TRANSITION_POPUP } from '@/animations';
import styles from './Tooltip.module.css';

type TooltipProps = {
  content: string;
  children: React.ReactNode;
};

type Coords = {
  top: number;
  left: number;
  flipX: boolean;
  flipY: boolean;
};

const TOOLTIP_MAX_WIDTH = 200;
const TOOLTIP_MAX_HEIGHT = 80;

export default function Tooltip({ content, children }: TooltipProps) {
  const [visible, setVisible] = useState(false);
  const [coords, setCoords] = useState<Coords>({
    top: 0,
    left: 0,
    flipX: false,
    flipY: false,
  });
  const wrapperRef = useRef<HTMLSpanElement>(null);
  const tooltipId = useId();

  const show = useCallback(() => setVisible(true), []);
  const hide = useCallback(() => setVisible(false), []);

  useEffect(() => {
    if (!visible || !wrapperRef.current) return;
    const rect = wrapperRef.current.getBoundingClientRect();
    const flipX = rect.right + TOOLTIP_MAX_WIDTH > window.innerWidth;
    const flipY = rect.bottom + TOOLTIP_MAX_HEIGHT > window.innerHeight;

    setCoords({
      top: flipY ? rect.top : rect.bottom,
      left: flipX ? rect.left : rect.right,
      flipX,
      flipY,
    });
  }, [visible]);

  useEffect(() => {
    if (!visible) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') hide();
    }
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [visible, hide]);

  const transform = [
    coords.flipX ? 'translateX(-100%)' : 'translateX(0%)',
    coords.flipY ? 'translateY(-100%)' : 'translateY(0%)',
  ].join(' ');

  return (
    <span
      ref={wrapperRef}
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
      className={styles.wrapper}
      aria-describedby={visible ? tooltipId : undefined}
    >
      {children}

      {typeof document !== 'undefined' &&
        createPortal(
          <AnimatePresence>
            {visible && (
              <motion.div
                id={tooltipId}
                role="tooltip"
                className={styles.tooltip}
                style={{ top: coords.top, left: coords.left, transform }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={TRANSITION_POPUP}
              >
                {content}
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </span>
  );
}