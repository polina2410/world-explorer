import { useEffect } from 'react';
import confetti from 'canvas-confetti';

export function useConfetti(scorePercent: number, durationMs = 3000) {
  useEffect(() => {
    if (scorePercent < 50) return;

    const animationEnd = Date.now() + durationMs;

    let particleCount = 60;
    let spread = 70;
    let velocity = 25;

    if (scorePercent >= 70) {
      particleCount = 120;
      spread = 90;
      velocity = 30;
    }

    if (scorePercent === 100) {
      particleCount = 200;
      spread = 120;
      velocity = 35;
    }

    const interval = window.setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        clearInterval(interval);

        if (scorePercent === 100) {
          confetti({
            particleCount: 400,
            spread: 360,
            startVelocity: 40,
            origin: { x: 0.5, y: 0.4 },
            zIndex: 1000,
          });
        }

        return;
      }

      confetti({
        particleCount,
        spread,
        startVelocity: velocity,
        origin: { x: 0, y: 0.8 },
        angle: 60,
        zIndex: 1000,
      });

      confetti({
        particleCount,
        spread,
        startVelocity: velocity,
        origin: { x: 1, y: 0.8 },
        angle: 120,
        zIndex: 1000,
      });
    }, 350);

    return () => clearInterval(interval);
  }, [scorePercent, durationMs]);
}
