"use client"

import { useState } from "react"
import Image from "next/image"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Music2, ExternalLink } from "lucide-react"
import { type Photo, photos } from "./data/photos"
import { type Song, songs, getCurrentSong } from "./data/songs"
import { SiteHeader } from "@/components/site-header"
import Link from "next/link"

export default function Page() {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null)
  const [selectedSong, setSelectedSong] = useState<Song | null>(null)
  const currentSong = getCurrentSong()
  const previousSongs = songs.slice(1)

  return (
    <main className="min-h-screen bg-background">
      <SiteHeader />

      <div className="container px-8 md:px-16 py-12 mx-auto">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:divide-x md:divide-border">
          {/* Ideas Column */}
          <div className="space-y-4 md:px-6">
            <h2 className="text-2xl font-semibold">Ideas</h2>
            <p className="text-muted-foreground">Some of the things I am putting thought toward.</p>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/ideas/minimalist-design-principles"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Minimalist Design Principles
                </Link>
              </li>
              <li>
                <Link
                  href="/ideas/future-of-web-development"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  The Future of Web Development
                </Link>
              </li>
              <li>
                <Link
                  href="/ideas/creative-process-notes"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Creative Process Notes
                </Link>
              </li>
            </ul>
          </div>

          {/* Photography Column */}
          <div className="space-y-4 md:px-6">
            <h2 className="text-2xl font-semibold">Photography</h2>
            <p className="text-muted-foreground">35mm captures</p>
            <div className="grid gap-4 grid-cols-2">
              {photos.map((photo) => (
                <button
                  key={photo.id}
                  onClick={() => setSelectedPhoto(photo)}
                  className="w-full h-[100px] rounded-lg overflow-hidden bg-muted focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                >
                  <Image
                    src={photo.src || "/placeholder.svg"}
                    alt={photo.alt}
                    width={400}
                    height={400}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    unoptimized
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Song of the Day Column */}
          <div className="space-y-6 md:px-6">
            <div>
              <h2 className="text-2xl font-semibold">SOTD</h2>
              <p className="text-muted-foreground">Song of the day.</p>
            </div>

            {/* Current Song */}
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Today's Song:</p>
              <button
                onClick={() => setSelectedSong(currentSong)}
                className="w-full p-4 rounded-lg bg-muted text-left hover:bg-muted/80 transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              >
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <p className="font-medium">{currentSong.title}</p>
                    <p className="text-sm text-muted-foreground">{currentSong.artist}</p>
                    <p className="text-xs text-muted-foreground mt-1">{currentSong.date}</p>
                  </div>
                  <img
                    src={currentSong.albumArt || "/placeholder.svg"}
                    alt={`${currentSong.title} album art`}
                    className="w-16 h-16 rounded-md object-cover"
                  />
                </div>
              </button>
            </div>

            {/* Previous Songs */}
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">SOYD</p>
              <div className="space-y-2">
                {previousSongs.map((song) => (
                  <button
                    key={song.id}
                    onClick={() => setSelectedSong(song)}
                    className="w-full p-3 rounded-lg bg-muted/50 text-left hover:bg-muted transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex-1">
                        <p className="font-medium text-sm">{song.title}</p>
                        <p className="text-sm text-muted-foreground">{song.artist}</p>
                        <p className="text-xs text-muted-foreground mt-1">{song.date}</p>
                      </div>
                      <img
                        src={song.albumArt || "/placeholder.svg"}
                        alt={`${song.title} album art`}
                        className="w-12 h-12 rounded-md object-cover"
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

      {/* Song Dialog */}
      <Dialog open={!!selectedSong} onOpenChange={() => setSelectedSong(null)}>
        <DialogContent className="max-w-[90vw] max-h-[90vh] p-8">
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
                  <p className="text-muted-foreground">{selectedSong.artist}</p>
                  <p className="text-muted-foreground">{selectedSong.album}</p>
                  <p className="text-muted-foreground">{selectedSong.releaseDate}</p>
                </div>
                <div className="pt-6 border-t space-y-4">
                  <a
                    href={selectedSong.spotifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Music2 className="h-4 w-4" />
                    Listen on Spotify
                    <ExternalLink className="h-3 w-3" />
                  </a>
                  <a
                    href={selectedSong.appleMusicUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
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

