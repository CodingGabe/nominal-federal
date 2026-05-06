# Nominal Federal — Design & Engineering Assessment
**Gabe Amaya** · [Live Demo](https://nominal-federal.vercel.app) · [GitHub](https://github.com/CodingGabe/nominal-federal)

---

## Running locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Tech stack

- **Next.js 14** (App Router)
- **Tailwind CSS** with custom design tokens from Nominal's brand guidelines
- **Lenis** for smooth scrolling
- **WebGL / GLSL** for animated hero shader

---

## Key design decisions

### Token-first implementation
All colors, typography, and spacing were extracted directly from Nominal's Figma brand guidelines and wired into tailwind.config.ts as semantic tokens (background, foreground, border, btn-primary, btn-secondary). This means every component references the design system by name, not by hardcoded hex — future brand updates propagate automatically.

### Typographic system
The page uses Nominal's two primary typefaces: Muoto (400/500) for all body and display text, and PP Fraktion Mono for labels, UI chrome, and the marquee strip. The 8pt spacing scale from Figma is mirrored in Tailwind's spacing tokens for pixel-perfect layout fidelity.

### Animated WebGL hero
Rather than using the static hero background image, I built a GLSL fragment shader that recreates the diagonal band texture as a live animation. Three overlapping sine waves at different frequencies and directions create an organic, prismatic movement. A random seed on each page load ensures the animation never starts at the same position twice. Respects prefers-reduced-motion — renders one static frame if enabled.

### Scroll-driven interactions
- **Benefits section**: sticky left column with active label sync — labels highlight as their corresponding card enters the viewport, giving the user a sense of progress through the content.
- **Proof section marquee**: scroll-driven horizontal movement — the logo strip moves left on scroll down and right on scroll up, with no auto-animation when idle. Direct 1:1 mapping with scroll delta for a tactile feel.
- **Scroll reveals**: every section uses IntersectionObserver to fade and translate content into view on entry, with staggered delays on child elements.

### Nav color inversion
The navigation dynamically inverts between white and black text based on the background of the section currently behind it. Uses a scroll listener that checks which section's bounding rect contains the nav's bottom edge, toggling a React state that drives Tailwind class swaps with 300ms transitions.

### Lenis smooth scrolling
Lenis wraps the entire app for physics-based scroll momentum. Duration 1.2s with an exponential easing curve gives the page a premium, weighty feel appropriate for the defense/government audience without feeling slow.

---

## Scope notes

### What I built fully
- Nav with dynamic color inversion
- Hero with animated WebGL shader background and product screenshot
- Marquee strip with scroll-driven direction control
- Problem section with animated UI card mockups and staggered micro-animations (pulsing live dots, row-by-row builds)
- Benefits section with sticky scroll and active label sync
- Proof/logo section with scroll-driven marquee
- Mission section with feature cards
- CTA section with horizontal line texture and radial vignette
- Lenis smooth scrolling
- Responsive behavior at 768px and 1024px breakpoints

### What I scoped out
- Mobile hamburger nav drawer (nav collapses but no slide-in menu)
- Footer (not included in the provided design scope)
- Real customer logos in proof section (placeholders used)
- Form functionality on CTA buttons

---

## What I would do next

- **Air-gap / Cloud deployment toggle** in the features section — an interactive switch that changes copy and visuals to show Nominal's two deployment modes, reinforcing the Federal-specific value prop
- **Performance audit** — optimize WebGL shader to pause when tab is not visible, lazy load below-fold images, add font preloading for Muoto and Fraktion Mono
- **Mobile nav drawer** — full hamburger menu with slide-in panel and the same color inversion logic
- **Accessibility pass** — full keyboard navigation audit, focus ring styles, ARIA labels on all interactive elements
- **Real customer logos** — swap placeholder logo cards with actual defense customer marks once approved
- **Page transitions** — Lenis + Framer Motion exit animations if this page lives within a larger Next.js app alongside nominal.io
