import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Dashboard() {
  return (
    <>
      <Header />
      <main className="story-mentor-chamber">
        <div className="chamber-bg">
          <div className="lamp-glow"></div>
        </div>

        <div className="container chamber-content">
            <div className="mentor-header">
                <div className="character-guide">
                    <div className="guide-avatar-wrapper">
                        <i className="fa-solid fa-user-pen"></i>
                    </div>
                    <div className="guide-bubble">
                        <p>"Ah, welcome back. Shall we create a new tale today?"</p>
                    </div>
                </div>
                <div className="welcome-text">
                    <h1 className="chamber-title">Your Creative Chamber</h1>
                    <p>The ink is ready. The pages are blank.</p>
                </div>
            </div>

            <div className="dashboard-grid">
                <div className="main-desk-area">
                    {/* Magical Story Counters */}
                    <div className="artifact-counters">
                        <div className="artifact-card">
                            <div className="artifact-icon"><i className="fa-solid fa-book-sparkles"></i></div>
                            <div className="artifact-info">
                                <h3>12</h3>
                                <p>Tales Written</p>
                            </div>
                        </div>
                        <div className="artifact-card">
                            <div className="artifact-icon"><i className="fa-solid fa-microphone-lines"></i></div>
                            <div className="artifact-info">
                                <h3>3</h3>
                                <p>Narrator Voices</p>
                            </div>
                        </div>
                        <div className="artifact-card energy-card">
                            <div className="artifact-icon"><i className="fa-solid fa-flask"></i></div>
                            <div className="artifact-info">
                                <h3>850</h3>
                                <p>Magic Energy</p>
                            </div>
                        </div>
                    </div>

                    {/* Story Shelf */}
                    <div className="bookshelf-section">
                        <div className="section-title-row">
                            <h2 className="shelf-heading"><i className="fa-solid fa-books"></i> Your Story Shelf</h2>
                            <Link to="/voices" style={{textDecoration:'none'}}>
                                <button className="btn-begin-journey btn-small" style={{fontSize:'0.95rem', padding:'8px 16px'}}>
                                    Begin Story Ritual <i className="fa-solid fa-feather-pointed" style={{marginLeft:'5px'}}></i>
                                </button>
                            </Link>
                        </div>
                        
                        <div className="wooden-shelf-container">
                            <div className="wooden-shelf">
                                <div className="book spine-blue">
                                    <span className="book-title">The Courageous Dragon</span>
                                    <div className="bookmark-ribbon br-gold"></div>
                                </div>
                                <div className="book spine-red">
                                    <span className="book-title">Mystery of the Moon</span>
                                    <div className="bookmark-ribbon br-silver"></div>
                                </div>
                                <div className="book spine-green">
                                    <span className="book-title">Whispers in the Forest</span>
                                    <div className="bookmark-ribbon br-purple"></div>
                                </div>
                            </div>
                            <div className="shelf-shadow"></div>
                        </div>
                    </div>
                </div>

                <div className="side-tools-panel">
                    <div className="parchment-widget">
                        <h3><i className="fa-solid fa-scroll"></i> Quick Actions</h3>
                        <ul className="quill-menu">
                            <li><Link to="/voices"><i className="fa-solid fa-feather"></i> Summon Narrator</Link></li>
                            <li><Link to="/settings"><i className="fa-solid fa-key"></i> Magic Protections</Link></li>
                            <li><Link to="/profile"><i className="fa-solid fa-book-open-reader"></i> Family Journal</Link></li>
                        </ul>
                    </div>

                    <div className="parchment-widget">
                        <h3><i className="fa-solid fa-bell"></i> Chamber Whispers</h3>
                        <ul className="notifications-list">
                            <li>
                                <div className="notif-icon"><i className="fa-solid fa-star"></i></div>
                                <div className="notif-text">
                                    <p>Your magic energy was replenished!</p>
                                    <span>2 hours ago</span>
                                </div>
                            </li>
                            <li>
                                <div className="notif-icon"><i className="fa-solid fa-book-open"></i></div>
                                <div className="notif-text">
                                    <p>"Courageous Dragon" is ready to read.</p>
                                    <span>1 day ago</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default Dashboard;
