"use client"

import { useState } from "react"
import Link from "next/link"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { X } from "lucide-react"
import { type Photo, photos } from "../data/photos"
import Image from "next/image"

export default function PhotosPage() {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null)

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
                onClick={() => setSelectedPhoto(photo)}
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
                <Image
                  src={selectedPhoto.src || "/placeholder.svg"}
                  alt={selectedPhoto.alt}
                  width={1200}
                  height={800}
                  className="w-full h-auto object-contain max-h-[75vh]"
                  unoptimized
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
    </main>
  )
}

