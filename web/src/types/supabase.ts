// TypeScript types for Supabase database
// This is a simplified version. You can generate the full types using Supabase CLI

export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export interface Database {
    public: {
        Tables: {
            profiles: {
                Row: {
                    id: string
                    username: string
                    display_name: string | null
                    avatar_url: string | null
                    bio: string | null
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id: string
                    username: string
                    display_name?: string | null
                    avatar_url?: string | null
                    bio?: string | null
                    created_at?: string
                    updated_at?: string
                }
                Update: {
                    id?: string
                    username?: string
                    display_name?: string | null
                    avatar_url?: string | null
                    bio?: string | null
                    created_at?: string
                    updated_at?: string
                }
            }
            games: {
                Row: {
                    id: string
                    slug: string
                    title: string
                    description: string | null
                    thumbnail_url: string | null
                    game_path: string
                    created_by: string | null
                    is_active: boolean
                    play_count: number
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id?: string
                    slug: string
                    title: string
                    description?: string | null
                    thumbnail_url?: string | null
                    game_path: string
                    created_by?: string | null
                    is_active?: boolean
                    play_count?: number
                    created_at?: string
                    updated_at?: string
                }
                Update: {
                    id?: string
                    slug?: string
                    title?: string
                    description?: string | null
                    thumbnail_url?: string | null
                    game_path?: string
                    created_by?: string | null
                    is_active?: boolean
                    play_count?: number
                    created_at?: string
                    updated_at?: string
                }
            }
            scores: {
                Row: {
                    id: string
                    game_id: string
                    user_id: string
                    score: number
                    metadata: Json
                    created_at: string
                }
                Insert: {
                    id?: string
                    game_id: string
                    user_id: string
                    score: number
                    metadata?: Json
                    created_at?: string
                }
                Update: {
                    id?: string
                    game_id?: string
                    user_id?: string
                    score?: number
                    metadata?: Json
                    created_at?: string
                }
            }
            contributions: {
                Row: {
                    id: string
                    game_id: string
                    contributor_id: string
                    contribution_type: string
                    pull_request_url: string | null
                    description: string | null
                    created_at: string
                }
                Insert: {
                    id?: string
                    game_id: string
                    contributor_id: string
                    contribution_type: string
                    pull_request_url?: string | null
                    description?: string | null
                    created_at?: string
                }
                Update: {
                    id?: string
                    game_id?: string
                    contributor_id?: string
                    contribution_type?: string
                    pull_request_url?: string | null
                    description?: string | null
                    created_at?: string
                }
            }
        }
        Views: {
            leaderboard: {
                Row: {
                    id: string
                    game_id: string
                    game_title: string
                    game_slug: string
                    user_id: string
                    username: string
                    display_name: string | null
                    avatar_url: string | null
                    score: number
                    created_at: string
                    rank: number
                }
            }
        }
        Functions: {
            increment_play_count: {
                Args: { game_id_param: string }
                Returns: void
            }
        }
    }
}
