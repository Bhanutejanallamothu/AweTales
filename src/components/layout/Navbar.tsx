import Link from 'next/link';
import css from './Navbar.module.css';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/blog', label: 'Blog' },
  { href: '/playground', label: 'Playground' },
];

export default function Navbar() {
  return (
    <header className={css.header}>
      <div className={`container ${css.container}`}>
        <div className={css.leftCluster}>
          <Link href="/" className={css.brand} aria-label="AweTales home">
            <span className={css.brandWordmark} data-navbar-logo-anchor>
              AweTales
            </span>
          </Link>

          <nav className={css.nav} aria-label="Primary">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className={css.link}>
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className={css.actions}>
          <Link href="/login" className={`${css.actionButton} ${css.signIn}`}>
            Sign In
          </Link>
          <Link href="/signup" className={`${css.actionButton} ${css.getStarted}`}>
            Get Started
          </Link>
        </div>
      </div>
    </header>
  );
}
