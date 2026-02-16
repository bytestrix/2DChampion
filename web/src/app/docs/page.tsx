import Link from 'next/link'
import { Book, Code2, Gamepad2, Users, Github, Trophy, ArrowRight, Sparkles, Target } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function DocsPage() {
    return (
        <>
            <Navbar />
            <main className="min-h-screen pt-24 pb-20 px-4 sm:px-6">
                <div className="container mx-auto max-w-5xl">
                    {/* Header */}
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full glass mb-6 border border-[#ffd700]/30">
                            <Book className="w-4 h-4 text-[#ff9500]" />
                            <span className="text-sm text-gray-300">Documentation Hub</span>
                        </div>
                        <h1 className="text-5xl md:text-6xl font-black mb-4">
                            2D Champion <span className="gradient-text">Docs</span>
                        </h1>
                        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                            Everything you need to play, compete, and build amazing 2D games on our platform.
                        </p>
                    </div>

                    {/* Main Documentation Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                        {/* For Players */}
                        <Link
                            href="/docs/players"
                            className="group glass p-10 rounded-3xl border border-[#ff9500]/20 hover:border-[#ffd700]/50 transition-all hover:scale-[1.02] duration-300"
                        >
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#ff9500] to-[#ffd700] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-glow">
                                <Gamepad2 className="w-8 h-8 text-black" />
                            </div>
                            <h2 className="text-3xl font-black mb-4 group-hover:text-[#ffd700] transition-colors">
                                For Players
                            </h2>
                            <p className="text-gray-400 mb-6 leading-relaxed">
                                Learn how to play games, compete on leaderboards, track your stats, and become a champion on the platform.
                            </p>

                            <div className="space-y-3 mb-6">
                                <div className="flex items-center text-sm text-gray-300">
                                    <Sparkles className="w-4 h-4 mr-2 text-[#ffd700]" />
                                    Getting Started Guide
                                </div>
                                <div className="flex items-center text-sm text-gray-300">
                                    <Target className="w-4 h-4 mr-2 text-[#ff9500]" />
                                    How to Play Games
                                </div>
                                <div className="flex items-center text-sm text-gray-300">
                                    <Trophy className="w-4 h-4 mr-2 text-[#ffd700]" />
                                    Leaderboards & Stats
                                </div>
                            </div>

                            <div className="inline-flex items-center text-[#ffd700] font-semibold group-hover:translate-x-2 transition-transform">
                                View Player Docs <ArrowRight className="w-5 h-5 ml-2" />
                            </div>
                        </Link>

                        {/* For Developers */}
                        <Link
                            href="/docs/developers"
                            className="group glass p-10 rounded-3xl border border-[#00d4ff]/20 hover:border-[#00d4ff]/50 transition-all hover:scale-[1.02] duration-300"
                        >
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#00d4ff] to-[#0ea5e9] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-glow-cyan">
                                <Code2 className="w-8 h-8 text-black" />
                            </div>
                            <h2 className="text-3xl font-black mb-4 group-hover:text-[#00d4ff] transition-colors">
                                For Developers
                            </h2>
                            <p className="text-gray-400 mb-6 leading-relaxed">
                                Build and contribute 2D games to the platform. Complete technical guides for creating, testing, and submitting games.
                            </p>

                            <div className="space-y-3 mb-6">
                                <div className="flex items-center text-sm text-gray-300">
                                    <Code2 className="w-4 h-4 mr-2 text-[#00d4ff]" />
                                    Development Setup
                                </div>
                                <div className="flex items-center text-sm text-gray-300">
                                    <Book className="w-4 h-4 mr-2 text-[#ff9500]" />
                                    Game Structure & APIs
                                </div>
                                <div className="flex items-center text-sm text-gray-300">
                                    <Github className="w-4 h-4 mr-2 text-[#ffd700]" />
                                    Submission Process
                                </div>
                            </div>

                            <div className="inline-flex items-center text-[#00d4ff] font-semibold group-hover:translate-x-2 transition-transform">
                                View Developer Docs <ArrowRight className="w-5 h-5 ml-2" />
                            </div>
                        </Link>
                    </div>

                    {/* Quick Links Section */}
                    <section className="mb-16">
                        <h2 className="text-3xl font-black mb-6 text-center">Quick Links</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                            <Link
                                href="https://github.com/bytestrix/2DChampion"
                                target="_blank"
                                className="glass p-6 rounded-2xl hover:bg-white/5 border border-white/10 hover:border-[#00d4ff]/50 transition-all group text-center"
                            >
                                <Github className="w-10 h-10 text-[#00d4ff] mb-4 mx-auto group-hover:scale-110 transition-transform" />
                                <h3 className="font-bold text-lg mb-2 group-hover:text-[#00d4ff] transition-colors">GitHub Repo</h3>
                                <p className="text-gray-400 text-sm">View source & contribute</p>
                            </Link>
                            <Link
                                href="/games"
                                className="glass p-6 rounded-2xl hover:bg-white/5 border border-white/10 hover:border-[#ffd700]/50 transition-all group text-center"
                            >
                                <Gamepad2 className="w-10 h-10 text-[#ffd700] mb-4 mx-auto group-hover:scale-110 transition-transform" />
                                <h3 className="font-bold text-lg mb-2 group-hover:text-[#ffd700] transition-colors">Browse Games</h3>
                                <p className="text-gray-400 text-sm">Play available games</p>
                            </Link>
                            <Link
                                href="/leaderboard"
                                className="glass p-6 rounded-2xl hover:bg-white/5 border border-white/10 hover:border-[#ff9500]/50 transition-all group text-center"
                            >
                                <Trophy className="w-10 h-10 text-[#ff9500] mb-4 mx-auto group-hover:scale-110 transition-transform" />
                                <h3 className="font-bold text-lg mb-2 group-hover:text-[#ff9500] transition-colors">Leaderboard</h3>
                                <p className="text-gray-400 text-sm">Top players & scores</p>
                            </Link>
                        </div>
                    </section>

                    {/* Community Section */}
                    <div className="text-center glass p-12 rounded-3xl border border-[#ffd700]/20 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-32 bg-[#ff9500]/10 blur-[100px] rounded-full pointer-events-none" />
                        <div className="relative z-10">
                            <Users className="w-16 h-16 text-[#ffd700] mx-auto mb-6" />
                            <h2 className="text-3xl font-black mb-4">Join Our Community</h2>
                            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
                                2D Champion is an open-source project built by passionate developers and enjoyed by players worldwide. Whether you want to play or contribute, there's a place for you!
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link
                                    href="/login"
                                    className="px-8 py-4 rounded-full bg-gradient-to-r from-[#ff9500] to-[#ffd700] text-black font-bold hover:shadow-glow-gold transition-all inline-flex items-center justify-center"
                                >
                                    <Gamepad2 className="w-5 h-5 mr-2" />
                                    Start Playing
                                </Link>
                                <Link
                                    href="https://github.com/bytestrix/2DChampion"
                                    target="_blank"
                                    className="px-8 py-4 rounded-full glass text-white font-bold hover:bg-white/10 border border-[#00d4ff]/30 hover:shadow-glow-cyan transition-all inline-flex items-center justify-center"
                                >
                                    <Code2 className="w-5 h-5 mr-2" />
                                    Start Building
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    )
}
