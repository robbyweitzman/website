export interface Book {
  id: string
  title: string
  author: string
  coverImage: string
  spineColor: string
  textColor: string
}

export const books: Book[] = [
  {
    id: "meditations",
    title: "Meditations",
    author: "Marcus Aurelius",
    coverImage: "/bookshelf/meditations.jpg",
    spineColor: "#1a1a2e",
    textColor: "#d4af37",
  },
  {
    id: "science-of-getting-rich",
    title: "The Science of Getting Rich",
    author: "Wallace D. Wattles",
    coverImage: "/bookshelf/science-of-getting-rich.jpg",
    spineColor: "#2d572c",
    textColor: "#f5f5dc",
  },
  {
    id: "the-secret",
    title: "The Secret",
    author: "Rhonda Byrne",
    coverImage: "/bookshelf/the-secret.jpg",
    spineColor: "#722f37",
    textColor: "#ffd700",
  },
  {
    id: "dune-messiah",
    title: "Dune Messiah",
    author: "Frank Herbert",
    coverImage: "/bookshelf/dune-messiah.jpg",
    spineColor: "#c2702e",
    textColor: "#fff8e7",
  },
  {
    id: "dune",
    title: "Dune",
    author: "Frank Herbert",
    coverImage: "/bookshelf/dune.jpg",
    spineColor: "#d4a957",
    textColor: "#1a1a1a",
  },
  {
    id: "steve-jobs",
    title: "Steve Jobs",
    author: "Walter Isaacson",
    coverImage: "/bookshelf/steve-jobs.jpg",
    spineColor: "#f5f5f5",
    textColor: "#1a1a1a",
  },
  {
    id: "zero-to-one",
    title: "Zero to One",
    author: "Peter Thiel",
    coverImage: "/bookshelf/zero-to-one.jpg",
    spineColor: "#0a1628",
    textColor: "#4fc3f7",
  },
  {
    id: "extreme-ownership",
    title: "Extreme Ownership",
    author: "Jocko Willink",
    coverImage: "/bookshelf/extreme-ownership.jpg",
    spineColor: "#1a1a1a",
    textColor: "#ffffff",
  },
  {
    id: "never-split-the-difference",
    title: "Never Split the Difference",
    author: "Chris Voss",
    coverImage: "/bookshelf/never-split-the-difference.jpg",
    spineColor: "#1a1a1a",
    textColor: "#e74c3c",
  },
  {
    id: "subtle-art",
    title: "The Subtle Art of Not Giving a F*ck",
    author: "Mark Manson",
    coverImage: "/bookshelf/subtle-art.jpg",
    spineColor: "#f37321",
    textColor: "#ffffff",
  },
  {
    id: "total-competition",
    title: "Total Competition",
    author: "Ross Brawn",
    coverImage: "/bookshelf/total-competition.jpg",
    spineColor: "#cc0000",
    textColor: "#ffffff",
  },
]
