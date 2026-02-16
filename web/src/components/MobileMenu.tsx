'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, Home, Gamepad2, Trophy, User, LogIn } from 'lucide-react'

interface MobileMenuProps {
    isAuthenticated: boolean
}

export default function MobileMenu({ isAuthenticated }: MobileMenuProps) {
    const [isOpen, setIsOpen] = useState(false)

    const closeMenu = () => setIsOpen(false)

    return (
        <>
            {/* Burger Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="sm:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
                aria-label="Toggle menu"
            >
                {isOpen ? (
                    <X className="w-6 h-6 text-white" />
                ) : (
                    <Menu className="w-6 h-6 text-white" />
                )}
            </button>

            {/* Mobile Menu Overlay */}
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <div
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 sm:hidden"
                        onClick={closeMenu}
                    />

                    {/* Menu Panel */}
                    <div className="fixed top-0 right-0 bottom-0 w-64 glass border-l border-[#ffd700]/20 z-50 sm:hidden animate-in slide-in-from-right duration-300">
                        <div className="flex flex-col h-full p-6">
                            {/* Header */}
                            <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#ffd700]/20">
                                <h3 className="text-lg font-bold gradient-text">Menu</h3>
                                <button
                                    onClick={closeMenu}
                                    className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                                >
                                    <X className="w-5 h-5 text-white" />
                                </button>
                            </div>

                            {/* Navigation Links */}
                            <nav className="flex-1 space-y-2">
                                <Link
                                    href="/"
                                    onClick={closeMenu}
                                    className="flex items-center space-x-3 p-3 rounded-lg hover:bg-white/10 transition-colors text-gray-300 hover:text-[#ffd700]"
                                >
                                    <Home className="w-5 h-5" />
                                    <span className="font-medium">Home</span>
                                </Link>
                                <Link
                                    href="/games"
                                    onClick={closeMenu}
                                    className="flex items-center space-x-3 p-3 rounded-lg hover:bg-white/10 transition-colors text-gray-300 hover:text-[#ffd700]"
                                >
                                    <Gamepad2 className="w-5 h-5" />
                                    <span className="font-medium">Games</span>
                                </Link>
                                <Link
                                    href="/leaderboard"
                                    onClick={closeMenu}
                                    className="flex items-center space-x-3 p-3 rounded-lg hover:bg-white/10 transition-colors text-gray-300 hover:text-[#ffd700]"
                                >
                                    <Trophy className="w-5 h-5" />
                                    <span className="font-medium">Leaderboard</span>
                                </Link>
                            </nav>

                            {/* Auth Button */}
                            <div className="pt-4 border-t border-[#ffd700]/20">
                                {isAuthenticated ? (
                                    <Link
                                        href="/profile"
                                        onClick={closeMenu}
                                        className="flex items-center justify-center space-x-2 w-full p-3 rounded-full bg-gradient-to-r from-[#ff9500] to-[#ffd700] text-black font-semibold hover:shadow-glow-gold transition-all"
                                    >
                                        <User className="w-5 h-5" />
                                        <span>Profile</span>
                                    </Link>
                                ) : (
                                    <Link
                                        href="/login"
                                        onClick={closeMenu}
                                        className="flex items-center justify-center space-x-2 w-full p-3 rounded-full bg-gradient-to-r from-[#ff9500] to-[#ffd700] text-black font-semibold hover:shadow-glow-gold transition-all"
                                    >
                                        <LogIn className="w-5 h-5" />
                                        <span>Sign In</span>
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    )
}
