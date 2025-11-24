"use client"

import Link from "next/link"
import { getAllQuotes } from "../data/quotes"
import { QuoteCard } from "@/components/quote-card"
import { TweetEmbed } from "@/components/tweet-embed"
import { ImageQuote } from "@/components/image-quote"
import { DarkModeToggle } from "@/components/dark-mode-toggle"

export default function QuotesPage() {
  const quotes = getAllQuotes()

  return (
    <main className="min-h-screen bg-[#FDF8F3] dark:bg-[#1A1512] transition-colors">
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
              <Link href="/mood-room" className="text-sm text-[#6B5A50] dark:text-[#B8A89C] hover:text-[#EB582D] transition-colors" style={{ fontFamily: 'var(--font-display)' }}>
                mood room
              </Link>
              <Link href="/photos" className="text-sm text-[#6B5A50] dark:text-[#B8A89C] hover:text-[#EB582D] transition-colors" style={{ fontFamily: 'var(--font-display)' }}>
                photos
              </Link>
              <Link href="/sotd" className="text-sm text-[#6B5A50] dark:text-[#B8A89C] hover:text-[#EB582D] transition-colors" style={{ fontFamily: 'var(--font-display)' }}>
                sotd
              </Link>
              <Link href="/quotes" className="text-sm text-[#6B5A50] dark:text-[#B8A89C] hover:text-[#EB582D] transition-colors" style={{ fontFamily: 'var(--font-display)' }}>
                quotes
              </Link>
              <Link href="/about" className="text-sm text-[#6B5A50] dark:text-[#B8A89C] hover:text-[#EB582D] transition-colors" style={{ fontFamily: 'var(--font-display)' }}>
                about
              </Link>
              <DarkModeToggle />
            </nav>
          </div>
        </div>
      </header>

      <div className="container px-6 md:px-16 pt-24 pb-20 md:pt-32 md:pb-32 mx-auto max-w-7xl">
        <div className="max-w-6xl mx-auto">
          {/* Page title */}
          <div className="mb-16">
            <h1 className="text-2xl font-light text-[#2C2420] dark:text-[#F5EDE4] mb-4"
                style={{ fontFamily: 'var(--font-display)' }}>
              things I try to remind myself of daily
            </h1>
          </div>

          {/* Two column layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left column - Text quotes as bullet points */}
            <div>
              <ul className="space-y-6">
                {quotes.filter(q => q.type === 'custom').map((quote) => (
                  <li key={quote.id} className="flex gap-4">
                    <span className="text-[#2C2420] dark:text-[#F5EDE4] mt-1 flex-shrink-0">•</span>
                    <div>
                      <p className="text-base font-light leading-relaxed text-[#2C2420] dark:text-[#F5EDE4]"
                         style={{ fontFamily: 'var(--font-display)' }}>
                        {quote.text}
                      </p>
                      <p className="text-sm text-[#8B7A6E] dark:text-[#9B8A7E] mt-1"
                         style={{ fontFamily: 'var(--font-display)' }}>
                        {quote.author}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right column - Images and Tweets */}
            <div className="space-y-0">
              {quotes.filter(q => q.type === 'tweet' || q.type === 'image').map((quote) => (
                <div key={quote.id} className="animate-in fade-in duration-700 mb-3">
                  {quote.type === 'tweet' && quote.tweetUrl ? (
                    <TweetEmbed tweetUrl={quote.tweetUrl} />
                  ) : quote.type === 'image' && quote.imageSrc && quote.imageAlt ? (
                    <ImageQuote imageSrc={quote.imageSrc} imageAlt={quote.imageAlt} />
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
