"use client"

import { useState, useCallback, useEffect } from "react"
import Link from "next/link"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { ChevronLeft, ChevronRight, Camera } from "lucide-react"
import { type Photo, photos } from "../data/photos"
import Image from "next/image"

export default function PhotosPage() {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null)
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0)

  // Navigation functions
  const navigateToNext = useCallback(() => {
    if (currentPhotoIndex < photos.length - 1) {
      const nextIndex = currentPhotoIndex + 1
      setCurrentPhotoIndex(nextIndex)
      setSelectedPhoto(photos[nextIndex])
    }
  }, [currentPhotoIndex])

  const navigateToPrevious = useCallback(() => {
    if (currentPhotoIndex > 0) {
      const prevIndex = currentPhotoIndex - 1
      setCurrentPhotoIndex(prevIndex)
      setSelectedPhoto(photos[prevIndex])
    }
  }, [currentPhotoIndex])

  // Handle photo selection from grid
  const handlePhotoSelect = useCallback((photo: Photo) => {
    const index = photos.findIndex(p => p.id === photo.id)
    setCurrentPhotoIndex(index)
    setSelectedPhoto(photo)
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
    <main className="min-h-screen bg-[#FFFAF1]">
      <header className="container px-8 md:px-16 py-6 mx-auto">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-lg font-medium hover:text-muted-foreground transition-colors">
            robby weitzman
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/mood-room" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              mood room
            </Link>
            <Link href="/photos" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              photos
            </Link>
            <Link href="/sotd" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              sotd
            </Link>
            <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              about
            </Link>
          </div>
        </div>
      </header>

      <div className="container px-8 md:px-16 py-12 mx-auto">
        <div className="max-w-[900px] mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {photos.map((photo) => (
              <button
                key={photo.id}
                onClick={() => handlePhotoSelect(photo)}
                className="w-full aspect-[3/4] rounded-lg overflow-hidden focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              >
                <Image
                  src={photo.src || "/placeholder.svg"}
                  alt={photo.alt}
                  width={900}
                  height={600}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  unoptimized
                />
              </button>
            ))}
          </div>
        </div>
      </div>

      <Dialog open={!!selectedPhoto} onOpenChange={() => setSelectedPhoto(null)}>
        <DialogContent className="max-w-[95vw] sm:max-w-[90vw] md:max-w-6xl lg:max-w-7xl max-h-[95vh] p-4 sm:p-6 md:p-8 overflow-hidden">
          {selectedPhoto && (
            <div className="flex flex-col md:flex-row gap-4 sm:gap-6 md:gap-8 items-start h-full relative">
              
              {/* Photo */}
              <div className="flex-1 min-w-0 relative">
                <div className="relative max-w-md mx-auto md:max-w-none">
                  <Image
                    src={selectedPhoto.src || "/placeholder.svg"}
                    alt={selectedPhoto.alt}
                    width={1200}
                    height={800}
                    className="w-full h-auto object-contain max-h-[80vh] rounded-lg shadow-lg"
                    unoptimized
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
                  onClick={navigateToPrevious}
                  className="p-2 rounded-full bg-background/90 hover:bg-background border border-border shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={currentPhotoIndex === 0}
                  aria-label="Previous photo"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                
                <button
                  onClick={navigateToNext}
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

