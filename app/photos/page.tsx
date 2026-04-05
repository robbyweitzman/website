"use client"

import { useState, useCallback, useEffect, useRef } from "react"
import Link from "next/link"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { ChevronLeft, ChevronRight, Camera } from "lucide-react"
import { type Photo, photos } from "../data/photos"
import Image from "next/image"
import { DarkModeToggle } from "@/components/dark-mode-toggle"

export default function PhotosPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set())
  const [modalImageLoading, setModalImageLoading] = useState(false)

  const openIndexRef = useRef<number | null>(null)
  const preloadCacheRef = useRef<Map<string, HTMLImageElement>>(new Map())

  openIndexRef.current = openIndex
  const selectedPhoto = openIndex !== null ? photos[openIndex] : null
  const isModalOpen = openIndex !== null

  // Preload adjacent images for smoother navigation
  const preloadAdjacent = useCallback((index: number) => {
    const cache = preloadCacheRef.current
    const preloadOne = (src: string, id: string) => {
      if (cache.has(id)) return
      if (cache.size >= 3) {
        const firstKey = cache.keys().next().value
        if (firstKey) cache.delete(firstKey)
      }
      const img = new window.Image()
      img.src = src
      cache.set(id, img)
    }
    if (index > 0) preloadOne(photos[index - 1].src, photos[index - 1].id)
    if (index < photos.length - 1) preloadOne(photos[index + 1].src, photos[index + 1].id)
  }, [])

  // Navigation functions — stable refs avoid listener churn
  const navigateToNext = useCallback(() => {
    const current = openIndexRef.current
    if (current === null || current >= photos.length - 1) return
    const next = current + 1
    setOpenIndex(next)
    preloadAdjacent(next)
  }, [preloadAdjacent])

  const navigateToPrevious = useCallback(() => {
    const current = openIndexRef.current
    if (current === null || current <= 0) return
    const prev = current - 1
    setOpenIndex(prev)
    preloadAdjacent(prev)
  }, [preloadAdjacent])

  const handlePhotoSelect = useCallback((photo: Photo, e?: React.MouseEvent) => {
    e?.preventDefault()
    const index = photos.findIndex(p => p.id === photo.id)
    setOpenIndex(index)
    setModalImageLoading(true)
    preloadAdjacent(index)
  }, [preloadAdjacent])

  // Keyboard navigation — listener attaches once on open, removes on close
  useEffect(() => {
    if (!isModalOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault()
          navigateToPrevious()
          break
        case 'ArrowRight':
          e.preventDefault()
          navigateToNext()
          break
        case 'Escape':
          setOpenIndex(null)
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isModalOpen, navigateToNext, navigateToPrevious])

  return (
    <main className="min-h-screen bg-[#FFFAF1] dark:bg-background transition-colors">
      <header className="container px-8 md:px-16 py-4 sm:py-5 md:py-6 mx-auto">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-lg font-medium hover:text-muted-foreground transition-colors">
            robby weitzman
          </Link>
          <div className="flex items-center gap-3 sm:gap-4 md:gap-6">
            <Link href="/mood-room" className="text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors">
              mood room
            </Link>
            <Link href="/photos" className="text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors">
              photos
            </Link>
            <Link href="/sotd" className="text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors">
              sotd
            </Link>
            <Link href="/quotes" className="text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors">
              quotes
            </Link>
            <Link href="/about" className="text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors">
              about
            </Link>
            <DarkModeToggle />
          </div>
        </div>
      </header>

      <div className="container px-8 md:px-16 py-12 mx-auto">
        <div className="max-w-[900px] mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {photos.map((photo, index) => (
              <button
                key={photo.id}
                type="button"
                onClick={(e) => handlePhotoSelect(photo, e)}
                className="w-full aspect-[3/4] rounded-lg overflow-hidden focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              >
                <Image
                  src={imageErrors.has(photo.id) ? "/placeholder.svg" : photo.src}
                  alt={photo.alt}
                  width={300}
                  height={400}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  priority={index < 2}
                  loading={index < 2 ? "eager" : "lazy"}
                  sizes="(max-width: 768px) 50vw, 33vw"
                  onError={() => {
                    setImageErrors(prev => new Set(prev).add(photo.id))
                  }}
                />
              </button>
            ))}
          </div>
        </div>
      </div>

      <Dialog
        open={isModalOpen}
        onOpenChange={(open) => {
          if (!open) setOpenIndex(null)
        }}
      >
        <DialogContent className="max-w-[95vw] sm:max-w-[90vw] md:max-w-6xl lg:max-w-7xl max-h-[95vh] p-4 sm:p-6 md:p-8 overflow-hidden">
          {selectedPhoto && (
            <div className="flex flex-col md:flex-row gap-4 sm:gap-6 md:gap-8 items-start h-full relative">
              
              {/* Photo */}
              <div className="flex-1 min-w-0 relative">
                <div className="relative max-w-md mx-auto md:max-w-none">
                  {modalImageLoading && (
                    <div className="w-full h-80 bg-muted rounded-lg flex items-center justify-center">
                      <div className="animate-pulse text-muted-foreground">Loading...</div>
                    </div>
                  )}
                  <Image
                    src={imageErrors.has(selectedPhoto.id) ? "/placeholder.svg" : selectedPhoto.src}
                    alt={selectedPhoto.alt}
                    width={1200}
                    height={800}
                    className={`w-full h-auto object-contain max-h-[60vh] sm:max-h-[70vh] md:max-h-[80vh] rounded-lg shadow-lg transition-opacity duration-200 ${modalImageLoading ? 'opacity-0' : 'opacity-100'}`}
                    priority
                    sizes="(max-width: 768px) 95vw, 80vw"
                    onLoad={() => setModalImageLoading(false)}
                    onError={() => {
                      setModalImageLoading(false)
                      setImageErrors(prev => new Set(prev).add(selectedPhoto.id))
                    }}
                  />
                </div>
              </div>
              
              {/* Photo Details */}
              <div className="w-full md:w-80 lg:w-72 flex flex-col min-w-0 relative h-full flex-shrink-0">
                <div className="flex-1">
                  {/* Photo Info */}
                  <div className="space-y-3 mb-4 sm:mb-6">
                    <div className="space-y-2">
                      <h3 className="text-lg sm:text-xl md:text-2xl font-bold leading-tight">
                        {selectedPhoto.title}
                      </h3>
                      
                      {/* Photo badge */}
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-primary/10 text-primary rounded-full border border-primary/20">
                        <Camera className="h-3 w-3" />
                        <span className="text-xs font-medium">Photo {(openIndex ?? 0) + 1} of {photos.length}</span>
                      </div>
                    </div>
                    
                    <div className="space-y-1 text-sm text-muted-foreground">
                      <p className="font-medium">{selectedPhoto.camera}</p>
                      <p>{selectedPhoto.film}</p>
                      <p>Taken: {selectedPhoto.date}</p>
                    </div>
                  </div>
                </div>
                
                {/* Mobile close hint */}
                <div className="md:hidden text-center pt-8">
                  <p className="text-xs text-muted-foreground">Tap outside to close</p>
                </div>
              </div>

              {/* Navigation arrows - bottom right */}
              <div className="absolute bottom-4 right-4 flex gap-2 z-10">
                <button
                  type="button"
                  onClick={(e) => { e.preventDefault(); navigateToPrevious(); }}
                  className="p-2 rounded-full bg-background/90 hover:bg-background border border-border shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={openIndex === 0}
                  aria-label="Previous photo"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                
                <button
                  type="button"
                  onClick={(e) => { e.preventDefault(); navigateToNext(); }}
                  className="p-2 rounded-full bg-background/90 hover:bg-background border border-border shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={openIndex === photos.length - 1}
                  aria-label="Next photo"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </main>
  )
}

