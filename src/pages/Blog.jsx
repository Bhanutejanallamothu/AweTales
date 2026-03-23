import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Blog() {
  return (
    <>
      <Header />
      <main className="magical-library-main">
          {/* Library Entrance */}
          <section className="library-intro">
              <div className="library-atmosphere">
                  <div className="dust-motes"></div>
                  <div className="moonlight-beam"></div>
              </div>
              <div className="container text-center library-header">
                  <h1 className="library-title text-gold-gradient">Welcome to the AweTales Story Library</h1>
                  <p className="library-subtitle">Pick a story. Discover a world.</p>
                  
                  <div className="story-finder">
                      <div className="finder-wrapper">
                          <i className="fa-solid fa-magnifying-glass"></i>
                          <input type="text" placeholder="Search for a story, idea, or dream..." />
                          <i className="fa-solid fa-book finder-icon-right"></i>
                      </div>
                  </div>
              </div>
          </section>

          {/* Shelf Labels */}
          <section className="shelf-labels-section border-bottom">
              <div className="container text-center">
                  <div className="wooden-tags">
                      <button className="wood-tag active"><i className="fa-solid fa-star"></i> Fairy Tales</button>
                      <button className="wood-tag"><i className="fa-solid fa-moon"></i> Bedtime Tips</button>
                      <button className="wood-tag"><i className="fa-solid fa-heart"></i> Family Bonds</button>
                      <button className="wood-tag"><i className="fa-solid fa-flask"></i> Story Science</button>
                  </div>
              </div>
          </section>

          {/* Bookshelf Grid Layout */}
          <section className="bookshelf-grid-section">
              <div className="container">
                  {/* Shelf 1 */}
                  <div className="library-shelf">
                      <div className="books-row">
                          <div className="library-book cover-night">
                              <span className="spine-text">The Psychology of Bedtime Routines</span>
                          </div>
                          <div className="library-book cover-forest">
                              <span className="spine-text">Why Voice Cloning is Safe for Kids</span>
                          </div>
                          <div className="library-book cover-magic">
                              <span className="spine-text">Top 10 Classic Fairy Tales</span>
                          </div>
                          <div className="library-book cover-fire">
                              <span className="spine-text">Connecting Grandparents Over Oceans</span>
                          </div>
                      </div>
                      <div className="wooden-plank"></div>
                      <div className="shelf-shadow" style={{height:'40px', background:'linear-gradient(to bottom, rgba(0,0,0,0.4), transparent)'}}></div>
                  </div>

                  {/* Shelf 2 */}
                  <div className="library-shelf mt-6">
                      <div className="books-row">
                          <div className="library-book cover-ocean">
                              <span className="spine-text">Creating the Perfect Sleep Environment</span>
                          </div>
                          <div className="library-book cover-sunset">
                              <span className="spine-text">The Evolution of Oral Storytelling</span>
                          </div>
                          <div className="library-book cover-dawn">
                              <span className="spine-text">How AI Understands Emotional Tone</span>
                          </div>
                      </div>
                      <div className="wooden-plank"></div>
                      <div className="shelf-shadow" style={{height:'40px', background:'linear-gradient(to bottom, rgba(0,0,0,0.4), transparent)'}}></div>
                  </div>
              </div>
          </section>
      </main>
      <Footer />
    </>
  );
}

export default Blog;
