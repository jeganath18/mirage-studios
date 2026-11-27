import React, { useEffect, useState, useCallback } from "react";
import {
  motion,
  useSpring,
  useMotionValue,
  AnimatePresence,
} from "framer-motion";

const VALID_STATES = ["default", "link", "button", "drag", "view", "text"];

// Top of the stack so it always sits above dialogs, overlays and modals
const CURSOR_Z = 2147483647;

// White + difference blend = visible on both black and white surfaces
const blend = { mixBlendMode: "difference" };

export const CustomCursor = () => {
  const [cursorState, setCursorState] = useState("default");
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springX = useSpring(mouseX, { damping: 25, stiffness: 250, mass: 0.5 });
  const springY = useSpring(mouseY, { damping: 25, stiffness: 250, mass: 0.5 });

  const handleMouseMove = useCallback(
    (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      setIsVisible(true);

      const target = e.target;
      if (!target || !target.closest) return;

      // 1. Explicit override via data-cursor="..."
      const customTarget = target.closest("[data-cursor]");
      if (customTarget) {
        const state = customTarget.getAttribute("data-cursor");
        if (VALID_STATES.includes(state)) {
          setCursorState(state);
          return;
        }
      }

      // 2. Automatic detection
      if (target.closest("input, textarea, select, [contenteditable='true']")) {
        setCursorState("text");
      } else if (target.closest("a, [role='link']")) {
        setCursorState("link");
      } else if (target.closest("button, [role='button'], label, summary")) {
        setCursorState("button");
      } else {
        setCursorState("default");
      }
    },
    [mouseX, mouseY]
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(pointer: coarse)");
    const checkMobile = () => setIsMobile(mediaQuery.matches);
    const handleLeave = () => setIsVisible(false);

    checkMobile();
    mediaQuery.addEventListener("change", checkMobile);

    window.addEventListener("mousemove", handleMouseMove);
    // "mouseleave" never fires on window; listen on the root element instead
    document.documentElement.addEventListener("mouseleave", handleLeave);

    return () => {
      mediaQuery.removeEventListener("change", checkMobile);
      window.removeEventListener("mousemove", handleMouseMove);
      document.documentElement.removeEventListener("mouseleave", handleLeave);
    };
  }, [handleMouseMove]);

  if (isMobile) return null;

  const variants = {
    default: {
      width: 40,
      height: 40,
      backgroundColor: "rgba(255, 255, 255, 0)",
      border: "1px solid rgba(255, 255, 255, 0.9)",
    },
    link: {
      width: 56,
      height: 56,
      backgroundColor: "rgba(255, 255, 255, 0.12)",
      border: "1px solid rgba(255, 255, 255, 1)",
    },
    button: {
      width: 50,
      height: 50,
      backgroundColor: "rgba(255, 255, 255, 0.2)",
      border: "1px solid rgba(255, 255, 255, 1)",
    },
    drag: {
      width: 75,
      height: 75,
      backgroundColor: "rgba(255, 255, 255, 0.12)",
      border: "1px solid rgba(255, 255, 255, 1)",
    },
    view: {
      width: 100,
      height: 100,
      backgroundColor: "rgba(255, 255, 255, 0.2)",
      border: "1px solid rgba(255, 255, 255, 1)",
    },
    // Thin I-beam style ring while hovering inputs
    text: {
      width: 4,
      height: 28,
      backgroundColor: "rgba(255, 255, 255, 1)",
      border: "1px solid rgba(255, 255, 255, 1)",
    },
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Main cursor dot */}
          <motion.div
            className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full pointer-events-none"
            style={{
              x: mouseX,
              y: mouseY,
              translateX: "-50%",
              translateY: "-50%",
              backgroundColor: "#fff",
              zIndex: CURSOR_Z,
              ...blend,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: cursorState === "text" ? 0 : 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Outer cursor ring */}
          <motion.div
            className="fixed top-0 left-0 rounded-full pointer-events-none flex items-center justify-center"
            style={{
              x: springX,
              y: springY,
              translateX: "-50%",
              translateY: "-50%",
              zIndex: CURSOR_Z - 1,
              ...blend,
            }}
            variants={variants}
            initial="default"
            animate={cursorState}
            exit={{ opacity: 0 }}
            transition={{
              type: "spring",
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