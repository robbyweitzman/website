export interface Idea {
  slug: string
  title: string
  date: string
  dateTime: string
}

// Newest first
export const ideas: Idea[] = [
  {
    slug: "i-vibecoded-my-tv-with-claude",
    title: "I vibecoded my TV with Claude",
    date: "October 31, 2026",
    dateTime: "2026-10-31",
  },
  {
    slug: "why-and-how-i-built-this-website",
    title: "Why and how I built this website",
    date: "February 23, 2025",
    dateTime: "2025-02-23",
  },
]
