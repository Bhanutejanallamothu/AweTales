import React, { useEffect, useRef } from 'react';
import { motion, useMotionValueEvent, useReducedMotion } from 'framer-motion';

const FRAME_COUNT = 236;
const MAX_CACHED_FRAMES = 42;
const FRAME_EASING = 0.1;
const FRAME_WINDOW = 10;
const REDRAW_THRESHOLD = 0.015;

function clampFrame(index) {
  return Math.max(0, Math.min(FRAME_COUNT - 1, index));
}

function clampProgress(frame) {
  return Math.max(0, Math.min(FRAME_COUNT - 1, frame));
}

function getFrameUrl(index) {
  return `/home-scroll-frames/ezgif-frame-${String(index + 1).padStart(3, '0')}.jpg`;
}

function StorySequenceBackground({ scrollYProgress }) {
  const prefersReducedMotion = useReducedMotion();
  const canvasRef = useRef(null);
  const loadedFramesRef = useRef(new Map());
  const requestedFramesRef = useRef(new Set());
  const animationFrameRef = useRef(null);
  const currentFrameRef = useRef(0);
  const targetFrameRef = useRef(0);
  const renderedFrameRef = useRef(-1);
  const progressValueRef = useRef(0);
  const isMountedRef = useRef(false);

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
    image.fetchPriority = Math.abs(safeFrame - currentFrameRef.current) < 3 ? 'high' : 'low';
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

      const desiredFrame = currentFrameRef.current;
      if (
        renderedFrameRef.current === -1 ||
        Math.abs(safeFrame - desiredFrame) <= 1
      ) {
        drawFrame(desiredFrame);
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

  function animateFrames() {
    if (!isMountedRef.current) {
      return;
    }

    targetFrameRef.current = prefersReducedMotion
      ? 0
      : progressValueRef.current * (FRAME_COUNT - 1);

    const difference = targetFrameRef.current - currentFrameRef.current;
    if (Math.abs(difference) > 0.0005) {
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
    animationFrameRef.current = window.requestAnimationFrame(animateFrames);
  }

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    progressValueRef.current = latest;

    if (prefersReducedMotion) {
      currentFrameRef.current = 0;
      targetFrameRef.current = 0;
      warmFrameWindow(0);
      drawFrame(0);
      return;
    }

    const nextFrame = clampFrame(Math.round(latest * (FRAME_COUNT - 1)));
    warmFrameWindow(nextFrame);
  });

  useEffect(() => {
    isMountedRef.current = true;
    progressValueRef.current = scrollYProgress.get();
    resizeCanvas();
    warmFrameWindow(0);
    animationFrameRef.current = window.requestAnimationFrame(animateFrames);

    const handleResize = () => {
      resizeCanvas();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      isMountedRef.current = false;
      window.removeEventListener('resize', handleResize);

      if (animationFrameRef.current) {
        window.cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [prefersReducedMotion, scrollYProgress]);

  return (
    <div className="story-sequence-background" aria-hidden="true">
      <canvas ref={canvasRef} className="story-sequence-canvas"></canvas>
      <div className="story-sequence-vignette"></div>
      <div className="story-sequence-overlay"></div>
      <div className="story-sequence-grain"></div>

      <div className="story-sequence-progress">
        <div className="story-sequence-progress-line"></div>
        <motion.div
          className="story-sequence-progress-fill"
          style={{ scaleX: prefersReducedMotion ? 0 : scrollYProgress }}
        ></motion.div>
      </div>
    </div>
  );
}

export default StorySequenceBackground;
