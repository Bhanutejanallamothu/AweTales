'use client';

import { startTransition, useDeferredValue, useEffect, useEffectEvent, useRef, useState } from 'react';
import gsap from 'gsap';
import InteractiveBear, { type BearEmotion } from '@/components/ui/InteractiveBear';
import css from './HomeStoryBear.module.css';

interface StoryScene {
  id: string;
  label: string;
  text: string;
  emotion: BearEmotion;
}

const STORY_SCENES: StoryScene[] = [
  {
    id: 'welcome',
    label: 'Welcome',
    text: "I’m following along. Scroll with me and I’ll keep your story company all the way down the page.",
    emotion: 'wave',
  },
  {
    id: 'steps',
    label: 'How It Works',
    text: 'This is where I perk up and explain the simple magic: voice in, story out, bedtime glow everywhere.',
    emotion: 'talking',
  },
  {
    id: 'dreams',
    label: 'Dreams',
    text: 'Here the mood gets softer, so I sway gently and settle into a warm bedtime rhythm.',
    emotion: 'nod',
  },
  {
    id: 'features',
    label: 'Why AweTales',
    text: 'These are the big delights, so I bounce a little brighter when you reach this part.',
    emotion: 'jump',
  },
  {
    id: 'love',
    label: 'Families Love It',
    text: 'When the happy reviews appear, I wave because this is the part where the heart shows up.',
    emotion: 'wave',
  },
  {
    id: 'cta',
    label: 'Ready',
    text: 'You made it to the ending. Tap me if you want a little extra encouragement before you begin.',
    emotion: 'talking',
  },
];

export default function HomeStoryBear() {
  const [activeSceneId, setActiveSceneId] = useState<string>(STORY_SCENES[0].id);
  const dockRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const deferredSceneId = useDeferredValue(activeSceneId);
  const activeScene = STORY_SCENES.find((scene) => scene.id === deferredSceneId) ?? STORY_SCENES[0];
  const activeSceneIndex = STORY_SCENES.findIndex((scene) => scene.id === activeSceneId);

  const setScene = useEffectEvent((sceneId: string) => {
    startTransition(() => {
      setActiveSceneId((current) => (current === sceneId ? current : sceneId));
    });
  });

  const advanceScene = useEffectEvent(() => {
    const nextScene = STORY_SCENES[(activeSceneIndex + 1) % STORY_SCENES.length];
    setScene(nextScene.id);
  });

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>('[data-bear-scene]'));

    if (!sections.length) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((first, second) => second.intersectionRatio - first.intersectionRatio);

        const nextSceneId = visibleEntries[0]?.target.getAttribute('data-bear-scene');

        if (nextSceneId) {
          setScene(nextSceneId);
        }
      },
      {
        threshold: [0.2, 0.42, 0.6],
        rootMargin: '-18% 0px -24% 0px',
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      observer.disconnect();
    };
  }, [setScene]);

  useEffect(() => {
    let rafId = 0;

    const updateParallax = () => {
      rafId = 0;

      const scrollY = window.scrollY;
      const scrollLimit = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const progress = scrollY / scrollLimit;
      const driftY = Math.sin(scrollY * 0.008) * 16 - progress * 18;
      const driftX = Math.cos(scrollY * 0.0045) * 10;
      const rotation = Math.sin(scrollY * 0.0055) * 2.5;

      if (dockRef.current) {
        gsap.to(dockRef.current, {
          x: driftX,
          y: driftY,
          rotate: rotation,
          duration: 0.65,
          ease: 'power2.out',
          overwrite: true,
        });
      }

      if (glowRef.current) {
        gsap.to(glowRef.current, {
          x: Math.sin(scrollY * 0.0035) * 14,
          y: Math.cos(scrollY * 0.004) * 8,
          scale: 1 + progress * 0.18,
          opacity: 0.48 + Math.sin(scrollY * 0.003) * 0.08,
          duration: 0.8,
          ease: 'sine.out',
          overwrite: true,
        });
      }
    };

    const requestParallax = () => {
      if (!rafId) {
        rafId = window.requestAnimationFrame(updateParallax);
      }
    };

    requestParallax();
    window.addEventListener('scroll', requestParallax, { passive: true });
    window.addEventListener('resize', requestParallax);

    return () => {
      window.removeEventListener('scroll', requestParallax);
      window.removeEventListener('resize', requestParallax);

      if (rafId) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, []);

  return (
    <div className={css.dockWrap}>
      <div ref={dockRef} className={css.dock}>
        <div ref={glowRef} className={css.orbitGlow} aria-hidden="true" />

        <div className={css.interactionLayer}>
          <InteractiveBear
            emotion={activeScene.emotion}
            storyText={activeScene.text}
            interactive
            onAdvance={advanceScene}
            hint={`Tap to preview ${STORY_SCENES[(activeSceneIndex + 1) % STORY_SCENES.length].label}`}
          />
        </div>

        <div className={css.metaCard}>
          <p className={css.kicker}>Story Companion</p>
          <p className={css.sceneLabel}>{activeScene.label}</p>
          <div className={css.progressDots} aria-hidden="true">
            {STORY_SCENES.map((scene) => (
              <span
                key={scene.id}
                className={`${css.progressDot} ${scene.id === activeScene.id ? css.progressDotActive : ''}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
