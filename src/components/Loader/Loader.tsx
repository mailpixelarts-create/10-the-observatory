import { useEffect, useRef } from 'react';
import './Loader.scss';

interface LoaderProps {
  onComplete: () => void;
  fading?: boolean;
}

const STAR_COUNT = 80;

function Loader({ onComplete, fading }: LoaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    interface Star {
      x: number;
      y: number;
      size: number;
      opacity: number;
      speed: number;
      twinklePhase: number;
    }

    const stars: Star[] = Array.from({ length: STAR_COUNT }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 2 + 0.5,
      opacity: Math.random(),
      speed: Math.random() * 0.005 + 0.002,
      twinklePhase: Math.random() * Math.PI * 2,
    }));

    const constellationStars = [
      { x: 0.3, y: 0.35 }, { x: 0.45, y: 0.25 }, { x: 0.55, y: 0.3 },
      { x: 0.65, y: 0.22 }, { x: 0.7, y: 0.4 }, { x: 0.5, y: 0.5 },
      { x: 0.35, y: 0.55 },
    ];

    const edges = [[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,0],[2,5]];

    let progress = 0;
    let phase: 'stars' | 'constellation' | 'title' | 'zoom' = 'stars';
    let frameId: number;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      stars.forEach((star) => {
        star.twinklePhase += star.speed * 2;
        const twinkle = (Math.sin(star.twinklePhase) + 1) / 2;
        const alpha = 0.2 + twinkle * 0.8 * star.opacity;

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(248, 249, 251, ${alpha})`;
        ctx.fill();

        if (star.size > 1.5) {
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.size * 3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(117, 217, 255, ${alpha * 0.15})`;
          ctx.fill();
        }
      });

      if (phase === 'constellation' || phase === 'title' || phase === 'zoom') {
        const constellationOpacity = phase === 'constellation'
          ? Math.min(progress * 2, 1)
          : 1;

        edges.forEach(([a, b]) => {
          const sa = constellationStars[a];
          const sb = constellationStars[b];
          const ax = sa.x * canvas.width;
          const ay = sa.y * canvas.height;
          const bx = sb.x * canvas.width;
          const by = sb.y * canvas.height;

          ctx.beginPath();
          ctx.moveTo(ax, ay);
          ctx.lineTo(bx, by);
          ctx.strokeStyle = `rgba(75, 111, 255, ${0.6 * constellationOpacity})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        });

        constellationStars.forEach((s) => {
          const cx = s.x * canvas.width;
          const cy = s.y * canvas.height;
          ctx.beginPath();
          ctx.arc(cx, cy, 3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(246, 211, 122, ${constellationOpacity})`;
          ctx.fill();

          ctx.beginPath();
          ctx.arc(cx, cy, 8, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(246, 211, 122, ${0.15 * constellationOpacity})`;
          ctx.fill();
        });
      }

      if (phase === 'zoom') {
        const galaxyRotation = progress * Math.PI * 2;
        const galaxyX = canvas.width / 2;
        const galaxyY = canvas.height / 2;
        const galaxySize = 120 * (1 - progress * 0.5);

        ctx.save();
        ctx.translate(galaxyX, galaxyY);
        ctx.rotate(galaxyRotation);

        for (let i = 0; i < 200; i++) {
          const angle = (i / 200) * Math.PI * 2;
          const radius = (i / 200) * galaxySize;
          const px = Math.cos(angle) * radius;
          const py = Math.sin(angle) * radius * 0.6;
          const dotSize = Math.random() * 1.5 + 0.3;
          const alpha = 1 - (i / 200);

          ctx.beginPath();
          ctx.arc(px, py, dotSize, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${i % 3 === 0 ? '75, 111, 255' : i % 3 === 1 ? '106, 79, 255' : '248, 249, 251'}, ${alpha * 0.8})`;
          ctx.fill();
        }

        ctx.restore();
      }

      frameId = requestAnimationFrame(draw);
    };

    draw();

    const timeline = [
      { time: 0, phase: 'stars' as const },
      { time: 1200, phase: 'constellation' as const },
      { time: 2800, phase: 'title' as const },
      { time: 4000, phase: 'zoom' as const },
      { time: 5200, phase: 'zoom' as const },
    ];

    const startTime = Date.now();

    const tick = () => {
      const elapsed = Date.now() - startTime;
      progress = Math.min(elapsed / 5200, 1);

      const current = [...timeline].reverse().find(t => elapsed >= t.time);
      if (current) phase = current.phase;

      if (elapsed >= 5200) {
        onComplete();
        return;
      }
      requestAnimationFrame(tick);
    };
    tick();

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', resize);
    };
  }, [onComplete]);

  return (
    <div className={`loader ${fading ? 'loader--fading' : ''}`} ref={containerRef}>
      <canvas ref={canvasRef} className="loader__canvas" />

      <div className="loader__title">
        <span className="loader__title-line loader__title-line--sub">— Est. 2026 —</span>
        <h1 className="loader__title-line loader__title-line--main">THE OBSERVATORY</h1>
        <span className="loader__title-line loader__title-line--tagline">Coffee Beneath the Stars</span>
      </div>

      <div className="loader__progress">
        <div className="loader__progress-bar" style={{ width: `${0}%` }} />
      </div>

      <div className="loader__corner loader__corner--tl" />
      <div className="loader__corner loader__corner--tr" />
      <div className="loader__corner loader__corner--bl" />
      <div className="loader__corner loader__corner--br" />
    </div>
  );
}

export default Loader;
