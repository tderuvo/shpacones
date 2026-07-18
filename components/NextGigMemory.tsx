'use client';

import { useState, useEffect, useRef } from 'react';
import { ScrapbookPhoto } from './ScrapbookPhoto';

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

// ── Memory note lines ────────────────────────────────────────────────────────────

const NOTE_LINES: { text: string; rotate: string; indent: string }[] = [
  { text: '“Some people chased fame…', rotate:  '0.25deg', indent: '0' },
  { text: 'we chased',                 rotate: '-0.20deg', indent: '0.10em' },
  { text: 'the next gig.”',            rotate:  '0.30deg', indent: '0.04em' },
];

// ── Component ──────────────────────────────────────────────────────────────────

export function NextGigMemory() {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

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
      id="next-gig-memory"
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '90dvh',
        // Deepest, most worn page yet — furthest into the scrapbook
        backgroundColor: '#c9bd88',
        backgroundImage: [
          'radial-gradient(ellipse at 30% 72%, rgba(180, 152, 84, 0.20) 0%, transparent 50%)',
          'radial-gradient(ellipse at 72% 22%, rgba(160, 132, 68, 0.16) 0%, transparent 44%)',
          'linear-gradient(to bottom, rgba(36, 22, 5, 0.11) 0%, transparent 10%, transparent 90%, rgba(36, 22, 5, 0.13) 100%)',
          'linear-gradient(to right, rgba(36, 22, 5, 0.05) 0%, transparent 6%, transparent 94%, rgba(36, 22, 5, 0.05) 100%)',
        ].join(', '),
        overflow: 'hidden',
      }}
    >
      {/* Faint horizontal fold mark — new position for this page */}
      <div
        style={{
          position: 'absolute',
          top: '38%',
          left: 0,
          right: 0,
          height: '1px',
          background:
            'linear-gradient(to right, transparent 5%, rgba(112, 86, 40, 0.05) 25%, rgba(112, 86, 40, 0.05) 75%, transparent 95%)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      {/* Coffee ring — top-right this time */}
      <div
        style={{
          position: 'absolute',
          top: '14%',
          right: '9%',
          width: '64px',
          height: '64px',
          borderRadius: '50%',
          border: '1px solid rgba(112, 84, 34, 0.07)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      {/* Tiny handwritten margin note */}
      <p
        style={{
          position: 'absolute',
          bottom: '10%',
          left: '3rem',
          fontFamily: "var(--font-cormorant), 'Garamond', 'Georgia', serif",
          fontStyle: 'italic',
          fontWeight: 300,
          fontSize: '0.52rem',
          letterSpacing: '0.12em',
          color: 'rgba(60, 42, 10, 0.18)',
          transform: 'rotate(0.9deg)',
          pointerEvents: 'none',
          userSelect: 'none',
          zIndex: 1,
          opacity: visible ? 1 : 0,
          transition: 'opacity 1.8s ease 1.4s',
        }}
      >
        one more town
      </p>

      {/* Page-to-page shadow — paper edge between scrapbook entries */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '6px',
          background: 'linear-gradient(to bottom, rgba(36, 22, 5, 0.10), transparent)',
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
            color: 'rgba(78, 52, 16, 0.28)',
            marginBottom: '1.5rem',
            opacity: visible ? 1 : 0,
            transition: 'opacity 1.2s ease 0.1s',
            userSelect: 'none',
          }}
        >
          Memory Archive — Entry 04
        </p>

        {/* Scrapbook heading */}
        <h2
          style={{
            fontFamily: "var(--font-cormorant), 'Garamond', 'Georgia', serif",
            fontStyle: 'italic',
            fontWeight: 300,
            fontSize: 'clamp(1.1rem, 2.3vw, 1.58rem)',
            letterSpacing: '0.045em',
            color: 'rgba(56, 36, 8, 0.48)',
            marginBottom: 'clamp(2.8rem, 5.5vh, 4.2rem)',
            transform: 'rotate(-0.6deg)',
            display: 'inline-block',
            opacity: visible ? 1 : 0,
            transition: 'opacity 1.2s ease 0.28s',
            userSelect: 'none',
          }}
        >
          Robert &amp; Tony
        </h2>

        {/* ── Scrapbook spread: note LEFT, photo RIGHT ── */}
        <div
          style={{
            display: 'flex',
            gap: 'clamp(2.8rem, 6.5vw, 6rem)',
            alignItems: 'flex-start',
            flexWrap: 'wrap',
          }}
        >
          {/* ── Memory note — first in DOM, appears left on desktop ── */}
          <div
            style={{
              flex: 1,
              minWidth: '190px',
              paddingTop: 'clamp(1.8rem, 4.5vh, 3.5rem)',
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateX(0)' : 'translateX(-12px)',
              transition: 'opacity 1.6s ease 0.38s, transform 1.6s ease 0.38s',
            }}
          >
            <div>
              {NOTE_LINES.map(({ text, rotate, indent }) => (
                <span
                  key={text}
                  style={{
                    display: 'block',
                    fontFamily:
                      "var(--font-cormorant), 'Garamond', 'Georgia', serif",
                    fontStyle: 'italic',
                    fontWeight: 300,
                    fontSize: 'clamp(1.40rem, 2.78vw, 2.00rem)',
                    lineHeight: 1.60,
                    letterSpacing: '0.01em',
                    color: 'rgba(44, 28, 6, 0.70)',
                    transform: `rotate(${rotate})`,
                    marginLeft: indent,
                  }}
                >
                  {text}
                </span>
              ))}
            </div>
          </div>

          {/* ── Photo — second in DOM, appears right on desktop ── */}
          <ScrapbookPhoto
            src="/images/archive/shpacone-02-robert-tony.png"
            rotation={1.9}
            floatAnimation="memoryFloatD 11.5s ease-in-out 1.2s infinite"
            imgFilter="sepia(19%) saturate(78%) brightness(0.92) contrast(1.04)"
            imgWidth="clamp(240px, 36vw, 450px)"
            visible={visible}
            revealFrom="right"
            revealDelay="0.58s"
          >
            <TapeStrip style={{ top: '-5px', left: '20px', transform: 'rotate(-1.8deg)' }} />
            <TapeStrip style={{ bottom: '-5px', right: '20px', transform: 'rotate(2.0deg)' }} />
          </ScrapbookPhoto>
        </div>
      </div>

      {/* Page index "04" — bottom LEFT */}
      <p
        style={{
          position: 'absolute',
          bottom: '1.8rem',
          left: '2.4rem',
          fontFamily: "var(--font-cormorant), 'Garamond', 'Georgia', serif",
          fontStyle: 'italic',
          fontSize: '0.52rem',
          letterSpacing: '0.42em',
          color: 'rgba(78, 52, 16, 0.18)',
          userSelect: 'none',
          zIndex: 10,
          opacity: visible ? 1 : 0,
          transition: 'opacity 1.5s ease 1.1s',
        }}
      >
        04
      </p>
    </section>
  );
}
