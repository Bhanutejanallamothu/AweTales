import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Header() {
  const location = useLocation();
  const path = location.pathname;

  return (
    <div className="header-wrapper">
      <header className="navbar custom-navbar">
        <div className="logo logo-ink">
          <Link to="/">AweTales</Link>
        </div>
        <div className="nav-right-cluster">
            {/* Story Timeline Navbar Concept */}
            <nav className="story-path-nav">
                <div className="path-line"></div>
                <Link to="/" className={`path-item ${path === '/' ? 'active' : ''}`}>
                    <span className="node"></span>
                    Library
                </Link>
                <Link to="/about" className={`path-item ${path === '/about' ? 'active' : ''}`}>
                    <span className="node"></span>
                    Origins
                </Link>
                <Link to="/blog" className={`path-item ${path.includes('/blog') ? 'active' : ''}`}>
                    <span className="node"></span>
                    Chronicles
                </Link>
                <Link to="/voices" className={`path-item ${path === '/voices' ? 'active' : ''}`}>
                    <span className="node"></span>
                    Create Story
                </Link>
            </nav>
            <div className="nav-buttons" style={{display:'flex', gap:'15px'}}>
                <Link to="/login" style={{textDecoration:'none'}}>
                    <button className="btn-enter-story">
                        <i className="fa-solid fa-feather"></i> Enter Story
                    </button>
                </Link>
                <Link to="/signup" style={{textDecoration:'none'}}>
                    <button className="btn-begin-journey">
                        Begin Journey
                    </button>
                </Link>
            </div>
        </div>
      </header>
    </div>
  );
}

export default Header;
