export const BRAND = {
  name: 'THE OBSERVATORY',
  tagline: 'Coffee Beneath the Stars',
  description: 'A futuristic café suspended above the clouds inside a panoramic glass observatory.',
  est: '2026',
} as const;

export const COLORS = {
  bgDeep: '#060914',
  surface: '#0D1323',
  glass: 'rgba(255, 255, 255, 0.08)',
  glassBorder: 'rgba(255, 255, 255, 0.12)',
  white: '#F8F9FB',
  moon: '#DDE4EE',
  gold: '#F6D37A',
  nebulaBlue: '#4B6FFF',
  purple: '#6A4FFF',
  accentCyan: '#75D9FF',
} as const;

export const FONTS = {
  display: "'Canela', 'Editorial New', serif",
  heading: "'Neue Montreal', 'Inter', sans-serif",
  body: "'Inter', -apple-system, sans-serif",
  mono: "'Space Mono', monospace",
} as const;

export const NAV_LINKS = [
  { label: 'Story', href: '#story' },
  { label: 'Menu', href: '#collection' },
  { label: 'Dome', href: '#dome' },
  { label: 'Origins', href: '#origins' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Reserve', href: '#reservation' },
] as const;

export const SOCIAL_LINKS = [
  { label: 'Instagram', url: '#' },
  { label: 'Twitter / X', url: '#' },
  { label: 'Newsletter', url: '#' },
] as const;

export const TIME_SLOTS = [
  { value: '17:00', label: '5:00 PM — Golden Hour' },
  { value: '18:00', label: '6:00 PM — Sunset' },
  { value: '19:00', label: '7:00 PM — Twilight' },
  { value: '20:00', label: '8:00 PM — Starrise' },
  { value: '21:00', label: '9:00 PM — Deep Sky' },
  { value: '22:00', label: '10:00 PM — Midnight Sun' },
] as const;

export const CREDITS = {
  studio: 'LOOKBOOK Studio',
  author: 'Norman James',
  empathy: 'Empathy Studio',
} as const;
