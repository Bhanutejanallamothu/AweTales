import React from 'react';
import Link from 'next/link';
import css from './Navbar.module.css';
import Button from '../ui/Button';

export default function Navbar() {
  return (
    <header className={css.header}>
      <div className={`container ${css.container}`}>
        <Link href="/" className={css.logo}>
          <span className={css.sparkle}>✨</span>
          AweTales
        </Link>
        
        <nav className={css.nav}>
          <Link href="/" className={css.link}>Home</Link>
          <Link href="/about" className={css.link}>About</Link>
          <Link href="/blog" className={css.link}>Blog</Link>
        </nav>
        
        <div className={css.actions}>
          <Button href="/login" variant="ghost" size="sm">Log In</Button>
          <Button href="/signup" variant="primary" size="sm">Sign Up</Button>
        </div>
      </div>
    </header>
  );
}
