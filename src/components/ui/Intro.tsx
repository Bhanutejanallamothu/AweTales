"use client";

import React, { useEffect, useState } from 'react';
import css from './Intro.module.css';
import SplitText from '@/components/ui/SplitText';

interface SparkleConfig {
  left: string;
  top: string;
  delay: string;
  duration: string;
}

export default function Intro() {
  const [text, setText] = useState('Your Voice...');
  const [opacity, setOpacity] = useState(1);
  const [complete, setComplete] = useState(false);
  const [scale, setScale] = useState(false);
  const [sparkles, setSparkles] = useState<SparkleConfig[]>([]);

  useEffect(() => {
    // Generate sparkles configuration on the client to avoid hydration mismatch
    setSparkles([...Array(20)].map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: `${Math.random() * 2}s`,
      duration: `${2 + Math.random() * 2}s`
    })));

    // Disable scrolling while intro plays
    document.body.style.overflow = 'hidden';

    const t1 = setTimeout(() => {
      setText('Becomes a Story...');
    }, 1200);

    const t2 = setTimeout(() => {
      setText('AweTales');
      setScale(true);
    }, 2400);

    const t3 = setTimeout(() => {
      setOpacity(0);
    }, 3500);

    const t4 = setTimeout(() => {
      setComplete(true);
      document.body.style.overflow = 'auto'; // restore scroll
    }, 4000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      document.body.style.overflow = 'auto';
    };
  }, []);

  if (complete) return null;

  return (
    <div className={css.intro} style={{ opacity }}>
      {/* Particles Effect */}
      <div className={css.sparklesWrapper}>
        {sparkles.map((s, i) => (
          <div key={i} className={css.sparkle} style={{
            left: s.left,
            top: s.top,
            animationDelay: s.delay,
            animationDuration: s.duration
          }} />
        ))}
      </div>

      <div className={css.content}>
        {text === 'Becomes a Story...' && (
          <div className={css.waveform}>
            <span/><span/><span/><span/><span/>
          </div>
        )}
        
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <SplitText
            key={text}
            text={text}
            tag="span"
            className={`
              ${css.text} 
              ${text === 'Your Voice...' ? css.phase1 : ''}
              ${text === 'Becomes a Story...' ? css.phase2 : ''}
              ${text === 'AweTales' ? css.phase3 : ''}
              ${scale ? css.scaled : ''}
            `}
            delay={50}
            duration={1.25}
            ease="power3.out"
            splitType="chars"
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
          />
          {text === 'AweTales' && <span className={`${css.text} ${css.finalSparkle}`} style={{ marginLeft: '0.5rem' }}>✨</span>}
        </div>
      </div>
    </div>
  );
}
