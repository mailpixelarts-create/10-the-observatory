import { useRef } from 'react';
import './CoffeeCollection.scss';

const COFFEES = [
  {
    name: 'Mercury Espresso',
    planet: 'Mercury',
    description: 'Bold, intense, closest to the sun. Double-shot pulled at extreme pressure with a smoky crema.',
    notes: 'Dark Chocolate, Charred Walnut',
    price: '$5.50',
    color: '#8B8B8B',
    size: 60,
  },
  {
    name: 'Lunar Latte',
    planet: 'Moon',
    description: 'Silky smooth with a luminous white foam art of the crescent moon. Oat milk infused with vanilla bean.',
    notes: 'Vanilla, Honey, Steamed Oat',
    price: '$6.50',
    color: '#DDE4EE',
    size: 80,
  },
  {
    name: 'Nebula Mocha',
    planet: 'Nebula',
    description: 'A swirling galaxy of dark chocolate and espresso, topped with edible glitter and violet cream.',
    notes: 'Cacao, Lavender, Star Anise',
    price: '$7.50',
    color: '#6A4FFF',
    size: 100,
  },
  {
    name: 'Solar Flare',
    planet: 'Sun',
    description: 'Bright, citrus-forward cold brew with turmeric golden foam and a spark of black pepper.',
    notes: 'Citrus, Turmeric, Ginger',
    price: '$6.00',
    color: '#F6D37A',
    size: 90,
  },
  {
    name: 'Orion Pour-Over',
    planet: 'Orion',
    description: 'Single-origin Ethiopian Yirgacheffe, hand-poured through a ceramic dripper shaped like the constellation.',
    notes: 'Blueberry, Jasmine, Bergamot',
    price: '$8.00',
    color: '#4B6FFF',
    size: 70,
  },
  {
    name: 'Dark Matter',
    planet: 'Void',
    description: 'Activated charcoal cold brew with coconut milk and a pitch-black sweetness that defies comprehension.',
    notes: 'Charcoal, Coconut, Vanilla',
    price: '$7.00',
    color: '#1a1a2e',
    size: 85,
  },
];

function CoffeeCollection() {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <section className="collection section-padding" id="collection">
      <div className="container">
        <div className="collection__header" data-reveal>
          <span className="collection__label">The Menu</span>
          <h2 className="collection__title">
            Celestial<br />
            <em>Collection</em>
          </h2>
          <p className="collection__subtitle">
            Each drink is named after a celestial body, crafted to evoke the wonder
            of the cosmos in every sip.
          </p>
        </div>
      </div>

      <div className="collection__scroll-wrapper" ref={scrollRef}>
        <div className="collection__grid">
          {COFFEES.map((coffee, i) => (
            <article
              key={coffee.name}
              className="collection__card glass-panel"
              data-reveal
              style={{ '--planet-color': coffee.color, '--card-delay': `${i * 0.1}s` } as React.CSSProperties}
            >
              <div className="collection__card-planet">
                <div
                  className="collection__card-sphere"
                  style={{
                    background: `radial-gradient(circle at 35% 35%, ${coffee.color}dd, ${coffee.color}44)`,
                    width: coffee.size,
                    height: coffee.size,
                  }}
                />
                <div className="collection__card-ring" />
                <div className="collection__card-orbit">
                  {[...Array(3)].map((_, j) => (
                    <div
                      key={j}
                      className="collection__card-orbit-dot"
                      style={{ animationDelay: `${j * 1.5}s`, '--orbit-radius': `${coffee.size / 2 + 20}px` } as React.CSSProperties}
                    />
                  ))}
                </div>
              </div>

              <div className="collection__card-content">
                <span className="collection__card-planet-name">{coffee.planet}</span>
                <h3 className="collection__card-name">{coffee.name}</h3>
                <p className="collection__card-desc">{coffee.description}</p>

                <div className="collection__card-meta">
                  <span className="collection__card-notes">{coffee.notes}</span>
                  <span className="collection__card-price">{coffee.price}</span>
                </div>

                <button className="collection__card-btn">
                  <span>Order</span>
                  <span className="collection__card-btn-icon">✦</span>
                </button>
              </div>

              <div className="collection__card-glow" />
            </article>
          ))}
        </div>
      </div>

      <div className="container">
        <div className="collection__cta" data-reveal>
          <p className="collection__cta-text">
            Seasonal specials orbit our menu monthly. Ask your barista about today's celestial feature.
          </p>
        </div>
      </div>
    </section>
  );
}

export default CoffeeCollection;
