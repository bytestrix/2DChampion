import Link from 'next/link'
import { Gamepad2, Trophy, User, Lock, Zap, Target, Award, Activity, ArrowLeft, Sparkles } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function PlayersDocsPage() {
    return (
        <>
            <Navbar />
            <main className="min-h-screen pt-24 pb-20 px-4 sm:px-6">
                <div className="container mx-auto max-w-4xl">
                    {/* Back Link */}
                    <Link
                        href="/docs"
                        className="inline-flex items-center text-gray-400 hover:text-[#ffd700] mb-8 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Docs
                    </Link>

                    {/* Header */}
                    <div className="mb-12">
                        <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full glass mb-6 border border-[#ffd700]/30">
                            <Gamepad2 className="w-4 h-4 text-[#ff9500]" />
                            <span className="text-sm text-gray-300">Player Guide</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black mb-4">
                            <span className="gradient-text">Player</span> Documentation
                        </h1>
                        <p className="text-xl text-gray-400">
                            Everything you need to know to start playing, competing, and becoming a champion! 🏆
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
                        <a href="#getting-started" className="glass p-4 rounded-xl border border-[#ff9500]/20 hover:border-[#ffd700]/50 transition-all text-center group">
                            <Sparkles className="w-6 h-6 text-[#ffd700] mx-auto mb-2 group-hover:scale-110 transition-transform" />
                            <p className="font-semibold text-sm">Getting Started</p>
                        </a>
                        <a href="#gameplay" className="glass p-4 rounded-xl border border-[#ff9500]/20 hover:border-[#ffd700]/50 transition-all text-center group">
                            <Target className="w-6 h-6 text-[#ff9500] mx-auto mb-2 group-hover:scale-110 transition-transform" />
                            <p className="font-semibold text-sm">How to Play</p>
                        </a>
                        <a href="#leaderboards" className="glass p-4 rounded-xl border border-[#ff9500]/20 hover:border-[#ffd700]/50 transition-all text-center group">
                            <Trophy className="w-6 h-6 text-[#ffd700] mx-auto mb-2 group-hover:scale-110 transition-transform" />
                            <p className="font-semibold text-sm">Leaderboards</p>
                        </a>
                    </div>

                    {/* Getting Started Section */}
                    <section id="getting-started" className="mb-12">
                        <h2 className="text-3xl font-black mb-6 flex items-center">
                            <Sparkles className="w-8 h-8 text-[#ffd700] mr-3" />
                            Getting Started
                        </h2>
                        <div className="glass p-8 rounded-2xl border border-white/10 mb-6">
                            <h3 className="text-xl font-bold mb-4 text-[#ffd700]">Create Your Account</h3>
                            <ol className="space-y-4 text-gray-300">
                                <li className="flex">
                                    <span className="w-8 h-8 rounded-full bg-gradient-to-r from-[#ff9500] to-[#ffd700] flex items-center justify-center text-black font-bold mr-4 flex-shrink-0">1</span>
                                    <div>
                                        <p className="font-semibold text-white">Visit the Sign Up Page</p>
                                        <p className="text-gray-400">Click on "Sign In" button in the navbar and select "Sign Up".</p>
                                    </div>
                                </li>
                                <li className="flex">
                                    <span className="w-8 h-8 rounded-full bg-gradient-to-r from-[#ff9500] to-[#ffd700] flex items-center justify-center text-black font-bold mr-4 flex-shrink-0">2</span>
                                    <div>
                                        <p className="font-semibold text-white">Enter Your Details</p>
                                        <p className="text-gray-400">Provide a unique username, your email address, and a secure password.</p>
                                    </div>
                                </li>
                                <li className="flex">
                                    <span className="w-8 h-8 rounded-full bg-gradient-to-r from-[#ff9500] to-[#ffd700] flex items-center justify-center text-black font-bold mr-4 flex-shrink-0">3</span>
                                    <div>
                                        <p className="font-semibold text-white">Verify Your Email</p>
                                        <p className="text-gray-400">Check your inbox for a verification email and click the link to activate your account.</p>
                                    </div>
                                </li>
                                <li className="flex">
                                    <span className="w-8 h-8 rounded-full bg-gradient-to-r from-[#ff9500] to-[#ffd700] flex items-center justify-center text-black font-bold mr-4 flex-shrink-0">4</span>
                                    <div>
                                        <p className="font-semibold text-white">Start Playing!</p>
                                        <p className="text-gray-400">Once verified, sign in and explore the games library.</p>
                                    </div>
                                </li>
                            </ol>
                        </div>
                    </section>

                    {/* How to Play Section */}
                    <section id="gameplay" className="mb-12">
                        <h2 className="text-3xl font-black mb-6 flex items-center">
                            <Target className="w-8 h-8 text-[#ff9500] mr-3" />
                            How to Play Games
                        </h2>

                        <div className="space-y-6">
                            {/* Browsing Games */}
                            <div className="glass p-6 rounded-2xl border border-white/10">
                                <h3 className="text-xl font-bold mb-3 text-white flex items-center">
                                    <Gamepad2 className="w-5 h-5 mr-2 text-[#ffd700]" />
                                    Browsing Games
                                </h3>
                                <ul className="space-y-2 text-gray-400">
                                    <li className="flex items-start">
                                        <span className="text-[#ffd700] mr-2">•</span>
                                        Navigate to the <strong className="text-white">Games</strong> page from the navbar
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-[#ffd700] mr-2">•</span>
                                        Browse through the collection of available 2D games
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-[#ffd700] mr-2">•</span>
                                        Click on any game card to see details and start playing
                                    </li>
                                </ul>
                            </div>

                            {/* Playing a Game */}
                            <div className="glass p-6 rounded-2xl border border-white/10">
                                <h3 className="text-xl font-bold mb-3 text-white flex items-center">
                                    <Zap className="w-5 h-5 mr-2 text-[#ff9500]" />
                                    Playing a Game
                                </h3>
                                <ul className="space-y-2 text-gray-400">
                                    <li className="flex items-start">
                                        <span className="text-[#ffd700] mr-2">•</span>
                                        Each game has specific <strong className="text-white">controls</strong> displayed on the game page
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-[#ffd700] mr-2">•</span>
                                        Most games support both <strong className="text-white">keyboard</strong> and <strong className="text-white">touch controls</strong> for mobile
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-[#ffd700] mr-2">•</span>
                                        Your score is automatically tracked and saved to your profile
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-[#ffd700] mr-2">•</span>
                                        Try to beat your personal best and climb the leaderboards!
                                    </li>
                                </ul>
                            </div>

                            {/* Scoring System */}
                            <div className="glass p-6 rounded-2xl border border-[#ffd700]/20">
                                <h3 className="text-xl font-bold mb-3 text-white flex items-center">
                                    <Activity className="w-5 h-5 mr-2 text-[#ffd700]" />
                                    Scoring System
                                </h3>
                                <ul className="space-y-2 text-gray-400">
                                    <li className="flex items-start">
                                        <span className="text-[#ffd700] mr-2">•</span>
                                        Each game has its own unique scoring mechanics
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-[#ffd700] mr-2">•</span>
                                        Only your <strong className="text-white">best score</strong> for each game is saved
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-[#ffd700] mr-2">•</span>
                                        View your total score and stats on your profile page
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-[#ffd700] mr-2">•</span>
                                        Your level increases based on your total score across all games
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* Leaderboards Section */}
                    <section id="leaderboards" className="mb-12">
                        <h2 className="text-3xl font-black mb-6 flex items-center">
                            <Trophy className="w-8 h-8 text-[#ffd700] mr-3" />
                            Leaderboards & Competition
                        </h2>

                        <div className="glass p-8 rounded-2xl border border-white/10 mb-6">
                            <h3 className="text-xl font-bold mb-4 text-[#ffd700]">How Leaderboards Work</h3>
                            <div className="space-y-4 text-gray-300">
                                <p>
                                    2D Champion features both <strong className="text-white">global leaderboards</strong> and <strong className="text-white">per-game leaderboards</strong> to showcase the best players on the platform.
                                </p>
                                <ul className="space-y-2">
                                    <li className="flex items-start">
                                        <Award className="w-5 h-5 text-[#ffd700] mr-2 mt-0.5 flex-shrink-0" />
                                        <div>
                                            <strong className="text-white">Global Leaderboard:</strong> Ranks players by their total score across all games
                                        </div>
                                    </li>
                                    <li className="flex items-start">
                                        <Award className="w-5 h-5 text-[#ff9500] mr-2 mt-0.5 flex-shrink-0" />
                                        <div>
                                            <strong className="text-white">Game Leaderboards:</strong> Shows top scores for individual games
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="glass p-6 rounded-2xl border border-white/10">
                            <h3 className="text-xl font-bold mb-3 text-white">Tips for Climbing the Ranks</h3>
                            <ul className="space-y-2 text-gray-400">
                                <li className="flex items-start">
                                    <span className="text-[#ffd700] mr-2">✓</span>
                                    Play multiple games to increase your total score
                                </li>
                                <li className="flex items-start">
                                    <span className="text-[#ffd700] mr-2">✓</span>
                                    Practice to master game mechanics and beat your personal best
                                </li>
                                <li className="flex items-start">
                                    <span className="text-[#ffd700] mr-2">✓</span>
                                    Check back regularly - new games are added by the community!
                                </li>
                                <li className="flex items-start">
                                    <span className="text-[#ffd700] mr-2">✓</span>
                                    Compete with friends and challenge them to beat your scores
                                </li>
                            </ul>
                        </div>
                    </section>

                    {/* Profile & Account Section */}
                    <section id="profile" className="mb-12">
                        <h2 className="text-3xl font-black mb-6 flex items-center">
                            <User className="w-8 h-8 text-[#00d4ff] mr-3" />
                            Your Profile & Stats
                        </h2>

                        <div className="glass p-8 rounded-2xl border border-white/10">
                            <p className="text-gray-300 mb-4">
                                Your profile page shows all your gaming achievements and statistics:
                            </p>
                            <ul className="space-y-2 text-gray-400">
                                <li className="flex items-start">
                                    <span className="text-[#ffd700] mr-2">•</span>
                                    <strong className="text-white">Total Score:</strong> Cumulative score across all games
                                </li>
                                <li className="flex items-start">
                                    <span className="text-[#ffd700] mr-2">•</span>
                                    <strong className="text-white">Player Level:</strong> Based on your total score
                                </li>
                                <li className="flex items-start">
                                    <span className="text-[#ffd700] mr-2">•</span>
                                    <strong className="text-white">Total Plays:</strong> Number of game sessions completed
                                </li>
                                <li className="flex items-start">
                                    <span className="text-[#ffd700] mr-2">•</span>
                                    <strong className="text-white">Best Scores:</strong> Your highest score for each game you've played
                                </li>
                                <li className="flex items-start">
                                    <span className="text-[#ffd700] mr-2">•</span>
                                    <strong className="text-white">Profile Picture:</strong> Customize with your own avatar
                                </li>
                            </ul>
                        </div>
                    </section>

                    {/* CTA */}
                    <div className="text-center glass p-12 rounded-3xl border border-[#ffd700]/20">
                        <Trophy className="w-16 h-16 text-[#ffd700] mx-auto mb-4 animate-trophy-shine" />
                        <h2 className="text-3xl font-black mb-4">Ready to Become a Champion?</h2>
                        <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
                            Start playing now and compete with players from around the world!
                        </p>
                        <Link
                            href="/games"
                            className="inline-flex items-center px-8 py-4 rounded-full bg-gradient-to-r from-[#ff9500] to-[#ffd700] text-black font-bold hover:shadow-glow-gold transition-all"
                        >
                            <Gamepad2 className="w-5 h-5 mr-2" />
                            Start Playing Now
                        </Link>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    )
}
