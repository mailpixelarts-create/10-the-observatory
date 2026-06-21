import gsap from 'gsap';

export function animateHeroEntrance() {
  const tl = gsap.timeline({ delay: 0.2 });

  tl.from('.hero__badge', {
    opacity: 0,
    y: 20,
    duration: 0.8,
    ease: 'power3.out',
  })
  .from('.hero__title-line--1', {
    opacity: 0,
    y: 60,
    duration: 1,
    ease: 'power3.out',
  }, '-=0.4')
  .from('.hero__title-line--2', {
    opacity: 0,
    y: 60,
    duration: 1,
    ease: 'power3.out',
  }, '-=0.6')
  .from('.hero__subtitle', {
    opacity: 0,
    y: 30,
    duration: 0.8,
    ease: 'power3.out',
  }, '-=0.5')
  .from('.hero__actions > *', {
    opacity: 0,
    y: 20,
    stagger: 0.15,
    duration: 0.6,
    ease: 'power3.out',
  }, '-=0.4')
  .from('.hero__scroll-hint', {
    opacity: 0,
    duration: 0.8,
    ease: 'power2.out',
  }, '-=0.2')
  .from('.hero__floating-star', {
    opacity: 0,
    scale: 0,
    stagger: { each: 0.1, from: 'random' },
    duration: 0.5,
    ease: 'back.out(2)',
  }, '-=0.6');

  return tl;
}

export function animateHeroParallax() {
  gsap.to('.hero__moon', {
    y: -100,
    ease: 'none',
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: 1,
    },
  });

  gsap.to('.hero__content', {
    y: -60,
    opacity: 0,
    ease: 'none',
    scrollTrigger: {
      trigger: '.hero',
      start: '30% top',
      end: 'bottom top',
      scrub: 1,
    },
  });

  gsap.to('.hero__nebula--left', {
    x: -50,
    y: -30,
    ease: 'none',
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: 1,
    },
  });

  gsap.to('.hero__nebula--right', {
    x: 50,
    y: 30,
    ease: 'none',
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: 1,
    },
  });
}
