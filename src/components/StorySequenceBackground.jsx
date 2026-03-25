import React, { useEffect, useRef, useState } from 'react';
import { animate, motion, useMotionValue, useReducedMotion } from 'framer-motion';

const FRAME_COUNT = 90;
const LAST_FRAME_INDEX = FRAME_COUNT - 1;
const FRAME_EASING = 0.18;
const REDRAW_THRESHOLD = 0.02;
const INTRO_DURATION_SECONDS = 5.2;

function clampFrame(index) {
  return Math.max(0, Math.min(LAST_FRAME_INDEX, index));
}

function clampProgress(frame) {
  return Math.max(0, Math.min(LAST_FRAME_INDEX, frame));
}

function getFrameUrl(index) {
  return `/home-intro-frames/intro-frame-${String(index + 1).padStart(3, '0')}.jpg`;
}

function StorySequenceBackground({ onIntroComplete }) {
  const prefersReducedMotion = useReducedMotion();
  const introProgress = useMotionValue(0);
  const canvasRef = useRef(null);
  const loadedFramesRef = useRef(new Map());
  const loadedCountRef = useRef(0);
  const animationFrameRef = useRef(null);
  const introControlsRef = useRef(null);
  const currentFrameRef = useRef(0);
  const targetFrameRef = useRef(0);
  const renderedFrameRef = useRef(-1);
  const isMountedRef = useRef(false);
  const introCompletedRef = useRef(false);
  const introCompleteCallbackRef = useRef(onIntroComplete);
  const [isSettled, setIsSettled] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);

  useEffect(() => {
    introCompleteCallbackRef.current = onIntroComplete;
  }, [onIntroComplete]);

  function drawCoverImage(context, image, canvasWidth, canvasHeight, alpha) {
    const imageWidth = image.naturalWidth || image.width;
    const imageHeight = image.naturalHeight || image.height;
    if (!imageWidth || !imageHeight) {
      return;
    }

    const scale = Math.max(canvasWidth / imageWidth, canvasHeight / imageHeight);
    const drawWidth = imageWidth * scale;
    const drawHeight = imageHeight * scale;
    const offsetX = (canvasWidth - drawWidth) / 2;
    const offsetY = (canvasHeight - drawHeight) / 2;

    context.globalAlpha = alpha;
    context.drawImage(image, offsetX, offsetY, drawWidth, drawHeight);
  }

  function resetContext(context, canvas) {
    const devicePixelRatio = window.devicePixelRatio || 1;
    context.setTransform(1, 0, 0, 1, 0, 0);
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
    context.globalAlpha = 1;
  }

  function drawFrame(progressFrame) {
    const canvas = canvasRef.current;
    if (!canvas) {
      return false;
    }

    const context = canvas.getContext('2d');
    if (!context) {
      return false;
    }

    const canvasWidth = canvas.clientWidth || window.innerWidth;
    const canvasHeight = canvas.clientHeight || window.innerHeight;
    if (!canvasWidth || !canvasHeight) {
      return false;
    }

    const safeProgress = clampProgress(progressFrame);
    const lowerFrameIndex = clampFrame(Math.floor(safeProgress));
    const upperFrameIndex = clampFrame(Math.ceil(safeProgress));
    const mix = safeProgress - lowerFrameIndex;

    const lowerImage = loadedFramesRef.current.get(lowerFrameIndex);
    const upperImage = loadedFramesRef.current.get(upperFrameIndex);

    if (!lowerImage && !upperImage) {
      return false;
    }

    resetContext(context, canvas);

    if (lowerImage && upperImage && upperFrameIndex !== lowerFrameIndex) {
      drawCoverImage(context, lowerImage, canvasWidth, canvasHeight, 1 - mix);
      drawCoverImage(context, upperImage, canvasWidth, canvasHeight, mix);
    } else {
      drawCoverImage(context, lowerImage || upperImage, canvasWidth, canvasHeight, 1);
    }

    renderedFrameRef.current = safeProgress;
    return true;
  }

  function resizeCanvas() {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const devicePixelRatio = window.devicePixelRatio || 1;
    const width = window.innerWidth;
    const height = window.innerHeight;

    canvas.width = Math.floor(width * devicePixelRatio);
    canvas.height = Math.floor(height * devicePixelRatio);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    drawFrame(currentFrameRef.current);
  }

  function finishIntro() {
    if (introCompletedRef.current) {
      return;
    }

    introCompletedRef.current = true;
    currentFrameRef.current = LAST_FRAME_INDEX;
    targetFrameRef.current = LAST_FRAME_INDEX;
    drawFrame(LAST_FRAME_INDEX);
    setIsSettled(true);
    introCompleteCallbackRef.current?.();
  }

  function animateFrames() {
    if (!isMountedRef.current) {
      return;
    }

    targetFrameRef.current = introProgress.get() * LAST_FRAME_INDEX;

    const difference = targetFrameRef.current - currentFrameRef.current;
    if (Math.abs(difference) > 0.001) {
      currentFrameRef.current += difference * FRAME_EASING;
    } else {
      currentFrameRef.current = targetFrameRef.current;
    }

    if (
      renderedFrameRef.current === -1 ||
      Math.abs(currentFrameRef.current - renderedFrameRef.current) > REDRAW_THRESHOLD
    ) {
      drawFrame(currentFrameRef.current);
    }

    if (
      introProgress.get() >= 0.999 &&
      Math.abs(LAST_FRAME_INDEX - currentFrameRef.current) < 0.3
    ) {
      finishIntro();
      return;
    }

    animationFrameRef.current = window.requestAnimationFrame(animateFrames);
  }

  function loadFrame(frameIndex) {
    const safeFrame = clampFrame(frameIndex);

    return new Promise((resolve) => {
      const image = new Image();
      image.decoding = 'async';
      image.loading = 'eager';
      image.fetchPriority = safeFrame < 3 || safeFrame > LAST_FRAME_INDEX - 2 ? 'high' : 'low';
      image.src = getFrameUrl(safeFrame);

      image.onload = async () => {
        try {
          if (image.decode) {
            await image.decode();
          }
        } catch {
          // Ignore decode failures and continue with the loaded image.
        }

        if (!isMountedRef.current) {
          resolve(null);
          return;
        }

        loadedFramesRef.current.set(safeFrame, image);
        loadedCountRef.current += 1;
        setLoadProgress(Math.min(1, loadedCountRef.current / FRAME_COUNT));

        if (safeFrame === 0 || safeFrame === LAST_FRAME_INDEX) {
          drawFrame(currentFrameRef.current);
        }

        resolve(image);
      };

      image.onerror = () => {
        resolve(null);
      };
    });
  }

  useEffect(() => {
    isMountedRef.current = true;
    introCompletedRef.current = false;
    loadedFramesRef.current = new Map();
    loadedCountRef.current = 0;
    renderedFrameRef.current = -1;
    currentFrameRef.current = prefersReducedMotion ? LAST_FRAME_INDEX : 0;
    targetFrameRef.current = currentFrameRef.current;
    introProgress.set(0);
    setLoadProgress(0);
    setIsSettled(false);
    setIsReady(false);

    resizeCanvas();

    const handleResize = () => {
      resizeCanvas();
    };

    const startPlayback = () => {
      if (!isMountedRef.current) {
        return;
      }

      setIsReady(true);
      setLoadProgress(1);
      drawFrame(currentFrameRef.current);

      if (prefersReducedMotion) {
        finishIntro();
        return;
      }

      animationFrameRef.current = window.requestAnimationFrame(animateFrames);
      introControlsRef.current = animate(introProgress, 1, {
        duration: INTRO_DURATION_SECONDS,
        ease: [0.22, 1, 0.36, 1],
      });
    };

    window.addEventListener('resize', handleResize);

    if (prefersReducedMotion) {
      loadFrame(LAST_FRAME_INDEX).then(() => {
        currentFrameRef.current = LAST_FRAME_INDEX;
        targetFrameRef.current = LAST_FRAME_INDEX;
        startPlayback();
      });
    } else {
      Promise.all(
        Array.from({ length: FRAME_COUNT }, (_, index) => loadFrame(index))
      ).then(() => {
        currentFrameRef.current = 0;
        targetFrameRef.current = 0;
        startPlayback();
      });
    }

    return () => {
      isMountedRef.current = false;
      window.removeEventListener('resize', handleResize);

      if (animationFrameRef.current) {
        window.cancelAnimationFrame(animationFrameRef.current);
      }

      if (introControlsRef.current) {
        introControlsRef.current.stop();
      }
    };
  }, [introProgress, prefersReducedMotion]);

  return (
    <div
      className={`story-sequence-background ${isSettled ? 'is-settled' : 'is-intro-active'}`}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="story-sequence-canvas"></canvas>
      <div className="story-sequence-vignette"></div>
      <div className="story-sequence-overlay"></div>
      <div className="story-sequence-grain"></div>

      <div className="story-sequence-intro">
        <p className="story-sequence-kicker">AweTales</p>
        <h2 className="story-sequence-title">
          {isReady ? 'Opening the first story...' : 'Preparing the story...'}
        </h2>
        <span className="story-sequence-caption">
          {isReady
            ? 'The final frame settles in as the world behind the website.'
            : `Loading the intro frames ${Math.round(loadProgress * 100)}%`}
        </span>
      </div>

      <div className="story-sequence-progress">
        <div className="story-sequence-progress-line"></div>
        <motion.div
          className="story-sequence-progress-fill"
          style={isReady ? { scaleX: introProgress } : { scaleX: loadProgress }}
        ></motion.div>
      </div>
    </div>
  );
}

export default StorySequenceBackground;
