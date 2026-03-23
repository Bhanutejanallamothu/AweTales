import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Voices() {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
    >
      <Header />
      <main className="storyteller-hall daylight-hall">
          <div className="hall-bg">
              <motion.div 
                 animate={{ scale: [1, 1.2, 1], rotate: [0, 5, 0] }}
                 transition={{ repeat: Infinity, duration: 15, ease: "easeInOut" }}
                 className="morning-sun-light"
              ></motion.div>
              <div className="floating-ember daylight-ember"></div>
              <div className="floating-ember daylight-ember"></div>
          </div>

          <div className="container hall-content">
              <motion.div 
                  initial={{ opacity: 0, y: -50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, type: "spring", bounce: 0.4 }}
                  className="ritual-arena daylight-arena"
              >
                  <div className="ritual-text">
                      <h1 className="hall-title text-night-gradient" style={{textShadow: "0 0 10px rgba(255,255,255,0.8)"}}>Summon a New Storyteller</h1>
                      <p className="hall-subtitle text-ink-light">Give us a voice... we will guide it into the sunlight.</p>
                      
                      <div className="ritual-form">
                          <label className="ritual-label text-gold-gradient">Name this storyteller...</label>
                          <div className="magic-input-wrapper custom-ritual-input">
                              <i className="fa-solid fa-feather-pointed"></i>
                              <input type="text" placeholder="e.g. Grandpa's Morning Tales" />
                              <span className="ink-underline"></span>
                          </div>
                      </div>
                  </div>
                  
                  <div className="magic-sound-portal">
                      <motion.div 
                          whileHover={{ scale: 1.1, rotate: 10 }}
                          className="mic-portal-ring daylight-ring"
                      >
                          <div className="pulse-ring daylight-pulse"></div>
                          <i className="fa-solid fa-microphone-lines echo-mic text-gold-gradient"></i>
                      </motion.div>
                      <div className="portal-actions">
                          <motion.button 
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="btn-begin-journey btn-ritual"
                          >
                              Let the Voice Speak
                          </motion.button>
                          <motion.button 
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="btn-enter-story btn-ritual bg-white-override"
                          >
                              Bring Voice From Memory
                          </motion.button>
                      </div>
                  </div>
              </motion.div>

              <motion.div 
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="storyteller-collection"
              >
                  <h2 className="collection-title text-ink-dark"><i className="fa-solid fa-users-viewfinder"></i> The Gathering of Storytellers</h2>
                  
                  <div className="narrator-cards-grid" style={{perspective: 1500}}>
                      {[
                        { title: "Mom the Gentle", tone: "Warm & Calm", toneClass: "type-calm", tales: 8, icon: "fa-face-smile-beam", bg: "card-warm" },
                        { title: "Dad the Brave Guide", tone: "Energetic", toneClass: "type-energetic", tales: 4, icon: "fa-shield-halved", bg: "card-brave" },
                        { title: "Fairy Whisperer", tone: "Magical", toneClass: "type-magic", tales: 0, icon: "fa-wand-magic-sparkles", bg: "card-magic" }
                      ].map((narr, idx) => (
                          <motion.div 
                              key={idx}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.6 + (idx * 0.1), type: "spring" }}
                              whileHover={{ scale: 1.08, rotateY: 5, rotateX: -5, boxShadow: "0 25px 50px rgba(0,0,0,0.1)" }}
                              className="narrator-card daylight-narrator-card"
                          >
                              <div className="narrator-avatar">
                                  <i className={`fa-solid ${narr.icon} avatar-icon`}></i>
                              </div>
                              <div className="narrator-details">
                                  <h3 className="text-ink-dark">{narr.title}</h3>
                                  <span className={`tone-label ${narr.toneClass}`}>{narr.tone}</span>
                                  <div className="narrator-stats text-ink-light">
                                      <span><i className="fa-solid fa-book"></i> {narr.tales} Tales</span>
                                  </div>
                              </div>
                          </motion.div>
                      ))}
                  </div>
              </motion.div>
          </div>
      </main>
      <Footer />
    </motion.div>
  );
}

export default Voices;
