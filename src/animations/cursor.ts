import gsap from 'gsap';

export function initCursorAnimations() {
  const interactiveElements = document.querySelectorAll<HTMLElement>(
    'a, button, .collection__card, .gallery__item, .origins__card, .lab__instrument'
  );

  interactiveElements.forEach((el) => {
    el.addEventListener('mouseenter', () => {
      gsap.to('.cursor--outer', {
        width: 60,
        height: 60,
        borderColor: 'rgba(117, 217, 255, 0.5)',
        duration: 0.3,
        ease: 'power2.out',
      });

      gsap.to('.cursor--inner', {
        width: 4,
        height: 4,
        background: '#75D9FF',
        duration: 0.2,
      });
    });

    el.addEventListener('mouseleave', () => {
      gsap.to('.cursor--outer', {
        width: 40,
        height: 40,
        borderColor: 'rgba(246, 211, 122, 0.4)',
        duration: 0.3,
        ease: 'power2.out',
      });

      gsap.to('.cursor--inner', {
        width: 6,
        height: 6,
        background: '#F6D37A',
        duration: 0.2,
      });
    });
  });
}

export function initCursorMagnetic() {
  document.querySelectorAll<HTMLElement>('.hero__btn, .nav__cta, .reservation__submit').forEach((el) => {
    el.addEventListener('mousemove', (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      gsap.to(el, {
        x: x * 0.2,
        y: y * 0.2,
        duration: 0.3,
        ease: 'power2.out',
      });
    });

    el.addEventListener('mouseleave', () => {
      gsap.to(el, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: 'elastic.out(1, 0.3)',
      });
    });
  });
}
