import Link from 'next/link'
import { Github, Twitter, Mail } from 'lucide-react'

export default function Footer() {
    return (
        <footer className="bg-[#0a0a0f] border-t border-white/10 mt-20">
            <div className="container mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#6366f1] to-[#ec4899] flex items-center justify-center">
                                <span className="text-2xl font-bold text-white">2D</span>
                            </div>
                            <span className="text-xl font-bold gradient-text">Champion</span>
                        </div>
                        <p className="text-gray-400 text-sm">
                            Open source 2D gaming platform. Play, compete, and contribute!
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-white font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/games" className="text-gray-400 hover:text-white transition-colors">
                                    Games
                                </Link>
                            </li>
                            <li>
                                <Link href="/leaderboard" className="text-gray-400 hover:text-white transition-colors">
                                    Leaderboard
                                </Link>
                            </li>
                            <li>
                                <Link href="/contribute" className="text-gray-400 hover:text-white transition-colors">
                                    Contribute
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Developers */}
                    <div>
                        <h3 className="text-white font-semibold mb-4">Developers</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/docs" className="text-gray-400 hover:text-white transition-colors">
                                    Documentation
                                </Link>
                            </li>
                            <li>
                                <Link href="/docs/getting-started" className="text-gray-400 hover:text-white transition-colors">
                                    Getting Started
                                </Link>
                            </li>
                            <li>
                                <Link href="/docs/api" className="text-gray-400 hover:text-white transition-colors">
                                    API Reference
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Social */}
                    <div>
                        <h3 className="text-white font-semibold mb-4">Connect</h3>
                        <div className="flex space-x-4">
                            <a
                                href="https://github.com/rishibaghel25/2DChampion"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full bg-[#1a1a24] flex items-center justify-center text-gray-400 hover:text-white hover:bg-[#2a2a38] transition-all"
                            >
                                <Github className="w-5 h-5" />
                            </a>
                            <a
                                href="#"
                                className="w-10 h-10 rounded-full bg-[#1a1a24] flex items-center justify-center text-gray-400 hover:text-white hover:bg-[#2a2a38] transition-all"
                            >
                                <Twitter className="w-5 h-5" />
                            </a>
                            <a
                                href="#"
                                className="w-10 h-10 rounded-full bg-[#1a1a24] flex items-center justify-center text-gray-400 hover:text-white hover:bg-[#2a2a38] transition-all"
                            >
                                <Mail className="w-5 h-5" />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-white/10 mt-8 pt-8 text-center text-gray-400 text-sm">
                    <p>© 2026 2D Champion. Open source under GPL-3.0 License.</p>
                </div>
            </div>
        </footer>
    )
}
