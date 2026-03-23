import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';

function Contact() {
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
              
              {/* Left Page (Story Invitation) */}
              <div className="book-page book-page-left text-center" style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
                  <motion.div 
                      animate={{ y: [0, -10, 0] }}
                      transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                      style={{fontSize:'3rem', color:'var(--color-magic-gold)', marginBottom:'20px'}}
                  >
                      <i className="fa-solid fa-feather-pointed"></i>
                  </motion.div>
                  <h1 className="page-title text-gold-gradient">Every Story Begins With a Hello...</h1>
                  <p className="page-subtitle" style={{maxWidth:'300px', margin:'0 auto 40px'}}>
                      Tell us your thoughts, your dreams, or simply stay updated with morning magic.
                  </p>
                  
                  <div style={{opacity:0.2, fontSize:'6rem', color:'var(--color-magic-gold)', marginTop:'auto'}}>
                      <i className="fa-solid fa-envelope-open-text"></i>
                  </div>
              </div>

              {/* Right Page (Writing Form) */}
              <div className="book-page book-page-right">
                  <form className="journal-form" onSubmit={(e) => e.preventDefault()}>
                      <div className="journal-field">
                          <label>Sender</label>
                          <div className="journal-input-wrapper">
                              <input type="text" placeholder="Write your name here..." />
                          </div>
                      </div>
                      <div className="journal-field">
                          <label>Return Raven (Email)</label>
                          <div className="journal-input-wrapper">
                              <input type="email" placeholder="Write your email here..." />
                          </div>
                      </div>
                      <div className="journal-field">
                          <label>The Message</label>
                          <div className="journal-input-wrapper">
                              <textarea rows="4" placeholder="Leave us a message..." style={{resize:'none'}}></textarea>
                          </div>
                      </div>
                      
                      <motion.button 
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="btn-wax-seal" 
                          style={{width:'100%', marginTop:'30px', display:'flex', alignItems:'center', justifyContent:'center', gap:'10px'}}
                      >
                          <i className="fa-solid fa-stamp"></i> Seal This Chapter
                      </motion.button>
                  </form>
              </div>
          </div>
      </main>
      <Footer />
    </motion.div>
  );
}

export default Contact;
