import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Profile() {
  return (
    <>
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
                      <div className="child-hero-card">
                          <div className="child-avatar"><i className="fa-solid fa-face-smile"></i></div>
                          <div className="child-details">
                              <h4>Leo</h4>
                              <p><i className="fa-solid fa-moon"></i> Favorite Story: The Brave Dragon</p>
                          </div>
                      </div>
                      <div className="child-hero-card">
                          <div className="child-avatar"><i className="fa-solid fa-face-laugh-beam"></i></div>
                          <div className="child-details">
                              <h4>Maya</h4>
                              <p><i className="fa-solid fa-moon"></i> Favorite Story: Whispers of the Moon</p>
                          </div>
                      </div>
                  </div>
                  
                  <button className="btn-enter-story" style={{marginTop:'30px'}}>
                      <i className="fa-solid fa-plus"></i> Add New Story Hero
                  </button>
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
                      
                      <button className="btn-wax-seal">Rewrite This Page</button>
                  </div>

                  <div className="story-progress-box">
                      <h4 style={{fontFamily:'var(--font-fantasy)', marginBottom:'10px'}}>Your Story Journey Progress</h4>
                      <p style={{fontSize:'0.9rem', marginBottom:'5px'}}><i className="fa-solid fa-hourglass-start"></i> Membership Since: Oct 2025</p>
                      <p style={{fontSize:'0.9rem', marginBottom:'5px'}}><i className="fa-solid fa-flask"></i> Story Credits Energy: 850</p>
                      <p style={{fontSize:'0.9rem'}}><i className="fa-solid fa-medal"></i> Story Level: Master Weaver</p>
                  </div>
              </div>
          </div>
      </main>
      <Footer />
    </>
  );
}

export default Profile;
