"use client"

import { useState } from "react"
import Link from "next/link"
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

export default function PhotosPage() {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null)

  const photos: Photo[] = [
    {
      id: "1",
      src: "/photos/24h Grocery.jpg",
      alt: "24h Grocery",
      title: "24 Hour Grocery",
      camera: "Canon A1",
      film: "Kodak Color Plus",
      date: "September 16, 2024",
    },
    {
      id: "2",
      src: "/photos/Daytime Skyline.jpeg",
      alt: "Daytime Skyline",
      title: "Daytime Skyline",
      camera: "Canon A1",
      film: "Kodak UltraMax",
      date: "September 22, 2024",
    },
     {
      id: "3",
      src: "/photos/Skyline Sunset.jpeg",
      alt: "Skyline Sunset",
      title: "Skyline Sunset",
      camera: "Canon A1",
      film: "Kodak UltraMax",
      date: "September 22, 2024",
    },
    {
      id: "4",
      src: "/photos/Domino Sugar.jpeg",
      alt: "Domino Sugar",
      title: "Domino Sugar",
      camera: "Canon A1",
      film: "Kodak UltraMax",
      date: "September 22, 2024",
    },
    {
      id: "5",
      src: "/photos/Mookie 1.jpeg",
      alt: "Mookie in the woods",
      title: "Mookie in the woods",
      camera: "Nikon F4",
      film: "Kodak UltraMax",
      date: "September 14, 2024",
    },
    {
      id: "6",
      src: "/photos/Mookie2.jpeg",
      alt: "Mookie in the woods again",
      title: "Mookie in the woods again",
      camera: "Nikon F4",
      film: "Kodak UltraMax",
      date: "September 14, 2024",
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
        <div className="max-w-[900px] mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {photos.map((photo) => (
              <button
                key={photo.id}
                onClick={() => setSelectedPhoto(photo)}
                className="w-full aspect-[3/4] rounded-lg overflow-hidden focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              >
                <img
                  src={photo.src || "https://placehold.co/300x400"}
                  alt={photo.alt}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
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
                <img
                  src={selectedPhoto.src || "https://placehold.co/300x400"}
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
    </main>
  )
}

