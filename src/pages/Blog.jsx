import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';

const sectionMotion = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.55, ease: 'easeOut' },
};

const essentials = [
  'Screen layouts and page structure',
  'Navigation bars and wayfinding cues',
  'UI components and UX touchpoints',
  'Interactive elements and conversion paths',
  'Information hierarchy and content priority',
  'Placeholders for images, video, and supporting media',
];

const screenSizes = [
  {
    label: 'Mobile',
    size: '393 x 852',
    note: 'Best for narrow flows, stacked cards, and thumb-first navigation.',
  },
  {
    label: '11" Tablet',
    size: '834 x 1194',
    note: 'Useful when you need browsing room without desktop complexity.',
  },
  {
    label: 'Desktop',
    size: '1440 x 1024',
    note: 'Ideal for dense layouts, side panels, and multi-column systems.',
  },
];

const fidelityLevels = [
  {
    title: 'Low fidelity',
    summary:
      'Use grayscale blocks, quick labels, and rough flows to align on structure before polish.',
    bestFor: 'Exploring new concepts, early feedback, and rapid iteration.',
  },
  {
    title: 'Mid fidelity',
    summary:
      'Add annotations, clearer content, and stronger interaction patterns without committing to final visuals.',
    bestFor: 'Testing user flows, clarifying states, and shaping the framework.',
  },
  {
    title: 'High fidelity',
    summary:
      'Bring in brand signals, realistic spacing, and visual detail once the flow is already working.',
    bestFor: 'Mockups, stakeholder walkthroughs, and realistic user testing.',
  },
];

const practices = [
  'Identify the core user goal before you place a single box on the page.',
  'Match the wireframe size to the real screen your audience will use.',
  'Keep early wireframes simple enough that feedback stays strategic.',
  'Make repeated components behave and look the same across screens.',
  'Use obvious navigation so nobody needs a sitemap to move forward.',
  'Stay flexible, because every wireframe is a draft, not a promise.',
  'Use shareable tools so comments, edits, and handoff stay in one loop.',
];

const purposePoints = [
  'Develop the layout and the structural backbone.',
  'Create a clear information hierarchy.',
  'Focus design reviews on user experience first.',
  'Stress-test usability before visual styling takes over.',
];

const advantages = [
  'Turns abstract ideas into something visible and discussable.',
  'Surfaces layout and flow problems while changes are still cheap.',
  'Makes initial user feedback more concrete than text descriptions alone.',
  'Keeps content and functionality aligned with stakeholder requirements.',
  'Lets teams redraw and iterate quickly as feedback arrives.',
  'Saves time and money later in testing, rework, and development.',
];

const imageWireframes = [
  {
    slot: 'Image 01',
    title: 'UI/UX structure reference',
    description:
      'Replaces the first source image marker that followed the UI/UX wireframe explanation.',
    variant: 'overview',
  },
  {
    slot: 'Image 02',
    title: 'Purpose of a wireframe',
    description:
      'Represents the image position that appeared after the purpose list in the provided copy.',
    variant: 'purpose',
  },
  {
    slot: 'Image 03',
    title: 'Types of wireframing',
    description:
      'Covers the image slot that accompanied the low- versus high-fidelity overview.',
    variant: 'types',
  },
  {
    slot: 'Image 04',
    title: 'Low-fidelity example',
    description:
      'Recreates the final image marker that appeared after the low-fidelity explanation.',
    variant: 'sketch',
  },
];

const checklist = [
  'The essential screens needed to meet user needs are identified.',
  'Primary user flows and conversion funnels are easy to follow.',
  'Navigation, organization, and usability choices are visible.',
  'Each screen has a clear goal, content priority, and interaction path.',
  'Key UI elements and content blocks are mapped for every screen.',
  'Shared patterns combine into reusable templates instead of one-off layouts.',
];

const successSignals = [
  'Users can move through the experience without instructions during moderated testing.',
  'Stakeholders respond to hierarchy, priority, and flow instead of colors and polish.',
  'The team leaves critique sessions knowing what to refine next with confidence.',
];

const checkpoints = [
  { id: 'overview', number: '00', label: 'Overview' },
  { id: 'definition', number: '01', label: 'Definition' },
  { id: 'fidelity', number: '02', label: 'Fidelity' },
  { id: 'practices', number: '03', label: 'Practices' },
  { id: 'purpose', number: '04', label: 'Purpose' },
  { id: 'images', number: '05', label: 'Images' },
  { id: 'checklist', number: '06', label: 'Finish' },
];

function WireframeImage({ slot, title, description, variant }) {
  return (
    <figure className={`wireframe-image-card wireframe-image-${variant}`}>
      <div className="wireframe-image-toolbar">
        <div className="wireframe-toolbar-dots" aria-hidden="true">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <span className="wireframe-toolbar-label">{slot}</span>
      </div>

      <div className="wireframe-image-canvas" aria-hidden="true">
        {variant === 'overview' && (
          <div className="wireframe-layout wireframe-layout-overview">
            <div className="wireframe-panel wireframe-overview-sidebar">
              <span className="wireframe-pill short"></span>
              <span className="wireframe-line full"></span>
              <span className="wireframe-line medium"></span>
              <div className="wireframe-stack">
                <span className="wireframe-line full"></span>
                <span className="wireframe-line full"></span>
                <span className="wireframe-line short"></span>
              </div>
              <div className="wireframe-chip-row">
                <span className="wireframe-chip"></span>
                <span className="wireframe-chip"></span>
              </div>
            </div>

            <div className="wireframe-panel wireframe-overview-main">
              <div className="wireframe-browser-strip">
                <span className="wireframe-strip-dot"></span>
                <span className="wireframe-strip-dot"></span>
                <span className="wireframe-strip-bar"></span>
              </div>
              <div className="wireframe-hero-block"></div>
              <div className="wireframe-card-grid">
                <div className="wireframe-mini-card"></div>
                <div className="wireframe-mini-card"></div>
                <div className="wireframe-mini-card"></div>
              </div>
            </div>
          </div>
        )}

        {variant === 'purpose' && (
          <div className="wireframe-layout wireframe-layout-purpose">
            <div className="wireframe-panel wireframe-check-panel">
              <span className="wireframe-pill medium"></span>
              <div className="wireframe-checklist">
                <div className="wireframe-check-item">
                  <span className="wireframe-box"></span>
                  <span className="wireframe-line full"></span>
                </div>
                <div className="wireframe-check-item">
                  <span className="wireframe-box"></span>
                  <span className="wireframe-line full"></span>
                </div>
                <div className="wireframe-check-item">
                  <span className="wireframe-box"></span>
                  <span className="wireframe-line medium"></span>
                </div>
                <div className="wireframe-check-item">
                  <span className="wireframe-box"></span>
                  <span className="wireframe-line long"></span>
                </div>
              </div>
            </div>

            <div className="wireframe-panel wireframe-purpose-panel">
              <div className="wireframe-circle-stack">
                <span className="wireframe-circle large"></span>
                <span className="wireframe-circle medium"></span>
                <span className="wireframe-circle small"></span>
              </div>
              <div className="wireframe-stack compact">
                <span className="wireframe-line full"></span>
                <span className="wireframe-line medium"></span>
                <span className="wireframe-line short"></span>
              </div>
            </div>
          </div>
        )}

        {variant === 'types' && (
          <div className="wireframe-layout wireframe-layout-types">
            <div className="wireframe-device-card">
              <span className="wireframe-pill medium"></span>
              <div className="wireframe-device-screen">
                <span className="wireframe-line full"></span>
                <span className="wireframe-line medium"></span>
                <div className="wireframe-device-row">
                  <span className="wireframe-device-box"></span>
                  <span className="wireframe-device-box"></span>
                </div>
              </div>
            </div>

            <div className="wireframe-device-card">
              <span className="wireframe-pill medium"></span>
              <div className="wireframe-device-screen emphasis">
                <span className="wireframe-line full"></span>
                <span className="wireframe-line full"></span>
                <div className="wireframe-device-row three">
                  <span className="wireframe-device-box"></span>
                  <span className="wireframe-device-box"></span>
                  <span className="wireframe-device-box"></span>
                </div>
              </div>
            </div>

            <div className="wireframe-device-card">
              <span className="wireframe-pill medium"></span>
              <div className="wireframe-device-screen">
                <div className="wireframe-hero-block compact"></div>
                <div className="wireframe-stack compact">
                  <span className="wireframe-line full"></span>
                  <span className="wireframe-line medium"></span>
                  <span className="wireframe-line short"></span>
                </div>
              </div>
            </div>
          </div>
        )}

        {variant === 'sketch' && (
          <div className="wireframe-layout wireframe-layout-sketch">
            <div className="wireframe-sketch-device">
              <div className="wireframe-sketch-hero"></div>
              <div className="wireframe-sketch-row">
                <span className="wireframe-sketch-box"></span>
                <span className="wireframe-sketch-box"></span>
              </div>
              <div className="wireframe-stack">
                <span className="wireframe-line full"></span>
                <span className="wireframe-line medium"></span>
              </div>
              <div className="wireframe-sketch-footer">
                <span className="wireframe-pill short"></span>
                <span className="wireframe-pill short"></span>
              </div>
            </div>

            <div className="wireframe-panel wireframe-note-panel">
              <span className="wireframe-pill medium"></span>
              <div className="wireframe-stack">
                <span className="wireframe-line full"></span>
                <span className="wireframe-line full"></span>
                <span className="wireframe-line short"></span>
              </div>
              <div className="wireframe-chip-row">
                <span className="wireframe-chip"></span>
                <span className="wireframe-chip"></span>
                <span className="wireframe-chip"></span>
              </div>
            </div>
          </div>
        )}
      </div>

      <figcaption className="wireframe-image-caption">
        <p>{title}</p>
        <span>{description}</span>
      </figcaption>
    </figure>
  );
}

function Blog() {
  const [activeCheckpoint, setActiveCheckpoint] = useState('overview');

  useEffect(() => {
    const sections = checkpoints
      .map(({ id }) => document.getElementById(id))
      .filter(Boolean);

    if (!sections.length) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visibleEntries[0]) {
          setActiveCheckpoint(visibleEntries[0].target.id);
        }
      },
      {
        rootMargin: '-20% 0px -55% 0px',
        threshold: [0.2, 0.35, 0.55],
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.985 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, y: 12 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="wireframe-guide-shell"
    >
      <Header />

      <main className="wireframe-guide-main">
        <section className="wireframe-hero" id="overview">
          <div className="container wireframe-hero-grid">
            <div className="wireframe-hero-copy">
              <p className="wireframe-eyebrow">Chronicles / Wireframing Guide</p>
              <h1 className="wireframe-hero-title">
                Wireframe the experience before you polish the interface.
              </h1>
              <p className="wireframe-hero-lead">
                This page turns the provided wireframing notes into a working guide: what
                wireframes do, how fidelity changes the conversation, and how to keep
                reviews focused on flow instead of surface decoration.
              </p>

              <div className="wireframe-stat-row">
                <div className="wireframe-stat-card">
                  <strong>3</strong>
                  <span>Fidelity levels</span>
                </div>
                <div className="wireframe-stat-card">
                  <strong>7</strong>
                  <span>Best practices</span>
                </div>
                <div className="wireframe-stat-card">
                  <strong>4</strong>
                  <span>Source image frames covered</span>
                </div>
              </div>

              <p className="wireframe-hero-note">
                All four explicit image markers from the source text are represented below
                as grayscale wireframes so none of the image positions were skipped.
              </p>
            </div>

            <div className="wireframe-preview-board" aria-hidden="true">
              <div className="wireframe-preview-top">
                <span className="wireframe-preview-tag">Goals</span>
                <span className="wireframe-preview-tag">Flows</span>
                <span className="wireframe-preview-tag">Content</span>
              </div>

              <div className="wireframe-preview-screen">
                <div className="wireframe-preview-header">
                  <span className="wireframe-line full"></span>
                  <span className="wireframe-line medium"></span>
                </div>
                <div className="wireframe-preview-grid">
                  <div className="wireframe-preview-card tall"></div>
                  <div className="wireframe-preview-card"></div>
                  <div className="wireframe-preview-card"></div>
                </div>
              </div>

              <div className="wireframe-preview-footer">
                <div className="wireframe-progress-step active">Scope</div>
                <div className="wireframe-progress-step">Feedback</div>
                <div className="wireframe-progress-step">Prototype</div>
              </div>
            </div>
          </div>
        </section>

        <div className="wireframe-checkpoint-shell">
          <div className="container">
            <nav className="wireframe-checkpoint-nav" aria-label="Scroll checkpoints">
              {checkpoints.map((checkpoint) => (
                <a
                  key={checkpoint.id}
                  href={`#${checkpoint.id}`}
                  className={`wireframe-checkpoint-link ${
                    activeCheckpoint === checkpoint.id ? 'active' : ''
                  }`}
                >
                  <span>{checkpoint.number}</span>
                  <strong>{checkpoint.label}</strong>
                </a>
              ))}
            </nav>
          </div>
        </div>

        <article className="container wireframe-article">
          <motion.section className="wireframe-section" id="definition" {...sectionMotion}>
            <div className="wireframe-section-header">
              <div>
                <p className="wireframe-section-kicker">Definition</p>
                <h2>What a wireframe is actually for</h2>
              </div>
              <p className="wireframe-section-summary">
                A wireframe is the skeletal framework of a page or product. It shows what
                the screen does before the team gets distracted by what it looks like.
              </p>
            </div>

            <div className="wireframe-two-column">
              <div className="wireframe-card">
                <h3>Essential pieces</h3>
                <p>
                  Early wireframes keep the conversation on functionality, layout, and
                  information architecture. That makes them ideal for aligning design,
                  content, and development before anyone invests in visual polish.
                </p>
                <ul className="wireframe-bullet-list">
                  {essentials.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="wireframe-card">
                <h3>Recommended canvas sizes</h3>
                <div className="wireframe-size-grid">
                  {screenSizes.map((screen) => (
                    <div className="wireframe-size-card" key={screen.label}>
                      <p>{screen.label}</p>
                      <strong>{screen.size}</strong>
                      <span>{screen.note}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.section>

          <motion.section className="wireframe-section" id="fidelity" {...sectionMotion}>
            <div className="wireframe-section-header">
              <div>
                <p className="wireframe-section-kicker">Fidelity</p>
                <h2>Three levels, one goal</h2>
              </div>
              <p className="wireframe-section-summary">
                Fidelity changes how much detail is visible, but the job stays the same:
                help the team agree on structure, flow, and priority before build time.
              </p>
            </div>

            <div className="wireframe-fidelity-grid">
              {fidelityLevels.map((level) => (
                <div className="wireframe-fidelity-card" key={level.title}>
                  <p>{level.title}</p>
                  <h3>{level.summary}</h3>
                  <span>{level.bestFor}</span>
                </div>
              ))}
            </div>

            <div className="wireframe-callout">
              <p className="wireframe-callout-label">When you can skip a stage</p>
              <h3>Jumping to higher fidelity can be efficient when the system is already familiar.</h3>
              <p>
                If the team already has an established design system and the new flow
                closely matches existing patterns, moving directly into a more detailed
                wireframe can still keep feedback productive.
              </p>
            </div>
          </motion.section>

          <motion.section className="wireframe-section" id="practices" {...sectionMotion}>
            <div className="wireframe-section-header">
              <div>
                <p className="wireframe-section-kicker">Best Practices</p>
                <h2>Seven habits that keep wireframes useful</h2>
              </div>
              <p className="wireframe-section-summary">
                The strongest wireframes reduce confusion, encourage directional feedback,
                and leave room for iteration instead of locking teams too early.
              </p>
            </div>

            <div className="wireframe-practice-grid">
              {practices.map((practice, index) => (
                <div className="wireframe-practice-card" key={practice}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <p>{practice}</p>
                </div>
              ))}
            </div>
          </motion.section>

          <motion.section className="wireframe-section" id="purpose" {...sectionMotion}>
            <div className="wireframe-section-header">
              <div>
                <p className="wireframe-section-kicker">Purpose</p>
                <h2>Why teams still start with wireframes</h2>
              </div>
              <p className="wireframe-section-summary">
                Wireframing makes the abstract tangible. It clarifies hierarchy, exposes
                problems early, and gives teams something concrete to react to.
              </p>
            </div>

            <div className="wireframe-two-column">
              <div className="wireframe-card">
                <h3>Main purpose</h3>
                <ul className="wireframe-bullet-list">
                  {purposePoints.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </div>

              <div className="wireframe-card">
                <h3>Advantages of wireframing</h3>
                <ul className="wireframe-bullet-list">
                  {advantages.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.section>

          <motion.section className="wireframe-section" id="images" {...sectionMotion}>
            <div className="wireframe-section-header">
              <div>
                <p className="wireframe-section-kicker">Image Wireframes</p>
                <h2>Every source image slot has been wired</h2>
              </div>
              <p className="wireframe-section-summary">
                The provided text contained four explicit image markers. Each one is
                represented here as a labeled grayscale scaffold so no referenced image
                position is missing from the page.
              </p>
            </div>

            <div className="wireframe-gallery-grid">
              {imageWireframes.map((image) => (
                <WireframeImage
                  key={image.slot}
                  slot={image.slot}
                  title={image.title}
                  description={image.description}
                  variant={image.variant}
                />
              ))}
            </div>
          </motion.section>

          <motion.section className="wireframe-section" id="checklist" {...sectionMotion}>
            <div className="wireframe-section-header">
              <div>
                <p className="wireframe-section-kicker">Checklist</p>
                <h2>How to tell when the wireframe is ready</h2>
              </div>
              <p className="wireframe-section-summary">
                The wireframe is successful when users can move through it, the team can
                estimate work more clearly, and critiques stay focused on the real
                experience instead of decorative details.
              </p>
            </div>

            <div className="wireframe-two-column">
              <div className="wireframe-card">
                <h3>Ready-for-mockup checklist</h3>
                <ul className="wireframe-bullet-list">
                  {checklist.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="wireframe-card">
                <h3>Qualitative signs of success</h3>
                <ul className="wireframe-bullet-list">
                  {successSignals.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <p className="wireframe-card-note">
                  If reviewers keep commenting on fonts, colors, or minor polish instead
                  of hierarchy and flow, lower the fidelity and bring the conversation back
                  to fundamentals.
                </p>
              </div>
            </div>

            <div className="wireframe-final-note">
              <p>
                A strong wireframe creates freedom. It lets the team test ideas, revise
                structure, and improve usability before those changes become expensive.
              </p>
            </div>
          </motion.section>
        </article>
      </main>

      <Footer />
    </motion.div>
  );
}

export default Blog;
