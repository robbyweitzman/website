import Link from "next/link"

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#FFFAF1]">
      <header className="container px-8 md:px-16 py-6 mx-auto">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-lg font-medium hover:text-muted-foreground transition-colors">
            robby weitzman
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/mood-board" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
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

      <div className="container px-8 md:px-16 py-12 mx-auto">
        <div className="max-w-[800px] mx-auto">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-0 md:left-1/2 h-full w-px bg-gray-200 transform -translate-x-1/2" />

            {/* Website */}
            <div className="relative mb-16">
              <div className="flex flex-col md:flex-row items-start gap-8">
                <div className="flex-1 order-2 md:order-1 md:text-right">
                  <h3 className="font-semibold mb-2">Made this website</h3>
                  <p className="text-sm text-muted-foreground">New York City</p>
                  <p className="text-sm text-muted-foreground">25 years old</p>
                </div>
                <div className="w-3 h-3 rounded-full bg-foreground relative z-10 mt-2 md:mx-auto order-1 md:order-2 ring-4 ring-background" />
                <div className="flex-1 order-3">
                  <p className="font-medium">Using Vercel and Grok</p>
                  <p className="text-sm text-muted-foreground">February 2025</p>
                </div>
              </div>
            </div>

            {/* Merge */}
            <div className="relative mb-16">
              <div className="flex flex-col md:flex-row items-start gap-8">
                <div className="flex-1 order-2 md:order-1 md:text-right">
                  <h3 className="font-semibold mb-2">Merge</h3>
                  <p className="text-sm text-muted-foreground">New York City</p>
                  <p className="text-sm text-muted-foreground">22 years old - present</p>
                </div>
                <div className="w-3 h-3 rounded-full bg-foreground relative z-10 mt-2 md:mx-auto order-1 md:order-2 ring-4 ring-background" />
                <div className="flex-1 space-y-6 order-3">
                  <div>
                    <p className="font-medium">Account Executive (Startups)</p>
                    <p className="text-sm text-muted-foreground">November 2023 - Present</p>
                  </div>
                  <div>
                    <p className="font-medium">Sales Development Representative</p>
                    <p className="text-sm text-muted-foreground">December 2022 - November 2023</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Supernode Ventures */}
            <div className="relative mb-16">
              <div className="flex flex-col md:flex-row items-start gap-8">
                <div className="flex-1 order-2 md:order-1 md:text-right">
                  <h3 className="font-semibold mb-2">Supernode Ventures</h3>
                  <p className="text-sm text-muted-foreground">New York City</p>
                  <p className="text-sm text-muted-foreground">22 years old</p>
                </div>
                <div className="w-3 h-3 rounded-full bg-foreground relative z-10 mt-2 md:mx-auto order-1 md:order-2 ring-4 ring-background" />
                <div className="flex-1 order-3">
                  <p className="font-medium">Analyst</p>
                  <p className="text-sm text-muted-foreground">June 2022 - November 2022</p>
                </div>
              </div>
            </div>

            {/* Education */}
            <div className="relative mb-16">
              <div className="flex flex-col md:flex-row items-start gap-8">
                <div className="flex-1 order-2 md:order-1 md:text-right">
                  <h3 className="font-semibold mb-2">University of Maryland,</h3>
                  <h3 className="font-semibold mb-2">Smith School of Business</h3>
                  <p className="text-sm text-muted-foreground">College Park, MD</p>
                  <p className="text-sm text-muted-foreground">18-22 years old</p>
                </div>
                <div className="w-3 h-3 rounded-full bg-foreground relative z-10 mt-2 md:mx-auto order-1 md:order-2 ring-4 ring-background" />
                <div className="flex-1 order-3">
                  <p className="font-medium">Major: Finance</p>
                  <p className="font-medium">Minor: Technology Entrepreneurship</p>
                  <p className="text-sm text-muted-foreground">September 2018 - May 2022</p>
                </div>
              </div>
            </div>

            {/* Birth */}
            <div className="relative">
              <div className="flex flex-col md:flex-row items-start gap-8">
                <div className="flex-1 order-2 md:order-1 md:text-right">
                  <h3 className="font-semibold mb-2">Born</h3>
                  <p className="text-sm text-muted-foreground">Norwalk, CT</p>
                  <p className="text-sm text-muted-foreground">0 years old</p>
                </div>
                <div className="w-3 h-3 rounded-full bg-foreground relative z-10 mt-2 md:mx-auto order-1 md:order-2 ring-4 ring-background" />
                <div className="flex-1 order-3">
                  <p className="text-sm text-muted-foreground">December 6, 1999</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

