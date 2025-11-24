"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { X, Music2, ExternalLink, ArrowUpRight } from "lucide-react"
import { type Photo, photos } from "./data/photos"
import { type Song, getCurrentSong, getAllSongs } from "./data/songs"
import { DarkModeToggle } from "@/components/dark-mode-toggle"

export default function Page() {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null)
  const [selectedSong, setSelectedSong] = useState<Song | null>(null)
  const [scrollY, setScrollY] = useState(0)
  const currentSong = getCurrentSong()
  const allSongs = getAllSongs()
  const previousSongs = allSongs.slice(1)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <main className="min-h-screen bg-[#FDF8F3] dark:bg-[#1A1512] transition-colors overflow-hidden">
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

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-[#FDF8F3]/95 dark:bg-[#1A1512]/95 backdrop-blur-sm border-b border-[#E8DED3]/30 dark:border-[#3A2F28]/30">
        <div className="container px-6 md:px-16 py-4 mx-auto max-w-7xl">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="text-lg font-light text-[#2C2420] dark:text-[#F5EDE4] hover:text-[#EB582D] transition-colors"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              robby weitzman
            </Link>
            <nav className="flex items-center gap-6">
              <Link
                href="/mood-room"
                className="text-sm text-[#6B5A50] dark:text-[#B8A89C] hover:text-[#EB582D] transition-colors"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                mood room
              </Link>
              <Link
                href="/photos"
                className="text-sm text-[#6B5A50] dark:text-[#B8A89C] hover:text-[#EB582D] transition-colors"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                photos
              </Link>
              <Link
                href="/sotd"
                className="text-sm text-[#6B5A50] dark:text-[#B8A89C] hover:text-[#EB582D] transition-colors"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                sotd
              </Link>
              <Link
                href="/about"
                className="text-sm text-[#6B5A50] dark:text-[#B8A89C] hover:text-[#EB582D] transition-colors"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                about
              </Link>
              <DarkModeToggle />
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content Grid */}
      <section className="pt-24 pb-20 md:pt-32 md:pb-32">
        <div className="container px-6 md:px-16 mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
            {/* Ideas Section */}
            <div className="space-y-6">
              <div className="space-y-1">
                <h2 className="text-2xl font-light text-[#2C2420] dark:text-[#F5EDE4]" style={{ fontFamily: 'var(--font-display)' }}>
                  Ideas
                </h2>
                <p className="text-sm text-[#8B7A6E] dark:text-[#9B8A7E]">Thoughts & reflections</p>
              </div>

              <div className="space-y-4" role="list">
                <article role="listitem">
                  <Link
                    href="/ideas/why-and-how-i-built-this-website"
                    className="group block transition-all duration-200"
                  >
                    <div className="space-y-1">
                      <h3 className="text-[#2C2420] dark:text-[#F5EDE4] group-hover:text-[#EB582D] transition-colors" style={{ fontFamily: 'var(--font-display)' }}>
                        Why and how I built this website
                      </h3>
                      <time className="text-xs text-[#8B7A6E] dark:text-[#9B8A7E]" dateTime="2025-02-23">
                        February 23, 2025
                      </time>
                    </div>
                  </Link>
                </article>

                <article role="listitem">
                  <Link
                    href="/ideas/supernode-learnings"
                    className="group block transition-all duration-200"
                  >
                    <div className="space-y-1">
                      <h3 className="text-[#2C2420] dark:text-[#F5EDE4] group-hover:text-[#EB582D] transition-colors" style={{ fontFamily: 'var(--font-display)' }}>
                        A few sentences on what I learned at Supernode Ventures
                      </h3>
                      <time className="text-xs text-[#8B7A6E] dark:text-[#9B8A7E]" dateTime="2022-09-29">
                        September 29, 2022
                      </time>
                    </div>
                  </Link>
                </article>
              </div>
            </div>

            {/* Photography Section */}
            <div className="space-y-6">
              <div className="space-y-1">
                <h2 className="text-2xl font-light text-[#2C2420] dark:text-[#F5EDE4]" style={{ fontFamily: 'var(--font-display)' }}>
                  Photography
                </h2>
                <p className="text-sm text-[#8B7A6E] dark:text-[#9B8A7E]">35mm film captures</p>
              </div>

              <div className="grid gap-3 grid-cols-2">
                {photos.map((photo, index) => (
                  <button
                    key={photo.id}
                    onClick={() => setSelectedPhoto(photo)}
                    className="group relative aspect-[3/4] overflow-hidden transition-all duration-300"
                    style={{
                      animationDelay: `${index * 0.1}s`,
                    }}
                  >
                    <Image
                      src={photo.src || "/placeholder.svg"}
                      alt={photo.alt}
                      width={400}
                      height={533}
                      className="w-full h-full object-cover group-hover:opacity-90 transition-opacity duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-0 left-0 right-0 p-3 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <p className="text-xs font-light" style={{ fontFamily: 'var(--font-display)' }}>{photo.title}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* SOTD Section */}
            <div className="space-y-6">
              <div className="space-y-1">
                <h2 className="text-2xl font-light text-[#2C2420] dark:text-[#F5EDE4]" style={{ fontFamily: 'var(--font-display)' }}>
                  SOTD
                </h2>
                <p className="text-sm text-[#8B7A6E] dark:text-[#9B8A7E]">Song of the Day</p>
              </div>

              {/* Current Song - Featured */}
              <button
                onClick={() => setSelectedSong(currentSong)}
                className="group w-full text-left transition-all duration-200"
              >
                <div className="space-y-3">
                  <div className="aspect-square relative overflow-hidden">
                    <Image
                      src={currentSong.albumArt || "/placeholder.svg"}
                      alt={`${currentSong.title} album art`}
                      width={400}
                      height={400}
                      className="w-full h-full object-cover group-hover:opacity-90 transition-opacity duration-300"
                      unoptimized
                    />
                    <div className="absolute top-3 right-3 bg-[#EB582D] text-white px-2 py-1 text-xs">
                      SOTD
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[#2C2420] dark:text-[#F5EDE4] group-hover:text-[#EB582D] transition-colors" style={{ fontFamily: 'var(--font-display)' }}>
                      {currentSong.title}
                    </p>
                    <p className="text-sm text-[#8B7A6E] dark:text-[#9B8A7E]">{currentSong.artist}</p>
                    <p className="text-xs text-[#8B7A6E] dark:text-[#9B8A7E]">{currentSong.date}</p>
                  </div>
                </div>
              </button>

              {/* Previous Songs - Compact */}
              <div className="space-y-3 pt-4 border-t border-[#E8DED3]/50 dark:border-[#3A2F28]/50">
                <p className="text-xs text-[#8B7A6E] dark:text-[#9B8A7E]">Previous selections</p>
                <div className="space-y-3">
                  {previousSongs.slice(0, 3).map((song) => (
                    <button
                      key={song.id}
                      onClick={() => setSelectedSong(song)}
                      className="w-full text-left group transition-all duration-200"
                    >
                      <div className="flex items-center gap-3">
                        <Image
                          src={song.albumArt || "/placeholder.svg"}
                          alt={`${song.title} album art`}
                          width={48}
                          height={48}
                          className="w-12 h-12 object-cover"
                          unoptimized
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm truncate text-[#2C2420] dark:text-[#F5EDE4] group-hover:text-[#EB582D] transition-colors" style={{ fontFamily: 'var(--font-display)' }}>
                            {song.title}
                          </p>
                          <p className="text-xs text-[#8B7A6E] dark:text-[#9B8A7E] truncate">{song.artist}</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Photo Dialog */}
      <Dialog open={!!selectedPhoto} onOpenChange={() => setSelectedPhoto(null)}>
        <DialogContent className="max-w-[95vw] sm:max-w-md md:max-w-4xl p-0 overflow-hidden gap-0">
          {selectedPhoto && (
            <div className="flex flex-col">
              {/* Photo - Full width */}
              <div className="relative w-full bg-black">
                <img
                  src={selectedPhoto.src || "/placeholder.svg"}
                  alt={selectedPhoto.alt}
                  className="w-full h-auto object-contain max-h-[70vh]"
                />
              </div>

              {/* Photo Details */}
              <div className="p-6 space-y-3">
                <h3 className="text-xl md:text-2xl font-light text-[#2C2420] dark:text-[#F5EDE4]" style={{ fontFamily: 'var(--font-display)' }}>
                  {selectedPhoto.title}
                </h3>

                <div className="flex flex-wrap items-center gap-3 text-sm text-[#8B7A6E] dark:text-[#9B8A7E]">
                  <span>{selectedPhoto.camera}</span>
                  <span className="text-[#E8DED3] dark:text-[#3A2F28]">•</span>
                  <span>{selectedPhoto.film}</span>
                  <span className="text-[#E8DED3] dark:text-[#3A2F28]">•</span>
                  <span>{selectedPhoto.date}</span>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Song Dialog */}
      <Dialog open={!!selectedSong} onOpenChange={() => setSelectedSong(null)}>
        <DialogContent className="max-w-[95vw] sm:max-w-md md:max-w-2xl p-0 overflow-hidden gap-0">
          {selectedSong && (
            <div className="flex flex-col">
              {/* Album Art - Full width on mobile */}
              <div className="relative w-full aspect-square md:aspect-auto md:h-auto">
                <img
                  src={selectedSong.albumArt || "/placeholder.svg"}
                  alt={`${selectedSong.title} by ${selectedSong.artist}`}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Song Details */}
              <div className="p-6 space-y-4">
                {/* Song Info */}
                <div className="space-y-2">
                  <h3 className="text-xl md:text-2xl font-light text-[#2C2420] dark:text-[#F5EDE4]" style={{ fontFamily: 'var(--font-display)' }}>
                    {selectedSong.title}
                  </h3>
                  <p className="text-base text-[#8B7A6E] dark:text-[#9B8A7E]">
                    {selectedSong.artist}
                  </p>
                  <p className="text-sm text-[#8B7A6E] dark:text-[#9B8A7E]">{selectedSong.album}</p>
                </div>

                {/* Metadata */}
                <div className="flex flex-wrap items-center gap-3 text-xs text-[#8B7A6E] dark:text-[#9B8A7E]">
                  <div className="flex items-center gap-1.5">
                    <Music2 className="h-3.5 w-3.5 text-[#EB582D]" />
                    <span>{selectedSong.date}</span>
                  </div>
                  <span className="text-[#E8DED3] dark:text-[#3A2F28]">•</span>
                  <span>{selectedSong.releaseDate}</span>
                </div>

                {/* Streaming Links */}
                <div className="space-y-2 pt-2">
                  <a
                    href={selectedSong.spotifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between w-full p-3.5 rounded-lg bg-[#FDF8F3] dark:bg-[#1A1512] border border-[#E8DED3]/50 dark:border-[#3A2F28]/50 hover:border-[#EB582D] transition-all duration-200 group"
                  >
                    <div className="flex items-center gap-3">
                      <img src="/spotify_logo.png" alt="Spotify" className="h-5 w-5" />
                      <span className="text-sm font-medium text-[#2C2420] dark:text-[#F5EDE4]">Spotify</span>
                    </div>
                    <ExternalLink className="h-4 w-4 text-[#8B7A6E] dark:text-[#9B8A7E] group-hover:text-[#EB582D] transition-colors" />
                  </a>

                  <a
                    href={selectedSong.appleMusicUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between w-full p-3.5 rounded-lg bg-[#FDF8F3] dark:bg-[#1A1512] border border-[#E8DED3]/50 dark:border-[#3A2F28]/50 hover:border-[#EB582D] transition-all duration-200 group"
                  >
                    <div className="flex items-center gap-3">
                      <img src="/apple_music_logo.png" alt="Apple Music" className="h-5 w-5" />
                      <span className="text-sm font-medium text-[#2C2420] dark:text-[#F5EDE4]">Apple Music</span>
                    </div>
                    <ExternalLink className="h-4 w-4 text-[#8B7A6E] dark:text-[#9B8A7E] group-hover:text-[#EB582D] transition-colors" />
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