"use client";

import type { CSSProperties } from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';
import css from './Intro.module.css';
import SplitText from '@/components/ui/SplitText';

type IntroScene = 'voice' | 'story' | 'awetales' | 'holding' | 'moving' | 'complete';

interface SparkleConfig {
  left: string;
  top: string;
  delay: string;
  duration: string;
}

interface MotionState {
  x: number;
  y: number;
  scale: number;
}

const BODY_PHASE_ATTR = 'data-intro-phase';
const HOLD_DELAY_MS = 300;
const MOVE_DURATION_MS = 800;

export default function Intro() {
  const [scene, setScene] = useState<IntroScene>('voice');
  const [sparkles, setSparkles] = useState<SparkleConfig[]>([]);
  const [motion, setMotion] = useState<MotionState>({ x: 0, y: 0, scale: 1 });
  const motionRef = useRef<HTMLSpanElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const timersRef = useRef<number[]>([]);

  const startHeaderLock = useCallback(() => {
    const source = motionRef.current;
    const target = document.querySelector<HTMLElement>('[data-navbar-logo-anchor]');

    if (source && target) {
      const sourceRect = source.getBoundingClientRect();
      const targetRect = target.getBoundingClientRect();
      const sourceCenterX = sourceRect.left + sourceRect.width / 2;
      const sourceCenterY = sourceRect.top + sourceRect.height / 2;
      const targetCenterX = targetRect.left + targetRect.width / 2;
      const targetCenterY = targetRect.top + targetRect.height / 2;

      setMotion({
        x: targetCenterX - sourceCenterX,
        y: targetCenterY - sourceCenterY,
        scale: Number((targetRect.width / sourceRect.width).toFixed(3)),
      });
    }

    document.body.setAttribute(BODY_PHASE_ATTR, 'moving');

    window.requestAnimationFrame(() => {
      setScene('moving');
    });

    const completionTimer = window.setTimeout(() => {
      document.body.setAttribute(BODY_PHASE_ATTR, 'complete');
      document.body.style.overflow = 'auto';
      setScene('complete');
    }, MOVE_DURATION_MS);

    timersRef.current.push(completionTimer);
  }, []);

  useEffect(() => {
    const timers = timersRef.current;
    let sparkleFrame = 0;

    sparkleFrame = window.requestAnimationFrame(() => {
      setSparkles(
        [...Array(20)].map(() => ({
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          delay: `${Math.random() * 2}s`,
          duration: `${2 + Math.random() * 2}s`,
        }))
      );
    });

    document.body.style.overflow = 'hidden';
    document.body.setAttribute(BODY_PHASE_ATTR, 'intro');

    const schedule = (callback: () => void, delay: number) => {
      const timer = window.setTimeout(callback, delay);
      timers.push(timer);
    };

    schedule(() => {
      setScene('story');
    }, 1200);

    schedule(() => {
      setScene('awetales');
    }, 2400);

    schedule(() => {
      document.body.setAttribute(BODY_PHASE_ATTR, 'holding');
      setScene('holding');
    }, 3200);

    schedule(() => {
      startHeaderLock();
    }, 3200 + HOLD_DELAY_MS);

    return () => {
      window.cancelAnimationFrame(sparkleFrame);
      timers.forEach((timer) => window.clearTimeout(timer));
      timers.length = 0;
      document.body.style.overflow = 'auto';
      document.body.removeAttribute(BODY_PHASE_ATTR);
    };
  }, [startHeaderLock]);

  if (scene === 'complete') {
    return null;
  }

  const showSplitText = scene === 'voice' || scene === 'story';
  const revealBackground = scene === 'holding' || scene === 'moving';
  const moving = scene === 'moving';

  return (
    <div className={`${css.intro} ${revealBackground ? css.backdropLifted : ''}`}>
      <div className={`${css.sparklesWrapper} ${moving ? css.sparklesFading : ''}`}>
        {sparkles.map((sparkle, index) => (
          <div
            key={index}
            className={css.sparkle}
            style={{
              left: sparkle.left,
              top: sparkle.top,
              animationDelay: sparkle.delay,
              animationDuration: sparkle.duration,
            }}
          />
        ))}
      </div>

      <div className={css.content}>
        {scene === 'story' && (
          <div className={css.waveform}>
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>
        )}

        {showSplitText ? (
          <SplitText
            key={scene}
            text={scene === 'voice' ? 'Your Voice...' : 'Becomes a Story...'}
            tag="span"
            className={`${css.text} ${scene === 'voice' ? css.phase1 : css.phase2}`}
            delay={50}
            duration={1.25}
            ease="power3.out"
            splitType="chars"
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
          />
        ) : (
          <div
            ref={trackRef}
            className={`${css.motionTrack} ${moving ? css.motionTrackMoving : ''}`}
            style={
              {
                '--intro-move-x': `${motion.x}px`,
                '--intro-move-y': `${motion.y}px`,
                '--intro-move-scale': motion.scale,
              } as CSSProperties
            }
          >
            <div className={`${css.arcLayer} ${moving ? css.arcLayerMoving : ''}`}>
              <div
                className={`${css.logoLockup} ${scene === 'awetales' ? css.logoEntrance : ''} ${moving ? css.logoLockupMoving : ''}`}
              >
                <span ref={motionRef} className={css.wordmark}>
                  AweTales
                </span>
                <span className={`${css.wordmarkGlow} ${moving ? css.wordmarkGlowFading : ''}`} aria-hidden="true" />
                <span className={`${css.sparkAccent} ${moving ? css.sparkAccentFading : ''}`} aria-hidden="true">
                  *
                </span>
                <span className={`${css.lightTrail} ${moving ? css.lightTrailVisible : ''}`} aria-hidden="true" />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
