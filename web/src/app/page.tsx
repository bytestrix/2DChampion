import Link from 'next/link'
import Image from 'next/image'
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
            <div className="absolute top-20 left-10 w-48 sm:w-72 h-48 sm:h-72 bg-[#ff9500]/20 rounded-full blur-3xl animate-float" />
            <div className="absolute top-40 right-10 w-64 sm:w-96 h-64 sm:h-96 bg-[#ffd700]/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
            <div className="absolute bottom-20 left-1/2 w-56 sm:w-80 h-56 sm:h-80 bg-[#00d4ff]/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }} />
            {/* Confetti particles */}
            <div className="absolute top-32 left-1/4 w-2 h-2 bg-[#ffd700] rounded-full animate-float" style={{ animationDelay: '1s' }} />
            <div className="absolute top-48 right-1/4 w-3 h-3 bg-[#ff9500] rounded-full animate-float" style={{ animationDelay: '3s' }} />
            <div className="absolute bottom-32 left-1/3 w-2 h-2 bg-[#00d4ff] rounded-full animate-float" style={{ animationDelay: '5s' }} />
          </div>

          <div className="container mx-auto max-w-7xl px-4">
            <div className="inline-flex items-center space-x-2 px-3 sm:px-4 py-2 rounded-full glass mb-8 sm:mb-12 border border-[#ffd700]/30">
              <Trophy className="w-3 h-3 sm:w-4 sm:h-4 text-[#ffd700] animate-trophy-shine" />
              <span className="text-xs sm:text-sm text-gray-300">Open Source Gaming Championship Platform</span>
              <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-[#ff9500]" />
            </div>

            {/* Logo and Heading Side by Side */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-12">
              {/* Championship Logo */}
              <div className="flex justify-center lg:justify-end order-2 lg:order-1">
                <Image
                  src="/logo.png"
                  alt="2D Champion"
                  width={700}
                  height={280}
                  className="w-full max-w-md lg:max-w-lg xl:max-w-xl animate-float drop-shadow-[0_0_40px_rgba(255,215,0,0.3)]"
                  priority
                />
              </div>

              {/* Text Content */}
              <div className="text-center lg:text-left order-1 lg:order-2">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-black mb-4 sm:mb-6 leading-tight">
                  Play. Compete.
                  <br />
                  <span className="gradient-text">Become Champion.</span>
                </h1>

                <p className="text-base sm:text-lg md:text-xl text-gray-400 mb-8 leading-relaxed max-w-xl lg:max-w-none">
                  Join the ultimate 2D gaming championship where players compete on global leaderboards
                  and developers collaborate to build legendary games. 🏆
                </p>

                <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row items-center lg:items-start xl:items-center gap-3 sm:gap-4">
                  <Link
                    href="/games"
                    className="w-full sm:w-auto group px-6 sm:px-8 py-3 sm:py-4 rounded-full bg-gradient-to-r from-[#ff9500] to-[#ffd700] text-black font-bold text-base sm:text-lg shadow-glow hover:shadow-glow-gold transition-all duration-300 flex items-center justify-center space-x-2"
                  >
                    <Gamepad2 className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span>Start Playing</span>
                    <Zap className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>

                  <Link
                    href="https://github.com/bytestrix/2DChampion"
                    target="_blank"
                    className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 rounded-full glass text-white font-bold text-base sm:text-lg hover:bg-white/10 border border-[#00d4ff]/30 hover:shadow-glow-cyan transition-all duration-300 flex items-center justify-center space-x-2"
                  >
                    <Code2 className="w-4 h-4 sm:w-5 sm:h-5 text-[#00d4ff]" />
                    <span>View on GitHub</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Championship Stats */}
            <div className="grid grid-cols-3 gap-4 sm:gap-8 mt-12 sm:mt-20 max-w-2xl mx-auto">
              <div className="text-center glass rounded-xl p-4 border border-[#ffd700]/20 hover:border-[#ffd700]/50 transition-all">
                <div className="text-2xl sm:text-3xl md:text-4xl font-black gradient-text mb-1 sm:mb-2">{games?.length || 0}+</div>
                <div className="text-xs sm:text-sm md:text-base text-gray-400">Games</div>
              </div>
              <div className="text-center glass rounded-xl p-4 border border-[#ff9500]/20 hover:border-[#ff9500]/50 transition-all">
                <div className="text-2xl sm:text-3xl md:text-4xl font-black gradient-text mb-1 sm:mb-2">1K+</div>
                <div className="text-xs sm:text-sm md:text-base text-gray-400">Players</div>
              </div>
              <div className="text-center glass rounded-xl p-4 border border-[#00d4ff]/20 hover:border-[#00d4ff]/50 transition-all">
                <div className="text-2xl sm:text-3xl md:text-4xl font-black gradient-text-cyan mb-1 sm:mb-2">Open</div>
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
                More than just games. It's a championship platform for players and creators.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
              {/* Feature 1 */}
              <div className="group glass rounded-2xl p-6 sm:p-8 hover:bg-white/5 border border-[#ff9500]/20 hover:border-[#ff9500]/50 transition-all duration-300">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-[#ff9500] to-[#ffd700] flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform shadow-glow">
                  <Gamepad2 className="w-6 h-6 sm:w-7 sm:h-7 text-black" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3">Play Games</h3>
                <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
                  Enjoy a growing collection of 2D games built by the community.
                  All games are free to play, forever.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="group glass rounded-2xl p-6 sm:p-8 hover:bg-white/5 border border-[#ffd700]/20 hover:border-[#ffd700]/50 transition-all duration-300">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-[#ffd700] to-[#ff9500] flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 group-hover:animate-trophy-shine transition-transform shadow-glow-gold">
                  <Trophy className="w-6 h-6 sm:w-7 sm:h-7 text-black" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3">Compete & Win</h3>
                <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
                  Climb the global leaderboards and prove you're the champion.
                  Track your scores across all games.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="group glass rounded-2xl p-6 sm:p-8 hover:bg-white/5 border border-[#00d4ff]/20 hover:border-[#00d4ff]/50 transition-all duration-300">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-[#00d4ff] to-[#0099ff] flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform shadow-glow-cyan">
                  <Code2 className="w-6 h-6 sm:w-7 sm:h-7 text-black" />
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
                Jump right in and start your championship journey! 🎮
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
              {games && games.length > 0 ? (
                games.map((game) => (
                  <Link
                    key={game.id}
                    href={`/games/${game.slug}`}
                    className="group glass rounded-2xl overflow-hidden hover:bg-white/5 border border-[#ff9500]/20 hover:border-[#ffd700]/50 transition-all duration-300"
                  >
                    <div className="aspect-video bg-gradient-to-br from-[#ff9500]/20 to-[#ffd700]/20 flex items-center justify-center relative overflow-hidden">
                      {game.thumbnail_url ? (
                        <img
                          src={game.thumbnail_url}
                          alt={game.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <>
                          <div className="absolute inset-0 bg-gradient-to-br from-[#00d4ff]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                          <Gamepad2 className="w-12 h-12 sm:w-16 sm:h-16 text-[#ffd700]/50 group-hover:text-[#ffd700] group-hover:scale-110 transition-all z-10" />
                        </>
                      )}
                    </div>
                    <div className="p-4 sm:p-6">
                      <h3 className="text-lg sm:text-xl font-bold mb-2 group-hover:text-[#ffd700] transition-colors">
                        {game.title}
                      </h3>
                      <p className="text-sm sm:text-base text-gray-400 mb-3 sm:mb-4">
                        {game.description || 'An exciting 2D game'}
                      </p>
                      <div className="flex items-center justify-between text-xs sm:text-sm text-gray-500">
                        <span>{game.play_count || 0} plays</span>
                        <span className="text-[#ff9500] group-hover:text-[#ffd700] group-hover:translate-x-2 transition-all font-semibold">
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
            <div className="glass rounded-2xl sm:rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden border border-[#ffd700]/30">
              <div className="absolute inset-0 bg-gradient-to-r from-[#ff9500]/10 to-[#ffd700]/10" />
              <div className="relative z-10">
                <Trophy className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 sm:mb-6 text-[#ffd700] animate-trophy-shine" />
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-3 sm:mb-4">
                  Ready to Join the <span className="gradient-text">Championship</span>?
                </h2>
                <p className="text-base sm:text-lg md:text-xl text-gray-400 mb-6 sm:mb-8 max-w-2xl mx-auto px-2">
                  Whether you want to play games, compete on leaderboards, or contribute code,
                  there's a place for you in the arena.
                </p>
                <Link
                  href="/login"
                  className="inline-block px-8 sm:px-10 py-3 sm:py-4 rounded-full bg-gradient-to-r from-[#ff9500] to-[#ffd700] text-black font-bold text-base sm:text-lg shadow-glow hover:shadow-glow-gold transition-all duration-300"
                >
                  Start Your Journey Free
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
