'use client';

import { useState, useEffect, useRef } from 'react';

// ── Tape corner strip ──────────────────────────────────────────────────────────

function TapeStrip({ style }: { style: React.CSSProperties }) {
  return (
    <div
      style={{
        position: 'absolute',
        width: '38px',
        height: '10px',
        background: 'rgba(215, 198, 152, 0.56)',
        borderTop: '1px solid rgba(185, 162, 105, 0.24)',
        borderBottom: '1px solid rgba(185, 162, 105, 0.24)',
        pointerEvents: 'none',
        zIndex: 3,
        ...style,
      }}
    />
  );
}

// ── Quote lines — each with a hairline imperfection ────────────────────────────

const QUOTE_LINES: { text: string; rotate: string; indent: string }[] = [
  { text: '“Three lost souls',   rotate: '-0.35deg', indent: '0' },
  { text: 'swimming in a',            rotate:  '0.28deg', indent: '0.14em' },
  { text: 'fish bowl.”',         rotate: '-0.22deg', indent: '0.06em' },
];

// ── Main component ─────────────────────────────────────────────────────────────

export function BasementMemory() {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Trigger once when 12% of the section enters the viewport
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="basement-memory"
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '90dvh',
        backgroundColor: '#e5d8ae',
        backgroundImage: [
          // Warm bloom — upper-left
          'radial-gradient(ellipse at 20% 28%, rgba(200, 172, 105, 0.24) 0%, transparent 50%)',
          // Amber shadow — lower-right
          'radial-gradient(ellipse at 80% 72%, rgba(178, 148, 82, 0.16) 0%, transparent 44%)',
          // Top + bottom edge darkening — aged page feel
          'linear-gradient(to bottom, rgba(36, 22, 5, 0.11) 0%, transparent 10%, transparent 90%, rgba(36, 22, 5, 0.09) 100%)',
          // Subtle left-right vignette
          'linear-gradient(to right, rgba(36, 22, 5, 0.04) 0%, transparent 6%, transparent 94%, rgba(36, 22, 5, 0.04) 100%)',
        ].join(', '),
        overflow: 'hidden',
      }}
    >
      {/* Very faint horizontal fold mark */}
      <div
        style={{
          position: 'absolute',
          top: '54%',
          left: 0,
          right: 0,
          height: '1px',
          background:
            'linear-gradient(to right, transparent 5%, rgba(125, 98, 48, 0.055) 25%, rgba(125, 98, 48, 0.055) 75%, transparent 95%)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      {/* Coffee ring — barely there */}
      <div
        style={{
          position: 'absolute',
          top: '16%',
          right: '7%',
          width: '68px',
          height: '68px',
          borderRadius: '50%',
          border: '1px solid rgba(132, 102, 48, 0.07)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      {/* Transition from dark TapeTable above */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '90px',
          background: 'linear-gradient(to bottom, rgba(14, 11, 8, 0.26), transparent)',
          pointerEvents: 'none',
          zIndex: 2,
        }}
      />

      {/* ── Main content ── */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          maxWidth: '1080px',
          margin: '0 auto',
          padding:
            'clamp(5rem, 11vh, 7.5rem) clamp(2rem, 7vw, 5rem) clamp(4rem, 8vh, 6rem)',
          display: 'flex',
          flexDirection: 'column',
          minHeight: '90dvh',
          justifyContent: 'center',
        }}
      >
        {/* Archive label */}
        <p
          style={{
            fontFamily: "var(--font-cormorant), 'Garamond', 'Georgia', serif",
            fontSize: '0.52rem',
            letterSpacing: '0.52em',
            textTransform: 'uppercase',
            color: 'rgba(88, 58, 22, 0.30)',
            marginBottom: '1.5rem',
            opacity: visible ? 1 : 0,
            transition: 'opacity 1.2s ease 0.1s',
            userSelect: 'none',
          }}
        >
          Memory Archive — Entry 01
        </p>

        {/* Scrapbook heading — slightly imperfect rotation */}
        <h2
          style={{
            fontFamily: "var(--font-cormorant), 'Garamond', 'Georgia', serif",
            fontStyle: 'italic',
            fontWeight: 300,
            fontSize: 'clamp(1.1rem, 2.3vw, 1.58rem)',
            letterSpacing: '0.045em',
            color: 'rgba(65, 42, 12, 0.50)',
            marginBottom: 'clamp(2.8rem, 5.5vh, 4.2rem)',
            transform: 'rotate(-0.4deg)',
            display: 'inline-block',
            opacity: visible ? 1 : 0,
            transition: 'opacity 1.2s ease 0.28s',
            userSelect: 'none',
          }}
        >
          Jamming in Nat&apos;s Basement
        </h2>

        {/* ── Scrapbook spread ── */}
        <div
          style={{
            display: 'flex',
            gap: 'clamp(2.8rem, 6.5vw, 6rem)',
            alignItems: 'flex-start',
            flexWrap: 'wrap',
          }}
        >
          {/* ── Photo ── */}
          <div
            style={{
              flexShrink: 0,
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateX(0)' : 'translateX(-16px)',
              transition: 'opacity 1.6s ease 0.35s, transform 1.6s ease 0.35s',
            }}
          >
            {/*
              Inner wrapper: holds rotation + float animation.
              The animation keyframe must include rotate() so it owns the full
              transform stack — no conflict with the reveal translateX above.
            */}
            <div
              style={{
                position: 'relative',
                display: 'inline-block',
                // Heavier bottom padding mimics film print border
                padding: '9px 9px 26px',
                background: 'rgba(250, 246, 240, 0.96)',
                boxShadow: [
                  '5px 8px 26px rgba(36, 22, 6, 0.26)',
                  '1px 2px 8px rgba(36, 22, 6, 0.14)',
                  '-1px -1px 4px rgba(36, 22, 6, 0.06)',
                ].join(', '),
                transform: 'rotate(-1.8deg)',
                animation: visible
                  ? 'memoryFloat 10s ease-in-out 1.2s infinite'
                  : 'none',
              }}
            >
              {/* Tape corners */}
              <TapeStrip style={{ top: '-5px', left: '20px', transform: 'rotate(-1.5deg)' }} />
              <TapeStrip style={{ top: '-5px', right: '20px', transform: 'rotate(2.2deg)' }} />
              <TapeStrip style={{ bottom: '-5px', left: '20px', transform: 'rotate(1.8deg)' }} />
              <TapeStrip style={{ bottom: '-5px', right: '20px', transform: 'rotate(-1.5deg)' }} />

              <img
                src="/images/archive/jamming-in-nats-basement.png"
                alt=""
                style={{
                  display: 'block',
                  width: 'clamp(240px, 36vw, 450px)',
                  height: 'auto',
                  // Subtle vintage: slight warmth, muted saturation, softened contrast
                  filter:
                    'sepia(16%) saturate(80%) brightness(0.93) contrast(1.03)',
                }}
              />
            </div>
          </div>

          {/* ── Quote fragment ── */}
          <div
            style={{
              flex: 1,
              minWidth: '190px',
              paddingTop: 'clamp(1.8rem, 4.5vh, 3.5rem)',
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateX(0)' : 'translateX(12px)',
              transition: 'opacity 1.6s ease 0.72s, transform 1.6s ease 0.72s',
            }}
          >
            {/* Quote lines — hairline per-line imperfection */}
            <div style={{ marginBottom: '1.6rem' }}>
              {QUOTE_LINES.map(({ text, rotate, indent }) => (
                <span
                  key={text}
                  style={{
                    display: 'block',
                    fontFamily:
                      "var(--font-cormorant), 'Garamond', 'Georgia', serif",
                    fontStyle: 'italic',
                    fontWeight: 300,
                    fontSize: 'clamp(1.48rem, 2.95vw, 2.12rem)',
                    lineHeight: 1.58,
                    letterSpacing: '0.01em',
                    color: 'rgba(46, 30, 8, 0.72)',
                    transform: `rotate(${rotate})`,
                    marginLeft: indent,
                  }}
                >
                  {text}
                </span>
              ))}
            </div>

            {/* Attribution */}
            <p
              style={{
                fontFamily:
                  "var(--font-cormorant), 'Garamond', 'Georgia', serif",
                fontStyle: 'italic',
                fontWeight: 300,
                fontSize: 'clamp(0.7rem, 1.15vw, 0.88rem)',
                letterSpacing: '0.2em',
                color: 'rgba(68, 46, 12, 0.40)',
                transform: 'rotate(0.35deg)',
                display: 'inline-block',
                paddingLeft: '0.4em',
                userSelect: 'none',
              }}
            >
              — Ahmed
            </p>
          </div>
        </div>
      </div>

      {/* Page index — barely visible, bottom-right */}
      <p
        style={{
          position: 'absolute',
          bottom: '1.8rem',
          right: '2.4rem',
          fontFamily: "var(--font-cormorant), 'Garamond', 'Georgia', serif",
          fontStyle: 'italic',
          fontSize: '0.52rem',
          letterSpacing: '0.42em',
          color: 'rgba(88, 58, 22, 0.20)',
          userSelect: 'none',
          zIndex: 10,
          opacity: visible ? 1 : 0,
          transition: 'opacity 1.5s ease 1.1s',
        }}
      >
        01
      </p>
    </section>
  );
}
