import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Home() {
  return (
    <>
      <Header />
      <main>
        {/* Dynamic Interactive Hero Section (from design request) */}
        <section className="hero-section">
            <div className="hero-top-glow"></div>
            <div className="shape shape-1"></div>
            <div className="shape shape-2"></div>
            <div className="shape shape-3"></div>

            <div className="hero-container">
                <div className="hero-content">
                    <h1 className="hero-title">
                        <span className="text-purple display-block">Magical</span>
                        <span className="text-dark display-block">Storytelling</span>
                        <span className="text-gradient">with Your Voice</span>
                    </h1>
                    <p className="hero-subtitle">
                        Create personalized audiobooks that bring you and your child closer together. Your voice, their favorite stories, endless magical moments.
                    </p>
                    <Link to="/signup"><button className="btn-signup-hero">Sign Up</button></Link>
                </div>
                
                <div className="hero-visual">
                    <div className="feature-cards-wrapper">
                        <div className="mini-card mc-yellow">
                            <div className="mini-card-icon">
                                <i className="fa-solid fa-microphone"></i>
                            </div>
                            <h4>Record Voice</h4>
                        </div>
                        <div className="mini-card mc-blue">
                            <div className="mini-card-icon">
                                <i className="fa-solid fa-book-open"></i>
                            </div>
                            <h4>Choose Story</h4>
                        </div>
                        <div className="mini-card mc-pink">
                            <div className="mini-card-icon">
                                <i className="fa-regular fa-heart"></i>
                            </div>
                            <h4>Share Love</h4>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* Your Voice Their Dreams Banner */}
        <section className="dreams-banner">
            <div className="container text-center">
                <h2 className="dreams-title">Your Voice<br/>Their Dreams</h2>
                <p className="dreams-subtitle">
                    Create magical bedtime stories narrated in your own voice with AI.<br/>
                    Connect with your children even when you're apart.
                </p>
            </div>
        </section>

        {/* How It Works Section */}
        <section className="how-it-works" id="how-it-works">
            <div className="container">
                <h2 className="section-title">How It Works</h2>
                <p className="section-subtitle">Three simple steps to create magical storytelling experiences for your children</p>
                
                <div className="steps-grid">
                    <div className="step-card">
                        <div className="icon-wrapper icon-purple">
                            <i className="fa-solid fa-microphone"></i>
                        </div>
                        <h3>Record Your Voice</h3>
                        <p>Upload a sample of your voice and let our AI learn your unique tone and style.</p>
                    </div>
                    <div className="step-card">
                        <div className="icon-wrapper icon-orange">
                            <i className="fa-solid fa-book-open"></i>
                        </div>
                        <h3>Choose Stories</h3>
                        <p>Select from our curated library of beautiful children's stories and fairy tales.</p>
                    </div>
                    <div className="step-card">
                        <div className="icon-wrapper icon-pink">
                            <i className="fa-regular fa-heart"></i>
                        </div>
                        <h3>Share Love</h3>
                        <p>Listen together as your child hears their favorite stories in your loving voice.</p>
                    </div>
                </div>
            </div>
        </section>

        {/* Why Parents Love AweTales Section */}
        <section className="features" id="features">
            <div className="container">
                <h2 className="section-title">Why Parents Love AweTales</h2>
                <p className="section-subtitle">Discover the magic that's already transforming bedtime for thousands of families</p>
                
                <div className="features-grid">
                    <div className="feature-card">
                        <div className="icon-purple-bg"><i className="fa-regular fa-heart"></i></div>
                        <h3>Emotional Connection</h3>
                        <p>Your voice creates deeper emotional bonds, making every story a precious memory between you and your child.</p>
                    </div>
                    <div className="feature-card">
                        <div className="icon-blue-bg"><i className="fa-solid fa-bolt"></i></div>
                        <h3>AI-Powered Magic</h3>
                        <p>Advanced voice cloning technology that captures the nuances and warmth of your unique voice.</p>
                    </div>
                    <div className="feature-card">
                        <div className="icon-green-bg"><i className="fa-regular fa-clock"></i></div>
                        <h3>Always Available</h3>
                        <p>Whether you're traveling, working late, or need a break, your voice is always there for bedtime.</p>
                    </div>
                    <div className="feature-card">
                        <div className="icon-purple2-bg"><i className="fa-solid fa-wand-magic-sparkles"></i></div>
                        <h3>Personalized Stories</h3>
                        <p>Customize tales with your child's name, favorite characters, and personal details for truly unique adventures.</p>
                    </div>
                    <div className="feature-card">
                        <div className="icon-orange-bg"><i className="fa-solid fa-brain"></i></div>
                        <h3>Learning Enhanced</h3>
                        <p>Familiar voices improve comprehension and retention, making storytime both fun and educational.</p>
                    </div>
                    <div className="feature-card">
                        <div className="icon-blue2-bg"><i className="fa-solid fa-shield-halved"></i></div>
                        <h3>Safe & Secure</h3>
                        <p>Your voice data is encrypted and protected. We prioritize your family's privacy and security above all.</p>
                    </div>
                </div>
            </div>
        </section>

        {/* What Parents Are Saying Section */}
        <section className="testimonials" id="testimonials">
            <div className="container">
                <h2 className="section-title">What Parents Are Saying</h2>
                <p className="section-subtitle">Real stories from real families</p>
                
                <div className="testimonials-grid">
                    <div className="testimonial-card">
                        <div className="stars">
                            <i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i>
                        </div>
                        <p className="quote">"AweTales has been a game-changer for our bedtime routine. Even when I'm traveling for work, my daughter can still hear mommy's voice telling her favorite stories."</p>
                        <div className="profile">
                            <img src="https://i.pravatar.cc/100?img=1" alt="Lakshmi N" className="avatar" />
                            <div className="info">
                                <h4>Lakshmi N</h4>
                                <span>Working Mom</span>
                            </div>
                        </div>
                    </div>
                    <div className="testimonial-card">
                        <div className="stars">
                            <i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i>
                        </div>
                        <p className="quote">"The technology is incredible. My kids can't tell the difference between the AI voice and my real voice. It's like magic!"</p>
                        <div className="profile">
                            <img src="https://i.pravatar.cc/100?img=11" alt="Shiv Kumar" className="avatar" />
                            <div className="info">
                                <h4>Shiv Kumar</h4>
                                <span>Dad of Two</span>
                            </div>
                        </div>
                    </div>
                    <div className="testimonial-card">
                        <div className="stars">
                            <i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i>
                        </div>
                        <p className="quote">"This gives me the flexibility I need while ensuring my son always has that personal connection to bedtime stories."</p>
                        <div className="profile">
                            <img src="https://i.pravatar.cc/100?img=9" alt="Emily Johnson" className="avatar" />
                            <div className="info">
                                <h4>Emily Johnson</h4>
                                <span>Mother of One</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* CTA Section */}
        <section className="cta" id="cta">
            <div className="container cta-content">
                <h2 className="section-title">Ready to Create Magic?</h2>
                <p>Join thousands of families already creating magical bedtime experiences with AweTales</p>
                <Link to="/signup"><button className="btn-primary-large">Start Your Free Trial <i className="fa-solid fa-arrow-right"></i></button></Link>
            </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default Home;
