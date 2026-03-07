'use client';

import { useEffect } from 'react';
import confetti from 'canvas-confetti';

export function useConfetti(durationMs = 3000) {
  useEffect(() => {
    const animationEnd = Date.now() + durationMs;
    const defaults = {
      startVelocity: 30,
      spread: 360,
      ticks: 60,
      zIndex: 1000,
    };

    const interval = window.setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        clearInterval(interval);
        return;
      }

      confetti({
        ...defaults,
        particleCount: 500,
        origin: {
          x: Math.random(),
          y: Math.random() * 0.6,
        },
      });
    }, 250);

    return () => clearInterval(interval);
  }, [durationMs]);
}
