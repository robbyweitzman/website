"use client"

import { useState, useCallback, useEffect } from "react"
import Link from "next/link"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { ChevronLeft, ChevronRight, Camera } from "lucide-react"
import { type Photo, photos } from "../data/photos"
import Image from "next/image"
import { DarkModeToggle } from "@/components/dark-mode-toggle"

export default function PhotosPage() {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null)
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0)
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set())
  const [modalImageLoading, setModalImageLoading] = useState(false)
  const [preloadedImages] = useState<Map<string, HTMLImageElement>>(new Map())

  // Navigation functions
  const navigateToNext = useCallback(() => {
    if (currentPhotoIndex < photos.length - 1) {
      setModalImageLoading(true)
      const nextIndex = currentPhotoIndex + 1
      setCurrentPhotoIndex(nextIndex)
      setSelectedPhoto(photos[nextIndex])
    }
  }, [currentPhotoIndex])

  const navigateToPrevious = useCallback(() => {
    if (currentPhotoIndex > 0) {
      setModalImageLoading(true)
      const prevIndex = currentPhotoIndex - 1
      setCurrentPhotoIndex(prevIndex)
      setSelectedPhoto(photos[prevIndex])
    }
  }, [currentPhotoIndex])

  // Handle photo selection from grid
  const handlePhotoSelect = useCallback((photo: Photo, e?: React.MouseEvent) => {
    e?.preventDefault()
    const index = photos.findIndex(p => p.id === photo.id)
    setCurrentPhotoIndex(index)
    setSelectedPhoto(photo)
    setModalImageLoading(true)
    
    // Preload adjacent images for better navigation (limit memory usage)
    const preloadImage = (src: string, id: string) => {
      if (preloadedImages.has(id)) return
      
      // Limit preloaded images to 3 to save memory
      if (preloadedImages.size >= 3) {
        const firstKey = preloadedImages.keys().next().value
        if (firstKey) {
          preloadedImages.delete(firstKey)
        }
      }
      
      const img = new window.Image()
      img.src = src
      preloadedImages.set(id, img)
    }
    
    if (index > 0) preloadImage(photos[index - 1].src, photos[index - 1].id)
    if (index < photos.length - 1) preloadImage(photos[index + 1].src, photos[index + 1].id)
  }, [])

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedPhoto) return

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
          setSelectedPhoto(null)
          break
      }
    }

    if (selectedPhoto) {
      window.addEventListener('keydown', handleKeyDown)
      return () => window.removeEventListener('keydown', handleKeyDown)
    }
  }, [selectedPhoto, navigateToNext, navigateToPrevious])

  return (
    <main className="min-h-screen bg-[#FDF8F3] dark:bg-[#1A1512] transition-colors">
      {/* Warm paper texture overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.015] z-50"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='4' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          mixBlendMode: 'multiply'
        }}
      />

      {/* Subtle warm gradient overlay */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-40 dark:opacity-20"
        style={{
          background: 'radial-gradient(circle at 20% 50%, rgba(235, 88, 45, 0.08) 0%, transparent 50%)'
        }}
      />

      <header className="fixed top-0 left-0 right-0 z-40 bg-[#FDF8F3]/95 dark:bg-[#1A1512]/95 backdrop-blur-sm border-b border-[#E8DED3]/30 dark:border-[#3A2F28]/30">
        <div className="container px-6 md:px-16 py-4 mx-auto max-w-7xl">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-lg font-light text-[#2C2420] dark:text-[#F5EDE4] hover:text-[#EB582D] transition-colors" style={{ fontFamily: 'var(--font-display)' }}>
              robby weitzman
            </Link>
            <nav className="flex items-center gap-6">
              <Link href="/mood-room" className="text-sm text-[#6B5A50] dark:text-[#B8A89C] hover:text-[#EB582D] transition-colors">
                Mood Room
              </Link>
              <Link href="/photos" className="text-sm text-[#6B5A50] dark:text-[#B8A89C] hover:text-[#EB582D] transition-colors">
                Photos
              </Link>
              <Link href="/sotd" className="text-sm text-[#6B5A50] dark:text-[#B8A89C] hover:text-[#EB582D] transition-colors">
                SOTD
              </Link>
              <Link href="/about" className="text-sm text-[#6B5A50] dark:text-[#B8A89C] hover:text-[#EB582D] transition-colors">
                About
              </Link>
              <DarkModeToggle />
            </nav>
          </div>
        </div>
      </header>

      <div className="container px-6 md:px-16 pt-24 pb-20 md:pt-32 md:pb-32 mx-auto max-w-7xl">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
            {photos.map((photo) => (
              <button
                key={photo.id}
                type="button"
                onClick={(e) => handlePhotoSelect(photo, e)}
                className="group w-full aspect-[3/4] overflow-hidden focus:outline-none transition-all duration-300"
              >
                <Image
                  src={imageErrors.has(photo.id) ? "/placeholder.svg" : photo.src}
                  alt={photo.alt}
                  width={300}
                  height={400}
                  className="w-full h-full object-cover group-hover:opacity-90 transition-opacity duration-300"
                  priority={photo.id === "1" || photo.id === "2"}
                  loading={photo.id === "1" || photo.id === "2" ? "eager" : "lazy"}
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
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
        open={!!selectedPhoto} 
        onOpenChange={() => {
          setSelectedPhoto(null)
          // Force garbage collection of modal content
          setTimeout(() => {
            if (window.gc) {
              window.gc()
            }
          }, 100)
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
                        <span className="text-xs font-medium">Photo {currentPhotoIndex + 1} of {photos.length}</span>
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
                  disabled={currentPhotoIndex === 0}
                  aria-label="Previous photo"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                
                <button
                  type="button"
                  onClick={(e) => { e.preventDefault(); navigateToNext(); }}
                  className="p-2 rounded-full bg-background/90 hover:bg-background border border-border shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={currentPhotoIndex === photos.length - 1}
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

