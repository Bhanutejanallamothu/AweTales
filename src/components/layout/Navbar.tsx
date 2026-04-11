import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import css from './Navbar.module.css';
import Button from '../ui/Button';

export default function Navbar() {
  const [navVisible, setNavVisible] = useState(true);

  useEffect(() => {
    // If intro hasn't played on this load, hide it and wait for event
    if (!sessionStorage.getItem('introPlayed')) {
      setNavVisible(false);
    }
    
    const handleIntroMorph = () => {
      setNavVisible(true);
    };
    
    window.addEventListener('introMorphStart', handleIntroMorph);
    return () => window.removeEventListener('introMorphStart', handleIntroMorph);
  }, []);

  return (
    <header className={css.header}>
      <div className={`container ${css.container}`}>
        <Link href="/" id="navbar-logo" className={`${css.logo} ${navVisible ? css.logoVisible : css.logoHidden}`}>
          <span className={css.sparkle}>✨</span>
          AweTales
        </Link>
        
        <nav className={`${css.nav} ${navVisible ? css.visible : css.hidden}`}>
          <Link href="/" className={css.link}>Home</Link>
          <Link href="/about" className={css.link}>About</Link>
          <Link href="/blog" className={css.link}>Blog</Link>
        </nav>
        
        <div className={`${css.actions} ${navVisible ? css.visible : css.hidden}`}>
          <Button href="/login" variant="ghost" size="sm">Log In</Button>
          <Button href="/signup" variant="primary" size="sm">Sign Up</Button>
        </div>
      </div>
    </header>
  );
}
