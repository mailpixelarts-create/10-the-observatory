# THE OBSERVATORY

> Coffee Beneath the Stars

A futuristic café suspended above the clouds inside a panoramic glass observatory. Coffee through astronomy, constellations, and immersive celestial visuals.

## Tech Stack

- **Vite** — Build tool
- **TypeScript** — Type safety
- **React 18** — UI framework
- **SCSS** — Styling with design tokens
- **GSAP** — Animations & scroll triggers
- **Lenis** — Smooth scrolling
- **SplitType** — Text animations
- **Three.js** — 3D capabilities

## Design System

### Colors

| Token | Hex | Usage |
|-------|-----|-------|
| Background Deep | `#060914` | Primary background |
| Surface | `#0D1323` | Card/section backgrounds |
| Glass | `rgba(255,255,255,.08)` | Glass panels |
| White | `#F8F9FB` | Primary text |
| Moon | `#DDE4EE` | Secondary text |
| Gold | `#F6D37A` | Accent, CTAs |
| Nebula Blue | `#4B6FFF` | Accent, links |
| Purple | `#6A4FFF` | Gradient accent |
| Accent Cyan | `#75D9FF` | Highlight accent |

### Typography

- **Display**: Canela (fallback: Editorial New) — Hero, titles
- **Heading**: Neue Montreal — Section headers
- **Body**: Inter — Body copy, UI
- **Numbers**: Mono — Labels, data

## Getting Started

```bash
npm install
npm run dev
```

## Project Structure

```
src/
├── components/
│   ├── Loader/          — Star constellation loading screen
│   ├── Navigation/      — Floating glass navigation
│   ├── Hero/            — Interactive galaxy hero
│   ├── Story/           — Coffee meets astronomy timeline
│   ├── CoffeeCollection/ — Planet menu cards
│   ├── ObservatoryDome/ — 360° sky with telescope
│   ├── CoffeeOrigins/   — World → star map
│   ├── Laboratory/      — Scientific brewing instruments
│   ├── Gallery/         — 15 cinematic AI renders
│   ├── Reservation/     — Aurora glass form
│   ├── Footer/          — Night sky constellation map
│   └── Cursor/          — Orbital custom cursor
├── hooks/
│   ├── useLenis.ts      — Smooth scroll
│   ├── useScrollTrigger.ts — Intersection observer
│   └── useSplitType.ts  — Text splitting
├── animations/
│   ├── hero.ts          — Hero entrance & parallax
│   ├── loader.ts        — Loader sequence
│   ├── sections.ts      — Section reveal animations
│   ├── gallery.ts       — Gallery grid animations
│   └── cursor.ts        — Cursor interactions
├── styles/
│   ├── variables.scss   — Design tokens
│   ├── global.scss      — Reset & base styles
│   └── animations.scss  — Keyframes & utilities
├── utils/
│   └── constants.ts     — Brand data & config
├── App.tsx
└── main.tsx
```

## Credits

A **LOOKBOOK Studio** Experience  
© Norman James, made with love ❤️ by **Empathy Studio**
