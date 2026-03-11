'use client'

import { useEffect, useRef, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Play, RotateCcw, Trophy, Maximize, Minimize } from 'lucide-react'

interface PixelPythonGameProps {
    gameId: string
    userId?: string
}

const INITIAL_SPEED = 800

export default function PixelPythonGame({ gameId, userId }: PixelPythonGameProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [score, setScore] = useState(0)
    const [highScore, setHighScore] = useState(0)
    const [isPlaying, setIsPlaying] = useState(false)
    const [isGameOver, setIsGameOver] = useState(false)
    const [level, setLevel] = useState(1)
    const [isFullscreen, setIsFullscreen] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)
    const supabase = createClient()

    // Game state refs (to avoid closure stale state issues in interval)
    const gridCellsRef = useRef(3)
    const snakeRef = useRef([{ x: 1, y: 1 }])
    const foodRef = useRef({ x: 2, y: 2 })
    const directionRef = useRef({ x: 1, y: 0 })
    const nextDirectionRef = useRef({ x: 1, y: 0 })
    const scoreRef = useRef(0)
    const speedRef = useRef(INITIAL_SPEED)
    const audioContextRef = useRef<AudioContext | null>(null)

    // Fullscreen support
    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(!!document.fullscreenElement)
        }
        document.addEventListener('fullscreenchange', handleFullscreenChange)
        return () => document.removeEventListener('fullscreenchange', handleFullscreenChange)
    }, [])

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            containerRef.current?.requestFullscreen().catch(err => console.error(err))
        } else {
            document.exitFullscreen()
        }
    }

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
        gridCellsRef.current = 3
        snakeRef.current = [{ x: 1, y: 1 }]
        placeFood()
        directionRef.current = { x: 1, y: 0 }
        nextDirectionRef.current = { x: 1, y: 0 }
        scoreRef.current = 0
        speedRef.current = INITIAL_SPEED
        setScore(0)
        setLevel(1)
        setIsGameOver(false)
        setIsPlaying(true)
    }

    const levelUp = () => {
        gridCellsRef.current += 1
        setLevel(prev => prev + 1)

        // Reset snake position to center of new grid
        const centerX = Math.floor(gridCellsRef.current / 2)
        const centerY = Math.floor(gridCellsRef.current / 2)
        snakeRef.current = [{ x: centerX, y: centerY }]

        // Slightly increase speed
        speedRef.current = Math.max(60, INITIAL_SPEED - ((gridCellsRef.current - 3) * 10))

        placeFood()
    }

    const placeFood = () => {
        const cells = gridCellsRef.current

        if (snakeRef.current.length >= cells * cells) return

        let newFood
        let isValid = false
        while (!isValid) {
            newFood = {
                x: Math.floor(Math.random() * cells),
                y: Math.floor(Math.random() * cells)
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
            // Update play count
            await supabase.rpc('increment_play_count', { game_id_param: gameId })
        }
    }

    const gameTick = () => {
        const canvas = canvasRef.current
        if (!canvas) return

        const cells = gridCellsRef.current
        const head = { ...snakeRef.current[0] }

        directionRef.current = nextDirectionRef.current
        head.x += directionRef.current.x
        head.y += directionRef.current.y

        // Wall Collision (Wrap around)
        if (head.x < 0) {
            head.x = cells - 1
        } else if (head.x >= cells) {
            head.x = 0
        }

        if (head.y < 0) {
            head.y = cells - 1
        } else if (head.y >= cells) {
            head.y = 0
        }

        // Self Collision
        if (snakeRef.current.some(segment => segment.x === head.x && segment.y === head.y)) {
            handleGameOver()
            return
        }

        snakeRef.current.unshift(head)

        // Food Collision
        if (head.x === foodRef.current.x && head.y === foodRef.current.y) {
            scoreRef.current += 10 + (gridCellsRef.current - 3) * 5
            setScore(scoreRef.current)
            playSound(600 + (scoreRef.current * 2), 'sine', 0.1)

            if (snakeRef.current.length >= cells * cells) {
                levelUp()
            } else {
                placeFood()
            }

        } else {
            snakeRef.current.pop() // Remove tail if no food eaten
        }

        draw()
    }

    const draw = () => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')
        if (!ctx) return

        const cells = gridCellsRef.current
        const cellWidth = canvas.width / cells
        const cellHeight = canvas.height / cells

        // Clear
        ctx.fillStyle = '#0f172a' // Dark slate background
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        // Draw Grid
        ctx.strokeStyle = '#1e293b'
        ctx.lineWidth = 0.5
        for (let x = 0; x <= canvas.width; x += cellWidth) {
            ctx.beginPath()
            ctx.moveTo(x, 0)
            ctx.lineTo(x, canvas.height)
            ctx.stroke()
        }
        for (let y = 0; y <= canvas.height; y += cellHeight) {
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
            foodRef.current.x * cellWidth + cellWidth / 2,
            foodRef.current.y * cellHeight + cellHeight / 2,
            Math.min(cellWidth, cellHeight) / 2 - 2,
            0,
            Math.PI * 2
        )
        ctx.fill()
        ctx.shadowBlur = 0

        // Draw Snake
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
                segment.x * cellWidth + 1,
                segment.y * cellHeight + 1,
                cellWidth - 2,
                cellHeight - 2
            )

            // Draw eyes on head
            if (isHead) {
                const headX = segment.x * cellWidth
                const headY = segment.y * cellHeight
                const eyeSize = Math.max(2, Math.min(cellWidth, cellHeight) * 0.15)
                const pupilSize = eyeSize * 0.5

                let eye1X = 0, eye1Y = 0, eye2X = 0, eye2Y = 0
                const nearX = cellWidth * 0.25
                const farX = cellWidth * 0.75
                const nearY = cellHeight * 0.25
                const farY = cellHeight * 0.75

                if (directionRef.current.x === 1) { // Right
                    eye1X = headX + farX; eye1Y = headY + nearY;
                    eye2X = headX + farX; eye2Y = headY + farY;
                } else if (directionRef.current.x === -1) { // Left
                    eye1X = headX + nearX; eye1Y = headY + nearY;
                    eye2X = headX + nearX; eye2Y = headY + farY;
                } else if (directionRef.current.y === -1) { // Up
                    eye1X = headX + nearX; eye1Y = headY + nearY;
                    eye2X = headX + farX; eye2Y = headY + nearY;
                } else { // Down
                    eye1X = headX + nearX; eye1Y = headY + farY;
                    eye2X = headX + farX; eye2Y = headY + farY;
                }

                // Whites of the eyes
                ctx.fillStyle = 'white'
                ctx.shadowColor = 'black'
                ctx.shadowBlur = 2

                ctx.beginPath()
                ctx.arc(eye1X, eye1Y, eyeSize, 0, Math.PI * 2)
                ctx.fill()

                ctx.beginPath()
                ctx.arc(eye2X, eye2Y, eyeSize, 0, Math.PI * 2)
                ctx.fill()

                // Pupils
                ctx.fillStyle = 'black'
                ctx.shadowBlur = 0

                // Offset pupil slightly in movement direction
                const pOff = eyeSize * 0.3
                const px = directionRef.current.x * pOff
                const py = directionRef.current.y * pOff

                ctx.beginPath()
                ctx.arc(eye1X + px, eye1Y + py, pupilSize, 0, Math.PI * 2)
                ctx.fill()

                ctx.beginPath()
                ctx.arc(eye2X + px, eye2Y + py, pupilSize, 0, Math.PI * 2)
                ctx.fill()
            }
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
            // Prevent default scrolling for arrow keys
            if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
                e.preventDefault()
            }

            if (!isPlaying) return

            switch (e.key) {
                case 'ArrowUp':
                    if (directionRef.current.y !== 1) nextDirectionRef.current = { x: 0, y: -1 }
                    break
                case 'ArrowDown':
                    if (directionRef.current.y !== -1) nextDirectionRef.current = { x: 0, y: 1 }
                    break
                case 'ArrowLeft':
                    if (directionRef.current.x !== 1) nextDirectionRef.current = { x: -1, y: 0 }
                    break
                case 'ArrowRight':
                    if (directionRef.current.x !== -1) nextDirectionRef.current = { x: 1, y: 0 }
                    break
            }
        }
        window.addEventListener('keydown', handleKeyDown, { passive: false })
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
                    if (directionRef.current.x !== -1) nextDirectionRef.current = { x: 1, y: 0 }
                } else { // Left
                    if (directionRef.current.x !== 1) nextDirectionRef.current = { x: -1, y: 0 }
                }
            } else {
                // Vertical
                if (dy > 0) { // Down
                    if (directionRef.current.y !== -1) nextDirectionRef.current = { x: 0, y: 1 }
                } else { // Up
                    if (directionRef.current.y !== 1) nextDirectionRef.current = { x: 0, y: -1 }
                }
            }
        }
        touchStartRef.current = null
    }

    return (
        <div
            ref={containerRef}
            className={`w-full flex flex-col items-center justify-center p-4 touch-none transition-colors ${isFullscreen ? 'bg-slate-950 h-screen overflow-hidden' : ''}`}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
        >

            {/* Score HUD - Moved Out of Canvas Overlay to avoid overlap issues */}
            <div className={`w-full flex justify-between items-center mb-4 px-4 ${isFullscreen ? 'mt-4 max-w-[800px]' : ''}`}>
                <div className="bg-black/50 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10 text-white font-mono flex items-center gap-4">
                    <span>SCORE: <span className="text-green-400 font-bold">{score}</span></span>
                    <span className="text-gray-400 border-l border-white/20 pl-4 hidden sm:inline">LEVEL: <span className="text-blue-400 font-bold">{level}</span></span>
                </div>

                <div className="flex items-center gap-2">
                    <div className="bg-black/50 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10 text-white font-mono hidden sm:flex items-center space-x-2">
                        <Trophy className="w-4 h-4 text-yellow-500" />
                        <span className="text-yellow-400 font-bold">{highScore}</span>
                    </div>

                    <button
                        onClick={toggleFullscreen}
                        className="p-2 bg-black/50 backdrop-blur-md rounded-xl border border-white/10 text-white hover:bg-white/10 transition-colors"
                        title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
                    >
                        {isFullscreen ? <Minimize className="w-5 h-5 text-gray-300" /> : <Maximize className="w-5 h-5 text-gray-300" />}
                    </button>
                </div>
            </div>

            {/* Game Canvas Container */}
            <div className="relative w-full aspect-square max-w-[800px] flex items-center justify-center bg-slate-900 rounded-xl shadow-2xl border border-slate-700 overflow-hidden">
                <canvas
                    ref={canvasRef}
                    width={800}
                    height={800}
                    className="w-full h-full object-cover block"
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
                        <div className="absolute bottom-10 sm:bottom-20 text-gray-400 text-sm">
                            Use Arrow Keys or Swipe to Move
                        </div>
                    </div>
                )}

                {isGameOver && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 backdrop-blur-md z-20 rounded-xl animate-in fade-in duration-300">
                        <h2 className="text-4xl sm:text-5xl font-black text-white mb-2 drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
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
        </div>
    )
}
