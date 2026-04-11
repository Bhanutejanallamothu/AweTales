import React from 'react';
import css from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={css.footer}>
      <div className={`container ${css.container}`}>
        <p className={css.text}>
          ✨ Bringing families closer, one story at a time.
        </p>
        <p className={css.copyright}>
          &copy; {new Date().getFullYear()} AweTales. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
