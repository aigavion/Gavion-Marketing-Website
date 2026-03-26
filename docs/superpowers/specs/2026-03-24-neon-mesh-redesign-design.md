# Gavion Marketing Website Redesign — "Neon Mesh"

## Overview

Full visual redesign of the Gavion marketing website. Keeps all existing features and content (bilingual EN/FR, AI chat demo, chat widget, contact form, services page with workflows). Changes the visual identity, color palette, layout structure, and animation approach.

**Design direction:** Bold & energetic but controlled. Dark theme with depth.

## Design Tokens

### Colors

| Token | Value | Usage |
|-------|-------|-------|
| `--base` | `#0a0f1a` | Page background, replaces pure black |
| `--surface` | `#111827` | Card backgrounds, nav, footer |
| `--surface-light` | `#1e293b` | Elevated surfaces, form inputs |
| `--text` | `#ffffff` | Primary text |
| `--text-muted` | `rgba(255,255,255,0.6)` | Secondary text |
| `--text-dim` | `rgba(255,255,255,0.4)` | Tertiary text |
| `--accent-orange` | `#f97316` | Orange accent |
| `--accent-pink` | `#ec4899` | Pink gradient end |
| `--accent-blue` | `#3b82f6` | Blue accent |
| `--accent-cyan` | `#06b6d4` | Cyan gradient end |
| `--accent-purple` | `#7c3aed` | Background mesh blob |

### Gradients

- **Primary gradient:** `from-orange-500 to-pink-500` — CTAs, key highlights, gradient text
- **Secondary gradient:** `from-blue-500 to-cyan-400` — secondary accents, ambient blobs
- **Mesh blobs:** purple, blue, orange-pink at ~15% opacity, heavily blurred

### Typography

- Font: Inter (unchanged)
- Hero title: `text-5xl lg:text-7xl font-extrabold`
- Section titles: `text-3xl md:text-5xl font-extrabold`
- Body: `text-base` / `text-lg`

### Effects

- Cards: `bg-[#111827]/60 backdrop-blur-sm border border-white/5`
- Hover cards: `border-white/20` or gradient border, `scale-105`, soft glow shadow
- Key cards (popular plan, chat demo): animated gradient border using a rotating pseudo-element behind the card with `overflow: hidden`. Fallback for older browsers: static gradient border.
- Noise overlay: inline SVG data URI using `feTurbulence` (200x200 tile, `background-repeat: repeat`) applied via a `::after` pseudo-element on the page wrapper with `pointer-events: none`, `position: fixed`, `inset: 0`, `opacity: 0.03`.
- Scrollbar: `#0a0f1a` track, `from-orange-500 to-pink-500` gradient thumb. Remove per-service scrollbar color classes (`.scrollbar-orange`, etc.).

## Background

Replace the particle canvas (`Background.tsx`) with:

1. **Gradient mesh blobs:** 2-3 large, absolutely positioned divs with radial gradients in purple/blue/orange-pink. Heavily blurred (`blur-[100px]` to `blur-[150px]`), ~15% opacity. CSS keyframe animations for slow drift (30-40s cycle).
2. **Noise overlay:** A pseudo-element with an SVG noise texture at 3-5% opacity covering the entire page. Provides subtle grain texture.
3. **Base gradient:** Linear gradient from `#0a0f1a` to `#0f172a` as the base.

## Section Specs

### Navbar

- Height: slimmer, logo `h-14` (from `h-24`)
- Logo: same image file, just scaled down
- Always-on frosted glass: `bg-[#0a0f1a]/70 backdrop-blur-xl`
- On scroll: more opaque `bg-[#0a0f1a]/90` + `border-b border-white/10`
- Nav links: `text-white/60 hover:text-white`, active state gets a small gradient dot below
- CTA button: primary gradient fill, `rounded-full`, soft glow shadow
- Language toggle: ghost style (`border border-white/20`), smaller
- Mobile menu: slide-down panel with same frosted glass

### Hero

- Layout: 2-column grid (`lg:grid-cols-2`), keep existing structure
- **Left column:**
  - Badge: gradient background `from-orange-500/20 to-pink-500/20`, gradient text
  - Title: `text-5xl lg:text-7xl font-extrabold`, `<brand>` rendered in primary gradient text (`bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-pink-500`)
  - Subtitle: `text-lg text-white/60`
  - CTA: primary gradient button, larger padding (`px-8 py-4`), subtle hover glow
- **Right column (chat demo):**
  - Animated gradient border (conic-gradient rotating via CSS animation)
  - Inner card: `bg-[#111827]` with backdrop blur
  - Bot messages: `bg-white/5`
  - User messages: primary gradient background
  - Send button: primary gradient
  - Gradient focus ring on input
- **Ambient orbs:** 2 blurred orbs in purple/blue tones behind the section

### Services Timeline (Home — ServicesTimeline.tsx)

- Replace RadialOrbitalTimeline with **horizontal card strip**
- 5 cards in a row on desktop, horizontally scrollable on mobile
- Each card ~240px wide, `bg-[#111827]/80 backdrop-blur border border-white/10`
- Card contents: gradient circle icon, bold title (as a link to `/services#service-{id}`), 2-line description
- Hover: gradient border, `scale-105`, soft glow
- Connecting line: thin horizontal gradient line behind cards at their vertical center
- Titles link to `/services#service-{id}` anchors

### Why Us

**Stats row:**
- 3 cards in a row
- Numbers: `text-5xl font-extrabold` with primary gradient text
- Labels: `text-white/50 text-sm`
- Cards: `bg-[#111827]/60 border border-white/5`

**Value props — bento grid:**
- Asymmetric grid layout using CSS grid
- 4 cards with varying sizes for visual interest
- All cards: `bg-[#111827]/60`, icon in gradient circle, hover border glow
- Layout (desktop):
  - Row 1: tall card (row-span-2) | standard card
  - Row 2: (continues) | wide card (col-span-2) or standard
  - Flexible — implementation can adjust for best visual balance

**Trust badges:**
- Smaller inline pills below the grid
- `bg-[#111827]/40 border border-white/10`, lock icon + text

**CTA pill:** Primary gradient border pill with gradient icon

### Process (How It Works)

- Replace ThreeDCardCarousel with **horizontal 3-step stepper**
- All 3 steps visible at once in a row
- Connecting gradient progress line runs through numbered circles
- Each step: numbered circle (primary gradient fill), title below, description under
- Step circles: `w-16 h-16` with gradient background
- Line: `h-0.5 bg-gradient-to-r from-orange-500 to-pink-500`

### Pricing

- Keep 3-column grid
- Cards: `bg-[#111827]/60 backdrop-blur border border-white/5`
- **Popular plan:** animated conic-gradient border, gradient "Most Popular" badge
- Price: `text-5xl font-extrabold` with primary gradient text
- Feature list: small gradient checkmark icons, `text-white/70`
- Popular CTA: primary gradient fill button
- Other CTAs: gradient outline button (`border-2` with gradient, transparent bg, hover fills)

### Contact

- **Split layout:** 2 columns on desktop
  - Left: section title, subtitle, email info card, phone info card stacked vertically
  - Right: contact form card
- Info cards: icon + label + value, `bg-[#111827]/60`
- Form card: `bg-[#111827]/60 backdrop-blur border border-white/5`
- Inputs: `bg-[#0a0f1a] border border-white/10`, gradient focus ring
- Submit button: full primary gradient, matches hero CTA

### Footer

- 3-column layout on desktop: logo+copyright | nav links | contact info
- Thin gradient divider line at top (`h-px bg-gradient-to-r from-transparent via-orange-500 to-transparent`)
- Logo: `h-10`
- Text: `text-white/40` for copyright, `text-white/50 hover:text-white` for links

### Services Page (/services)

- Keep workflow diagram concept per service
- Each service section gets `id="service-{id}"` for anchor links
- Restyle all cards to match new design system (navy backgrounds, gradient borders)
- Service number badges: primary gradient pill
- Workflow step cards: `bg-[#111827]` with gradient border on the outer wrapper
- Arrow indicators: match the service's gradient color or primary gradient
- CTA section at bottom: primary gradient button, frosted glass card

### Testimonials (Testimonials.tsx — currently unused in App.tsx)

`Testimonials.tsx` exists but is not rendered on the homepage. **Remove the component file.** If testimonials are needed later, they can be rebuilt to match the new design system. Remove the related translation keys cleanup is optional (translations are harmless to keep).

### Chat Widget

- FAB button: primary gradient background (replaces flat orange)
- Widget card: `bg-[#111827] border border-white/10`
- Header: `bg-[#0a0f1a]` with frosted blur
- Messages: same treatment as hero chat (bot `bg-white/5`, user gradient)
- Send button: primary gradient
- Input: gradient focus ring

## Animations

- **Entrance:** Framer Motion `fade-up` with stagger on section children (keep existing reveal system but refine timing)
- **Hover:** `scale-105` on cards, border color transition, soft glow shadow
- **Background blobs:** CSS keyframe drift, 30-40s cycles
- **Gradient borders:** Conic-gradient rotation on key cards (2-3s cycle)
- **Progress line (Process):** Optional draw-on animation when section enters viewport

## Design Token Migration

Remove old Tailwind color scales and classes:
- `brand-400`, `brand-500`, `brand-600` → replace with Tailwind `orange-500` / primary gradient
- `dark-600`, `dark-700`, `dark-800`, `dark-900` → replace with `--base` (`#0a0f1a`) and `--surface` (`#111827`)
- `light-50`, `light-100`, `light-200` → remove (unused in dark theme)
- `.glass-dark` → remove, replace with `bg-[#111827]/60 backdrop-blur-sm border border-white/5`
- `.section-divider` → remove
- `.bg-gradient-orbital` → remove
- `.scrollbar-orange`, `.scrollbar-blue`, `.scrollbar-green`, `.scrollbar-purple`, `.scrollbar-yellow` → remove
- CSS custom properties in `:root` (old `--background`, `--surface`, `--primary`, etc.) → replace with new tokens

Update `LanguageContext.tsx`: change `<brand>` replacement class from `text-brand-500` to gradient text classes: `bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent`.

Update `src/components/ui/badge.tsx`, `button.tsx`, `card.tsx`: ensure they reference new color tokens or Tailwind defaults rather than old CSS variables.

## Responsive Behavior

All multi-column layouts stack to single column on mobile in source order, with these specifics:
- **Hero:** single column, copy first, chat demo below
- **Services card strip:** horizontal scroll with snap on mobile
- **Why Us bento grid:** stacks to single column, all cards same width
- **Process stepper:** horizontal scroll or stacks vertically on small screens
- **Pricing:** single column stack, popular card first (reordered with `order`)
- **Contact:** single column, info above form
- **Footer:** single column, logo first, then links, then contact info

## Routing Note

The app uses `HashRouter`. Anchor links to `/services#service-{id}` need special handling since HashRouter already uses `#` for routes (e.g., `/#/services`). Implementation approach: use `react-router-dom` `useLocation` + `useEffect` with `scrollIntoView` to handle the `service-{id}` portion, passing the target as route state or a query parameter rather than a URL hash fragment.

## Navbar Height

With the slimmer navbar (logo `h-14` ≈ 56px + padding ≈ ~72px total), keep `pt-16` (64px) on `<main>` but verify visually. Adjust to `pt-20` (80px) if the nav overlaps content.

## Files to Modify

1. `tailwind.config.js` — new color tokens, remove old ones, animations, keyframes
2. `src/index.css` — new base styles, noise overlay, gradient utilities, scrollbar, remove old utilities
3. `src/components/Background.tsx` — replace particle canvas with gradient mesh blobs + noise
4. `src/components/Navbar.tsx` — slim down, frosted glass, gradient CTA
5. `src/components/Hero.tsx` — gradient text, gradient border chat, ambient orbs
6. `src/components/ServicesTimeline.tsx` — replace radial timeline with horizontal card strip
7. `src/components/WhyUs.tsx` — bento grid layout, gradient numbers
8. `src/components/Process.tsx` — horizontal stepper replacing carousel
9. `src/components/Pricing.tsx` — frosted glass cards, gradient highlights
10. `src/components/Contact.tsx` — split layout, restyled form
11. `src/components/Footer.tsx` — 3-column layout, gradient divider
12. `src/components/ServicesPage.tsx` — add anchor IDs, restyle to match
13. `src/components/ChatWidget.tsx` — restyle to match new design system
14. `src/contexts/LanguageContext.tsx` — update `<brand>` replacement to use gradient text classes
15. `src/components/ui/badge.tsx`, `button.tsx`, `card.tsx` — update to new color tokens

### Files to Remove

- `src/components/ui/ThreeDCardCarousel.tsx` — replaced by stepper in Process
- `src/components/ui/radial-orbital-timeline.tsx` — replaced by card strip
- `src/components/Testimonials.tsx` — unused, not rendered

## What Does NOT Change

- All text content / translations (`translations.ts`)
- Routing structure (`/` and `/services`) via `HashRouter`
- Chat functionality (OpenRouter API calls, ChatContext)
- Contact form submission logic
- Language toggle functionality
- `scrollToContact` state-based navigation in `App.tsx`
- All feature behavior
