import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Home() {
  const { scrollYProgress } = useScroll();
  
  // Parallax Values mapped to scroll position
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "80%"]);
  const opacityText = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="storybook-home"
    >
      <Header />
      
      {/* 1. HERO SECTION (Parallax) */}
      <section className="magical-hero-section">
          {/* Parallax Background Layers */}
          <motion.div className="hero-sky-bg" style={{ y: yBg }}>
              <div className="sky-sun-rays"></div>
          </motion.div>

          <div className="container hero-content-wrapper">
              <motion.div 
                  className="hero-text-content"
                  style={{ y: yText, opacity: opacityText }}
              >
                  <motion.div 
                      initial={{ y: 50, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.2, duration: 0.8 }}
                      className="magic-badge"
                  >
                      <i className="fa-solid fa-sun" style={{color: '#fbbf24'}}></i> A Bright New Chapter
                  </motion.div>
                  <motion.h1 
                      initial={{ y: 50, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.4, duration: 0.8 }}
                      className="hero-title"
                  >
                      Give Them the Voice They <span className="text-gold-gradient">Love Most</span>.
                  </motion.h1>
                  <motion.p 
                      initial={{ y: 50, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.6, duration: 0.8 }}
                      className="hero-subtitle"
                  >
                      AweTales transforms your child’s bedtime with stories narrated in your own voice. The magic of morning light and endless story realms awaits.
                  </motion.p>
                  
                  <motion.div 
                      initial={{ y: 50, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.8, duration: 0.8 }}
                      className="hero-actions"
                  >
                      <Link to="/signup" style={{textDecoration:'none'}}>
                          <motion.button 
                              whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(245, 158, 11, 0.4)" }}
                              whileTap={{ scale: 0.95 }}
                              className="btn-begin-journey"
                          >
                              Open First Book
                          </motion.button>
                      </Link>
                      <Link to="/about" style={{textDecoration:'none'}}>
                          <motion.button 
                              whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.8)' }}
                              whileTap={{ scale: 0.95 }}
                              className="btn-enter-story"
                          >
                              <i className="fa-solid fa-scroll"></i> Read Our Tale
                          </motion.button>
                      </Link>
                  </motion.div>
              </motion.div>
              
              <motion.div 
                  className="hero-portal-visuals"
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5, duration: 1 }}
              >
                  <motion.div 
                      className="floating-book main-book"
                      animate={{ y: [-15, 15, -15] }}
                      transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                      whileHover={{ scale: 1.1, rotateY: 15, rotateX: 10, cursor: 'pointer' }}
                  >
                      <div className="book-cover daylight-cover">
                          <i className="fa-solid fa-sun"></i>
                          <h4>The Golden Path</h4>
                      </div>
                  </motion.div>
                  
                  <motion.div 
                      className="floating-book secondary-book b-left"
                      animate={{ y: [15, -15, 15] }}
                      transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                      whileHover={{ scale: 1.15, rotateY: -15, rotateX: -10, cursor: 'pointer' }}
                  >
                      <div className="book-cover" style={{background: 'linear-gradient(135deg, #34d399, #059669)'}}>
                          <i className="fa-solid fa-tree"></i>
                      </div>
                  </motion.div>
                  <motion.div 
                      className="floating-book secondary-book b-right"
                      animate={{ y: [-10, 20, -10] }}
                      transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }}
                      whileHover={{ scale: 1.15, rotateY: 20, rotateX: 10, cursor: 'pointer' }}
                  >
                      <div className="book-cover" style={{background: 'linear-gradient(135deg, #60a5fa, #2563eb)'}}>
                          <i className="fa-solid fa-cloud"></i>
                      </div>
                  </motion.div>
              </motion.div>
          </div>
      </section>

      {/* 2. DREAM WHISPER (Immersive Zoom) */}
      <motion.section 
          className="dream-whisper-section"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
              hidden: { opacity: 0, scale: 0.8, rotateX: -15 },
              visible: { opacity: 1, scale: 1, rotateX: 0, transition: { duration: 1, type: "spring", bounce: 0.4 } }
          }}
      >
          <div className="container">
              <div className="glass-quote-card daylight-glass">
                  <div className="quote-icon text-gold-gradient"><i className="fa-solid fa-quote-left"></i></div>
                  <h2 className="glass-quote">"It's like carrying a piece of home wherever I travel."</h2>
                  <p className="quote-author">- Sarah, weaving tales from 3,000 miles away</p>
              </div>
          </div>
      </motion.section>

      {/* 3. STORY COMPANIONS (3D Hover) */}
      <section className="story-companions-section">
          <div className="container">
              <div className="section-header text-center">
                  <motion.h2 
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      className="fantasy-title text-gold-gradient"
                  >
                      Your Story Companions
                  </motion.h2>
                  <motion.p 
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 }}
                      className="section-subtitle"
                  >
                      Three magical steps to weave your child's dreams into the morning light.
                  </motion.p>
              </div>
              
              <div className="companions-grid">
                  {[
                    { title: "The Voice Fairy", icon: "fa-microphone-lines", desc: "Speak into the magic mirror. We safely capture the warmth and cadence of your voice." },
                    { title: "The Story Keeper", icon: "fa-book-journal-whills", desc: "Select from our vast library of enchanted tales or craft a brand new daylight adventure." },
                    { title: "The Dream Guardian", icon: "fa-shield-halved", desc: "Your stories are securely bound in magic, ready to be played at bedtime, anytime." }
                  ].map((comp, idx) => (
                      <motion.div 
                          key={idx}
                          className="companion-card daylight-card"
                          initial={{ opacity: 0, y: 50, scale: 0.9 }}
                          whileInView={{ opacity: 1, y: 0, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: idx * 0.2, type: "spring", stiffness: 100 }}
                          whileHover={{ scale: 1.08, rotateY: 12, rotateX: -8, zIndex: 10, boxShadow: "0 25px 50px rgba(0,0,0,0.1)" }}
                      >
                          <div className="companion-icon text-gold-gradient"><i className={`fa-solid ${comp.icon}`}></i></div>
                          <h3 className="companion-title">{comp.title}</h3>
                          <p className="companion-desc">{comp.desc}</p>
                      </motion.div>
                  ))}
              </div>
          </div>
      </section>

      {/* 4. FINAL CTA (Open Book) */}
      <motion.section 
          className="open-book-cta-section"
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, type: "spring", bounce: 0.3 }}
      >
          <div className="container open-book-container-styled">
              <div className="open-book-visual-daylight">
                  {/* CSS book pages */}
                  <div className="page-left"></div>
                  <div className="page-right"></div>
                  <div className="sunlight-dust md-1"></div>
                  <div className="sunlight-dust md-2"></div>
                  <div className="sunlight-dust md-3"></div>
              </div>
              <div className="cta-content text-center">
                  <h2 className="cta-title">Ready to write your first chapter?</h2>
                  <p className="cta-subtitle">The ink is waiting. Let's make the journey bright today.</p>
                  <Link to="/signup" style={{textDecoration:'none'}}>
                      <motion.button 
                          whileHover={{ scale: 1.1, textShadow: "0 0 8px rgb(255,255,255)" }}
                          whileTap={{ scale: 0.9 }}
                          className="btn-begin-journey btn-large"
                      >
                          Start Your Free Tale
                      </motion.button>
                  </Link>
              </div>
          </div>
      </motion.section>

      <Footer />
    </motion.div>
  );
}

export default Home;
