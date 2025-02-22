"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { X } from "lucide-react"

interface Photo {
  id: string
  src: string
  alt: string
  width: number
  height: number
  position: { x: number; y: number }
  rotation: number
  zIndex: number
}

const initialPhotos: Omit<Photo, "position" | "rotation" | "zIndex">[] = [
  {
    id: "1",
    src: "/muse/Senna Muse.jpg",
    alt: "Aryton Senna racing at the 1984 Monaco Gran Prix in the rain",
    width: 3660,
    height: 2440,
  },
  {
    id: "2",
    src: "/muse/Blackbirds.jpg",
    alt: "Blackbird SR71s flying in tandem",
    width: 1198,
    height: 1800,
  },
  {
    id: "3",
    src: "/muse/Ronaldinho and Messi.jpg",
    alt: "Ronaldinho and Messi",
    width: 3940,
    height: 2400,
  },
  {
    id: "4",
    src: "/muse/Senna at Spa.jpg",
    alt: "Senna at Spa",
    width: 1440,
    height: 2180,
  },
  {
    id: "5",
    src: "https://sneakerbardetroit.com/wp-content/uploads/2017/05/Kobe-5-Big-Stage.jpg",
    alt: "Kobe 5",
    width: 800,
    height: 465,
  },
  {
    id: "6",
    src: "https://upload.wikimedia.org/wikipedia/commons/6/65/Senna_Brands_1986.jpg",
    alt: "Senna 98T",
    width: 900,
    height: 600,
  },
]

export default function MusePage() {
  const [photos, setPhotos] = useState<Photo[]>([])
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null)
  const [draggedPhoto, setDraggedPhoto] = useState<string | null>(null)
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)
  const maxZIndex = useRef(1)
  const initialized = useRef(false)

  // Calculate scaled dimensions to fit within reasonable bounds
  const getScaledDimensions = (width: number, height: number) => {
    const maxWidth = 400 // Maximum width we want to allow
    const maxHeight = 600 // Maximum height we want to allow
    const scale = Math.min(maxWidth / width, maxHeight / height)

    // Only scale down, never up
    if (scale < 1) {
      return {
        width: Math.floor(width * scale),
        height: Math.floor(height * scale),
      }
    }

    return { width, height }
  }

  // Initialize photos with positions only once
  useEffect(() => {
    if (initialized.current || !containerRef.current) return
    initialized.current = true

    const container = containerRef.current
    const containerWidth = container.clientWidth
    const containerHeight = container.clientHeight

    const layoutPhotos = initialPhotos.map((photo, index) => {
      const cols = Math.ceil(Math.sqrt(initialPhotos.length))
      const rows = Math.ceil(initialPhotos.length / cols)

      const gridX = (index % cols) * (containerWidth / cols)
      const gridY = Math.floor(index / cols) * (containerHeight / rows)

      const randomX = (Math.random() - 0.5) * 100
      const randomY = (Math.random() - 0.5) * 100
      const randomRotation = (Math.random() - 0.5) * 10

      return {
        ...photo,
        position: {
          x: gridX + randomX,
          y: gridY + randomY,
        },
        rotation: randomRotation,
        zIndex: 1,
      }
    })

    setPhotos(layoutPhotos)
  }, [])

  const handleDragStart = (e: React.DragEvent, id: string) => {
    const photo = photos.find((p) => p.id === id)
    if (!photo) return

    // Calculate offset between mouse position and photo top-left corner
    const rect = (e.target as HTMLElement).getBoundingClientRect()
    setOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })

    setDraggedPhoto(id)
    maxZIndex.current += 1

    // Update photo z-index
    setPhotos((prev) => prev.map((p) => (p.id === id ? { ...p, zIndex: maxZIndex.current } : p)))

    // Required for Firefox
    e.dataTransfer.setData("text/plain", id)
    // Make the drag image transparent
    const img = new Image()
    img.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
    e.dataTransfer.setDragImage(img, 0, 0)
  }

  const handleDrag = (e: React.DragEvent) => {
    if (!draggedPhoto || !containerRef.current) return

    e.preventDefault()

    const container = containerRef.current.getBoundingClientRect()
    const x = e.clientX - container.left - offset.x
    const y = e.clientY - container.top - offset.y

    setPhotos((prev) => prev.map((photo) => (photo.id === draggedPhoto ? { ...photo, position: { x, y } } : photo)))
  }

  const handleDragEnd = () => {
    setDraggedPhoto(null)
  }

  return (
    <main className="min-h-screen bg-[#FFFAF1] overflow-hidden">
      <header className="container px-8 md:px-16 py-6 mx-auto">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-lg font-medium hover:text-muted-foreground transition-colors">
            robby weitzman
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/muse" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              muse
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

      <div className="relative w-full h-[calc(100vh-88px)]" ref={containerRef} onDragOver={(e) => e.preventDefault()}>
        {photos.map((photo) => {
          const scaledDimensions = getScaledDimensions(photo.width, photo.height)

          return (
            <div
              key={photo.id}
              draggable
              onDragStart={(e) => handleDragStart(e, photo.id)}
              onDrag={handleDrag}
              onDragEnd={handleDragEnd}
              className="absolute cursor-move touch-none"
              style={{
                transform: `translate(${photo.position.x}px, ${photo.position.y}px) rotate(${photo.rotation}deg)`,
                zIndex: photo.zIndex,
                width: `${scaledDimensions.width}px`,
              }}
            >
              <div
                className="bg-white p-3 shadow-lg hover:shadow-xl transition-shadow"
                onClick={() => setSelectedPhoto(photo.src)}
              >
                <img
                  src={photo.src || "/placeholder.svg"}
                  alt={photo.alt}
                  width={scaledDimensions.width}
                  height={scaledDimensions.height}
                  className="w-full h-auto object-contain"
                  draggable="false"
                />
              </div>
            </div>
          )
        })}
      </div>

      <Dialog open={!!selectedPhoto} onOpenChange={() => setSelectedPhoto(null)}>
        <DialogContent className="max-w-[90vw] max-h-[90vh] p-8">
          <button
            onClick={() => setSelectedPhoto(null)}
            className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </button>
          {selectedPhoto && (
            <div className="flex-1">
              <img
                src={selectedPhoto || "/placeholder.svg"}
                alt="Enlarged view"
                className="w-full h-auto object-contain max-h-[75vh] rounded-lg"
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </main>
  )
}

