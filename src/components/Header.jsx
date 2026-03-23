import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Header() {
  const location = useLocation();
  const path = location.pathname;

  return (
    <div className="header-wrapper">
      <header className="navbar custom-navbar">
        <div className="logo logo-cursive">
          <Link to="/">Awetales</Link>
        </div>
        <div className="nav-right-cluster">
            <nav className="nav-links">
                <Link to="/" className={path === '/' ? 'active' : ''}>Home</Link>
                <Link to="/about" className={path === '/about' ? 'active' : ''}>About</Link>
                <Link to="/blog" className={path === '/blog' ? 'active' : ''}>Blog</Link>
                <Link to="#">Playground</Link>
            </nav>
            <div className="nav-buttons">
                <Link to="/login"><button className="btn-outline-green">Sign In</button></Link>
                <Link to="/signup"><button className="btn-solid-green">Get Started</button></Link>
            </div>
        </div>
      </header>
    </div>
  );
}

export default Header;
