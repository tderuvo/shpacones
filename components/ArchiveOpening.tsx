'use client';

export function ArchiveOpening({ visible }: { visible: boolean }) {
  return (
    <section
      id="archive"
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '100dvh',
        backgroundColor: '#ede4cb',
        backgroundImage: [
          'radial-gradient(ellipse at 22% 28%, rgba(218, 196, 142, 0.30) 0%, transparent 52%)',
          'radial-gradient(ellipse at 76% 70%, rgba(192, 170, 115, 0.20) 0%, transparent 48%)',
          'linear-gradient(to bottom, rgba(55, 33, 8, 0.14) 0%, transparent 11%, transparent 89%, rgba(38, 22, 5, 0.09) 100%)',
        ].join(', '),
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Content block — editorial offset from left */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          marginLeft: 'max(8vw, 3rem)',
          marginRight: 'auto',
          maxWidth: '560px',
          padding: '12vh 2rem',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(10px)',
          transition: visible
            ? 'opacity 1.5s ease 0.5s, transform 1.5s ease 0.5s'
            : 'none',
        }}
      >
        {/* Archive label */}
        <p
          style={{
            fontFamily: "var(--font-cormorant), 'Garamond', 'Georgia', serif",
            fontSize: '0.6rem',
            letterSpacing: '0.46em',
            textTransform: 'uppercase',
            color: 'rgba(88, 58, 22, 0.36)',
            marginBottom: '2.8rem',
          }}
        >
          Archive Note 01
        </p>

        {/* Body copy */}
        <div
          style={{
            fontFamily: "var(--font-cormorant), 'Garamond', 'Georgia', serif",
            fontStyle: 'italic',
            fontWeight: 400,
            fontSize: 'clamp(1.42rem, 2.7vw, 2.05rem)',
            lineHeight: 1.82,
            color: '#342010',
            maxWidth: '520px',
          }}
        >
          <p style={{ marginBottom: '1.6em' }}>
            Summer, 1987.<br />
            Somewhere between Montreal and Los Angeles.
          </p>
          <p style={{ marginBottom: '1.6em' }}>
            They weren&apos;t trying to be famous.<br />
            They were trying to feel something real.
          </p>
          <p>This is what remains.</p>
        </div>

        {/* Scroll thread — thin vertical line fading down */}
        <div
          style={{
            marginTop: '4rem',
            marginLeft: '2px',
            width: '1px',
            height: '3rem',
            background:
              'linear-gradient(to bottom, rgba(80, 52, 20, 0.22), rgba(80, 52, 20, 0))',
          }}
        />
      </div>
    </section>
  );
}
