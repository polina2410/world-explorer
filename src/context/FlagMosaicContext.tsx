'use client';

import {
  createContext,
  useContext,
  useReducer,
  ReactNode,
  useRef,
} from 'react';

const FLAG_CARD_AUTO_CLOSE_MS = 2500;

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

  const close = () => {
    dispatch({ type: 'CLOSE' });

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  const flip = (name: string) => {
    if (state.flipped === name) {
      close();
      return;
    }

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    dispatch({ type: 'FLIP', name });

    timeoutRef.current = setTimeout(() => {
      dispatch({ type: 'CLOSE' });
    }, FLAG_CARD_AUTO_CLOSE_MS);
  };

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
