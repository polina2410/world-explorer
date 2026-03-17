import { createPortal } from 'react-dom';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
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
  const [hovered, setHovered] = useState(false);
  const [coords, setCoords] = useState<Coords>({
    top: 0,
    left: 0,
    flipX: false,
    flipY: false,
  });
  const wrapperRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!hovered || !wrapperRef.current) return;
    const rect = wrapperRef.current.getBoundingClientRect();
    const flipX = rect.right + TOOLTIP_MAX_WIDTH > window.innerWidth;
    const flipY = rect.bottom + TOOLTIP_MAX_HEIGHT > window.innerHeight;

    setCoords({
      top: flipY ? rect.top : rect.bottom,
      left: flipX ? rect.left : rect.right,
      flipX,
      flipY,
    });
  }, [hovered]);

  const transform = [
    coords.flipX ? 'translateX(-100%)' : 'translateX(0%)',
    coords.flipY ? 'translateY(-100%)' : 'translateY(0%)',
  ].join(' ');

  return (
    <span
      id="tooltip-trigger"
      ref={wrapperRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={styles.wrapper}
    >
      {children}

      {typeof document !== 'undefined' &&
        createPortal(
          <AnimatePresence>
            {hovered && (
              <motion.div
                id="tooltip-portal"
                className={styles.tooltip}
                style={{ top: coords.top, left: coords.left, transform }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
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
