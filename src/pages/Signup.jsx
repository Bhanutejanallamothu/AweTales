import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Signup() {
  const navigate = useNavigate();

  useEffect(() => {
    document.body.classList.add('auth-page');
    return () => document.body.classList.remove('auth-page');
  }, []);

  const handleSignup = (e) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  return (
    <div className="auth-card signup-card">
        <div className="auth-icon">
            <i className="fa-solid fa-user-plus"></i>
        </div>
        
        <h2>Create Your Account</h2>
        <p className="auth-subtitle">Join AweTales and start creating magical stories with your voice</p>
        
        <form className="auth-form" onSubmit={handleSignup}>
            <div className="form-row">
                <div className="form-group">
                    <label>First Name</label>
                    <div className="input-with-icon">
                        <i className="fa-regular fa-user"></i>
                        <input type="text" placeholder="First name" required />
                    </div>
                </div>
                <div class="form-group">
                    <label>Last Name</label>
                    <div className="input-with-icon">
                        <i className="fa-regular fa-user"></i>
                        <input type="text" placeholder="Last name" required />
                    </div>
                </div>
            </div>
            
            <div className="form-group">
                <label>Email</label>
                <div className="input-with-icon">
                    <i className="fa-regular fa-envelope"></i>
                    <input type="email" placeholder="Enter your email" required />
                </div>
            </div>
            
            <div className="form-group">
                <label>Password</label>
                <div className="input-with-icon">
                    <i className="fa-solid fa-lock"></i>
                    <input type="password" placeholder="Create password" required />
                    <i className="fa-regular fa-eye toggle-password"></i>
                </div>
            </div>

            <div className="form-group">
                <label>Confirm Password</label>
                <div className="input-with-icon">
                    <i className="fa-solid fa-lock"></i>
                    <input type="password" placeholder="Confirm password" required />
                    <i className="fa-regular fa-eye toggle-password"></i>
                </div>
            </div>
            
            <button type="submit" className="btn-auth">Create Account</button>
        </form>
        
        <div className="auth-footer">
            <p>Already have an account? <Link to="/login">Sign in</Link></p>
            <Link to="/" className="back-link">&larr; Back to Home</Link>
        </div>
    </div>
  );
}

export default Signup;
