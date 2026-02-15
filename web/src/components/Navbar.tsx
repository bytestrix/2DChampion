import Link from 'next/link'
import Image from 'next/image'
import { createServerClient } from '@/lib/supabase/server'

export default async function Navbar() {
    const supabase = await createServerClient()
    const { data: { user } } = await supabase.auth.getUser()

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/10">
            <div className="container mx-auto px-4 sm:px-6 py-4">
                <div className="flex items-center justify-between">
                    {/* Logo with actual 2D Champion logo */}
                    <Link href="/" className="flex items-center space-x-2">
                        <Image
                            src="/logo.png"
                            alt="2D Champion"
                            width={160}
                            height={40}
                            className="h-8 sm:h-10 w-auto object-contain"
                            priority
                        />
                    </Link>

                    {/* Navigation Links */}
                    <div className="flex items-center space-x-3 sm:space-x-6">
                        <Link
                            href="/games"
                            className="text-sm sm:text-base text-gray-300 hover:text-white transition-colors duration-300"
                        >
                            Games
                        </Link>
                        <Link
                            href="/leaderboard"
                            className="hidden sm:block text-sm sm:text-base text-gray-300 hover:text-white transition-colors duration-300"
                        >
                            Leaderboard
                        </Link>

                        {user ? (
                            <Link
                                href="/profile"
                                className="px-3 sm:px-6 py-2 text-sm sm:text-base rounded-full bg-gradient-to-r from-[#6366f1] to-[#ec4899] text-white font-semibold hover:shadow-glow transition-all duration-300"
                            >
                                Profile
                            </Link>
                        ) : (
                            <Link
                                href="/login"
                                className="px-3 sm:px-6 py-2 text-sm sm:text-base rounded-full bg-gradient-to-r from-[#6366f1] to-[#ec4899] text-white font-semibold hover:shadow-glow transition-all duration-300"
                            >
                                Sign In
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    )
}
