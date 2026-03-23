import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

function Login() {
  const navigate = useNavigate();

  useEffect(() => {
    document.body.classList.add('auth-page');
    document.body.classList.add('daylight-portal-bg');
    return () => {
      document.body.classList.remove('auth-page');
      document.body.classList.remove('daylight-portal-bg');
    };
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  return (
    <motion.div 
      initial={{ scale: 1.05, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.95, opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="auth-portal-container"
    >
      <div className="auth-card daylight-auth">
          <div className="auth-icon portal-icon">
              <i className="fa-solid fa-arrow-right-to-bracket"></i>
          </div>
          
          <h2 className="portal-title text-night-gradient">Welcome Back</h2>
          <p className="auth-subtitle portal-subtitle">Sign in to your AweTales account to continue creating magical stories</p>
          
          <form className="auth-form" onSubmit={handleLogin}>
              <div className="form-group">
                  <label>Email</label>
                  <div className="input-with-icon magic-input-wrapper">
                      <i className="fa-regular fa-envelope"></i>
                      <input type="email" placeholder="Enter your email" required />
                  </div>
              </div>
              
              <div className="form-group">
                  <div className="label-row">
                      <label>Password</label>
                      <a href="#" className="forgot-link">Forgot password?</a>
                  </div>
                  <div className="input-with-icon magic-input-wrapper">
                      <i className="fa-solid fa-lock"></i>
                      <input type="password" placeholder="Enter your password" required />
                      <i className="fa-regular fa-eye toggle-password"></i>
                  </div>
              </div>
              
              <motion.button 
                  whileHover={{ scale: 1.05, boxShadow: "0 8px 25px rgba(245,158,11,0.5)" }}
                  whileTap={{ scale: 0.95 }}
                  type="submit" 
                  className="btn-auth btn-adventure"
              >
                  Sign In
              </motion.button>
          </form>
          
          <div className="auth-footer portal-footer">
              <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
              <Link to="/" className="back-link">&larr; Back to Home</Link>
          </div>
      </div>
    </motion.div>
  );
}

export default Login;
