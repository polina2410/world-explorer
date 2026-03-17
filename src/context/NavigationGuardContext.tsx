'use client';

import { createContext, useContext, useRef, ReactNode } from 'react';

type GuardFn = (proceed: () => void) => void;

type NavigationGuardContextType = {
  guardRef: React.MutableRefObject<GuardFn | null>;
};

const NavigationGuardContext = createContext<NavigationGuardContextType>({
  guardRef: { current: null },
});

export function NavigationGuardProvider({ children }: { children: ReactNode }) {
  const guardRef = useRef<GuardFn | null>(null);

  return (
    <NavigationGuardContext.Provider value={{ guardRef }}>
      {children}
    </NavigationGuardContext.Provider>
  );
}

export function useNavigationGuardContext() {
  return useContext(NavigationGuardContext);
}
