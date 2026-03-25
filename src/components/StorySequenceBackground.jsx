import React, { useEffect, useRef, useState } from 'react';
import { animate, motion, useMotionValue, useMotionValueEvent, useReducedMotion } from 'framer-motion';

const FRAME_COUNT = 236;
const LAST_FRAME_INDEX = FRAME_COUNT - 1;
const MAX_CACHED_FRAMES = 48;
const FRAME_EASING = 0.14;
const FRAME_WINDOW = 12;
const REDRAW_THRESHOLD = 0.02;
const INTRO_DURATION_SECONDS = 5.4;

function clampFrame(index) {
  return Math.max(0, Math.min(LAST_FRAME_INDEX, index));
}

function clampProgress(frame) {
  return Math.max(0, Math.min(LAST_FRAME_INDEX, frame));
}

function getFrameUrl(index) {
  return `/home-scroll-frames/ezgif-frame-${String(index + 1).padStart(3, '0')}.jpg`;
}

function StorySequenceBackground({ onIntroComplete }) {
  const prefersReducedMotion = useReducedMotion();
  const introProgress = useMotionValue(0);
  const canvasRef = useRef(null);
  const loadedFramesRef = useRef(new Map());
  const requestedFramesRef = useRef(new Set());
  const animationFrameRef = useRef(null);
  const introControlsRef = useRef(null);
  const currentFrameRef = useRef(0);
  const targetFrameRef = useRef(0);
  const renderedFrameRef = useRef(-1);
  const progressValueRef = useRef(0);
  const isMountedRef = useRef(false);
  const introCompletedRef = useRef(false);
  const introCompleteCallbackRef = useRef(onIntroComplete);
  const [isSettled, setIsSettled] = useState(false);

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

  function findNearestLoadedImage(frameIndex) {
    const exactFrame = loadedFramesRef.current.get(frameIndex);
    if (exactFrame) {
      return exactFrame;
    }

    for (let offset = 1; offset < FRAME_COUNT; offset += 1) {
      const previousFrame = frameIndex - offset;
      const nextFrame = frameIndex + offset;

      if (previousFrame >= 0) {
        const previousImage = loadedFramesRef.current.get(previousFrame);
        if (previousImage) {
          return previousImage;
        }
      }

      if (nextFrame < FRAME_COUNT) {
        const nextImage = loadedFramesRef.current.get(nextFrame);
        if (nextImage) {
          return nextImage;
        }
      }
    }

    return null;
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

    resetContext(context, canvas);

    if (lowerImage && upperImage && upperFrameIndex !== lowerFrameIndex) {
      drawCoverImage(context, lowerImage, canvasWidth, canvasHeight, 1 - mix);
      drawCoverImage(context, upperImage, canvasWidth, canvasHeight, mix);
      renderedFrameRef.current = safeProgress;
      return true;
    }

    const fallbackImage = lowerImage || upperImage || findNearestLoadedImage(lowerFrameIndex);
    if (!fallbackImage) {
      return false;
    }

    drawCoverImage(context, fallbackImage, canvasWidth, canvasHeight, 1);
    renderedFrameRef.current = safeProgress;
    return true;
  }

  function trimCache(centerFrame) {
    const loadedEntries = Array.from(loadedFramesRef.current.entries());
    if (loadedEntries.length <= MAX_CACHED_FRAMES) {
      return;
    }

    loadedEntries
      .sort((a, b) => Math.abs(a[0] - centerFrame) - Math.abs(b[0] - centerFrame))
      .slice(MAX_CACHED_FRAMES)
      .forEach(([frameIndex]) => {
        loadedFramesRef.current.delete(frameIndex);
      });
  }

  function requestFrame(frameIndex) {
    const safeFrame = clampFrame(frameIndex);
    if (
      loadedFramesRef.current.has(safeFrame) ||
      requestedFramesRef.current.has(safeFrame)
    ) {
      return;
    }

    requestedFramesRef.current.add(safeFrame);
    const image = new Image();
    image.decoding = 'async';
    image.loading = 'eager';
    image.fetchPriority =
      safeFrame < 4 || safeFrame > LAST_FRAME_INDEX - 4 ? 'high' : 'low';
    image.src = getFrameUrl(safeFrame);

    image.onload = async () => {
      try {
        if (image.decode) {
          await image.decode();
        }
      } catch {
        // Ignore decode failures and continue with the loaded image.
      }

      requestedFramesRef.current.delete(safeFrame);
      loadedFramesRef.current.set(safeFrame, image);
      trimCache(Math.round(currentFrameRef.current));

      if (
        renderedFrameRef.current === -1 ||
        Math.abs(safeFrame - currentFrameRef.current) <= 2 ||
        (introCompletedRef.current && safeFrame >= LAST_FRAME_INDEX - 1)
      ) {
        drawFrame(currentFrameRef.current);
      }
    };

    image.onerror = () => {
      requestedFramesRef.current.delete(safeFrame);
    };
  }

  function warmFrameWindow(centerFrame) {
    const frame = clampFrame(centerFrame);
    requestFrame(frame);
    requestFrame(frame + 1);
    requestFrame(frame - 1);

    for (let offset = 2; offset <= FRAME_WINDOW; offset += 1) {
      requestFrame(frame + offset);
      requestFrame(frame - offset);
    }
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
    progressValueRef.current = 1;
    warmFrameWindow(LAST_FRAME_INDEX);
    drawFrame(LAST_FRAME_INDEX);
    setIsSettled(true);
    introCompleteCallbackRef.current?.();
  }

  function animateFrames() {
    if (!isMountedRef.current) {
      return;
    }

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
      if (!drawFrame(currentFrameRef.current)) {
        warmFrameWindow(Math.round(currentFrameRef.current));
      }
    }

    warmFrameWindow(Math.round(currentFrameRef.current));

    if (
      progressValueRef.current >= 0.999 &&
      Math.abs(LAST_FRAME_INDEX - currentFrameRef.current) < 0.35
    ) {
      finishIntro();
      return;
    }

    animationFrameRef.current = window.requestAnimationFrame(animateFrames);
  }

  useMotionValueEvent(introProgress, 'change', (latest) => {
    progressValueRef.current = latest;
    targetFrameRef.current = prefersReducedMotion ? LAST_FRAME_INDEX : latest * LAST_FRAME_INDEX;
    warmFrameWindow(Math.round(targetFrameRef.current));
  });

  useEffect(() => {
    isMountedRef.current = true;
    renderedFrameRef.current = -1;
    introCompletedRef.current = false;
    setIsSettled(false);
    introProgress.set(0);
    progressValueRef.current = 0;
    currentFrameRef.current = prefersReducedMotion ? LAST_FRAME_INDEX : 0;
    targetFrameRef.current = currentFrameRef.current;

    resizeCanvas();
    requestFrame(0);
    requestFrame(1);
    requestFrame(2);
    requestFrame(LAST_FRAME_INDEX);
    requestFrame(LAST_FRAME_INDEX - 1);
    requestFrame(LAST_FRAME_INDEX - 2);
    warmFrameWindow(currentFrameRef.current);

    const handleResize = () => {
      resizeCanvas();
    };

    window.addEventListener('resize', handleResize);

    if (prefersReducedMotion) {
      finishIntro();
    } else {
      animationFrameRef.current = window.requestAnimationFrame(animateFrames);
      introControlsRef.current = animate(introProgress, 1, {
        duration: INTRO_DURATION_SECONDS,
        ease: [0.22, 1, 0.36, 1],
        onComplete: () => {
          progressValueRef.current = 1;
          targetFrameRef.current = LAST_FRAME_INDEX;
          warmFrameWindow(LAST_FRAME_INDEX);
        },
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
        <h2 className="story-sequence-title">Opening the first story...</h2>
        <span className="story-sequence-caption">
          The final frame settles in as the world behind the website.
        </span>
      </div>

      <div className="story-sequence-progress">
        <div className="story-sequence-progress-line"></div>
        <motion.div
          className="story-sequence-progress-fill"
          style={{ scaleX: introProgress }}
        ></motion.div>
      </div>
    </div>
  );
}

export default StorySequenceBackground;
