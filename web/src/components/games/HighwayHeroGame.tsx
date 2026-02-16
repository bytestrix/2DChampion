
'use client'

import { useEffect, useRef, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Play, RotateCcw, Trophy, ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from 'lucide-react'

interface HighwayHeroGameProps {
    gameId: string
    userId?: string
}

// Game Constants
const ROAD_WIDTH = 400
const ROAD_HEIGHT = 700
const CAR_WIDTH = 50
const CAR_HEIGHT = 100
const LANE_WIDTH = ROAD_WIDTH / 4 // 4 lanes? Or just free movement? Original had 350px width gameArea.
const PLAYER_SPEED_NORMAL = 5
const PLAYER_SPEED_FAST = 10

export default function HighwayHeroGame({ gameId, userId }: HighwayHeroGameProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [score, setScore] = useState(0)
    const [highScore, setHighScore] = useState(0)
    const [isPlaying, setIsPlaying] = useState(false)
    const [isGameOver, setIsGameOver] = useState(false)
    const supabase = createClient()

    // Game State Refs
    const gameState = useRef({
        player: { x: (ROAD_WIDTH - CAR_WIDTH) / 2, y: ROAD_HEIGHT - CAR_HEIGHT - 20, speed: PLAYER_SPEED_NORMAL, score: 0 },
        enemies: [] as { x: number, y: number, imageIndex: number, speed: number }[],
        lines: [] as { y: number }[],
        keys: { ArrowUp: false, ArrowDown: false, ArrowLeft: false, ArrowRight: false, x: false, z: false },
        gameLoopId: 0 as number,
        lastFrameTime: 0,
        spawnTimer: 0
    })

    const imagesRef = useRef<{ [key: string]: HTMLImageElement }>({})

    // Load High Score
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

    // Load Images
    useEffect(() => {
        const imagePaths = [
            '/games/highway-hero/car2.png',
            '/games/highway-hero/enemy1.png',
            '/games/highway-hero/enemy2.png',
            '/games/highway-hero/enemy3.png',
            '/games/highway-hero/enemy4.png',
            '/games/highway-hero/enemy5.png',
        ]

        let loadedCount = 0
        imagePaths.forEach(path => {
            const img = new Image()
            img.src = path
            img.onload = () => {
                imagesRef.current[path] = img
                loadedCount++
            }
        })
    }, [])

    const initGame = () => {
        gameState.current = {
            player: { x: (ROAD_WIDTH - CAR_WIDTH) / 2, y: ROAD_HEIGHT - CAR_HEIGHT - 20, speed: PLAYER_SPEED_NORMAL, score: 0 },
            enemies: [],
            lines: Array.from({ length: 5 }, (_, i) => ({ y: i * 150 })),
            keys: { ArrowUp: false, ArrowDown: false, ArrowLeft: false, ArrowRight: false, x: false, z: false },
            gameLoopId: 0,
            lastFrameTime: performance.now(),
            spawnTimer: 0
        }
        setScore(0)
        setIsGameOver(false)
        setIsPlaying(true)
    }

    const collision = (a: { x: number, y: number, w: number, h: number }, b: { x: number, y: number, w: number, h: number }) => {
        return !(
            a.y + a.h < b.y ||
            a.y > b.y + b.h ||
            a.x + a.w < b.x ||
            a.x > b.x + b.w
        )
    }

    const handleGameOver = async () => {
        setIsPlaying(false)
        setIsGameOver(true)
        cancelAnimationFrame(gameState.current.gameLoopId)

        if (userId && gameState.current.player.score > highScore) {
            setHighScore(Math.floor(gameState.current.player.score))
            await supabase.from('scores').insert({
                game_id: gameId,
                user_id: userId,
                score: Math.floor(gameState.current.player.score)
            })
            await supabase.rpc('increment_play_count', { game_id_param: gameId })
        }
    }

    // Game Loop Logic
    const animate = (time: number) => {
        if (!isPlayingRef.current) return

        const state = gameState.current
        const ctx = canvasRef.current?.getContext('2d')

        if (!ctx || !canvasRef.current) return

        // Update Logic
        const player = state.player
        const keys = state.keys

        // Speed Boost
        player.speed = keys.x ? PLAYER_SPEED_FAST : PLAYER_SPEED_NORMAL

        // Move Player
        if (keys.ArrowUp && player.y > 100) player.y -= player.speed
        if (keys.ArrowDown && player.y < ROAD_HEIGHT - CAR_HEIGHT - 10) player.y += player.speed
        if (keys.ArrowLeft && player.x > 0) player.x -= player.speed
        if (keys.ArrowRight && player.x < ROAD_WIDTH - CAR_WIDTH) player.x += player.speed

        // Move Lines (Road Effect)
        state.lines.forEach(line => {
            line.y += player.speed
            if (line.y >= ROAD_HEIGHT) {
                line.y = -150
            }
        })

        // Spawn Enemies
        state.spawnTimer++
        if (state.spawnTimer > 100 - (player.score / 100)) { // Increase spawn rate as score increases
            state.spawnTimer = 0
            if (state.enemies.length < 5) {
                state.enemies.push({
                    x: Math.random() * (ROAD_WIDTH - CAR_WIDTH),
                    y: -200,
                    imageIndex: Math.floor(Math.random() * 5) + 1, // 1-5
                    speed: Math.random() * 2 + 2 // Random enemy speed
                })
            }
        }

        // Move Enemies
        // We'll filter out enemies that go off screen to keep array clean
        // But first move them
        state.enemies.forEach(enemy => {
            enemy.y += player.speed * 0.8 + enemy.speed
        })

        // Remove off-screen enemies
        state.enemies = state.enemies.filter(enemy => enemy.y <= ROAD_HEIGHT)

        // Collision Detection
        let crashed = false
        state.enemies.forEach(enemy => {
            if (collision(
                { x: player.x + 5, y: player.y + 5, w: CAR_WIDTH - 10, h: CAR_HEIGHT - 10 },
                { x: enemy.x + 5, y: enemy.y + 5, w: CAR_WIDTH - 10, h: CAR_HEIGHT - 10 }
            )) {
                crashed = true
            }
        })

        if (crashed) {
            handleGameOver()
            return
        }

        // Update Score
        player.score += 0.1
        setScore(Math.floor(player.score))

        // Draw
        // Clear
        ctx.fillStyle = '#333'
        ctx.fillRect(0, 0, ROAD_WIDTH, ROAD_HEIGHT)

        // Draw Lines
        ctx.fillStyle = '#fff'
        state.lines.forEach(line => {
            ctx.fillRect(ROAD_WIDTH / 2 - 5, line.y, 10, 100)
        })

        // Draw Borders
        ctx.fillStyle = '#22c55e'
        ctx.fillRect(0, 0, 10, ROAD_HEIGHT)
        ctx.fillRect(ROAD_WIDTH - 10, 0, 10, ROAD_HEIGHT)

        // Draw Player
        const playerImg = imagesRef.current['/games/highway-hero/car2.png']
        if (playerImg) {
            ctx.drawImage(playerImg, player.x, player.y, CAR_WIDTH, CAR_HEIGHT)
        } else {
            ctx.fillStyle = 'blue'
            ctx.fillRect(player.x, player.y, CAR_WIDTH, CAR_HEIGHT)
        }

        // Draw Enemies
        state.enemies.forEach(enemy => {
            const enemyImg = imagesRef.current[`/games/highway-hero/enemy${enemy.imageIndex}.png`]
            if (enemyImg) {
                ctx.drawImage(enemyImg, enemy.x, enemy.y, CAR_WIDTH, CAR_HEIGHT)
            } else {
                ctx.fillStyle = 'red'
                ctx.fillRect(enemy.x, enemy.y, CAR_WIDTH, CAR_HEIGHT)
            }
        })

        gameState.current.gameLoopId = requestAnimationFrame(animate)
    }

    const isPlayingRef = useRef(isPlaying)
    useEffect(() => {
        isPlayingRef.current = isPlaying
        if (isPlaying) {
            gameState.current.gameLoopId = requestAnimationFrame(animate)
        } else {
            cancelAnimationFrame(gameState.current.gameLoopId)
        }
        return () => cancelAnimationFrame(gameState.current.gameLoopId)
    }, [isPlaying])

    useEffect(() => {
        // Controls
        const handleKeyDown = (e: KeyboardEvent) => {
            if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].includes(e.key)) {
                e.preventDefault()
            }
            if (gameState.current.keys.hasOwnProperty(e.key)) {
                gameState.current.keys[e.key as keyof typeof gameState.current.keys] = true
            }
            if (e.key.toLowerCase() === 'x') gameState.current.keys.x = true
            // if (e.key.toLowerCase() === 'z') gameState.current.keys.z = true 
        }

        const handleKeyUp = (e: KeyboardEvent) => {
            if (gameState.current.keys.hasOwnProperty(e.key)) {
                gameState.current.keys[e.key as keyof typeof gameState.current.keys] = false
            }
            if (e.key.toLowerCase() === 'x') gameState.current.keys.x = false
        }

        window.addEventListener('keydown', handleKeyDown)
        window.addEventListener('keyup', handleKeyUp)

        return () => {
            window.removeEventListener('keydown', handleKeyDown)
            window.removeEventListener('keyup', handleKeyUp)
        }
    }, [])


    // Touch Controls (Virtual Joystick)
    const touchStartRef = useRef<{ x: number, y: number } | null>(null)

    const handleTouchStart = (e: React.TouchEvent) => {
        touchStartRef.current = {
            x: e.touches[0].clientX,
            y: e.touches[0].clientY
        }
    }

    const handleTouchMove = (e: React.TouchEvent) => {
        if (!touchStartRef.current) return

        const currentX = e.touches[0].clientX
        const currentY = e.touches[0].clientY

        const dx = currentX - touchStartRef.current.x
        const dy = currentY - touchStartRef.current.y

        // Reset keys first
        gameState.current.keys.ArrowLeft = false
        gameState.current.keys.ArrowRight = false
        gameState.current.keys.ArrowUp = false
        gameState.current.keys.ArrowDown = false

        // Sensitivity threshold
        const threshold = 10

        if (dx < -threshold) gameState.current.keys.ArrowLeft = true
        if (dx > threshold) gameState.current.keys.ArrowRight = true
        if (dy < -threshold) gameState.current.keys.ArrowUp = true
        if (dy > threshold) gameState.current.keys.ArrowDown = true
    }

    const handleTouchEnd = () => {
        touchStartRef.current = null
        // Reset movement keys on release
        gameState.current.keys.ArrowLeft = false
        gameState.current.keys.ArrowRight = false
        gameState.current.keys.ArrowUp = false
        gameState.current.keys.ArrowDown = false
    }

    return (
        <div
            className="relative w-full h-full flex flex-col items-center justify-center p-4 touch-none"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
        >

            {/* Score HUD */}
            <div className="absolute top-4 left-0 right-0 px-8 flex justify-between items-center z-10 pointer-events-none">
                <div className="bg-black/50 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10 text-white font-mono">
                    SCORE: <span className="text-blue-400 font-bold">{score}</span>
                </div>
                <div className="bg-black/50 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10 text-white font-mono flex items-center space-x-2">
                    <Trophy className="w-4 h-4 text-yellow-500" />
                    <span className="text-yellow-400 font-bold">{highScore}</span>
                </div>
            </div>

            {/* Game Canvas */}
            <div className="relative rounded-xl overflow-hidden shadow-2xl border-4 border-gray-800">
                <canvas
                    ref={canvasRef}
                    width={ROAD_WIDTH}
                    height={ROAD_HEIGHT}
                    className="bg-gray-800"
                />
            </div>

            {/* Overlays */}
            {!isPlaying && !isGameOver && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-20 rounded-xl">
                    <button
                        onClick={initGame}
                        className="group relative px-8 py-4 bg-blue-500 hover:bg-blue-400 text-white font-black text-2xl rounded-full transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(59,130,246,0.5)] flex items-center space-x-3"
                    >
                        <Play className="w-8 h-8 fill-current" />
                        <span>START RACE</span>
                    </button>
                    <div className="absolute bottom-20 text-gray-400 text-sm flex flex-col items-center space-y-2">
                        <div className="flex space-x-2">
                            <ArrowUp className="w-6 h-6 border rounded p-1" />
                            <ArrowDown className="w-6 h-6 border rounded p-1" />
                            <ArrowLeft className="w-6 h-6 border rounded p-1" />
                            <ArrowRight className="w-6 h-6 border rounded p-1" />
                        </div>
                        <span>Hold 'X' for Turbo Speed!</span>
                    </div>
                </div>
            )}

            {isGameOver && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 backdrop-blur-md z-20 rounded-xl animate-in fade-in duration-300">
                    <h2 className="text-5xl font-black text-white mb-2 drop-shadow-[0_0_10px_rgba(255,0,0,0.5)]">
                        CRASHED!
                    </h2>
                    <p className="text-gray-400 mb-8 text-xl">
                        Final Score: <span className="text-blue-400 font-bold">{score}</span>
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3">
                        <button
                            onClick={initGame}
                            className="group px-8 py-3 bg-gradient-to-r from-[#ff9500] to-[#ffd700] text-black font-bold text-lg rounded-full hover:shadow-glow-gold transition-all hover:scale-105 active:scale-95 flex items-center space-x-2"
                        >
                            <RotateCcw className="w-5 h-5" />
                            <span>Race Again</span>
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
