import { useEffect, useState } from 'react';
import './Navigation.scss';

const NAV_LINKS = [
  { label: 'Story', href: '#story' },
  { label: 'Menu', href: '#collection' },
  { label: 'Dome', href: '#dome' },
  { label: 'Origins', href: '#origins' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Reserve', href: '#reservation' },
];

function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMenuOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
      <div className="nav__inner">
        <a href="#" className="nav__logo">
          <span className="nav__logo-icon">✦</span>
          <span className="nav__logo-text">THE OBSERVATORY</span>
        </a>

        <div className={`nav__links ${menuOpen ? 'nav__links--open' : ''}`}>
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="nav__link"
              onClick={(e) => handleClick(e, link.href)}
            >
              <span className="nav__link-text">{link.label}</span>
            </a>
          ))}
        </div>

        <a href="#reservation" className="nav__cta" onClick={(e) => handleClick(e, '#reservation')}>
          <span>Reserve a Table</span>
          <span className="nav__cta-star">✦</span>
        </a>

        <button
          className={`nav__burger ${menuOpen ? 'nav__burger--open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </div>
    </nav>
  );
}

export default Navigation;
