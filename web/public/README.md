# Public Assets Directory

This directory contains static assets served by Next.js.

## Structure

```
public/
├── logo.png               # Full 2D Champion logo (homepage)
├── logo-icon.png          # Icon version of logo
└── games/                 # Game thumbnails
    ├── highway-hero-thumb.png
    ├── highway-hero-poster.png
    └── pixel-python-thumb.png
```

## Usage

Files in this directory are served from the root URL path:
- `/logo.png` → `public/logo.png`
- `/games/highway-hero-thumb.png` → `public/games/highway-hero-thumb.png`

## Game Thumbnails

Game thumbnails should be:
- **Size**: 512x512px or 16:9 aspect ratio
- **Format**: PNG with transparency (if needed)
- **Naming**: `{game-slug}-thumb.png`
- **Location**: `public/games/`

## Adding New Assets

1. Place files in the appropriate directory
2. Reference them in code with `/filename.ext` (no "public" prefix)
3. Keep file sizes reasonable (<500KB for thumbnails)
4. Use descriptive, lowercase filenames with hyphens

## Note About Game Assets

Game-specific runtime assets (sprites, sounds, etc.) should be stored in:
- `/games/{game-name}/` in the project root
- **NOT** in this public folder

This public folder is ONLY for:
- Platform-wide assets (logos, icons)
- Game thumbnails/posters for display
