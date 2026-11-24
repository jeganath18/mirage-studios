
import React, { useEffect, useState, useCallback } from 'react';
import {
  motion,
  useSpring,
  useMotionValue,
  AnimatePresence,
} from 'framer-motion';

export const CustomCursor = () => {
  const [cursorState, setCursorState] = useState('default');
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth cursor movement
  const springConfig = {
    damping: 25,
    stiffness: 250,
    mass: 0.5,
  };

  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  const handleMouseMove = useCallback((e) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);

    setIsVisible(true);

    const target = e.target;

    if (!target || !target.closest) return;

    const customTarget = target.closest('[data-cursor]');

    if (customTarget) {
      const state = customTarget.getAttribute('data-cursor');

      if (
        ['default', 'link', 'button', 'drag', 'view'].includes(state)
      ) {
        setCursorState(state);
        return;
      }
    }

    if (target.closest('a')) {
      setCursorState('link');
    } else if (target.closest('button')) {
      setCursorState('button');
    } else {
      setCursorState('default');
    }
  }, [mouseX, mouseY]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(pointer: coarse)');

    const checkMobile = () => {
      setIsMobile(mediaQuery.matches);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    checkMobile();

    mediaQuery.addEventListener('change', checkMobile);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      mediaQuery.removeEventListener('change', checkMobile);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [handleMouseMove]);

  if (isMobile) return null;

  // Cursor animation variants
  const variants = {
    default: {
      width: 40,
      height: 40,
      scale: 1,
      backgroundColor: 'rgba(0, 0, 0, 0)',
      border: '1px solid rgba(0, 0, 0, 0.7)',
    },

    link: {
      width: 55,
      height: 55,
      scale: 1.05,
      backgroundColor: 'rgba(0, 0, 0, 0.04)',
      border: '1px solid rgba(0, 0, 0, 0.9)',
    },

    button: {
      width: 50,
      height: 50,
      scale: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.08)',
      border: '1px solid rgba(0, 0, 0, 0.9)',
    },

    drag: {
      width: 75,
      height: 75,
      scale: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.04)',
      border: '1px solid rgba(0, 0, 0, 0.8)',
    },

    view: {
      width: 100,
      height: 100,
      scale: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.08)',
      border: '1px solid rgba(0, 0, 0, 0.9)',
    },
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Main cursor dot */}
          <motion.div
            className="fixed top-0 left-0 w-1.5 h-1.5 bg-black rounded-full z-[10000] pointer-events-none"
            style={{
              x: mouseX,
              y: mouseY,
              translateX: '-50%',
              translateY: '-50%',
            }}
          />

          {/* Outer cursor ring */}
          <motion.div
            className="fixed top-0 left-0 rounded-full z-[9999] pointer-events-none flex items-center justify-center"
            style={{
              x: springX,
              y: springY,
              translateX: '-50%',
              translateY: '-50%',
            }}
            variants={variants}
            initial="default"
            animate={cursorState}
            transition={{
              type: 'spring',
              damping: 25,
              stiffness: 200,
              mass: 0.8,
            }}
          />
        </>
      )}
    </AnimatePresence>
  );
};

export default CustomCursor;
