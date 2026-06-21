import './Laboratory.scss';

const INSTRUMENTS = [
  {
    name: 'The Astrolabe',
    type: 'Pour-Over Station',
    description: 'A precision pour-over system calibrated to deliver water at exactly 93°C — the optimal extraction temperature for celestial clarity.',
    specs: ['Temperature: 93°C ± 0.5', 'Flow Rate: 4ml/s', 'Draw Time: 3:30'],
    icon: '⟐',
  },
  {
    name: 'The Sextant',
    type: 'Espresso Machine',
    description: 'Our custom-built La Marzocco, re-engineered with titanium group heads and astronomical pressure profiling.',
    specs: ['Pressure: 9.2 bar', 'Extraction: 28-32s', 'Temperature: 92.5°C'],
    icon: '◎',
  },
  {
    name: 'The Orrery',
    type: 'Cold Brew Tower',
    description: 'A three-tier drip tower where water orbits through glass chambers over 18 hours, producing a brew as smooth as moonlight.',
    specs: ['Drip Rate: 1 drop/3s', 'Time: 18 hours', 'Volume: 2L per cycle'],
    icon: '◌',
  },
  {
    name: 'The Chronometer',
    type: 'Siphon Brewer',
    description: 'Vacuum-sealed brewing that moves coffee through chambers with the precision of a celestial clock.',
    specs: ['Vacuum: -0.8 atm', 'Brew Time: 90s', 'Heat: Halogen'],
    icon: '⊙',
  },
];

function Laboratory() {
  return (
    <section className="lab section-padding" id="laboratory">
      <div className="container">
        <div className="lab__header" data-reveal>
          <span className="lab__label">The Laboratory</span>
          <h2 className="lab__title">
            Brewing<br />
            <em>Instrumentation</em>
          </h2>
          <p className="lab__subtitle">
            Our equipment is not just machinery — it is scientific apparatus,
            calibrated with the precision of astronomical instruments.
          </p>
        </div>

        <div className="lab__grid">
          {INSTRUMENTS.map((inst, i) => (
            <article
              key={inst.name}
              className="lab__instrument glass-panel"
              data-reveal
              style={{ '--inst-delay': `${i * 0.12}s` } as React.CSSProperties}
            >
              <div className="lab__instrument-icon-wrap">
                <span className="lab__instrument-icon">{inst.icon}</span>
                <div className="lab__instrument-glow" />
              </div>

              <span className="lab__instrument-type">{inst.type}</span>
              <h3 className="lab__instrument-name">{inst.name}</h3>
              <p className="lab__instrument-desc">{inst.description}</p>

              <ul className="lab__instrument-specs">
                {inst.specs.map((spec) => (
                  <li key={spec} className="lab__instrument-spec">
                    <span className="lab__instrument-spec-dot">·</span>
                    {spec}
                  </li>
                ))}
              </ul>

              <div className="lab__instrument-glass-anim">
                {[...Array(4)].map((_, j) => (
                  <div key={j} className="lab__instrument-bubble" style={{ animationDelay: `${j * 0.8}s` }} />
                ))}
              </div>
            </article>
          ))}
        </div>

        <div className="lab__process" data-reveal>
          <h3 className="lab__process-title">The Extraction Process</h3>
          <div className="lab__process-steps">
            {['Select Origin', 'Calibrate', 'Extract', 'Observe', 'Serve'].map((step, i) => (
              <div key={step} className="lab__process-step">
                <span className="lab__process-num">{String(i + 1).padStart(2, '0')}</span>
                <span className="lab__process-name">{step}</span>
                {i < 4 && <span className="lab__process-line">—</span>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Laboratory;
