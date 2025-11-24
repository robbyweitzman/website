"use client"

interface TweetEmbedProps {
  tweetUrl: string
}

export function TweetEmbed({ tweetUrl }: TweetEmbedProps) {
  // Extract tweet ID from URL
  const tweetId = tweetUrl.split('/status/')[1]?.split('?')[0]

  if (!tweetId) {
    return (
      <div className="w-full max-w-2xl mx-auto p-6 text-center text-[#8B7A6E] dark:text-[#9B8A7E]">
        Invalid tweet URL
      </div>
    )
  }

  return (
    <div className="w-full max-w-[600px] mx-auto flex justify-center items-center">
      <div style={{ transform: 'scale(0.80)', transformOrigin: 'top center' }}>
        <iframe
          src={`https://platform.twitter.com/embed/Tweet.html?id=${tweetId}`}
          width="500"
          height="350"
          style={{ border: 'none', maxWidth: '100%' }}
          loading="lazy"
        />
      </div>
    </div>
  )
}
