import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';

function Profile() {
  return (
    <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 1.05 }}
        transition={{ duration: 0.6 }}
    >
      <Header />
      <main className="book-layout-wrapper">
          <div className="desk-atmosphere">
              <div className="desk-lamp-glow"></div>
          </div>
          
          <div className="open-book-container">
              <div className="bookmark-ribbon-long"></div>
              
              {/* Left Page (Children) */}
              <div className="book-page book-page-left">
                  <h1 className="page-title">Little Heroes of Your Stories</h1>
                  <p className="page-subtitle">Add a child to begin their story journey.</p>
                  
                  <div className="children-list">
                      <motion.div whileHover={{ scale: 1.02, x: 5 }} className="child-hero-card">
                          <div className="child-avatar"><i className="fa-solid fa-face-smile"></i></div>
                          <div className="child-details">
                              <h4>Leo</h4>
                              <p><i className="fa-solid fa-sun"></i> Favorite Story: The Brave Dragon</p>
                          </div>
                      </motion.div>
                      <motion.div whileHover={{ scale: 1.02, x: 5 }} className="child-hero-card">
                          <div className="child-avatar"><i className="fa-solid fa-face-laugh-beam"></i></div>
                          <div className="child-details">
                              <h4>Maya</h4>
                              <p><i className="fa-solid fa-sun"></i> Favorite Story: Whispers of the Morning</p>
                          </div>
                      </motion.div>
                  </div>
                  
                  <motion.button 
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="btn-enter-story" 
                      style={{marginTop:'30px'}}
                  >
                      <i className="fa-solid fa-plus"></i> Add New Story Hero
                  </motion.button>
              </div>

              {/* Right Page (Storyteller Info) */}
              <div className="book-page book-page-right">
                  <h1 className="page-title text-gold-gradient">The Storyteller</h1>
                  <p className="page-subtitle">Your identity as the weaver of tales.</p>

                  <div className="journal-form">
                      <div className="journal-field">
                          <label>Given Name</label>
                          <div className="journal-input-wrapper">
                              <input type="text" defaultValue="Alexander" />
                          </div>
                      </div>
                      <div className="journal-field">
                          <label>Family Name</label>
                          <div className="journal-input-wrapper">
                              <input type="text" defaultValue="Wright" />
                          </div>
                      </div>
                      <div className="journal-field">
                          <label>Messages Raven (Email)</label>
                          <div className="journal-input-wrapper">
                              <input type="email" defaultValue="alexander@storyrealm.com" />
                          </div>
                      </div>
                      
                      <motion.button 
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="btn-wax-seal"
                      >
                          Rewrite This Page
                      </motion.button>
                  </div>

                  <motion.div 
                      whileHover={{ rotate: 0 }}
                      className="story-progress-box"
                  >
                      <h4 style={{fontFamily:'var(--font-fantasy)', marginBottom:'10px'}}>Your Story Journey Progress</h4>
                      <p style={{fontSize:'0.9rem', marginBottom:'5px', color:'var(--color-ink-dark)'}}><i className="fa-solid fa-hourglass-start"></i> Membership Since: Oct 2025</p>
                      <p style={{fontSize:'0.9rem', marginBottom:'5px', color:'var(--color-ink-dark)'}}><i className="fa-solid fa-flask"></i> Story Credits Energy: 850</p>
                      <p style={{fontSize:'0.9rem', color:'var(--color-ink-dark)'}}><i className="fa-solid fa-medal"></i> Story Level: Master Weaver</p>
                  </motion.div>
              </div>
          </div>
      </main>
      <Footer />
    </motion.div>
  );
}

export default Profile;
