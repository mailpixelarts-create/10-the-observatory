import { useState } from 'react';
import './CoffeeOrigins.scss';

const ORIGINS = [
  { name: 'Ethiopia', region: 'Yirgacheffe', coords: { x: 52, y: 48 }, notes: 'Blueberry, Jasmine', altitude: '1,800m', constellation: 'Orion' },
  { name: 'Colombia', region: 'Huila', coords: { x: 25, y: 52 }, notes: 'Caramel, Red Apple', altitude: '1,700m', constellation: 'Cygnus' },
  { name: 'Brazil', region: 'Cerrado', coords: { x: 32, y: 62 }, notes: 'Hazelnut, Chocolate', altitude: '1,100m', constellation: 'Scorpius' },
  { name: 'Guatemala', region: 'Antigua', coords: { x: 20, y: 48 }, notes: 'Spice, Dark Fruit', altitude: '1,500m', constellation: 'Ursa Major' },
  { name: 'Kenya', region: 'Nyeri', coords: { x: 55, y: 50 }, notes: 'Blackcurrant, Tomato', altitude: '1,700m', constellation: 'Leo' },
  { name: 'Indonesia', region: 'Sumatra', coords: { x: 70, y: 54 }, notes: 'Earthy, Cedar', altitude: '1,200m', constellation: 'Crux' },
];

function CoffeeOrigins() {
  const [activeOrigin, setActiveOrigin] = useState<typeof ORIGINS[0] | null>(null);

  return (
    <section className="origins section-padding" id="origins">
      <div className="container">
        <div className="origins__header" data-reveal>
          <span className="origins__label">World Map → Star Map</span>
          <h2 className="origins__title">
            Coffee<br />
            <em>Origins</em>
          </h2>
          <p className="origins__subtitle">
            Every origin on Earth is paired with a constellation above.
            Click a point to discover the connection.
          </p>
        </div>

        <div className="origins__map" data-reveal>
          <div className="origins__map-container">
            <svg viewBox="0 0 100 80" className="origins__map-svg">
              <defs>
                <radialGradient id="mapGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="rgba(75,111,255,0.1)" />
                  <stop offset="100%" stopColor="transparent" />
                </radialGradient>
              </defs>

              <rect width="100" height="80" fill="url(#mapGlow)" rx="1" />

              {[...Array(20)].map((_, i) => (
                <line
                  key={`h${i}`}
                  x1="0" y1={i * 4}
                  x2="100" y2={i * 4}
                  stroke="rgba(255,255,255,0.03)"
                  strokeWidth="0.1"
                />
              ))}
              {[...Array(25)].map((_, i) => (
                <line
                  key={`v${i}`}
                  x1={i * 4} y1="0"
                  x2={i * 4} y2="80"
                  stroke="rgba(255,255,255,0.03)"
                  strokeWidth="0.1"
                />
              ))}

              <path
                d="M15,35 Q20,30 25,35 Q30,40 35,38 Q40,35 45,32 Q50,30 55,28 Q60,32 65,30 Q70,28 75,32 L80,35 Q75,45 70,42 Q65,48 60,50 Q55,45 50,48 Q45,52 40,50 Q35,45 30,48 Q25,45 20,42 Z"
                fill="rgba(255,255,255,0.03)"
                stroke="rgba(255,255,255,0.08)"
                strokeWidth="0.2"
              />

              {ORIGINS.map((origin) => (
                <g
                  key={origin.name}
                  className={`origins__point ${activeOrigin?.name === origin.name ? 'origins__point--active' : ''}`}
                  onClick={() => setActiveOrigin(activeOrigin?.name === origin.name ? null : origin)}
                  style={{ cursor: 'pointer' }}
                >
                  <circle
                    cx={origin.coords.x}
                    cy={origin.coords.y}
                    r={activeOrigin?.name === origin.name ? 1.5 : 0.8}
                    fill={activeOrigin?.name === origin.name ? '#F6D37A' : '#75D9FF'}
                    className="origins__point-dot"
                  />
                  <circle
                    cx={origin.coords.x}
                    cy={origin.coords.y}
                    r="2"
                    fill="none"
                    stroke="rgba(246,211,122,0.3)"
                    strokeWidth="0.1"
                    className="origins__point-ring"
                  />
                  <text
                    x={origin.coords.x}
                    y={origin.coords.y - 3}
                    textAnchor="middle"
                    className="origins__point-label"
                    fontSize="1.5"
                    fill="rgba(248,249,251,0.5)"
                    fontFamily="'Space Mono', monospace"
                  >
                    {origin.name}
                  </text>
                </g>
              ))}
            </svg>

            {activeOrigin && (
              <div className="origins__detail glass-panel">
                <span className="origins__detail-region">{activeOrigin.region}</span>
                <h3 className="origins__detail-name">{activeOrigin.name}</h3>
                <div className="origins__detail-grid">
                  <div className="origins__detail-item">
                    <span className="origins__detail-key">Tasting Notes</span>
                    <span className="origins__detail-val">{activeOrigin.notes}</span>
                  </div>
                  <div className="origins__detail-item">
                    <span className="origins__detail-key">Altitude</span>
                    <span className="origins__detail-val">{activeOrigin.altitude}</span>
                  </div>
                  <div className="origins__detail-item">
                    <span className="origins__detail-key">Paired Constellation</span>
                    <span className="origins__detail-val">✦ {activeOrigin.constellation}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="origins__grid" data-reveal>
          {ORIGINS.map((origin) => (
            <div
              key={origin.name}
              className={`origins__card glass-panel ${activeOrigin?.name === origin.name ? 'origins__card--active' : ''}`}
              onClick={() => setActiveOrigin(activeOrigin?.name === origin.name ? null : origin)}
            >
              <span className="origins__card-constellation">✦ {origin.constellation}</span>
              <h4 className="origins__card-name">{origin.name}</h4>
              <span className="origins__card-region">{origin.region}</span>
              <span className="origins__card-notes">{origin.notes}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CoffeeOrigins;
