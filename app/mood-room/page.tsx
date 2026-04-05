"use client"

import { useEffect, useLayoutEffect, useCallback, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { DarkModeToggle } from "@/components/dark-mode-toggle"

interface PhotoData {
  id: string
  src: string
  alt: string
  width: number
  height: number
  scaledWidth: number
  scaledHeight: number
}

const initialPhotos = [
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

// Pre-compute scaled dimensions at module level (static data, never changes)
const photosWithDimensions: PhotoData[] = initialPhotos.map((photo) => {
  const maxWidth = 400
  const maxHeight = 600
  const scale = Math.min(maxWidth / photo.width, maxHeight / photo.height)
  const scaledWidth = scale < 1 ? Math.floor(photo.width * scale) : photo.width
  const scaledHeight = scale < 1 ? Math.floor(photo.height * scale) : photo.height
  return { ...photo, scaledWidth, scaledHeight }
})

interface Position {
  x: number
  y: number
  rotation: number
  zIndex: number
}

export default function MoodRoomPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const itemRefs = useRef(new Map<string, HTMLDivElement>())
  const positionsRef = useRef(new Map<string, Position>())
  const dragRef = useRef<{ id: string; offsetX: number; offsetY: number } | null>(null)
  const maxZIndex = useRef(1)
  const initialized = useRef(false)

  // =============================================
  // Imperative style application — bypasses React
  // =============================================
  const applyStyles = useCallback((id: string) => {
    const el = itemRefs.current.get(id)
    const pos = positionsRef.current.get(id)
    if (!el || !pos) return
    el.style.transform = `translate(${pos.x}px, ${pos.y}px) rotate(${pos.rotation}deg)`
    el.style.zIndex = String(pos.zIndex)
  }, [])

  // =============================================
  // Pointer event handlers (stable — read from refs)
  // =============================================
  const handlePointerMove = useCallback(
    (e: PointerEvent) => {
      const drag = dragRef.current
      if (!drag || !containerRef.current) return

      const container = containerRef.current.getBoundingClientRect()
      const pos = positionsRef.current.get(drag.id)
      if (!pos) return

      pos.x = e.clientX - container.left - drag.offsetX
      pos.y = e.clientY - container.top - drag.offsetY
      applyStyles(drag.id)
    },
    [applyStyles],
  )

  const handlePointerUp = useCallback(
    (e: PointerEvent) => {
      const drag = dragRef.current
      if (drag) {
        const el = itemRefs.current.get(drag.id)
        if (el) el.style.cursor = "grab"
      }
      dragRef.current = null
      window.removeEventListener("pointermove", handlePointerMove)
      window.removeEventListener("pointerup", handlePointerUp)
    },
    [handlePointerMove],
  )

  const handlePointerDown = useCallback(
    (e: React.PointerEvent, id: string) => {
      e.preventDefault()
      const el = itemRefs.current.get(id)
      if (!el) return

      const rect = el.getBoundingClientRect()
      dragRef.current = {
        id,
        offsetX: e.clientX - rect.left,
        offsetY: e.clientY - rect.top,
      }

      // Bring to front
      maxZIndex.current += 1
      const pos = positionsRef.current.get(id)
      if (pos) {
        pos.zIndex = maxZIndex.current
        applyStyles(id)
      }

      // Change cursor
      el.style.cursor = "grabbing"

      // Add window listeners for move/up
      window.addEventListener("pointermove", handlePointerMove)
      window.addEventListener("pointerup", handlePointerUp)
    },
    [applyStyles, handlePointerMove, handlePointerUp],
  )

  // =============================================
  // Initialize layout positions (runs once before first paint)
  // =============================================
  useLayoutEffect(() => {
    if (initialized.current || !containerRef.current) return
    initialized.current = true

    const container = containerRef.current
    const containerWidth = container.clientWidth
    const containerHeight = container.clientHeight

    const cols = Math.ceil(Math.sqrt(photosWithDimensions.length))
    const rows = Math.ceil(photosWithDimensions.length / cols)

    photosWithDimensions.forEach((photo, index) => {
      const gridX = (index % cols) * (containerWidth / cols)
      const gridY = Math.floor(index / cols) * (containerHeight / rows)

      const randomX = (Math.random() - 0.5) * 100
      const randomY = (Math.random() - 0.5) * 100
      const randomRotation = (Math.random() - 0.5) * 10

      positionsRef.current.set(photo.id, {
        x: gridX + randomX,
        y: gridY + randomY,
        rotation: randomRotation,
        zIndex: 1,
      })

      applyStyles(photo.id)
    })
  }, [applyStyles])

  // Cleanup window listeners on unmount
  useEffect(() => {
    return () => {
      window.removeEventListener("pointermove", handlePointerMove)
      window.removeEventListener("pointerup", handlePointerUp)
    }
  }, [handlePointerMove, handlePointerUp])

  // =============================================
  // Render
  // =============================================
  return (
    <main className="min-h-screen bg-[#FFFAF1] dark:bg-background overflow-hidden transition-colors">
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

      <div className="relative w-full h-[calc(100vh-88px)]" ref={containerRef}>
        {photosWithDimensions.map((photo) => (
          <div
            key={photo.id}
            ref={(el) => {
              if (el) itemRefs.current.set(photo.id, el)
              else itemRefs.current.delete(photo.id)
            }}
            onPointerDown={(e) => handlePointerDown(e, photo.id)}
            className="absolute touch-none cursor-grab select-none"
            style={{ width: `${photo.scaledWidth}px` }}
          >
            <div className="w-full bg-white dark:bg-gray-800 p-3 shadow-lg hover:shadow-xl transition-shadow">
              <Image
                src={photo.src || "/placeholder.svg"}
                alt={photo.alt}
                width={photo.scaledWidth}
                height={photo.scaledHeight}
                className="w-full h-auto object-contain pointer-events-none"
                draggable="false"
                priority
                unoptimized
              />
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}
