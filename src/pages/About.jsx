import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function About() {
  return (
    <>
      <Header />
      <main className="story-origin-journey">
          {/* Origin Hero */}
          <section className="origin-hero">
              <div className="warm-light-rays"></div>
              <div className="container origin-content">
                  <div className="origin-text text-center">
                      <h1 className="fantasy-title text-gold-gradient">Every Great Story Has an Origin...</h1>
                      <p className="origin-subtitle">
                          AweTales was born from a simple wish — that no child should sleep without hearing the voice they love.
                      </p>
                  </div>
              </div>
          </section>

          {/* Chapter 1: Mission */}
          <section className="story-chapter-section">
              <div className="container">
                  <div className="parchment-chapter-card">
                      <div className="chapter-label">Chapter 1 — Why We Began</div>
                      <div className="chapter-content text-center">
                          <i className="fa-solid fa-feather-pointed chapter-icon"></i>
                          <h2>The Promise of Bedtime</h2>
                          <p>
                              We traveled for work. We missed bedtimes. The video calls were never enough to replace the comforting ritual of reading a story together. We realized that technology shouldn't just connect screens; it should preserve the magic of human connection.
                          </p>
                      </div>
                  </div>
              </div>
          </section>

          {/* Timeline Adventure */}
          <section className="timeline-adventure">
              <div className="container">
                  <h2 className="text-center timeline-heading text-gold-gradient">Path Through the Story Forest</h2>
                  
                  <div className="glowing-path-container">
                      <div className="timeline-line"></div>
                      
                      <div className="timeline-orb-item left-side">
                          <div className="orb"><i className="fa-solid fa-star"></i></div>
                          <div className="timeline-content box-glow">
                              <span className="year">2024</span>
                              <h3>The Spark</h3>
                              <p>The first idea was sketched on a napkin during a late-night flight.</p>
                          </div>
                      </div>

                      <div className="timeline-orb-item right-side">
                          <div className="orb"><i className="fa-solid fa-wand-magic-sparkles"></i></div>
                          <div className="timeline-content box-glow">
                              <span className="year">2025</span>
                              <h3>Voice Magic Born</h3>
                              <p>We successfully cloned the first parent voice, reading a public domain fairy tale.</p>
                          </div>
                      </div>

                      <div className="timeline-orb-item left-side">
                          <div className="orb"><i className="fa-brands fa-fort-awesome"></i></div>
                          <div className="timeline-content box-glow">
                              <span className="year">Present</span>
                              <h3>Growing Story Kingdom</h3>
                              <p>Thousands of children now sleep peacefully to the sound of their loved ones every night.</p>
                          </div>
                      </div>
                  </div>
              </div>
          </section>

          {/* Story Principles (Values) */}
          <section className="story-principles">
              <div className="container">
                  <h2 className="text-center principles-heading">Our Guiding Runes</h2>
                  <div className="scroll-cards-grid">
                      <div className="magical-scroll-card">
                          <div className="wax-seal"><i className="fa-solid fa-heart"></i></div>
                          <h3>Family First</h3>
                          <p>"Technology should bring hearts closer — never replace them."</p>
                      </div>
                      <div className="magical-scroll-card">
                          <div className="wax-seal"><i className="fa-solid fa-wand-sparkles"></i></div>
                          <h3>Magic Experiences</h3>
                          <p>"Every bedtime story should feel like a dream unfolding."</p>
                      </div>
                      <div className="magical-scroll-card">
                          <div className="wax-seal"><i className="fa-solid fa-shield-halved"></i></div>
                          <h3>Safe Realms</h3>
                          <p>"Your voice is your bond. We protect it with the highest magic (and encryption)."</p>
                      </div>
                  </div>
              </div>
          </section>
      </main>
      <Footer />
    </>
  );
}

export default About;
