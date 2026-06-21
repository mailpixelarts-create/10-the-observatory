import { useEffect, useRef } from 'react';
import './Footer.scss';

function Footer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth * 2;
      canvas.height = canvas.offsetHeight * 2;
      ctx.scale(2, 2);
    };
    resize();

    interface Star {
      x: number;
      y: number;
      size: number;
      opacity: number;
      twinkle: number;
    }

    const stars: Star[] = Array.from({ length: 50 }, () => ({
      x: Math.random() * canvas.offsetWidth,
      y: Math.random() * canvas.offsetHeight,
      size: Math.random() * 1.5 + 0.3,
      opacity: Math.random() * 0.6 + 0.2,
      twinkle: Math.random() * 0.01 + 0.003,
    }));

    const connections: [number, number][] = [];
    for (let i = 0; i < stars.length; i++) {
      for (let j = i + 1; j < stars.length; j++) {
        const dx = stars[i].x - stars[j].x;
        const dy = stars[i].y - stars[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 100) connections.push([i, j]);
      }
    }

    let time = 0;
    let frame: number;

    const animate = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);
      time += 0.01;

      connections.forEach(([a, b]) => {
        const sa = stars[a];
        const sb = stars[b];
        const alpha = 0.08 * Math.min(sa.opacity, sb.opacity);
        ctx.beginPath();
        ctx.moveTo(sa.x, sa.y);
        ctx.lineTo(sb.x, sb.y);
        ctx.strokeStyle = `rgba(246, 211, 122, ${alpha})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      });

      stars.forEach((s) => {
        s.opacity = 0.2 + (Math.sin(time * s.twinkle * 100) + 1) * 0.3;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(248, 249, 251, ${s.opacity})`;
        ctx.fill();
      });

      frame = requestAnimationFrame(animate);
    };
    animate();

    return () => cancelAnimationFrame(frame);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <canvas ref={canvasRef} className="footer__constellation-canvas" />

      <div className="footer__glow" />

      <div className="container footer__inner">
        <div className="footer__top" data-reveal>
          <div className="footer__brand">
            <span className="footer__brand-star">✦</span>
            <h3 className="footer__brand-name">THE OBSERVATORY</h3>
            <p className="footer__brand-tagline">Coffee Beneath the Stars</p>
          </div>

          <div className="footer__links">
            <div className="footer__col">
              <h4 className="footer__col-title">Visit</h4>
              <p className="footer__col-text">Cloud Level, Sky Tower</p>
              <p className="footer__col-text">1200m Above Sea Level</p>
              <p className="footer__col-text">Open nightly from 5PM</p>
            </div>
            <div className="footer__col">
              <h4 className="footer__col-title">Connect</h4>
              <a href="#" className="footer__col-link">Instagram</a>
              <a href="#" className="footer__col-link">Twitter / X</a>
              <a href="#" className="footer__col-link">Newsletter</a>
            </div>
            <div className="footer__col">
              <h4 className="footer__col-title">Experience</h4>
              <a href="#collection" className="footer__col-link">Menu</a>
              <a href="#dome" className="footer__col-link">Dome</a>
              <a href="#gallery" className="footer__col-link">Gallery</a>
            </div>
          </div>
        </div>

        <div className="footer__divider" />

        <div className="footer__bottom">
          <p className="footer__credit">
            A <span className="footer__highlight">LOOKBOOK Studio</span> Experience
          </p>
          <p className="footer__credit">
            © Norman James, made with love ❤️ by <span className="footer__highlight">Empathy Studio</span>
          </p>
          <button className="footer__back-top" onClick={scrollToTop} aria-label="Back to top">
            <span className="footer__back-top-arrow">↑</span>
            <span className="footer__back-top-text">Back to Stars</span>
          </button>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
