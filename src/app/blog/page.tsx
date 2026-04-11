"use client";

import React from 'react';
import css from './blog.module.css';
import Card from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';

export default function Blog() {
  const categories = [
    'All Stories', 'Technology', 'Family & Parenting', 'Inclusion', 'Tips & Ideas', 'Research'
  ];

  return (
    <div className={css.page}>
      {/* Header */}
      <section className={`${css.header} container flex-center`}>
        <div className={css.headerContent}>
          <h1 className="form-title animate-fade-in text-gradient">The AweTales Story Hub 🎧</h1>
          <p className={`${css.headerSubtext} animate-fade-in`} style={{ animationDelay: '0.2s' }}>
            Insights, tips, and stories for creating magical family moments
          </p>
          
          <div className={`${css.searchBox} animate-fade-in`} style={{ animationDelay: '0.3s' }}>
            <Input id="search" label="" placeholder="Search stories, tips, or topics..." />
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="container">
        <div className={css.categories}>
          {categories.map((cat, i) => (
            <button key={i} className={`${css.categoryTag} ${i === 0 ? css.activeTag : ''}`}>
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Featured Article */}
      <section className="section container">
        <div className="sectionHeader" style={{ marginBottom: '2rem' }}>
          <h2>Featured Article</h2>
        </div>
        <Card glow hoverable className={css.featuredArticle}>
          <div className={css.featuredImage}></div>
          <div className={css.featuredContent}>
            <h3>The Science Behind Voice Cloning</h3>
            <p>Explore how AI captures the emotion and warmth of your voice to deliver truly magical story experiences for your children.</p>
            <div className={css.articleMeta}>
              <span>By Dr. Sarah Chen</span>
              <span>•</span>
              <span>5 min read</span>
            </div>
            <div style={{ marginTop: '1.5rem' }}>
              <Button variant="outline">Read Full Story →</Button>
            </div>
          </div>
        </Card>
      </section>

      {/* Articles Grid */}
      <section className="section container" style={{ paddingTop: 0 }}>
        <div className="sectionHeader" style={{ marginBottom: '2rem' }}>
          <h2>Latest Articles</h2>
        </div>
        <div className={css.articlesGrid}>
          <Card hoverable className={css.articleCard}>
            <div className={css.articleBadge}>Family</div>
            <h4>Building Stronger Family Bonds Through Storytelling</h4>
            <p className={css.articleDesc}>Discover the emotional benefits of consistent bedtime storytelling and how it shapes your child&apos;s development.</p>
            <Button variant="ghost" className={css.readMore}>Read More →</Button>
          </Card>
          
          <Card hoverable className={css.articleCard}>
            <div className={css.articleBadge}>Inclusion</div>
            <h4>Creating Inclusive Stories</h4>
            <p className={css.articleDesc}>Why representation in children&apos;s content matters and how you can personalize stories to reflect your child&apos;s unique background.</p>
            <Button variant="ghost" className={css.readMore}>Read More →</Button>
          </Card>
        </div>
      </section>

      {/* Newsletter */}
      <section className="section container flex-center">
        <Card glow className={css.newsletterCard}>
          <h2>Stay Connected ✨</h2>
          <p>Get parenting tips and storytelling ideas delivered straight to your inbox.</p>
          <form className={css.newsletterForm} onSubmit={(e) => e.preventDefault()}>
            <Input id="newsletter-email" label="" type="email" placeholder="Enter your email address" />
            <Button variant="primary">Subscribe Now</Button>
          </form>
        </Card>
      </section>
    </div>
  );
}
