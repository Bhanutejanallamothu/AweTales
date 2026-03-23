import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Signup() {
  const navigate = useNavigate();

  useEffect(() => {
    document.body.classList.add('magical-portal-bg');
    return () => document.body.classList.remove('magical-portal-bg');
  }, []);

  const handleSignup = (e) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  return (
    <div className="auth-portal-container">
        <div className="giant-portal-ring"></div>
        <div className="ambient-forest-mist"></div>

        <div className="auth-portal-card signup-portal">
            <div className="portal-icon">
                <i className="fa-solid fa-wand-magic-sparkles"></i>
            </div>
            
            <h2 className="portal-title">Begin Your Story Journey</h2>
            <p className="portal-subtitle">Step into a world where your voice becomes magic.</p>
            
            <form className="magic-form" onSubmit={handleSignup}>
                <div className="form-row">
                    <div className="magic-group">
                        <label>First Name</label>
                        <div className="magic-input-wrapper">
                            <i className="fa-solid fa-feather-pointed"></i>
                            <input type="text" placeholder="Your storyteller name..." required />
                            <span className="ink-underline"></span>
                        </div>
                    </div>
                    <div className="magic-group">
                        <label>Last Name</label>
                        <div className="magic-input-wrapper">
                            <i className="fa-solid fa-feather-pointed"></i>
                            <input type="text" placeholder="Your family name..." required />
                            <span className="ink-underline"></span>
                        </div>
                    </div>
                </div>
                
                <div className="magic-group">
                    <label>Email Address</label>
                    <div className="magic-input-wrapper">
                        <i className="fa-solid fa-envelope-open-text"></i>
                        <input type="email" placeholder="Where shall we send your tales..." required />
                        <span className="ink-underline"></span>
                    </div>
                </div>
                
                <div className="magic-group">
                    <label>Create Secret Spell (Password)</label>
                    <div className="magic-input-wrapper">
                        <i className="fa-solid fa-key"></i>
                        <input type="password" placeholder="Create your secret spell..." required />
                        <i className="fa-regular fa-eye toggle-password"></i>
                        <span className="ink-underline"></span>
                    </div>
                </div>
                
                <button type="submit" className="btn-adventure">Open Your First Chapter</button>
            </form>
            
            <div className="portal-footer">
                <p>Already joined the realm? <Link to="/login">Enter Story</Link></p>
                <Link to="/" className="back-link">&larr; Return to Library</Link>
            </div>
        </div>
    </div>
  );
}

export default Signup;
