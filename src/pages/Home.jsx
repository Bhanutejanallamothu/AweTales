import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Home() {
  return (
    <>
      <Header />
      <main className="story-realm-main">
        {/* Hero Section: Gateway to the Story Realm */}
        <section className="magical-hero">
           <div className="sky-layer"></div>
           <div className="container hero-content-layer">
               <div className="hero-text">
                   <h1 className="fantasy-title">Enter the World of Stories</h1>
                   <h2 className="fantasy-subtitle text-gold-gradient">Magical Storytelling with Your Voice</h2>
                   <p className="hero-caption">"Every voice holds a story. Let yours be heard tonight."</p>
                   <Link to="/signup" style={{textDecoration:'none'}}>
                       <button className="btn-begin-journey btn-large" style={{padding:'16px 36px', fontSize:'1.2rem'}}>
                           Begin Your Story <i className="fa-solid fa-sparkles" style={{marginLeft:'8px'}}></i>
                       </button>
                   </Link>
               </div>
               <div className="hero-portals">
                   {/* 3D floating portal cards */}
                   <div className="portal-card p1">
                       <i className="fa-solid fa-microphone-lines"></i>
                       <h4>Your Voice</h4>
                   </div>
                   <div className="portal-card p2">
                       <i className="fa-solid fa-book-sparkles"></i>
                       <h4>Their Story</h4>
                   </div>
                   <div className="portal-card p3">
                       <i className="fa-solid fa-heart-pulse"></i>
                       <h4>Unbreakable Bond</h4>
                   </div>
               </div>
           </div>
        </section>

        {/* Dream Whisper Section */}
        <section className="dream-whisper">
            <div className="dream-sky"></div>
            <div className="container">
                <div className="glass-quote-card">
                    <i className="fa-solid fa-moon quote-icon"></i>
                    <p className="intro-text">"A voice can travel beyond distance…"</p>
                    <h2 className="quote-title">Your Voice, Their Dreams</h2>
                    <p className="quote-desc">Create magical bedtime stories narrated in your own voice with AI. Connect with your children even when you're apart.</p>
                </div>
            </div>
        </section>

        {/* Meet Your Story Companions (How it Works) */}
        <section className="story-companions">
            <div className="container">
                <div className="section-header text-center">
                    <h2>Your Story Journey Begins Here</h2>
                    <p>Three magical companions will guide you.</p>
                </div>
                <div className="companions-row">
                    <div className="companion-card c-fairy">
                        <div className="companion-avatar"><i className="fa-solid fa-wand-magic-sparkles"></i></div>
                        <h3>Voice Fairy</h3>
                        <p className="speech-bubble">"Give me your voice... I will turn it into magic."</p>
                    </div>
                    <div className="companion-card c-keeper">
                        <div className="companion-avatar"><i className="fa-solid fa-book-journal-whills"></i></div>
                        <h3>Story Keeper</h3>
                        <p className="speech-bubble">"Choose a tale... I will bring it to life."</p>
                    </div>
                    <div className="companion-card c-guardian">
                        <div className="companion-avatar"><i className="fa-solid fa-heart-circle-bolt"></i></div>
                        <h3>Dream Guardian</h3>
                        <p className="speech-bubble">"I carry your love into their dreams."</p>
                    </div>
                </div>
            </div>
        </section>

        {/* Stories from Loving Parents (Testimonials) */}
        <section className="parent-stories">
            <div className="container">
                <div className="section-header text-center">
                    <h2>Stories from Loving Parents</h2>
                    <p>Moments that became memories.</p>
                </div>
                <div className="story-scenes-carousel">
                    <div className="scene-card night-scene">
                        <span className="scene-tag"><i className="fa-solid fa-moon"></i> Bedtime Memory</span>
                        <p className="scene-quote">"Even when I travel for work, my daughter still sleeps hearing my voice. That moment... means everything."</p>
                        <div className="scene-author">Lakshmi N.</div>
                    </div>
                    <div className="scene-card travel-scene">
                        <span className="scene-tag"><i className="fa-solid fa-plane"></i> Distance Story</span>
                        <p className="scene-quote">"The technology is incredible. My kids can't tell the difference between the AI voice and my real voice. It's like magic!"</p>
                        <div className="scene-author">Shiv Kumar</div>
                    </div>
                    <div className="scene-card happy-scene">
                        <span className="scene-tag"><i className="fa-solid fa-sun"></i> Morning Joy</span>
                        <p className="scene-quote">"This gives me the flexibility I need while ensuring my son always has that personal connection to his bedtime stories."</p>
                        <div className="scene-author">Emily J.</div>
                    </div>
                </div>
            </div>
        </section>

        {/* Final Open Book CTA */}
        <section className="open-book-cta">
            <div className="giant-book-bg">
                <div className="magic-particles"></div>
            </div>
            <div className="container text-center cta-content">
                <h2>A Story Is Waiting To Hear Your Voice...</h2>
                <p>Step into a world where your voice becomes their favorite story. Tonight's story hasn't been told yet.</p>
                <Link to="/signup" style={{textDecoration:'none'}}>
                    <button className="btn-begin-journey btn-large" style={{padding:'16px 36px', fontSize:'1.2rem', marginTop: '20px'}}>
                        Open the First Chapter
                    </button>
                </Link>
            </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default Home;
