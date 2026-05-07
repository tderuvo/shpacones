'use client';

import { useState, useEffect } from 'react';

// ── Types ──────────────────────────────────────────────────────────────────────

interface ScrapbookPhotoProps {
  src: string;
  rotation: number;        // degrees; sign determines shadow direction
  floatAnimation: string;  // full CSS animation value, e.g. 'memoryFloat 10s ...'
  imgFilter: string;       // CSS filter string
  imgWidth: string;        // CSS width, e.g. 'clamp(240px, 36vw, 450px)'
  visible: boolean;        // from parent's IntersectionObserver reveal
  revealFrom: 'left' | 'right';
  revealDelay: string;     // CSS time, e.g. '0.35s'
  children?: React.ReactNode; // tape strips, positioned inside the print wrapper
}

// ── Component ──────────────────────────────────────────────────────────────────

export function ScrapbookPhoto({
  src,
  rotation,
  floatAnimation,
  imgFilter,
  imgWidth,
  visible,
  revealFrom,
  revealDelay,
  children,
}: ScrapbookPhotoProps) {
  const [focused,     setFocused]     = useState(false);
  const [hasRevealed, setHasRevealed] = useState(false);

  // Switch to fast focus transitions once the scroll reveal has settled
  useEffect(() => {
    if (!visible) return;
    const t = setTimeout(() => setHasRevealed(true), 2500);
    return () => clearTimeout(t);
  }, [visible]);

  // Escape key closes the focus view
  useEffect(() => {
    if (!focused) return;
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') setFocused(false); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [focused]);

  // Prevent page scroll while a photo is focused
  useEffect(() => {
    if (focused) {
      document.documentElement.style.overflowY = 'hidden';
      document.body.style.overflowY = 'hidden';
    } else {
      document.documentElement.style.overflowY = 'auto';
      document.body.style.overflowY = 'auto';
    }
    return () => {
      document.documentElement.style.overflowY = 'auto';
      document.body.style.overflowY = 'auto';
    };
  }, [focused]);

  // ── Derived values ───────────────────────────────────────────────────────────

  // Shadow leans away from the tilt — left-tilted prints cast shadow right, and vice-versa
  const sx  = rotation <= 0 ? '5px'  : '-5px';
  const sx2 = rotation <= 0 ? '1px'  : '-1px';
  const sx3 = rotation <= 0 ? '-1px' : '1px';

  const revealTranslate = revealFrom === 'left' ? 'translateX(-16px)' : 'translateX(16px)';

  // During initial reveal: slow with delay. After: fast for focus changes.
  const transition = hasRevealed
    ? focused ? 'opacity 0.35s ease' : 'opacity 0.55s ease'
    : `opacity 1.6s ease ${revealDelay}, transform 1.6s ease ${revealDelay}`;

  // ── Render ───────────────────────────────────────────────────────────────────

  return (
    <>
      {/* ── In-place print ── */}
      <div
        style={{
          flexShrink: 0,
          opacity:   !visible ? 0 : focused ? 0.20 : 1,
          transform: visible  ? 'translateX(0)' : revealTranslate,
          transition,
          cursor: focused ? 'default' : 'zoom-in',
        }}
        onClick={() => !focused && setFocused(true)}
      >
        <div
          style={{
            position: 'relative',
            display: 'inline-block',
            padding: '9px 9px 26px',
            background: 'rgba(250, 246, 240, 0.96)',
            boxShadow: [
              `${sx} 8px 26px rgba(36, 22, 6, 0.26)`,
              `${sx2} 2px 8px rgba(36, 22, 6, 0.14)`,
              `${sx3} -1px 4px rgba(36, 22, 6, 0.06)`,
            ].join(', '),
            transform: `rotate(${rotation}deg)`,
            animation: visible ? floatAnimation : 'none',
          }}
        >
          {/* Tape strips, margin annotations, etc. from parent */}
          {children}
          <img
            src={src}
            alt=""
            style={{ display: 'block', width: imgWidth, height: 'auto', filter: imgFilter }}
          />
        </div>
      </div>

      {/* ── Focus view — rendered only when active ── */}
      {focused && (
        <>
          {/* Warm backdrop — the only close target */}
          <div
            onClick={() => setFocused(false)}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 40,
              background: 'rgba(18, 11, 4, 0.72)',
              backdropFilter: 'blur(2.5px)',
              WebkitBackdropFilter: 'blur(2.5px)',
              cursor: 'zoom-out',
              animation: 'scrapFocusOverlay 0.45s ease forwards',
            }}
          />

          {/*
            Lifted photo — no tape strips (they stay on the page).
            Clicks on the photo stop propagation so only the backdrop closes.
            Rotation eases toward 0: physically straightens as it lifts.
          */}
          <div
            onClick={e => e.stopPropagation()}
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              zIndex: 50,
              animation: 'scrapFocusPhoto 0.45s ease forwards',
            }}
          >
            <div
              style={{
                position: 'relative',
                display: 'inline-block',
                padding: '9px 9px 26px',
                background: 'rgba(250, 246, 240, 0.97)',
                boxShadow: [
                  '0 28px 70px rgba(12, 7, 2, 0.60)',
                  '0 10px 30px rgba(12, 7, 2, 0.36)',
                  '0 3px 10px rgba(12, 7, 2, 0.20)',
                ].join(', '),
                transform: `rotate(${rotation * 0.25}deg)`,
              }}
            >
              <img
                src={src}
                alt=""
                style={{
                  display: 'block',
                  width: 'min(72vw, 68vh)',
                  height: 'auto',
                  filter: imgFilter,
                }}
              />
            </div>
          </div>
        </>
      )}
    </>
  );
}
