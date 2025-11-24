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
              <Link href="/mood-room" className="text-sm text-[#6B5A50] dark:text-[#B8A89C] hover:text-[#EB582D] transition-colors" style={{ fontFamily: 'var(--font-display)' }}>
                mood room
              </Link>
              <Link href="/photos" className="text-sm text-[#6B5A50] dark:text-[#B8A89C] hover:text-[#EB582D] transition-colors" style={{ fontFamily: 'var(--font-display)' }}>
                photos
              </Link>
              <Link href="/sotd" className="text-sm text-[#6B5A50] dark:text-[#B8A89C] hover:text-[#EB582D] transition-colors" style={{ fontFamily: 'var(--font-display)' }}>
                sotd
              </Link>
              <Link href="/about" className="text-sm text-[#6B5A50] dark:text-[#B8A89C] hover:text-[#EB582D] transition-colors" style={{ fontFamily: 'var(--font-display)' }}>
                about
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
        <DialogContent className="max-w-[95vw] sm:max-w-md md:max-w-4xl p-0 overflow-hidden gap-0">
          {selectedPhoto && (
            <div className="flex flex-col relative">
              {/* Photo - Full width */}
              <div className="relative w-full bg-black">
                {modalImageLoading && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="animate-pulse text-white">Loading...</div>
                  </div>
                )}
                <Image
                  src={imageErrors.has(selectedPhoto.id) ? "/placeholder.svg" : selectedPhoto.src}
                  alt={selectedPhoto.alt}
                  width={1200}
                  height={800}
                  className={`w-full h-auto object-contain max-h-[70vh] transition-opacity duration-200 ${modalImageLoading ? 'opacity-0' : 'opacity-100'}`}
                  priority
                  sizes="(max-width: 768px) 95vw, 80vw"
                  onLoad={() => setModalImageLoading(false)}
                  onError={() => {
                    setModalImageLoading(false)
                    setImageErrors(prev => new Set(prev).add(selectedPhoto.id))
                  }}
                />

                {/* Navigation arrows - overlay on image */}
                <div className="absolute inset-x-0 bottom-4 flex justify-between px-4 z-10">
                  <button
                    type="button"
                    onClick={(e) => { e.preventDefault(); navigateToPrevious(); }}
                    className="p-2 rounded-full bg-[#FDF8F3]/90 dark:bg-[#1A1512]/90 hover:bg-[#FDF8F3] dark:hover:bg-[#1A1512] border border-[#E8DED3]/50 dark:border-[#3A2F28]/50 shadow-lg transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
                    disabled={currentPhotoIndex === 0}
                    aria-label="Previous photo"
                  >
                    <ChevronLeft className="h-4 w-4 text-[#2C2420] dark:text-[#F5EDE4]" />
                  </button>

                  <button
                    type="button"
                    onClick={(e) => { e.preventDefault(); navigateToNext(); }}
                    className="p-2 rounded-full bg-[#FDF8F3]/90 dark:bg-[#1A1512]/90 hover:bg-[#FDF8F3] dark:hover:bg-[#1A1512] border border-[#E8DED3]/50 dark:border-[#3A2F28]/50 shadow-lg transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
                    disabled={currentPhotoIndex === photos.length - 1}
                    aria-label="Next photo"
                  >
                    <ChevronRight className="h-4 w-4 text-[#2C2420] dark:text-[#F5EDE4]" />
                  </button>
                </div>
              </div>

              {/* Photo Details */}
              <div className="p-6 space-y-3">
                <h3 className="text-xl md:text-2xl font-light text-[#2C2420] dark:text-[#F5EDE4]" style={{ fontFamily: 'var(--font-display)' }}>
                  {selectedPhoto.title}
                </h3>

                <div className="flex flex-wrap items-center gap-3 text-sm text-[#8B7A6E] dark:text-[#9B8A7E]">
                  <div className="flex items-center gap-1.5">
                    <Camera className="h-3.5 w-3.5 text-[#EB582D]" />
                    <span className="text-xs">Photo {currentPhotoIndex + 1} of {photos.length}</span>
                  </div>
                  <span className="text-[#E8DED3] dark:text-[#3A2F28]">•</span>
                  <span>{selectedPhoto.camera}</span>
                  <span className="text-[#E8DED3] dark:text-[#3A2F28]">•</span>
                  <span>{selectedPhoto.film}</span>
                  <span className="text-[#E8DED3] dark:text-[#3A2F28]">•</span>
                  <span>{selectedPhoto.date}</span>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </main>
  )
}

