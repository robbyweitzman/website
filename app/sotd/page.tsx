"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { Music2, ExternalLink } from "lucide-react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { type Song, songs } from "../data/songs"
import { SiteHeader } from "@/components/site-header"

export default function SotdPage() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [displayIndex, setDisplayIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [selectedSong, setSelectedSong] = useState<Song | null>(null)
  const animationFrame = useRef<number>()

  const isDragging = useRef(false)
  const startX = useRef(0)
  const scrollLeft = useRef(0)

  const lastScrollTime = useRef(Date.now())
  const scrollTimeout = useRef<NodeJS.Timeout>()

  // Add these refs after the existing refs
  const touchStartX = useRef(0)
  const isTouching = useRef(false)

  const smoothScrollToIndex = useCallback(
    (targetIndex: number) => {
      const startTime = Date.now()
      const startIndex = displayIndex
      const duration = 300

      const animate = () => {
        const now = Date.now()
        const elapsed = now - startTime
        const progress = Math.min(elapsed / duration, 1)

        // Ease out cubic
        const easeProgress = 1 - Math.pow(1 - progress, 3)

        const newIndex = startIndex + (targetIndex - startIndex) * easeProgress
        setDisplayIndex(newIndex)

        if (progress < 1) {
          animationFrame.current = requestAnimationFrame(animate)
        } else {
          setDisplayIndex(targetIndex)
          setIsAnimating(false)
        }
      }

      setIsAnimating(true)
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current)
      }
      animate()
    },
    [displayIndex],
  )

  const navigate = useCallback(
    (direction: "prev" | "next") => {
      if (isAnimating) return

      const newIndex =
        direction === "prev" ? Math.max(0, currentIndex - 1) : Math.min(songs.length - 1, currentIndex + 1)

      if (newIndex !== currentIndex) {
        setCurrentIndex(newIndex)
        smoothScrollToIndex(newIndex)
      }
    },
    [currentIndex, isAnimating, smoothScrollToIndex],
  )

  const handleMouseDown = useCallback(
    (e: MouseEvent) => {
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current)
      }
      isDragging.current = true
      startX.current = e.pageX
      scrollLeft.current = currentIndex
    },
    [currentIndex],
  )

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging.current) return
    e.preventDefault()

    const x = e.pageX
    const walk = (startX.current - x) / 200
    const rawTarget = scrollLeft.current + walk
    const targetIndex = Math.max(0, Math.min(songs.length - 1, rawTarget))

    setDisplayIndex(targetIndex)
  }, [])

  const handleMouseUp = useCallback(
    (e: MouseEvent) => {
      if (!isDragging.current) return
      isDragging.current = false

      const nearestIndex = Math.round(displayIndex)
      setCurrentIndex(nearestIndex)
      smoothScrollToIndex(nearestIndex)
    },
    [displayIndex, smoothScrollToIndex],
  )

  // Add these handlers after the existing handlers
  const handleTouchStart = useCallback(
    (e: TouchEvent) => {
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current)
      }
      isTouching.current = true
      touchStartX.current = e.touches[0].pageX
      scrollLeft.current = currentIndex
    },
    [currentIndex],
  )

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!isTouching.current) return
    e.preventDefault()

    const x = e.touches[0].pageX
    const walk = (touchStartX.current - x) / 200
    const rawTarget = scrollLeft.current + walk
    const targetIndex = Math.max(0, Math.min(songs.length - 1, rawTarget))

    setDisplayIndex(targetIndex)
  }, [])

  const handleTouchEnd = useCallback(
    (e: TouchEvent) => {
      if (!isTouching.current) return
      isTouching.current = false

      const nearestIndex = Math.round(displayIndex)
      setCurrentIndex(nearestIndex)
      smoothScrollToIndex(nearestIndex)
    },
    [displayIndex, smoothScrollToIndex],
  )

  const handleWheel = useCallback(
    (e: WheelEvent) => {
      e.preventDefault()

      const now = Date.now()
      const timeDelta = now - lastScrollTime.current
      lastScrollTime.current = now

      // Reduce scroll speed and add more resistance
      const scrollSpeed = Math.min(Math.abs(e.deltaX) / 200, 0.5)
      const direction = e.deltaX > 0 ? 1 : -1

      // Calculate target index based on current position
      const targetIdx = Math.max(0, Math.min(songs.length - 1, displayIndex + direction * scrollSpeed))
      setDisplayIndex(targetIdx)

      // Clear existing timeout
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current)
      }

      // Snap to nearest index when scrolling stops
      scrollTimeout.current = setTimeout(() => {
        const nearestIndex = Math.round(targetIdx)
        setCurrentIndex(nearestIndex)
        smoothScrollToIndex(nearestIndex)
      }, 100)
    },
    [displayIndex, smoothScrollToIndex],
  )

  // Update the useEffect to include touch event listeners
  useEffect(() => {
    const container = document.getElementById("cover-flow-container")
    if (container) {
      container.addEventListener("wheel", handleWheel, { passive: false })
      container.addEventListener("mousedown", handleMouseDown)
      container.addEventListener("touchstart", handleTouchStart, { passive: false })
      container.addEventListener("touchmove", handleTouchMove, { passive: false })
      container.addEventListener("touchend", handleTouchEnd)
      window.addEventListener("mousemove", handleMouseMove)
      window.addEventListener("mouseup", handleMouseUp)
    }

    return () => {
      if (container) {
        container.removeEventListener("wheel", handleWheel)
        container.removeEventListener("mousedown", handleMouseDown)
        container.removeEventListener("touchstart", handleTouchStart)
        container.removeEventListener("touchmove", handleTouchMove)
        container.removeEventListener("touchend", handleTouchEnd)
      }
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseup", handleMouseUp)
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current)
      }
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current)
      }
    }
  }, [handleMouseDown, handleMouseMove, handleMouseUp, handleWheel, handleTouchStart, handleTouchMove, handleTouchEnd])

  const getTransform = (index: number) => {
    const diff = index - displayIndex
    if (diff === 0) {
      return `translateX(-50%) translateZ(0) rotateY(0deg)`
    } else if (diff < 0) {
      return `translateX(calc(${diff * 50 - 50}%)) translateZ(-200px) rotateY(45deg)`
    } else {
      return `translateX(calc(${diff * 50 - 50}%)) translateZ(-200px) rotateY(-45deg)`
    }
  }

  const getOpacity = (index: number) => {
    const diff = Math.abs(index - displayIndex)
    return Math.max(0, 1 - diff * 0.3)
  }

  return (
    <main className="min-h-screen bg-background">
      <SiteHeader />

      <div className="container px-8 md:px-16 py-12 mx-auto flex items-center justify-center min-h-[calc(100vh-88px)]">
        <div className="relative w-full max-w-5xl">
          <div
            id="cover-flow-container"
            className="relative w-full h-[600px] perspective-[1000px] cursor-grab active:cursor-grabbing touch-pan-x"
          >
            <div className="absolute inset-0 flex items-center justify-center">
              {songs.map((song, index) => (
                <div
                  key={song.id}
                  className="absolute left-1/2 w-[300px] transition-transform duration-300 ease-out"
                  style={{
                    transform: getTransform(index),
                    opacity: getOpacity(index),
                    zIndex: Math.round(displayIndex) === index ? 1 : 0,
                  }}
                  onClick={(e) => {
                    e.stopPropagation()
                    if (!isDragging.current) {
                      setSelectedSong(song)
                    }
                  }}
                >
                  <div className="relative aspect-square">
                    <button className="w-full h-full focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-lg">
                      <img
                        src={song.albumArt || "/placeholder.svg"}
                        alt={`${song.title} by ${song.artist}`}
                        className="w-full h-full object-cover rounded-lg shadow-xl"
                        draggable="false"
                      />
                    </button>
                    {Math.round(displayIndex) === index && (
                      <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/80 to-transparent rounded-b-lg">
                        <p className="text-white font-medium">{song.title}</p>
                        <p className="text-white/80 text-sm">{song.artist}</p>
                        <p className="text-white/60 text-xs mt-1">{song.date}</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Dialog open={!!selectedSong} onOpenChange={() => setSelectedSong(null)}>
        <DialogContent className="max-w-[90vw] max-h-[90vh] p-8">
          {selectedSong && (
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="flex-1">
                <img
                  src={selectedSong.albumArt || "/placeholder.svg"}
                  alt={`${selectedSong.title} by ${selectedSong.artist}`}
                  className="w-full h-auto object-contain max-h-[75vh] rounded-lg"
                />
              </div>
              <div className="w-full md:w-64 space-y-6">
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">{selectedSong.title}</h3>
                  <p className="text-muted-foreground">{selectedSong.artist}</p>
                  <p className="text-muted-foreground">{selectedSong.album}</p>
                  <p className="text-muted-foreground">{selectedSong.releaseDate}</p>
                </div>
                <div className="pt-6 border-t space-y-4">
                  <a
                    href={selectedSong.spotifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Music2 className="h-4 w-4" />
                    Listen on Spotify
                    <ExternalLink className="h-3 w-3" />
                  </a>
                  <a
                    href={selectedSong.appleMusicUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Music2 className="h-4 w-4" />
                    Listen on Apple Music
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </main>
  )
}

