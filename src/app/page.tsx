'use client';

import React, { startTransition, useEffect, useEffectEvent, useRef, useState } from 'react';
import css from './page.module.css';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Intro from '@/components/ui/Intro';
import SectionParallaxBackground from '@/components/ui/SectionParallaxBackground';
import SplitText from '@/components/ui/SplitText';

const FRAME_TRANSITION_MS = 920;
const WHEEL_TRIGGER_THRESHOLD = 110;
const TOUCH_TRIGGER_THRESHOLD = 70;

type FrameDirection = 'next' | 'prev';

interface FrameTransition {
  from: number;
  to: number;
  direction: FrameDirection;
}

export default function Home() {
  const [activeFrame, setActiveFrame] = useState(0);
  const [transition, setTransition] = useState<FrameTransition | null>(null);

  const stageRef = useRef<HTMLDivElement>(null);
  const transitionTimeoutRef = useRef<number | null>(null);
  const wheelDeltaRef = useRef(0);
  const touchStartYRef = useRef<number | null>(null);
  const activeFrameRef = useRef(0);
  const transitionRef = useRef<FrameTransition | null>(null);

  useEffect(() => {
    activeFrameRef.current = activeFrame;
  }, [activeFrame]);

  useEffect(() => {
    transitionRef.current = transition;
  }, [transition]);

  useEffect(() => {
    document.documentElement.setAttribute('data-home-book', 'true');
    document.body.setAttribute('data-home-book', 'true');

    return () => {
      document.documentElement.removeAttribute('data-home-book');
      document.body.removeAttribute('data-home-book');

      if (transitionTimeoutRef.current) {
        window.clearTimeout(transitionTimeoutRef.current);
      }
    };
  }, []);

  const isIntroComplete = useEffectEvent(() => {
    const phase = document.body.getAttribute('data-intro-phase');
    return !phase || phase === 'complete';
  });

  const queueFrameTransition = useEffectEvent((direction: FrameDirection) => {
    if (transitionRef.current || !isIntroComplete()) {
      return;
    }

    const nextIndex = direction === 'next' ? activeFrameRef.current + 1 : activeFrameRef.current - 1;

    if (nextIndex < 0 || nextIndex > 3) {
      return;
    }

    const nextTransition = {
      from: activeFrameRef.current,
      to: nextIndex,
      direction,
    } satisfies FrameTransition;

    setTransition(nextTransition);
    transitionRef.current = nextTransition;

    if (transitionTimeoutRef.current) {
      window.clearTimeout(transitionTimeoutRef.current);
    }

    transitionTimeoutRef.current = window.setTimeout(() => {
      startTransition(() => {
        setActiveFrame(nextIndex);
        setTransition(null);
      });

      activeFrameRef.current = nextIndex;
      transitionRef.current = null;
      wheelDeltaRef.current = 0;
      transitionTimeoutRef.current = null;
    }, FRAME_TRANSITION_MS);
  });

  useEffect(() => {
    const stage = stageRef.current;

    if (!stage) {
      return;
    }

    const handleWheel = (event: WheelEvent) => {
      if (!isIntroComplete()) {
        return;
      }

      event.preventDefault();

      if (transitionRef.current || Math.abs(event.deltaY) < 2) {
        return;
      }

      const priorDelta = wheelDeltaRef.current;
      const currentDelta = priorDelta !== 0 && Math.sign(priorDelta) !== Math.sign(event.deltaY) ? event.deltaY : priorDelta + event.deltaY;

      wheelDeltaRef.current = currentDelta;

      if (Math.abs(currentDelta) >= WHEEL_TRIGGER_THRESHOLD) {
        queueFrameTransition(currentDelta > 0 ? 'next' : 'prev');
        wheelDeltaRef.current = 0;
      }
    };

    const handleTouchStart = (event: TouchEvent) => {
      if (!isIntroComplete()) {
        return;
      }

      touchStartYRef.current = event.touches[0]?.clientY ?? null;
    };

    const handleTouchMove = (event: TouchEvent) => {
      if (!isIntroComplete() || transitionRef.current || touchStartYRef.current === null) {
        return;
      }

      const touchY = event.touches[0]?.clientY;

      if (touchY === undefined) {
        return;
      }

      const deltaY = touchStartYRef.current - touchY;

      if (Math.abs(deltaY) > 10) {
        event.preventDefault();
      }

      if (Math.abs(deltaY) >= TOUCH_TRIGGER_THRESHOLD) {
        queueFrameTransition(deltaY > 0 ? 'next' : 'prev');
        touchStartYRef.current = null;
      }
    };

    const handleTouchEnd = () => {
      touchStartYRef.current = null;
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isIntroComplete() || transitionRef.current) {
        return;
      }

      if (['ArrowDown', 'PageDown', ' '].includes(event.key)) {
        event.preventDefault();
        queueFrameTransition('next');
      }

      if (['ArrowUp', 'PageUp'].includes(event.key)) {
        event.preventDefault();
        queueFrameTransition('prev');
      }
    };

    stage.addEventListener('wheel', handleWheel, { passive: false });
    stage.addEventListener('touchstart', handleTouchStart, { passive: true });
    stage.addEventListener('touchmove', handleTouchMove, { passive: false });
    stage.addEventListener('touchend', handleTouchEnd);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      stage.removeEventListener('wheel', handleWheel);
      stage.removeEventListener('touchstart', handleTouchStart);
      stage.removeEventListener('touchmove', handleTouchMove);
      stage.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isIntroComplete, queueFrameTransition]);

  const getFrameStateClass = (index: number) => {
    if (transition) {
      if (index === transition.from) {
        return transition.direction === 'next' ? css.frameLeavingNext : css.frameLeavingPrev;
      }

      if (index === transition.to) {
        return transition.direction === 'next' ? css.frameEnteringNext : css.frameEnteringPrev;
      }
    }

    return index === activeFrame ? css.frameActive : css.frameHidden;
  };

  return (
    <div className={css.page}>
      <Intro />

      <div ref={stageRef} className={css.bookViewport}>
        <div className={`${css.sceneGroup} ${css.heroGroup} ${css.bookFrame} ${getFrameStateClass(0)}`}>
          <div className={css.frameSheet} data-parallax-root>
            <SectionParallaxBackground
              modelPath="/bg/Herosection-bg-1.glb"
              className={css.sectionScene}
              coverScale={1.3}
            />
            <section className={`${css.hero} ${css.snapSection}`} style={{ paddingLeft: 'clamp(2rem, 8vw, 6rem)', alignItems: 'flex-start' }}>
              <div className={css.heroContent}>
                <SplitText
                  text={`Magical\nStorytelling\nwith Your Voice`}
                  className={`text-white ${css.heroTitle} animate-fade-in`}
                  delay={50}
                  duration={1.25}
                  ease="power3.out"
                  splitType="chars"
                  from={{ opacity: 0, y: 40 }}
                  to={{ opacity: 1, y: 0 }}
                  threshold={0.1}
                  rootMargin="-100px"
                  textAlign="left"
                />
                <p
                  className={`${css.heroSubtext} animate-fade-in`}
                  style={{ animationDelay: '0.2s', maxWidth: '800px', margin: '0 0 2rem 0' }}
                >
                  Create personalized audiobooks that bring you and your child closer together. Your voice, their favorite
                  stories, endless magical moments.
                </p>
                <div className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
                  <Button size="lg" variant="primary" href="/signup">
                    Sign Up
                  </Button>
                </div>

                <div
                  className={`animate-fade-in ${css.heroMiniFlow}`}
                  style={{
                    animationDelay: '0.6s',
                    display: 'flex',
                    gap: '1rem',
                    justifyContent: 'flex-start',
                    marginTop: '2rem',
                    fontSize: '0.9rem',
                    opacity: 0.8,
                    fontWeight: 500,
                  }}
                >
                  <span>Record Voice</span>
                  <span>-&gt;</span>
                  <span>Choose Story</span>
                  <span>-&gt;</span>
                  <span>Share Love</span>
                </div>
              </div>
            </section>
          </div>
        </div>

        <div className={`${css.sceneGroup} ${css.middleFrame} ${css.bookFrame} ${getFrameStateClass(1)}`}>
          <div className={css.frameSheet} data-parallax-root>
            <SectionParallaxBackground
              modelPath="/bg/How-it-works-your-voice-section-bg-2.glb"
              className={css.sectionScene}
              coverScale={1.16}
              pointerStrength={0.9}
            />
            <section className={`${css.snapSection} ${css.linkedTopSection} container`}>
              <div className={css.sectionHeader}>
                <h2 className="text-gradient-gold">How It Works</h2>
                <p>Just 3 simple steps to create magical storytelling experiences</p>
              </div>
              <div className={css.stepsGrid}>
                <Card hoverable glow className={css.stepCard}>
                  <div className={css.stepIcon}>Mic</div>
                  <h3>1. Record Voice</h3>
                  <p>Upload a short sample and let AI learn your unique tone and storytelling style.</p>
                </Card>
                <Card hoverable glow className={css.stepCard}>
                  <div className={css.stepIcon}>Books</div>
                  <h3>2. Choose Story</h3>
                  <p>Pick from a library of magical tales, adventures, and bedtime classics.</p>
                </Card>
                <Card hoverable glow className={css.stepCard}>
                  <div className={css.stepIcon}>Love</div>
                  <h3>3. Share Love</h3>
                  <p>Let your child hear your voice anytime, even when you&apos;re away.</p>
                </Card>
              </div>
            </section>

            <section className={`${css.snapSection} ${css.linkedBottomSection} ${css.emotionalSection}`}>
              <div className="container flex-center">
                <div className={css.emotionalContent}>
                  <h2>
                    Your Voice. Their Dreams. <span className="text-gradient">Forever.</span>
                  </h2>
                  <p>
                    Turn everyday bedtime into unforgettable moments. Create stories narrated in your own voice and stay
                    connected with your child even when you&apos;re apart.
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>

        <div className={`${css.sceneGroup} ${css.whyFrame} ${css.bookFrame} ${getFrameStateClass(2)}`}>
          <div className={css.frameSheet} data-parallax-root>
            <SectionParallaxBackground
              modelPath="/bg/Wht-awetales-section-bg-3.glb"
              className={css.sectionScene}
              coverScale={1.16}
              pointerStrength={0.92}
            />
            <section className={`${css.snapSection} ${css.fullFrameSection} container`}>
              <div className={css.sectionHeader}>
                <h2>Why AweTales?</h2>
              </div>
              <div className={css.featuresGrid}>
                {[
                  { title: 'Deeper Emotional Bonds', desc: 'Your voice turns every story into a cherished memory.', icon: 'Heart' },
                  { title: 'Powered by AI', desc: 'Captures tone, warmth, and emotional nuance of your voice.', icon: 'Mind' },
                  { title: 'Always Available', desc: 'Your voice is there even when you are busy or traveling.', icon: 'Globe' },
                  { title: 'Personalized Stories', desc: 'Add child name, characters, and details.', icon: 'Spark' },
                  { title: 'Learning Enhanced', desc: 'Improves comprehension through familiar voice.', icon: 'Grow' },
                  { title: 'Safe & Secure', desc: 'Encrypted voice data. Privacy first.', icon: 'Lock' },
                ].map((feat, i) => (
                  <div key={i} className={css.featureItem}>
                    <div className={css.featureIcon}>{feat.icon}</div>
                    <h4>{feat.title}</h4>
                    <p>{feat.desc}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>

        <div className={`${css.sceneGroup} ${css.bottomFrame} ${css.bookFrame} ${getFrameStateClass(3)}`}>
          <div className={css.frameSheet} data-parallax-root>
            <SectionParallaxBackground
              modelPath="/bg/Families-love-awetales-section-bg-4.glb"
              className={css.sectionScene}
              coverScale={1.18}
              pointerStrength={0.88}
            />
            <section className={`${css.snapSection} ${css.linkedTestimonialsSection} ${css.testimonialsSection}`}>
              <div className="container">
                <div className={css.sectionHeader}>
                  <h2 className="text-gradient-gold">Families Love AweTales</h2>
                </div>
                <div className={css.grid3}>
                  <Card className={css.testimonialCard}>
                    <p>&quot;AweTales transformed our bedtime routine. Even when I travel, my daughter hears my voice.&quot;</p>
                    <div className={css.author}>- Lakshmi N (Working Mom)</div>
                  </Card>
                  <Card className={css.testimonialCard}>
                    <p>&quot;My kids can&apos;t tell the difference. It feels like magic.&quot;</p>
                    <div className={css.author}>- Shiv Kumar (Dad of Two)</div>
                  </Card>
                  <Card className={css.testimonialCard}>
                    <p>&quot;This keeps our connection strong every night.&quot;</p>
                    <div className={css.author}>- Emily Johnson (Mother of One)</div>
                  </Card>
                </div>
              </div>
            </section>

            <section className={`${css.snapSection} ${css.linkedCtaSection} container flex-center`}>
              <Card glow className={css.ctaCard}>
                <h2>Ready to Create Your First Magical Story?</h2>
                <p>Join thousands of families creating meaningful bedtime moments.</p>
                <div style={{ marginTop: '2rem' }}>
                  <Button size="lg" variant="primary" href="/signup">
                    Start Your Free Trial
                  </Button>
                </div>
              </Card>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
