import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="storybook-footer">
        <div className="footer-sky-gradient">
            {/* Ambient stars */}
            <div className="ambient-star s1"></div>
            <div className="ambient-star s2"></div>
            <div className="ambient-star s3"></div>
            <div className="ambient-star s4"></div>

            <div className="container footer-content-wrapper">
                <div className="emotional-signoff text-center">
                    <h2 className="signoff-text text-gold-gradient">"And they lived happily ever after..."</h2>
                    <p className="signoff-subtext">Until tomorrow's dream begins.</p>
                </div>

                <div className="footer-grid story-grid">
                    <div className="footer-brand">
                        <Link to="/" className="footer-logo-ink">AweTales <i className="fa-solid fa-wand-magic-sparkles spark"></i></Link>
                        <p className="brand-tagline">One voice. Infinite dreams.</p>
                        
                        <div className="social-portals">
                            <a href="#" className="portal"><i className="fa-brands fa-facebook-f"></i></a>
                            <a href="#" className="portal"><i className="fa-brands fa-twitter"></i></a>
                            <a href="#" className="portal"><i className="fa-brands fa-instagram"></i></a>
                        </div>
                    </div>
                    
                    <div className="footer-chapter">
                        <h4><i className="fa-solid fa-book-open"></i> Story Tools</h4>
                        <ul>
                            <li><Link to="/voices">Summon Narrators</Link></li>
                            <li><Link to="/dashboard">The Mentor's Chamber</Link></li>
                        </ul>
                    </div>

                    <div className="footer-chapter">
                        <h4><i className="fa-brands fa-fort-awesome"></i> About Our Tale</h4>
                        <ul>
                            <li><Link to="/about">Origins</Link></li>
                            <li><Link to="/blog">Library Chronicles</Link></li>
                            <li><a href="#">The Authors (Careers)</a></li>
                        </ul>
                    </div>

                    <div className="footer-chapter">
                        <h4><i className="fa-solid fa-moon"></i> Need Help Tonight?</h4>
                        <ul>
                            <li><a href="#">The Guidebook (Help)</a></li>
                            <li><a href="#">Send a Raven (Contact)</a></li>
                            <li><a href="#">Laws of the Realm (Privacy)</a></li>
                        </ul>
                    </div>
                </div>
                
                <div className="story-end-strip">
                    <p>&copy; 2026 AweTales. Closed Book Inc.</p>
                    <p className="made-with-love">Made with <i className="fa-solid fa-heart heart-pulse"></i> to tell bedtime stories across the world <i className="fa-solid fa-globe"></i></p>
                </div>
            </div>
        </div>
    </footer>
  );
}

export default Footer;
