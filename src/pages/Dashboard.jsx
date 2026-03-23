import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

function Dashboard() {
  useEffect(() => {
    document.body.classList.add('dashboard-bg');
    return () => document.body.classList.remove('dashboard-bg');
  }, []);

  return (
    <>
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

      <main className="dashboard-main">
          <div className="container container-large">
              
              <div className="dashboard-header">
                  <h1 className="welcome-text">Welcome back, Nallamothu! ✨</h1>
                  <p className="welcome-subtext">Ready to create some magical stories today?</p>
              </div>

              {/* Stats Row */}
              <div className="stats-row">
                  <div className="stat-card stat-purple">
                      <div className="stat-content">
                          <span>Total Stories</span>
                          <h3>0</h3>
                      </div>
                      <i className="fa-solid fa-wand-magic-sparkles"></i>
                  </div>
                  <div className="stat-card stat-blue">
                      <div className="stat-content">
                          <span>Voices Created</span>
                          <h3>0</h3>
                      </div>
                      <i className="fa-solid fa-users"></i>
                  </div>
                  <div className="stat-card stat-green">
                      <div className="stat-content">
                          <span>Credits</span>
                          <h3>1000</h3>
                      </div>
                      <i className="fa-solid fa-bolt"></i>
                  </div>
                  <div className="stat-card stat-orange">
                      <div className="stat-content">
                          <span>Total Listens</span>
                          <h3>0</h3>
                      </div>
                      <i className="fa-regular fa-circle-play"></i>
                  </div>
              </div>

              {/* Main Layout Grid */}
              <div className="dashboard-grid">
                  
                  {/* Left Column */}
                  <div className="dashboard-col-main">
                      <div className="card panel-card">
                          <div className="panel-header">
                              <div>
                                  <h2>Recent Stories</h2>
                                  <p>Your latest creations</p>
                              </div>
                              <button className="btn-purple-sm"><i className="fa-solid fa-plus"></i> Create Story</button>
                          </div>
                          
                          <div className="empty-state">
                              <i className="fa-solid fa-wand-magic-sparkles empty-icon"></i>
                              <h3>No stories yet</h3>
                              <p>Create your first voice and start making magical stories!</p>
                              <Link to="/voices" className="btn-purple">Get Started</Link>
                          </div>
                      </div>
                  </div>

                  {/* Right Column */}
                  <div className="dashboard-col-sidebar">
                      
                      {/* Subscription */}
                      <div className="card right-panel-card">
                          <div className="panel-header-simple">
                              <i className="fa-solid fa-award"></i>
                              <h2>Subscription</h2>
                          </div>
                          <div className="sub-status">
                              <span className="badge badge-gray">Free</span>
                              <button className="btn-purple-sm">Upgrade</button>
                          </div>
                          <p className="credits-info">Credits: 1000</p>
                          <a href="#" className="upgrade-link">Upgrade for unlimited stories!</a>
                      </div>
                      
                      {/* Quick Actions */}
                      <div className="card right-panel-card">
                          <div className="panel-header-simple">
                              <h2>Quick Actions</h2>
                          </div>
                          <div className="action-menu">
                              <Link to="/voices" className="action-item"><i className="fa-solid fa-user-group"></i> Create Voice</Link>
                              <a href="#" className="action-item"><i className="fa-solid fa-plus"></i> Add Child Profile</a>
                              <a href="#" className="action-item"><i className="fa-solid fa-arrow-trend-up"></i> Buy Credits</a>
                          </div>
                      </div>
                      
                      {/* Notifications */}
                      <div className="card right-panel-card">
                          <div className="panel-header-simple">
                              <i className="fa-regular fa-bell"></i>
                              <h2>Notifications</h2>
                          </div>
                          <div className="notification-item">
                              <h4>Welcome to AweTales!</h4>
                              <p>Welcome to AweTales! Please check your email to verify your account and start your storytelling journey.</p>
                          </div>
                      </div>

                  </div>
              </div>

          </div>
      </main>
    </>
  );
}

export default Dashboard;
