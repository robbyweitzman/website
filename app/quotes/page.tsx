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

      <div className="container px-8 md:px-16 py-12 mx-auto">
        <div className="max-w-6xl mx-auto">
          {/* Page title */}
          <div className="mb-16">
            <h1 className="text-2xl font-semibold dark:text-foreground mb-4">
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
                    <span className="dark:text-foreground mt-1 flex-shrink-0">•</span>
                    <div>
                      <p className="text-base leading-relaxed dark:text-foreground">
                        {quote.text}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        {quote.author}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right column - Images and Tweets */}
            <div className="space-y-6">
              {quotes.filter(q => q.type === 'tweet' || q.type === 'image').map((quote) => (
                <div key={quote.id} className="animate-in fade-in duration-700">
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
