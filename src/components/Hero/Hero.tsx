import { useEffect, useRef } from 'react';
import './Hero.scss';

function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const starsRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = starsRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    interface Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      twinkle: number;
    }

    const particles: Particle[] = Array.from({ length: 150 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 2.5 + 0.3,
      speedX: (Math.random() - 0.5) * 0.15,
      speedY: (Math.random() - 0.5) * 0.1,
      opacity: Math.random() * 0.8 + 0.2,
      twinkle: Math.random() * 0.02 + 0.005,
    }));

    let frame: number;
    let time = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.01;

      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.opacity += Math.sin(time * p.twinkle * 100) * 0.005;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        const alpha = Math.max(0.05, Math.min(1, p.opacity));

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(248, 249, 251, ${alpha})`;
        ctx.fill();

        if (p.size > 1.5) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 4, 0, Math.PI * 2);
          const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 4);
          gradient.addColorStop(0, `rgba(117, 217, 255, ${alpha * 0.2})`);
          gradient.addColorStop(1, 'rgba(117, 217, 255, 0)');
          ctx.fillStyle = gradient;
          ctx.fill();
        }
      });

      frame = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <section className="hero" ref={heroRef}>
      <canvas ref={starsRef} className="hero__stars" />

      <div className="hero__nebula hero__nebula--left" />
      <div className="hero__nebula hero__nebula--right" />

      <div className="hero__dome">
        <div className="hero__dome-glass" />
        <div className="hero__dome-frame" />
        <div className="hero__dome-reflection" />
      </div>

      <div className="hero__moon">
        <div className="hero__moon-surface" />
        <div className="hero__moon-glow" />
      </div>

      <div className="hero__clouds">
        <div className="hero__cloud hero__cloud--1" />
        <div className="hero__cloud hero__cloud--2" />
        <div className="hero__cloud hero__cloud--3" />
      </div>

      <div className="hero__content">
        <div className="hero__badge">
          <span className="hero__badge-star">✦</span>
          <span className="hero__badge-text">Above the Clouds</span>
          <span className="hero__badge-star">✦</span>
        </div>

        <h1 className="hero__title">
          <span className="hero__title-line hero__title-line--1">Coffee</span>
          <span className="hero__title-line hero__title-line--2">
            <em>Beneath</em> the Stars
          </span>
        </h1>

        <p className="hero__subtitle">
          A panoramic observatory where celestial wonder meets artisan craft.
          Every cup is a journey through the cosmos.
        </p>

        <div className="hero__actions">
          <a href="#collection" className="hero__btn hero__btn--primary">
            <span>Explore the Menu</span>
            <span className="hero__btn-arrow">→</span>
          </a>
          <a href="#story" className="hero__btn hero__btn--ghost">
            <span>Our Story</span>
          </a>
        </div>

        <div className="hero__scroll-hint">
          <div className="hero__scroll-line" />
          <span className="hero__scroll-text">Scroll to Explore</span>
        </div>
      </div>

      <div className="hero__floating-star hero__floating-star--1">✦</div>
      <div className="hero__floating-star hero__floating-star--2">✧</div>
      <div className="hero__floating-star hero__floating-star--3">✦</div>
      <div className="hero__floating-star hero__floating-star--4">✧</div>
      <div className="hero__floating-star hero__floating-star--5">✦</div>
    </section>
  );
}

export default Hero;
