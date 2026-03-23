import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';

function Settings() {
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
              {/* Left Page (Protections & Alerts) */}
              <div className="book-page book-page-left">
                  <h1 className="page-title">Protect Your Story World</h1>
                  <p className="page-subtitle">Ensuring your tales remain safely sealed.</p>
                  
                  <div className="journal-field">
                      <label>Secret Spell (Password) Lock</label>
                      <div className="journal-input-wrapper">
                          <input type="password" defaultValue="************" />
                      </div>
                  </div>

                  <div className="magic-toggle mt-4">
                      <div>
                          <p className="magic-toggle-label"><i className="fa-solid fa-shield-cat"></i> Add Magic Shield (2FA)</p>
                          <p className="magic-toggle-desc">Require a secondary verification rune.</p>
                      </div>
                      <input type="checkbox" style={{width:'20px', height:'20px'}} />
                  </div>

                  <div style={{marginTop:'50px'}}>
                      <h1 className="page-title" style={{fontSize:'2rem'}}>Whispers From Your Stories</h1>
                      
                      <div className="magic-toggle">
                          <div>
                              <p className="magic-toggle-label">Letters From AweTales</p>
                              <p className="magic-toggle-desc">Account updates and ravens.</p>
                          </div>
                          <input type="checkbox" defaultChecked style={{width:'20px', height:'20px'}} />
                      </div>
                      <div className="magic-toggle">
                          <div>
                              <p className="magic-toggle-label">Story Ready Bells</p>
                              <p className="magic-toggle-desc">When a new audio tale is fully woven.</p>
                          </div>
                          <input type="checkbox" defaultChecked style={{width:'20px', height:'20px'}} />
                      </div>
                  </div>
              </div>

              {/* Right Page (Archive Controls) */}
              <div className="book-page book-page-right">
                  <h1 className="page-title">Your Story Archive Controls</h1>
                  <p className="page-subtitle">The final pages of the reference index.</p>

                  <div className="action-row" style={{marginTop:'40px'}}>
                      <h4 style={{fontFamily:'var(--font-elegant)', marginBottom:'10px', color:'var(--color-ink-dark)'}}>Export Data</h4>
                      <p style={{fontSize:'0.9rem', color:'var(--color-ink-light)', marginBottom:'15px'}}>Retrieve all written works and voice artifacts from our vaults.</p>
                      <motion.button 
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="btn-enter-story"
                      >
                          <i className="fa-solid fa-download"></i> Download Your Story Scrolls
                      </motion.button>
                  </div>

                  <div className="danger-zone" style={{marginTop:'80px', background:'rgba(153, 27, 27, 0.05)', border:'1px solid rgba(153, 27, 27, 0.3)', padding:'30px', borderRadius:'8px'}}>
                      <h4 style={{fontFamily:'var(--font-fantasy)', color:'#991b1b', fontSize:'1.4rem', marginBottom:'10px'}}><i className="fa-solid fa-triangle-exclamation"></i> Close The Book Forever</h4>
                      <p style={{fontSize:'0.9rem', color:'var(--color-ink-dark)', marginBottom:'20px'}}>
                          This action is permanent. All voices, stories, and heroes will be lost to the winds of time.
                      </p>
                      <motion.button 
                          whileHover={{ scale: 1.05, boxShadow: "0 8px 15px rgba(153,27,27,0.4)" }}
                          whileTap={{ scale: 0.95 }}
                          className="btn-wax-seal" 
                          style={{padding:'10px 20px', fontSize:'1rem'}}
                      >
                          Delete Storyweaver Account
                      </motion.button>
                  </div>
              </div>
          </div>
      </main>
      <Footer />
    </motion.div>
  );
}

export default Settings;
