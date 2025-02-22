"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { X, Music2, ExternalLink } from "lucide-react"
import { type Photo, photos } from "./data/photos"
import { type Song, getCurrentSong } from "./data/songs"

export default function Page() {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null)
  const [selectedSong, setSelectedSong] = useState<Song | null>(null)
  const currentSong = getCurrentSong()

  return (
    <main className="min-h-screen bg-[#FFFAF1]">
      <header className="container px-8 md:px-16 py-6 mx-auto">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-lg font-medium">
            robby weitzman
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/muse" className="text-sm text-gray-600 hover:text-black">
              muse
            </Link>
            <Link href="/photos" className="text-sm text-gray-600 hover:text-black">
              photos
            </Link>
            <Link href="/sotd" className="text-sm text-gray-600 hover:text-black">
              sotd
            </Link>
            <Link href="/about" className="text-sm text-gray-600 hover:text-black">
              about
            </Link>
          </div>
        </div>
      </header>

      <div className="container px-8 md:px-16 py-12 mx-auto">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:divide-x md:divide-gray-200">
          {/* Ideas Column */}
          <div className="space-y-4 md:px-6">
            <h2 className="text-2xl font-semibold">Ideas</h2>
            <p className="text-gray-600">Some of the things I am putting thought toward.</p>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/ideas/minimalist-design-principles" className="text-gray-600 hover:text-black">
                  Minimalist Design Principles
                </Link>
              </li>
              <li>
                <Link href="/ideas/future-of-web-development" className="text-gray-600 hover:text-black">
                  The Future of Web Development
                </Link>
              </li>
              <li>
                <Link href="/ideas/creative-process-notes" className="text-gray-600 hover:text-black">
                  Creative Process Notes
                </Link>
              </li>
            </ul>
          </div>

          {/* Photography Column */}
          <div className="space-y-4 md:px-6">
            <h2 className="text-2xl font-semibold">Photography</h2>
            <p className="text-gray-600">35mm captures</p>
            <div className="grid gap-4 grid-cols-2">
              {photos.map((photo) => (
                <button
                  key={photo.id}
                  onClick={() => setSelectedPhoto(photo)}
                  className="w-full h-[100px] rounded-lg overflow-hidden bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
                >
                  <Image
                    src={photo.src || "/placeholder.svg"}
                    alt={photo.alt}
                    width={400}
                    height={400}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Song of the Day Column */}
          <div className="space-y-4 md:px-6">
            <h2 className="text-2xl font-semibold">SOTD</h2>
            <p className="text-gray-600">Song of the day.</p>
            <button
              onClick={() => setSelectedSong(currentSong)}
              className="w-full p-4 rounded-lg bg-gray-100 text-left hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
            >
              <p className="font-medium">Currently Playing:</p>
              <p className="text-sm text-gray-600">
                {currentSong.title} - {currentSong.artist}
              </p>
            </button>
          </div>
        </div>
      </div>

      {/* Photo Dialog */}
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
                <div className="space-y-2 text-sm text-gray-600">
                  <p>{selectedPhoto.camera}</p>
                  <p>{selectedPhoto.film}</p>
                  <p>{selectedPhoto.date}</p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Song Dialog */}
      <Dialog open={!!selectedSong} onOpenChange={() => setSelectedSong(null)}>
        <DialogContent className="max-w-[90vw] max-h-[90vh] p-8">
          <button
            onClick={() => setSelectedSong(null)}
            className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </button>

          {selectedSong && (
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="flex-1">
                <img
                  src={selectedSong.albumArt || "/placeholder.svg"}
                  alt={`${selectedSong.title} by ${selectedSong.artist}`}
                  className="w-full h-auto object-contain max-h-[75vh] rounded-lg"
                />
              </div>
              <div className="w-full md:w-64 space-y-6">
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">{selectedSong.title}</h3>
                  <p className="text-gray-600">{selectedSong.artist}</p>
                  <p className="text-gray-600">{selectedSong.album}</p>
                  <p className="text-gray-600">{selectedSong.releaseDate}</p>
                </div>
                <div className="pt-6 border-t space-y-4">
                  <a
                    href={selectedSong.spotifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-gray-600 hover:text-black transition-colors"
                  >
                    <Music2 className="h-4 w-4" />
                    Listen on Spotify
                    <ExternalLink className="h-3 w-3" />
                  </a>
                  <a
                    href={selectedSong.appleMusicUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-gray-600 hover:text-black transition-colors"
                  >
                    <Music2 className="h-4 w-4" />
                    Listen on Apple Music
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </main>
  )
}

