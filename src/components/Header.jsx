import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

function Header() {
  const location = useLocation();
  const path = location.pathname;

  return (
    <motion.div 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="header-wrapper"
    >
      <header className="navbar custom-navbar">
        <div className="nav-right-cluster">
            <nav className="story-path-nav">
                <div className="path-line"></div>
                <Link to="/" className={`path-item ${path === '/' ? 'active' : ''}`}>
                    <motion.span className="node" whileHover={{ scale: 1.5, borderColor: '#fbbf24', backgroundColor: '#fbbf24' }}></motion.span>
                    Library
                </Link>
                <Link to="/about" className={`path-item ${path === '/about' ? 'active' : ''}`}>
                    <motion.span className="node" whileHover={{ scale: 1.5, borderColor: '#fbbf24', backgroundColor: '#fbbf24' }}></motion.span>
                    Origins
                </Link>
                <Link to="/blog" className={`path-item ${path.includes('/blog') ? 'active' : ''}`}>
                    <motion.span className="node" whileHover={{ scale: 1.5, borderColor: '#fbbf24', backgroundColor: '#fbbf24' }}></motion.span>
                    Chronicles
                </Link>
                <Link to="/voices" className={`path-item ${path === '/voices' ? 'active' : ''}`}>
                    <motion.span className="node" whileHover={{ scale: 1.5, borderColor: '#fbbf24', backgroundColor: '#fbbf24' }}></motion.span>
                    Create Story
                </Link>
            </nav>
            <div className="nav-buttons" style={{display:'flex', gap:'15px'}}>
                <Link to="/login" style={{textDecoration:'none'}}>
                    <motion.button 
                      className="btn-enter-story"
                      whileHover={{ scale: 1.05, boxShadow: '0 8px 25px rgba(0,0,0,0.1)' }}
                      whileTap={{ scale: 0.95 }}
                    >
                        <i className="fa-solid fa-feather"></i> Enter Story
                    </motion.button>
                </Link>
                <Link to="/signup" style={{textDecoration:'none'}}>
                    <motion.button 
                      className="btn-begin-journey"
                      whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(245, 158, 11, 0.4)' }}
                      whileTap={{ scale: 0.95 }}
                    >
                        Begin Journey
                    </motion.button>
                </Link>
            </div>
        </div>
      </header>
    </motion.div>
  );
}

export default Header;
