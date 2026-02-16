
import { createServerClient } from '@/lib/supabase/server'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Trophy, Medal, Crown } from 'lucide-react'
import Image from 'next/image'

export const dynamic = 'force-dynamic'

export default async function LeaderboardPage() {
    const supabase = await createServerClient()

    const { data: games } = await supabase
        .from('games')
        .select('*')
        .eq('is_active', true)
        .order('title')

    const { data: leaderboard, error } = await supabase
        .from('leaderboard')
        .select('*')
        .order('score', { ascending: false })

    // Group scores by game
    const scoresByGame = games?.reduce((acc: any, game: any) => {
        acc[game.title] = leaderboard?.filter((s: any) => s.game_id === game.id) || []
        return acc
    }, {}) || {}

    return (
        <>
            <Navbar />
            <main className="min-h-screen pt-24 pb-20 px-4 sm:px-6">
                <div className="container mx-auto max-w-6xl">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full glass mb-6">
                            <Trophy className="w-4 h-4 text-yellow-500" />
                            <span className="text-sm text-gray-300">Global Rankings</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black mb-4">
                            Global <span className="gradient-text">Leaderboard</span>
                        </h1>
                        <p className="text-xl text-gray-400">
                            See who's dominating the charts in our community games.
                        </p>
                    </div>

                    {error && (
                        <div className="text-center p-8 bg-red-500/10 rounded-2xl border border-red-500/20 text-red-200 mb-8">
                            Error loading leaderboard: {error.message}
                        </div>
                    )}

                    <div className="space-y-16">
                        {Object.entries(scoresByGame).map(([gameTitle, scores]: [string, any]) => (
                            <div key={gameTitle} className="glass rounded-3xl p-8 overflow-hidden relative">
                                <div className="absolute top-0 right-0 p-32 bg-[#ff9500]/10 blur-[100px] rounded-full pointer-events-none" />

                                <div className="flex items-center space-x-4 mb-8">
                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#ff9500] to-[#ffd700] flex items-center justify-center shadow-lg shadow-[#ffd700]/20">
                                        <Trophy className="w-6 h-6 text-black" />
                                    </div>
                                    <h2 className="text-3xl font-bold text-white">{gameTitle}</h2>
                                </div>

                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead>
                                            <tr className="border-b border-white/10">
                                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Rank</th>
                                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Player</th>
                                                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-400">Score</th>
                                                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-400">Date</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {scores.slice(0, 10).map((entry: any, index: number) => {
                                                const RankIcon = index === 0 ? Crown : index === 1 ? Medal : index === 2 ? Medal : null
                                                const rankColor = index === 0 ? 'text-yellow-400' : index === 1 ? 'text-gray-300' : index === 2 ? 'text-amber-600' : 'text-gray-500'

                                                return (
                                                    <tr
                                                        key={entry.id}
                                                        className="group hover:bg-white/5 transition-colors border-b border-white/5 last:border-0"
                                                    >
                                                        <td className="px-6 py-4">
                                                            <div className={`flex items-center space-x-2 font-bold ${rankColor}`}>
                                                                <span className="w-6 text-center">{index + 1}</span>
                                                                {RankIcon && <RankIcon className="w-4 h-4" />}
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            <div className="flex items-center space-x-3">
                                                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-700 to-gray-600 overflow-hidden relative">
                                                                    {entry.avatar_url ? (
                                                                        <Image
                                                                            src={entry.avatar_url}
                                                                            alt={entry.display_name || entry.username}
                                                                            fill
                                                                            className="object-cover"
                                                                        />
                                                                    ) : (
                                                                        <div className="w-full h-full flex items-center justify-center text-[10px] font-bold">
                                                                            {(entry.display_name || entry.username || 'U')[0].toUpperCase()}
                                                                        </div>
                                                                    )}
                                                                </div>
                                                                <div className="flex flex-col">
                                                                    <span className="font-medium text-white group-hover:text-[#ffd700] transition-colors">
                                                                        {entry.display_name || entry.username || 'Anonymous'}
                                                                    </span>
                                                                    <span className="text-xs text-gray-500">
                                                                        @{entry.username || 'user'}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4 text-right">
                                                            <span className="font-mono font-bold text-lg text-[#ffd700]">
                                                                {entry.score.toLocaleString()}
                                                            </span>
                                                        </td>
                                                        <td className="px-6 py-4 text-right text-sm text-gray-500">
                                                            {new Date(entry.created_at).toLocaleDateString()}
                                                        </td>
                                                    </tr>
                                                )
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        ))}

                        {Object.keys(scoresByGame).length === 0 && !error && (
                            <div className="text-center py-20 text-gray-500">
                                <Trophy className="w-16 h-16 mx-auto mb-4 opacity-20" />
                                <p className="text-xl">No scores recorded yet. Be the first!</p>
                            </div>
                        )}
                    </div>
                </div>
            </main>
            <Footer />
        </>
    )
}
