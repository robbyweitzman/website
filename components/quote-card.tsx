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
          <p className="text-base font-light leading-relaxed text-[#2C2420] dark:text-[#F5EDE4]"
             style={{ fontFamily: 'var(--font-display)' }}>
            {text}
          </p>
        </blockquote>

        {/* Author */}
        <p className="text-base font-light text-[#8B7A6E] dark:text-[#9B8A7E]"
           style={{ fontFamily: 'var(--font-display)' }}>
          — {author}
        </p>
      </div>
    </div>
  )
}
