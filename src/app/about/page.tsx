import React from 'react';
import css from './about.module.css';
import Card from '@/components/ui/Card';

export default function About() {
  return (
    <div className={css.page}>
      {/* Intro Header */}
      <section className={`${css.hero} container flex-center`}>
        <div className={css.heroContent}>
          <h1 className="form-title animate-fade-in text-gradient">Every Story Begins with Your Voice</h1>
          <p className={`${css.heroSubtext} animate-fade-in`} style={{ animationDelay: '0.2s' }}>
            AweTales was built on a simple belief: every child deserves to hear the voice of someone they love at bedtime.
          </p>
          <div className={`${css.tagline} animate-fade-in`} style={{ animationDelay: '0.4s' }}>
            Connecting Families, One Story at a Time
          </div>
        </div>
      </section>

      {/* Mission & Problem */}
      <section className="section container">
        <div className={css.grid2}>
          <Card glow>
            <h3 className="text-gradient-gold" style={{ fontSize: '1.5rem' }}>Our Mission</h3>
            <p style={{ marginTop: '1rem', fontSize: '1.125rem', color: '#e2e8f0' }}>
              We combine AI with human warmth to strengthen family bonds through storytelling.
            </p>
          </Card>
          <Card hoverable>
            <h3 style={{ fontSize: '1.5rem', color: '#ef4444' }}>The Problem</h3>
            <p style={{ marginTop: '1rem', fontSize: '1.125rem', color: '#e2e8f0' }}>
              Millions of children sleep without hearing their parents&apos; voices due to distance or busy schedules.
            </p>
          </Card>
        </div>
      </section>

      {/* Journey Timeline */}
      <section className={`section ${css.journeySection}`}>
        <div className="container">
          <div className="sectionHeader" style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2>Our Journey</h2>
          </div>
          <div className={css.timeline}>
            {[
              { year: '2024', title: 'Idea', desc: 'Built by parents solving real problems' },
              { year: '2025', title: 'AI Breakthrough', desc: 'Voice cloning with emotional accuracy' },
              { year: 'Present', title: 'Growth', desc: 'Thousands of families using it' },
              { year: 'Future', title: 'Expansion', desc: 'Multilingual + interactive storytelling' },
            ].map((item, i) => (
              <div key={i} className={css.timelineItem}>
                <div className={css.timelineYear}>{item.year}</div>
                <div className={css.timelineContent}>
                  <h4>{item.title}</h4>
                  <p>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section container">
        <div className="sectionHeader" style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2>Our Values</h2>
        </div>
        <div className={css.valuesGrid}>
          <Card>
            <h4>❤️ Family First</h4>
            <p>Everything we build strengthens connection</p>
          </Card>
          <Card>
            <h4>🔒 Privacy & Trust</h4>
            <p>Voice data is protected and never shared</p>
          </Card>
          <Card>
            <h4>✨ Magical Experiences</h4>
            <p>Technology should feel effortless</p>
          </Card>
          <Card>
            <h4>🌍 Inclusive Storytelling</h4>
            <p>Stories for all children</p>
          </Card>
        </div>
      </section>

      {/* Team & Quote */}
      <section className={`section container flex-center ${css.quoteSection}`}>
        <Card glow className={css.quoteCard}>
          <p className={css.quote}>
            &quot;A parent&apos;s voice is irreplaceable. Technology should amplify love, not replace it.&quot;
          </p>
          <div className={css.teamInfo}>
            - Built by parents, engineers, and storytellers
          </div>
        </Card>
      </section>
    </div>
  );
}
