import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Dashboard() {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <Header />
      <main className="story-mentor-chamber daylight-chamber">
        <div className="chamber-bg">
          <motion.div 
            animate={{ scale: [1, 1.05, 1], opacity: [0.6, 0.8, 0.6] }}
            transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
            className="sun-glow"
          ></motion.div>
        </div>

        <div className="container chamber-content">
            <motion.div 
              initial={{ y: -30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mentor-header"
            >
                <div className="character-guide">
                    <div className="guide-avatar-wrapper theme-bright">
                        <i className="fa-solid fa-user-pen"></i>
                    </div>
                    <div className="guide-bubble">
                        <p>"Ah, the morning light is perfect. Shall we weave a new tale today?"</p>
                    </div>
                </div>
                <div className="welcome-text">
                    <h1 className="chamber-title text-gold-gradient">Your Creative Chamber</h1>
                    <p>The ink is ready. The pages are glowing.</p>
                </div>
            </motion.div>

            <div className="dashboard-grid">
                <div className="main-desk-area">
                    {/* Magical Story Counters */}
                    <div className="artifact-counters">
                        <motion.div whileHover={{ scale: 1.05, y: -5 }} className="artifact-card">
                            <div className="artifact-icon"><i className="fa-solid fa-book-sparkles"></i></div>
                            <div className="artifact-info">
                                <h3>12</h3>
                                <p>Tales Written</p>
                            </div>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.05, y: -5 }} className="artifact-card">
                            <div className="artifact-icon"><i className="fa-solid fa-microphone-lines"></i></div>
                            <div className="artifact-info">
                                <h3>3</h3>
                                <p>Narrator Voices</p>
                            </div>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.05, y: -5 }} className="artifact-card energy-card">
                            <div className="artifact-icon"><i className="fa-solid fa-flask"></i></div>
                            <div className="artifact-info">
                                <h3>850</h3>
                                <p>Magic Energy</p>
                            </div>
                        </motion.div>
                    </div>

                    {/* Story Shelf */}
                    <motion.div 
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="bookshelf-section"
                    >
                        <div className="section-title-row">
                            <h2 className="shelf-heading"><i className="fa-solid fa-books"></i> Your Sunny Story Shelf</h2>
                            <Link to="/voices" style={{textDecoration:'none'}}>
                                <motion.button 
                                    whileHover={{ scale: 1.05, boxShadow: "0 8px 20px rgba(245, 158, 11, 0.4)" }}
                                    whileTap={{ scale: 0.95 }}
                                    className="btn-begin-journey btn-small" 
                                    style={{fontSize:'0.95rem', padding:'10px 18px'}}
                                >
                                    Begin Form Ritual <i className="fa-solid fa-sun" style={{marginLeft:'5px'}}></i>
                                </motion.button>
                            </Link>
                        </div>
                        
                        <div className="wooden-shelf-container">
                            <div className="wooden-shelf bright-wood">
                                <motion.div whileHover={{ scale: 1.1, rotateZ: 5, y: -15, x: 10, zIndex: 10 }} className="book spine-blue">
                                    <span className="book-title">The Courageous Dragon</span>
                                    <div className="bookmark-ribbon br-gold"></div>
                                </motion.div>
                                <motion.div whileHover={{ scale: 1.1, rotateZ: -5, y: -15, x: -5, zIndex: 10 }} className="book spine-red">
                                    <span className="book-title">Mystery of the Sun</span>
                                    <div className="bookmark-ribbon br-silver"></div>
                                </motion.div>
                                <motion.div whileHover={{ scale: 1.1, rotateZ: 8, y: -20, x: 15, zIndex: 10 }} className="book spine-green">
                                    <span className="book-title">Whispers in the Forest</span>
                                    <div className="bookmark-ribbon br-purple"></div>
                                </motion.div>
                            </div>
                            <div className="shelf-shadow light"></div>
                        </div>
                    </motion.div>
                </div>

                <motion.div 
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 }}
                    className="side-tools-panel"
                >
                    <div className="parchment-widget day-parchment">
                        <h3><i className="fa-solid fa-sun-plant-wilt text-gold-gradient"></i> Quick Actions</h3>
                        <ul className="quill-menu">
                            <li><Link to="/voices"><motion.span whileHover={{x:5, color:'#ea580c'}} style={{display:'inline-block'}}><i className="fa-solid fa-feather"></i> Summon Narrator</motion.span></Link></li>
                            <li><Link to="/settings"><motion.span whileHover={{x:5, color:'#ea580c'}} style={{display:'inline-block'}}><i className="fa-solid fa-key"></i> Magic Protections</motion.span></Link></li>
                            <li><Link to="/profile"><motion.span whileHover={{x:5, color:'#ea580c'}} style={{display:'inline-block'}}><i className="fa-solid fa-book-open-reader"></i> Family Journal</motion.span></Link></li>
                        </ul>
                    </div>

                    <div className="parchment-widget day-parchment">
                        <h3><i className="fa-solid fa-bell text-gold-gradient"></i> Chamber Whispers</h3>
                        <ul className="notifications-list">
                            <li>
                                <div className="notif-icon"><i className="fa-solid fa-star"></i></div>
                                <div className="notif-text">
                                    <p>Your magic energy glowed up!</p>
                                    <span>2 hours ago</span>
                                </div>
                            </li>
                            <li>
                                <div className="notif-icon"><i className="fa-solid fa-book-open"></i></div>
                                <div className="notif-text">
                                    <p>"Courageous Dragon" is ready.</p>
                                    <span>1 day ago</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </motion.div>
            </div>
        </div>
      </main>
      <Footer />
    </motion.div>
  );
}

export default Dashboard;
