import React from 'react';
import Link from 'next/link';
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';
import css from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={css.footer}>
      <div className={`container ${css.container}`}>
        
        {/* Main Footer Content */}
        <div className={css.grid}>
          {/* Brand Column */}
          <div className={css.brandCol}>
            <Link href="/" className={css.logo}>
              <span className={css.cursive}>Awetales</span>
            </Link>
            <p className={css.description}>
              Creating magical storytelling experiences that bring families closer together, one voice at a time.
            </p>
            <div className={css.socials}>
              <a href="#" aria-label="Facebook"><FaFacebook size={20} /></a>
              <a href="#" aria-label="Twitter"><FaTwitter size={20} /></a>
              <a href="#" aria-label="Instagram"><FaInstagram size={20} /></a>
              <a href="#" aria-label="YouTube"><FaYoutube size={20} /></a>
            </div>
          </div>

          {/* Links Columns */}
          <div className={css.linksGroup}>
            <div className={css.linkCol}>
              <h3 className={css.colTitle}>Product</h3>
              <Link href="#">FAQ</Link>
              <Link href="#">Features</Link>
            </div>

            <div className={css.linkCol}>
              <h3 className={css.colTitle}>Company</h3>
              <Link href="/about">About</Link>
              <Link href="/blog">Blog</Link>
              <Link href="#">Contact</Link>
              <Link href="#">Careers</Link>
            </div>

            <div className={css.linkCol}>
              <h3 className={css.colTitle}>Support</h3>
              <Link href="#">Help Center</Link>
              <Link href="#">Contact Support</Link>
              <Link href="#">Privacy Policy</Link>
              <Link href="#">Terms of Service</Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={css.bottomBar}>
          <p className={css.copyright}>
            &copy; 2026 AweTales. All rights reserved.
          </p>
          <p className={css.madeWith}>
            Made with <span className={css.heart}>💖</span> for families everywhere
          </p>
        </div>

      </div>
    </footer>
  );
}
