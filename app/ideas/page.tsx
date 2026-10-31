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

      <div className="container px-9 md:px-16 pt-6 pb-12 mx-auto">
        <div className="max-w-[600px] mx-auto">
          <h1 className="text-xl font-semibold text-gray-900 dark:text-foreground mb-4">ideas</h1>
          <ul className="divide-y divide-gray-200 dark:divide-gray-700 border-t border-gray-200 dark:border-gray-700">
            {ideas.map((idea) => (
              <li key={idea.slug}>
                <Link href={`/ideas/${idea.slug}`} className="group flex flex-col gap-1 py-5">
                  <span className="font-medium text-gray-900 dark:text-gray-100 group-hover:underline underline-offset-4">
                    {idea.title}
                  </span>
                  <time className="text-xs text-gray-500 dark:text-gray-400" dateTime={idea.dateTime}>{idea.date}</time>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  )
}
