# CAD Concept - Reverse Engineering & Scan to CAD Solutions

A modern, high-end one-page website built with Next.js, featuring cinematic animations and a premium B2B design.

## Tech Stack

- **Next.js 14** (App Router)
- **React 18**
- **TypeScript**
- **Tailwind CSS**
- **Framer Motion** - Animation library
- **GSAP** - ScrollTrigger for horizontal scrolling
- **React Three Fiber** - 3D wireframe animations
- **Lenis** - Smooth scrolling

## Features

- 🎨 Dark industrial theme with electric blue accents
- 🎬 Cinematic scroll animations
- 🎯 3D wireframe gear in hero section
- 📜 Horizontal scrolling process section
- ✨ Micro-interactions (magnetic buttons, custom cursor)
- 📱 Fully responsive design
- ⚡ Performance optimized

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout with fonts
│   ├── page.tsx            # Main page
│   └── globals.css         # Global styles
├── components/
│   ├── sections/           # Page sections
│   ├── 3d/                 # Three.js components
│   └── ui/                 # Reusable UI components
└── public/                 # Static assets
```

## Sections

1. **Hero** - Full-screen with 3D wireframe object
2. **About** - What we do with blueprint animations
3. **Process** - Horizontal scrolling timeline
4. **Industries** - Grid with hover effects
5. **Why Choose Us** - Animated counters
6. **Technology Stack** - Animated marquee
7. **CTA** - Call to action with ripple effects
8. **Footer** - Minimal footer with contact info

## Customization

- Colors: Edit `tailwind.config.js`
- Content: Update component files in `components/sections/`
- Animations: Modify Framer Motion variants in components

## Build

```bash
npm run build
npm start
```

## License

MIT

