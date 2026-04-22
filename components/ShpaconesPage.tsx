'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { Hero } from './Hero';
import { ArchiveOpening } from './ArchiveOpening';

export function ShpaconesPage() {
  const [burning, setBurning] = useState(false);
  const [archiveRevealed, setArchiveRevealed] = useState(false);
  const [heroOpacity, setHeroOpacity] = useState(1);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    return () => timersRef.current.forEach(clearTimeout);
  }, []);

  const handleEnterArchive = useCallback(() => {
    if (burning || archiveRevealed) return;

    // Release scroll lock before the programmatic scroll fires
    document.documentElement.style.overflowY = 'auto';
    document.body.style.overflowY = 'auto';

    // React state drives the overlay — no direct DOM mutation needed
    setBurning(true);

    const t1 = setTimeout(() => {
      // Begin fade-out of hero and smooth scroll to archive
      setHeroOpacity(0.15);
      const archive = document.getElementById('archive');
      if (archive) {
        window.scrollTo({
          top: archive.offsetTop,
          behavior: 'smooth',
        });
      }
      setArchiveRevealed(true);
    }, 680);

    const t2 = setTimeout(() => {
      setBurning(false);
    }, 1950);

    timersRef.current = [t1, t2];
  }, [burning, archiveRevealed]);

  return (
    <>
      {/*
        Overlay style is entirely state-driven so React reconciliation
        never clobbers the animation mid-flight.
        CSS animation origin outranks inline styles (Cascade Level 4),
        so `opacity: 0` here is overridden by the keyframe values during burn.
      */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 50,
          pointerEvents: burning ? 'all' : 'none',
          animation: burning ? 'filmBurn 1.9s ease forwards' : 'none',
          opacity: 0,
        }}
      />

      <Hero onEnterArchive={handleEnterArchive} heroOpacity={heroOpacity} />
      <ArchiveOpening visible={archiveRevealed} />
    </>
  );
}
