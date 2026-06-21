import { useRef, useState } from 'react';
import './Gallery.scss';

const GALLERY_ITEMS = [
  { id: 1, title: 'The Glass Dome at Dawn', category: 'Architecture', color: '#4B6FFF' },
  { id: 2, title: 'Nebula Pour', category: 'Cocktails', color: '#6A4FFF' },
  { id: 3, title: 'Stellar Latte Art', category: 'Craft', color: '#F6D37A' },
  { id: 4, title: 'Constellation Menu', category: 'Design', color: '#75D9FF' },
  { id: 5, title: 'Moonlight Roast', category: 'Coffee', color: '#DDE4EE' },
  { id: 6, title: 'The Telescope Bar', category: 'Interior', color: '#4B6FFF' },
  { id: 7, title: 'Dark Matter Cold Brew', category: 'Coffee', color: '#1a1a2e' },
  { id: 8, title: 'Galaxy Floor Mosaic', category: 'Architecture', color: '#6A4FFF' },
  { id: 9, title: 'Orion Espresso', category: 'Coffee', color: '#F6D37A' },
  { id: 10, title: 'Aurora Borealis Ceiling', category: 'Interior', color: '#75D9FF' },
  { id: 11, title: 'Solar Flare Glassware', category: 'Design', color: '#F6D37A' },
  { id: 12, title: 'The Void Chamber', category: 'Architecture', color: '#060914' },
  { id: 13, title: 'Lunar Surface Table', category: 'Interior', color: '#DDE4EE' },
  { id: 14, title: 'Meteor Shower Special', category: 'Cocktails', color: '#6A4FFF' },
  { id: 15, title: 'The Final Sip', category: 'Mood', color: '#4B6FFF' },
];

function Gallery() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedItem, setSelectedItem] = useState<typeof GALLERY_ITEMS[0] | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const categories = ['All', ...new Set(GALLERY_ITEMS.map((item) => item.category))];
  const filtered = activeFilter === 'All' ? GALLERY_ITEMS : GALLERY_ITEMS.filter((item) => item.category === activeFilter);

  return (
    <section className="gallery section-padding" id="gallery">
      <div className="container">
        <div className="gallery__header" data-reveal>
          <span className="gallery__label">Gallery</span>
          <h2 className="gallery__title">
            Visual<br />
            <em>Ephemera</em>
          </h2>
          <p className="gallery__subtitle">
            15 cinematic renders capturing the atmosphere of THE OBSERVATORY —
            each frame a portal into our celestial world.
          </p>
        </div>

        <div className="gallery__filters" data-reveal>
          {categories.map((cat) => (
            <button
              key={cat}
              className={`gallery__filter ${activeFilter === cat ? 'gallery__filter--active' : ''}`}
              onClick={() => setActiveFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="gallery__grid" ref={containerRef}>
          {filtered.map((item, i) => (
            <div
              key={item.id}
              className={`gallery__item gallery__item--${(i % 3) + 1}`}
              data-reveal
              style={{ '--item-color': item.color, '--item-delay': `${i * 0.05}s` } as React.CSSProperties}
              onClick={() => setSelectedItem(item)}
            >
              <div className="gallery__item-visual">
                <div
                  className="gallery__item-gradient"
                  style={{
                    background: `linear-gradient(135deg, ${item.color}33 0%, ${item.color}11 50%, transparent 100%)`,
                  }}
                />
                <div className="gallery__item-stars">
                  {[...Array(8)].map((_, j) => (
                    <div
                      key={j}
                      className="gallery__item-star"
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        animationDelay: `${Math.random() * 3}s`,
                        width: `${Math.random() * 3 + 1}px`,
                        height: `${Math.random() * 3 + 1}px`,
                      }}
                    />
                  ))}
                </div>
                <div className="gallery__item-shine" />
              </div>

              <div className="gallery__item-info">
                <span className="gallery__item-category">{item.category}</span>
                <h3 className="gallery__item-title">{item.title}</h3>
              </div>

              <span className="gallery__item-number">
                {String(item.id).padStart(2, '0')}
              </span>
            </div>
          ))}
        </div>
      </div>

      {selectedItem && (
        <div className="gallery__modal" onClick={() => setSelectedItem(null)}>
          <div className="gallery__modal-content glass-panel" onClick={(e) => e.stopPropagation()}>
            <button className="gallery__modal-close" onClick={() => setSelectedItem(null)}>✕</button>
            <div
              className="gallery__modal-visual"
              style={{
                background: `linear-gradient(135deg, ${selectedItem.color}44 0%, ${selectedItem.color}11 50%, transparent 100%)`,
              }}
            >
              <div className="gallery__modal-stars">
                {[...Array(20)].map((_, j) => (
                  <div
                    key={j}
                    className="gallery__item-star"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      animationDelay: `${Math.random() * 3}s`,
                      width: `${Math.random() * 3 + 1}px`,
                      height: `${Math.random() * 3 + 1}px`,
                    }}
                  />
                ))}
              </div>
            </div>
            <div className="gallery__modal-info">
              <span className="gallery__modal-category">{selectedItem.category}</span>
              <h3 className="gallery__modal-title">{selectedItem.title}</h3>
              <span className="gallery__modal-number">Render {String(selectedItem.id).padStart(2, '0')} of 15</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default Gallery;
