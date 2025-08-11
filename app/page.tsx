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
          <Link href="/" className="text-lg font-medium hover:text-gray-700 transition-colors">
            robby weitzman
          </Link>
          <nav className="flex items-center gap-6">
            <Link href="/mood-room" className="text-sm text-gray-600 hover:text-black transition-colors">
              mood room
            </Link>
            <Link href="/photos" className="text-sm text-gray-600 hover:text-black transition-colors">
              photos
            </Link>
            <Link href="/sotd" className="text-sm text-gray-600 hover:text-black transition-colors">
              sotd
            </Link>
            <Link href="/about" className="text-sm text-gray-600 hover:text-black transition-colors">
              about
            </Link>
          </nav>
        </div>
      </header>

      <div className="container px-8 md:px-16 py-12 mx-auto">
        <div className="grid grid-cols-1 gap-12 md:gap-8 md:grid-cols-3 md:divide-x md:divide-gray-200">
          {/* Ideas Column */}
          <div className="space-y-6 md:px-6">
            <div>
              <h2 className="text-2xl font-semibold">Ideas</h2>
              <p className="text-gray-600">Some of my thoughts</p>
            </div>
            <div className="space-y-4" role="list">
              <article role="listitem">
                <Link 
                  href="/ideas/why-and-how-i-built-this-website" 
                  className="block p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-200 group focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 active:bg-gray-200 md:hover:shadow-sm"
                  aria-label="Read article: Why and how I built this website"
                >
                  <div className="space-y-1">
                    <h3 className="font-medium text-gray-900 group-hover:text-black">
                      Why and how I built this website
                    </h3>
                    <time className="text-xs text-gray-500" dateTime="2025-02-23">February 23, 2025</time>
                  </div>
                </Link>
              </article>
              
              <article role="listitem">
                <Link 
                  href="/ideas/supernode-learnings" 
                  className="block p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-200 group focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 active:bg-gray-200 md:hover:shadow-sm"
                  aria-label="Read article: A few sentences on what I learned at Supernode Ventures"
                >
                  <div className="space-y-1">
                    <h3 className="font-medium text-gray-900 group-hover:text-black">
                      A few sentences on what I learned at Supernode Ventures
                    </h3>
                    <time className="text-xs text-gray-500" dateTime="2022-09-29">September 29, 2022</time>
                  </div>
                </Link>
              </article>
            </div>
          </div>

          {/* Photography Column */}
          <div className="space-y-6 md:px-6">
            <div>
              <h2 className="text-2xl font-semibold">Photography</h2>
              <p className="text-gray-600">35mm captures</p>
            </div>
            <div className="grid gap-4 grid-cols-2">
              {photos.map((photo) => (
                <button
                  key={photo.id}
                  onClick={() => setSelectedPhoto(photo)}
                  className="relative w-full h-[200px] rounded-lg overflow-hidden bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 group"
                >
                  <Image
                    src={photo.src || "/placeholder.svg"}
                    alt={photo.alt}
                    width={400}
                    height={400}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                    <h3 className="font-medium text-sm mb-1 leading-tight">{photo.title}</h3>
                    <div className="text-xs opacity-90">
                      <p>{photo.film}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Song of the Day Column */}
          <div className="space-y-6 md:px-6">
            <div>
              <h2 className="text-2xl font-semibold">SOTD</h2>
              <p className="text-gray-600">Song of the day</p>
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
        <DialogContent className="max-w-[95vw] sm:max-w-[90vw] md:max-w-6xl lg:max-w-7xl max-h-[95vh] p-4 sm:p-6 md:p-8 overflow-hidden">
          {selectedPhoto && (
            <div className="flex flex-col md:flex-row gap-4 sm:gap-6 md:gap-8 items-start h-full">
              {/* Photo */}
              <div className="flex-1 min-w-0 relative">
                <div className="relative max-w-md mx-auto md:max-w-none">
                  <img
                    src={selectedPhoto.src || "/placeholder.svg"}
                    alt={selectedPhoto.alt}
                    className="w-full h-auto object-contain max-h-[80vh] rounded-lg shadow-lg"
                  />
                </div>
              </div>
              
              {/* Photo Details */}
              <div className="w-full md:w-80 lg:w-72 flex flex-col min-w-0 relative h-full flex-shrink-0">
                <div className="flex-1">
                  {/* Photo Info */}
                  <div className="space-y-3 mb-4 sm:mb-6">
                    <div className="space-y-2">
                      <h3 className="text-lg sm:text-xl md:text-2xl font-bold leading-tight">
                        {selectedPhoto.title}
                      </h3>
                    </div>
                    
                    <div className="space-y-1 text-sm text-muted-foreground">
                      <p className="font-medium">{selectedPhoto.camera}</p>
                      <p>{selectedPhoto.film}</p>
                      <p>Taken: {selectedPhoto.date}</p>
                    </div>
                  </div>
                </div>
                
                {/* Mobile close hint */}
                <div className="md:hidden text-center pt-8">
                  <p className="text-xs text-muted-foreground">Tap outside to close</p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Song Dialog */}
      <Dialog open={!!selectedSong} onOpenChange={() => setSelectedSong(null)}>
        <DialogContent className="max-w-[95vw] sm:max-w-[90vw] md:max-w-4xl max-h-[95vh] p-4 sm:p-6 md:p-8 overflow-hidden">
          {selectedSong && (
            <div className="flex flex-col md:flex-row gap-4 sm:gap-6 md:gap-8 items-start h-full">
              {/* Album Art */}
              <div className="flex-1 min-w-0 relative">
                <div className="relative aspect-square max-w-md mx-auto md:max-w-none">
                  <img
                    src={selectedSong.albumArt || "/placeholder.svg"}
                    alt={`${selectedSong.title} by ${selectedSong.artist}`}
                    className="w-full h-full object-cover rounded-lg shadow-lg"
                  />
                </div>
              </div>
              
              {/* Song Details */}
              <div className="w-full md:w-80 flex flex-col min-w-0 relative h-full">
                <div className="flex-1">
                  {/* Song Info */}
                  <div className="space-y-3 mb-4 sm:mb-6">
                    <div className="space-y-2">
                      <h3 className="text-lg sm:text-xl md:text-2xl font-bold leading-tight">
                        {selectedSong.title}
                      </h3>
                      <p className="text-base sm:text-lg text-muted-foreground font-medium">
                        {selectedSong.artist}
                      </p>
                      
                      {/* Song of the Day badge */}
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-primary/10 text-primary rounded-full border border-primary/20">
                        <Music2 className="h-3 w-3" />
                        <span className="text-xs font-medium">Song of the Day: {selectedSong.date}</span>
                      </div>
                    </div>
                    
                    <div className="space-y-1 text-sm text-muted-foreground">
                      <p className="font-medium">{selectedSong.album}</p>
                      <p>Release Date: {selectedSong.releaseDate}</p>
                    </div>
                  </div>
                  
                  {/* Streaming Links */}
                  <div className="border-t pt-4 sm:pt-6 space-y-3">
                    <h4 className="text-sm font-semibold text-foreground mb-3">Listen Now</h4>
                    
                    <div className="grid grid-cols-1 gap-3">
                      <a
                        href={selectedSong.spotifyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-3 rounded-lg border border-border bg-background/50 hover:bg-accent transition-all duration-200 group"
                      >
                        <div className="flex-shrink-0">
                          <img src="/spotify_logo.png" alt="Spotify" className="h-5 w-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium group-hover:text-foreground transition-colors">
                            Spotify
                          </p>
                          <p className="text-xs text-muted-foreground">Open in Spotify</p>
                        </div>
                        <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors flex-shrink-0" />
                      </a>
                      
                      <a
                        href={selectedSong.appleMusicUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-3 rounded-lg border border-border bg-background/50 hover:bg-accent transition-all duration-200 group"
                      >
                        <div className="flex-shrink-0">
                          <img src="/apple_music_logo.png" alt="Apple Music" className="h-5 w-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium group-hover:text-foreground transition-colors">
                            Apple Music
                          </p>
                          <p className="text-xs text-muted-foreground">Open in Apple Music</p>
                        </div>
                        <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors flex-shrink-0" />
                      </a>
                    </div>
                  </div>
                </div>
                
                {/* Mobile close hint */}
                <div className="md:hidden text-center pt-8">
                  <p className="text-xs text-muted-foreground">Tap outside to close</p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </main>
  )
}