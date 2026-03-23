import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';

function About() {
  return (
    <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 1.05 }}
        transition={{ duration: 0.6 }}
    >
      <Header />
      <main className="story-origin-journey">
          {/* Origin Hero */}
          <section className="origin-hero">
              <div className="warm-light-rays"></div>
              <div className="container origin-content">
                  <div className="origin-text text-center">
                      <motion.h1 
                          initial={{ y:-30, opacity:0 }} animate={{ y:0, opacity:1 }} transition={{ delay: 0.2 }}
                          className="fantasy-title text-ink-dark"
                      >
                          Every Bright Tale Has an Origin...
                      </motion.h1>
                      <p className="origin-subtitle text-ink-light">
                          AweTales was born from a simple wish — that no child should sleep without hearing the voice they love.
                      </p>
                  </div>
              </div>
          </section>

          {/* Chapter 1: Mission */}
          <section className="story-chapter-section">
              <div className="container">
                  <motion.div 
                      whileHover={{ scale: 1.02 }}
                      className="parchment-chapter-card"
                  >
                      <div className="chapter-label">Chapter 1 — Why We Began</div>
                      <div className="chapter-content text-center">
                          <i className="fa-solid fa-sun chapter-icon text-gold-gradient"></i>
                          <h2 className="text-ink-dark">The Promise of Morning</h2>
                          <p className="text-ink-light">
                              We traveled for work. We missed bedtimes. The video calls were never enough to replace the comforting ritual of reading a story together. We realized that technology shouldn't just connect screens; it should preserve the magic of human connection.
                          </p>
                      </div>
                  </motion.div>
              </div>
          </section>

          {/* Timeline Adventure */}
          <section className="timeline-adventure">
              <div className="container">
                  <h2 className="text-center timeline-heading text-ink-dark">Path Through the Morning Forest</h2>
                  
                  <div className="glowing-path-container">
                      <div className="timeline-line"></div>
                      
                      <div className="timeline-orb-item left-side">
                          <div className="orb"><i className="fa-solid fa-star"></i></div>
                          <motion.div whileHover={{ scale: 1.05, x: -10 }} className="timeline-content box-glow">
                              <span className="year">2024</span>
                              <h3>The Spark</h3>
                              <p>The first idea was sketched on a napkin during a late-night flight.</p>
                          </motion.div>
                      </div>

                      <div className="timeline-orb-item right-side">
                          <div className="orb"><i className="fa-solid fa-wand-magic-sparkles"></i></div>
                          <motion.div whileHover={{ scale: 1.05, x: 10 }} className="timeline-content box-glow">
                              <span className="year">2025</span>
                              <h3>Voice Magic Born</h3>
                              <p>We successfully cloned the first parent voice, reading a public domain fairy tale.</p>
                          </motion.div>
                      </div>

                      <div className="timeline-orb-item left-side">
                          <div className="orb"><i className="fa-brands fa-fort-awesome"></i></div>
                          <motion.div whileHover={{ scale: 1.05, x: -10 }} className="timeline-content box-glow">
                              <span className="year">Present</span>
                              <h3>Growing Story Kingdom</h3>
                              <p>Thousands of children now sleep peacefully to the sound of their loved ones every night.</p>
                          </motion.div>
                      </div>
                  </div>
              </div>
          </section>

          {/* Story Principles (Values) */}
          <section className="story-principles">
              <div className="container">
                  <h2 className="text-center principles-heading text-ink-dark">Our Guiding Light</h2>
                  <div className="scroll-cards-grid">
                      <motion.div whileHover={{ scale: 1.05, y: -10 }} className="magical-scroll-card">
                          <div className="wax-seal" style={{background:'#ea580c', borderColor:'#c2410c'}}><i className="fa-solid fa-heart"></i></div>
                          <h3>Family First</h3>
                          <p>"Technology should bring hearts closer — never replace them."</p>
                      </motion.div>
                      <motion.div whileHover={{ scale: 1.05, y: -10 }} className="magical-scroll-card">
                          <div className="wax-seal" style={{background:'#f59e0b', borderColor:'#d97706'}}><i className="fa-solid fa-sun"></i></div>
                          <h3>Magic Experiences</h3>
                          <p>"Every story should feel like a brand new morning unfolding."</p>
                      </motion.div>
                      <motion.div whileHover={{ scale: 1.05, y: -10 }} className="magical-scroll-card">
                          <div className="wax-seal" style={{background:'#2563eb', borderColor:'#1d4ed8'}}><i className="fa-solid fa-shield-halved"></i></div>
                          <h3>Safe Realms</h3>
                          <p>"Your voice is your bond. We protect it with the highest magic (and encryption)."</p>
                      </motion.div>
                  </div>
              </div>
          </section>
      </main>
      <Footer />
    </motion.div>
  );
}

export default About;
