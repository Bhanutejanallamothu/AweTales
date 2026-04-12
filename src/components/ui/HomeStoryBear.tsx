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
    text: "I'm following along. Scroll with me and I'll keep your story company all the way down the page.",
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
  const sectionRefs = useRef<HTMLElement[]>([]);
  const wheelLockRef = useRef(false);
  const wheelDeltaRef = useRef(0);
  const wheelResetTimerRef = useRef<number | null>(null);
  const wheelUnlockTimerRef = useRef<number | null>(null);
  const deferredSceneId = useDeferredValue(activeSceneId);
  const activeScene = STORY_SCENES.find((scene) => scene.id === deferredSceneId) ?? STORY_SCENES[0];
  const activeSceneIndex = STORY_SCENES.findIndex((scene) => scene.id === activeSceneId);

  const setScene = useEffectEvent((sceneId: string) => {
    startTransition(() => {
      setActiveSceneId((current) => (current === sceneId ? current : sceneId));
    });
  });

  const scrollToScene = useEffectEvent((sceneId: string) => {
    const section = document.querySelector<HTMLElement>(`[data-bear-scene="${sceneId}"]`);

    if (section) {
      setScene(sceneId);
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });

  const snapToIndex = useEffectEvent((index: number) => {
    const nextIndex = Math.max(0, Math.min(index, STORY_SCENES.length - 1));
    const nextScene = STORY_SCENES[nextIndex];
    const nextSection = sectionRefs.current[nextIndex];

    if (!nextScene || !nextSection) {
      return;
    }

    wheelLockRef.current = true;
    wheelDeltaRef.current = 0;

    if (wheelResetTimerRef.current) {
      window.clearTimeout(wheelResetTimerRef.current);
      wheelResetTimerRef.current = null;
    }

    if (wheelUnlockTimerRef.current) {
      window.clearTimeout(wheelUnlockTimerRef.current);
    }

    setScene(nextScene.id);
    nextSection.scrollIntoView({ behavior: 'smooth', block: 'start' });

    wheelUnlockTimerRef.current = window.setTimeout(() => {
      wheelLockRef.current = false;
    }, 900);
  });

  const advanceScene = useEffectEvent(() => {
    const nextScene = STORY_SCENES[(activeSceneIndex + 1) % STORY_SCENES.length];
    scrollToScene(nextScene.id);
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-home-scroll', 'true');

    return () => {
      document.documentElement.removeAttribute('data-home-scroll');
    };
  }, []);

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>('[data-bear-scene]'));
    sectionRefs.current = sections;

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
        threshold: [0.22, 0.45, 0.68],
        rootMargin: '-12% 0px -18% 0px',
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      observer.disconnect();
      sectionRefs.current = [];
    };
  }, [setScene]);

  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      if (event.ctrlKey || window.innerWidth <= 900 || !sectionRefs.current.length) {
        return;
      }

      const target = event.target as HTMLElement | null;

      if (target?.closest('input, textarea, select, [contenteditable="true"]')) {
        return;
      }

      if (Math.abs(event.deltaY) < 4) {
        return;
      }

      event.preventDefault();

      if (wheelLockRef.current) {
        return;
      }

      if (wheelDeltaRef.current !== 0 && Math.sign(wheelDeltaRef.current) !== Math.sign(event.deltaY)) {
        wheelDeltaRef.current = 0;
      }

      wheelDeltaRef.current += event.deltaY;

      if (wheelResetTimerRef.current) {
        window.clearTimeout(wheelResetTimerRef.current);
      }

      wheelResetTimerRef.current = window.setTimeout(() => {
        wheelDeltaRef.current = 0;
      }, 140);

      if (Math.abs(wheelDeltaRef.current) < 40) {
        return;
      }

      const direction = wheelDeltaRef.current > 0 ? 1 : -1;
      snapToIndex(activeSceneIndex + direction);
    };

    window.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleWheel);

      if (wheelResetTimerRef.current) {
        window.clearTimeout(wheelResetTimerRef.current);
        wheelResetTimerRef.current = null;
      }

      if (wheelUnlockTimerRef.current) {
        window.clearTimeout(wheelUnlockTimerRef.current);
        wheelUnlockTimerRef.current = null;
      }
    };
  }, [activeSceneIndex, snapToIndex]);

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
    <>
      <nav className={css.checkpointRail} aria-label="Home sections">
        {STORY_SCENES.map((scene, index) => (
          <button
            key={scene.id}
            type="button"
            className={`${css.checkpointButton} ${scene.id === activeScene.id ? css.checkpointButtonActive : ''}`}
            onClick={() => scrollToScene(scene.id)}
            aria-label={`Go to ${scene.label}`}
            aria-current={scene.id === activeScene.id ? 'true' : undefined}
          >
            <span className={css.checkpointDot}>{index + 1}</span>
            <span className={css.checkpointLabel}>{scene.label}</span>
          </button>
        ))}
      </nav>

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
    </>
  );
}
