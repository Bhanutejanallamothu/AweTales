import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();

  useEffect(() => {
    document.body.classList.add('magical-portal-bg');
    return () => document.body.classList.remove('magical-portal-bg');
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  return (
    <div className="auth-portal-container">
        {/* Background ambient portal */}
        <div className="giant-portal-ring"></div>
        <div className="ambient-forest-mist"></div>

        <div className="auth-portal-card">
            <div className="portal-icon">
                <i className="fa-solid fa-book-open-reader"></i>
            </div>
            
            <h2 className="portal-title">Return to Your Story</h2>
            <p className="portal-subtitle">The next chapter is waiting for your voice.</p>
            
            <form className="magic-form" onSubmit={handleLogin}>
                <div className="magic-group">
                    <label>Storyteller Email</label>
                    <div className="magic-input-wrapper">
                        <i className="fa-solid fa-feather-pointed"></i>
                        <input type="email" placeholder="Where shall we send your tales..." required />
                        <span className="ink-underline"></span>
                    </div>
                </div>
                
                <div className="magic-group">
                    <div className="label-row">
                        <label>Secret Spell (Password)</label>
                        <a href="#" className="forgot-link">Lost your spell?</a>
                    </div>
                    <div className="magic-input-wrapper">
                        <i className="fa-solid fa-key"></i>
                        <input type="password" placeholder="Whisper your password..." required />
                        <i className="fa-regular fa-eye toggle-password"></i>
                        <span className="ink-underline"></span>
                    </div>
                </div>
                
                <button type="submit" className="btn-adventure">Enter the Story World</button>
            </form>
            
            <div className="portal-footer">
                <p>A new narrator? <Link to="/signup">Begin Your Journey</Link></p>
                <Link to="/" className="back-link">&larr; Return to Library</Link>
            </div>
        </div>
    </div>
  );
}

export default Login;
