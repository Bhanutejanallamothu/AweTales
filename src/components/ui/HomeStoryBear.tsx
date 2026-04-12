'use client';

import { startTransition, useEffect, useEffectEvent, useState } from 'react';
import InteractiveBear, { type BearEmotion } from '@/components/ui/InteractiveBear';
import css from './HomeStoryBear.module.css';

interface DialogueLine {
  label: string;
  text: string;
  emotion: BearEmotion;
}

const HOME_DIALOGUES: DialogueLine[] = [
  {
    label: 'Hello',
    text: "Hi there. I'm the AweTales bear, and I love welcoming new little dreamers.",
    emotion: 'wave',
  },
  {
    label: 'Talk',
    text: 'When I tell a story, I wiggle and chatter so every word feels alive.',
    emotion: 'talking',
  },
  {
    label: 'Magic',
    text: 'The moment the magic starts, I bounce like I just found the best bedtime adventure ever.',
    emotion: 'jump',
  },
  {
    label: 'Goodnight',
    text: 'And when the story turns gentle, I slow down and nod softly with the rhythm of the tale.',
    emotion: 'nod',
  },
];

export default function HomeStoryBear() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeDialogue = HOME_DIALOGUES[activeIndex];

  const goToIndex = (index: number) => {
    startTransition(() => {
      setActiveIndex(index);
    });
  };

  const advanceDialogue = useEffectEvent(() => {
    startTransition(() => {
      setActiveIndex((current) => (current + 1) % HOME_DIALOGUES.length);
    });
  });

  useEffect(() => {
    const timer = window.setTimeout(() => {
      advanceDialogue();
    }, 4300);

    return () => window.clearTimeout(timer);
  }, [activeIndex, advanceDialogue]);

  return (
    <div className={css.wrapper}>
      <div className={css.stage}>
        <div className={css.stageGlow} aria-hidden="true" />
        <InteractiveBear
          emotion={activeDialogue.emotion}
          storyText={activeDialogue.text}
          interactive
          onAdvance={advanceDialogue}
          hint="Tap the bear to hear the next line"
        />
      </div>

      <div className={css.controls}>
        <p className={css.kicker}>Interactive Story Bear</p>
        <p className={css.caption}>Each dialogue line triggers its own motion. Tap the bear or choose a moment below.</p>

        <div className={css.buttonRow}>
          {HOME_DIALOGUES.map((dialogue, index) => (
            <button
              key={dialogue.label}
              type="button"
              className={`${css.controlButton} ${index === activeIndex ? css.controlButtonActive : ''}`}
              onClick={() => goToIndex(index)}
              aria-pressed={index === activeIndex}
            >
              {dialogue.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
