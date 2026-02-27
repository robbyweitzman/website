"use client"

interface QuoteCardProps {
  text: string
  author: string
}

export function QuoteCard({ text, author }: QuoteCardProps) {
  return (
    <div className="relative w-full max-w-[600px] mx-auto">
      <div className="relative px-6 md:px-8 py-10 md:py-12 text-center">
        {/* Quote text */}
        <blockquote className="mb-8">
          <p className="text-base leading-relaxed dark:text-foreground">
            {text}
          </p>
        </blockquote>

        {/* Author */}
        <p className="text-base text-gray-500 dark:text-gray-400">
          — {author}
        </p>
      </div>
    </div>
  )
}
