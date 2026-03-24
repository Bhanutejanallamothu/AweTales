import React from 'react';
import { motion, useReducedMotion, useTransform } from 'framer-motion';

const BAND_SCENES = [
  { frame: 1, className: 'story-parallax-band band-top' },
  { frame: 106, className: 'story-parallax-band band-middle' },
  { frame: 236, className: 'story-parallax-band band-bottom' },
];

const BACK_PANELS = [
  { frame: 18, top: '8vh', left: '-4vw', width: '44vw', height: '30vh', rotate: -6 },
  { frame: 46, top: '50vh', right: '-5vw', width: '38vw', height: '28vh', rotate: 5 },
  { frame: 78, top: '92vh', left: '8vw', width: '35vw', height: '26vh', rotate: -4 },
  { frame: 132, top: '132vh', right: '8vw', width: '42vw', height: '30vh', rotate: 4 },
  { frame: 182, top: '176vh', left: '-2vw', width: '40vw', height: '28vh', rotate: -5 },
  { frame: 224, top: '214vh', right: '4vw', width: '36vw', height: '26vh', rotate: 3 },
];

const FRONT_PANELS = [
  { frame: 32, top: '28vh', left: '46vw', width: '24vw', height: '20vh', rotate: 4 },
  { frame: 96, top: '104vh', left: '18vw', width: '27vw', height: '22vh', rotate: -5 },
  { frame: 154, top: '154vh', right: '14vw', width: '26vw', height: '21vh', rotate: 4 },
  { frame: 210, top: '204vh', left: '54vw', width: '22vw', height: '19vh', rotate: -4 },
];

function getFrameUrl(frame) {
  return `/home-scroll-frames/ezgif-frame-${String(frame).padStart(3, '0')}.jpg`;
}

function StorySequenceBackground({ scrollYProgress }) {
  const prefersReducedMotion = useReducedMotion();
  const bandY = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? [0, 0] : [0, -260]);
  const backY = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? [0, 0] : [0, -420]);
  const frontY = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? [0, 0] : [0, -640]);
  const glowY = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? [0, 0] : [0, -820]);

  return (
    <div className="story-parallax-background" aria-hidden="true">
      <motion.div className="story-parallax-layer story-parallax-ribbons" style={{ y: bandY }}>
        {BAND_SCENES.map((scene) => (
          <div
            key={scene.frame}
            className={scene.className}
            style={{ backgroundImage: `url(${getFrameUrl(scene.frame)})` }}
          ></div>
        ))}
      </motion.div>

      <motion.div className="story-parallax-layer story-parallax-panels story-parallax-panels-back" style={{ y: backY }}>
        {BACK_PANELS.map((panel) => (
          <div
            key={panel.frame}
            className="story-parallax-panel"
            style={{
              top: panel.top,
              left: panel.left,
              right: panel.right,
              width: panel.width,
              height: panel.height,
              transform: `rotate(${panel.rotate}deg)`,
              backgroundImage: `url(${getFrameUrl(panel.frame)})`,
            }}
          ></div>
        ))}
      </motion.div>

      <motion.div className="story-parallax-layer story-parallax-panels story-parallax-panels-front" style={{ y: frontY }}>
        {FRONT_PANELS.map((panel) => (
          <div
            key={panel.frame}
            className="story-parallax-panel"
            style={{
              top: panel.top,
              left: panel.left,
              right: panel.right,
              width: panel.width,
              height: panel.height,
              transform: `rotate(${panel.rotate}deg)`,
              backgroundImage: `url(${getFrameUrl(panel.frame)})`,
            }}
          ></div>
        ))}
      </motion.div>

      <motion.div className="story-parallax-layer story-parallax-atmosphere" style={{ y: glowY }}>
        <div className="story-parallax-orb orb-one"></div>
        <div className="story-parallax-orb orb-two"></div>
        <div className="story-parallax-orb orb-three"></div>
      </motion.div>

      <div className="story-parallax-texture"></div>
      <div className="story-parallax-overlay"></div>
    </div>
  );
}

export default StorySequenceBackground;
