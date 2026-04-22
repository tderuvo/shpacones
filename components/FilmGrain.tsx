'use client';

import { useEffect, useRef } from 'react';

export function FilmGrain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let raf: number;
    let frame = 0;

    function draw() {
      frame++;
      // Only redraw grain every 2 frames — subtle flicker, less CPU
      if (frame % 2 === 0) {
        canvas!.width = window.innerWidth;
        canvas!.height = window.innerHeight;

        const imageData = ctx!.createImageData(canvas!.width, canvas!.height);
        const data = imageData.data;

        for (let i = 0; i < data.length; i += 4) {
          const v = Math.random() * 255;
          data[i]     = v;
          data[i + 1] = v * 0.92; // slight warm tint
          data[i + 2] = v * 0.80;
          data[i + 3] = Math.random() * 14; // very low alpha
        }

        ctx!.putImageData(imageData, 0, 0);
      }

      raf = requestAnimationFrame(draw);
    }

    draw();
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 20,
        mixBlendMode: 'overlay',
      }}
    />
  );
}
