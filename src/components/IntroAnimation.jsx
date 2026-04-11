import React, { useState, useEffect } from 'react';

const IntroAnimation = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);

  useEffect(() => {
    // Start exit animation after 4.2 seconds
    const exitTimer = setTimeout(() => {
      setIsAnimatingOut(true);
    }, 4200);

    // Completely remove from DOM after 5 seconds (allowing 800ms for exit animation)
    const removeTimer = setTimeout(() => {
      setIsVisible(false);
    }, 5000);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className={`intro-overlay ${isAnimatingOut ? 'fade-out' : ''}`}>
      <div className="intro-content">
        <h1 className="intro-line line-1">Awe</h1>
        <h1 className="intro-line line-2">Tales</h1>
      </div>
    </div>
  );
};

export default IntroAnimation;
