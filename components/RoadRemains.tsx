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

// ── Quote lines ────────────────────────────────────────────────────────────────

const QUOTE_LINES: { text: string; rotate: string; indent: string }[] = [
  { text: '"Seems that',               rotate: '-0.30deg', indent: '0' },
  { text: 'the wrath of the gods',     rotate:  '0.22deg', indent: '0.12em' },
  { text: 'got a punch on the nose…"', rotate: '-0.18deg', indent: '0.06em' },
];

// ── Component ──────────────────────────────────────────────────────────────────

export function RoadRemains() {
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
      id="road-remains"
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '90dvh',
        // Most worn page yet — deepest into the scrapbook
        backgroundColor: '#d4c89a',
        backgroundImage: [
          'radial-gradient(ellipse at 24% 35%, rgba(188, 160, 88, 0.22) 0%, transparent 52%)',
          'radial-gradient(ellipse at 75% 65%, rgba(165, 138, 72, 0.15) 0%, transparent 44%)',
          'linear-gradient(to bottom, rgba(36, 22, 5, 0.10) 0%, transparent 10%, transparent 90%, rgba(36, 22, 5, 0.12) 100%)',
          'linear-gradient(to right, rgba(36, 22, 5, 0.05) 0%, transparent 6%, transparent 94%, rgba(36, 22, 5, 0.04) 100%)',
        ].join(', '),
        overflow: 'hidden',
      }}
    >
      {/* Diagonal fold mark — third orientation in the series */}
      <div
        style={{
          position: 'absolute',
          top: '-8%',
          left: '28%',
          width: '1px',
          height: '115%',
          background:
            'linear-gradient(to bottom, transparent 5%, rgba(108, 82, 32, 0.052) 28%, rgba(108, 82, 32, 0.052) 72%, transparent 95%)',
          transform: 'rotate(4deg)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      {/* Coffee ring — lower-right, new position for each page */}
      <div
        style={{
          position: 'absolute',
          bottom: '18%',
          right: '8%',
          width: '74px',
          height: '74px',
          borderRadius: '50%',
          border: '1px solid rgba(118, 90, 38, 0.07)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />
      {/* Inner ring — slightly offset, older stain impression */}
      <div
        style={{
          position: 'absolute',
          bottom: '17%',
          right: '9.2%',
          width: '55px',
          height: '55px',
          borderRadius: '50%',
          border: '1px solid rgba(118, 90, 38, 0.04)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      {/* Margin note 1 — "hot lights. cold beer. loud hearts." */}
      <p
        style={{
          position: 'absolute',
          bottom: '24%',
          left: '2.8rem',
          fontFamily: "var(--font-cormorant), 'Garamond', 'Georgia', serif",
          fontStyle: 'italic',
          fontWeight: 300,
          fontSize: '0.5rem',
          lineHeight: 1.9,
          letterSpacing: '0.08em',
          color: 'rgba(65, 44, 10, 0.17)',
          transform: 'rotate(-0.8deg)',
          pointerEvents: 'none',
          userSelect: 'none',
          zIndex: 1,
          whiteSpace: 'pre-line',
          opacity: visible ? 1 : 0,
          transition: 'opacity 1.8s ease 1.5s',
        }}
      >
        {`hot lights.\ncold beer.\nloud hearts.`}
      </p>

      {/* Margin note 2 — "sunset strip, '87?" */}
      <p
        style={{
          position: 'absolute',
          top: '11%',
          right: '3.2rem',
          fontFamily: "var(--font-cormorant), 'Garamond', 'Georgia', serif",
          fontStyle: 'italic',
          fontWeight: 300,
          fontSize: '0.5rem',
          letterSpacing: '0.12em',
          color: 'rgba(65, 44, 10, 0.15)',
          transform: 'rotate(1.1deg)',
          pointerEvents: 'none',
          userSelect: 'none',
          zIndex: 1,
          opacity: visible ? 1 : 0,
          transition: 'opacity 1.8s ease 1.7s',
        }}
      >
        sunset strip, &apos;87?
      </p>

      {/* Page-to-page shadow — paper edge */}
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
            color: 'rgba(82, 54, 16, 0.28)',
            marginBottom: '1.5rem',
            opacity: visible ? 1 : 0,
            transition: 'opacity 1.2s ease 0.1s',
            userSelect: 'none',
          }}
        >
          Memory Archive — Entry 03
        </p>

        {/* Scrapbook heading */}
        <h2
          style={{
            fontFamily: "var(--font-cormorant), 'Garamond', 'Georgia', serif",
            fontStyle: 'italic',
            fontWeight: 300,
            fontSize: 'clamp(1.1rem, 2.3vw, 1.58rem)',
            letterSpacing: '0.045em',
            color: 'rgba(60, 38, 8, 0.48)',
            marginBottom: 'clamp(2.8rem, 5.5vh, 4.2rem)',
            transform: 'rotate(0.3deg)',
            display: 'inline-block',
            opacity: visible ? 1 : 0,
            transition: 'opacity 1.2s ease 0.28s',
            userSelect: 'none',
          }}
        >
          The Road Remains
        </h2>

        {/* ── Scrapbook spread: photo LEFT, quote RIGHT ── */}
        <div
          style={{
            display: 'flex',
            gap: 'clamp(2.8rem, 6.5vw, 6rem)',
            alignItems: 'flex-start',
            flexWrap: 'wrap',
          }}
        >
          {/* ── Photo — held at top only, bottom slightly free ── */}
          <ScrapbookPhoto
            src="/images/archive/the-road-remains.png"
            rotation={-2.2}
            floatAnimation="memoryFloatC 12s ease-in-out 1.0s infinite"
            imgFilter="sepia(18%) saturate(76%) brightness(0.92) contrast(1.04)"
            imgWidth="clamp(240px, 36vw, 450px)"
            visible={visible}
            revealFrom="left"
            revealDelay="0.35s"
          >
            {/* Two strips at the top only — bottom of photo floats free */}
            <TapeStrip style={{ top: '-5px', left: '18px', transform: 'rotate(-1.2deg)' }} />
            <TapeStrip style={{ top: '-5px', right: '18px', transform: 'rotate(2.0deg)' }} />
          </ScrapbookPhoto>

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
            {/* Quote lines */}
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
                    fontSize: 'clamp(1.42rem, 2.82vw, 2.05rem)',
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

            {/* Primary attribution */}
            <p
              style={{
                fontFamily:
                  "var(--font-cormorant), 'Garamond', 'Georgia', serif",
                fontStyle: 'italic',
                fontWeight: 300,
                fontSize: 'clamp(0.7rem, 1.15vw, 0.88rem)',
                letterSpacing: '0.2em',
                color: 'rgba(65, 44, 10, 0.40)',
                transform: 'rotate(0.28deg)',
                display: 'inline-block',
                paddingLeft: '0.4em',
                marginBottom: '0.3em',
                userSelect: 'none',
              }}
            >
              — Led Zeppelin
            </p>

            {/* Source attribution — secondary, smaller */}
            <p
              style={{
                fontFamily:
                  "var(--font-cormorant), 'Garamond', 'Georgia', serif",
                fontStyle: 'italic',
                fontWeight: 300,
                fontSize: 'clamp(0.58rem, 0.95vw, 0.72rem)',
                letterSpacing: '0.15em',
                color: 'rgba(65, 44, 10, 0.26)',
                transform: 'rotate(0.15deg)',
                display: 'block',
                paddingLeft: '0.9em',
                userSelect: 'none',
              }}
            >
              (Going to California)
            </p>
          </div>
        </div>
      </div>

      {/* Page index "03" — bottom-right, back to right side */}
      <p
        style={{
          position: 'absolute',
          bottom: '1.8rem',
          right: '2.4rem',
          fontFamily: "var(--font-cormorant), 'Garamond', 'Georgia', serif",
          fontStyle: 'italic',
          fontSize: '0.52rem',
          letterSpacing: '0.42em',
          color: 'rgba(82, 54, 16, 0.18)',
          userSelect: 'none',
          zIndex: 10,
          opacity: visible ? 1 : 0,
          transition: 'opacity 1.5s ease 1.1s',
        }}
      >
        03
      </p>
    </section>
  );
}
