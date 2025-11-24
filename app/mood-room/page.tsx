"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { DarkModeToggle } from "@/components/dark-mode-toggle"

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
    src: "/mood-room/senna-monaco-1984.jpg",
    alt: "Aryton Senna, 1984 Monaco GP",
    width: 3660,
    height: 2440,
  },
  {
    id: "2",
    src: "/mood-room/Blackbirds.jpg",
    alt: "Blackbird SR71s flying in tandem",
    width: 1198,
    height: 1800,
  },
  {
    id: "3",
    src: "/mood-room/Ronaldinho and Messi.jpg",
    alt: "Ronaldinho and Messi",
    width: 3940,
    height: 2400,
  },
  {
    id: "4",
    src: "/mood-room/senna-marlboro-spa.jpg",
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
    alt: "Senna, Lotus 98T",
    width: 900,
    height: 600,
  },
  {
    id: "7",
    src: "https://i.pinimg.com/236x/b0/6c/34/b06c3454c28a7bc236ad56e7ef569f4a.jpg",
    alt: "Rob and Big and Meaty",
    width: 236,
    height: 292,
  },
   {
    id: "8",
    src: "https://images.squarespace-cdn.com/content/v1/642fe9d50ff3d476932fc101/1723725733870-LBERDAXOIYRI9DZRI7A8/fighter%2B8.jpg",
    alt: "Japan F15",
    width: 798,
    height: 564,
  },
   {
    id: "9",
    src: "/mood-room/stig-jeremy.png",
    alt: "Stig and Jeremy",
    width: 2464,
    height: 1234,
  },
  {
    id: "10",
    src: "/mood-room/iPod Classic.png",
    alt: "iPod Classic",
    width: 142,
    height: 238.5,
  },
  {
    id: "11",
    src: "/mood-room/BE GRATEFUL FOR WHERE YOU ARE TODAY.png",
    alt: "Be Grateful For Where You Are Today",
    width: 200,
    height: 200,
  },
  {
    id: "12",
    src: "/mood-room/FOCUS ON RIGHT NOW.png",
    alt: "Focus On Right Now",
    width: 200,
    height: 200,
  },
  {
    id: "13",
    src: "/mood-room/HARD WORK ALWAYS PAYS BACK.png",
    alt: "Hard Work Always Pays Back",
    width: 200,
    height: 200,
  },
]

export default function MoodRoomPage() {
  const [photos, setPhotos] = useState<Photo[]>([])
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
    // Make the drag image transparent to prevent cursor changes
    const img = document.createElement('img')
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
    <main className="min-h-screen bg-[#FDF8F3] dark:bg-[#1A1512] overflow-hidden transition-colors">
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
              <Link href="/quotes" className="text-sm text-[#6B5A50] dark:text-[#B8A89C] hover:text-[#EB582D] transition-colors" style={{ fontFamily: 'var(--font-display)' }}>
                quotes
              </Link>
              <Link href="/about" className="text-sm text-[#6B5A50] dark:text-[#B8A89C] hover:text-[#EB582D] transition-colors" style={{ fontFamily: 'var(--font-display)' }}>
                about
              </Link>
              <DarkModeToggle />
            </nav>
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
              className={`absolute touch-none ${draggedPhoto === photo.id ? 'cursor-grabbing' : 'cursor-grab'}`}
              style={{
                transform: `translate(${photo.position.x}px, ${photo.position.y}px) rotate(${photo.rotation}deg)`,
                zIndex: photo.zIndex,
                width: `${scaledDimensions.width}px`,
              }}
            >
              <div className="w-full bg-white dark:bg-gray-800 p-3 shadow-lg hover:shadow-xl transition-shadow">
                <Image
                  src={photo.src || "/placeholder.svg"}
                  alt={photo.alt}
                  width={scaledDimensions.width}
                  height={scaledDimensions.height}
                  className="w-full h-auto object-contain"
                  draggable="false"
                  priority
                  unoptimized
                />
              </div>
            </div>
          )
        })}
      </div>
    </main>
  )
}

