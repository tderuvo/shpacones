'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { FilmGrain } from './FilmGrain';

export function Hero({ onEnterArchive }: { onEnterArchive?: () => void }) {
  const [archiveVisible, setArchiveVisible] = useState(false);
  const [audioStarted, setAudioStarted] = useState(false);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setArchiveVisible(true), 2800);
    return () => clearTimeout(t);
  }, []);

  function toggleAudio() {
    const a = audioRef.current;
    if (!a) return;
    if (!audioStarted) {
      a.volume = 0.18;
      a.play().catch(() => {});
      setAudioStarted(true);
      setAudioPlaying(true);
    } else if (audioPlaying) {
      a.pause();
      setAudioPlaying(false);
    } else {
      a.play().catch(() => {});
      setAudioPlaying(true);
    }
  }

  return (
    <section
      onClick={toggleAudio}
      style={{
        position: 'relative',
        width: '100vw',
        height: '100dvh',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'default',
      }}
    >
      {/* Album cover — Ken Burns */}
      <div
        style={{
          position: 'absolute',
          inset: '-6%',
          zIndex: 0,
          animation: 'kenBurns 32s ease-in-out infinite alternate',
        }}
      >
        <Image
          src="/album-cover.png"
          alt=""
          fill
          priority
          quality={95}
          style={{
            objectFit: 'cover',
            objectPosition: 'center 30%',
            filter: 'sepia(18%) saturate(78%) brightness(0.87) contrast(1.04)',
          }}
        />
      </div>

      {/* Dark base overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          background: 'rgba(8, 5, 3, 0.38)',
        }}
      />

      {/* Radial vignette — dark edges */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 2,
          background: 'radial-gradient(ellipse at center, transparent 38%, rgba(4, 3, 2, 0.72) 100%)',
        }}
      />

      {/* Bottom gradient for "Enter the Archive" legibility */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 3,
          background: 'linear-gradient(to bottom, transparent 50%, rgba(6, 4, 2, 0.68) 100%)',
        }}
      />

      {/* Warm amber bloom — top left, mimics lens flare / sun wash */}
      <div
        style={{
          position: 'absolute',
          top: '-10%',
          left: '-5%',
          width: '55%',
          height: '55%',
          zIndex: 4,
          background: 'radial-gradient(ellipse at top left, rgba(210, 155, 60, 0.07) 0%, transparent 65%)',
          pointerEvents: 'none',
        }}
      />

      {/* Film grain */}
      <FilmGrain />

      {/* Text — centered composition */}
      <div
        style={{
          position: 'relative',
          zIndex: 30,
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 0,
            marginTop: '-6vh',
          animation: 'fadeIn 2.2s ease forwards, subtleFlicker 12s 3s ease-in-out infinite',
        }}
      >
        {/* Small top label */}
        <p
          style={{
            fontFamily: "var(--font-cormorant), 'Garamond', 'Georgia', serif",
            fontStyle: 'italic',
            fontSize: 'clamp(0.65rem, 1.2vw, 0.82rem)',
            letterSpacing: '0.38em',
            color: 'rgba(220, 208, 185, 0.62)',
            textTransform: 'uppercase',
            marginBottom: '1.4rem',
          }}
        >
          A Recording Recovered
        </p>

        {/* Main title */}
        <h1
          style={{
            fontFamily: "var(--font-playfair), 'Georgia', serif",
            fontStyle: 'italic',
            fontWeight: 700,
            fontSize: 'clamp(2.6rem, 7.5vw, 6.2rem)',
            lineHeight: 1.08,
            letterSpacing: '-0.01em',
            color: '#f0ebe0',
            textShadow: '0 2px 40px rgba(0,0,0,0.55), 0 0 80px rgba(180,140,60,0.08)',
            marginBottom: '1.1rem',
          }}
        >
          Echoes From The Past
        </h1>

        {/* Band name */}
        <p
          style={{
            fontFamily: "var(--font-cormorant), 'Garamond', 'Georgia', serif",
            fontWeight: 300,
            fontSize: 'clamp(1rem, 2.4vw, 1.55rem)',
            letterSpacing: '0.28em',
            color: 'rgba(220, 208, 185, 0.72)',
            textTransform: 'uppercase',
          }}
        >
          The Shpacones
        </p>
      </div>

      {/* Enter the Archive */}
      <div
        style={{
          position: 'absolute',
          bottom: '9vh',
          left: 0,
          right: 0,
          zIndex: 30,
          textAlign: 'center',
          opacity: archiveVisible ? 1 : 0,
          transform: archiveVisible ? 'translateY(0)' : 'translateY(8px)',
          transition: 'opacity 1.8s ease, transform 1.8s ease',
        }}
      >
        <a
          href="#archive"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onEnterArchive?.();
          }}
          style={{
            fontFamily: "var(--font-cormorant), 'Garamond', 'Georgia', serif",
            fontStyle: 'italic',
            fontSize: 'clamp(0.8rem, 1.4vw, 1rem)',
            letterSpacing: '0.32em',
            color: 'rgba(215, 200, 170, 0.58)',
            textDecoration: 'none',
            display: 'inline-block',
            padding: '0.6rem 1.2rem',
            borderBottom: '1px solid transparent',
            transition: 'color 0.5s ease, border-color 0.5s ease, filter 0.5s ease',
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget;
            el.style.color = 'rgba(230, 215, 185, 0.88)';
            el.style.borderBottomColor = 'rgba(200, 180, 130, 0.35)';
            el.style.filter = 'brightness(1.15)';
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget;
            el.style.color = 'rgba(215, 200, 170, 0.58)';
            el.style.borderBottomColor = 'transparent';
            el.style.filter = 'brightness(1)';
          }}
        >
          Enter the Archive &nbsp;→
        </a>
      </div>

      {/* Tape hiss toggle — bottom right */}
      {audioStarted && (
        <button
          onClick={(e) => { e.stopPropagation(); toggleAudio(); }}
          style={{
            position: 'absolute',
            bottom: '2.2rem',
            right: '2.2rem',
            zIndex: 40,
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '0.25rem 0',
            fontFamily: "var(--font-cormorant), 'Garamond', 'Georgia', serif",
            fontStyle: 'italic',
            fontSize: '0.72rem',
            letterSpacing: '0.28em',
            color: audioPlaying ? 'rgba(210, 195, 160, 0.45)' : 'rgba(210, 195, 160, 0.25)',
            borderBottom: '1px solid transparent',
            transition: 'color 0.4s ease, border-color 0.4s ease',
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget;
            el.style.color = 'rgba(225, 210, 175, 0.75)';
            el.style.borderBottomColor = 'rgba(200, 180, 130, 0.3)';
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget;
            el.style.color = audioPlaying ? 'rgba(210, 195, 160, 0.45)' : 'rgba(210, 195, 160, 0.25)';
            el.style.borderBottomColor = 'transparent';
          }}
        >
          {audioPlaying ? '∿ silence' : '∿ hiss'}
        </button>
      )}

      {/* Tape hiss — plays on first interaction, drop tape-hiss.mp3 into /public */}
      {/* To disable: remove the <audio> element below */}
      <audio ref={audioRef} src="/tape-hiss.mp3" loop preload="auto" />
    </section>
  );
}
