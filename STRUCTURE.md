# 2D Champion - Project Structure

This document explains the folder organization and what each directory contains.

## Root Structure

```
2DChampion/
├── .docs/                      # Private documentation (gitignored from main view)
│   └── database-schema/        # Supabase schema files (maintainers only)
├── games/                      # Game source code (developers contribute here)
│   ├── highway-hero/          # Highway Hero game files
│   └── pixel-python/          # Pixel Python game files
├── web/                        # Next.js web application
│   ├── public/                # Static assets (served at root URL)
│   ├── src/                   # Application source code
│   │   ├── app/              # Next.js 14 App Router pages
│   │   ├── components/       # Reusable React components
│   │   ├── lib/              # Utilities and helpers
│   │   └── types/            # TypeScript type definitions
│   └── package.json          # Dependencies
├── SECURITY.md                # Security guidelines
├── README.md                  # Main project documentation
└── CONTRIBUTING.md            # (TODO) Contribution guidelines
```

## Directory Details

### `/games/` - Game Source Code
**Purpose:** Individual game implementations  
**Contributors:** Add your game folder here  
**Structure:**
```
games/your-game/
├── script.ts          # Game logic
├── style.css          # Game-specific styles
├── assets/            # Game runtime assets (sprites, sounds)
└── README.md          # Game documentation
```

### `/web/` - Platform Application
**Purpose:** The main 2D Champion website  
**Tech Stack:** Next.js 14, TypeScript, Tailwind CSS, Supabase

#### `/web/src/app/` - Pages
- `/` - Homepage
- `/games/` - Games listing
- `/games/[slug]/` - Individual game pages
- `/leaderboard/` - Global leaderboard
- `/profile/` - User profile
- `/docs/` - Documentation
- `/login/`, `/signup/` - Authentication

#### `/web/src/components/` - React Components
- `Navbar.tsx`, `Footer.tsx` - Layout
- `MobileMenu.tsx` - Mobile navigation
- `GameLeaderboard.tsx` - Leaderboard component
- `ProfilePictureUpload.tsx` - Avatar upload
- `/games/` - Game component wrappers
  - `HighwayHeroGame.tsx`
  - `PixelPythonGame.tsx`

#### `/web/public/` - Static Assets
**Purpose:** Files served directly by Next.js  
**Contents:**
- Platform logos and branding
- Game thumbnails (for display only)
- Favicons and PWA assets

**Note:** Game runtime assets (sprites, backgrounds) should be in `/games/{game}/assets/`, NOT here.

### `/.docs/` - Private Documentation
**Purpose:** Maintainer-only documentation (hidden from casual view)  
**Contents:**
- Database schema files
- Deployment guides
- Internal notes

**Why hidden?**  
To avoid confusing contributors who don't need database access.

## File Organization Rules

### ✅ DO:
- Put game source in `/games/{your-game}/`
- Put platform code in `/web/src/`
- Put static assets in `/web/public/`
- Use lowercase, hyphenated folder names

### ❌ DON'T:
- Put game assets in `/web/public/` (only thumbnails)
- Mix game logic with platform code
- Commit environment variables (`.env` files)
- Put temporary files in the repo

## Clean Folder Guidelines

### Game Folders
Each game should have:
- **Required:** `script.ts` (or `.js`), game logic
- **Recommended:** `README.md`, instructions
- **Optional:** `style.css`, custom styling
- **Optional:** `assets/`, game-specific images/sounds

### What NOT to Include
- ❌ Node modules
- ❌ Build artifacts
- ❌ IDE config (`.vscode/`, `.idea/`)
- ❌ OS files (`.DS_Store`, `Thumbs.db`)
- ❌ Temporary/test files
- ❌ Large binary files (>5MB)

## Public Folder Explained

**Why?**: Next.js serves files from `public/` at the root URL.

**Example:**
- File: `/web/public/logo.png`
- URL: `https://2dchampion.com/logo.png`

**Use for:**
- Platform branding (logos, favicons)
- Game thumbnails/posters (display only, not game assets)
- SEO images (Open Graph, Twitter Cards)

**Don't use for:**
- Game sprites/assets (use `/games/` instead)
- User uploads (use Supabase Storage)
- Code files (use `/src/`)

## Adding a New Game

1. **Create folder:** `/games/your-game-name/`
2. **Add files:**
   - `script.ts` - Game logic
   - `README.md` - Instructions
   - Assets in `/games/your-game-name/assets/`
3. **Add thumbnail:** `/web/public/games/your-game-thumb.png`
4. **Create component:** `/web/src/components/games/YourGameName.tsx`
5. **Submit PR** - Maintainers will register in database

## Questions?

- Check `SECURITY.md` for access guidelines
- Check `README.md` for contribution workflow
- Open an issue on GitHub for help
