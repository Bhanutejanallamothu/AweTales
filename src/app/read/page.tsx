'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import InteractiveBear from '@/components/ui/InteractiveBear';
import css from './read.module.css';

const SAMPLE_STORY = [
  "Once upon a time, deep in the glimmering forests of AweTales...",
  "Lived a tiny little bear who loved nothing more than magical stories.",
  "Every night, the stars would whisper ancient secrets from the galaxy.",
  "And if you listen very closely, you might just hear them too!"
];

export default function StoryReader() {
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isTalking, setIsTalking] = useState(false);

  useEffect(() => {
    // Hide standard navbar and footer while in the theater
    document.body.classList.add('theater-mode');
    
    // Simulate reading line by line
    let charIndex = 0;
    const sentence = SAMPLE_STORY[currentSentenceIndex];
    let typingInterval: NodeJS.Timeout;
    
    // Start talking
    setIsTalking(true);
    setDisplayedText('');

    const typeChar = () => {
      if (charIndex < sentence.length) {
        setDisplayedText(prev => prev + sentence.charAt(charIndex));
        charIndex++;
        typingInterval = setTimeout(typeChar, 40 + Math.random() * 40); // Random human-like typing speed
      } else {
        // Stop talking when sentence is finished
        setIsTalking(false);
        
        // Wait before next sentence
        setTimeout(() => {
          if (currentSentenceIndex < SAMPLE_STORY.length - 1) {
            setCurrentSentenceIndex(prev => prev + 1);
          }
        }, 3000);
      }
    };

    // Delay start slightly
    const startTimeout = setTimeout(typeChar, 1500);

    return () => {
      clearTimeout(startTimeout);
      clearTimeout(typingInterval);
      document.body.classList.remove('theater-mode');
    };
  }, [currentSentenceIndex]);

  return (
    <div className={css.theaterPage}>
      {/* Immersive background decoration */}
      <div className={css.ambientGlow} />
      <div className={css.starsOverlay} />

      {/* Navigation Overlay */}
      <nav className={css.theaterNav}>
        <Link href="/dashboard" className={css.backButton}>
          <ArrowLeft size={20} />
          <span>Exit Theater</span>
        </Link>
      </nav>

      {/* Main Feature */}
      <InteractiveBear 
        isTalking={isTalking} 
        storyText={displayedText} 
      />
    </div>
  );
}
