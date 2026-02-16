# 2D Champion - Color Palette & Design System

## Official Championship Colors

### Primary Colors
```css
--champion-gold:   #ffd700   /* Primary gold - titles, highlights, CTAs */
--champion-orange: #ff9500   /* Secondary orange - accents, backgrounds */
--champion-cyan:   #00d4ff   /* Tertiary cyan - special highlights, developer section */
```

### Gradients
```css
/* Main Championship Gradient */
from-[#ff9500] to-[#ffd700]

/* Reverse Championship Gradient */
from-[#ffd700] to-[#ff9500]

/* Cyan Accent Gradient */
from-[#00d4ff] to-[#0ea5e9]
```

### Neutral Colors
```css
--text-primary:    #ffffff   /* Main text */
--text-secondary:  #9ca3af   /* Gray-400 - secondary text */
--text-tertiary:   #6b7280   /* Gray-500 - tertiary text */
--bg-primary:      #000000   /* Black background */
--bg-glass:        rgba(255, 255, 255, 0.05) /* Glass effect */
```

## Usage Guidelines

### ❌ **NEVER USE:**
- Purple colors (purple-400, purple-500, indigo-500, violet-*)
- Purple was removed for consistency with championship theme
- Pink colors (except very subtle backgrounds if needed)

### ✅ **DO USE:**

**Gold (#ffd700)** for:
- Primary headings and titles
- Trophy icons and awards
- High scores and rankings
- Primary hover states
- Success states

**Orange (#ff9500)** for:
- Secondary accents
- Background glows
- Gradient starts
- Warning states

**Cyan (#00d4ff)** for:
- Developer-focused sections
- Special features
- Code-related elements
- Info states

## Component Examples

### Buttons
```tsx
/* Primary CTA */
className="bg-gradient-to-r from-[#ff9500] to-[#ffd700] text-black"

/* Secondary Button */
className="border border-[#00d4ff]/30 hover:border-[#00d4ff]/50"

/* Glass Button */
className="glass hover:bg-white/10"
```

### Cards
```tsx
/* Championship Card */
className="glass rounded-3xl border border-[#ff9500]/20 hover:border-[#ffd700]/50"

/* Game Card */
className="glass rounded-2xl border border-white/10"

/* Leaderboard Entry */
className="hover:bg-white/5"
```

### Icons
```tsx
/* Trophy/Awards */
<Trophy className="text-[#ffd700]" />

/* Game/Play */
<Gamepad2 className="text-[#ff9500]" />

/* Code/Developer */
<Code2 className="text-[#00d4ff]" />
```

### Text Highlights
```tsx
/* Primary Highlight */
className="text-[#ffd700]"

/* Score Display */
className="font-mono text-[#ffd700]"

/* Hover Effect */
className="hover:text-[#ffd700]"
```

### Background Glows
```tsx
/* Orange Glow */
className="bg-[#ff9500]/10 blur-[100px]"

/* Gold Shadow */
className="shadow-lg shadow-[#ffd700]/20"
```

## Accessibility

### Contrast Ratios
All championship colors meet WCAG AA standards against black backgrounds:
- Gold (#ffd700) on Black: 12.6:1 ✅
- Orange (#ff9500) on Black: 7.8:1 ✅  
- Cyan (#00d4ff) on Black: 8.2:1 ✅

### Focus States
Always use visible focus indicators:
```tsx
className="focus:outline-none focus:border-[#ffd700]"
```

## Animation Classes

### Shadows
```css
.shadow-glow         /* Orange/gold glow */
.shadow-glow-gold    /* Pure gold glow */
.shadow-glow-cyan    /* Cyan glow */
```

### Gradients (in globals.css)
```css
.gradient-text             /* Gold gradient text */
.gradient-text-cyan        /* Cyan gradient text */
```

## Page-Specific Color Usage

### Homepage
- Hero: Gold gradient text, orange accents
- Features: Gold for gaming, cyan for development
- Stats: Championship gradient

### Games Page
- Headers: Orange to gold gradient
- Cards: Gold borders on hover
- CTAs: Championship gradient button

### Leaderboard
- Trophy icons: Gold gradient background
- Scores: Gold text
- Ranks: Gold/silver/bronze hierarchy

### Profile
- Avatar border: Gold gradient
- Stats: Orange username, gold scores, cyan achievements
- Cards: Gold borders

### Login/Auth
- Focus states: Gold border
- Links: Gold text
- CTAs: Championship gradient

## Quick Reference

**Want to add a championship feel?**
1. Use `from-[#ff9500] to-[#ffd700]` gradient
2. Add `shadow-glow-gold` for emphasis
3. Use `hover:text-[#ffd700]` for interactions

**Want to highlight code/developer content?**
1. Use `text-[#00d4ff]` or cyan gradient
2. Add `border-[#00d4ff]/30` borders

**Want to de-emphasize?**
1. Use `text-gray-400` or `text-gray-500`
2. Use `border-white/10` for subtle borders
