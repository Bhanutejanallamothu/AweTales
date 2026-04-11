import React from 'react';
import css from './dashboard.module.css';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

export default function Dashboard() {
  return (
    <div className={`container ${css.page}`}>
      {/* Header */}
      <section className={css.header}>
        <h1 className="text-gradient">Welcome back, User! ✨</h1>
        <p className={css.subtitle}>Let&apos;s create something magical today.</p>
      </section>

      {/* Notifications */}
      <section className={css.notifications}>
        <div className={css.alert}>
          <span>🔔</span>
          <p>Welcome to AweTales! Verify your email to begin.</p>
        </div>
      </section>

      {/* Overview Grid */}
      <div className={css.gridLeftRight}>
        {/* Main Content */}
        <div className={css.mainContent}>
          {/* Stats */}
          <div className={css.statsGrid}>
            <Card hoverable className={css.statCard}>
              <div className={css.statValue}>0</div>
              <div className={css.statLabel}>Stories Created</div>
            </Card>
            <Card hoverable className={css.statCard}>
              <div className={css.statValue}>0</div>
              <div className={css.statLabel}>Voices Recorded</div>
            </Card>
            <Card hoverable className={css.statCard}>
              <div className={css.statValue}>1000</div>
              <div className={css.statLabel}>Credits</div>
            </Card>
            <Card hoverable className={css.statCard}>
              <div className={css.statValue}>0</div>
              <div className={css.statLabel}>Listens</div>
            </Card>
          </div>

          {/* Story Section */}
          <section className={css.storySection}>
            <div className="flex-between" style={{ marginBottom: '1.5rem' }}>
              <h2>Your Story Library</h2>
            </div>
            <Card className={css.emptyState}>
              <div className={css.emptyIcon}>🎧</div>
              <h3>No stories yet</h3>
              <p>Let&apos;s create your first magical story</p>
              <div style={{ marginTop: '1.5rem' }}>
                <Button variant="primary">Create Your First Story</Button>
              </div>
            </Card>
          </section>
        </div>

        {/* Sidebar */}
        <div className={css.sidebar}>
          {/* Quick Actions */}
          <section className={css.quickActions}>
            <h3 style={{ marginBottom: '1rem' }}>Quick Actions</h3>
            <div className={css.actionsList}>
              <Button variant="secondary" className={css.actionBtn}>🎙️ Record Voice</Button>
              <Button variant="secondary" className={css.actionBtn}>👦 Add Child Profile</Button>
              <Button variant="secondary" className={css.actionBtn}>💎 Buy Credits</Button>
            </div>
          </section>

          {/* Subscription */}
          <section className={css.subscription}>
            <Card glow className={css.subCard}>
              <h3 className="text-gradient-gold">Subscription</h3>
              <div className={css.subDetails}>
                <div className={css.subRow}>
                  <span>Plan:</span>
                  <span className={css.badge}>Free</span>
                </div>
                <div className={css.subRow}>
                  <span>Credits:</span>
                  <span className={css.credits}>1000</span>
                </div>
              </div>
              <Button variant="outline" className={css.fullWidthBtn}>Upgrade Plan</Button>
            </Card>
          </section>
        </div>
      </div>
    </div>
  );
}
