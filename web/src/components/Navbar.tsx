import Link from 'next/link'
import { createServerClient } from '@/lib/supabase/server'
import MobileMenu from './MobileMenu'

export default async function Navbar() {
    const supabase = await createServerClient()
    const { data: { user } } = await supabase.auth.getUser()

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-[#ffd700]/10">
            <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4">
                <div className="flex items-center justify-between">
                    {/* Logo - 2D Badge from Footer */}
                    <Link href="/" className="flex items-center space-x-2 group">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gradient-to-br from-[#ff9500] to-[#ffd700] flex items-center justify-center shadow-glow group-hover:scale-110 transition-transform">
                            <span className="text-xl sm:text-2xl font-black text-black">2D</span>
                        </div>
                        <span className="text-lg sm:text-xl font-black gradient-text">Champion</span>
                    </Link>

                    {/* Desktop Navigation Links */}
                    <div className="hidden sm:flex items-center space-x-6">
                        <Link
                            href="/games"
                            className="text-base text-gray-300 hover:text-[#ffd700] transition-colors duration-300 font-medium"
                        >
                            Games
                        </Link>
                        <Link
                            href="/docs"
                            className="text-base text-gray-300 hover:text-[#ffd700] transition-colors duration-300 font-medium"
                        >
                            Docs
                        </Link>
                        <Link
                            href="/leaderboard"
                            className="text-base text-gray-300 hover:text-[#ffd700] transition-colors duration-300 font-medium"
                        >
                            Leaderboard
                        </Link>

                        {user ? (
                            <Link
                                href="/profile"
                                className="px-6 py-2 text-base rounded-full bg-gradient-to-r from-[#ff9500] to-[#ffd700] text-black font-semibold hover:shadow-glow-gold transition-all duration-300"
                            >
                                Profile
                            </Link>
                        ) : (
                            <Link
                                href="/login"
                                className="px-6 py-2 text-base rounded-full bg-gradient-to-r from-[#ff9500] to-[#ffd700] text-black font-semibold hover:shadow-glow-gold transition-all duration-300"
                            >
                                Sign In
                            </Link>
                        )}
                    </div>

                    {/* Mobile Menu */}
                    <div className="sm:hidden">
                        <MobileMenu isAuthenticated={!!user} />
                    </div>
                </div>
            </div>
        </nav>
    )
}
