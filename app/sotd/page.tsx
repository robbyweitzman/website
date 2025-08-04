import type { Metadata } from 'next'
import Link from "next/link"
import { getAllSongs, getCurrentSong } from "../data/songs"
import SotdClient from "./sotd-client"

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
    <main className="min-h-screen bg-[#FFFAF1] overflow-hidden">
      <header className="container px-8 md:px-16 py-4 sm:py-5 md:py-6 mx-auto">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-lg font-medium hover:text-muted-foreground transition-colors">
            robby weitzman
          </Link>
          <div className="flex items-center gap-3 sm:gap-4 md:gap-6">
            <Link href="/mood-room" className="text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors">
              mood room
            </Link>
            <Link href="/photos" className="text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors">
              photos
            </Link>
            <Link href="/sotd" className="text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors">
              sotd
            </Link>
            <Link href="/about" className="text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors">
              about
            </Link>
          </div>
        </div>
      </header>

      <SotdClient allSongs={allSongs} />
    </main>
  )
}
