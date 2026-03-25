import React, { useEffect } from 'react';
import Lenis from 'lenis';

function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: true,
      smoothWheel: true,
      gestureOrientation: 'vertical',
      lerp: 0.08,
      wheelMultiplier: 0.9,
      touchMultiplier: 1,
      overscroll: true,
      anchors: true,
    });

    return () => {
      lenis.destroy();
    };
  }, []);

  return null;
}

export default SmoothScroll;
