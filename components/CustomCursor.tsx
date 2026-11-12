"use client";

import { useEffect, useState } from "react";
import { motion, useSpring } from "motion/react";

export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  const cursorX = useSpring(-100, { stiffness: 450, damping: 32 });
  const cursorY = useSpring(-100, { stiffness: 450, damping: 32 });
  const auraX = useSpring(-100, { stiffness: 220, damping: 25 });
  const auraY = useSpring(-100, { stiffness: 220, damping: 25 });

  useEffect(() => {
    // Only enable on precise pointer devices (desktop/mouse)
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    setEnabled(true);

    const onMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      auraX.set(e.clientX);
      auraY.set(e.clientY);
    };

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const interactive = target.closest("button, a, input, select, textarea, [role='button'], .spotlight-card, .marcus-card");
      setIsHovered(Boolean(interactive));
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    document.addEventListener("mouseover", onMouseOver, { passive: true });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mouseover", onMouseOver);
    };
  }, [cursorX, cursorY, auraX, auraY]);

  if (!enabled) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden" aria-hidden="true">
      {/* 1. Center Reticle Dot */}
      <motion.div
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        className={`w-2 h-2 rounded-full transition-colors duration-200 ${
          isHovered ? "bg-[#f59e0b] scale-150" : "bg-[#d0c5ab]"
        }`}
      />

      {/* 2. Outer Trailing Magnetic Aura */}
      <motion.div
        style={{
          x: auraX,
          y: auraY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isClicking ? 0.75 : isHovered ? 1.7 : 1,
          opacity: isHovered ? 0.8 : 0.4,
        }}
        transition={{ duration: 0.18, ease: "easeOut" }}
        className="w-8 h-8 rounded-full border border-[#f59e0b]/60 bg-[#f59e0b]/[0.04]"
      />
    </div>
  );
}
