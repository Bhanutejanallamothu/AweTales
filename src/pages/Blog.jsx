import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Blog() {
  return (
    <>
      <Header />
      <main>
        {/* Blog Header */}
        <section className="blog-hero">
            <div className="container">
                <h1 className="section-title">The AweTales Story Hub</h1>
                <p className="section-subtitle">Insights, tips, and stories about creating magical family moments through personalized storytelling and voice technology.</p>
                
                <div className="search-bar">
                    <i className="fa-solid fa-search"></i>
                    <input type="text" placeholder="Search articles..." />
                </div>
                
                <div className="blog-filters">
                    <a href="#" className="active">Technology</a>
                    <a href="#">Family</a>
                    <a href="#">Inclusion</a>
                    <a href="#">Tips</a>
                    <a href="#">Research</a>
                </div>
            </div>
        </section>

        {/* Featured Post */}
        <section className="featured-post-section">
            <div className="container">
                <div className="featured-card">
                    <div className="featured-image">
                        <div className="abstract-bg">
                            <h1>AI</h1>
                        </div>
                    </div>
                    <div className="featured-content">
                        <div className="post-meta">
                            <span>1/15/2026</span> • <span>5 min read</span> • <span className="tag">Technology</span>
                        </div>
                        <h2>The Science Behind Voice Cloning: How AweTales Creates Magic</h2>
                        <p>Discover the cutting-edge AI technology that makes AweTales possible and how we preserve the emotional nuance of your voice.</p>
                        
                        <div className="post-author">
                            <i className="fa-solid fa-user"></i>
                            <span>Dr. Sarah Chen, AweTales AI Team</span>
                        </div>
                        
                        <a href="#" className="read-more">Read more <i className="fa-solid fa-arrow-right"></i></a>
                    </div>
                </div>
            </div>
        </section>

        {/* Blog Grid */}
        <section className="blog-grid-section">
            <div className="container">
                <div className="blog-grid">
                    {/* Post 1 */}
                    <div className="blog-card">
                        <div className="blog-card-image" style={{backgroundColor: '#f1f5f9'}}>
                            <img src="https://images.unsplash.com/photo-1543269664-7eef42226a21?w=500&q=80" alt="Family reading" />
                        </div>
                        <div className="blog-card-content">
                            <div className="post-meta">
                                <span>1/10/2024</span> • <span>7 min read</span> • <span className="tag">Family</span>
                            </div>
                            <h3>Building Stronger Family Bonds Through Storytelling</h3>
                            <p>Research shows that shared storytelling experiences create lasting emotional connections. Here's how AweTales strengthens family relationships.</p>
                            <div className="post-footer">
                                <div className="post-author small">
                                    <i className="fa-solid fa-user"></i>
                                    <span>Dr. Maria Rodriguez, Child Development Expert</span>
                                </div>
                                <a href="#" className="read-btn">Read <i className="fa-solid fa-arrow-right"></i></a>
                            </div>
                        </div>
                    </div>
                    
                    {/* Post 2 */}
                    <div className="blog-card">
                        <div className="blog-card-image" style={{backgroundColor: '#f1f5f9'}}>
                            <img src="https://images.unsplash.com/photo-1512820790803-83ca734da794?w=500&q=80" alt="Inclusive reading" />
                        </div>
                        <div className="blog-card-content">
                            <div className="post-meta">
                                <span>1/5/2024</span> • <span>6 min read</span> • <span className="tag">Inclusion</span>
                            </div>
                            <h3>Creating Inclusive Stories: Representation Matters in Children's...</h3>
                            <p>Every child deserves to see themselves in stories. Learn how AweTales promotes diversity and inclusion in children's storytelling.</p>
                            <div className="post-footer">
                                <div className="post-author small">
                                    <i className="fa-solid fa-user"></i>
                                    <span>Dr. Aisha Jackson, Diversity & Inclusion Consultant</span>
                                </div>
                                <a href="#" className="read-btn">Read <i className="fa-solid fa-arrow-right"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* Newsletter Section */}
        <section className="newsletter-section">
            <div className="container newsletter-content">
                <i className="fa-solid fa-envelope newsletter-icon"></i>
                <h2>Stay Updated</h2>
                <p>Get the latest insights on family storytelling, parenting tips, and AweTales updates delivered to your inbox.</p>
                
                <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
                    <input type="email" placeholder="your.email@example.com" required />
                </form>
                <div className="privacy-note">
                    <i className="fa-solid fa-lock"></i> We respect your privacy. Unsubscribe anytime.
                </div>
            </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default Blog;
