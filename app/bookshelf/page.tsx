"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { DarkModeToggle } from "@/components/dark-mode-toggle"
import { useIsMobile } from "@/components/ui/use-mobile"
import { books } from "../data/books"

export default function BookshelfPage() {
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const isMobile = useIsMobile()

  const selectedBook = expandedId ? books.find((b) => b.id === expandedId) : null

  useEffect(() => {
    if (!expandedId) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setExpandedId(null)
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [expandedId])

  return (
    <main className="min-h-screen bg-[#FFFAF1] dark:bg-background transition-colors">
      <header className="container px-8 md:px-16 py-6 mx-auto">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="text-lg font-medium hover:text-muted-foreground transition-colors"
          >
            robby weitzman
          </Link>
          <div className="flex items-center gap-6">
            <Link
              href="/mood-room"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              mood room
            </Link>
            <Link
              href="/photos"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              photos
            </Link>
            <Link
              href="/bookshelf"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              bookshelf
            </Link>
            <Link
              href="/sotd"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              sotd
            </Link>
            <Link
              href="/quotes"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              quotes
            </Link>
            <Link
              href="/about"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              about
            </Link>
            <DarkModeToggle />
          </div>
        </div>
      </header>

      <div className="container px-8 md:px-16 py-12 mx-auto">
        {isMobile ? (
          <div className="grid grid-cols-2 gap-4">
            {books.map((book) => (
              <button
                key={book.id}
                type="button"
                className="text-left"
                onClick={() => setExpandedId(book.id)}
              >
                <div className="aspect-[180/260] relative rounded overflow-hidden shadow-md">
                  <Image
                    src={book.coverImage}
                    alt={`${book.title} by ${book.author}`}
                    fill
                    className="object-cover"
                  />
                </div>
                <p className="mt-2 text-xs font-medium truncate">{book.title}</p>
                <p className="text-xs text-muted-foreground truncate">{book.author}</p>
              </button>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <div className="relative">
              <div className="flex items-end px-4">
                {books.map((book) => (
                  <div key={book.id} className="book-slot">
                    <div
                      className="book-spine"
                      style={{
                        backgroundColor: book.spineColor,
                        color: book.textColor,
                      }}
                      onClick={() => setExpandedId(book.id)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault()
                          setExpandedId(book.id)
                        }
                      }}
                    >
                      <span className="book-spine-text">
                        {book.title}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              {/* Wooden shelf */}
              <div className="shelf-plank h-5 rounded-b-sm" />
              <div className="shelf-lip h-2 rounded-b" />
            </div>

            {/* Expanded book overlay */}
            {selectedBook && (
              <div
                className="book-expanded-overlay"
                onClick={() => setExpandedId(null)}
              >
                <div
                  className="book-expanded-cover"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Image
                    src={selectedBook.coverImage}
                    alt={`${selectedBook.title} by ${selectedBook.author}`}
                    width={240}
                    height={360}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="book-expanded-info">
                  <h2 className="text-xl font-semibold text-white">
                    {selectedBook.title}
                  </h2>
                  <p className="text-sm text-white/70 mt-1">
                    {selectedBook.author}
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Expanded book dialog (mobile) */}
      <Dialog
        open={!!selectedBook && isMobile}
        onOpenChange={(open) => !open && setExpandedId(null)}
      >
        <DialogContent className="max-w-sm">
          {selectedBook && (
            <div className="flex flex-col items-center gap-4 pt-4">
              <div className="w-48 aspect-[180/260] relative rounded overflow-hidden shadow-lg">
                <Image
                  src={selectedBook.coverImage}
                  alt={`${selectedBook.title} by ${selectedBook.author}`}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="text-center">
                <h2 className="text-lg font-semibold">{selectedBook.title}</h2>
                <p className="text-sm text-muted-foreground">
                  {selectedBook.author}
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </main>
  )
}
