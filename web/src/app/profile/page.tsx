
import { createServerClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { User, Trophy, Calendar, Settings, LogOut, Upload, Gamepad2 } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import ProfilePictureUpload from '@/components/ProfilePictureUpload'

export default async function ProfilePage() {
    const supabase = await createServerClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        redirect('/login')
    }

    // Fetch user profile
    const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

    // Fetch user's best scores
    const { data: bestScores } = await supabase
        .from('user_best_scores')
        .select(`
            best_score,
            plays,
            game_id,
            games (
                title,
                slug,
                thumbnail_url
            )
        `)
        .eq('user_id', user.id)
        .order('best_score', { ascending: false })

    // Fetch total play count across all games (sum of plays from best scores view might be inaccurate if view only has one row per game, but it has 'plays' count column)
    const totalPlays = bestScores?.reduce((acc, curr) => acc + (curr.plays || 0), 0) || 0
    const totalScore = bestScores?.reduce((acc, curr) => acc + (curr.best_score || 0), 0) || 0

    return (
        <>
            <Navbar />
            <main className="min-h-screen pt-24 pb-20 px-4 sm:px-6">
                <div className="container mx-auto max-w-5xl">

                    {/* Profile Header */}
                    <div className="glass rounded-3xl p-8 sm:p-12 mb-12 relative overflow-hidden border border-[#ffd700]/10">
                        <div className="absolute top-0 right-0 p-32 bg-[#ff9500]/10 blur-[100px] rounded-full pointer-events-none" />

                        <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
                            <ProfilePictureUpload
                                userId={user.id}
                                currentAvatarUrl={profile?.avatar_url}
                                username={profile?.username || user.email?.split('@')[0] || 'User'}
                            />

                            <div className="flex-1 text-center md:text-left">
                                <h1 className="text-3xl md:text-4xl font-black mb-2">
                                    {profile?.display_name || 'Player'}
                                </h1>
                                <p className="text-[#ff9500] font-mono mb-4">
                                    @{profile?.username || 'username'}
                                </p>
                                <div className="flex flex-wrap justify-center md:justify-start gap-4">
                                    <div className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 flex items-center space-x-2">
                                        <Trophy className="w-4 h-4 text-yellow-500" />
                                        <span className="text-sm font-medium">Score: {totalScore.toLocaleString()}</span>
                                    </div>
                                    <div className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 flex items-center space-x-2">
                                        <Settings className="w-4 h-4 text-gray-400" />
                                        <span className="text-sm font-medium">Level {Math.floor(totalScore / 1000) + 1}</span>
                                    </div>
                                    <div className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 flex items-center space-x-2">
                                        <Calendar className="w-4 h-4 text-blue-400" />
                                        <span className="text-sm font-medium">Joined {new Date(user.created_at).toLocaleDateString()}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col gap-3">
                                <form action="/auth/signout" method="post">
                                    <button
                                        className="px-6 py-3 rounded-full bg-white/5 hover:bg-red-500/20 text-white border border-white/10 hover:border-red-500/50 transition-all flex items-center space-x-2"
                                    >
                                        <LogOut className="w-4 h-4" />
                                        <span>Sign Out</span>
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                        <div className="glass p-6 rounded-2xl border border-white/10">
                            <h3 className="text-gray-400 text-sm font-medium mb-1">Total Plays</h3>
                            <p className="text-3xl font-black text-white">{totalPlays}</p>
                            <p className="text-xs text-gray-500 mt-1">Game sessions</p>
                        </div>
                        <div className="glass p-6 rounded-2xl border border-white/10">
                            <h3 className="text-gray-400 text-sm font-medium mb-1">Highest Score</h3>
                            <p className="text-3xl font-black text-[#ffd700]">
                                {Math.max(...(bestScores?.map(s => s.best_score) || [0])).toLocaleString()}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">Personal best</p>
                        </div>
                        <div className="glass p-6 rounded-2xl border border-white/10">
                            <h3 className="text-gray-400 text-sm font-medium mb-1">Unique Games</h3>
                            <p className="text-3xl font-black text-[#00d4ff]">
                                {bestScores?.length || 0}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">Games played</p>
                        </div>
                    </div>

                    {/* Recent Activity / Best Scores */}
                    <h2 className="text-2xl font-bold mb-6 flex items-center space-x-3">
                        <Trophy className="w-6 h-6 text-yellow-500" />
                        <span>Your Best Scores</span>
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {bestScores && bestScores.length > 0 ? (
                            bestScores.map((score: any) => (
                                <Link
                                    key={score.game_id}
                                    href={`/games/${score.games.slug}`}
                                    className="glass p-6 rounded-2xl hover:bg-white/5 transition-all group border border-white/10 hover:border-[#ffd700]/50"
                                >
                                    <div className="flex items-center space-x-4">
                                        <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-gray-800 to-gray-700 overflow-hidden relative shadow-lg">
                                            {score.games.thumbnail_url ? (
                                                <img
                                                    src={score.games.thumbnail_url}
                                                    alt={score.games.title}
                                                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center">
                                                    <Trophy className="w-6 h-6 text-gray-600" />
                                                </div>
                                            )}
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-lg group-hover:text-[#ffd700] transition-colors">
                                                {score.games.title}
                                            </h3>
                                            <div className="flex items-center space-x-4 text-sm text-gray-400">
                                                <span>Score: <b className="text-white">{score.best_score.toLocaleString()}</b></span>
                                                <span>Plays: {score.plays}</span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))
                        ) : (
                            <div className="col-span-full py-12 text-center glass rounded-2xl border-dashed border-white/10">
                                <p className="text-gray-400 mb-4">You haven't played any games yet.</p>
                                <Link
                                    href="/games"
                                    className="px-6 py-3 rounded-full bg-gradient-to-r from-[#ff9500] to-[#ffd700] text-black font-bold hover:shadow-glow-gold transition-all inline-flex items-center space-x-2"
                                >
                                    <Gamepad2 className="w-5 h-5" />
                                    <span>Start Playing</span>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </main>
            <Footer />
        </>
    )
}
