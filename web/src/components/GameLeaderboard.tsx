
'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Trophy, Medal, Crown } from 'lucide-react'
import Image from 'next/image'

interface GameLeaderboardProps {
    gameId?: string
    gameTitle?: string
}

export default function GameLeaderboard({ gameId, gameTitle }: GameLeaderboardProps) {
    const [scores, setScores] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const supabase = createClient()

    useEffect(() => {
        if (!gameId) {
            setLoading(false)
            return
        }

        const fetchLeaderboard = async () => {
            const { data, error } = await supabase
                .from('leaderboard')
                .select('*')
                .eq('game_id', gameId)
                .order('score', { ascending: false })
                .limit(10)

            if (!error && data) {
                setScores(data)
            }
            setLoading(false)
        }

        fetchLeaderboard()

        // Optional: Subscription for realtime?
        // For now, simpler is better.
    }, [gameId])

    if (loading) return <div className="text-gray-400 text-sm animate-pulse">Loading rankings...</div>
    if (!gameId) return null

    return (
        <div className="glass rounded-xl p-6 border border-white/10 h-fit">
            <div className="flex items-center space-x-2 mb-6 border-b border-white/10 pb-4">
                <Trophy className="w-5 h-5 text-yellow-500" />
                <h3 className="font-bold text-lg text-white">Top Champions</h3>
            </div>

            <div className="space-y-4">
                {scores.map((entry, index) => {
                    const RankIcon = index === 0 ? Crown : index === 1 ? Medal : index === 2 ? Medal : null
                    const rankColor = index === 0 ? 'text-yellow-400' : index === 1 ? 'text-gray-300' : index === 2 ? 'text-amber-600' : 'text-gray-500'

                    return (
                        <div key={entry.id} className="flex items-center justify-between group">
                            <div className="flex items-center space-x-3">
                                <span className={`font-mono font-bold w-6 text-center ${rankColor}`}>
                                    {index + 1}
                                </span>

                                <div className="w-8 h-8 rounded-full bg-gray-700 overflow-hidden relative border border-white/10">
                                    {entry.avatar_url ? (
                                        <Image
                                            src={entry.avatar_url}
                                            alt={entry.display_name || 'User'}
                                            fill
                                            className="object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-xs font-bold text-gray-500">
                                            {(entry.display_name?.[0] || 'U').toUpperCase()}
                                        </div>
                                    )}
                                </div>

                                <div className="flex flex-col">
                                    <span className="text-sm font-medium text-white group-hover:text-purple-300 transition-colors truncate max-w-[100px]">
                                        {entry.display_name || entry.username || 'Anonymous'}
                                    </span>
                                </div>
                            </div>

                            <span className="font-mono font-bold text-purple-400 text-sm">
                                {entry.score.toLocaleString()}
                            </span>
                        </div>
                    )
                })}

                {scores.length === 0 && (
                    <div className="text-center py-8 text-gray-500 text-sm">
                        No scores yet. Be the first!
                    </div>
                )}
            </div>
        </div>
    )
}
