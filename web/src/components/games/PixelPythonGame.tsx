
'use client'

import { useEffect, useRef, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Play, RotateCcw, Trophy } from 'lucide-react'

interface PixelPythonGameProps {
    gameId: string
    userId?: string
}

const GRID_SIZE = 20
const INITIAL_SPEED = 150
const SPEED_INCREMENT = 2

export default function PixelPythonGame({ gameId, userId }: PixelPythonGameProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [score, setScore] = useState(0)
    const [highScore, setHighScore] = useState(0)
    const [isPlaying, setIsPlaying] = useState(false)
    const [isGameOver, setIsGameOver] = useState(false)
    const [gameLoop, setGameLoop] = useState<NodeJS.Timeout | null>(null)
    const supabase = createClient()

    // Game state refs (to avoid closure stale state issues in interval)
    const snakeRef = useRef([{ x: 10, y: 10 }])
    const foodRef = useRef({ x: 15, y: 15 })
    const directionRef = useRef({ x: 1, y: 0 })
    const nextDirectionRef = useRef({ x: 1, y: 0 })
    const scoreRef = useRef(0)
    const speedRef = useRef(INITIAL_SPEED)
    const audioContextRef = useRef<AudioContext | null>(null)

    // Load user's high score
    useEffect(() => {
        if (userId) {
            const fetchHighScore = async () => {
                const { data } = await supabase
                    .from('user_best_scores')
                    .select('best_score')
                    .eq('game_id', gameId)
                    .eq('user_id', userId)
                    .single()

                if (data) setHighScore(data.best_score || 0)
            }
            fetchHighScore()
        }
    }, [gameId, userId])

    // Initialize Audio Context
    useEffect(() => {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)()
        return () => {
            audioContextRef.current?.close()
        }
    }, [])

    const playSound = (frequency: number, type: OscillatorType, duration: number) => {
        if (!audioContextRef.current) return
        const osc = audioContextRef.current.createOscillator()
        const gain = audioContextRef.current.createGain()
        osc.type = type
        osc.frequency.setValueAtTime(frequency, audioContextRef.current.currentTime)
        gain.gain.setValueAtTime(0.1, audioContextRef.current.currentTime)
        gain.gain.exponentialRampToValueAtTime(0.01, audioContextRef.current.currentTime + duration)
        osc.connect(gain)
        gain.connect(audioContextRef.current.destination)
        osc.start()
        osc.stop(audioContextRef.current.currentTime + duration)
    }

    const initGame = () => {
        snakeRef.current = [{ x: 10, y: 10 }, { x: 9, y: 10 }, { x: 8, y: 10 }]
        placeFood()
        directionRef.current = { x: 1, y: 0 }
        nextDirectionRef.current = { x: 1, y: 0 }
        scoreRef.current = 0
        speedRef.current = INITIAL_SPEED
        setScore(0)
        setIsGameOver(false)
        setIsPlaying(true)
    }

    const placeFood = () => {
        const canvas = canvasRef.current
        if (!canvas) return
        const cols = canvas.width / GRID_SIZE
        const rows = canvas.height / GRID_SIZE

        let newFood
        let isValid = false
        while (!isValid) {
            newFood = {
                x: Math.floor(Math.random() * cols),
                y: Math.floor(Math.random() * rows)
            }
            // Check if food is on snake
            const onSnake = snakeRef.current.some(segment => segment.x === newFood!.x && segment.y === newFood!.y)
            if (!onSnake) isValid = true
        }
        if (newFood) foodRef.current = newFood
    }

    const handleGameOver = async () => {
        setIsPlaying(false)
        setIsGameOver(true)
        playSound(150, 'sawtooth', 0.5)

        if (userId && scoreRef.current > highScore) {
            setHighScore(scoreRef.current)
            // Save to DB
            await supabase.from('scores').insert({
                game_id: gameId,
                user_id: userId,
                score: scoreRef.current
            })
            // Update play count (optional, handled by separate trigger or call?)
            // We can just increment play count on game start or end. Let's do it on end to verify full game play.
            await supabase.rpc('increment_play_count', { game_id_param: gameId })
        }
    }

    const gameTick = () => {
        const canvas = canvasRef.current
        if (!canvas) return

        const head = { ...snakeRef.current[0] }
        directionRef.current = nextDirectionRef.current
        head.x += directionRef.current.x
        head.y += directionRef.current.y

        // Wall Collision
        const cols = canvas.width / GRID_SIZE
        const rows = canvas.height / GRID_SIZE
        if (head.x < 0 || head.x >= cols || head.y < 0 || head.y >= rows) {
            handleGameOver()
            return
        }

        // Self Collision
        if (snakeRef.current.some(segment => segment.x === head.x && segment.y === head.y)) {
            handleGameOver()
            return
        }

        snakeRef.current.unshift(head)

        // Food Collision
        if (head.x === foodRef.current.x && head.y === foodRef.current.y) {
            scoreRef.current += 10
            setScore(scoreRef.current)
            placeFood()
            playSound(600 + (scoreRef.current * 2), 'sine', 0.1)
            // Increase speed slightly
            speedRef.current = Math.max(50, speedRef.current - SPEED_INCREMENT)
        } else {
            snakeRef.current.pop()
        }

        draw()
    }

    const draw = () => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')
        if (!ctx) return

        // Clear
        ctx.fillStyle = '#0f172a' // Dark slate background
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        // Draw Grid (Optional, subtle)
        ctx.strokeStyle = '#1e293b'
        ctx.lineWidth = 0.5
        for (let x = 0; x < canvas.width; x += GRID_SIZE) {
            ctx.beginPath()
            ctx.moveTo(x, 0)
            ctx.lineTo(x, canvas.height)
            ctx.stroke()
        }
        for (let y = 0; y < canvas.height; y += GRID_SIZE) {
            ctx.beginPath()
            ctx.moveTo(0, y)
            ctx.lineTo(canvas.width, y)
            ctx.stroke()
        }

        // Draw Food
        ctx.fillStyle = '#ef4444' // Red food
        ctx.shadowColor = '#ef4444'
        ctx.shadowBlur = 10
        ctx.beginPath()
        ctx.arc(
            foodRef.current.x * GRID_SIZE + GRID_SIZE / 2,
            foodRef.current.y * GRID_SIZE + GRID_SIZE / 2,
            GRID_SIZE / 2 - 2,
            0,
            Math.PI * 2
        )
        ctx.fill()
        ctx.shadowBlur = 0

        // Draw Snake
        ctx.fillStyle = '#22c55e' // Green snake
        snakeRef.current.forEach((segment, index) => {
            const isHead = index === 0
            if (isHead) {
                ctx.fillStyle = '#4ade80'
                ctx.shadowColor = '#4ade80'
                ctx.shadowBlur = 15
            } else {
                ctx.fillStyle = `rgba(34, 197, 94, ${1 - index / (snakeRef.current.length + 5)})`
                ctx.shadowBlur = 0
            }

            ctx.fillRect(
                segment.x * GRID_SIZE + 1,
                segment.y * GRID_SIZE + 1,
                GRID_SIZE - 2,
                GRID_SIZE - 2
            )
        })
    }

    // Game Loop
    const isPlayingRef = useRef(isPlaying)
    useEffect(() => { isPlayingRef.current = isPlaying }, [isPlaying])

    useEffect(() => {
        let timeout: NodeJS.Timeout

        const tick = () => {
            if (!isPlayingRef.current) return
            gameTick()
            // Re-schedule
            if (isPlayingRef.current && !isGameOver) {
                timeout = setTimeout(tick, speedRef.current)
            }
        }

        if (isPlaying) {
            timeout = setTimeout(tick, speedRef.current)
        }

        return () => clearTimeout(timeout)
    }, [isPlaying, isGameOver]) // Depend on isGameOver to stop scheduling

    // START/CONTROLS
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!isPlaying) return

            switch (e.key) {
                case 'ArrowUp':
                    e.preventDefault()
                    if (directionRef.current.y === 0) nextDirectionRef.current = { x: 0, y: -1 }
                    break
                case 'ArrowDown':
                    e.preventDefault()
                    if (directionRef.current.y === 0) nextDirectionRef.current = { x: 0, y: 1 }
                    break
                case 'ArrowLeft':
                    e.preventDefault()
                    if (directionRef.current.x === 0) nextDirectionRef.current = { x: -1, y: 0 }
                    break
                case 'ArrowRight':
                    e.preventDefault()
                    if (directionRef.current.x === 0) nextDirectionRef.current = { x: 1, y: 0 }
                    break
            }
        }
        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [isPlaying])



    // Touch Controls
    const touchStartRef = useRef<{ x: number, y: number } | null>(null)

    const handleTouchStart = (e: React.TouchEvent) => {
        touchStartRef.current = {
            x: e.touches[0].clientX,
            y: e.touches[0].clientY
        }
    }

    const handleTouchEnd = (e: React.TouchEvent) => {
        if (!touchStartRef.current || !isPlaying) return

        const touchEnd = {
            x: e.changedTouches[0].clientX,
            y: e.changedTouches[0].clientY
        }

        const dx = touchEnd.x - touchStartRef.current.x
        const dy = touchEnd.y - touchStartRef.current.y
        const absDx = Math.abs(dx)
        const absDy = Math.abs(dy)

        if (Math.max(absDx, absDy) > 20) { // Threshold
            if (absDx > absDy) {
                // Horizontal
                if (dx > 0) { // Right
                    if (directionRef.current.x === 0) nextDirectionRef.current = { x: 1, y: 0 }
                } else { // Left
                    if (directionRef.current.x === 0) nextDirectionRef.current = { x: -1, y: 0 }
                }
            } else {
                // Vertical
                if (dy > 0) { // Down
                    if (directionRef.current.y === 0) nextDirectionRef.current = { x: 0, y: 1 }
                } else { // Up
                    if (directionRef.current.y === 0) nextDirectionRef.current = { x: 0, y: -1 }
                }
            }
        }
        touchStartRef.current = null
    }

    return (
        <div
            className="relative w-full h-full flex flex-col items-center justify-center p-4 touch-none"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
        >

            {/* Score HUD */}
            <div className="absolute top-4 left-0 right-0 px-8 flex justify-between items-center z-10 pointer-events-none">
                <div className="bg-black/50 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10 text-white font-mono">
                    SCORE: <span className="text-green-400 font-bold">{score}</span>
                </div>
                <div className="bg-black/50 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10 text-white font-mono flex items-center space-x-2">
                    <Trophy className="w-4 h-4 text-yellow-500" />
                    <span className="text-yellow-400 font-bold">{highScore}</span>
                </div>
            </div>

            {/* Game Canvas */}
            <canvas
                ref={canvasRef}
                width={800}
                height={600}
                className="max-w-full h-auto rounded-xl shadow-2xl bg-slate-900 border border-slate-700"
            />

            {/* Overlays */}
            {!isPlaying && !isGameOver && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-20 rounded-xl">
                    <button
                        onClick={initGame}
                        className="group relative px-8 py-4 bg-green-500 hover:bg-green-400 text-white font-black text-2xl rounded-full transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(34,197,94,0.5)] flex items-center space-x-3"
                    >
                        <Play className="w-8 h-8 fill-current" />
                        <span>START GAME</span>
                    </button>
                    <div className="absolute bottom-20 text-gray-400 text-sm">
                        Use Arrow Keys to Move
                    </div>
                </div>
            )}

            {isGameOver && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 backdrop-blur-md z-20 rounded-xl animate-in fade-in duration-300">
                    <h2 className="text-5xl font-black text-white mb-2 drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
                        GAME OVER
                    </h2>
                    <p className="text-gray-400 mb-8 text-xl">
                        Final Score: <span className="text-green-400 font-bold">{score}</span>
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3">
                        <button
                            onClick={initGame}
                            className="group px-8 py-3 bg-gradient-to-r from-[#ff9500] to-[#ffd700] text-black font-bold text-lg rounded-full hover:shadow-glow-gold transition-all hover:scale-105 active:scale-95 flex items-center space-x-2"
                        >
                            <RotateCcw className="w-5 h-5" />
                            <span>Try Again</span>
                        </button>
                        <a
                            href="/games"
                            className="group px-8 py-3 glass text-white font-bold text-lg rounded-full hover:bg-white/10 transition-all hover:scale-105 active:scale-95 flex items-center space-x-2 border border-[#00d4ff]/30"
                        >
                            <span>Back to Games</span>
                        </a>
                    </div>
                </div>
            )}
        </div>
    )
}
