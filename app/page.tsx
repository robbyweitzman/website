"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { X, Music2, ExternalLink } from "lucide-react"
import { type Photo, photos } from "./data/photos"
import { type Song, getCurrentSong, getAllSongs } from "./data/songs"

export default function Page() {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null)
  const [selectedSong, setSelectedSong] = useState<Song | null>(null)
  const currentSong = getCurrentSong()
  const allSongs = getAllSongs()
  const previousSongs = allSongs.slice(1) // All songs except the current one

  return (
    <main className="min-h-screen bg-[#FFFAF1]">
      <header className="container px-8 md:px-16 py-6 mx-auto">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-lg font-medium">
            robby weitzman
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/mood-room" className="text-sm text-gray-600 hover:text-black">
              mood room
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
            <p className="text-gray-600">Some of my thoughts.</p>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/ideas/why-and-how-i-built-this-website" className="text-gray-600 hover:text-black">
                  • Why and how I build this website
                </Link>
              </li>
              <li>
                <Link href="/ideas/supernode-learnings" className="text-gray-600 hover:text-black">
                  • A few sentences on what I learned at Supernode Ventures in 2022.
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
          <div className="space-y-6 md:px-6">
            <div>
              <h2 className="text-2xl font-semibold">SOTD</h2>
              <p className="text-gray-600">Song of the day.</p>
            </div>

            {/* Current Song */}
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-600">Today's Song:</p>
              <button
                onClick={() => setSelectedSong(currentSong)}
                className="w-full p-4 rounded-lg bg-gray-100 text-left hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
              >
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <p className="font-medium">{currentSong.title}</p>
                    <p className="text-sm text-gray-600">{currentSong.artist}</p>
                    <p className="text-xs text-gray-500 mt-1">{currentSong.date}</p>
                  </div>
                  <Image
                    src={currentSong.albumArt || "/placeholder.svg"}
                    alt={`${currentSong.title} album art`}
                    width={64}
                    height={64}
                    className="w-16 h-16 rounded-md object-cover"
                    unoptimized
                  />
                </div>
              </button>
            </div>

            {/* Previous Songs */}
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-600">SOYD</p>
              <div className="space-y-2">
                {previousSongs.map((song) => (
                  <button
                    key={song.id}
                    onClick={() => setSelectedSong(song)}
                    className="w-full p-3 rounded-lg bg-gray-50 text-left hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex-1">
                        <p className="font-medium text-sm">{song.title}</p>
                        <p className="text-sm text-gray-600">{song.artist}</p>
                        <p className="text-xs text-gray-500 mt-1">{song.date}</p>
                      </div>
                      <Image
                        src={song.albumArt || "/placeholder.svg"}
                        alt={`${song.title} album art`}
                        width={48}
                        height={48}
                        className="w-12 h-12 rounded-md object-cover"
                        unoptimized
                      />
                    </div>
                  </button>
                ))}
              </div>
            </div>
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
                <Image
                  src={selectedSong.albumArt || "/placeholder.svg"}
                  alt={`${selectedSong.title} by ${selectedSong.artist}`}
                  width={800}
                  height={800}
                  className="w-full h-auto object-contain max-h-[75vh] rounded-lg"
                  unoptimized
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

