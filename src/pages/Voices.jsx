import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

function Voices() {
  const [activeTab, setActiveTab] = useState('create');

  useEffect(() => {
    document.body.classList.add('dashboard-bg');
    return () => document.body.classList.remove('dashboard-bg');
  }, []);

  return (
    <div style={{display: 'flex', flexDirection: 'column', minHeight: '100vh'}}>
      <header className="app-header">
          <div className="logo">
              <Link to="/">AweTales</Link>
          </div>
          <div className="app-nav-right">
              <nav className="nav-links">
                  <Link to="/">Home</Link>
                  <Link to="/about">About</Link>
                  <Link to="/blog">Blog</Link>
                  <Link to="#">Playground</Link>
              </nav>
              <div className="user-controls">
                  <Link to="/dashboard" className="btn-dashboard outline-btn">Dashboard</Link>
                  <div className="user-avatar">N</div>
              </div>
          </div>
      </header>

      <main className="dashboard-main" style={{flex: 1}}>
          <div className="container container-large">
              
              <div className="page-heading">
                  <h1>My Voices</h1>
                  <p>Create and manage your personalized AI voices for storytelling</p>
              </div>

              {/* Tabs */}
              <div className="tabs-container">
                  <button 
                    className={`tab-btn ${activeTab === 'create' ? 'active' : ''}`} 
                    onClick={() => setActiveTab('create')}
                  >
                    Create Voice
                  </button>
                  <button 
                    className={`tab-btn ${activeTab === 'manage' ? 'active' : ''}`} 
                    onClick={() => setActiveTab('manage')}
                  >
                    Manage Voices
                  </button>
              </div>

              {/* Tab Content: Create Voice */}
              {activeTab === 'create' && (
                <div className="tab-content active">
                    <div className="card form-card">
                        <div className="card-title-border">
                            <h2>Create New Voice</h2>
                            <p>Upload an audio sample or record your voice to create a personalized AI voice clone</p>
                        </div>

                        <div className="card-body">
                            <div className="form-group mb-4">
                                <label className="font-medium">Voice Name</label>
                                <input type="text" className="input-light" placeholder="Enter a name for this voice (e.g., Mom's Voice, Dad's Voice)" />
                            </div>

                            <label className="font-medium mb-2 display-block">Audio Source</label>
                            
                            <div className="audio-source-upload dashed-box mb-3">
                                <i className="fa-solid fa-arrow-up-from-bracket box-icon"></i>
                                <h4>Upload Audio File</h4>
                                <p>WAV or MP3 format, max 10MB</p>
                                <div className="file-input-wrapper">
                                    <button className="btn-outline-small">Choose File</button>
                                    <span className="file-name">No file chosen</span>
                                </div>
                            </div>

                            <div className="audio-source-record dashed-box">
                                <i className="fa-solid fa-microphone box-icon"></i>
                                <h4>Record Voice</h4>
                                <p>Record directly in your browser<br />Current URL: https://awetales.com</p>
                                <button className="btn-purple btn-record"><i className="fa-solid fa-microphone"></i> Start Recording</button>
                                <div className="btn-actions-row">
                                    <button className="btn-outline-small">Check Permission</button>
                                    <button className="btn-outline-small">Reset Help</button>
                                </div>
                            </div>
                        </div>

                        <div className="card-footer align-right">
                            <button className="btn-purple-light" disabled>Create Voice</button>
                        </div>
                    </div>
                </div>
              )}

              {/* Tab Content: Manage Voices */}
              {activeTab === 'manage' && (
                <div className="tab-content active">
                    <div className="card form-card">
                        <div className="card-title-border">
                            <h2>Your Voices</h2>
                            <p>Manage your created voice clones and their settings</p>
                        </div>
                        
                        <div className="card-body empty-state-large">
                            <i className="fa-solid fa-microphone empty-icon"></i>
                            <h3>No voices created yet</h3>
                            <p>Create your first voice to get started with personalized storytelling</p>
                            <button className="btn-purple" onClick={() => setActiveTab('create')}>Create Your First Voice</button>
                        </div>
                    </div>
                </div>
              )}

          </div>
      </main>

      <Footer />
    </div>
  );
}

export default Voices;
