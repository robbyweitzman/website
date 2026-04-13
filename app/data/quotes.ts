export interface Quote {
  id?: string
  type: 'custom' | 'tweet' | 'image'
  text?: string // For custom quotes
  author?: string // For custom quotes
  tweetUrl?: string // For Twitter embeds
  imageSrc?: string // For image quotes
  imageAlt?: string // For image quotes alt text
}

export const quotes: Quote[] = [
  {
    type: "image",
    imageSrc: "/quotes/Be first.jpg",
    imageAlt: "Be first"
  },
  {
    type: "custom",
    text: "I swear to you that to think too much is a disease, a real, actual disease.",
    author: "Fyodor Dostoyevsky"
  },
  {
    type: "custom",
    text: "Life shrinks or expands in proportion to one's courage.",
    author: "Anais Nin"
  },
  {
    type: "tweet",
    tweetUrl: "https://x.com/neverdoompro/status/1987306664572162216?s=46"
  },
  {
    type: "tweet",
    tweetUrl: "https://x.com/dukedarls/status/1990340965778006203?s=46"
  },
  {
    type: "tweet",
    tweetUrl: "https://x.com/pathofmen_/status/1990697767417831444?s=46"
  },
  {
    type: "tweet",
    tweetUrl: "https://x.com/aristomarinetti/status/1990821923664646575?s=46"
  },
  {
    type: "image",
    imageSrc: "/quotes/positive-thinking.png",
    imageAlt: "Be first"
  },
  {
    type: "tweet",
    tweetUrl: "https://x.com/naval/status/1390216106384584704?s=20"
  },
  {
    type: "custom",
    text: "I believe in discipline, hard work, and patience.",
    author: "Anonymous"
  },
  {
    type: "custom",
    text: "A man is literally what he thinks.",
    author: "James Allen"
  },
  {
    type: "custom",
    text: "Don't let yesterday take up too much of today.",
    author: "Will Rogers"
  },
  {
    type: "custom",
    text: "Evil is whatever distracts",
    author: "Nietzsche",
  },
  {
    type: "custom",
    text: "Anything is possible if you're willing to work for it.",
    author: "Rob Dyrdek",
  },
  {
    type: "tweet",
    tweetUrl: "https://x.com/colejaczko/status/2037346984844222806?s=20"
  },
  {
    type: "custom",
    text: "Action > Anxiety",
    author: "James",
  },
  {
    type: "custom",
    text: "Never take the easy way out",
    author: "Andrew",
  },
  {
    type: "custom",
    text: "Communicate through uncertainty",
    author: "Anonymous",
  },
  {
    type: "custom",
    text: "Deal with reality and don't protect yourself",
    author: "Dad",
  },
  {
    type: "custom",
    text: "Face the music",
    author: "Anonymous",
  },
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
