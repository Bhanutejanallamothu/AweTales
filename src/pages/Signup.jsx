import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

function Signup() {
  const navigate = useNavigate();

  useEffect(() => {
    document.body.classList.add('auth-page');
    document.body.classList.add('daylight-portal-bg');
    return () => {
      document.body.classList.remove('auth-page');
      document.body.classList.remove('daylight-portal-bg');
    };
  }, []);

  const handleSignup = (e) => {
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
      <div className="auth-card signup-card daylight-auth">
          <div className="auth-icon portal-icon">
              <i className="fa-solid fa-user-plus"></i>
          </div>
          
          <h2 className="portal-title text-night-gradient">Create Your Account</h2>
          <p className="auth-subtitle portal-subtitle">Join AweTales and start creating magical stories with your voice</p>
          
          <form className="auth-form" onSubmit={handleSignup}>
              <div className="form-row">
                  <div className="form-group">
                      <label>First Name</label>
                      <div className="input-with-icon magic-input-wrapper">
                          <i className="fa-regular fa-user"></i>
                          <input type="text" placeholder="First name" required />
                      </div>
                  </div>
                  <div className="form-group">
                      <label>Last Name</label>
                      <div className="input-with-icon magic-input-wrapper">
                          <i className="fa-regular fa-user"></i>
                          <input type="text" placeholder="Last name" required />
                      </div>
                  </div>
              </div>
              
              <div className="form-group">
                  <label>Email</label>
                  <div className="input-with-icon magic-input-wrapper">
                      <i className="fa-regular fa-envelope"></i>
                      <input type="email" placeholder="Enter your email" required />
                  </div>
              </div>
              
              <div className="form-group">
                  <label>Password</label>
                  <div className="input-with-icon magic-input-wrapper">
                      <i className="fa-solid fa-lock"></i>
                      <input type="password" placeholder="Create password" required />
                      <i className="fa-regular fa-eye toggle-password"></i>
                  </div>
              </div>

              <div className="form-group">
                  <label>Confirm Password</label>
                  <div className="input-with-icon magic-input-wrapper">
                      <i className="fa-solid fa-lock"></i>
                      <input type="password" placeholder="Confirm password" required />
                      <i className="fa-regular fa-eye toggle-password"></i>
                  </div>
              </div>
              
              <motion.button 
                  whileHover={{ scale: 1.05, boxShadow: "0 8px 25px rgba(245,158,11,0.5)" }}
                  whileTap={{ scale: 0.95 }}
                  type="submit" 
                  className="btn-auth btn-adventure"
              >
                  Create Account
              </motion.button>
          </form>
          
          <div className="auth-footer portal-footer">
              <p>Already have an account? <Link to="/login">Sign in</Link></p>
              <Link to="/" className="back-link">&larr; Back to Home</Link>
          </div>
      </div>
    </motion.div>
  );
}

export default Signup;
