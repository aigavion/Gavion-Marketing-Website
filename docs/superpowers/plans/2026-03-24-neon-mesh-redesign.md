# Neon Mesh Redesign Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Visually redesign the Gavion marketing website with a "Neon Mesh" aesthetic — deep navy base, gradient accents, frosted glass cards, animated mesh background — while preserving all features and content.

**Architecture:** Replace the global particle canvas background with CSS gradient mesh blobs + noise overlay. Update Tailwind config with new color tokens, then restyle each component top-down (navbar to footer). Remove unused components (radial timeline, 3D carousel, testimonials). No changes to routing, translations, chat logic, or form submission.

**Tech Stack:** React 19, TypeScript, Tailwind CSS, Framer Motion, Vite

**Spec:** `docs/superpowers/specs/2026-03-24-neon-mesh-redesign-design.md`

**Security note:** `dangerouslySetInnerHTML` is used in Hero.tsx for the `<brand>` tag — this renders trusted translation strings only (from `src/lib/translations.ts`), not user input.

---

## File Structure

### Modified Files
| File | Responsibility |
|------|---------------|
| `tailwind.config.js` | Color tokens, animations, keyframes |
| `src/index.css` | Base styles, noise overlay, gradient utilities, scrollbar |
| `src/App.tsx` | Add noise-overlay class to root wrapper |
| `src/contexts/LanguageContext.tsx` | Update brand tag class to gradient text |
| `src/components/Background.tsx` | Gradient mesh blobs replacing particle canvas |
| `src/components/Navbar.tsx` | Slimmer, frosted glass, gradient CTA |
| `src/components/Hero.tsx` | Gradient text, gradient border chat demo, updated orbs |
| `src/components/ServicesTimeline.tsx` | Horizontal card strip replacing radial timeline |
| `src/components/WhyUs.tsx` | Bento grid, gradient stat numbers |
| `src/components/Process.tsx` | Horizontal stepper replacing carousel |
| `src/components/Pricing.tsx` | Frosted glass cards, gradient highlights |
| `src/components/Contact.tsx` | Split layout, restyled form |
| `src/components/Footer.tsx` | 3-column layout, gradient divider |
| `src/components/ServicesPage.tsx` | Anchor IDs, restyle to match |
| `src/components/ChatWidget.tsx` | Restyle to match new design system |

### Files to Remove
| File | Reason |
|------|--------|
| `src/components/ui/ThreeDCardCarousel.tsx` | Replaced by inline stepper in Process |
| `src/components/ui/radial-orbital-timeline.tsx` | Replaced by card strip in ServicesTimeline |
| `src/components/Testimonials.tsx` | Unused, not rendered in App.tsx |
| `src/components/ui/badge.tsx` | Only imported by radial-orbital-timeline (being deleted) |
| `src/components/ui/button.tsx` | Only imported by radial-orbital-timeline (being deleted) |
| `src/components/ui/card.tsx` | Only imported by radial-orbital-timeline (being deleted) |

---

## Task 1: Foundation — Tailwind Config & Global CSS

**Files:**
- Modify: `tailwind.config.js`
- Modify: `src/index.css`

- [ ] **Step 1: Replace tailwind.config.js** with new color tokens (base, surface, surface-light), remove old tokens (brand-*, dark-*, light-*), add blob drift animations and gradient rotate keyframes.

- [ ] **Step 2: Replace src/index.css** with new base styles: body uses bg-base, gradient-text utility class, gradient-border and gradient-border-animated classes (rotating pseudo-element approach), noise-overlay ::after pseudo-element (inline SVG feTurbulence), reveal animations (kept from old), new scrollbar styles (#0a0f1a track, orange-to-pink gradient thumb), remove all old utilities (glass-dark, section-divider, bg-gradient-orbital, scrollbar-* per-service classes).

- [ ] **Step 3: Verify dev server compiles without errors**

- [ ] **Step 4: Commit**

---

## Task 2: Background — Gradient Mesh Blobs

**Files:**
- Modify: `src/components/Background.tsx`
- Modify: `src/App.tsx`

- [ ] **Step 1: Replace particle canvas in Background.tsx** with 3 large absolutely-positioned divs with radial gradients (purple #7c3aed, blue #3b82f6, orange #f97316), heavily blurred (blur-[150px]), ~15% opacity, using blob drift animations. Base: linear-gradient from #0a0f1a to #0f172a.

- [ ] **Step 2: Add noise-overlay class** to the root div in App.tsx (the `min-h-screen` wrapper).

- [ ] **Step 3: Verify background renders** — navy gradient base with soft colored blobs drifting slowly, grain texture visible.

- [ ] **Step 4: Commit**

---

## Task 3: LanguageContext — Update Brand Tag

**Files:**
- Modify: `src/contexts/LanguageContext.tsx`

- [ ] **Step 1: Update both `<brand>` replacement strings** — change class from `text-brand-500` to `bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent` (two locations in the `t()` function).

- [ ] **Step 2: Commit**

---

## Task 4: Navbar Redesign

**Files:**
- Modify: `src/components/Navbar.tsx`

- [ ] **Step 1: Restyle navbar** — slimmer (h-16, logo h-14), always-on frosted glass (bg-base/70 backdrop-blur-xl), on-scroll more opaque (bg-base/90 + border-b). Nav links: text-white/60, active gets gradient dot below (not underline). CTA: gradient from-orange-500 to-pink-500, rounded-full, shadow-glow. Language toggle: smaller ghost style. Mobile menu: same frosted glass treatment.

- [ ] **Step 2: Verify pt-16 on main still clears navbar** (h-16 = 64px should match pt-16).

- [ ] **Step 3: Commit**

---

## Task 5: Hero Redesign

**Files:**
- Modify: `src/components/Hero.tsx`

- [ ] **Step 1: Restyle hero return JSX** (keep all state/hooks/handlers unchanged). Badge: gradient bg from-orange-500/20 to-pink-500/20 with gradient-text. Title: text-5xl lg:text-7xl font-extrabold (brand tag handled by LanguageContext). Subtitle: text-white/60. CTA: gradient button. Chat demo: wrap in gradient-border-animated div, inner card bg-surface/90 backdrop-blur. Bot msgs: bg-white/5, user msgs: gradient bg. Send button: gradient. Ambient orbs: purple/blue tones instead of orange.

- [ ] **Step 2: Verify in browser**

- [ ] **Step 3: Commit**

---

## Task 6: Services Timeline — Horizontal Card Strip

**Files:**
- Modify: `src/components/ServicesTimeline.tsx`
- Modify: `src/components/ServicesPage.tsx` (add scroll-to-service handling)

- [ ] **Step 1: Replace ServicesTimeline.tsx** — remove RadialOrbitalTimeline import. 5 service cards: on desktop use `grid grid-cols-5 gap-6`, on mobile use `flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4` with each card `snap-center flex-shrink-0 w-[240px]`. Each card: bg-surface/60, gradient icon circle, bold title as clickable link, short description. Hover: border-orange-500/50, scale-105, shadow-glow. Connecting gradient line behind cards on desktop. Click navigates via `navigate('/services', { state: { scrollToService: id } })`.

- [ ] **Step 2: Add scroll-to-service in ServicesPage.tsx** — useEffect reads `location.state.scrollToService`, scrolls to `#service-{id}`. Add `id={`service-${workflow.id}`}` to each service section wrapper.

- [ ] **Step 3: Verify** — 5 cards on desktop, 2-col mobile, clicking navigates and scrolls to correct service.

- [ ] **Step 4: Commit**

---

## Task 7: Why Us — Bento Grid

**Files:**
- Modify: `src/components/WhyUs.tsx`

- [ ] **Step 1: Restyle WhyUs** — Header: gradient badge pill, font-extrabold title. Stats: 3-col row with gradient-text numbers (text-5xl font-extrabold). Value props: bento grid (3 cols) — card 1 is row-span-2 (tall), cards 2-3 standard, card 4 col-span-2 (wide, horizontal layout with icon left/text right). All cards: bg-surface/60, gradient icon circles, hover border glow. Trust badges: small pills with Lock icon. CTA: gradient border pill.

- [ ] **Step 2: Verify in browser**

- [ ] **Step 3: Commit**

---

## Task 8: Process — Horizontal Stepper

**Files:**
- Modify: `src/components/Process.tsx`

- [ ] **Step 1: Replace carousel with stepper** — remove ThreeDCardCarousel import. 3 steps visible at once in a flex row. Gradient progress line (h-0.5 from-orange-500 to-pink-500) connects numbered circles (w-16 h-16 gradient bg). Each step: number circle, title, description below. Stacks vertically on mobile (flex-col md:flex-row).

- [ ] **Step 2: Verify in browser**

- [ ] **Step 3: Commit**

---

## Task 9: Pricing Redesign

**Files:**
- Modify: `src/components/Pricing.tsx`

- [ ] **Step 1: Restyle pricing cards** — 3-col grid. Cards: bg-surface/60 backdrop-blur, border-white/5. Popular card: gradient-border-animated wrapper, gradient "Most Popular" badge, md:scale-105. Prices: text-5xl font-extrabold gradient-text. Features: Check icon (lucide) in orange-400 + text-white/60. Popular CTA: gradient fill. Others: gradient outline (border-2 border-orange-500/50, hover fills gradient).

- [ ] **Step 2: Verify in browser**

- [ ] **Step 3: Commit**

---

## Task 10: Contact — Split Layout

**Files:**
- Modify: `src/components/Contact.tsx`

- [ ] **Step 1: Restyle contact** — 2-col grid (lg:grid-cols-2). Left: title, subtitle, email card (gradient icon + info), phone card. Right: form in bg-surface/60 card. Inputs: bg-base border-white/10, focus:border-orange-500. Submit: full-width gradient button. Keep all form logic (handleSubmit, honeypot, status messages) unchanged.

- [ ] **Step 2: Verify in browser**

- [ ] **Step 3: Commit**

---

## Task 11: Footer — 3-Column

**Files:**
- Modify: `src/components/Footer.tsx`

- [ ] **Step 1: Restyle footer** — gradient divider line at top (h-px from-transparent via-orange-500/50 to-transparent). 3-col grid: logo (h-10) + copyright left, nav links center, contact info right. Text: white/30-40 for muted, hover:text-white for links.

- [ ] **Step 2: Commit**

---

## Task 12: Services Page Restyle

**Files:**
- Modify: `src/components/ServicesPage.tsx`

- [ ] **Step 1: Update ServicesPage styles** — Replace color classes throughout: bg-dark-* → bg-surface/60 or bg-base, text-white/70 → text-white/50, brand-500 → gradient or orange-500. Use from-orange-500 to-pink-500 for all workflow card gradients (ignore per-service colors). Title: font-extrabold. Bottom CTA: gradient button + gradient card border. Add id and scroll handling (if not done in Task 6).

- [ ] **Step 2: Verify /services page**

- [ ] **Step 3: Commit**

---

## Task 13: Chat Widget Restyle

**Files:**
- Modify: `src/components/ChatWidget.tsx`

- [ ] **Step 1: Update ChatWidget styles** — FAB: gradient bg (from-orange-500 to-pink-500). Widget card: bg-surface, border-white/10. Header: bg-base. User messages: gradient bg. Send button: gradient. Input focus: border-orange-500. Replace all dark-* and brand-* class references.

- [ ] **Step 2: Verify chat widget works**

- [ ] **Step 3: Commit**

---

## Task 14: Cleanup — Remove Unused Files

**Files:**
- Remove: `src/components/ui/ThreeDCardCarousel.tsx`
- Remove: `src/components/ui/radial-orbital-timeline.tsx`
- Remove: `src/components/Testimonials.tsx`
- Remove: `src/components/ui/badge.tsx`
- Remove: `src/components/ui/button.tsx`
- Remove: `src/components/ui/card.tsx`

- [ ] **Step 1: Delete the 6 unused files**

- [ ] **Step 2: Run `npx vite build`** — verify no import errors

- [ ] **Step 3: Commit**

---

## Task 15: Final Verification

- [ ] **Step 1: Full build check** — `npx vite build` succeeds

- [ ] **Step 2: Visual QA** — check every section in browser (background, navbar, hero, services, why us, process, pricing, contact, footer, chat widget, mobile layout, language toggle)

- [ ] **Step 3: Commit any final tweaks**
