import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer>
        <div className="container">
            <div className="footer-grid">
                <div className="footer-brand">
                    <Link to="/" className="footer-logo">AweTales</Link>
                    <p>Creating magical storytelling experiences that bring families closer together, one voice at a time.</p>
                    <div className="social-links">
                        <a href="#"><i className="fa-brands fa-facebook-f"></i></a>
                        <a href="#"><i className="fa-brands fa-twitter"></i></a>
                        <a href="#"><i className="fa-brands fa-instagram"></i></a>
                        <a href="#"><i className="fa-brands fa-youtube"></i></a>
                    </div>
                </div>
                
                <div className="footer-links">
                    <h4>Product</h4>
                    <ul>
                        <li><a href="#">FAQ</a></li>
                        <li><a href="#">Features</a></li>
                    </ul>
                </div>

                <div className="footer-links">
                    <h4>Company</h4>
                    <ul>
                        <li><Link to="/about">About</Link></li>
                        <li><Link to="/blog">Blog</Link></li>
                        <li><a href="#">Contact</a></li>
                        <li><a href="#">Careers</a></li>
                    </ul>
                </div>

                <div className="footer-links">
                    <h4>Support</h4>
                    <ul>
                        <li><a href="#">Help Center</a></li>
                        <li><a href="#">Contact Support</a></li>
                        <li><a href="#">Privacy Policy</a></li>
                        <li><a href="#">Terms of Service</a></li>
                    </ul>
                </div>
            </div>
            
            <div className="footer-bottom">
                <p>&copy; 2026 AweTales. All rights reserved.</p>
                <p>Made with <i className="fa-solid fa-heart" style={{color: '#ff4757'}}></i> for families everywhere</p>
            </div>
        </div>
    </footer>
  );
}

export default Footer;
