import gsap from 'gsap';

export function animateLoader(onComplete: () => void) {
  const tl = gsap.timeline({
    onComplete,
  });

  tl.to('.loader__progress-bar', {
    width: '100%',
    duration: 4.5,
    ease: 'power1.inOut',
  })
  .to('.loader__title', {
    opacity: 0,
    y: -30,
    duration: 0.6,
    ease: 'power2.in',
  }, '-=0.5')
  .to('.loader', {
    opacity: 0,
    duration: 0.8,
    ease: 'power2.inOut',
  }, '-=0.2')
  .set('.loader', { display: 'none' });

  return tl;
}

export function animateLoaderStars(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  interface Star {
    x: number;
    y: number;
    size: number;
    targetX: number;
    targetY: number;
    progress: number;
    speed: number;
  }

  const stars: Star[] = Array.from({ length: 80 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: Math.random() * 2 + 0.5,
    targetX: canvas.width * (0.3 + Math.random() * 0.4),
    targetY: canvas.height * (0.2 + Math.random() * 0.6),
    progress: 0,
    speed: Math.random() * 0.005 + 0.002,
  }));

  const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    stars.forEach((star) => {
      star.progress = Math.min(star.progress + star.speed, 1);
      const ease = 1 - Math.pow(1 - star.progress, 3);

      star.x += (star.targetX - star.x) * ease * 0.02;
      star.y += (star.targetY - star.y) * ease * 0.02;

      ctx.beginPath();
      ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(248, 249, 251, ${0.5 + star.progress * 0.5})`;
      ctx.fill();
    });

    requestAnimationFrame(animate);
  };

  animate();
}
