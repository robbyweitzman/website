import Link from "next/link"
import { ThemeToggle } from "./theme-toggle"

export function SiteHeader() {
  return (
    <header className="container px-8 md:px-16 py-6 mx-auto">
      <div className="flex items-center justify-between">
        <Link href="/" className="text-lg font-medium hover:text-muted-foreground transition-colors">
          robby weitzman
        </Link>
        <div className="flex items-center gap-6">
          <Link href="/mood-room" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            mood room
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
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}

