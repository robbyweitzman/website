import Link from "next/link"

interface BlogPost {
  slug: string
  title: string
  content: React.ReactNode // Change this line to support JSX content
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
        <br />
        Be skeptical.
        <br />
        <br />
        Question what you see.
        <br />
        <br />
        Question statements you hear.
        <br />
        <br />
        Question answers you receive.
        <br />
        <br />
        <br />
        <i>September 29, 2022</i>
      </>
    ),
  },
  {
  slug: "why-and-how-i-built-this-website",
  title: "Why and how I built this website",
  content: (
    <>
      Growing up, my father and I shared the hobby of photography. Actually, my first website ever was called www.nikondslr.something.com (I forget whre it was hosted). It had info about our cameras and what we liked to do.
      <br /><br />
      The hobby had distanced itself throughout high school and college. But, Last summer I was inspired to start taking 35mm film photos, so I brought home some film for us to use on his Canon A1 and Nikon F4.
      <br /><br />
      I loved how mechanical the process was. Clicking the lens into the camera, loading the film, adjusting the aperture and focus, pressing the shutter button, manually advancing the film. It is a tactile feeling that's hard to replicate.
      <br /><br />
      After going through a couple rolls, we developed them and they looked awesome. Not too long after, I decided to buy this domain to upload the pictures and create an online photo gallery.
      <br /><br />
      As time went on, I continued taking pictures with my dad, but never made the website I wanted to put them on. When I saw Replit’s CEO <a href="https://x.com/amasad/status/1892805615766163529" className="custom-link">making a brick breaker game using Replit and Grok this week
</a>, it opened my eyes to what you can really build with AI.
      <br /><br />
      I'm quite familiar with AI for certain use cases from both using it at Merge to help me automate sales processes/data entry, plus selling to new AI companies who need proprietary company data to run their enterprise search and agent products.
      <br /><br />
      I knew you could use AI to code, but having no coding background, I thought it was just for small tweaks and not building entire websites. I was amazed what @amasad built so quickly, so decided to give it a go.
      <br /><br />
      I loaded up Grok, and spoke to it in the same way I would a friend sitting next to me who is an expert in the field. I described what I wanted to build, how I wanted it to look, and where I wanted to deploy it.
      <br /><br />
      I first tried Replit after seeing the above video, but landed on using v0.dev (an AI-powered tool to generate React UI from natural language) from Vercel because I wanted to prioritize a great looking front end.
      <br /><br />
      I started with the following prompt:
      <br /><br />
      <i>Create a clean, minimal landing page with 3 columns (Ideas, Photography, Song of the Day) separated by light grey vertical lines. Add an "About Me" section at the bottom linking to a placeholder page.</i>
      <br /><br />
      <img src="/ideas/screenshot-firstprompt.png" alt="Website v1" />
      <br /><br />
      <a href="http://robbyweitzman.com" className="custom-link">My website was born!!</a> I continued adding and editing…
      <br /><br />
      I wanted to have separate pages for each column, and described those to v0:
      <br /><br />
      <i>Have the ideas/blog posts link out to another page just for the blog post when the user clicks on them. When a user clicks on a photograph, have it pop out and show the name, camera, film, and date in a column on the right side.</i>
      <br /><br />
      It made both changes, so I began adding more pages to the nav bar.
      <br /><br />
      My two favorite prompts and results came next.
      <br /><br />
      <u>Mood room:</u>
      <br /><br />
      I wanted a page for things I find inspiring.
      <br /><br />
      So as Jeremy Clarkson once said, “I decided I needed a mood room.”
      <br /><br />
      <iframe
        width="560"
        height="315"
        src="https://www.youtube.com/embed/uPWUDU6sWvM?si=F4z0vBSt3iHrQnJB"
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
      <br /><br />
      I told v0:
      <br /><br />
      <i>Create a separate page called “mood room”. I just want it to be pictures. Make it so the user can click on a picture and drag it to move it around on the page. Make it so the pictures can stack on each other, similar to real life photos sitting on a table.</i>
      <br /><br />
      I was amazed! With some other tweaks regarding photo orientation and size, the output was just how I envisioned. Check it out here!
      <br /><br />
      <u>Cover flow:</u>
      <br /><br />
      I was about seven and a half years old (as I would have said that time) when the first iPod Touch came out. My favorite feature on it was the cover flow.
      <br /><br />
      Now, in the original prompt, you’ll remember that I wanted a Song of the Day (SOTD) section on my website. I send a SOTD to my friends every morning from what gets be juiced up the most at the gym that day.
      <br /><br />
      I wanted to recreate Cover Flow from the iPod Touch on my website, so I told v0:
      <br /><br />
      <i>Please make another specific page for the songs of the day. I want this page to resemble the Apple Cover Flow feature from the original iPhone.</i>
      <br /><br />
      It made this:
      <br /><br />
      <img src="/ideas/screenshot-sotd.png" alt="Cover Flow example" />
      <br /><br />
      I was in disbelief! Something that would’ve taken me month to learn how to code manually was built with 2 sentences.
      <br /><br />
      <a href="https://robbyweitzman.com/sotd" className="custom-link">Go check out the SOTD here</a> (spoiled if you’re reading on Feb 23, 2025, sorry!).
      <br /><br />
      Friends, if you’re reading this, you know I’ve been sending both an Apple Music and Spotify link in the group chat every morning. I use Apple Music (it has better music quality IMO), but most of my friends use Spotify. My cousin showed me an Apple shortcut that was made which flips an Apple Music link to a Spotify link, and vice versa, which makes sharing songs with my friends a lot easier. I use this every day.
      <br /><br />
      Now, expect me to send you a link to my website. It has links to both platforms and you can see in one view what I probably sent you yesterday, and the day before, and the day before, and the day before…….
      <br /><br />
      I’ve continued to make minor tweaks since, but I built this entire website in one day.
      <br /><br />
      I am truly inspired that I could build something like so quickly with no coding background using just Grok, Vercel, and Github. I’m excited to continue building and learn more about coding along the way!
      <br /><br />
      - - - - - - - - - - - - - - - -
      <br /><br />
      My suggestions/feature request for Vercel:
      <br /><br />
      I used v0.dev to generate all of the initial code. When I ran into errors, I would use Grok and Github agent to interpet the log errors I received in Vercel, and write me new code with the fix. After some time, the code in my repository was different from the code in v0.dev, and it started to become a slower process to make updates when they weren’t in sync.
      <br /><br />
      Feature request: Include an easy way to import a Github repository/tree of folders and files into v0.dev. Currently, if I wanted to create what I have in Github, I’d have to manually create each folder/file in v0.dev (please correct me if I’m wrong or if there are others ways, I am totally non-technical and don’t know best practices yet.)
      <br /><br />
      <i>February 23, 2025</i>
    </>
  ),
}
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
