import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Voices() {
  return (
    <>
      <Header />
      <main className="storyteller-hall">
          <div className="hall-bg">
              <div className="lantern-light"></div>
              <div className="lantern-light l2"></div>
              <div className="floating-ember"></div>
              <div className="floating-ember"></div>
              <div className="floating-ember"></div>
          </div>

          <div className="container hall-content">
              <div className="ritual-arena">
                  <div className="ritual-text">
                      <h1 className="hall-title">Summon a New Storyteller</h1>
                      <p className="hall-subtitle">Give us a voice... we will give it life in stories.</p>
                      
                      <div className="ritual-form">
                          <label className="ritual-label">Name this storyteller...</label>
                          <div className="magic-input-wrapper custom-ritual-input">
                              <i className="fa-solid fa-feather-pointed"></i>
                              <input type="text" placeholder="e.g. Grandpa's Midnight Tales" />
                              <span className="ink-underline"></span>
                          </div>
                      </div>
                  </div>
                  
                  <div className="magic-sound-portal">
                      <div className="mic-portal-ring">
                          <div className="pulse-ring"></div>
                          <i className="fa-solid fa-microphone-lines echo-mic"></i>
                      </div>
                      <div className="portal-actions">
                          <button className="btn-begin-journey btn-ritual">Let the Voice Speak</button>
                          <button className="btn-enter-story btn-ritual bg-white-override">Bring Voice From Memory</button>
                      </div>
                  </div>
              </div>

              <div className="storyteller-collection">
                  <h2 className="collection-title"><i className="fa-solid fa-users-viewfinder"></i> The Gathering of Storytellers</h2>
                  
                  <div className="narrator-cards-grid">
                      <div className="narrator-card card-warm">
                          <div className="narrator-avatar">
                              <i className="fa-solid fa-face-smile-beam avatar-icon"></i>
                          </div>
                          <div className="narrator-details">
                              <h3>Mom the Gentle</h3>
                              <span className="tone-label type-calm">Warm & Calm</span>
                              <div className="narrator-stats">
                                  <span><i className="fa-solid fa-book"></i> 8 Tales</span>
                              </div>
                          </div>
                      </div>
                      
                      <div className="narrator-card card-brave">
                          <div className="narrator-avatar">
                              <i className="fa-solid fa-shield-halved avatar-icon"></i>
                          </div>
                          <div className="narrator-details">
                              <h3>Dad the Brave Guide</h3>
                              <span className="tone-label type-energetic">Energetic</span>
                              <div className="narrator-stats">
                                  <span><i className="fa-solid fa-book"></i> 4 Tales</span>
                              </div>
                          </div>
                      </div>

                      <div className="narrator-card card-magic">
                          <div className="narrator-avatar">
                              <i className="fa-solid fa-wand-magic-sparkles avatar-icon"></i>
                          </div>
                          <div className="narrator-details">
                              <h3>Fairy Whisperer</h3>
                              <span className="tone-label type-magic">Magical</span>
                              <div className="narrator-stats">
                                  <span><i className="fa-solid fa-book"></i> 0 Tales</span>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </main>
      <Footer />
    </>
  );
}

export default Voices;
