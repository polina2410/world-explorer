import { createPortal } from 'react-dom';
import { useState, useRef, useEffect } from 'react';
import styles from './Tooltip.module.css';

type TooltipProps = {
  content: string;
  children: React.ReactNode;
};

export default function Tooltip({ content, children }: TooltipProps) {
  const [hovered, setHovered] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const wrapperRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!hovered || !wrapperRef.current) return;
    const rect = wrapperRef.current.getBoundingClientRect();
    setCoords({
      top: rect.top + window.scrollY,
      left: rect.left + window.scrollX,
    });
  }, [hovered]);

  return (
    <span
      ref={wrapperRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={styles.wrapper}
    >
      {children}
      {hovered &&
        createPortal(
          <div
            className={styles.tooltip}
            style={{
              top: coords.top - 40,
              left: coords.left,
            }}
          >
            {content}
          </div>,
          document.body
        )}
    </span>
  );
}
