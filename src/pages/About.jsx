import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function About() {
  return (
    <>
      <Header />
      <main>
        {/* Our Story Begins With Your Story */}
        <section className="about-hero">
            <div className="container">
                <h1 className="section-title">Our Story Begins with Your Story</h1>
                <p className="section-subtitle">
                    AweTales was born from a simple belief: every child deserves to hear their loved ones' voices in their bedtime stories, no matter where life takes us. We're building technology that preserves the most precious moments of childhood.
                </p>
            </div>
        </section>

        {/* Our Mission */}
        <section className="our-mission">
            <div className="container mission-grid">
                <div className="mission-content">
                    <h2 className="section-title text-left">Our Mission</h2>
                    <p>We're on a mission to strengthen family bonds through the timeless magic of storytelling. By combining cutting-edge AI with the irreplaceable warmth of a parent's voice, we're creating technology that brings families closer together, not further apart.</p>
                    <p>Every night, millions of children go to sleep without hearing their parents' voices. Whether it's due to work, travel or simply the demands of modern life, we believe no child should have to sacrifice this precious connection.</p>
                </div>
                <div className="mission-image-card">
                    <div className="mission-card-inner">
                        <i className="fa-solid fa-users"></i>
                        <h3>Connecting Families</h3>
                    </div>
                    <i className="fa-solid fa-heart corner-heart-top"></i>
                    <i className="fa-solid fa-moon corner-moon-bottom"></i>
                </div>
            </div>
        </section>

        {/* Our Journey */}
        <section className="our-journey bg-gray">
            <div className="container">
                <h2 className="section-title">Our Journey</h2>
                <p className="section-subtitle">From a parent's frustration to a global solution—here's how AweTales came to life</p>
                
                <div className="timeline">
                    <div className="timeline-item">
                        <div className="timeline-badge badge-purple">2024</div>
                        <div className="timeline-content">
                            <h3>The Spark of Innovation</h3>
                            <p>Founded by parents who understood the challenge of maintaining bedtime story traditions while managing busy lives.</p>
                        </div>
                    </div>
                    <div className="timeline-item">
                        <div className="timeline-badge badge-purple">2025</div>
                        <div className="timeline-content">
                            <h3>AI Breakthrough</h3>
                            <p>Developed proprietary voice cloning technology that captures emotional nuance and personal storytelling style.</p>
                        </div>
                    </div>
                    <div className="timeline-item">
                        <div className="timeline-badge badge-purple">Present</div>
                        <div className="timeline-content">
                            <h3>Growing Family</h3>
                            <p>Thousands of families worldwide creating magical bedtime moments with AweTales.</p>
                        </div>
                    </div>
                    <div className="timeline-item">
                        <div className="timeline-badge badge-purple">Future</div>
                        <div className="timeline-content">
                            <h3>Endless Possibilities</h3>
                            <p>Expanding into multilingual support, interactive stories, and educational content partnerships.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* Our Values */}
        <section className="our-values">
            <div className="container">
                <h2 className="section-title">Our Values</h2>
                <p className="section-subtitle">The principles that guide everything we do at AweTales</p>
                
                <div className="values-grid">
                    <div className="value-card">
                        <div className="value-header">
                            <i className="fa-solid fa-heart"></i>
                            <h3>Family First</h3>
                        </div>
                        <p>Every feature we build starts with a simple question: How can this bring families closer together?</p>
                    </div>
                    <div className="value-card">
                        <div className="value-header">
                            <i className="fa-solid fa-shield"></i>
                            <h3>Privacy & Trust</h3>
                        </div>
                        <p>Your family's voice data is sacred. We use bank-level encryption and never share personal information.</p>
                    </div>
                    <div className="value-card">
                        <div className="value-header">
                            <i className="fa-solid fa-star"></i>
                            <h3>Magical Experiences</h3>
                        </div>
                        <p>We believe technology should feel like magic, not mechanics. Every interaction should spark wonder.</p>
                    </div>
                    <div className="value-card">
                        <div className="value-header">
                            <i className="fa-solid fa-globe"></i>
                            <h3>Inclusive Storytelling</h3>
                        </div>
                        <p>Stories should reflect the beautiful diversity of families worldwide. Everyone deserves to see themselves in tales of wonder.</p>
                    </div>
                </div>
            </div>
        </section>

        {/* Built by Parents */}
        <section className="built-by-parents bg-gray">
            <div className="container">
                <h2 className="section-title">Built by Parents, for Parents</h2>
                <p className="section-subtitle">Our team combines decades of experience in AI, child development, and storytelling. But most importantly, we're all parents who understand the magic of bedtime stories.</p>
                
                <div className="quote-card-large">
                    <i className="fa-solid fa-quote-left quote-icon"></i>
                    <p className="large-quote">"We started AweTales because we know that a parent's voice is irreplaceable. Technology should amplify love, not replace it. Every feature we build is tested by our own families first."</p>
                    <div className="quote-author">
                        <h4>The AweTales Team</h4>
                        <span>Parents, Engineers, Dreamers</span>
                    </div>
                </div>
            </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default About;
