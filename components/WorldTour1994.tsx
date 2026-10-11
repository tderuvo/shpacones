'use client';

import { useState, useEffect, useRef } from 'react';
import { ScrapbookPhoto } from './ScrapbookPhoto';

// ── Photo corner mount ─────────────────────────────────────────────────────────
// Old-album paper corners instead of tape — this print was kept properly.

type Corner = 'tl' | 'tr' | 'bl' | 'br';

const CORNER_CLIP: Record<Corner, string> = {
  tl: 'polygon(0 0, 100% 0, 0 100%)',
  tr: 'polygon(0 0, 100% 0, 100% 100%)',
  bl: 'polygon(0 0, 0 100%, 100% 100%)',
  br: 'polygon(100% 0, 100% 100%, 0 100%)',
};

function PhotoCorner({ corner }: { corner: Corner }) {
  const top    = corner[0] === 't';
  const left   = corner[1] === 'l';
  return (
    <div
      style={{
        position: 'absolute',
        [top ? 'top' : 'bottom']: '-4px',
        [left ? 'left' : 'right']: '-4px',
        width: 'clamp(22px, 3.2vw, 34px)',
        height: 'clamp(22px, 3.2vw, 34px)',
        background: 'rgba(52, 36, 14, 0.82)',
        clipPath: CORNER_CLIP[corner],
        pointerEvents: 'none',
        zIndex: 3,
      }}
    />
  );
}

// ── Quote lines ────────────────────────────────────────────────────────────────

const QUOTE_LINES: { text: string; rotate: string; indent: string }[] = [
  { text: '"We didn’t come to make history.', rotate: '-0.25deg', indent: '0' },
  { text: 'We came to make noise.',               rotate:  '0.20deg', indent: '0' },
  { text: 'Turns out, we did both."',             rotate: '-0.15deg', indent: '0' },
];

// ── Component ──────────────────────────────────────────────────────────────────

export function WorldTour1994() {
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
      id="world-tour-1994"
      style={{
        position: 'relative',
        width: '100%',
        // Bottom of the shoebox — the most aged page in the archive
        backgroundColor: '#c2b47c',
        backgroundImage: [
          'radial-gradient(ellipse at 50% 30%, rgba(196, 170, 98, 0.24) 0%, transparent 58%)',
          'radial-gradient(ellipse at 12% 88%, rgba(150, 122, 60, 0.18) 0%, transparent 42%)',
          'radial-gradient(ellipse at 90% 12%, rgba(150, 122, 60, 0.12) 0%, transparent 38%)',
          'linear-gradient(to bottom, rgba(36, 22, 5, 0.11) 0%, transparent 10%, transparent 90%, rgba(36, 22, 5, 0.13) 100%)',
          'linear-gradient(to right, rgba(36, 22, 5, 0.06) 0%, transparent 6%, transparent 94%, rgba(36, 22, 5, 0.05) 100%)',
        ].join(', '),
        overflow: 'hidden',
      }}
    >
      {/* Horizontal fold mark — the page was folded to fit the box */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: '58%',
          height: '1px',
          background:
            'linear-gradient(to right, transparent 4%, rgba(100, 76, 30, 0.06) 22%, rgba(100, 76, 30, 0.06) 78%, transparent 96%)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      {/* Coffee ring — upper-left */}
      <div
        style={{
          position: 'absolute',
          top: '9%',
          left: '5%',
          width: '70px',
          height: '70px',
          borderRadius: '50%',
          border: '1px solid rgba(110, 84, 34, 0.08)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      {/* Margin note */}
      <p
        style={{
          position: 'absolute',
          top: '7%',
          right: '3rem',
          fontFamily: "var(--font-cormorant), 'Garamond', 'Georgia', serif",
          fontStyle: 'italic',
          fontWeight: 300,
          fontSize: '0.52rem',
          letterSpacing: '0.12em',
          color: 'rgba(62, 42, 10, 0.20)',
          transform: 'rotate(1.4deg)',
          pointerEvents: 'none',
          userSelect: 'none',
          zIndex: 1,
          opacity: visible ? 1 : 0,
          transition: 'opacity 1.8s ease 1.5s',
        }}
      >
        roll 12, frame 31
      </p>

      {/* Page-to-page shadow — paper edge */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '6px',
          background: 'linear-gradient(to bottom, rgba(36, 22, 5, 0.12), transparent)',
          pointerEvents: 'none',
          zIndex: 2,
        }}
      />

      {/* ── Main content — single centred column, photo is the centrepiece ── */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          maxWidth: '1080px',
          margin: '0 auto',
          padding:
            'clamp(5rem, 11vh, 7.5rem) clamp(1.25rem, 7vw, 5rem) clamp(5rem, 10vh, 7rem)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        {/* Eyebrow */}
        <p
          style={{
            fontFamily: "var(--font-cormorant), 'Garamond', 'Georgia', serif",
            fontSize: '0.6rem',
            letterSpacing: '0.52em',
            textTransform: 'uppercase',
            color: 'rgba(76, 50, 14, 0.42)',
            marginBottom: '1.2rem',
            paddingLeft: '0.52em', // balance trailing letter-spacing
            opacity: visible ? 1 : 0,
            transition: 'opacity 1.2s ease 0.1s',
            userSelect: 'none',
          }}
        >
          From the Archives
        </p>

        {/* Heading */}
        <h2
          style={{
            fontFamily: "var(--font-cormorant), 'Garamond', 'Georgia', serif",
            fontWeight: 500,
            fontSize: 'clamp(1.25rem, 3.4vw, 2.3rem)',
            lineHeight: 1.25,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: 'rgba(52, 32, 6, 0.72)',
            marginBottom: 'clamp(2.6rem, 6vh, 4rem)',
            transform: 'rotate(-0.4deg)',
            maxWidth: '22em',
            opacity: visible ? 1 : 0,
            transition: 'opacity 1.2s ease 0.28s',
          }}
        >
          The Shpacones World Tour — 1994
        </h2>

        {/* ── Photograph — unfiltered, original aspect ratio ── */}
        <ScrapbookPhoto
          src="/images/archive/shpacones-world-tour-1994.png"
          alt="The Shpacones performing on stage under coloured spotlights at their 1994 World Tour, with a packed crowd raising their hands in the foreground."
          rotation={-0.8}
          floatAnimation="none"
          imgFilter="none"
          imgWidth="min(calc(100vw - 2 * clamp(1.25rem, 7vw, 5rem) - 18px), 880px)"
          visible={visible}
          revealFrom="left"
          revealDelay="0.4s"
        >
          <PhotoCorner corner="tl" />
          <PhotoCorner corner="tr" />
          <PhotoCorner corner="bl" />
          <PhotoCorner corner="br" />
        </ScrapbookPhoto>

        {/* ── Quote — immediately beneath the print ── */}
        <blockquote
          style={{
            margin: 'clamp(2.4rem, 5.5vh, 3.6rem) 0 0',
            opacity: visible ? 1 : 0,
            transition: 'opacity 1.6s ease 0.9s',
          }}
        >
          <div style={{ marginBottom: '1.3rem' }}>
            {QUOTE_LINES.map(({ text, rotate, indent }) => (
              <span
                key={text}
                style={{
                  display: 'block',
                  fontFamily: "var(--font-cormorant), 'Garamond', 'Georgia', serif",
                  fontStyle: 'italic',
                  fontWeight: 300,
                  fontSize: 'clamp(1.38rem, 2.9vw, 2.1rem)',
                  lineHeight: 1.55,
                  letterSpacing: '0.01em',
                  color: 'rgba(44, 28, 6, 0.74)',
                  transform: `rotate(${rotate})`,
                  marginLeft: indent,
                }}
              >
                {text}
              </span>
            ))}
          </div>

          {/* Attribution */}
          <footer
            style={{
              fontFamily: "var(--font-cormorant), 'Garamond', 'Georgia', serif",
              fontStyle: 'italic',
              fontWeight: 300,
              fontSize: 'clamp(0.74rem, 1.2vw, 0.92rem)',
              letterSpacing: '0.2em',
              color: 'rgba(62, 42, 10, 0.50)',
              transform: 'rotate(0.25deg)',
              userSelect: 'none',
            }}
          >
            — The Shpacones, 1994
          </footer>
        </blockquote>

        {/* Caption — like pencil on the back of the print */}
        <p
          style={{
            marginTop: 'clamp(2rem, 4.5vh, 3rem)',
            maxWidth: '30em',
            fontFamily: "var(--font-cormorant), 'Garamond', 'Georgia', serif",
            fontStyle: 'italic',
            fontWeight: 400,
            fontSize: 'clamp(0.88rem, 1.4vw, 1.02rem)',
            lineHeight: 1.7,
            letterSpacing: '0.03em',
            color: 'rgba(58, 38, 8, 0.56)',
            opacity: visible ? 1 : 0,
            transition: 'opacity 1.6s ease 1.2s',
          }}
        >
          A moment frozen in time. Five musicians, one stage,
          and a whole lot of rock &rsquo;n&rsquo; roll.
        </p>
      </div>

      {/* Page index "05" — bottom-right */}
      <p
        style={{
          position: 'absolute',
          bottom: '1.8rem',
          right: '2.4rem',
          fontFamily: "var(--font-cormorant), 'Garamond', 'Georgia', serif",
          fontStyle: 'italic',
          fontSize: '0.52rem',
          letterSpacing: '0.42em',
          color: 'rgba(76, 50, 14, 0.18)',
          userSelect: 'none',
          zIndex: 10,
          opacity: visible ? 1 : 0,
          transition: 'opacity 1.5s ease 1.1s',
        }}
      >
        05
      </p>
    </section>
  );
}
