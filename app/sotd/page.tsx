import type { Metadata } from 'next'
import Link from "next/link"
import { getAllSongs, getCurrentSong } from "../data/songs"
import SotdClient from "./sotd-client"
import { DarkModeToggle } from "@/components/dark-mode-toggle"

export async function generateMetadata(): Promise<Metadata> {
  const currentSong = getCurrentSong()
  
  return {
    title: `${currentSong.title} by ${currentSong.artist} - SOTD | Robby Weitzman`,
    description: `Today's Song of the Day: "${currentSong.title}" by ${currentSong.artist} from the album "${currentSong.album}". Discover my daily music recommendations.`,
    openGraph: {
      title: `${currentSong.title} by ${currentSong.artist} - SOTD`,
      description: `Today's Song of the Day: "${currentSong.title}" by ${currentSong.artist}`,
      url: 'https://robbyweitzman.com/sotd',
      siteName: 'Robby Weitzman',
      images: [
        {
          url: currentSong.albumArt,
          width: 1200,
          height: 1200,
          alt: `Album art for "${currentSong.title}" by ${currentSong.artist}`,
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${currentSong.title} by ${currentSong.artist} - SOTD`,
      description: `Today's Song of the Day: "${currentSong.title}" by ${currentSong.artist}`,
      images: [currentSong.albumArt],
    },
  }
}

export default function SotdPage() {
  const allSongs = getAllSongs()

  return (
    <main className="min-h-screen bg-[#FDF8F3] dark:bg-[#1A1512] overflow-hidden transition-colors">
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

      <header className="fixed top-0 left-0 right-0 z-40 bg-[#FDF8F3]/95 dark:bg-[#1A1512]/95 backdrop-blur-sm border-b border-[#E8DED3]/30 dark:border-[#3A2F28]/30">
        <div className="container px-6 md:px-16 py-4 mx-auto max-w-7xl">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-lg font-light text-[#2C2420] dark:text-[#F5EDE4] hover:text-[#EB582D] transition-colors" style={{ fontFamily: 'var(--font-display)' }}>
              robby weitzman
            </Link>
            <nav className="flex items-center gap-6">
              <Link href="/mood-room" className="text-sm text-[#6B5A50] dark:text-[#B8A89C] hover:text-[#EB582D] transition-colors">
                Mood Room
              </Link>
              <Link href="/photos" className="text-sm text-[#6B5A50] dark:text-[#B8A89C] hover:text-[#EB582D] transition-colors">
                Photos
              </Link>
              <Link href="/sotd" className="text-sm text-[#6B5A50] dark:text-[#B8A89C] hover:text-[#EB582D] transition-colors">
                SOTD
              </Link>
              <Link href="/about" className="text-sm text-[#6B5A50] dark:text-[#B8A89C] hover:text-[#EB582D] transition-colors">
                About
              </Link>
              <DarkModeToggle />
            </nav>
          </div>
        </div>
      </header>

      <SotdClient allSongs={allSongs} />
    </main>
  )
}
