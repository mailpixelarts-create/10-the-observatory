import { useEffect, useRef } from 'react';
import './Cursor.scss';

function Cursor() {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const outer = outerRef.current;
    const inner = innerRef.current;
    const particles = particlesRef.current;
    if (!outer || !inner || !particles) return;

    let mouseX = 0;
    let mouseY = 0;
    let outerX = 0;
    let outerY = 0;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      inner.style.left = `${mouseX}px`;
      inner.style.top = `${mouseY}px`;

      if (Math.random() > 0.85) {
        createParticle(mouseX, mouseY);
      }
    };

    const onEnter = () => {
      outer.classList.add('cursor--visible');
      inner.classList.add('cursor--visible');
    };

    const onLeave = () => {
      outer.classList.remove('cursor--visible');
      inner.classList.remove('cursor--visible');
    };

    const onDown = () => {
      outer.classList.add('cursor--pressed');
      inner.classList.add('cursor--pressed');
    };

    const onUp = () => {
      outer.classList.remove('cursor--pressed');
      inner.classList.remove('cursor--pressed');
    };

    const createParticle = (x: number, y: number) => {
      const dot = document.createElement('div');
      dot.className = 'cursor-particle';
      dot.style.left = `${x}px`;
      dot.style.top = `${y}px`;
      dot.style.setProperty('--dx', `${(Math.random() - 0.5) * 40}px`);
      dot.style.setProperty('--dy', `${(Math.random() - 0.5) * 40}px`);
      particles.appendChild(dot);
      setTimeout(() => dot.remove(), 600);
    };

    let frame: number;
    const animate = () => {
      outerX += (mouseX - outerX) * 0.08;
      outerY += (mouseY - outerY) * 0.08;
      outer.style.left = `${outerX}px`;
      outer.style.top = `${outerY}px`;
      frame = requestAnimationFrame(animate);
    };
    animate();

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseenter', onEnter);
    window.addEventListener('mouseleave', onLeave);
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);

    const isTouchDevice = 'ontouchstart' in window;
    if (isTouchDevice) {
      outer.style.display = 'none';
      inner.style.display = 'none';
    }

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseenter', onEnter);
      window.removeEventListener('mouseleave', onLeave);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
    };
  }, []);

  return (
    <>
      <div ref={outerRef} className="cursor cursor--outer" />
      <div ref={innerRef} className="cursor cursor--inner" />
      <div ref={particlesRef} className="cursor-particles" />
    </>
  );
}

export default Cursor;
