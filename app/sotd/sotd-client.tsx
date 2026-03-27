"use client"

import { useState, useEffect, useLayoutEffect, useCallback, useRef } from "react"
import { Music2, ExternalLink } from "lucide-react"
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

// Number of items to render on each side of the current index
const RENDER_WINDOW = 6

export default function SotdClient({ allSongs }: SotdClientProps) {
  // --- React state (triggers re-renders for UI updates) ---
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedSong, setSelectedSong] = useState<Song | null>(null)
  const [isDialogLoading, setIsDialogLoading] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  // --- Refs for animation state (no re-renders) ---
  const displayIndexRef = useRef(0)
  const currentIndexRef = useRef(0)
  const isAnimatingRef = useRef(false)
  const selectedSongRef = useRef<Song | null>(null)
  const animationFrame = useRef<number>()

  // --- Refs for drag/touch state ---
  const isDragging = useRef(false)
  const startX = useRef(0)
  const scrollLeft = useRef(0)
  const touchStartX = useRef(0)
  const touchStartY = useRef(0)
  const touchStartTime = useRef(0)
  const isVerticalScroll = useRef(false)

  // --- Refs for DOM elements ---
  const containerRef = useRef<HTMLDivElement>(null)
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])

  // --- Refs for scroll debouncing ---
  const scrollTimeout = useRef<NodeJS.Timeout>()

  const maxIndex = allSongs.length - 1

  // =============================================
  // Imperative DOM update — bypasses React render
  // =============================================
  const updateItemStyles = useCallback(() => {
    const di = displayIndexRef.current
    itemRefs.current.forEach((el, index) => {
      if (!el) return
      const diff = index - di
      const absDiff = Math.abs(diff)

      // Hide items far from view
      if (absDiff > 4) {
        el.style.visibility = "hidden"
        el.style.pointerEvents = "none"
        return
      }

      el.style.visibility = "visible"
      el.style.pointerEvents = ""

      // Transform
      if (absDiff < 0.3) {
        const rotationFactor = diff * (1 / 0.3) * 45
        el.style.transform = `translateX(-50%) translateZ(0) rotateY(${rotationFactor}deg)`
      } else if (diff < 0) {
        el.style.transform = `translateX(calc(${diff * 30 - 50}%)) translateZ(-200px) rotateY(45deg)`
      } else {
        el.style.transform = `translateX(calc(${diff * 30 - 50}%)) translateZ(-200px) rotateY(-45deg)`
      }

      // Opacity
      el.style.opacity = String(Math.max(0, 1 - absDiff * 0.3))

      // Z-index
      el.style.zIndex = absDiff < 0.3 ? "1" : "0"
    })
  }, [])

  // =============================================
  // Smooth scroll animation via requestAnimationFrame
  // =============================================
  const smoothScrollToIndex = useCallback(
    (targetIndex: number) => {
      const startIndex = displayIndexRef.current

      // No animation needed if already at target
      if (Math.abs(startIndex - targetIndex) < 0.001) {
        displayIndexRef.current = targetIndex
        updateItemStyles()
        isAnimatingRef.current = false
        currentIndexRef.current = targetIndex
        setCurrentIndex(targetIndex)
        return
      }

      const startTime = Date.now()
      const duration = 300

      const animate = () => {
        const elapsed = Date.now() - startTime
        const progress = Math.min(elapsed / duration, 1)

        // Ease out cubic
        const easeProgress = 1 - Math.pow(1 - progress, 3)

        displayIndexRef.current = startIndex + (targetIndex - startIndex) * easeProgress
        updateItemStyles()

        if (progress < 1) {
          animationFrame.current = requestAnimationFrame(animate)
        } else {
          displayIndexRef.current = targetIndex
          updateItemStyles()
          isAnimatingRef.current = false
          currentIndexRef.current = targetIndex
          setCurrentIndex(targetIndex)
        }
      }

      isAnimatingRef.current = true
      if (animationFrame.current) cancelAnimationFrame(animationFrame.current)
      animate()
    },
    [updateItemStyles],
  )

  // =============================================
  // Navigation
  // =============================================
  const navigate = useCallback(
    (direction: "prev" | "next") => {
      if (isAnimatingRef.current) return

      const current = currentIndexRef.current
      const newIndex =
        direction === "prev" ? Math.max(0, current - 1) : Math.min(allSongs.length - 1, current + 1)

      if (newIndex !== current) {
        currentIndexRef.current = newIndex
        setCurrentIndex(newIndex)
        smoothScrollToIndex(newIndex)
      }
    },
    [smoothScrollToIndex, allSongs.length],
  )

  // =============================================
  // Song selection
  // =============================================
  const handleSongSelect = useCallback((song: Song) => {
    setIsDialogLoading(true)
    setSelectedSong(song)
    selectedSongRef.current = song
    setTimeout(() => setIsDialogLoading(false), 150)
  }, [])

  // =============================================
  // Mouse event handlers (stable — read from refs)
  // =============================================
  const handleMouseDown = useCallback((e: MouseEvent) => {
    if (animationFrame.current) cancelAnimationFrame(animationFrame.current)
    isDragging.current = true
    startX.current = e.pageX
    scrollLeft.current = currentIndexRef.current
  }, [])

  const handleMouseUp = useCallback(
    (e: MouseEvent) => {
      if (!isDragging.current) return
      isDragging.current = false

      const nearestIndex = Math.round(displayIndexRef.current)
      currentIndexRef.current = nearestIndex
      setCurrentIndex(nearestIndex)
      smoothScrollToIndex(nearestIndex)
    },
    [smoothScrollToIndex],
  )

  // =============================================
  // Touch event handlers (stable — read from refs)
  // =============================================
  const handleTouchStart = useCallback((e: TouchEvent) => {
    if (animationFrame.current) cancelAnimationFrame(animationFrame.current)
    const touch = e.touches[0]
    touchStartX.current = touch.pageX
    touchStartY.current = touch.pageY
    touchStartTime.current = Date.now()
    scrollLeft.current = currentIndexRef.current
    isVerticalScroll.current = false

    // Only start dragging after determining it's not a vertical scroll
    setTimeout(() => {
      if (!isVerticalScroll.current) isDragging.current = true
    }, 50)
  }, [])

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
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
      if (deltaX > 20) e.preventDefault()

      const x = touch.pageX
      const walk = (touchStartX.current - x) / 200
      const rawTarget = scrollLeft.current + walk
      displayIndexRef.current = Math.max(0, Math.min(maxIndex, rawTarget))
      updateItemStyles()

      // Shift render window if dragged far from current center
      if (Math.abs(displayIndexRef.current - currentIndexRef.current) > 3) {
        const newCenter = Math.round(displayIndexRef.current)
        currentIndexRef.current = newCenter
        setCurrentIndex(newCenter)
      }
    },
    [maxIndex, updateItemStyles],
  )

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
        const momentum = Math.min(Math.abs(touchDistance) / 100, 2)
        const steps = Math.ceil(momentum)
        const targetIndex = Math.max(0, Math.min(maxIndex, currentIndexRef.current + direction * steps))
        currentIndexRef.current = targetIndex
        setCurrentIndex(targetIndex)
        smoothScrollToIndex(targetIndex)
      } else {
        // Snap to nearest
        const nearestIndex = Math.round(displayIndexRef.current)
        currentIndexRef.current = nearestIndex
        setCurrentIndex(nearestIndex)
        smoothScrollToIndex(nearestIndex)
      }
    },
    [smoothScrollToIndex, maxIndex],
  )

  // =============================================
  // Keyboard navigation (stable)
  // =============================================
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (selectedSongRef.current) return

      switch (e.key) {
        case "ArrowLeft":
        case "ArrowUp":
          e.preventDefault()
          navigate("prev")
          break
        case "ArrowRight":
        case "ArrowDown":
          e.preventDefault()
          navigate("next")
          break
        case "Enter":
        case " ":
          e.preventDefault()
          handleSongSelect(allSongs[currentIndexRef.current])
          break
        case "Home":
          e.preventDefault()
          currentIndexRef.current = 0
          setCurrentIndex(0)
          smoothScrollToIndex(0)
          break
        case "End": {
          e.preventDefault()
          const lastIdx = allSongs.length - 1
          currentIndexRef.current = lastIdx
          setCurrentIndex(lastIdx)
          smoothScrollToIndex(lastIdx)
          break
        }
      }
    },
    [navigate, smoothScrollToIndex, handleSongSelect, allSongs],
  )

  // =============================================
  // Throttled handlers (created once via lazy ref)
  // =============================================
  const throttledMouseMoveRef = useRef<((e: MouseEvent) => void) | null>(null)
  if (!throttledMouseMoveRef.current) {
    throttledMouseMoveRef.current = throttle((e: MouseEvent) => {
      if (!isDragging.current) return
      e.preventDefault()

      const x = e.pageX
      const walk = (startX.current - x) / 200
      const rawTarget = scrollLeft.current + walk
      displayIndexRef.current = Math.max(0, Math.min(maxIndex, rawTarget))
      updateItemStyles()

      // Shift render window if dragged far from current center
      if (Math.abs(displayIndexRef.current - currentIndexRef.current) > 3) {
        const newCenter = Math.round(displayIndexRef.current)
        currentIndexRef.current = newCenter
        setCurrentIndex(newCenter)
      }
    }, 16)
  }

  const throttledWheelRef = useRef<((e: WheelEvent) => void) | null>(null)
  if (!throttledWheelRef.current) {
    throttledWheelRef.current = throttle((e: WheelEvent) => {
      const scrollSpeed = Math.min(Math.abs(e.deltaX) / 200, 0.5)
      const direction = e.deltaX > 0 ? 1 : -1

      displayIndexRef.current = Math.max(
        0,
        Math.min(maxIndex, displayIndexRef.current + direction * scrollSpeed),
      )
      updateItemStyles()

      // Shift render window if scrolled far from current center
      if (Math.abs(displayIndexRef.current - currentIndexRef.current) > 3) {
        const newCenter = Math.round(displayIndexRef.current)
        currentIndexRef.current = newCenter
        setCurrentIndex(newCenter)
      }

      // Snap to nearest when scrolling stops
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current)
      scrollTimeout.current = setTimeout(() => {
        const nearestIndex = Math.round(displayIndexRef.current)
        currentIndexRef.current = nearestIndex
        setCurrentIndex(nearestIndex)
        smoothScrollToIndex(nearestIndex)
      }, 100)
    }, 16)
  }

  // =============================================
  // Effects
  // =============================================

  // Set styles synchronously after render (prevents flash on window shift)
  useLayoutEffect(() => {
    updateItemStyles()
  }, [currentIndex, updateItemStyles])

  // Attach event listeners once (all handlers are stable)
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const throttledWheel = throttledWheelRef.current!
    const mouseMoveHandler = throttledMouseMoveRef.current!

    // preventDefault on every wheel event to block browser back/forward gestures;
    // the throttled handler only fires periodically so it can't do this reliably.
    const wheelHandler = (e: WheelEvent) => {
      e.preventDefault()
      throttledWheel(e)
    }
    container.addEventListener("wheel", wheelHandler, { passive: false })
    container.addEventListener("mousedown", handleMouseDown)
    container.addEventListener("touchstart", handleTouchStart, { passive: false })
    window.addEventListener("mousemove", mouseMoveHandler)
    window.addEventListener("touchmove", handleTouchMove, { passive: false })
    window.addEventListener("mouseup", handleMouseUp)
    window.addEventListener("touchend", handleTouchEnd)
    window.addEventListener("keydown", handleKeyDown)

    return () => {
      container.removeEventListener("wheel", wheelHandler)
      container.removeEventListener("mousedown", handleMouseDown)
      container.removeEventListener("touchstart", handleTouchStart)
      window.removeEventListener("mousemove", mouseMoveHandler)
      window.removeEventListener("touchmove", handleTouchMove)
      window.removeEventListener("mouseup", handleMouseUp)
      window.removeEventListener("touchend", handleTouchEnd)
      window.removeEventListener("keydown", handleKeyDown)
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current)
      if (animationFrame.current) cancelAnimationFrame(animationFrame.current)
    }
  }, [handleMouseDown, handleMouseUp, handleTouchStart, handleTouchMove, handleTouchEnd, handleKeyDown])

  // =============================================
  // Render
  // =============================================
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
            {allSongs.map((song, index) => {
              // Virtualization: only render items within the render window
              if (Math.abs(index - currentIndex) > RENDER_WINDOW) return null

              return (
                <div
                  key={song.id || `song-${index}`}
                  ref={(el) => { itemRefs.current[index] = el }}
                  className="absolute left-1/2 w-[280px] sm:w-[320px] md:w-[360px] lg:w-[400px]"
                  style={{ willChange: "transform, opacity" }}
                  role="button"
                  tabIndex={index === currentIndex ? 0 : -1}
                  aria-label={`${song.title} by ${song.artist}, ${
                    index === currentIndex ? "currently selected" : `${Math.abs(index - currentIndex)} songs away`
                  }`}
                  onClick={(e) => {
                    e.stopPropagation()
                    if (!isDragging.current) handleSongSelect(song)
                  }}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <div className="relative aspect-square group">
                    <button
                      className="w-full h-full focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-lg"
                      aria-label={`View details for ${song.title} by ${song.artist}`}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault()
                          handleSongSelect(song)
                        }
                      }}
                    >
                      <img
                        src={song.albumArt || "/placeholder.svg"}
                        alt={`${song.title} by ${song.artist}`}
                        className={`w-full h-full object-cover rounded-lg shadow-xl transition-[transform,box-shadow] duration-300 ease-out ${
                          hoveredIndex === index && index === currentIndex ? "scale-105 shadow-2xl" : ""
                        }`}
                        draggable="false"
                      />
                    </button>
                    {index === currentIndex && (
                      <div
                        className={`absolute inset-x-0 bottom-0 p-3 sm:p-4 bg-gradient-to-t from-black/90 via-black/50 to-transparent rounded-b-lg transition-[transform] duration-300 ease-out ${
                          hoveredIndex === index ? "scale-105" : ""
                        }`}
                      >
                        <p className="text-white font-semibold text-sm sm:text-base line-clamp-1">{song.title}</p>
                        <p className="text-white/90 text-xs sm:text-sm line-clamp-1">{song.artist}</p>
                        <p className="text-white/70 text-xs mt-1">{song.date}</p>
                        <p className="text-white/60 text-xs mt-1 md:hidden">Tap to view details</p>
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <Dialog
        open={!!selectedSong}
        onOpenChange={() => {
          setSelectedSong(null)
          selectedSongRef.current = null
        }}
      >
        <DialogContent className="max-w-[85vw] sm:max-w-[90vw] md:max-w-4xl max-h-[95vh] p-4 sm:p-6 md:p-8 overflow-hidden">
          {selectedSong && (
            <div className="flex flex-col md:flex-row gap-3 sm:gap-6 md:gap-8 items-center md:items-start h-full">
              {/* Loading state */}
              {isDialogLoading && (
                <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-10 rounded-lg">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
              )}

              {/* Album Art */}
              <div className="flex-1 min-w-0 relative flex justify-center">
                <div className="relative aspect-square max-w-[260px] sm:max-w-[300px] md:max-w-none">
                  <img
                    src={selectedSong.albumArt || "/placeholder.svg"}
                    alt={`${selectedSong.title} by ${selectedSong.artist}`}
                    className="w-full h-full object-cover rounded-lg shadow-lg"
                  />
                </div>
              </div>

              {/* Song Details */}
              <div className="w-full md:w-80 flex flex-col min-w-0 relative h-full text-center md:text-left">
                <div className="flex-1">
                  <div className="space-y-3 mb-4 sm:mb-6">
                    <div className="space-y-1">
                      <h3 className="text-lg sm:text-xl md:text-2xl font-bold leading-tight">
                        {selectedSong.title}
                      </h3>
                      <p className="text-base sm:text-lg text-muted-foreground font-medium">
                        {selectedSong.artist}
                      </p>
                      <p className="text-sm text-muted-foreground font-medium">{selectedSong.album}</p>
                      <p className="text-sm text-muted-foreground">Release Date: {selectedSong.releaseDate}</p>

                      <div className="flex justify-center md:justify-start mt-2">
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-primary/10 text-primary rounded-full border border-primary/20">
                          <Music2 className="h-3 w-3" />
                          <span className="text-xs font-medium">Song of the Day: {selectedSong.date}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="border-t pt-4 sm:pt-6 space-y-3">
                    <h4 className="text-sm font-semibold text-foreground mb-3">Listen Now</h4>

                    <div className="grid grid-cols-1 gap-3">
                      {selectedSong.spotifyUrl && (
                        <a
                          href={selectedSong.spotifyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 p-3 rounded-lg border border-border bg-background/50 hover:bg-accent transition-all duration-200 group"
                        >
                          <div className="flex-shrink-0">
                            <img src="/spotify_logo.png" alt="Spotify" className="h-5 w-5" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium group-hover:text-foreground transition-colors">
                              Spotify
                            </p>
                            <p className="text-xs text-muted-foreground">Open in Spotify</p>
                          </div>
                          <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors flex-shrink-0" />
                        </a>
                      )}

                      <a
                        href={selectedSong.appleMusicUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-3 rounded-lg border border-border bg-background/50 hover:bg-accent transition-all duration-200 group"
                      >
                        <div className="flex-shrink-0">
                          <img src="/apple_music_logo.png" alt="Apple Music" className="h-5 w-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium group-hover:text-foreground transition-colors">
                            Apple Music
                          </p>
                          <p className="text-xs text-muted-foreground">Open in Apple Music</p>
                        </div>
                        <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors flex-shrink-0" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
