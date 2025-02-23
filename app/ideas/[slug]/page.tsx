import Link from "next/link"

interface BlogPost {
  slug: string
  title: string
  content: string
}

// This would typically come from a CMS or database
const posts: BlogPost[] = [
  {
    slug: "What I've learned this summer at Supernode Ventures.",
    title: "What I've learned this summer at Supernode Ventures.",
    content: "Be overly-curious and skeptical. Question what you see. Question statements, question answers.",
  },
  {
    slug: "future-of-web-development",
    title: "The Future of Web Development",
    content: "Content for future of web development...",
  },
  {
    slug: "creative-process-notes",
    title: "Creative Process Notes",
    content: "Content for creative process notes...",
  },
]

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

