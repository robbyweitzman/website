export interface Quote {
  id?: string
  type: 'custom' | 'tweet' | 'image'
  text?: string // For custom quotes
  author?: string // For custom quotes
  tweetUrl?: string // For Twitter embeds
  imageSrc?: string // For image quotes
  imageAlt?: string // For image quotes alt text
  date: string // Date added/displayed
}

export const quotes: Quote[] = [
  {
    type: "tweet",
    tweetUrl: "https://x.com/neverdoompro/status/1987306664572162216?s=46",
    date: "2025-11-23"
  },
  {
    type: "tweet",
    tweetUrl: "https://x.com/dukedarls/status/1990340965778006203?s=46",
    date: "2025-11-23"
  },
  {
    type: "tweet",
    tweetUrl: "https://x.com/pathofmen_/status/1990697767417831444?s=46",
    date: "2025-11-23"
  },
  {
    type: "tweet",
    tweetUrl: "https://x.com/aristomarinetti/status/1990821923664646575?s=46",
    date: "2025-11-23"
  },
  {
    type: "image",
    imageSrc: "/quotes/positive-thinking.png",
    imageAlt: "Be first",
    date: "2025-11-23"
  },
  {
    type: "image",
    imageSrc: "/quotes/Be first.jpg",
    imageAlt: "Be first",
    date: "2025-11-23"
  },
  {
    type: "tweet",
    tweetUrl: "https://x.com/naval/status/1390216106384584704?s=20",
    date: "2025-11-23"
  },
  {
    type: "custom",
    text: "I believe in discipline, hard work, and patience.",
    author: "Robby Weitzman",
    date: "2025-11-23"
  },
  {
    type: "custom",
    text: "A man is literally what he thinks.",
    author: "James Allen",
    date: "2025-11-23"
  },
  {
    type: "custom",
    text: "Don't let yesterday take up too much of today.",
    author: "Will Rogers",
    date: "2025-11-23"
  },
  {
    type: "custom",
    text: "Evil is whatever distracts",
    author: "Nietzsche",
    date: "2025-11-23"
  }
]

export const getQuotesWithIds = () => {
  return quotes.map((quote, index) => ({
    ...quote,
    id: (index + 1).toString()
  }))
}

export const getAllQuotes = () => {
  return getQuotesWithIds().reverse() // Most recent first
}
