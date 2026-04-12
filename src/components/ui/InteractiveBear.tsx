'use client';

import type { KeyboardEvent } from 'react';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import Image from 'next/image';
import css from './InteractiveBear.module.css';

export type BearEmotion = 'idle' | 'talking' | 'wave' | 'jump' | 'nod';

interface InteractiveBearProps {
  emotion?: BearEmotion;
  isTalking?: boolean;
  storyText?: string;
  placement?: 'relative' | 'fixed';
  interactive?: boolean;
  onAdvance?: () => void;
  hint?: string;
}

export default function InteractiveBear({
  emotion,
  isTalking = false,
  storyText = '',
  placement = 'relative',
  interactive = false,
  onAdvance,
  hint,
}: InteractiveBearProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const bearRef = useRef<HTMLDivElement>(null);
  const bubbleRef = useRef<HTMLDivElement>(null);
  const floatTimeline = useRef<gsap.core.Timeline | null>(null);
  const emotionTimeline = useRef<gsap.core.Timeline | null>(null);
  const [displayedText, setDisplayedText] = useState('');

  const activeEmotion = emotion ?? (isTalking ? 'talking' : 'idle');
  const canAdvance = interactive && typeof onAdvance === 'function';

  useEffect(() => {
    let charIndex = 0;
    setDisplayedText('');

    if (!storyText) {
      return undefined;
    }

    const interval = window.setInterval(() => {
      if (charIndex < storyText.length) {
        setDisplayedText((prev) => prev + storyText.charAt(charIndex));
        charIndex += 1;
      } else {
        window.clearInterval(interval);
      }
    }, 38);

    return () => window.clearInterval(interval);
  }, [storyText]);

  useEffect(() => {
    if (!bearRef.current) {
      return undefined;
    }

    gsap.fromTo(
      bearRef.current,
      { scale: 0, rotation: -10, y: 100 },
      { scale: 1, rotation: 0, y: 0, duration: 1.2, ease: 'elastic.out(1, 0.5)' }
    );

    floatTimeline.current = gsap
      .timeline({ repeat: -1, yoyo: true })
      .to(bearRef.current, {
        y: '=-15',
        rotation: 2,
        duration: 3,
        ease: 'sine.inOut',
      });

    return () => {
      floatTimeline.current?.kill();
    };
  }, []);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (!containerRef.current) {
        return;
      }

      const { innerWidth, innerHeight } = window;
      const xPos = (event.clientX / innerWidth - 0.5) * 2;
      const yPos = (event.clientY / innerHeight - 0.5) * 2;

      gsap.to(containerRef.current, {
        rotateY: xPos * 18,
        rotateX: -yPos * 12,
        x: xPos * 24,
        y: yPos * 14,
        duration: 1.4,
        ease: 'power3.out',
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    if (!bearRef.current) {
      return;
    }

    emotionTimeline.current?.kill();

    if (activeEmotion === 'talking') {
      emotionTimeline.current = gsap
        .timeline({ repeat: -1, yoyo: true })
        .to(bearRef.current, {
          scaleY: 1.05,
          scaleX: 0.95,
          duration: 0.15,
          ease: 'sine.inOut',
        });
    } else if (activeEmotion === 'wave') {
      emotionTimeline.current = gsap
        .timeline({ repeat: 2, yoyo: true })
        .to(bearRef.current, { rotation: 15, duration: 0.3, ease: 'sine.inOut' })
        .to(bearRef.current, { rotation: -5, duration: 0.3, ease: 'sine.inOut' })
        .eventCallback('onComplete', () => {
          gsap.to(bearRef.current, { rotation: 0, duration: 0.3 });
        });
    } else if (activeEmotion === 'jump') {
      emotionTimeline.current = gsap
        .timeline()
        .to(bearRef.current, {
          y: '-=60',
          scaleY: 1.1,
          scaleX: 0.9,
          duration: 0.3,
          ease: 'power2.out',
        })
        .to(bearRef.current, {
          y: '+=60',
          scaleY: 0.9,
          scaleX: 1.1,
          duration: 0.3,
          ease: 'bounce.out',
        })
        .to(bearRef.current, { scaleY: 1, scaleX: 1, duration: 0.2 });
    } else if (activeEmotion === 'nod') {
      emotionTimeline.current = gsap
        .timeline({ repeat: 1, yoyo: true })
        .to(bearRef.current, { rotateX: -20, y: 15, duration: 0.25, ease: 'sine.inOut' })
        .to(bearRef.current, { rotateX: 0, y: 0, duration: 0.25, ease: 'sine.inOut' });
    } else {
      gsap.to(bearRef.current, {
        scaleY: 1,
        scaleX: 1,
        rotation: 0,
        rotateX: 0,
        duration: 0.3,
        ease: 'power2.out',
      });
    }

    return () => {
      emotionTimeline.current?.kill();
    };
  }, [activeEmotion]);

  useEffect(() => {
    if (!bubbleRef.current || !storyText) {
      return;
    }

    gsap.fromTo(
      bubbleRef.current,
      { y: 16, scale: 0.92, opacity: 0.4 },
      { y: 0, scale: 1, opacity: 1, duration: 0.45, ease: 'back.out(1.7)' }
    );
  }, [storyText]);

  const handleAdvance = () => {
    if (canAdvance) {
      onAdvance?.();
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!canAdvance) {
      return;
    }

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onAdvance?.();
    }
  };

  return (
    <div
      className={`${css.bearScene} ${placement === 'fixed' ? css.fixedPlacement : ''} ${canAdvance ? css.interactiveScene : ''}`}
    >
      <svg width="0" height="0" className={css.svgFilter}>
        <filter id="paper-boil">
          <feTurbulence type="fractalNoise" baseFrequency="0.01 0.02" numOctaves="2" result="noise">
            <animate
              attributeName="baseFrequency"
              values="0.01 0.02; 0.02 0.01; 0.01 0.02"
              dur="0.4s"
              repeatCount="indefinite"
            />
          </feTurbulence>
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="4" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>

      <div
        ref={containerRef}
        className={`${css.bearContainer} ${canAdvance ? css.clickableContainer : ''}`}
        onClick={handleAdvance}
        onKeyDown={handleKeyDown}
        role={canAdvance ? 'button' : undefined}
        tabIndex={canAdvance ? 0 : undefined}
        aria-label={canAdvance ? 'Advance story bear dialogue' : undefined}
      >
        <div ref={bubbleRef} className={`${css.speechBubble} ${storyText ? css.bubbleVisible : css.bubbleHidden}`}>
          <p>{displayedText}</p>
          {hint ? <span className={css.hintLabel}>{hint}</span> : null}
        </div>

        <div className={css.bearSprite} ref={bearRef}>
          <Image
            src="/storybook_bear_transparent.png"
            alt="Storyteller Bear"
            width={400}
            height={400}
            priority
            className={css.bearImage}
          />
        </div>
      </div>
    </div>
  );
}
