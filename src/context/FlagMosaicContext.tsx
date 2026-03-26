'use client';

import {
  createContext,
  useContext,
  useCallback,
  useEffect,
  useReducer,
  ReactNode,
  useRef,
} from 'react';
import { FLAG_CARD_AUTO_CLOSE_MS } from '@/constants';

type State = {
  flipped: string | null;
};

type Action = { type: 'FLIP'; name: string } | { type: 'CLOSE' };

const FlagMosaicContext = createContext<{
  state: State;
  flip: (name: string) => void;
  close: () => void;
} | null>(null);

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'FLIP':
      return { flipped: action.name };
    case 'CLOSE':
      return { flipped: null };
    default:
      return state;
  }
}

export function FlagMosaicProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { flipped: null });

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const close = useCallback(() => {
    dispatch({ type: 'CLOSE' });
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  }, []);

  const flip = useCallback((name: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    dispatch({ type: 'FLIP', name });
    timeoutRef.current = setTimeout(() => {
      dispatch({ type: 'CLOSE' });
    }, FLAG_CARD_AUTO_CLOSE_MS);
  }, []);

  return (
    <FlagMosaicContext.Provider value={{ state, flip, close }}>
      {children}
    </FlagMosaicContext.Provider>
  );
}

export function useFlagMosaic() {
  const ctx = useContext(FlagMosaicContext);

  if (!ctx) {
    throw new Error('useFlagMosaic must be used inside FlagMosaicProvider');
  }

  return ctx;
}
