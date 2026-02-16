import Link from 'next/link'
import { Book, Code2, Gamepad2, Users, FileCode, Github, Trophy, ArrowRight } from 'lucide-react'
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
                            <span className="text-sm text-gray-300">Documentation</span>
                        </div>
                        <h1 className="text-5xl md:text-6xl font-black mb-4">
                            2D Champion <span className="gradient-text">Docs</span>
                        </h1>
                        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                            Learn how to play games, contribute to the platform, and build your own 2D games.
                        </p>
                    </div>

                    {/* Quick Start Sections */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
                        {/* For Players */}
                        <div className="glass p-8 rounded-3xl border border-[#ff9500]/20 hover:border-[#ffd700]/50 transition-all">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#ff9500] to-[#ffd700] flex items-center justify-center mb-4">
                                <Gamepad2 className="w-6 h-6 text-black" />
                            </div>
                            <h2 className="text-2xl font-bold mb-3">For Players</h2>
                            <p className="text-gray-400 mb-4">
                                Start playing games, compete on leaderboards, and become a champion.
                            </p>
                            <div className="space-y-3">
                                <Link
                                    href="#getting-started"
                                    className="inline-flex items-center text-[#ffd700] hover:text-[#ff9500] font-medium transition-colors"
                                >
                                    Get Started <ArrowRight className="w-4 h-4 ml-2" />
                                </Link>
                                <p className="text-xs text-gray-500">Learn how to play and compete</p>
                            </div>
                        </div>

                        {/* For Developers */}
                        <div className="glass p-8 rounded-3xl border border-[#00d4ff]/20 hover:border-[#00d4ff]/50 transition-all">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#00d4ff] to-[#0ea5e9] flex items-center justify-center mb-4">
                                <Code2 className="w-6 h-6 text-black" />
                            </div>
                            <h2 className="text-2xl font-bold mb-3">For Developers</h2>
                            <p className="text-gray-400 mb-4">
                                Build and contribute 2D games to the platform. Open source and collaborative.
                            </p>
                            <div className="space-y-3">
                                <Link
                                    href="#contributing"
                                    className="inline-flex items-center text-[#00d4ff] hover:text-[#0ea5e9] font-medium transition-colors"
                                >
                                    Start Building <ArrowRight className="w-4 h-4 ml-2" />
                                </Link>
                                <p className="text-xs text-gray-500">Contribute games via GitHub</p>
                            </div>
                        </div>
                    </div>

                    {/* Getting Started */}
                    <section id="getting-started" className="mb-16">
                        <h2 className="text-3xl font-black mb-6 flex items-center">
                            <Trophy className="w-8 h-8 text-[#ffd700] mr-3" />
                            Getting Started
                        </h2>
                        <div className="glass p-8 rounded-2xl border border-white/10">
                            <ol className="space-y-4 text-gray-300">
                                <li className="flex">
                                    <span className="w-8 h-8 rounded-full bg-gradient-to-r from-[#ff9500] to-[#ffd700] flex items-center justify-center text-black font-bold mr-4 flex-shrink-0">1</span>
                                    <div>
                                        <p className="font-semibold text-white">Create an Account</p>
                                        <p className="text-gray-400">Sign up with your email to track your scores and compete on leaderboards.</p>
                                    </div>
                                </li>
                                <li className="flex">
                                    <span className="w-8 h-8 rounded-full bg-gradient-to-r from-[#ff9500] to-[#ffd700] flex items-center justify-center text-black font-bold mr-4 flex-shrink-0">2</span>
                                    <div>
                                        <p className="font-semibold text-white">Browse Games</p>
                                        <p className="text-gray-400">Explore our collection of 2D games built by the community.</p>
                                    </div>
                                </li>
                                <li className="flex">
                                    <span className="w-8 h-8 rounded-full bg-gradient-to-r from-[#ff9500] to-[#ffd700] flex items-center justify-center text-black font-bold mr-4 flex-shrink-0">3</span>
                                    <div>
                                        <p className="font-semibold text-white">Play & Compete</p>
                                        <p className="text-gray-400">Play games, beat your high score, and climb the leaderboards!</p>
                                    </div>
                                </li>
                            </ol>
                        </div>
                    </section>

                    {/* Contributing */}
                    <section id="contributing" className="mb-16">
                        <h2 className="text-3xl font-black mb-6 flex items-center">
                            <Github className="w-8 h-8 text-[#00d4ff] mr-3" />
                            Contributing a Game
                        </h2>
                        <div className="glass p-8 rounded-2xl border border-white/10 mb-6">
                            <h3 className="text-xl font-bold mb-4 text-[#ffd700]">Submission Process</h3>
                            <ol className="space-y-4 text-gray-300">
                                <li className="flex">
                                    <span className="w-8 h-8 rounded-full bg-[#00d4ff] flex items-center justify-center text-black font-bold mr-4 flex-shrink-0">1</span>
                                    <div>
                                        <p className="font-semibold text-white">Propose Your Game Idea</p>
                                        <p className="text-gray-400">Create a GitHub Issue describing your game concept, mechanics, and how it fits the platform.</p>
                                    </div>
                                </li>
                                <li className="flex">
                                    <span className="w-8 h-8 rounded-full bg-[#00d4ff] flex items-center justify-center text-black font-bold mr-4 flex-shrink-0">2</span>
                                    <div>
                                        <p className="font-semibold text-white">Fork & Build Your Game</p>
                                        <p className="text-gray-400 mb-2">Clone the repo and create your game component:</p>
                                        <code className="text-sm bg-black/50 px-2 py-1 rounded block">git clone https://github.com/bytestrix/2DChampion.git</code>
                                        <p className="text-gray-400 mt-2">Build in <code className="text-sm bg-black/50 px-1 rounded">web/src/components/games/YourGame.tsx</code></p>
                                    </div>
                                </li>
                                <li className="flex">
                                    <span className="w-8 h-8 rounded-full bg-[#00d4ff] flex items-center justify-center text-black font-bold mr-4 flex-shrink-0">3</span>
                                    <div>
                                        <p className="font-semibold text-white">Submit Pull Request</p>
                                        <p className="text-gray-400">Submit a PR with your game component, including documentation and any required assets (thumbnails, etc.).</p>
                                    </div>
                                </li>
                                <li className="flex">
                                    <span className="w-8 h-8 rounded-full bg-[#00d4ff] flex items-center justify-center text-black font-bold mr-4 flex-shrink-0">4</span>
                                    <div>
                                        <p className="font-semibold text-white">Maintainers Handle Integration</p>
                                        <p className="text-gray-400">Once approved, maintainers will integrate your game into the platform and database.</p>
                                    </div>
                                </li>
                            </ol>
                        </div>

                        <div className="glass p-6 rounded-2xl border border-[#ffd700]/20 mb-6">
                            <h4 className="font-bold mb-3 text-white flex items-center">
                                <Trophy className="w-5 h-5 mr-2 text-[#ffd700]" />
                                Game Requirements
                            </h4>
                            <ul className="space-y-2 text-gray-400">
                                <li className="flex items-start">
                                    <span className="text-[#ffd700] mr-2">•</span>
                                    Must be a 2D game built with HTML5 Canvas or similar
                                </li>
                                <li className="flex items-start">
                                    <span className="text-[#ffd700] mr-2">•</span>
                                    Include keyboard and/or touch controls for mobile support
                                </li>
                                <li className="flex items-start">
                                    <span className="text-[#ffd700] mr-2">•</span>
                                    Integrate with scoring system (gameId and userId props)
                                </li>
                                <li className="flex items-start">
                                    <span className="text-[#ffd700] mr-2">•</span>
                                    Provide a thumbnail image (512x512 recommended)
                                </li>
                                <li className="flex items-start">
                                    <span className="text-[#ffd700] mr-2">•</span>
                                    Include clear game instructions in your PR
                                </li>
                            </ul>
                        </div>

                        <div className="glass p-6 rounded-2xl border border-white/10">
                            <h4 className="font-bold mb-3 text-white">Tech Stack</h4>
                            <ul className="grid grid-cols-2 gap-3 text-gray-400">
                                <li className="flex items-center"><Code2 className="w-4 h-4 mr-2 text-[#ff9500]" /> Next.js 14</li>
                                <li className="flex items-center"><Code2 className="w-4 h-4 mr-2 text-[#ff9500]" /> TypeScript</li>
                                <li className="flex items-center"><Code2 className="w-4 h-4 mr-2 text-[#ff9500]" /> Supabase</li>
                                <li className="flex items-center"><Code2 className="w-4 h-4 mr-2 text-[#ff9500]" /> Tailwind CSS</li>
                            </ul>
                        </div>
                    </section>

                    {/* Resources */}
                    <section className="mb-16">
                        <h2 className="text-3xl font-black mb-6">Resources</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <Link
                                href="https://github.com/bytestrix/2DChampion"
                                target="_blank"
                                className="glass p-6 rounded-2xl hover:bg-white/5 border border-white/10 hover:border-[#ffd700]/50 transition-all group"
                            >
                                <Github className="w-8 h-8 text-[#00d4ff] mb-3" />
                                <h3 className="font-bold text-lg mb-2 group-hover:text-[#ffd700] transition-colors">GitHub Repository</h3>
                                <p className="text-gray-400 text-sm">View source code and contribute</p>
                            </Link>
                            <div className="glass p-6 rounded-2xl border border-white/10">
                                <Users className="w-8 h-8 text-[#ff9500] mb-3" />
                                <h3 className="font-bold text-lg mb-2">Community</h3>
                                <p className="text-gray-400 text-sm">Join our growing developer community</p>
                            </div>
                        </div>
                    </section>

                    {/* CTA */}
                    <div className="text-center glass p-12 rounded-3xl border border-[#ffd700]/20">
                        <h2 className="text-3xl font-black mb-4">Ready to Get Started?</h2>
                        <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
                            Whether you're here to play or build, 2D Champion welcomes you!
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href="/games"
                                className="px-8 py-4 rounded-full bg-gradient-to-r from-[#ff9500] to-[#ffd700] text-black font-bold hover:shadow-glow-gold transition-all inline-flex items-center justify-center"
                            >
                                <Gamepad2 className="w-5 h-5 mr-2" />
                                Play Games
                            </Link>
                            <Link
                                href="https://github.com/bytestrix/2DChampion"
                                target="_blank"
                                className="px-8 py-4 rounded-full glass text-white font-bold hover:bg-white/10 border border-[#00d4ff]/30 transition-all inline-flex items-center justify-center"
                            >
                                <Github className="w-5 h-5 mr-2" />
                                Contribute
                            </Link>
                        </div>
                    </div>
                </div >
            </main >
            <Footer />
        </>
    )
}
