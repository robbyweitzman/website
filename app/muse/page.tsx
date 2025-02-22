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
  position: { x: number; y: number }
  rotation: number
  zIndex: number
}

export default function MusePage() {
  const [photos, setPhotos] = useState<Photo[]>([
    {
      id: "1",
      src: "/muse/Senna Muse.jpg",
      alt: "Senna at Monaco",
      position: { x: 0, y: 0 },
      rotation: 0,
      zIndex: 1,
    },
    {
      id: "2",
      src: "https://placehold.co/300x400",
      alt: "Inspiration 2",
      position: { x: 0, y: 0 },
      rotation: 0,
      zIndex: 1,
    },
    {
      id: "3",
      src: "https://placehold.co/300x400",
      alt: "Inspiration 3",
      position: { x: 0, y: 0 },
      rotation: 0,
      zIndex: 1,
    },
    {
      id: "4",
      src: "https://placehold.co/300x400",
      alt: "Inspiration 4",
      position: { x: 0, y: 0 },
      rotation: 0,
      zIndex: 1,
    },
    {
      id: "5",
      src: "https://placehold.co/300x400",
      alt: "Inspiration 5",
      position: { x: 0, y: 0 },
      rotation: 0,
      zIndex: 1,
    },
    {
      id: "6",
      src: "https://placehold.co/300x400",
      alt: "Inspiration 6",
      position: { x: 0, y: 0 },
      rotation: 0,
      zIndex: 1,
    },
  ])

  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null)
  const [draggedPhoto, setDraggedPhoto] = useState<string | null>(null)
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)
  const maxZIndex = useRef(1)

  // Distribute photos across the page on initial load
  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    const containerWidth = container.clientWidth
    const containerHeight = container.clientHeight

    const updatedPhotos = photos.map((photo, index) => {
      const cols = Math.ceil(Math.sqrt(photos.length))
      const rows = Math.ceil(photos.length / cols)

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
      }
    })

    setPhotos(updatedPhotos)
  }, [photos.length, photos.map])

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
        {photos.map((photo) => (
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
            }}
          >
            <div
              className="w-[300px] bg-white p-3 shadow-lg hover:shadow-xl transition-shadow"
              onClick={() => setSelectedPhoto(photo.src)}
            >
              <img
                src={photo.src || "https://placehold.co/300x400"}
                alt={photo.alt}
                className="w-full aspect-[3/4] object-cover"
                draggable="false"
              />
            </div>
          </div>
        ))}
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
                src={selectedPhoto || "https://placehold.co/300x400"}
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

