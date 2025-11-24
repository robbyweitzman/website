"use client"

import { useState, useEffect, useCallback, useRef, useMemo } from "react"
import { Music2, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { type Song } from "../data/songs"

interface SotdClientProps {
  allSongs: Song[]
}

// Throttle utility for performance
const throttle = <T extends (...args: any[]) => void>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: NodeJS.Timeout | null = null
  let lastExecTime = 0
  
  return (...args: Parameters<T>) => {
    const currentTime = Date.now()
    
    if (currentTime - lastExecTime > delay) {
      func(...args)
      lastExecTime = currentTime
    } else {
      if (timeoutId) clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        func(...args)
        lastExecTime = Date.now()
      }, delay - (currentTime - lastExecTime))
    }
  }
}

export default function SotdClient({ allSongs }: SotdClientProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [displayIndex, setDisplayIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [selectedSong, setSelectedSong] = useState<Song | null>(null)
  const [isDialogLoading, setIsDialogLoading] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const animationFrame = useRef<number>()

  const isDragging = useRef(false)
  const startX = useRef(0)
  const scrollLeft = useRef(0)

  const lastScrollTime = useRef(Date.now())
  const scrollTimeout = useRef<NodeJS.Timeout>()

  // Touch handling refs
  const touchStartX = useRef(0)
  const touchStartTime = useRef(0)
  const touchStartY = useRef(0)
  const isVerticalScroll = useRef(false)
  
  // Container ref for better event handling
  const containerRef = useRef<HTMLDivElement>(null)

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

  const handleMouseMove = useCallback(throttle((e: MouseEvent) => {
    if (!isDragging.current) return
    e.preventDefault()

    const x = e.pageX
    const walk = (startX.current - x) / 200
    const rawTarget = scrollLeft.current + walk
    const targetIndex = Math.max(0, Math.min(allSongs.length - 1, rawTarget))

    setDisplayIndex(targetIndex)
  }, 16), [allSongs.length]) // ~60fps throttling

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

  const handleWheel = useCallback(throttle(
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
    }, 16
  ), [displayIndex, smoothScrollToIndex, allSongs.length]) // ~60fps throttling

  // Enhanced touch event handlers with better mobile UX
  const handleTouchStart = useCallback(
    (e: TouchEvent) => {
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current)
      }
      
      const touch = e.touches[0]
      touchStartX.current = touch.pageX
      touchStartY.current = touch.pageY
      touchStartTime.current = Date.now()
      scrollLeft.current = currentIndex
      isVerticalScroll.current = false
      
      // Only start dragging after determining it's not a vertical scroll
      setTimeout(() => {
        if (!isVerticalScroll.current) {
          isDragging.current = true
        }
      }, 50)
    },
    [currentIndex],
  )

  const handleTouchMove = useCallback((e: TouchEvent) => {
    const touch = e.touches[0]
    const deltaX = Math.abs(touch.pageX - touchStartX.current)
    const deltaY = Math.abs(touch.pageY - touchStartY.current)
    
    // Detect vertical scroll intent
    if (deltaY > deltaX && deltaY > 20) {
      isVerticalScroll.current = true
      isDragging.current = false
      return
    }
    
    if (!isDragging.current) return
    
    // Prevent default only for horizontal scrolling
    if (deltaX > 20) {
      e.preventDefault()
    }

    const x = touch.pageX
    const walk = (touchStartX.current - x) / 200
    const rawTarget = scrollLeft.current + walk
    const targetIndex = Math.max(0, Math.min(allSongs.length - 1, rawTarget))

    setDisplayIndex(targetIndex)
  }, [allSongs.length])

  const handleTouchEnd = useCallback(
    (e: TouchEvent) => {
      if (!isDragging.current && !isVerticalScroll.current) return
      
      const wasVerticalScroll = isVerticalScroll.current
      isDragging.current = false
      isVerticalScroll.current = false
      
      if (wasVerticalScroll) return

      const touchEndX = e.changedTouches[0].pageX
      const touchEndTime = Date.now()
      
      // Calculate swipe velocity for momentum effect
      const touchDuration = touchEndTime - touchStartTime.current
      const touchDistance = touchStartX.current - touchEndX
      
      // Enhanced swipe detection with better thresholds
      if (touchDuration < 400 && Math.abs(touchDistance) > 30) {
        const direction = touchDistance > 0 ? 1 : -1
        const momentum = Math.min(Math.abs(touchDistance) / 100, 2) // Cap momentum
        const steps = Math.ceil(momentum)
        const targetIndex = Math.max(0, Math.min(allSongs.length - 1, currentIndex + direction * steps))
        setCurrentIndex(targetIndex)
        smoothScrollToIndex(targetIndex)
      } else {
        // Otherwise snap to nearest
        const nearestIndex = Math.round(displayIndex)
        setCurrentIndex(nearestIndex)
        smoothScrollToIndex(nearestIndex)
      }
    },
    [currentIndex, displayIndex, smoothScrollToIndex, allSongs.length],
  )

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (selectedSong) return // Don't handle keys when dialog is open
      
      switch (e.key) {
        case 'ArrowLeft':
        case 'ArrowUp':
          e.preventDefault()
          navigate('prev')
          break
        case 'ArrowRight':
        case 'ArrowDown':
          e.preventDefault()
          navigate('next')
          break
        case 'Enter':
        case ' ':
          e.preventDefault()
          setSelectedSong(allSongs[currentIndex])
          break
        case 'Home':
          e.preventDefault()
          setCurrentIndex(0)
          smoothScrollToIndex(0)
          break
        case 'End':
          e.preventDefault()
          const lastIndex = allSongs.length - 1
          setCurrentIndex(lastIndex)
          smoothScrollToIndex(lastIndex)
          break
      }
    },
    [selectedSong, navigate, allSongs, currentIndex, smoothScrollToIndex],
  )

  // Handle song selection with loading state
  const handleSongSelect = useCallback(
    (song: Song) => {
      setIsDialogLoading(true)
      setSelectedSong(song)
      // Simulate loading time for smooth UX
      setTimeout(() => setIsDialogLoading(false), 150)
    },
    []
  )

  useEffect(() => {
    const container = containerRef.current
    if (container) {
      container.addEventListener("wheel", handleWheel, { passive: false })
      container.addEventListener("mousedown", handleMouseDown)
      container.addEventListener("touchstart", handleTouchStart, { passive: false })
      window.addEventListener("mousemove", handleMouseMove)
      window.addEventListener("touchmove", handleTouchMove, { passive: false })
      window.addEventListener("mouseup", handleMouseUp)
      window.addEventListener("touchend", handleTouchEnd)
      window.addEventListener("keydown", handleKeyDown)
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
      window.removeEventListener("keydown", handleKeyDown)
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current)
      }
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current)
      }
    }
  }, [handleMouseDown, handleMouseMove, handleMouseUp, handleWheel, handleTouchStart, handleTouchMove, handleTouchEnd, handleKeyDown])

  // Memoized transform calculation for performance
  const getTransform = useMemo(() => {
    return (index: number) => {
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
  }, [displayIndex])

  // Memoized opacity calculation for performance
  const getOpacity = useMemo(() => {
    return (index: number) => {
      const diff = Math.abs(index - displayIndex)
      // Increase opacity for items closer to the center
      return Math.max(0, 1 - diff * 0.3)
    }
  }, [displayIndex])

  // Memoized function to determine if an album is in focus with a tolerance
  const isInFocus = useMemo(() => {
    return (index: number) => {
      return Math.abs(index - displayIndex) < 0.3
    }
  }, [displayIndex])

  return (
    <div className="container px-4 sm:px-8 md:px-16 py-4 sm:py-8 md:py-12 mx-auto">
      
      {/* Mobile current song display */}
      <div className="md:hidden text-center mb-4">
        <p className="text-sm font-medium">{allSongs[currentIndex]?.title}</p>
        <p className="text-xs text-muted-foreground">{allSongs[currentIndex]?.artist}</p>
      </div>
      
      <div className="relative h-[350px] sm:h-[400px] md:h-[450px] lg:h-[550px]">
        <div
          ref={containerRef}
          className="relative w-full h-full perspective-[1000px] cursor-grab active:cursor-grabbing focus:outline-none rounded-lg"
          tabIndex={0}
          role="region"
          aria-label="Song carousel"
        >
          <div className="absolute inset-0 flex items-center justify-center pt-0 md:pt-4 lg:pt-0">
            {allSongs.map((song, index) => (
              <div
                key={song.id || `song-${index}`}
                className="absolute left-1/2 transform -translate-x-1/2 w-[280px] sm:w-[320px] md:w-[360px] lg:w-[400px] transition-transform duration-300 ease-out"
                style={{
                  transform: getTransform(index),
                  opacity: getOpacity(index),
                  zIndex: isInFocus(index) ? 1 : 0,
                }}
                role="button"
                tabIndex={isInFocus(index) ? 0 : -1}
                aria-label={`${song.title} by ${song.artist}, ${isInFocus(index) ? 'currently selected' : `${Math.abs(index - currentIndex)} songs away`}`}
                onClick={(e) => {
                  e.stopPropagation()
                  if (!isDragging.current) {
                    handleSongSelect(song)
                  }
                }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div className="relative aspect-square group">
                  <button 
                    className="w-full h-full focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-lg transition-all duration-300"
                    aria-label={`View details for ${song.title} by ${song.artist}`}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault()
                        handleSongSelect(song)
                      }
                    }}
                  >
                    <img
                      src={song.albumArt || "/placeholder.svg"}
                      alt={`${song.title} by ${song.artist}`}
                      className={`w-full h-full object-cover rounded-lg shadow-xl transition-all duration-300 ${
                        hoveredIndex === index && isInFocus(index) ? 'scale-105 shadow-2xl' : ''
                      }`}
                      draggable="false"
                    />
                  </button>
                  {isInFocus(index) && (
                    <div className={`absolute inset-x-0 bottom-0 p-3 sm:p-4 bg-gradient-to-t from-black/90 via-black/50 to-transparent rounded-b-lg transition-all duration-300 ${
                      hoveredIndex === index && isInFocus(index) ? 'scale-105' : ''
                    }`}>
                      <p className="text-white font-semibold text-sm sm:text-base line-clamp-1">{song.title}</p>
                      <p className="text-white/90 text-xs sm:text-sm line-clamp-1">{song.artist}</p>
                      <p className="text-white/70 text-xs mt-1">{song.date}</p>
                      {/* Tap/click hint for mobile */}
                      <p className="text-white/60 text-xs mt-1 md:hidden">Tap to view details</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Dialog open={!!selectedSong} onOpenChange={() => setSelectedSong(null)}>
        <DialogContent className="max-w-[95vw] sm:max-w-md md:max-w-2xl p-0 overflow-hidden gap-0">
          {selectedSong && (
            <div className="flex flex-col">
              {/* Loading state */}
              {isDialogLoading && (
                <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-10 rounded-lg">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
              )}

              {/* Album Art - Full width on mobile */}
              <div className="relative w-full aspect-square md:aspect-auto md:h-auto">
                <img
                  src={selectedSong.albumArt || "/placeholder.svg"}
                  alt={`${selectedSong.title} by ${selectedSong.artist}`}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Song Details */}
              <div className="p-6 space-y-4">
                {/* Song Info */}
                <div className="space-y-2">
                  <h3 className="text-xl md:text-2xl font-light text-[#2C2420] dark:text-[#F5EDE4]" style={{ fontFamily: 'var(--font-display)' }}>
                    {selectedSong.title}
                  </h3>
                  <p className="text-base text-[#8B7A6E] dark:text-[#9B8A7E]">
                    {selectedSong.artist}
                  </p>
                  <p className="text-sm text-[#8B7A6E] dark:text-[#9B8A7E]">{selectedSong.album}</p>
                </div>

                {/* Metadata */}
                <div className="flex flex-wrap items-center gap-3 text-xs text-[#8B7A6E] dark:text-[#9B8A7E]">
                  <div className="flex items-center gap-1.5">
                    <Music2 className="h-3.5 w-3.5 text-[#EB582D]" />
                    <span>{selectedSong.date}</span>
                  </div>
                  <span className="text-[#E8DED3] dark:text-[#3A2F28]">•</span>
                  <span>{selectedSong.releaseDate}</span>
                </div>

                {/* Streaming Links */}
                <div className="space-y-2 pt-2">
                  <a
                    href={selectedSong.spotifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between w-full p-3.5 rounded-lg bg-[#FDF8F3] dark:bg-[#1A1512] border border-[#E8DED3]/50 dark:border-[#3A2F28]/50 hover:border-[#EB582D] transition-all duration-200 group"
                  >
                    <div className="flex items-center gap-3">
                      <img src="/spotify_logo.png" alt="Spotify" className="h-5 w-5" />
                      <span className="text-sm font-medium text-[#2C2420] dark:text-[#F5EDE4]">Spotify</span>
                    </div>
                    <ExternalLink className="h-4 w-4 text-[#8B7A6E] dark:text-[#9B8A7E] group-hover:text-[#EB582D] transition-colors" />
                  </a>

                  <a
                    href={selectedSong.appleMusicUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between w-full p-3.5 rounded-lg bg-[#FDF8F3] dark:bg-[#1A1512] border border-[#E8DED3]/50 dark:border-[#3A2F28]/50 hover:border-[#EB582D] transition-all duration-200 group"
                  >
                    <div className="flex items-center gap-3">
                      <img src="/apple_music_logo.png" alt="Apple Music" className="h-5 w-5" />
                      <span className="text-sm font-medium text-[#2C2420] dark:text-[#F5EDE4]">Apple Music</span>
                    </div>
                    <ExternalLink className="h-4 w-4 text-[#8B7A6E] dark:text-[#9B8A7E] group-hover:text-[#EB582D] transition-colors" />
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