"use client"

import Link from "next/link"
import { useState } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { X } from "lucide-react"

interface Photo {
  id: string
  src: string
  alt: string
  title: string
  camera: string
  film: string
  date: string
}

export default function Page() {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null)

  const photos: Photo[] = [
    {
      id: "1",
      src: "/placeholder.svg?height=100&width=100",
      alt: "Urban landscape",
      title: "City Streets",
      camera: "Leica M6",
      film: "Kodak Portra 400",
      date: "January 2024",
    },
    {
      id: "2",
      src: "/placeholder.svg?height=100&width=100",
      alt: "Nature scene",
      title: "Forest Path",
      camera: "Leica M6",
      film: "Ilford HP5+",
      date: "February 2024",
    },
  ]

  return (
    <main className="min-h-screen bg-[#FFFAF1]">
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

      <div className="container px-8 md:px-16 py-12 mx-auto">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:divide-x md:divide-border">
          {/* Ideas Column */}
          <div className="space-y-4 md:px-6">
            <h2 className="text-2xl font-semibold tracking-tight">Ideas</h2>
            <p className="text-muted-foreground">Some of the things I am putting thought toward.</p>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/ideas/minimalist-design-principles" className="hover:text-foreground transition-colors">
                  Minimalist Design Principles
                </Link>
              </li>
              <li>
                <Link href="/ideas/future-of-web-development" className="hover:text-foreground transition-colors">
                  The Future of Web Development
                </Link>
              </li>
              <li>
                <Link href="/ideas/creative-process-notes" className="hover:text-foreground transition-colors">
                  Creative Process Notes
                </Link>
              </li>
            </ul>
          </div>

          {/* Photography Column */}
          <div className="space-y-4 md:px-6">
            <h2 className="text-2xl font-semibold tracking-tight">Photography</h2>
            <p className="text-muted-foreground">35mm captures</p>
            <div className="grid gap-4 grid-cols-2">
              {photos.map((photo) => (
                <button
                  key={photo.id}
                  onClick={() => setSelectedPhoto(photo)}
                  className="w-full h-[100px] rounded-lg overflow-hidden focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                >
                  <img
                    src={photo.src || "/placeholder.svg"}
                    alt={photo.alt}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Song of the Day Column */}
          <div className="space-y-4 md:px-6">
            <h2 className="text-2xl font-semibold tracking-tight">SOTD</h2>
            <p className="text-muted-foreground">Song and vibe of the day.</p>
            <div className="p-4 rounded-lg bg-muted">
              <p className="font-medium">Currently Playing:</p>
              <p className="text-sm text-muted-foreground">Placeholder Track - Artist Name</p>
            </div>
          </div>
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
              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="flex-1">
                  <img
                    src={selectedPhoto.src || "/placeholder.svg"}
                    alt={selectedPhoto.alt}
                    className="w-full h-auto object-contain max-h-[75vh]"
                  />
                </div>
                <div className="w-full md:w-64 space-y-4">
                  <h3 className="font-semibold text-lg">{selectedPhoto.title}</h3>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p>{selectedPhoto.camera}</p>
                    <p>{selectedPhoto.film}</p>
                    <p>{selectedPhoto.date}</p>
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </main>
  )
}

