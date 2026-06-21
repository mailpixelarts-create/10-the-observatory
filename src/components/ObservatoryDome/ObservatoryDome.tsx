import { useEffect, useRef, useState } from 'react';
import './ObservatoryDome.scss';

const CONSTELLATIONS = [
  { name: 'Orion', stars: [[150,60],[160,100],[155,140],[170,180],[130,180],[120,140],[180,140]], lines: [[0,1],[1,2],[2,3],[2,4],[2,5],[2,6]] },
  { name: 'Ursa Major', stars: [[280,50],[320,40],[360,50],[350,90],[310,95],[270,80],[240,100]], lines: [[0,1],[1,2],[2,3],[3,4],[4,5],[5,6]] },
  { name: 'Cassiopeia', stars: [[450,70],[480,40],[510,65],[540,35],[570,60]], lines: [[0,1],[1,2],[2,3],[3,4]] },
  { name: 'Lyra', stars: [[650,80],[680,50],[710,80],[680,120],[660,100]], lines: [[0,1],[1,2],[2,3],[3,4],[4,0]] },
  { name: 'Scorpius', stars: [[820,100],[840,80],[860,100],[850,140],[830,170],[810,200],[800,180]], lines: [[0,1],[1,2],[2,3],[3,4],[4,5],[5,6]] },
];

function ObservatoryDome() {
  const domeRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [activeConstellation, setActiveConstellation] = useState<string | null>(null);
  const [telescopeAngle, setTelescopeAngle] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth * 2;
      canvas.height = canvas.offsetHeight * 2;
      ctx.scale(2, 2);
    };
    resize();

    let meteors: { x: number; y: number; speed: number; life: number; angle: number }[] = [];
    let time = 0;

    const drawMeteorShower = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);
      time += 0.01;

      if (Math.random() < 0.02 && meteors.length < 5) {
        meteors.push({
          x: Math.random() * w * 0.8 + w * 0.1,
          y: -10,
          speed: Math.random() * 4 + 2,
          life: 1,
          angle: Math.PI / 4 + (Math.random() - 0.5) * 0.3,
        });
      }

      meteors = meteors.filter((m) => m.life > 0);
      meteors.forEach((m) => {
        m.x += Math.cos(m.angle) * m.speed;
        m.y += Math.sin(m.angle) * m.speed;
        m.life -= 0.008;

        const tailLen = 40 * m.life;
        const gradient = ctx.createLinearGradient(
          m.x, m.y,
          m.x - Math.cos(m.angle) * tailLen,
          m.y - Math.sin(m.angle) * tailLen
        );
        gradient.addColorStop(0, `rgba(248, 249, 251, ${m.life})`);
        gradient.addColorStop(0.3, `rgba(117, 217, 255, ${m.life * 0.6})`);
        gradient.addColorStop(1, 'rgba(117, 217, 255, 0)');

        ctx.beginPath();
        ctx.moveTo(m.x, m.y);
        ctx.lineTo(
          m.x - Math.cos(m.angle) * tailLen,
          m.y - Math.sin(m.angle) * tailLen
        );
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      });

      requestAnimationFrame(drawMeteorShower);
    };

    const frame = requestAnimationFrame(drawMeteorShower);

    return () => cancelAnimationFrame(frame);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = domeRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTelescopeAngle({ x: x * 20, y: y * 20 });
  };

  return (
    <section className="dome section-padding" id="dome" ref={domeRef} onMouseMove={handleMouseMove}>
      <canvas ref={canvasRef} className="dome__meteor-canvas" />

      <div className="dome__sky">
        <div
          className="dome__sky-inner"
          style={{ transform: `translate(${telescopeAngle.x}px, ${telescopeAngle.y}px)` }}
        >
          {CONSTELLATIONS.map((c) => (
            <svg
              key={c.name}
              className={`dome__constellation ${activeConstellation === c.name ? 'dome__constellation--active' : ''}`}
              viewBox="0 0 800 250"
              onClick={() => setActiveConstellation(activeConstellation === c.name ? null : c.name)}
            >
              {c.lines.map(([a, b], i) => (
                <line
                  key={i}
                  x1={c.stars[a][0]}
                  y1={c.stars[a][1]}
                  x2={c.stars[b][0]}
                  y2={c.stars[b][1]}
                  className="dome__constellation-line"
                />
              ))}
              {c.stars.map(([x, y], i) => (
                <circle
                  key={i}
                  cx={x}
                  cy={y}
                  r={i === 0 ? 3.5 : 2.5}
                  className="dome__constellation-star"
                />
              ))}
              <text
                x={c.stars[0][0]}
                y={c.stars[0][1] - 15}
                className="dome__constellation-label"
                textAnchor="middle"
              >
                {c.name}
              </text>
            </svg>
          ))}
        </div>
      </div>

      <div className="dome__telescope">
        <div className="dome__telescope-body">
          <div className="dome__telescope-lens" />
          <div className="dome__telescope-barrel" />
          <div className="dome__telescope-base" />
        </div>
        <div className="dome__telescope-glow" />
      </div>

      <div className="container dome__content">
        <div className="dome__header" data-reveal>
          <span className="dome__label">The Observatory Dome</span>
          <h2 className="dome__title">
            360° of<br />
            <em>Infinite Sky</em>
          </h2>
          <p className="dome__subtitle">
            Our panoramic glass dome reveals the full celestial canvas. Click constellations
            to identify them. Move your cursor to shift the telescope view.
          </p>
        </div>

        <div className="dome__info glass-panel" data-reveal>
          <div className="dome__info-item">
            <span className="dome__info-number">12</span>
            <span className="dome__info-label">Visible Constellations</span>
          </div>
          <div className="dome__info-divider" />
          <div className="dome__info-item">
            <span className="dome__info-number">360°</span>
            <span className="dome__info-label">Panoramic View</span>
          </div>
          <div className="dome__info-divider" />
          <div className="dome__info-item">
            <span className="dome__info-number">∞</span>
            <span className="dome__info-label">Wonder</span>
          </div>
        </div>
      </div>

      {activeConstellation && (
        <div className="dome__tooltip glass-panel">
          <span className="dome__tooltip-name">{activeConstellation}</span>
        </div>
      )}
    </section>
  );
}

export default ObservatoryDome;
