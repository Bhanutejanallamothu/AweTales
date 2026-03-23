import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();

  useEffect(() => {
    document.body.classList.add('auth-page');
    return () => document.body.classList.remove('auth-page');
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  return (
    <div className="auth-card">
        <div className="auth-icon">
            <i className="fa-solid fa-arrow-right-to-bracket"></i>
        </div>
        
        <h2>Welcome Back</h2>
        <p className="auth-subtitle">Sign in to your AweTales account to continue creating magical stories</p>
        
        <form className="auth-form" onSubmit={handleLogin}>
            <div className="form-group">
                <label>Email</label>
                <div className="input-with-icon">
                    <i className="fa-regular fa-envelope"></i>
                    <input type="email" placeholder="Enter your email" required />
                </div>
            </div>
            
            <div className="form-group">
                <div className="label-row">
                    <label>Password</label>
                    <a href="#" className="forgot-link">Forgot password?</a>
                </div>
                <div className="input-with-icon">
                    <i className="fa-solid fa-lock"></i>
                    <input type="password" placeholder="Enter your password" required />
                    <i className="fa-regular fa-eye toggle-password"></i>
                </div>
            </div>
            
            <button type="submit" className="btn-auth">Sign In</button>
        </form>
        
        <div className="auth-footer">
            <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
            <Link to="/" className="back-link">&larr; Back to Home</Link>
        </div>
    </div>
  );
}

export default Login;
