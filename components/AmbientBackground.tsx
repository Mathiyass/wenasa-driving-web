"use client";

import { useEffect, useState } from "react";

export function AmbientBackground() {
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let animationFrameId: number;

    const handleMouseMove = (e: MouseEvent) => {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(() => {
        setMousePos({ x: e.clientX, y: e.clientY });
        if (!isVisible) setIsVisible(true);
      });
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave, { passive: true });

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isVisible]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden select-none"
    >
      {/* 1. Subtle Engineering Blueprint Dot Grid with Smooth Radial Vignette */}
      <div 
        className="absolute inset-0 bg-grid-subtle opacity-40"
        style={{
          maskImage: "radial-gradient(ellipse 70% 60% at 50% 40%, black 20%, transparent 80%)",
          WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 50% 40%, black 20%, transparent 80%)",
        }}
      />

      {/* 2. Floating Ambient Glow Orbs (Marcus Lorenzet Warm Editorial Aesthetic) */}
      <div className="absolute top-[-10%] right-[-5%] w-[45rem] h-[45rem] rounded-full bg-[#fcc438]/[0.035] blur-[120px] animate-orb-1" />
      <div className="absolute top-[35%] left-[-10%] w-[50rem] h-[50rem] rounded-full bg-[#d0c5ab]/[0.03] blur-[140px] animate-orb-2" />
      <div className="absolute bottom-[-15%] right-[15%] w-[40rem] h-[40rem] rounded-full bg-[#fcc438]/[0.025] blur-[130px] animate-orb-1" />

      {/* 3. Interactive Mouse-Following Spotlight (Hardware Accelerated) */}
      {isVisible && (
        <div
          className="fixed pointer-events-none transition-opacity duration-500 rounded-full blur-3xl opacity-100"
          style={{
            width: "36rem",
            height: "36rem",
            left: `${mousePos.x}px`,
            top: `${mousePos.y}px`,
            transform: "translate(-50%, -50%)",
            background: "radial-gradient(circle, rgba(252, 196, 56, 0.045) 0%, rgba(208, 197, 171, 0.015) 45%, transparent 70%)",
          }}
        />
      )}

      {/* 4. Film Grain / Micro Noise Texture Layer */}
      <div
        className="absolute inset-0 opacity-[0.022] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}
