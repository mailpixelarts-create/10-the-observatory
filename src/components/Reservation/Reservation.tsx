import { useEffect, useRef, useState } from 'react';
import './Reservation.scss';

function Reservation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    date: '',
    time: '',
    guests: '2',
    occasion: '',
    message: '',
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    interface Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      hue: number;
    }

    const particles: Particle[] = Array.from({ length: 60 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 2 + 0.5,
      speedX: (Math.random() - 0.5) * 0.3,
      speedY: (Math.random() - 0.5) * 0.2,
      opacity: Math.random() * 0.5 + 0.1,
      hue: Math.random() * 60 + 200,
    }));

    let frame: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 70%, 70%, ${p.opacity})`;
        ctx.fill();
      });

      frame = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', resize);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section className="reservation section-padding" id="reservation">
      <canvas ref={canvasRef} className="reservation__particles" />

      <div className="reservation__aurora" />

      <div className="container">
        <div className="reservation__header" data-reveal>
          <span className="reservation__label">Reserve</span>
          <h2 className="reservation__title">
            Secure Your<br />
            <em>Stargazing Spot</em>
          </h2>
          <p className="reservation__subtitle">
            Tables beneath the dome are limited. Reserve your evening among the stars.
          </p>
        </div>

        <form className="reservation__form glass-panel" onSubmit={handleSubmit} data-reveal>
          <div className="reservation__form-grid">
            <div className="reservation__field">
              <label className="reservation__field-label" htmlFor="res-name">Full Name</label>
              <input
                id="res-name"
                type="text"
                name="name"
                className="reservation__input"
                placeholder="Your name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="reservation__field">
              <label className="reservation__field-label" htmlFor="res-email">Email</label>
              <input
                id="res-email"
                type="email"
                name="email"
                className="reservation__input"
                placeholder="your@email.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="reservation__field">
              <label className="reservation__field-label" htmlFor="res-date">Date</label>
              <input
                id="res-date"
                type="date"
                name="date"
                className="reservation__input"
                value={formData.date}
                onChange={handleChange}
                required
              />
            </div>

            <div className="reservation__field">
              <label className="reservation__field-label" htmlFor="res-time">Time</label>
              <select
                id="res-time"
                name="time"
                className="reservation__input reservation__select"
                value={formData.time}
                onChange={handleChange}
                required
              >
                <option value="">Select time</option>
                <option value="17:00">5:00 PM — Golden Hour</option>
                <option value="18:00">6:00 PM — Sunset</option>
                <option value="19:00">7:00 PM — Twilight</option>
                <option value="20:00">8:00 PM — Starrise</option>
                <option value="21:00">9:00 PM — Deep Sky</option>
                <option value="22:00">10:00 PM — Midnight Sun</option>
              </select>
            </div>

            <div className="reservation__field">
              <label className="reservation__field-label" htmlFor="res-guests">Guests</label>
              <select
                id="res-guests"
                name="guests"
                className="reservation__input reservation__select"
                value={formData.guests}
                onChange={handleChange}
              >
                {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                  <option key={n} value={n}>{n} {n === 1 ? 'Guest' : 'Guests'}</option>
                ))}
              </select>
            </div>

            <div className="reservation__field">
              <label className="reservation__field-label" htmlFor="res-occasion">Occasion</label>
              <select
                id="res-occasion"
                name="occasion"
                className="reservation__input reservation__select"
                value={formData.occasion}
                onChange={handleChange}
              >
                <option value="">Select occasion</option>
                <option value="date">Romantic Evening</option>
                <option value="birthday">Birthday</option>
                <option value="anniversary">Anniversary</option>
                <option value="business">Business</option>
                <option value="celebration">Celebration</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          <div className="reservation__field reservation__field--full">
            <label className="reservation__field-label" htmlFor="res-message">Special Requests</label>
            <textarea
              id="res-message"
              name="message"
              className="reservation__input reservation__textarea"
              placeholder="Window seat? Telescope access? Dietary needs?"
              rows={3}
              value={formData.message}
              onChange={handleChange}
            />
          </div>

          <div className="reservation__submit-row">
            <p className="reservation__note">
              ✦ Dome tables include complimentary telescope access
            </p>
            <button type="submit" className="reservation__submit">
              <span>Reserve Table</span>
              <span className="reservation__submit-star">✦</span>
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default Reservation;
