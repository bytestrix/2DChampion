-- 2D Champion Database Schema
-- Run this in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- USERS & PROFILES
-- ============================================

-- Profiles table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID REFERENCES auth.users(id) PRIMARY KEY,
    username TEXT UNIQUE NOT NULL,
    display_name TEXT,
    avatar_url TEXT,
    bio TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    CONSTRAINT username_length CHECK (char_length(username) >= 3 AND char_length(username) <= 20),
    CONSTRAINT username_format CHECK (username ~ '^[a-zA-Z0-9_]+$')
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Public profiles are viewable by everyone"
    ON public.profiles FOR SELECT
    USING (true);

CREATE POLICY "Users can insert their own profile"
    ON public.profiles FOR INSERT
    WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
    ON public.profiles FOR UPDATE
    USING (auth.uid() = id);

-- ============================================
-- GAMES
-- ============================================

CREATE TABLE IF NOT EXISTS public.games (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    thumbnail_url TEXT,
    game_path TEXT NOT NULL, -- Path to game files in your repo
    created_by UUID REFERENCES public.profiles(id),
    is_active BOOLEAN DEFAULT true,
    play_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    CONSTRAINT slug_format CHECK (slug ~ '^[a-z0-9-]+$')
);

ALTER TABLE public.games ENABLE ROW LEVEL SECURITY;

-- Games policies
CREATE POLICY "Games are viewable by everyone"
    ON public.games FOR SELECT
    USING (is_active = true OR auth.uid() = created_by);

CREATE POLICY "Authenticated users can create games"
    ON public.games FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Game creators can update their games"
    ON public.games FOR UPDATE
    USING (auth.uid() = created_by);

-- ============================================
-- SCORES & LEADERBOARD
-- ============================================

CREATE TABLE IF NOT EXISTS public.scores (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    game_id UUID REFERENCES public.games(id) ON DELETE CASCADE,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    score INTEGER NOT NULL,
    metadata JSONB DEFAULT '{}', -- For game-specific data (level, time, etc.)
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    CONSTRAINT score_positive CHECK (score >= 0)
);

-- Create index for leaderboard queries
CREATE INDEX IF NOT EXISTS idx_scores_game_score ON public.scores(game_id, score DESC);
CREATE INDEX IF NOT EXISTS idx_scores_user_game ON public.scores(user_id, game_id);

ALTER TABLE public.scores ENABLE ROW LEVEL SECURITY;

-- Scores policies
CREATE POLICY "Scores are viewable by everyone"
    ON public.scores FOR SELECT
    USING (true);

CREATE POLICY "Authenticated users can insert their own scores"
    ON public.scores FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() = user_id);

-- ============================================
-- CONTRIBUTIONS
-- ============================================

CREATE TABLE IF NOT EXISTS public.contributions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    game_id UUID REFERENCES public.games(id) ON DELETE CASCADE,
    contributor_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    contribution_type TEXT NOT NULL, -- 'code', 'art', 'audio', 'design', 'testing'
    pull_request_url TEXT,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    CONSTRAINT contribution_type_valid CHECK (
        contribution_type IN ('code', 'art', 'audio', 'design', 'testing', 'documentation', 'other')
    )
);

ALTER TABLE public.contributions ENABLE ROW LEVEL SECURITY;

-- Contributions policies
CREATE POLICY "Contributions are viewable by everyone"
    ON public.contributions FOR SELECT
    USING (true);

CREATE POLICY "Authenticated users can create contributions"
    ON public.contributions FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() = contributor_id);

-- ============================================
-- VIEWS FOR LEADERBOARDS
-- ============================================

-- Global leaderboard view (top scores per game)
CREATE OR REPLACE VIEW public.leaderboard AS
SELECT DISTINCT ON (s.game_id, s.user_id)
    s.id,
    s.game_id,
    g.title as game_title,
    g.slug as game_slug,
    s.user_id,
    p.username,
    p.display_name,
    p.avatar_url,
    s.score,
    s.created_at,
    RANK() OVER (PARTITION BY s.game_id ORDER BY s.score DESC) as rank
FROM public.scores s
JOIN public.games g ON s.game_id = g.id
JOIN public.profiles p ON s.user_id = p.id
WHERE g.is_active = true
ORDER BY s.game_id, s.user_id, s.score DESC;

-- User best scores view
CREATE OR REPLACE VIEW public.user_best_scores AS
SELECT DISTINCT ON (user_id, game_id)
    user_id,
    game_id,
    MAX(score) as best_score,
    COUNT(*) as plays
FROM public.scores
GROUP BY user_id, game_id
ORDER BY user_id, game_id, best_score DESC;

-- ============================================
-- FUNCTIONS
-- ============================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers for updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_games_updated_at BEFORE UPDATE ON public.games
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to increment play count
CREATE OR REPLACE FUNCTION increment_play_count(game_id_param UUID)
RETURNS void AS $$
BEGIN
    UPDATE public.games
    SET play_count = play_count + 1
    WHERE id = game_id_param;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to handle new user signup (creates profile automatically)
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
    INSERT INTO public.profiles (id, username, display_name, avatar_url)
    VALUES (
        NEW.id,
        COALESCE(NEW.raw_user_meta_data->>'username', 'user_' || substr(NEW.id::text, 1, 8)),
        COALESCE(NEW.raw_user_meta_data->>'display_name', NEW.email),
        COALESCE(NEW.raw_user_meta_data->>'avatar_url', '')
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile on signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============================================
-- SEED DATA (Initial Games)
-- ============================================

-- Insert initial games (you can modify this after running)
INSERT INTO public.games (slug, title, description, game_path, is_active) VALUES
    ('highway-hero', 'Highway Hero', 'Dodge traffic and survive as long as you can in this exciting highway racing game!', '/games/highway-hero', true),
    ('pixel-python', 'Pixel Python', 'Classic snake game with a modern twist. Eat food, grow longer, and avoid hitting yourself!', '/games/pixel-python', true)
ON CONFLICT (slug) DO NOTHING;

-- ============================================
-- GRANTS (if needed)
-- ============================================

-- Grant access to authenticated users
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO authenticated;
GRANT ALL ON ALL FUNCTIONS IN SCHEMA public TO authenticated;

-- Grant access to anon users (for public viewing)
GRANT USAGE ON SCHEMA public TO anon;
GRANT SELECT ON public.profiles TO anon;
GRANT SELECT ON public.games TO anon;
GRANT SELECT ON public.scores TO anon;
GRANT SELECT ON public.contributions TO anon;
GRANT SELECT ON public.leaderboard TO anon;
GRANT SELECT ON public.user_best_scores TO anon;
