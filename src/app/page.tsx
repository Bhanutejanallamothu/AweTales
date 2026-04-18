import React from 'react';
import css from './page.module.css';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import HomeStoryBear from '@/components/ui/HomeStoryBear';
import Intro from '@/components/ui/Intro';
import SplitText from '@/components/ui/SplitText';

export default function Home() {
  return (
    <div className={css.page}>
      <Intro />
      <HomeStoryBear />

      <section className={`${css.hero} ${css.snapSection}`} data-bear-scene="welcome" style={{ paddingLeft: 'clamp(2rem, 8vw, 6rem)', marginLeft: 0, alignItems: 'flex-start' }}>
        <div className={css.heroContent}>
          <SplitText
            text={`Magical\nStorytelling\nwith Your Voice`}
            className={`text-white ${css.heroTitle} animate-fade-in`}
            delay={50}
            duration={1.25}
            ease="power3.out"
            splitType="chars"
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.1}
            rootMargin="-100px"
            textAlign="left"
          />
          <p
            className={`${css.heroSubtext} animate-fade-in`}
            style={{ animationDelay: '0.2s', maxWidth: '800px', margin: '0 0 2rem 0' }}
          >
            Create personalized audiobooks that bring you and your child closer together. Your voice, their favorite
            stories, endless magical moments.
          </p>
          <div className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <Button size="lg" variant="primary" href="/signup">
              Sign Up
            </Button>
          </div>

          <div
            className={`animate-fade-in ${css.heroMiniFlow}`}
            style={{
              animationDelay: '0.6s',
              display: 'flex',
              gap: '1rem',
              justifyContent: 'flex-start',
              marginTop: '2rem',
              fontSize: '0.9rem',
              opacity: 0.8,
              fontWeight: 500,
            }}
          >
            <span>Record Voice</span>
            <span>-&gt;</span>
            <span>Choose Story</span>
            <span>-&gt;</span>
            <span>Share Love</span>
          </div>
        </div>
      </section>

      <section className={`${css.snapSection} container`} data-bear-scene="steps">
        <div className={css.sectionHeader}>
          <h2 className="text-gradient-gold">How It Works</h2>
          <p>Just 3 simple steps to create magical storytelling experiences</p>
        </div>
        <div className={css.stepsGrid}>
          <Card hoverable glow className={css.stepCard}>
            <div className={css.stepIcon}>Mic</div>
            <h3>1. Record Voice</h3>
            <p>Upload a short sample and let AI learn your unique tone and storytelling style.</p>
          </Card>
          <Card hoverable glow className={css.stepCard}>
            <div className={css.stepIcon}>Books</div>
            <h3>2. Choose Story</h3>
            <p>Pick from a library of magical tales, adventures, and bedtime classics.</p>
          </Card>
          <Card hoverable glow className={css.stepCard}>
            <div className={css.stepIcon}>Love</div>
            <h3>3. Share Love</h3>
            <p>Let your child hear your voice anytime, even when you&apos;re away.</p>
          </Card>
        </div>
      </section>

      <section className={`${css.snapSection} ${css.emotionalSection}`} data-bear-scene="dreams">
        <div className="container flex-center">
          <div className={css.emotionalContent}>
            <h2>
              Your Voice. Their Dreams. <span className="text-gradient">Forever.</span>
            </h2>
            <p>
              Turn everyday bedtime into unforgettable moments. Create stories narrated in your own voice and stay
              connected with your child even when you&apos;re apart.
            </p>
          </div>
        </div>
      </section>

      <section className={`${css.snapSection} container`} data-bear-scene="features">
        <div className={css.sectionHeader}>
          <h2>Why AweTales?</h2>
        </div>
        <div className={css.featuresGrid}>
          {[
            { title: 'Deeper Emotional Bonds', desc: 'Your voice turns every story into a cherished memory.', icon: 'Heart' },
            { title: 'Powered by AI', desc: 'Captures tone, warmth, and emotional nuance of your voice.', icon: 'Mind' },
            { title: 'Always Available', desc: 'Your voice is there even when you are busy or traveling.', icon: 'Globe' },
            { title: 'Personalized Stories', desc: 'Add child name, characters, and details.', icon: 'Spark' },
            { title: 'Learning Enhanced', desc: 'Improves comprehension through familiar voice.', icon: 'Grow' },
            { title: 'Safe & Secure', desc: 'Encrypted voice data. Privacy first.', icon: 'Lock' },
          ].map((feat, i) => (
            <div key={i} className={css.featureItem}>
              <div className={css.featureIcon}>{feat.icon}</div>
              <h4>{feat.title}</h4>
              <p>{feat.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={`${css.snapSection} ${css.testimonialsSection}`} data-bear-scene="love">
        <div className="container">
          <div className={css.sectionHeader}>
            <h2 className="text-gradient-gold">Families Love AweTales</h2>
          </div>
          <div className={css.grid3}>
            <Card className={css.testimonialCard}>
              <p>&quot;AweTales transformed our bedtime routine. Even when I travel, my daughter hears my voice.&quot;</p>
              <div className={css.author}>- Lakshmi N (Working Mom)</div>
            </Card>
            <Card className={css.testimonialCard}>
              <p>&quot;My kids can&apos;t tell the difference. It feels like magic.&quot;</p>
              <div className={css.author}>- Shiv Kumar (Dad of Two)</div>
            </Card>
            <Card className={css.testimonialCard}>
              <p>&quot;This keeps our connection strong every night.&quot;</p>
              <div className={css.author}>- Emily Johnson (Mother of One)</div>
            </Card>
          </div>
        </div>
      </section>

      <section className={`${css.snapSection} container flex-center`} data-bear-scene="cta">
        <Card glow className={css.ctaCard}>
          <h2>Ready to Create Your First Magical Story?</h2>
          <p>Join thousands of families creating meaningful bedtime moments.</p>
          <div style={{ marginTop: '2rem' }}>
            <Button size="lg" variant="primary" href="/signup">
              Start Your Free Trial
            </Button>
          </div>
        </Card>
      </section>
    </div>
  );
}
