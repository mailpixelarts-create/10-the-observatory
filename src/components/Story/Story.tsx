import './Story.scss';

const TIMELINE = [
  {
    year: '3000 BCE',
    title: 'Stellar Origins',
    description: 'Ancient Ethiopian nomads observed coffee growing beneath canopies of starlit skies, believing the beans held celestial energy.',
    icon: '🌑',
  },
  {
    year: '1400 CE',
    title: 'Sufi Star-Gazers',
    description: 'Yemeni monks brewed coffee to fuel late-night astronomical observations, mapping constellations while sipping dark roasts.',
    icon: '☕',
  },
  {
    year: '1609',
    title: 'Galileo\'s Cup',
    description: 'When Galileo first turned his telescope skyward, he held a cup of coffee — the drink that kept his mind sharp through the night.',
    icon: '🔭',
  },
  {
    year: '1969',
    title: 'One Giant Sip',
    description: 'Coffee traveled to space aboard Apollo 11. Astronauts drank the first espresso in lunar orbit, 240,000 miles from the nearest café.',
    icon: '🚀',
  },
  {
    year: '2026',
    title: 'THE OBSERVATORY',
    description: 'We open our glass dome above the clouds, where every cup is an invitation to look up and wonder.',
    icon: '✦',
  },
];

function Story() {
  return (
    <section className="story section-padding" id="story">
      <div className="container">
        <div className="story__header" data-reveal>
          <span className="story__label">Our Story</span>
          <h2 className="story__title">
            Where Coffee<br />
            <em>Meets the Cosmos</em>
          </h2>
          <p className="story__intro">
            For millennia, coffee and astronomy have been inseparable companions —
            the fuel of late-night observations, the warmth beneath cold desert skies.
            THE OBSERVATORY continues this ancient tradition.
          </p>
        </div>

        <div className="story__timeline">
          <div className="story__timeline-line" />

          {TIMELINE.map((item, i) => (
            <div
              key={item.year}
              className={`story__event ${i % 2 === 0 ? 'story__event--left' : 'story__event--right'}`}
              data-reveal
            >
              <div className="story__event-dot">
                <span>{item.icon}</span>
              </div>
              <div className="story__event-content">
                <span className="story__event-year">{item.year}</span>
                <h3 className="story__event-title">{item.title}</h3>
                <p className="story__event-desc">{item.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="story__constellation" data-reveal>
          <svg viewBox="0 0 400 200" className="story__constellation-svg">
            <line x1="50" y1="100" x2="120" y2="40" stroke="rgba(246,211,122,0.4)" strokeWidth="1" strokeDasharray="4 4" />
            <line x1="120" y1="40" x2="200" y2="80" stroke="rgba(246,211,122,0.4)" strokeWidth="1" strokeDasharray="4 4" />
            <line x1="200" y1="80" x2="280" y2="30" stroke="rgba(246,211,122,0.4)" strokeWidth="1" strokeDasharray="4 4" />
            <line x1="280" y1="30" x2="350" y2="100" stroke="rgba(246,211,122,0.4)" strokeWidth="1" strokeDasharray="4 4" />
            <circle cx="50" cy="100" r="3" fill="#F6D37A" />
            <circle cx="120" cy="40" r="3" fill="#F6D37A" />
            <circle cx="200" cy="80" r="3" fill="#F6D37A" />
            <circle cx="280" cy="30" r="3" fill="#F6D37A" />
            <circle cx="350" cy="100" r="3" fill="#F6D37A" />
          </svg>
          <p className="story__constellation-text">
            "Every great discovery begins with looking up."
          </p>
        </div>
      </div>
    </section>
  );
}

export default Story;
