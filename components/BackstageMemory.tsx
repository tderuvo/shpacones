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
  { text: '"Rosie Red always danced',    rotate:  '0.30deg',  indent: '0' },
  { text: 'like the room was about',     rotate: '-0.28deg',  indent: '0.16em' },
  { text: 'to disappear."',              rotate:  '0.20deg',  indent: '0.05em' },
];

// ── Component ──────────────────────────────────────────────────────────────────

export function BackstageMemory() {
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
      id="backstage-memory"
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '90dvh',
        // Slightly more tobacco/worn than entry 01 — deeper into the scrapbook
        backgroundColor: '#ddd2a4',
        backgroundImage: [
          // Bloom from upper-right — mirrored from entry 01
          'radial-gradient(ellipse at 80% 24%, rgba(192, 165, 95, 0.22) 0%, transparent 50%)',
          // Amber shadow lower-left — mirrored from entry 01
          'radial-gradient(ellipse at 18% 76%, rgba(168, 140, 74, 0.16) 0%, transparent 44%)',
          'linear-gradient(to bottom, rgba(36, 22, 5, 0.09) 0%, transparent 10%, transparent 90%, rgba(36, 22, 5, 0.11) 100%)',
          'linear-gradient(to right, rgba(36, 22, 5, 0.05) 0%, transparent 6%, transparent 94%, rgba(36, 22, 5, 0.03) 100%)',
        ].join(', '),
        overflow: 'hidden',
      }}
    >
      {/* Vertical fold mark — different orientation from entry 01's horizontal */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: '62%',
          width: '1px',
          background:
            'linear-gradient(to bottom, transparent 5%, rgba(118, 92, 42, 0.05) 25%, rgba(118, 92, 42, 0.05) 75%, transparent 95%)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      {/* Coffee ring — lower-left corner this time */}
      <div
        style={{
          position: 'absolute',
          bottom: '14%',
          left: '6%',
          width: '62px',
          height: '62px',
          borderRadius: '50%',
          border: '1px solid rgba(125, 96, 42, 0.07)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />
      {/* Second faint ring slightly offset — double-cup impression */}
      <div
        style={{
          position: 'absolute',
          bottom: '13%',
          left: '7.5%',
          width: '58px',
          height: '58px',
          borderRadius: '50%',
          border: '1px solid rgba(125, 96, 42, 0.04)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      {/* Tiny handwritten margin note */}
      <p
        style={{
          position: 'absolute',
          top: '8%',
          left: '2.8rem',
          fontFamily: "var(--font-cormorant), 'Garamond', 'Georgia', serif",
          fontStyle: 'italic',
          fontWeight: 300,
          fontSize: '0.52rem',
          letterSpacing: '0.12em',
          color: 'rgba(72, 50, 14, 0.18)',
          transform: 'rotate(-1.2deg)',
          pointerEvents: 'none',
          userSelect: 'none',
          zIndex: 1,
          opacity: visible ? 1 : 0,
          transition: 'opacity 1.8s ease 1.4s',
        }}
      >
        summer &apos;87
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
            color: 'rgba(85, 55, 18, 0.28)',
            marginBottom: '1.5rem',
            opacity: visible ? 1 : 0,
            transition: 'opacity 1.2s ease 0.1s',
            userSelect: 'none',
          }}
        >
          Memory Archive — Entry 02
        </p>

        {/* Scrapbook heading — tilted the other direction from entry 01 */}
        <h2
          style={{
            fontFamily: "var(--font-cormorant), 'Garamond', 'Georgia', serif",
            fontStyle: 'italic',
            fontWeight: 300,
            fontSize: 'clamp(1.1rem, 2.3vw, 1.58rem)',
            letterSpacing: '0.045em',
            color: 'rgba(62, 40, 10, 0.48)',
            marginBottom: 'clamp(2.8rem, 5.5vh, 4.2rem)',
            transform: 'rotate(0.5deg)',
            display: 'inline-block',
            opacity: visible ? 1 : 0,
            transition: 'opacity 1.2s ease 0.28s',
            userSelect: 'none',
          }}
        >
          Backstage Somewhere
        </h2>

        {/* ── Scrapbook spread: quote LEFT, photo RIGHT ── */}
        <div
          style={{
            display: 'flex',
            gap: 'clamp(2.8rem, 6.5vw, 6rem)',
            alignItems: 'flex-start',
            flexWrap: 'wrap',
          }}
        >
          {/* ── Quote — first in DOM, appears left on desktop ── */}
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
                    fontSize: 'clamp(1.38rem, 2.75vw, 1.98rem)',
                    lineHeight: 1.62,
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

            {/* Attribution */}
            <p
              style={{
                fontFamily:
                  "var(--font-cormorant), 'Garamond', 'Georgia', serif",
                fontStyle: 'italic',
                fontWeight: 300,
                fontSize: 'clamp(0.7rem, 1.15vw, 0.88rem)',
                letterSpacing: '0.2em',
                color: 'rgba(65, 44, 10, 0.38)',
                transform: 'rotate(-0.3deg)',
                display: 'inline-block',
                paddingLeft: '0.4em',
                userSelect: 'none',
              }}
            >
              — Tony
            </p>
          </div>

          {/* ── Photo — second in DOM, appears right on desktop ── */}
          <ScrapbookPhoto
            src="/images/archive/rosie-red-backstage.png"
            rotation={1.4}
            floatAnimation="memoryFloatB 11s ease-in-out 1.4s infinite"
            imgFilter="sepia(20%) saturate(75%) brightness(0.91) contrast(1.05)"
            imgWidth="clamp(240px, 36vw, 450px)"
            visible={visible}
            revealFrom="right"
            revealDelay="0.62s"
          >
            <TapeStrip style={{ top: '-5px', left: '22px', transform: 'rotate(-2deg)' }} />
            <TapeStrip style={{ bottom: '-5px', right: '22px', transform: 'rotate(-1.8deg)' }} />
          </ScrapbookPhoto>
        </div>
      </div>

      {/* Page index "02" — bottom LEFT, mirrored from entry 01's bottom-right */}
      <p
        style={{
          position: 'absolute',
          bottom: '1.8rem',
          left: '2.4rem',
          fontFamily: "var(--font-cormorant), 'Garamond', 'Georgia', serif",
          fontStyle: 'italic',
          fontSize: '0.52rem',
          letterSpacing: '0.42em',
          color: 'rgba(85, 55, 18, 0.18)',
          userSelect: 'none',
          zIndex: 10,
          opacity: visible ? 1 : 0,
          transition: 'opacity 1.5s ease 1.1s',
        }}
      >
        02
      </p>
    </section>
  );
}
