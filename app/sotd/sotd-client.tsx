"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { Music2, ExternalLink } from "lucide-react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { type Song } from "../data/songs"

interface SotdClientProps {
  allSongs: Song[]
}

export default function SotdClient({ allSongs }: SotdClientProps) {
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

  // Add these refs for touch handling
  const touchStartX = useRef(0)
  const touchStartTime = useRef(0)

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
        direction === "prev" ? Math.max(0, currentIndex - 1) : Math.min(allSongs.length - 1, currentIndex + 1)

      if (newIndex !== currentIndex) {
        setCurrentIndex(newIndex)
        smoothScrollToIndex(newIndex)
      }
    },
    [currentIndex, isAnimating, smoothScrollToIndex, allSongs.length],
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
    const targetIndex = Math.max(0, Math.min(allSongs.length - 1, rawTarget))

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
      const targetIdx = Math.max(0, Math.min(allSongs.length - 1, displayIndex + direction * scrollSpeed))
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

  // Add these touch event handlers
  const handleTouchStart = useCallback(
    (e: TouchEvent) => {
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current)
      }
      isDragging.current = true
      touchStartX.current = e.touches[0].pageX
      touchStartTime.current = Date.now()
      scrollLeft.current = currentIndex
    },
    [currentIndex],
  )

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!isDragging.current) return
    e.preventDefault()

    const x = e.touches[0].pageX
    const walk = (touchStartX.current - x) / 200
    const rawTarget = scrollLeft.current + walk
    const targetIndex = Math.max(0, Math.min(allSongs.length - 1, rawTarget))

    setDisplayIndex(targetIndex)
  }, [])

  const handleTouchEnd = useCallback(
    (e: TouchEvent) => {
      if (!isDragging.current) return
      isDragging.current = false

      const touchEndX = e.changedTouches[0].pageX
      const touchEndTime = Date.now()
      
      // Calculate swipe velocity for momentum effect
      const touchDuration = touchEndTime - touchStartTime.current
      const touchDistance = touchStartX.current - touchEndX
      
      // If it was a quick swipe, move to next/previous
      if (touchDuration < 300 && Math.abs(touchDistance) > 50) {
        const direction = touchDistance > 0 ? 1 : -1
        const targetIndex = Math.max(0, Math.min(allSongs.length - 1, currentIndex + direction))
        setCurrentIndex(targetIndex)
        smoothScrollToIndex(targetIndex)
      } else {
        // Otherwise snap to nearest
        const nearestIndex = Math.round(displayIndex)
        setCurrentIndex(nearestIndex)
        smoothScrollToIndex(nearestIndex)
      }
    },
    [currentIndex, displayIndex, smoothScrollToIndex],
  )

  useEffect(() => {
    const container = document.getElementById("cover-flow-container")
    if (container) {
      container.addEventListener("wheel", handleWheel, { passive: false })
      container.addEventListener("mousedown", handleMouseDown)
      container.addEventListener("touchstart", handleTouchStart, { passive: false })
      window.addEventListener("mousemove", handleMouseMove)
      window.addEventListener("touchmove", handleTouchMove, { passive: false })
      window.addEventListener("mouseup", handleMouseUp)
      window.addEventListener("touchend", handleTouchEnd)
    }

    return () => {
      if (container) {
        container.removeEventListener("wheel", handleWheel)
        container.removeEventListener("mousedown", handleMouseDown)
        container.removeEventListener("touchstart", handleTouchStart)
      }
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("touchmove", handleTouchMove)
      window.removeEventListener("mouseup", handleMouseUp)
      window.removeEventListener("touchend", handleTouchEnd)
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
    const absDiff = Math.abs(diff)
    
    // Create a wider sweet spot - consider albums within 0.3 units to be "in focus"
    if (absDiff < 0.3) {
      // Gradually adjust rotation within the sweet spot for smooth transition
      const rotationFactor = diff * (1/0.3) * 45
      return `translateX(-50%) translateZ(0) rotateY(${rotationFactor}deg)`
    } else if (diff < 0) {
      return `translateX(calc(${diff * 30 - 50}%)) translateZ(-200px) rotateY(45deg)`
    } else {
      return `translateX(calc(${diff * 30 - 50}%)) translateZ(-200px) rotateY(-45deg)`
    }
  }

  const getOpacity = (index: number) => {
    const diff = Math.abs(index - displayIndex)
    // Increase opacity for items closer to the center
    return Math.max(0, 1 - diff * 0.3)
  }

  // New function to determine if an album is in focus with a tolerance
  const isInFocus = (index: number) => {
    return Math.abs(index - displayIndex) < 0.3
  }

  return (
    <div className="container px-8 md:px-16 py-4 sm:py-8 md:py-12 mx-auto">
      <div className="relative h-[400px] sm:h-[450px] md:h-[500px] lg:h-[600px]">
        <div
          id="cover-flow-container"
          className="relative w-full h-full perspective-[1000px] cursor-grab active:cursor-grabbing"
        >
          <div className="absolute inset-0 flex items-center justify-center pt-0 md:pt-4 lg:pt-0">
            {allSongs.map((song, index) => (
              <div
                key={song.id}
                className="absolute left-1/2 transform -translate-x-1/2 w-[280px] sm:w-[320px] md:w-[360px] lg:w-[400px] transition-transform duration-300 ease-out"
                style={{
                  transform: getTransform(index),
                  opacity: getOpacity(index),
                  zIndex: isInFocus(index) ? 1 : 0,
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
                  {isInFocus(index) && (
                    <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4 bg-gradient-to-t from-black/80 to-transparent rounded-b-lg">
                      <p className="text-white font-medium text-sm sm:text-base">{song.title}</p>
                      <p className="text-white/80 text-xs sm:text-sm">{song.artist}</p>
                      <p className="text-white/60 text-xs mt-1">{song.date}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
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
    </div>
  )
}