"use client";

import { useState, useEffect, useRef, useCallback } from "react";

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  const rafRef = useRef<number | null>(null);

  const update = useCallback(() => {
    const doc = document.documentElement;
    const scrollTop = window.scrollY || doc.scrollTop;
    const height = doc.scrollHeight - doc.clientHeight;
    const next = height > 0 ? (scrollTop / height) * 100 : 0;
    setProgress(next);
    rafRef.current = null;
  }, []);

  const onScroll = useCallback(() => {
    if (rafRef.current === null) {
      rafRef.current = window.requestAnimationFrame(update);
    }
  }, [update]);

  useEffect(() => {
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [onScroll, update]);

  const clampedProgress = Math.max(0, Math.min(100, progress));

  return (
    <div
      role="progressbar"
      aria-label="Scroll progress"
      aria-valuenow={Math.round(clampedProgress)}
      aria-valuemin={0}
      aria-valuemax={100}
      className="fixed top-0 left-0 right-0 z-[60] h-0.5 pointer-events-none transition-opacity duration-300"
      style={{ opacity: clampedProgress > 0.5 ? 1 : 0 }}
    >
      <div
        className="h-full will-change-[width]"
        style={{
          width: `${clampedProgress}%`,
          background:
            "linear-gradient(90deg, #4a9eff 0%, #bd10e0 50%, #50e3c2 100%)",
          transition: "width 120ms cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      />
    </div>
  );
}
