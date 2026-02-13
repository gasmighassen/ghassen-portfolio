# Ghassen Portfolio

A modern React portfolio built with **Framer Motion** as the primary animation library. This project features smooth scroll-based parallax effects, performance-friendly animation patterns, and a clean, scalable codebase.

## 🎨 Color Palette

| Color             | Hex       | Usage                   |
| ----------------- | --------- | ----------------------- |
| Primary Dark      | `#30364F` | Dark backgrounds, text  |
| Secondary Neutral | `#ACBAC4` | Secondary text, accents |
| Accent            | `#E1D9BC` | Buttons, highlights     |
| Light Background  | `#F0F0DB` | Main background         |

## 🚀 Features

- **Scroll Animations** - Elements animate into view on scroll
- **Parallax Effects** - Multi-layer parallax scrolling
- **Performance First** - Hardware-accelerated transforms
- **Hover Interactions** - Micro-interactions for engagement
- **Accessibility** - Respects `prefers-reduced-motion`

## 📁 Project Structure

```
src/
├── animations/          # Animation variants & parallax utilities
│   ├── index.ts
│   ├── variants.ts      # Reusable motion variants
│   └── parallax.ts      # Parallax configurations
│
├── components/
│   ├── animation/       # Animation-ready components
│   │   ├── AnimatedSection.tsx
│   │   ├── AnimatedText.tsx
│   │   ├── ParallaxContainer.tsx
│   │   ├── StaggeredContainer.tsx
│   │   ├── StaggeredItem.tsx
│   │   ├── HoverCard.tsx
│   │   ├── ScrollProgress.tsx
│   │   └── PageTransition.tsx
│   │
│   └── ui/              # Base UI components
│       ├── Button.tsx
│       ├── Section.tsx
│       └── Container.tsx
│
├── hooks/               # Custom React hooks
│   ├── useParallax.ts
│   ├── useScrollAnimation.ts
│   └── useSmoothScroll.ts
│
├── styles/              # Global styles
│   └── global.css
│
├── theme/               # Theme configuration
│   ├── index.ts         # Colors, spacing, typography
│   └── ThemeProvider.tsx
│
├── App.tsx              # Main application
└── main.tsx             # Entry point
```

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🎬 Animation Components

### AnimatedSection

Scroll-triggered animations with multiple variants:

```tsx
<AnimatedSection variant='fadeInUp' delay={0.2}>
  <h1>Animated Content</h1>
</AnimatedSection>
```

### ParallaxContainer

Scroll-based parallax effects:

```tsx
<ParallaxContainer preset='hero' config={{ speed: 0.3 }}>
  <div>Parallax content</div>
</ParallaxContainer>
```

### StaggeredContainer + StaggeredItem

Staggered child animations:

```tsx
<StaggeredContainer speed='normal'>
  <StaggeredItem animation='fadeInUp'>Item 1</StaggeredItem>
  <StaggeredItem animation='fadeInUp'>Item 2</StaggeredItem>
</StaggeredContainer>
```

### AnimatedText

Text reveal animations with word/character splitting:

```tsx
<AnimatedText as='h1' animation='fadeInUp' splitBy='words'>
  Animated headline text
</AnimatedText>
```

## 🎯 Custom Hooks

### useParallax

```tsx
const { ref, y, scale, opacity } = useParallax({
  preset: 'hero',
  config: { speed: 0.5 },
});
```

### useScrollAnimation

```tsx
const { ref, isInView, hasAnimated } = useScrollAnimation({
  threshold: 0.1,
  triggerOnce: true,
});
```

### useSmoothScroll

```tsx
const { smoothScrollYProgress } = useSmoothScroll();
```

## ⚡ Performance Tips

1. Use `will-change` sparingly and only when needed
2. Prefer `transform` and `opacity` for animations
3. Use `useSpring` for smooth, physics-based motion
4. Set `triggerOnce: true` for one-time scroll animations
5. Test with `prefers-reduced-motion` media query

## 📄 License

MIT
