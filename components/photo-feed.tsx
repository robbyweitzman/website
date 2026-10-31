"use client"

import { useEffect, useLayoutEffect, useRef } from "react"
import Image from "next/image"
import { ChevronLeft } from "lucide-react"
import type { Photo } from "@/app/data/photos"

interface PhotoFeedProps {
  photos: Photo[]
  startIndex: number
  onClose: () => void
}

// Mobile-only vertical feed. Every photo spans the full width at its own
// aspect ratio, so nothing resizes or jumps as you scroll.
export function PhotoFeed({ photos, startIndex, onClose }: PhotoFeedProps) {
  const scrollerRef = useRef<HTMLDivElement>(null)
  const itemRefs = useRef<(HTMLElement | null)[]>([])
  const onCloseRef = useRef(onClose)
  onCloseRef.current = onClose

  // Jump straight to the tapped photo before the first paint
  useLayoutEffect(() => {
    const scroller = scrollerRef.current
    const item = itemRefs.current[startIndex]
    if (scroller && item) scroller.scrollTop = item.offsetTop - 56
  }, [startIndex])

  // Lock page scroll, and let the back gesture close the feed
  useEffect(() => {
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"

    if (!window.history.state?.photoFeed) {
      window.history.pushState({ ...window.history.state, photoFeed: true }, "")
    }
    const handlePopState = () => onCloseRef.current()
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") window.history.back()
    }
    window.addEventListener("popstate", handlePopState)
    window.addEventListener("keydown", handleKeyDown)

    return () => {
      document.body.style.overflow = prevOverflow
      window.removeEventListener("popstate", handlePopState)
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [])

  return (
    <div
      ref={scrollerRef}
      className="fixed inset-0 z-50 overflow-y-auto overscroll-contain bg-[#FFFAF1] dark:bg-background"
      role="dialog"
      aria-modal="true"
      aria-label="Photos"
    >
      <div className="sticky top-0 z-10 h-14 flex items-center px-3 bg-[#FFFAF1]/90 dark:bg-background/90 backdrop-blur">
        <button
          type="button"
          onClick={() => window.history.back()}
          className="flex items-center gap-1 p-2 -m-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Back to all photos"
        >
          <ChevronLeft className="h-5 w-5" />
          photos
        </button>
      </div>

      <div className="pb-24">
        {photos.map((photo, index) => (
          <article
            key={photo.id}
            ref={(el) => { itemRefs.current[index] = el }}
            className="pb-10"
          >
            <div className="relative w-full bg-muted" style={{ aspectRatio: `${photo.width} / ${photo.height}` }}>
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="100vw"
                className="object-cover"
                priority={Math.abs(index - startIndex) <= 1}
              />
            </div>
            <div className="px-5 pt-3 space-y-0.5">
              <h3 className="text-sm font-medium">{photo.title}</h3>
              <p className="text-xs text-muted-foreground">
                {[photo.camera, photo.film, photo.date].filter(Boolean).join(" · ")}
              </p>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
