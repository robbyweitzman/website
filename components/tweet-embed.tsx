"use client"

import { useEffect, useRef } from "react"

interface TweetEmbedProps {
  tweetUrl: string
}

declare global {
  interface Window {
    twttr?: {
      widgets: {
        createTweet: (
          tweetId: string,
          container: HTMLElement | null,
          options?: Record<string, unknown>
        ) => Promise<HTMLElement>
      }
    }
  }
}

export function TweetEmbed({ tweetUrl }: TweetEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const renderedRef = useRef(false)
  const tweetId = tweetUrl.split('/status/')[1]?.split('?')[0]

  useEffect(() => {
    if (!tweetId || !containerRef.current || renderedRef.current) return

    const renderTweet = () => {
      if (window.twttr && containerRef.current && !renderedRef.current) {
        renderedRef.current = true
        window.twttr.widgets.createTweet(tweetId, containerRef.current, {
          align: 'center',
          conversation: 'none',
        })
      }
    }

    // Load Twitter widgets script if not already loaded
    if (!window.twttr) {
      const script = document.createElement('script')
      script.src = 'https://platform.twitter.com/widgets.js'
      script.async = true
      script.onload = renderTweet
      document.body.appendChild(script)
    } else {
      renderTweet()
    }
  }, [tweetId])

  if (!tweetId) {
    return (
      <div className="w-full max-w-2xl mx-auto p-6 text-center text-[#8B7A6E] dark:text-[#9B8A7E]">
        Invalid tweet URL
      </div>
    )
  }

  return (
    <div className="w-full flex justify-center overflow-hidden">
      <div
        ref={containerRef}
        className="tweet-container"
        style={{
          width: '400px',
          maxWidth: '80%',
        }}
      />
    </div>
  )
}
