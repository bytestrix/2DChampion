
import { createServerClient } from '@/lib/supabase/server'
import { notFound, redirect } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import PixelPythonGame from '../../../components/games/PixelPythonGame'
import HighwayHeroGame from '../../../components/games/HighwayHeroGame'
import GameLeaderboard from '../../../components/GameLeaderboard'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

interface GamePageProps {
    params: Promise<{
        slug: string
    }>
}

export default async function GamePage({ params }: GamePageProps) {
    const supabase = await createServerClient()
    const { slug } = await params

    // Check authentication - redirect to login if not authenticated
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        redirect(`/login?redirect=/games/${slug}`)
    }

    // Fetch game details
    let { data: game, error } = await supabase
        .from('games')
        .select('*')
        .eq('slug', slug)
        .single()

    // Fallback if game not found in DB (for demo purposes)
    if (!game) {
        if (slug === 'pixel-python') {
            game = {
                id: 'pixel-python-id', // Mock ID
                slug: 'pixel-python',
                title: 'Pixel Python',
                description: 'Classic snake game with a modern twist. Eat food, grow longer, and avoid hitting yourself!',
                thumbnail_url: '/games/pixel-python-thumb.png'
            }
        } else if (slug === 'highway-hero') {
            game = {
                id: 'highway-hero-id', // Mock ID
                slug: 'highway-hero',
                title: 'Highway Hero',
                description: 'Dodge traffic and survive as long as you can in this exciting highway racing game!',
                thumbnail_url: '/games/highway-hero-thumb.png'
            }
        }
    }

    if (!game) {
        console.error('Game not found:', slug, error)
        notFound()
    }

    return (
        <>
            <Navbar />
            <main className="min-h-screen pt-20 sm:pt-24 pb-12 px-4 sm:px-6">
                <div className="container mx-auto max-w-7xl">
                    {/* Header with Back Button */}
                    <div className="mb-6 sm:mb-8">
                        <Link
                            href="/games"
                            className="inline-flex items-center space-x-2 text-gray-400 hover:text-[#ffd700] transition-colors mb-4 group"
                        >
                            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                            <span className="font-medium">Back to Games</span>
                        </Link>
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black mb-2">
                            {game.title}
                        </h1>
                        <p className="text-gray-400 max-w-2xl">
                            {game.description}
                        </p>
                    </div>

                    {/* Game Layout - Responsive Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
                        {/* Game Area */}
                        <div className="lg:col-span-3 order-1 lg:order-1">
                            <div className="flex justify-center items-center bg-black/40 rounded-3xl overflow-hidden border border-white/10 shadow-2xl backdrop-blur-sm relative min-h-[400px] sm:min-h-[600px]">
                                {/* Render Game Component Based on Slug */}
                                {slug === 'pixel-python' ? (
                                    <PixelPythonGame gameId={game.id} userId={user?.id} />
                                ) : slug === 'highway-hero' ? (
                                    <HighwayHeroGame gameId={game.id} userId={user?.id} />
                                ) : (
                                    <div className="text-center p-12">
                                        <h3 className="text-2xl font-bold text-white mb-4">Game Not Implemented Yet</h3>
                                        <p className="text-gray-400">The game "{game.title}" is listed but the component is missing.</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Side Leaderboard - Scrollable on Mobile */}
                        <div className="lg:col-span-1 order-2 lg:order-2">
                            <div className="lg:sticky lg:top-24">
                                <GameLeaderboard gameId={game.id} gameTitle={game.title} />
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    )
}
