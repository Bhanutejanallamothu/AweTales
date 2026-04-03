import React, { useEffect, useRef, useState } from 'react';
import { animate, motion, useMotionValue, useReducedMotion } from 'framer-motion';

const SOURCE_FRAME_COUNT = 90;
const SOURCE_LAST_FRAME_INDEX = SOURCE_FRAME_COUNT - 1;
const FRAME_COUNT = 54;
const LAST_FRAME_INDEX = FRAME_COUNT - 1;
const FRAME_EASING = 0.18;
const REDRAW_THRESHOLD = 0.02;
const INTRO_DURATION_SECONDS = 10;
const INITIAL_READY_FRAMES = 8;
const MAX_CONCURRENT_LOADS = 5;
const MAX_CANVAS_DPR = 1.25;
const LOAD_PROGRESS_STEP = 0.01;

const SHARED_FRAME_CACHE = new Map();
const SHARED_FRAME_PROMISES = new Map();

function clampFrame(index) {
  return Math.max(0, Math.min(LAST_FRAME_INDEX, index));
}

function clampProgress(frame) {
  return Math.max(0, Math.min(LAST_FRAME_INDEX, frame));
}

function getSourceFrameIndex(index) {
  const safePlaybackFrame = clampFrame(index);
  if (LAST_FRAME_INDEX <= 0) {
    return 0;
  }

  const progressRatio = safePlaybackFrame / LAST_FRAME_INDEX;
  return Math.round(progressRatio * SOURCE_LAST_FRAME_INDEX);
}

function getFrameUrl(sourceFrameIndex) {
  return `/home-intro-frames/intro-frame-${String(sourceFrameIndex + 1).padStart(3, '0')}.jpg`;
}

function buildLoadQueue() {
  const priorityFrames = [];
  const priorityLimit = Math.min(LAST_FRAME_INDEX, INITIAL_READY_FRAMES - 1);
  for (let frame = 0; frame <= priorityLimit; frame += 1) {
    priorityFrames.push(frame);
  }

  if (!priorityFrames.includes(LAST_FRAME_INDEX)) {
    priorityFrames.push(LAST_FRAME_INDEX);
  }

  const prioritySet = new Set(priorityFrames);
  const queue = [...priorityFrames];

  for (let frame = 0; frame <= LAST_FRAME_INDEX; frame += 1) {
    if (!prioritySet.has(frame)) {
      queue.push(frame);
    }
  }

  return { queue, prioritySet };
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
  const hasPlaybackStartedRef = useRef(false);
  const introCompletedRef = useRef(false);
  const preloadCancelledRef = useRef(false);
  const lastReportedLoadRef = useRef(0);
  const contiguousLoadedFrameRef = useRef(-1);
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
    const devicePixelRatio = Math.min(window.devicePixelRatio || 1, MAX_CANVAS_DPR);
    context.setTransform(1, 0, 0, 1, 0, 0);
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
    context.globalAlpha = 1;
  }

  function reportLoadProgress() {
    const nextProgress = Math.min(1, loadedCountRef.current / FRAME_COUNT);
    if (
      nextProgress === 1 ||
      nextProgress - lastReportedLoadRef.current >= LOAD_PROGRESS_STEP
    ) {
      lastReportedLoadRef.current = nextProgress;
      setLoadProgress(nextProgress);
    }
  }

  function updateContiguousLoadedFrame() {
    while (
      loadedFramesRef.current.has(contiguousLoadedFrameRef.current + 1) &&
      contiguousLoadedFrameRef.current < LAST_FRAME_INDEX
    ) {
      contiguousLoadedFrameRef.current += 1;
    }
  }

  function registerLoadedFrame(frameIndex, image) {
    if (!image || !isMountedRef.current) {
      return null;
    }

    if (!loadedFramesRef.current.has(frameIndex)) {
      loadedFramesRef.current.set(frameIndex, image);
      loadedCountRef.current += 1;
      reportLoadProgress();
      updateContiguousLoadedFrame();
    }

    return image;
  }

  function findClosestLoadedImage(frameIndex) {
    for (let radius = 0; radius <= LAST_FRAME_INDEX; radius += 1) {
      const lowerIndex = frameIndex - radius;
      if (lowerIndex >= 0) {
        const lowerImage = loadedFramesRef.current.get(lowerIndex);
        if (lowerImage) {
          return lowerImage;
        }
      }

      const upperIndex = frameIndex + radius;
      if (upperIndex <= LAST_FRAME_INDEX && upperIndex !== lowerIndex) {
        const upperImage = loadedFramesRef.current.get(upperIndex);
        if (upperImage) {
          return upperImage;
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
    const fallbackImage = lowerImage || upperImage || findClosestLoadedImage(Math.round(safeProgress));

    if (!fallbackImage) {
      return false;
    }

    resetContext(context, canvas);

    if (
      lowerImage &&
      upperImage &&
      lowerImage !== upperImage &&
      upperFrameIndex !== lowerFrameIndex
    ) {
      drawCoverImage(context, lowerImage, canvasWidth, canvasHeight, 1 - mix);
      drawCoverImage(context, upperImage, canvasWidth, canvasHeight, mix);
    } else {
      drawCoverImage(context, fallbackImage, canvasWidth, canvasHeight, 1);
    }

    renderedFrameRef.current = safeProgress;
    return true;
  }

  function resizeCanvas() {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const devicePixelRatio = Math.min(window.devicePixelRatio || 1, MAX_CANVAS_DPR);
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

    const desiredTargetFrame = introProgress.get() * LAST_FRAME_INDEX;
    const maxLoadedTarget = Math.max(0, contiguousLoadedFrameRef.current);
    targetFrameRef.current = Math.min(desiredTargetFrame, maxLoadedTarget);

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

  async function loadFrame(frameIndex, priority = 'low') {
    const safeFrame = clampFrame(frameIndex);
    const sourceFrameIndex = getSourceFrameIndex(safeFrame);

    const localFrame = loadedFramesRef.current.get(safeFrame);
    if (localFrame) {
      updateContiguousLoadedFrame();
      return localFrame;
    }

    const sharedFrame = SHARED_FRAME_CACHE.get(sourceFrameIndex);
    if (sharedFrame) {
      return registerLoadedFrame(safeFrame, sharedFrame);
    }

    let sharedPromise = SHARED_FRAME_PROMISES.get(sourceFrameIndex);
    if (!sharedPromise) {
      sharedPromise = new Promise((resolve) => {
        const image = new Image();
        image.decoding = 'async';
        image.loading = 'eager';
        image.fetchPriority = priority;
        image.src = getFrameUrl(sourceFrameIndex);

        image.onload = async () => {
          try {
            if (image.decode) {
              await image.decode();
            }
          } catch {
            // Ignore decode failures and continue with the loaded image.
          }

          SHARED_FRAME_CACHE.set(sourceFrameIndex, image);
          resolve(image);
        };

        image.onerror = () => {
          resolve(null);
        };
      });

      SHARED_FRAME_PROMISES.set(sourceFrameIndex, sharedPromise);
    }

    const loadedFrame = await sharedPromise.finally(() => {
      SHARED_FRAME_PROMISES.delete(sourceFrameIndex);
    });

    const registeredFrame = registerLoadedFrame(safeFrame, loadedFrame);
    if (registeredFrame && (safeFrame === 0 || safeFrame === LAST_FRAME_INDEX)) {
      drawFrame(currentFrameRef.current);
    }

    return registeredFrame;
  }

  function startPlayback() {
    if (!isMountedRef.current || hasPlaybackStartedRef.current) {
      return;
    }

    hasPlaybackStartedRef.current = true;
    setIsReady(true);
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
  }

  useEffect(() => {
    isMountedRef.current = true;
    hasPlaybackStartedRef.current = false;
    introCompletedRef.current = false;
    preloadCancelledRef.current = false;
    loadedFramesRef.current = new Map();
    contiguousLoadedFrameRef.current = -1;
    renderedFrameRef.current = -1;
    currentFrameRef.current = prefersReducedMotion ? LAST_FRAME_INDEX : 0;
    targetFrameRef.current = currentFrameRef.current;
    introProgress.set(0);
    setIsSettled(false);
    setIsReady(false);

    for (let frame = 0; frame <= LAST_FRAME_INDEX; frame += 1) {
      const sourceFrameIndex = getSourceFrameIndex(frame);
      const cachedFrame = SHARED_FRAME_CACHE.get(sourceFrameIndex);
      if (cachedFrame) {
        loadedFramesRef.current.set(frame, cachedFrame);
      }
    }

    updateContiguousLoadedFrame();
    loadedCountRef.current = loadedFramesRef.current.size;
    lastReportedLoadRef.current = Math.min(1, loadedCountRef.current / FRAME_COUNT);
    setLoadProgress(lastReportedLoadRef.current);

    resizeCanvas();
    drawFrame(currentFrameRef.current);

    const handleResize = () => {
      resizeCanvas();
    };

    const maybeStartPlayback = () => {
      if (hasPlaybackStartedRef.current) {
        return;
      }

      const readyThreshold = Math.min(FRAME_COUNT, INITIAL_READY_FRAMES);
      const hasOpeningFrames =
        loadedFramesRef.current.has(0) && loadedCountRef.current >= readyThreshold;

      if (hasOpeningFrames || loadedCountRef.current === FRAME_COUNT) {
        startPlayback();
      }
    };

    window.addEventListener('resize', handleResize);

    if (prefersReducedMotion) {
      loadFrame(LAST_FRAME_INDEX, 'high').then(() => {
        currentFrameRef.current = LAST_FRAME_INDEX;
        targetFrameRef.current = LAST_FRAME_INDEX;
        startPlayback();
      });
    } else {
      const { queue, prioritySet } = buildLoadQueue();
      let activeLoads = 0;

      maybeStartPlayback();

      const pumpQueue = () => {
        if (preloadCancelledRef.current) {
          return;
        }

        while (activeLoads < MAX_CONCURRENT_LOADS && queue.length > 0) {
          const frameIndex = queue.shift();
          activeLoads += 1;
          const priority = prioritySet.has(frameIndex) ? 'high' : 'low';

          loadFrame(frameIndex, priority)
            .catch(() => null)
            .finally(() => {
              activeLoads -= 1;
              maybeStartPlayback();

              if (queue.length === 0 && activeLoads === 0 && !hasPlaybackStartedRef.current) {
                startPlayback();
              }

              pumpQueue();
            });
        }
      };

      pumpQueue();
    }

    return () => {
      isMountedRef.current = false;
      preloadCancelledRef.current = true;
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
      <div className="story-sequence-aurora"></div>
      <div className="story-sequence-lightfall"></div>
      <div className="story-sequence-mist"></div>
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
