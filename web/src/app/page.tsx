import Link from 'next/link'
import { Gamepad2, Trophy, Code2, Users, Sparkles, Zap } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { createServerClient } from '@/lib/supabase/server'

export default async function Home() {
  const supabase = await createServerClient()


  // Fetch featured games with error handling
  const { data: games, error } = await supabase
    .from('games')
    .select('*')
    .eq('is_active', true)
    .limit(3)

  console.log('Games data:', games)
  console.log('Games error:', error)

  return (
    <>
      <Navbar />

      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="relative pt-24 sm:pt-32 pb-12 sm:pb-20 px-4 sm:px-6 overflow-hidden">
          {/* Animated Background */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-20 left-10 w-48 sm:w-72 h-48 sm:h-72 bg-purple-500/20 rounded-full blur-3xl animate-float" />
            <div className="absolute top-40 right-10 w-64 sm:w-96 h-64 sm:h-96 bg-pink-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
            <div className="absolute bottom-20 left-1/2 w-56 sm:w-80 h-56 sm:h-80 bg-blue-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }} />
          </div>

          <div className="container mx-auto text-center max-w-5xl">
            <div className="inline-flex items-center space-x-2 px-3 sm:px-4 py-2 rounded-full glass mb-6 sm:mb-8">
              <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400" />
              <span className="text-xs sm:text-sm text-gray-300">Open Source Gaming Platform</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-black mb-4 sm:mb-6 leading-tight">
              Play. Compete.
              <br />
              <span className="gradient-text">Create Together.</span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-400 mb-8 sm:mb-12 max-w-3xl mx-auto leading-relaxed px-2">
              Join the ultimate 2D gaming community where players compete on global leaderboards
              and developers collaborate to build amazing games.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              <Link
                href="/games"
                className="w-full sm:w-auto group px-6 sm:px-8 py-3 sm:py-4 rounded-full bg-gradient-to-r from-[#6366f1] to-[#ec4899] text-white font-bold text-base sm:text-lg hover:shadow-glow transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <Gamepad2 className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Start Playing</span>
                <Zap className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="https://github.com/rishibaghel25/2DChampion"
                target="_blank"
                className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 rounded-full glass text-white font-bold text-base sm:text-lg hover:bg-white/10 transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <Code2 className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>View on GitHub</span>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 sm:gap-8 mt-12 sm:mt-20 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-2xl sm:text-3xl md:text-4xl font-black gradient-text mb-1 sm:mb-2">{games?.length || 0}+</div>
                <div className="text-xs sm:text-sm md:text-base text-gray-400">Games</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl md:text-4xl font-black gradient-text mb-1 sm:mb-2">1K+</div>
                <div className="text-xs sm:text-sm md:text-base text-gray-400">Players</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl md:text-4xl font-black gradient-text mb-1 sm:mb-2">Open</div>
                <div className="text-xs sm:text-sm md:text-base text-gray-400">Source</div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-12 sm:py-20 px-4 sm:px-6">
          <div className="container mx-auto">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-3 sm:mb-4">
                Why <span className="gradient-text">2D Champion</span>?
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-2xl mx-auto px-2">
                More than just games. It's a community-driven platform for players and creators.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
              {/* Feature 1 */}
              <div className="group glass rounded-2xl p-6 sm:p-8 hover:bg-white/5 transition-all duration-300">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform">
                  <Gamepad2 className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3">Play Games</h3>
                <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
                  Enjoy a growing collection of 2D games built by the community.
                  All games are free to play, forever.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="group glass rounded-2xl p-6 sm:p-8 hover:bg-white/5 transition-all duration-300">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-[#ec4899] to-[#f43f5e] flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform">
                  <Trophy className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3">Compete & Win</h3>
                <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
                  Climb the global leaderboards and prove you're the champion.
                  Track your scores across all games.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="group glass rounded-2xl p-6 sm:p-8 hover:bg-white/5 transition-all duration-300">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-[#10b981] to-[#14b8a6] flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform">
                  <Code2 className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3">Build & Contribute</h3>
                <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
                  Create your own 2D games or improve existing ones.
                  Open source means everyone can contribute!
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Games */}
        <section className="py-12 sm:py-20 px-4 sm:px-6">
          <div className="container mx-auto">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-3 sm:mb-4">
                Featured <span className="gradient-text">Games</span>
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-gray-400">
                Jump right in and start playing!
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
              {games && games.length > 0 ? (
                games.map((game) => (
                  <Link
                    key={game.id}
                    href={`/games/${game.slug}`}
                    className="group glass rounded-2xl overflow-hidden hover:bg-white/5 transition-all duration-300"
                  >
                    <div className="aspect-video bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
                      <Gamepad2 className="w-12 h-12 sm:w-16 sm:h-16 text-white/30 group-hover:scale-110 transition-transform" />
                    </div>
                    <div className="p-4 sm:p-6">
                      <h3 className="text-lg sm:text-xl font-bold mb-2 group-hover:text-purple-400 transition-colors">
                        {game.title}
                      </h3>
                      <p className="text-sm sm:text-base text-gray-400 mb-3 sm:mb-4">
                        {game.description || 'An exciting 2D game'}
                      </p>
                      <div className="flex items-center justify-between text-xs sm:text-sm text-gray-500">
                        <span>{game.play_count || 0} plays</span>
                        <span className="text-purple-400 group-hover:translate-x-2 transition-transform">
                          Play Now →
                        </span>
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <p className="text-gray-400">
                    {error ? `Error loading games: ${error.message}` : 'No games available yet. Check back soon!'}
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 sm:py-20 px-4 sm:px-6">
          <div className="container mx-auto max-w-4xl">
            <div className="glass rounded-2xl sm:rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10" />
              <div className="relative z-10">
                <Users className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 sm:mb-6 text-purple-400" />
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-3 sm:mb-4">
                  Ready to Join the <span className="gradient-text">Community</span>?
                </h2>
                <p className="text-base sm:text-lg md:text-xl text-gray-400 mb-6 sm:mb-8 max-w-2xl mx-auto px-2">
                  Whether you want to play games, compete on leaderboards, or contribute code,
                  there's a place for you here.
                </p>
                <Link
                  href="/login"
                  className="inline-block px-8 sm:px-10 py-3 sm:py-4 rounded-full bg-gradient-to-r from-[#6366f1] to-[#ec4899] text-white font-bold text-base sm:text-lg hover:shadow-glow transition-all duration-300"
                >
                  Get Started Free
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
