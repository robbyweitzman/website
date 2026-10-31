import Link from "next/link"
import { ideas } from "../data/ideas"
import { DarkModeToggle } from "@/components/dark-mode-toggle"

export const metadata = {
  title: "ideas",
}

export default function IdeasPage() {
  return (
    <main className="min-h-screen bg-[#FFFAF1] dark:bg-background transition-colors">
      <header className="container px-9 md:px-16 py-7 md:py-6 mx-auto">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-lg font-medium hover:text-muted-foreground transition-colors">
            robby weitzman
          </Link>
          <div className="hidden md:flex items-center gap-3 sm:gap-4 md:gap-6">
            <Link href="/mood-room" className="text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors">
              mood room
            </Link>
            <Link href="/photos" className="text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors">
              photos
            </Link>
            <Link href="/sotd" className="text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors">
              sotd
            </Link>
            <Link href="/quotes" className="text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors">
              quotes
            </Link>
            <Link href="/about" className="text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors">
              about
            </Link>
            <DarkModeToggle />
          </div>
        </div>
      </header>

      <div className="container px-9 md:px-16 py-12 mx-auto">
        <div className="max-w-[600px] mx-auto space-y-6">
          <div>
            <h1 className="text-2xl font-semibold dark:text-foreground">Ideas</h1>
            <p className="text-gray-600 dark:text-gray-400">Some of my thoughts</p>
          </div>
          <div className="space-y-4" role="list">
            {ideas.map((idea) => (
              <article role="listitem" key={idea.slug}>
                <Link
                  href={`/ideas/${idea.slug}`}
                  className="block p-4 rounded-lg bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors duration-200 group focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 active:bg-gray-200 dark:active:bg-gray-600"
                  aria-label={`Read article: ${idea.title}`}
                >
                  <div className="space-y-1">
                    <h2 className="font-medium text-gray-900 dark:text-gray-100 group-hover:text-black dark:group-hover:text-white">
                      {idea.title}
                    </h2>
                    <time className="text-xs text-gray-500 dark:text-gray-400" dateTime={idea.dateTime}>{idea.date}</time>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
