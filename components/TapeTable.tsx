'use client';

import { useState, useRef, useEffect } from 'react';

// ── Types ──────────────────────────────────────────────────────────────────────

type Track = {
  side: 'A' | 'B';
  num: string;
  title: string;
  src: string;
};

// ── Track manifest ─────────────────────────────────────────────────────────────
// Display order and titles preserved. src mapped by title to the converted MP3s.

const TRACKS: Track[] = [
  { side: 'A', num: '01', title: 'Roadside Reverie',                    src: '/audio/01-roadside-reverie.mp3' },
  { side: 'A', num: '02', title: 'Groovy Road',                         src: '/audio/02-groovy-road.mp3' },
  { side: 'A', num: '03', title: 'Circle of Friends',                   src: '/audio/03-circle-of-friends.mp3' },
  { side: 'A', num: '04', title: 'Endless Highway',                     src: '/audio/04-endless-highway.mp3' },
  { side: 'A', num: '05', title: 'Jack Daniels French Toast Interlude', src: '/audio/05-jack-daniels-french-toast-interlude.mp3' },
  { side: 'B', num: '06', title: 'Jamming Through The Years',           src: '/audio/06-jamming-through-the-years.mp3' },
  { side: 'B', num: '07', title: 'Some Kind of Woman',                  src: '/audio/07-some-kind-of-woman.mp3' },
  { side: 'B', num: '08', title: 'Stardust Heart',                      src: '/audio/08-stardust-heart.mp3' },
  { side: 'B', num: '09', title: 'A Tune A Twist And A Turn',           src: '/audio/09-a-tune-a-twist-and-a-turn.mp3' },
  { side: 'B', num: '10', title: 'Rock and Roll Eternity',              src: '/audio/10-rock-and-roll-eternity.mp3' },
];

const SIDE_A = TRACKS.filter(t => t.side === 'A');
const SIDE_B = TRACKS.filter(t => t.side === 'B');

// ── Utilities ──────────────────────────────────────────────────────────────────

function formatTime(sec: number): string {
  if (!isFinite(sec) || isNaN(sec) || sec < 0) return '--:--';
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

// ── Sub-components ─────────────────────────────────────────────────────────────

function SideLabel({ label }: { label: string }) {
  return (
    <p
      style={{
        fontFamily: "var(--font-cormorant), 'Garamond', serif",
        fontSize: '0.5rem',
        letterSpacing: '0.58em',
        textTransform: 'uppercase',
        color: 'rgba(178, 148, 82, 0.38)',
        marginBottom: '0.75rem',
        paddingLeft: '0.5em',
        userSelect: 'none',
      }}
    >
      {label}
    </p>
  );
}

function TrackItem({
  track,
  isSelected,
  onSelect,
}: {
  track: Track;
  isSelected: boolean;
  onSelect: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  const active = isSelected || hovered;

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onSelect}
      onKeyDown={e => e.key === 'Enter' && onSelect()}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex',
        alignItems: 'baseline',
        gap: '0.6em',
        padding: '0.28em 0.5em 0.28em 0.3em',
        borderRadius: '2px',
        cursor: 'pointer',
        transition: 'background 0.3s ease, box-shadow 0.3s ease',
        background: isSelected
          ? 'rgba(205, 160, 55, 0.1)'
          : hovered
          ? 'rgba(205, 160, 55, 0.055)'
          : 'transparent',
        boxShadow: isSelected
          ? 'inset 0 0 0 1px rgba(200, 160, 55, 0.12), 0 0 14px rgba(200, 155, 50, 0.12)'
          : 'none',
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-cormorant), 'Garamond', serif",
          fontSize: 'clamp(0.55rem, 0.85vw, 0.68rem)',
          letterSpacing: '0.06em',
          color: isSelected
            ? 'rgba(215, 175, 90, 0.72)'
            : 'rgba(145, 115, 62, 0.44)',
          flexShrink: 0,
          lineHeight: 1,
          transition: 'color 0.25s ease',
          userSelect: 'none',
        }}
      >
        {track.num}
      </span>

      <span
        style={{
          fontFamily: "var(--font-cormorant), 'Garamond', serif",
          fontStyle: 'italic',
          fontWeight: isSelected ? 600 : 400,
          fontSize: 'clamp(0.88rem, 1.4vw, 1.08rem)',
          lineHeight: 1.35,
          letterSpacing: '0.015em',
          color: isSelected
            ? 'rgba(225, 190, 108, 0.96)'
            : hovered
            ? 'rgba(210, 182, 128, 0.82)'
            : 'rgba(188, 162, 108, 0.62)',
          transition: 'color 0.25s ease, filter 0.25s ease',
          filter: isSelected
            ? 'drop-shadow(0 0 7px rgba(205, 158, 50, 0.42))'
            : active
            ? 'brightness(1.12)'
            : 'none',
          userSelect: 'none',
        }}
      >
        {track.title}
      </span>
    </div>
  );
}

function TapeButton({
  label,
  onClick,
  active = false,
  disabled = false,
}: {
  label: string;
  onClick: () => void;
  active?: boolean;
  disabled?: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <span
      role="button"
      tabIndex={disabled ? -1 : 0}
      onClick={disabled ? undefined : onClick}
      onKeyDown={e => !disabled && e.key === 'Enter' && onClick()}
      onMouseEnter={() => !disabled && setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        fontFamily: "var(--font-cormorant), 'Garamond', serif",
        fontSize: 'clamp(0.62rem, 1vw, 0.75rem)',
        letterSpacing: '0.12em',
        color: disabled
          ? 'rgba(125, 102, 55, 0.16)'
          : active
          ? 'rgba(222, 182, 85, 0.80)'
          : hovered
          ? 'rgba(202, 168, 82, 0.60)'
          : 'rgba(160, 133, 70, 0.36)',
        cursor: disabled ? 'default' : 'pointer',
        transition: 'color 0.2s ease',
        userSelect: 'none',
        padding: '0.1em 0.45em',
        display: 'inline-block',
      }}
    >
      {label}
    </span>
  );
}

// ── Main section ───────────────────────────────────────────────────────────────

export function TapeTable() {
  const [selectedTrack, setSelectedTrack] = useState<Track | null>(null);
  const [isPlaying,    setIsPlaying]    = useState(false);
  const [currentTime,  setCurrentTime]  = useState(0);
  const [duration,     setDuration]     = useState(0);

  const audioRef      = useRef<HTMLAudioElement>(null);
  const engageTimer   = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Bind audio element events once on mount
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTimeUpdate  = () => setCurrentTime(audio.currentTime);
    const onMeta        = () => setDuration(audio.duration);
    const onPlay        = () => setIsPlaying(true);
    const onPause       = () => setIsPlaying(false);
    const onEnded       = () => setIsPlaying(false);

    audio.addEventListener('timeupdate',     onTimeUpdate);
    audio.addEventListener('loadedmetadata', onMeta);
    audio.addEventListener('durationchange', onMeta);
    audio.addEventListener('play',           onPlay);
    audio.addEventListener('pause',          onPause);
    audio.addEventListener('ended',          onEnded);

    return () => {
      audio.removeEventListener('timeupdate',     onTimeUpdate);
      audio.removeEventListener('loadedmetadata', onMeta);
      audio.removeEventListener('durationchange', onMeta);
      audio.removeEventListener('play',           onPlay);
      audio.removeEventListener('pause',          onPause);
      audio.removeEventListener('ended',          onEnded);
    };
  }, []);

  // Stop audio and clear timers on unmount
  useEffect(() => {
    return () => {
      if (engageTimer.current) clearTimeout(engageTimer.current);
      audioRef.current?.pause();
    };
  }, []);

  // ── Transport handlers ───────────────────────────────────────────────────────

  function handleTrackSelect(track: Track) {
    const audio = audioRef.current;
    if (!audio) return;

    // Cancel any pending tape-engagement timer from a prior click
    if (engageTimer.current) clearTimeout(engageTimer.current);

    setSelectedTrack(track);
    setCurrentTime(0);
    setDuration(0);

    audio.pause();
    audio.src = track.src;
    audio.currentTime = 0;
    audio.load();

    // ~300 ms delay — mimics tape engagement before heads contact
    engageTimer.current = setTimeout(() => {
      audio.play().catch(() => {});
    }, 300);
  }

  function handlePlayPause() {
    const audio = audioRef.current;
    if (!audio || !selectedTrack) return;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch(() => {});
    }
  }

  function handleStop() {
    const audio = audioRef.current;
    if (!audio) return;
    audio.pause();
    audio.currentTime = 0;
    setCurrentTime(0);
  }

  function handleRew() {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = Math.max(0, audio.currentTime - 10);
  }

  function handleFwd() {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = Math.min(duration || 0, audio.currentTime + 10);
  }

  // ── Derived display values ───────────────────────────────────────────────────

  const hasTrack = selectedTrack !== null;
  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  const statusText = isPlaying
    ? `now playing — ${selectedTrack!.title}`
    : hasTrack
    ? `now cueing — ${selectedTrack!.title}`
    : 'select a track';

  // ── Render ───────────────────────────────────────────────────────────────────

  return (
    <section
      id="tape-table"
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '95dvh',
        overflow: 'hidden',
        backgroundColor: '#0e0b08',
      }}
    >
      {/* Hidden HTML5 audio — no browser controls */}
      <audio ref={audioRef} preload="none" style={{ display: 'none' }} />

      {/* Background image — ultra-slow push drift */}
      <div
        style={{
          position: 'absolute',
          inset: '-5%',
          zIndex: 0,
          animation: 'tableDrift 70s ease-in-out infinite alternate',
        }}
      >
        <img
          src="/images/archive/echoes-tape-table.png"
          alt="A cassette tape on a wooden table — recovered, 1987"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center center',
            filter: 'sepia(25%) saturate(68%) brightness(0.80) contrast(1.06)',
          }}
        />
      </div>

      {/* Base dark overlay */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 1, background: 'rgba(5, 3, 1, 0.40)' }} />

      {/* Radial vignette — dark heavy edges */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 2,
        background: 'radial-gradient(ellipse at 50% 45%, transparent 28%, rgba(3, 2, 1, 0.72) 100%)',
      }} />

      {/* Bottom reading zone */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 3,
        background: 'linear-gradient(to bottom, transparent 38%, rgba(6, 4, 2, 0.62) 72%, rgba(8, 5, 2, 0.80) 100%)',
      }} />

      {/* Top edge shadow */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 3,
        background: 'linear-gradient(to bottom, rgba(4, 3, 1, 0.48) 0%, transparent 18%)',
      }} />

      {/* Smoke wisps — near ashtray area */}
      <div style={{ position: 'absolute', bottom: '36%', left: '20%', zIndex: 4, pointerEvents: 'none' }}>
        <div style={{ width: '2px', height: '55px', background: 'linear-gradient(to top, rgba(195, 175, 135, 0.22), transparent)', borderRadius: '50%', animation: 'smokeRise 6s ease-in-out infinite', filter: 'blur(2.5px)' }} />
        <div style={{ marginTop: '-44px', marginLeft: '5px', width: '4px', height: '72px', background: 'linear-gradient(to top, rgba(195, 175, 135, 0.13), transparent)', borderRadius: '50%', animation: 'smokeRise 8.5s 2.2s ease-in-out infinite', filter: 'blur(4px)' }} />
        <div style={{ marginTop: '-62px', marginLeft: '-3px', width: '3px', height: '48px', background: 'linear-gradient(to top, rgba(195, 175, 135, 0.09), transparent)', borderRadius: '50%', animation: 'smokeRise 10s 4.5s ease-in-out infinite', filter: 'blur(3px)' }} />
      </div>

      {/* ── Track list + deck controls ── */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          minHeight: '95dvh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: 'max(9vh, 3.5rem) max(7vw, 2rem) max(5.5vh, 2.5rem) max(7vw, 2rem)',
        }}
      >
        {/* Archive label */}
        <p style={{
          fontFamily: "var(--font-cormorant), 'Garamond', serif",
          fontSize: '0.5rem',
          letterSpacing: '0.55em',
          textTransform: 'uppercase',
          color: 'rgba(175, 148, 88, 0.28)',
          marginBottom: '2rem',
          userSelect: 'none',
        }}>
          Archive — Cassette Reference
        </p>

        {/* Side A + B columns */}
        <div style={{
          display: 'flex',
          gap: 'clamp(1.8rem, 5vw, 4.5rem)',
          alignItems: 'flex-start',
          flexWrap: 'wrap',
        }}>
          <div style={{ minWidth: '10rem' }}>
            <SideLabel label="Side A" />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.06rem' }}>
              {SIDE_A.map(track => (
                <TrackItem
                  key={track.title}
                  track={track}
                  isSelected={selectedTrack?.title === track.title}
                  onSelect={() => handleTrackSelect(track)}
                />
              ))}
            </div>
          </div>

          <div style={{
            width: '1px',
            alignSelf: 'stretch',
            flexShrink: 0,
            background: 'linear-gradient(to bottom, transparent 0%, rgba(155, 128, 68, 0.16) 30%, rgba(155, 128, 68, 0.16) 70%, transparent 100%)',
          }} />

          <div style={{ minWidth: '10rem' }}>
            <SideLabel label="Side B" />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.06rem' }}>
              {SIDE_B.map(track => (
                <TrackItem
                  key={track.title}
                  track={track}
                  isSelected={selectedTrack?.title === track.title}
                  onSelect={() => handleTrackSelect(track)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* ── Tape deck footer ── */}

        {/* Progress bar — lives as the separator line itself */}
        <div style={{
          marginTop: '2.6rem',
          position: 'relative',
          height: '1px',
          background: 'rgba(140, 112, 55, 0.11)',
        }}>
          <div style={{
            position: 'absolute',
            left: 0, top: 0, height: '100%',
            width: `${progress}%`,
            background: 'rgba(195, 158, 68, 0.40)',
            transition: 'width 0.6s linear',
          }} />
        </div>

        {/* Status line + time counter */}
        <div style={{
          paddingTop: '1.1rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1em',
          minHeight: '2rem',
        }}>
          {/* Left: indicator dot + text */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85em', minWidth: 0 }}>
            <span
              style={{
                width: '5px',
                height: '5px',
                borderRadius: '50%',
                flexShrink: 0,
                display: 'inline-block',
                background: isPlaying
                  ? 'rgba(215, 172, 72, 0.90)'
                  : hasTrack
                  ? 'rgba(215, 172, 72, 0.28)'
                  : 'rgba(215, 172, 72, 0.10)',
                boxShadow: isPlaying
                  ? '0 0 7px rgba(215, 172, 72, 0.55), 0 0 2px rgba(215, 172, 72, 0.8)'
                  : 'none',
                animation: isPlaying ? 'indicatorPulse 2.4s ease-in-out infinite' : 'none',
                transition: 'background 0.4s ease, box-shadow 0.4s ease',
              }}
            />
            <p
              style={{
                fontFamily: "var(--font-cormorant), 'Garamond', serif",
                fontStyle: 'italic',
                fontSize: 'clamp(0.62rem, 1.05vw, 0.8rem)',
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                color: isPlaying
                  ? 'rgba(205, 170, 98, 0.65)'
                  : hasTrack
                  ? 'rgba(175, 148, 82, 0.42)'
                  : 'rgba(148, 122, 72, 0.26)',
                userSelect: 'none',
                transition: 'color 0.4s ease',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {statusText}
            </p>
          </div>

          {/* Right: elapsed / total */}
          {hasTrack && duration > 0 && (
            <span style={{
              fontFamily: "var(--font-cormorant), 'Garamond', serif",
              fontSize: 'clamp(0.52rem, 0.85vw, 0.65rem)',
              letterSpacing: '0.14em',
              color: 'rgba(155, 130, 70, 0.34)',
              flexShrink: 0,
              userSelect: 'none',
            }}>
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          )}
        </div>

        {/* Transport buttons: ◁◁  ▷/∥  ■  ▷▷ */}
        <div style={{
          marginTop: '0.6rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.15rem',
        }}>
          <TapeButton label="◁◁"                    onClick={handleRew}       disabled={!hasTrack} />
          <TapeButton label={isPlaying ? '∥' : '▷'} onClick={handlePlayPause} disabled={!hasTrack} active={isPlaying} />
          <TapeButton label="■"                      onClick={handleStop}      disabled={!hasTrack} />
          <TapeButton label="▷▷"                     onClick={handleFwd}       disabled={!hasTrack} />
        </div>

      </div>
    </section>
  );
}
