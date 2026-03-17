import React from 'react';

// A Proxy that returns a plain HTML element for any motion.tag access.
// Caches results so React gets the same component reference across renders.
// Used in tests to avoid animation/layout engine issues in jsdom.
const cache = new Map<string, React.ComponentType<React.ComponentPropsWithRef<'div'> & Record<string, unknown>>>();

const motionProxy = new Proxy(
  {},
  {
    get(_target, tag: string) {
      if (cache.has(tag)) return cache.get(tag)!;
      // eslint-disable-next-line react/display-name
      const component = React.forwardRef(
        (
          {
            children,
            // strip motion-only props
            initial: _initial,
            animate: _animate,
            exit: _exit,
            transition: _transition,
            variants: _variants,
            whileHover: _wh,
            whileTap: _wt,
            layout: _layout,
            custom: _custom,
            ...props
          }: React.ComponentPropsWithRef<'div'> & Record<string, unknown>,
          ref
        ) => React.createElement(tag, { ...props, ref }, children)
      );
      cache.set(tag, component as React.ComponentType<React.ComponentPropsWithRef<'div'> & Record<string, unknown>>);
      return component;
    },
  }
);

export const motion = motionProxy;
export const AnimatePresence = ({ children }: { children: React.ReactNode }) => <>{children}</>;
