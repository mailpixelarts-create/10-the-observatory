import gsap from 'gsap';

export function animateGalleryGrid() {
  gsap.utils.toArray<HTMLElement>('.gallery__item').forEach((item, i) => {
    gsap.from(item, {
      opacity: 0,
      y: 40,
      scale: 0.97,
      duration: 0.7,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: item,
        start: 'top 90%',
        toggleActions: 'play none none none',
      },
      delay: (i % 3) * 0.1,
    });
  });
}

export function animateGalleryHover() {
  document.querySelectorAll<HTMLElement>('.gallery__item').forEach((item) => {
    item.addEventListener('mouseenter', () => {
      gsap.to(item, {
        scale: 1.02,
        duration: 0.4,
        ease: 'power2.out',
      });
    });

    item.addEventListener('mouseleave', () => {
      gsap.to(item, {
        scale: 1,
        duration: 0.4,
        ease: 'power2.out',
      });
    });
  });
}

export function animateGalleryModal(open: boolean) {
  if (open) {
    gsap.from('.gallery__modal-content', {
      scale: 0.9,
      opacity: 0,
      duration: 0.5,
      ease: 'power3.out',
    });
  }
}
