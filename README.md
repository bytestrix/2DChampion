![2D Champion](./2D.png)

# 🎮 2D Champion

> **Open Source 2D Gaming Platform** - Play, Compete, and Create Together!

[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)
[![Contributions Welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg)](CONTRIBUTING.md)

Welcome to **2D Champion** - a community-driven platform where gamers play, compete on global leaderboards, and developers collaborate to build amazing 2D games!

🌐 **Live Platform**: [www.2dchampion.com](https://www.2dchampion.com) (Coming Soon!)

## ✨ Features

- 🎯 **Play Free Games** - Enjoy a growing collection of 2D games, all free and open source
- 🏆 **Global Leaderboards** - Compete with players worldwide and climb the ranks
- 👥 **User Profiles** - Track your scores, achievements, and contributions
- 🔧 **Open Source** - All game code is public and available for contribution
- 📱 **Responsive Design** - Play on desktop, tablet, or mobile
- 🔐 **Secure Authentication** - Powered by Supabase with row-level security

## 🎮 Available Games

| Game | Description | Play Count |
|------|-------------|------------|
| **Highway Hero** | Dodge traffic and survive as long as you can! | 🚗 |
| **Pixel Python** | Classic snake game with a modern twist | 🐍 |

*More games coming soon! [Contribute yours](CONTRIBUTING.md)*

## 🚀 Quick Start

### Play Games

1. Visit the platform (or run locally)
2. Browse available games
3. Click "Play" and start gaming!
4. Sign up to save your high scores

### Run Locally

```bash
# Clone the repository
git clone https://github.com/rishibaghel25/2DChampion.git
cd 2DChampion

# Install dependencies for the web platform
cd web
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your Supabase credentials

# Run the development server
npm run dev

# Open http://localhost:3000
```

### Set Up Database

1. Create a [Supabase](https://supabase.com) project
2. Run the SQL schema in the Supabase SQL Editor:
   ```bash
   # The schema file is located at:
   supabase/schema.sql
   ```
3. Copy your Supabase credentials to `.env.local`

## 📁 Project Structure

```
2DChampion/
├── web/                      # Next.js web application
│   ├── src/
│   │   ├── app/             # App router pages
│   │   ├── components/      # Reusable components
│   │   ├── lib/             # Supabase client & utilities
│   │   └── types/           # TypeScript types
│   └── public/              # Static assets
├── games/                    # Game source files
│   ├── highway-hero/        # Highway Hero game
│   ├── pixel-python/        # Pixel Python game
│   └── [your-game]/         # Add your game here!
├── docs/                     # Documentation site (coming soon)
└── supabase/                 # Database schemas & migrations
    └── schema.sql           # Database schema
```

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + Custom CSS
- **Icons**: Lucide React
- **Hosting**: Vercel (recommended)

### Backend
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Storage**: Supabase Storage (for game assets)
- **Real-time**: Supabase Realtime (for leaderboards)

### Games
- **Technologies**: HTML5, CSS3, TypeScript/JavaScript
- **Canvas API** for game rendering
- **No heavy frameworks** - keep games lightweight!

## 🤝 Contributing

We welcome contributions from developers of all skill levels! Here's how you can help:

### Contributing a Game

1. **Fork the repository**
2. **Create a new game folder** in `games/your-game-name/`
3. **Develop your game** using HTML, CSS, and TypeScript/JavaScript
4. **Add a README** explaining how to play
5. **Submit a Pull Request**

See our [Contributing Guide](CONTRIBUTING.md) for detailed instructions.

### Contributing to the Platform

- 🐛 Report bugs
- 💡 Suggest features
- 🎨 Improve UI/UX
- 📖 Write documentation
- 🧪 Add tests

## 📖 Documentation

- **[Getting Started](docs/getting-started.md)** - Set up your development environment
- **[Game Development Guide](docs/game-development.md)** - Learn how to create games
- **[API Reference](docs/api-reference.md)** - Supabase database schema & functions
- **[Deployment Guide](docs/deployment.md)** - Deploy your own instance

## 🔒 Security & Privacy

- All sensitive credentials are kept in environment variables (never committed)
- Row Level Security (RLS) protects user data
- Supabase's anon key is safe for frontend use
- Authentication handled securely by Supabase Auth

### Environment Variables

The following environment variables are **safe to commit** (public):
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

**Never commit**:
- `SUPABASE_SERVICE_ROLE_KEY` (keep in Vercel/deployment environment only)

## 🌟 Community

- ⭐ **Star this repo** if you like the project!
- 🐛 **Report bugs** via [GitHub Issues](https://github.com/rishibaghel25/2DChampion/issues)
- 💬 **Discussions** on [GitHub Discussions](https://github.com/rishibaghel25/2DChampion/discussions)
- 📢 **Follow updates** on Twitter (coming soon!)

## 📜 License

This project is licensed under the **GNU General Public License v3.0** - see the [LICENSE](LICENSE) file for details.

### What This Means

- ✅ You can use this code for free
- ✅ You can modify and distribute it
- ✅ You can use it commercially
- ⚠️ You must open source any modifications
- ⚠️ You must use the same GPL-3.0 license

## 🙏 Acknowledgments

- Built with ❤️ by the open source community
- Powered by [Supabase](https://supabase.com)
- Deployed on [Vercel](https://vercel.com)
- Styled with [Tailwind CSS](https://tailwindcss.com)

## 🗺️ Roadmap

- [x] Core platform with authentication
- [x] Game listing and playing
- [x] Leaderboard system
- [x] User profiles with stats
- [ ] Game rating and reviews
- [ ] Achievements and badges
- [ ] Multi-player support
- [ ] Game tournaments
- [ ] Mobile app (React Native)

## 📧 Contact

Have questions or suggestions? Reach out!

- **GitHub**: [@rishibaghel25](https://github.com/rishibaghel25)
- **Email**: (your-email@example.com)

---

**Made with 💜 by the 2D Champion community**

*Play games. Break records. Build together.* 🎮✨
