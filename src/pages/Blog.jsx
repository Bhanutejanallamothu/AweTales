import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';

function Blog() {
  return (
    <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 1.05 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <Header />
      <main className="magical-library-main">
          {/* Library Entrance */}
          <section className="library-intro">
              <div className="container text-center library-header">
                  <motion.h1 
                    initial={{ y: -30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="library-title text-ink-dark"
                  >
                      Welcome to the Story Library
                  </motion.h1>
                  <motion.p 
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="library-subtitle text-ink-light"
                  >
                      Pick a story. Discover a morning world.
                  </motion.p>
                  
                  <motion.div 
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.4 }}
                      className="story-finder"
                  >
                      <div className="finder-wrapper daylight-finder">
                          <i className="fa-solid fa-magnifying-glass"></i>
                          <input type="text" placeholder="Search for a story, idea, or dream..." />
                          <i className="fa-solid fa-book finder-icon-right"></i>
                      </div>
                  </motion.div>
              </div>
          </section>

          {/* Shelf Labels */}
          <section className="shelf-labels-section border-bottom">
              <div className="container text-center">
                  <div className="wooden-tags">
                      <motion.button whileHover={{ y: -2 }} className="wood-tag active daylight-tag"><i className="fa-solid fa-star"></i> Fairy Tales</motion.button>
                      <motion.button whileHover={{ y: -2 }} className="wood-tag daylight-tag"><i className="fa-solid fa-sun-plant-wilt"></i> Morning Tips</motion.button>
                      <motion.button whileHover={{ y: -2 }} className="wood-tag daylight-tag"><i className="fa-solid fa-heart"></i> Family Bonds</motion.button>
                      <motion.button whileHover={{ y: -2 }} className="wood-tag daylight-tag"><i className="fa-solid fa-flask"></i> Story Science</motion.button>
                  </div>
              </div>
          </section>

          {/* Bookshelf Grid Layout */}
          <section className="bookshelf-grid-section" style={{perspective: 1200}}>
              <div className="container">
                  {/* Shelf 1 */}
                  <motion.div 
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      className="library-shelf"
                  >
                      <div className="books-row">
                          <motion.div whileHover={{ scale: 1.1, rotateY: 10, rotateX: 5, y: -20, zIndex: 10 }} className="library-book cover-sunlight">
                              <span className="spine-text">The Psychology of Morning Routines</span>
                          </motion.div>
                          <motion.div whileHover={{ scale: 1.1, rotateY: -10, rotateX: 5, y: -20, zIndex: 10 }} className="library-book cover-forest">
                              <span className="spine-text">Why Voice Magic is Safe for Kids</span>
                          </motion.div>
                          <motion.div whileHover={{ scale: 1.1, rotateY: 15, rotateX: -5, y: -20, zIndex: 10 }} className="library-book cover-magic">
                              <span className="spine-text">Top 10 Classic Fairy Tales</span>
                          </motion.div>
                          <motion.div whileHover={{ scale: 1.1, rotateY: -15, rotateX: 10, y: -20, zIndex: 10 }} className="library-book cover-breeze">
                              <span className="spine-text">Connecting Grandparents Over Oceans</span>
                          </motion.div>
                      </div>
                      <div className="wooden-plank bright-plank"></div>
                      <div className="shelf-shadow light-shelf"></div>
                  </motion.div>

                  {/* Shelf 2 */}
                  <motion.div 
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 }}
                      className="library-shelf mt-6"
                  >
                      <div className="books-row">
                          <motion.div whileHover={{ scale: 1.1, rotateY: 10, y: -20, zIndex: 10 }} className="library-book cover-ocean">
                              <span className="spine-text">Creating the Perfect Play Environment</span>
                          </motion.div>
                          <motion.div whileHover={{ scale: 1.1, rotateY: -10, y: -20, zIndex: 10 }} className="library-book cover-sunset">
                              <span className="spine-text">The Evolution of Oral Storytelling</span>
                          </motion.div>
                          <motion.div whileHover={{ scale: 1.1, rotateY: 15, y: -20, zIndex: 10 }} className="library-book cover-dawn">
                              <span className="spine-text">How AI Understands Emotional Tone</span>
                          </motion.div>
                      </div>
                      <div className="wooden-plank bright-plank"></div>
                      <div className="shelf-shadow light-shelf"></div>
                  </motion.div>
              </div>
          </section>
      </main>
      <Footer />
    </motion.div>
  );
}

export default Blog;
