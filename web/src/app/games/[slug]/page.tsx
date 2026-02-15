
import { createServerClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import PixelPythonGame from '../../../components/games/PixelPythonGame'
import HighwayHeroGame from '../../../components/games/HighwayHeroGame'
import GameLeaderboard from '../../../components/GameLeaderboard'

interface GamePageProps {
    params: Promise<{
        slug: string
    }>
}

export default async function GamePage({ params }: GamePageProps) {
    const supabase = await createServerClient()
    const { slug } = await params

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

    // Increment play count (server action or just here if possible, but GET requests shouldn't mutate strictly speaking. 
    // Ideally user interaction starts the game and increments count. failing that, we can do it here but let's skip for now to avoid side-effects on render)

    const { data: { user } } = await supabase.auth.getUser()



    return (
        <>
            <Navbar />
            <main className="min-h-screen pt-24 pb-12 px-4 sm:px-6 flex flex-col">
                <div className="container mx-auto max-w-7xl flex-1 flex flex-col">
                    <div className="text-center mb-8">
                        <h1 className="text-4xl md:text-5xl font-black mb-2">
                            {game.title}
                        </h1>
                        <p className="text-gray-400 max-w-2xl mx-auto">
                            {game.description}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                        {/* Game Area */}
                        <div className="lg:col-span-3 flex justify-center items-center bg-black/40 rounded-3xl overflow-hidden border border-white/10 shadow-2xl backdrop-blur-sm relative min-h-[600px]">
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

                        {/* Side Leaderboard */}
                        <div className="lg:col-span-1">
                            <GameLeaderboard gameId={game.id} gameTitle={game.title} />
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    )
}
