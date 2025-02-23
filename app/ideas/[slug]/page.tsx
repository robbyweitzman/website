import Link from "next/link"

interface BlogPost {
  slug: string
  title: string
  content: string
}

// This would typically come from a CMS or database
const posts: BlogPost[] = [
  {
    slug: "supernode-learnings",
    title: "A few sentences on what I learned at Supernode Ventures in 2022.",
    content: (
      <>
        Be overly-curious.
        <br />
        Be skeptical.
        <br />
        Question what you see.
        <br />
        Question statements you hear.
        <br />
        Question answers you receive.
        <br />
        <br />
        <i>September 29, 2022</i>
      </>
    ),
  },
  {
    slug: "post2",
    title: "Coming soon",
    content: "Coming soon...",
  },
  {
    slug: "post3",
    title: "Coming soon",
    content: "Coming soon...",
  },
];

export default function BlogPost({ params }: { params: { slug: string } }) {
  const post = posts.find((post) => post.slug === params.slug)

  if (!post) {
    return <div>Post not found</div>
  }

  return (
    <main className="min-h-screen bg-[#FFFAF1]">
      <header className="container px-8 md:px-16 py-6 mx-auto">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-lg font-medium hover:text-muted-foreground transition-colors">
            robby weitzman
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/mood-room" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              mood room
            </Link>
            <Link href="/photos" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              photos
            </Link>
            <Link href="/sotd" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              sotd
            </Link>
            <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              about
            </Link>
          </div>
        </div>
      </header>

      <article className="container px-8 md:px-16 py-12 mx-auto">
        <div className="max-w-[600px] mx-auto">
          <h1 className="text-2xl font-semibold tracking-tight mb-8">{post.title}</h1>
          <div className="prose prose-neutral">{post.content}</div>
        </div>
      </article>
    </main>
  )
}

