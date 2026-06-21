import gsap from 'gsap';

export function initSectionAnimations() {
  gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) => {
    gsap.from(el, {
      opacity: 0,
      y: 50,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        end: 'top 50%',
        toggleActions: 'play none none none',
      },
    });
  });

  gsap.utils.toArray<HTMLElement>('.reveal-stagger').forEach((el) => {
    const children = el.children;
    gsap.from(children, {
      opacity: 0,
      y: 30,
      stagger: 0.1,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    });
  });
}

export function animateTimeline() {
  gsap.utils.toArray<HTMLElement>('.story__event').forEach((el, i) => {
    gsap.from(el, {
      opacity: 0,
      x: i % 2 === 0 ? -50 : 50,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    });
  });
}

export function animateTimelineLine() {
  gsap.from('.story__timeline-line', {
    scaleY: 0,
    transformOrigin: 'top center',
    duration: 2,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '.story__timeline',
      start: 'top 80%',
      end: 'bottom 60%',
      scrub: 1,
    },
  });
}

export function animateCollectionCards() {
  gsap.utils.toArray<HTMLElement>('.collection__card').forEach((card, i) => {
    gsap.from(card, {
      opacity: 0,
      y: 60,
      scale: 0.95,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: card,
        start: 'top 90%',
        toggleActions: 'play none none none',
      },
      delay: i * 0.1,
    });
  });
}

export function animateProcessSteps() {
  gsap.utils.toArray<HTMLElement>('.lab__process-step').forEach((step, i) => {
    gsap.from(step, {
      opacity: 0,
      y: 20,
      duration: 0.6,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.lab__process',
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
      delay: i * 0.15,
    });
  });
}
