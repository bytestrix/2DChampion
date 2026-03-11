import Link from 'next/link'
import { Code2, Github, FileCode, Package, Database, Zap, GitPullRequest, CheckCircle, AlertCircle, BookOpen, Terminal, ArrowLeft, Lightbulb } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function DevelopersDocsPage() {
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
                        <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full glass mb-6 border border-[#00d4ff]/30">
                            <Code2 className="w-4 h-4 text-[#00d4ff]" />
                            <span className="text-sm text-gray-300">Developer Guide</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black mb-4">
                            <span className="gradient-text-cyan">Developer</span> Documentation
                        </h1>
                        <p className="text-xl text-gray-400">
                            Build amazing 2D games and contribute to the open-source platform. 🚀
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-12">
                        <a href="#setup" className="glass p-4 rounded-xl border border-[#00d4ff]/20 hover:border-[#00d4ff]/50 transition-all text-center group">
                            <Terminal className="w-6 h-6 text-[#00d4ff] mx-auto mb-2 group-hover:scale-110 transition-transform" />
                            <p className="font-semibold text-sm">Setup</p>
                        </a>
                        <a href="#game-structure" className="glass p-4 rounded-xl border border-[#00d4ff]/20 hover:border-[#00d4ff]/50 transition-all text-center group">
                            <FileCode className="w-6 h-6 text-[#ff9500] mx-auto mb-2 group-hover:scale-110 transition-transform" />
                            <p className="font-semibold text-sm">Game Structure</p>
                        </a>
                        <a href="#integration" className="glass p-4 rounded-xl border border-[#00d4ff]/20 hover:border-[#00d4ff]/50 transition-all text-center group">
                            <Database className="w-6 h-6 text-[#ffd700] mx-auto mb-2 group-hover:scale-110 transition-transform" />
                            <p className="font-semibold text-sm">Integration</p>
                        </a>
                        <a href="#submission" className="glass p-4 rounded-xl border border-[#00d4ff]/20 hover:border-[#00d4ff]/50 transition-all text-center group">
                            <GitPullRequest className="w-6 h-6 text-[#00d4ff] mx-auto mb-2 group-hover:scale-110 transition-transform" />
                            <p className="font-semibold text-sm">Submit PR</p>
                        </a>
                    </div>

                    {/* Tech Stack Section */}
                    <section className="mb-12">
                        <h2 className="text-3xl font-black mb-6 flex items-center">
                            <Package className="w-8 h-8 text-[#00d4ff] mr-3" />
                            Tech Stack
                        </h2>
                        <div className="glass p-8 rounded-2xl border border-white/10">
                            <p className="text-gray-300 mb-6">
                                2D Champion is built with modern web technologies to ensure great performance and developer experience:
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                                    <Code2 className="w-6 h-6 text-[#00d4ff] mb-2" />
                                    <h3 className="font-bold text-white mb-1">Next.js 14</h3>
                                    <p className="text-sm text-gray-400">React framework with App Router</p>
                                </div>
                                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                                    <Code2 className="w-6 h-6 text-[#00d4ff] mb-2" />
                                    <h3 className="font-bold text-white mb-1">TypeScript</h3>
                                    <p className="text-sm text-gray-400">Type-safe development</p>
                                </div>
                                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                                    <Database className="w-6 h-6 text-[#00d4ff] mb-2" />
                                    <h3 className="font-bold text-white mb-1">Supabase</h3>
                                    <p className="text-sm text-gray-400">Authentication & database</p>
                                </div>
                                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                                    <Code2 className="w-6 h-6 text-[#00d4ff] mb-2" />
                                    <h3 className="font-bold text-white mb-1">Tailwind CSS</h3>
                                    <p className="text-sm text-gray-400">Utility-first styling</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Setup Section */}
                    <section id="setup" className="mb-12">
                        <h2 className="text-3xl font-black mb-6 flex items-center">
                            <Terminal className="w-8 h-8 text-[#00d4ff] mr-3" />
                            Development Setup
                        </h2>

                        <div className="space-y-6">
                            <div className="glass p-8 rounded-2xl border border-white/10">
                                <h3 className="text-xl font-bold mb-4 text-[#00d4ff]">Local Environment Setup</h3>
                                <ol className="space-y-4 text-gray-300">
                                    <li className="flex">
                                        <span className="w-8 h-8 rounded-full bg-[#00d4ff] flex items-center justify-center text-black font-bold mr-4 flex-shrink-0">1</span>
                                        <div>
                                            <p className="font-semibold text-white mb-2">Fork & Clone the Repository</p>
                                            <code className="text-sm bg-black/50 px-3 py-2 rounded block text-[#00d4ff]">
                                                git clone https://github.com/YOUR_USERNAME/2DChampion.git<br />
                                                cd 2DChampion/web
                                            </code>
                                        </div>
                                    </li>
                                    <li className="flex">
                                        <span className="w-8 h-8 rounded-full bg-[#00d4ff] flex items-center justify-center text-black font-bold mr-4 flex-shrink-0">2</span>
                                        <div>
                                            <p className="font-semibold text-white mb-2">Install Dependencies</p>
                                            <code className="text-sm bg-black/50 px-3 py-2 rounded block text-[#00d4ff]">
                                                npm install
                                            </code>
                                        </div>
                                    </li>
                                    <li className="flex">
                                        <span className="w-8 h-8 rounded-full bg-[#00d4ff] flex items-center justify-center text-black font-bold mr-4 flex-shrink-0">3</span>
                                        <div>
                                            <p className="font-semibold text-white mb-2">Set Up Environment Variables</p>
                                            <p className="text-gray-400 mb-2">Create a <code className="text-sm bg-black/50 px-1 rounded">.env.local</code> file with:</p>
                                            <code className="text-sm bg-black/50 px-3 py-2 rounded block text-[#00d4ff]">
                                                NEXT_PUBLIC_SUPABASE_URL=your_supabase_url<br />
                                                NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key
                                            </code>
                                        </div>
                                    </li>
                                    <li className="flex">
                                        <span className="w-8 h-8 rounded-full bg-[#00d4ff] flex items-center justify-center text-black font-bold mr-4 flex-shrink-0">4</span>
                                        <div>
                                            <p className="font-semibold text-white mb-2">Run Development Server</p>
                                            <code className="text-sm bg-black/50 px-3 py-2 rounded block text-[#00d4ff]">
                                                npm run dev
                                            </code>
                                            <p className="text-gray-400 mt-2">Access the app at <code className="text-sm bg-black/50 px-1 rounded">http://localhost:3000</code></p>
                                        </div>
                                    </li>
                                </ol>
                            </div>
                        </div>
                    </section>

                    {/* Game Structure Section */}
                    <section id="game-structure" className="mb-12">
                        <h2 className="text-3xl font-black mb-6 flex items-center">
                            <FileCode className="w-8 h-8 text-[#ff9500] mr-3" />
                            Game Component Structure
                        </h2>

                        <div className="space-y-6">
                            <div className="glass p-8 rounded-2xl border border-white/10">
                                <h3 className="text-xl font-bold mb-4 text-[#ffd700]">Basic Game Template</h3>
                                <p className="text-gray-300 mb-4">
                                    Games should be created as React components in their own subfolder within <code className="text-sm bg-black/50 px-2 py-1 rounded">games/</code>, e.g., <code className="text-sm bg-black/50 px-2 py-1 rounded">games/your-game/YourGame.tsx</code>
                                </p>
                                <code className="text-sm bg-black/50 px-4 py-3 rounded block text-gray-300 overflow-x-auto">
                                    {`'use client'

import { useEffect, useRef, useState } from 'react'

interface YourGameProps {
  gameId: string
  userId: string | null
  onScoreUpdate: (score: number) => void
}

export default function YourGame({ 
  gameId, 
  userId, 
  onScoreUpdate 
}: YourGameProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [score, setScore] = useState(0)
  const [gameOver, setGameOver] = useState(false)

  // Game logic here
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Your game loop
    const gameLoop = () => {
      // Update game state
      // Draw game
      requestAnimationFrame(gameLoop)
    }

    gameLoop()
  }, [])

  // Update score
  useEffect(() => {
    if (gameOver && score > 0) {
      onScoreUpdate(score)
    }
  }, [gameOver, score, onScoreUpdate])

  return (
    <div>
      <canvas 
        ref={canvasRef} 
        width={800} 
        height={600}
        className="border border-white/10 rounded-lg"
      />
    </div>
  )
}`}
                                </code>
                            </div>

                            <div className="glass p-6 rounded-2xl border border-[#ffd700]/20">
                                <h3 className="text-xl font-bold mb-3 text-white flex items-center">
                                    <CheckCircle className="w-5 h-5 mr-2 text-[#ffd700]" />
                                    Required Props
                                </h3>
                                <ul className="space-y-2 text-gray-400">
                                    <li className="flex items-start">
                                        <span className="text-[#ffd700] mr-2">•</span>
                                        <div>
                                            <code className="text-white bg-black/50 px-2 py-1 rounded">gameId</code> - Unique identifier for the game
                                        </div>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-[#ffd700] mr-2">•</span>
                                        <div>
                                            <code className="text-white bg-black/50 px-2 py-1 rounded">userId</code> - Current user ID (null if not logged in)
                                        </div>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-[#ffd700] mr-2">•</span>
                                        <div>
                                            <code className="text-white bg-black/50 px-2 py-1 rounded">onScoreUpdate</code> - Callback to update player score
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* Integration Section */}
                    <section id="integration" className="mb-12">
                        <h2 className="text-3xl font-black mb-6 flex items-center">
                            <Database className="w-8 h-8 text-[#ffd700] mr-3" />
                            Platform Integration
                        </h2>

                        <div className="space-y-6">
                            <div className="glass p-8 rounded-2xl border border-white/10">
                                <h3 className="text-xl font-bold mb-4 text-[#ffd700]">Score Tracking</h3>
                                <p className="text-gray-300 mb-4">
                                    Call <code className="text-sm bg-black/50 px-2 py-1 rounded">onScoreUpdate(score)</code> when the game ends:
                                </p>
                                <code className="text-sm bg-black/50 px-4 py-3 rounded block text-gray-300">
                                    {`// When game ends
useEffect(() => {
  if (gameOver && score > 0) {
    onScoreUpdate(score)  // Automatically saves to DB
  }
}, [gameOver, score, onScoreUpdate])`}
                                </code>
                            </div>

                            <div className="glass p-6 rounded-2xl border border-white/10">
                                <h3 className="text-xl font-bold mb-3 text-white flex items-center">
                                    <Zap className="w-5 h-5 mr-2 text-[#ff9500]" />
                                    Mobile Support
                                </h3>
                                <p className="text-gray-300 mb-3">Add touch controls for mobile players:</p>
                                <ul className="space-y-2 text-gray-400">
                                    <li className="flex items-start">
                                        <span className="text-[#ffd700] mr-2">•</span>
                                        Support both keyboard and touch events
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-[#ffd700] mr-2">•</span>
                                        Use responsive canvas sizing
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-[#ffd700] mr-2">•</span>
                                        Test on different screen sizes
                                    </li>
                                </ul>
                            </div>

                            <div className="glass p-6 rounded-2xl border border-white/10">
                                <h3 className="text-xl font-bold mb-3 text-white flex items-center">
                                    <BookOpen className="w-5 h-5 mr-2 text-[#00d4ff]" />
                                    Game Assets
                                </h3>
                                <ul className="space-y-2 text-gray-400">
                                    <li className="flex items-start">
                                        <span className="text-[#ffd700] mr-2">•</span>
                                        Place thumbnails in <code className="text-white bg-black/50 px-1 rounded">web/public/</code>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-[#ffd700] mr-2">•</span>
                                        Recommended thumbnail size: <strong className="text-white">512x512 pixels</strong>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-[#ffd700] mr-2">•</span>
                                        Use optimized image formats (WebP, PNG)
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* Submission Section */}
                    <section id="submission" className="mb-12">
                        <h2 className="text-3xl font-black mb-6 flex items-center">
                            <GitPullRequest className="w-8 h-8 text-[#00d4ff] mr-3" />
                            Submission Process
                        </h2>

                        <div className="glass p-8 rounded-2xl border border-white/10 mb-6">
                            <h3 className="text-xl font-bold mb-4 text-[#00d4ff]">How to Submit Your Game</h3>
                            <ol className="space-y-4 text-gray-300">
                                <li className="flex">
                                    <span className="w-8 h-8 rounded-full bg-[#00d4ff] flex items-center justify-center text-black font-bold mr-4 flex-shrink-0">1</span>
                                    <div>
                                        <p className="font-semibold text-white">Create a GitHub Issue</p>
                                        <p className="text-gray-400">Propose your game idea and get feedback from maintainers.</p>
                                    </div>
                                </li>
                                <li className="flex">
                                    <span className="w-8 h-8 rounded-full bg-[#00d4ff] flex items-center justify-center text-black font-bold mr-4 flex-shrink-0">2</span>
                                    <div>
                                        <p className="font-semibold text-white">Build Your Game</p>
                                        <p className="text-gray-400">Create your game component following the structure above.</p>
                                    </div>
                                </li>
                                <li className="flex">
                                    <span className="w-8 h-8 rounded-full bg-[#00d4ff] flex items-center justify-center text-black font-bold mr-4 flex-shrink-0">3</span>
                                    <div>
                                        <p className="font-semibold text-white">Test Thoroughly</p>
                                        <p className="text-gray-400">Ensure it works on desktop and mobile devices.</p>
                                    </div>
                                </li>
                                <li className="flex">
                                    <span className="w-8 h-8 rounded-full bg-[#00d4ff] flex items-center justify-center text-black font-bold mr-4 flex-shrink-0">4</span>
                                    <div>
                                        <p className="font-semibold text-white">Submit Pull Request</p>
                                        <p className="text-gray-400 mb-2">Include in your PR:</p>
                                        <ul className="space-y-1 text-gray-400 ml-4">
                                            <li>• Game component file</li>
                                            <li>• Thumbnail image</li>
                                            <li>• Game instructions/controls</li>
                                            <li>• Description of gameplay</li>
                                        </ul>
                                    </div>
                                </li>
                                <li className="flex">
                                    <span className="w-8 h-8 rounded-full bg-[#00d4ff] flex items-center justify-center text-black font-bold mr-4 flex-shrink-0">5</span>
                                    <div>
                                        <p className="font-semibold text-white">Maintainer Review</p>
                                        <p className="text-gray-400">Maintainers will review, test, and integrate your game into the database.</p>
                                    </div>
                                </li>
                            </ol>
                        </div>

                        <div className="glass p-6 rounded-2xl border border-[#ffd700]/20">
                            <h3 className="text-xl font-bold mb-3 text-white flex items-center">
                                <Lightbulb className="w-5 h-5 mr-2 text-[#ffd700]" />
                                Best Practices
                            </h3>
                            <ul className="space-y-2 text-gray-400">
                                <li className="flex items-start">
                                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                                    Write clean, well-commented code
                                </li>
                                <li className="flex items-start">
                                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                                    Follow TypeScript best practices
                                </li>
                                <li className="flex items-start">
                                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                                    Ensure game is fun and engaging
                                </li>
                                <li className="flex items-start">
                                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                                    Test across different browsers
                                </li>
                                <li className="flex items-start">
                                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                                    Optimize performance (60fps target)
                                </li>
                            </ul>
                        </div>
                    </section>

                    {/* CTA */}
                    <div className="text-center glass p-12 rounded-3xl border border-[#00d4ff]/20">
                        <Code2 className="w-16 h-16 text-[#00d4ff] mx-auto mb-4" />
                        <h2 className="text-3xl font-black mb-4">Ready to Build?</h2>
                        <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
                            Join our community of developers and start building amazing 2D games!
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href="https://github.com/bytestrix/2DChampion"
                                target="_blank"
                                className="inline-flex items-center px-8 py-4 rounded-full bg-gradient-to-r from-[#00d4ff] to-[#0ea5e9] text-black font-bold hover:shadow-glow-cyan transition-all"
                            >
                                <Github className="w-5 h-5 mr-2" />
                                View on GitHub
                            </Link>
                            <Link
                                href="https://github.com/bytestrix/2DChampion/issues/new"
                                target="_blank"
                                className="inline-flex items-center px-8 py-4 rounded-full glass text-white font-bold hover:bg-white/10 border border-[#00d4ff]/30 transition-all"
                            >
                                <Lightbulb className="w-5 h-5 mr-2" />
                                Propose Game Idea
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    )
}
