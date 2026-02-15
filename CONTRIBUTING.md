# Contributing to 2D Champion

First off, thank you for considering contributing to 2D Champion! 🎮✨

## Table of Contents

1. [Code of Conduct](#code-of-conduct)
2. [How to Contribute](#how-to-contribute)
3. [Contributing a Game](#contributing-a-game)
4. [Contributing to the Platform](#contributing-to-the-platform)
5. [Pull Request Process](#pull-request-process)
6. [Development Setup](#development-setup)

## Code of Conduct

This project follows our [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you agree to uphold this code.

## How to Contribute

There are many ways to contribute:

- 🎮 **Add new games**
- 🐛 **Report bugs**
- 💡 **Suggest features**
- 🎨 **Improve design**
- 📖 **Write documentation**
- 🧪 **Add tests**
- 🔧 **Fix issues**

## Contributing a Game

### Game Requirements

Your game should:

- ✅ Be built with **HTML**, **CSS**, and **TypeScript/JavaScript**
- ✅ Be **2D** (we're 2D Champion after all!)
- ✅ Work on desktop and mobile browsers
- ✅ Include clear controls and instructions
- ✅ Be original or properly licensed
- ✅ Have no external dependencies (use vanilla JS or bundle your deps)
- ✅ Be appropriate for all ages (no violence, adult content, etc.)

### Game Structure

Create your game in the `games/` directory:

```
games/
└── your-game-name/
    ├── index.html          # Main game file
    ├── style.css           # Game styles
    ├── script.ts           # Game logic (TypeScript)
    ├── assets/             # Images, sounds, etc.
    │   ├── sprite1.png
    │   └── sound1.mp3
    └── README.md           # Game documentation
```

### Game Template

Here's a minimal template to get started:

**index.html**
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your Game Name</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="game-container">
        <h1>Your Game Name</h1>
        <canvas id="gameCanvas" width="800" height="600"></canvas>
        <div class="score">Score: <span id="score">0</span></div>
        <button id="startBtn">Start Game</button>
    </div>
    <script src="script.js"></script>
</body>
</html>
```

**script.ts**
```typescript
// Game state
let score = 0;
let gameRunning = false;

// Canvas setup
const canvas = document.getElementById('gameCanvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d')!;

// Game loop
function gameLoop() {
    if (!gameRunning) return;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Update game logic
    updateGame();
    
    // Draw game
    drawGame();
    
    // Continue loop
    requestAnimationFrame(gameLoop);
}

// Start game
document.getElementById('startBtn')?.addEventListener('click', () => {
    gameRunning = true;
    gameLoop();
});

function updateGame() {
    // Your game logic here
}

function drawGame() {
    // Your rendering logic here
}

// Report score to platform (when integrated)
function reportScore(finalScore: number) {
    // This will be handled by the platform
    console.log('Final score:', finalScore);
}
```

### Game README Template

**README.md**
```markdown
# Your Game Name

## Description
A brief description of your game.

## How to Play
1. Use arrow keys to move
2. Press space to jump
3. Avoid obstacles
4. Collect points

## Controls
- **Arrow Keys**: Movement
- **Space**: Jump
- **R**: Restart

## Scoring
- Collect stars: +10 points
- Time bonus: +1 point per second

## Credits
- Developed by: Your Name
- Assets: (if using external assets, credit them here)

## License
This game is part of 2D Champion and licensed under GPL-3.0.
```

### Integration Checklist

Before submitting, ensure:

- [ ] Game works without errors in browser console
- [ ] Game is responsive (works on different screen sizes)
- [ ] All assets are included in the game folder
- [ ] README.md is complete
- [ ] Code is clean and commented
- [ ] No sensitive data or API keys in code
- [ ] Game has been tested in Chrome, Firefox, and Safari

### Submitting Your Game

1. **Fork the repository**
   ```bash
   git fork https://github.com/rishibaghel25/2DChampion
   ```

2. **Create a feature branch**
   ```bash
   git checkout -b game/your-game-name
   ```

3. **Add your game**
   ```bash
   cp -r your-game games/your-game-name
   git add games/your-game-name
   git commit -m "Add: Your Game Name"
   ```

4. **Update the database** (Add game entry to Supabase)
   - The maintainers will add your game to the platform database
   - Or you can include a SQL snippet in your PR:
   ```sql
   INSERT INTO games (slug, title, description, game_path, is_active)
   VALUES (
       'your-game-name',
       'Your Game Name',
       'A fun 2D game where you...',
       '/games/your-game-name',
       true
   );
   ```

5. **Push and create PR**
   ```bash
   git push origin game/your-game-name
   ```
   Then create a Pull Request on GitHub.

## Contributing to the Platform

### Found a Bug?

1. Check if the bug is already reported in [Issues](https://github.com/rishibaghel25/2DChampion/issues)
2. If not, create a new issue with:
   - Clear title
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots if applicable
   - Environment (browser, OS, etc.)

### Want to Suggest a Feature?

1. Check [Discussions](https://github.com/rishibaghel25/2DChampion/discussions) for similar ideas
2. Create a new discussion explaining:
   - What problem does it solve?
   - How would it work?
   - Any implementation ideas?

### Want to Fix Something?

1. Comment on the issue you want to work on
2. Wait for approval/assignment
3. Fork and create a feature branch
4. Make your changes
5. Submit a PR

## Pull Request Process

1. **Update documentation** if needed
2. **Add/update tests** for new features
3. **Follow code style** (we use ESLint and Prettier)
4. **Write clear commit messages**
   ```
   feat: Add user profile page
   fix: Resolve leaderboard sorting bug
   docs: Update game development guide
   style: Format code with Prettier
   ```

5. **Fill out the PR template**
6. **Wait for review** - maintainers will review within 48 hours
7. **Address feedback** if requested
8. **Celebrate!** 🎉 Your contribution will be merged!

## Development Setup

### Prerequisites

- Node.js 18+ and npm
- Git
- A code editor (VS Code recommended)
- A Supabase account (free tier is fine)

### Setup Steps

```bash
# 1. Clone your fork
git clone https://github.com/YOUR_USERNAME/2DChampion.git
cd 2DChampion

# 2. Add upstream remote
git remote add upstream https://github.com/rishibaghel25/2DChampion.git

# 3. Install dependencies
cd web
npm install

# 4. Copy environment variables
cp .env.example .env.local

# 5. Set up Supabase
# - Create a project at supabase.com
# - Run the SQL in supabase/schema.sql
# - Copy your credentials to .env.local

# 6. Run development server
npm run dev

# 7. Open http://localhost:3000
```

### Keeping Your Fork Updated

```bash
git fetch upstream
git checkout main
git merge upstream/main
git push origin main
```

## Questions?

If you have any questions, feel free to:

- Open a [Discussion](https://github.com/rishibaghel25/2DChampion/discussions)
- Comment on an existing issue
- Reach out to maintainers

## Thank You! 🙏

Every contribution, no matter how small, makes a difference. We appreciate your help in making 2D Champion awesome!

---

*Happy coding and gaming!* 🎮✨
