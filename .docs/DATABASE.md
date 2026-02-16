# Database Overview

This document provides a high-level overview of the 2D Champion platform's data structure.

## 🔒 Security Note

**The actual database schema, SQL files, and implementation details are NOT included in this repository for security reasons.**

Maintainers have access to the complete schema in a private, secure location.

## 📊 Data Structure (High-Level)

The platform uses **Supabase** (PostgreSQL) as the database.

### Main Entities

#### 1. **User Profiles**
- User information and settings
- Display names, usernames, avatars
- Created when users sign up

#### 2. **Games**
- Game metadata and information
- Titles, descriptions, slugs
- Thumbnail URLs and play counts

#### 3. **Scores**
- Player scores for each game
- Timestamps and metadata
- Used for leaderboards

#### 4. **Leaderboards**
- Aggregated views of top scores
- Per-game rankings
- Global statistics

#### 5. **Storage (Supabase)**
- Profile pictures (DP bucket)
- Game thumbnails
- Other assets

## 🔐 Security Features

### Row Level Security (RLS)
All tables use PostgreSQL Row Level Security to ensure:
- Users can only update their own profiles
- Users can only submit scores for themselves
- Public data is readable by everyone
- Sensitive operations require authentication

### Storage Policies
- Profile pictures bucket requires authentication to upload
- Public read access for displaying images
- File size limits enforced (500KB for avatars)

## 🚀 For Contributors

**You don't need database access to contribute!**

### What Contributors Need:
- ✅ Fork the repository
- ✅ Build game components locally
- ✅ Submit PRs with game code
- ✅ Provide thumbnails and documentation

### What Maintainers Handle:
- Database setup and migrations
- Game registration in the platform
- Production deployment
- User data management

## 📝 API Endpoints (General)

The platform uses Supabase's auto-generated REST API and real-time subscriptions.

**Common operations:**
- Fetch games list
- Submit scores
- Retrieve leaderboards
- Update user profiles
- Upload profile pictures

**Authentication:** Supabase Auth (email/password)

## 🛠️ Tech Stack

- **Database:** PostgreSQL (via Supabase)
- **ORM/Client:** Supabase JS SDK
- **Authentication:** Supabase Auth
- **Storage:** Supabase Storage (for images)
- **Real-time:** Supabase Realtime (for live leaderboards)

## ❓ Questions?

**For Contributors:**
- Check the main README.md for contribution guidelines
- Open an issue on GitHub for questions

**For Maintainers:**
- Contact repository owner for database access
- Private schema documentation is available separately

## 🔧 Local Development

You can develop and test games **without** database access by:
1. Creating mock data in your game component
2. Testing game logic independently
3. Using placeholder values for scores

The maintainers will integrate your game with the database once the PR is merged.

---

**Remember:** Never commit database credentials, API keys, or schema details to the public repository!
