'use client';
import { useEffect } from 'react';

type Options = {
  onCloseAction: () => void;
  ignoreRef?: React.RefObject<HTMLElement | null>;
};

export function useCloseOnAnyClick({ onCloseAction, ignoreRef }: Options) {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ignoreRef?.current && ignoreRef.current.contains(e.target as Node))
        return;
      onCloseAction();
    };

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onCloseAction();
    };

    document.addEventListener('mousedown', handleClick);
    document.addEventListener('keydown', handleEsc);

    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('keydown', handleEsc);
    };
  }, [onCloseAction, ignoreRef]);
}
