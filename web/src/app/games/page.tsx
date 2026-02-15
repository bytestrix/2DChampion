import Link from 'next/link'
import { Gamepad2, PlayIcon, Trophy } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { createServerClient } from '@/lib/supabase/server'

export default async function GamesPage() {
    const supabase = await createServerClient()


    const { data: games, error } = await supabase
        .from('games')
        .select('*')
        .eq('is_active', true)
        .order('play_count', { ascending: false })

    console.log('Games page - Games:', games)
    console.log('Games page - Error:', error)

    return (
        <>
            <Navbar />

            <main className="min-h-screen pt-20 sm:pt-24 pb-12 sm:pb-20 px-4 sm:px-6">
                <div className="container mx-auto max-w-7xl">
                    {/* Header */}
                    <div className="text-center mb-12 sm:mb-16">
                        <div className="inline-flex items-center space-x-2 px-3 sm:px-4 py-2 rounded-full glass mb-4 sm:mb-6">
                            <Gamepad2 className="w-3 h-3 sm:w-4 sm:h-4 text-purple-400" />
                            <span className="text-xs sm:text-sm text-gray-300">Available Games</span>
                        </div>

                        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-3 sm:mb-4">
                            Play <span className="gradient-text">Amazing Games</span>
                        </h1>
                        <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-2xl mx-auto px-2">
                            All games are free, open-source, and built by the community.
                            Jump in and start playing!
                        </p>
                    </div>

                    {/* Games Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                        {games && games.length > 0 ? (
                            games.map((game: any) => (
                                <Link
                                    key={game.id}
                                    href={`/games/${game.slug}`}
                                    className="group glass rounded-2xl overflow-hidden hover:bg-white/5 transition-all duration-300 hover:scale-105"
                                >
                                    {/* Game Thumbnail */}
                                    <div className="aspect-video bg-gradient-to-br from-purple-500/20 to-pink-500/20 relative overflow-hidden">
                                        {game.thumbnail_url ? (
                                            <img
                                                src={game.thumbnail_url}
                                                alt={game.title}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center">
                                                <Gamepad2 className="w-16 h-16 sm:w-20 sm:h-20 text-white/20 group-hover:scale-110 transition-transform" />
                                            </div>
                                        )}

                                        {/* Play Overlay */}
                                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <div className="flex items-center space-x-2 text-white font-bold text-base sm:text-lg">
                                                <PlayIcon className="w-5 h-5 sm:w-6 sm:h-6 fill-white" />
                                                <span>Play Now</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Game Info */}
                                    <div className="p-4 sm:p-6">
                                        <h3 className="text-xl sm:text-2xl font-bold mb-2 group-hover:text-purple-400 transition-colors">
                                            {game.title}
                                        </h3>
                                        <p className="text-sm sm:text-base text-gray-400 mb-3 sm:mb-4 line-clamp-2">
                                            {game.description || 'An exciting 2D game built by the community'}
                                        </p>

                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-500">
                                                <Trophy className="w-3 h-3 sm:w-4 sm:h-4" />
                                                <span>{game.play_count || 0} plays</span>
                                            </div>

                                            <span className="text-sm sm:text-base text-purple-400 font-semibold group-hover:translate-x-2 transition-transform">
                                                Play →
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            ))
                        ) : (
                            <div className="col-span-full text-center py-16 sm:py-20">
                                <Gamepad2 className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6 text-gray-600" />
                                <h3 className="text-xl sm:text-2xl font-bold mb-2">
                                    {error ? 'Error Loading Games' : 'No Games Available Yet'}
                                </h3>
                                <p className="text-sm sm:text-base text-gray-400 mb-4 sm:mb-6 px-2">
                                    {error ? error.message : 'Be the first to contribute a game to the platform!'}
                                </p>
                                <Link
                                    href="https://github.com/rishibaghel25/2DChampion"
                                    target="_blank"
                                    className="inline-block px-6 sm:px-8 py-3 rounded-full bg-gradient-to-r from-[#6366f1] to-[#ec4899] text-white font-bold text-sm sm:text-base hover:shadow-glow transition-all"
                                >
                                    Contribute a Game
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Call to Action */}
                    <div className="mt-16 sm:mt-20 text-center glass rounded-2xl sm:rounded-3xl p-8 sm:p-12">
                        <h2 className="text-2xl sm:text-3xl font-black mb-3 sm:mb-4">
                            Want to Add Your Game?
                        </h2>
                        <p className="text-sm sm:text-base text-gray-400 mb-4 sm:mb-6 max-w-2xl mx-auto px-2">
                            2D Champion is open source! Create your own 2D game and submit it
                            to be featured on the platform.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
                            <Link
                                href="/docs"
                                className="w-full sm:w-auto px-6 sm:px-8 py-3 rounded-full glass hover:bg-white/10 text-white font-bold text-sm sm:text-base transition-all"
                            >
                                Read Documentation
                            </Link>
                            <Link
                                href="https://github.com/rishibaghel25/2DChampion"
                                target="_blank"
                                className="w-full sm:w-auto px-6 sm:px-8 py-3 rounded-full bg-gradient-to-r from-[#6366f1] to-[#ec4899] text-white font-bold text-sm sm:text-base hover:shadow-glow transition-all"
                            >
                                View on GitHub
                            </Link>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </>
    )
}
