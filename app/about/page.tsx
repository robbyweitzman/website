import Link from "next/link"
import { DarkModeToggle } from "@/components/dark-mode-toggle"

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#FFFAF1] dark:bg-background relative transition-colors">
      {/* Timeline line that runs from top to the last bullet */}
      <div className="absolute left-[29px] md:left-1/2 top-0 bottom-[100px] w-px bg-gray-200 dark:bg-gray-700 transform md:-translate-x-1/2 z-0" />
      
      <header className="container px-6 sm:px-8 md:px-16 py-4 md:py-6 mx-auto relative z-10">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-base md:text-lg font-medium hover:text-muted-foreground transition-colors">
            robby weitzman
          </Link>
          <div className="flex items-center gap-3 sm:gap-4 md:gap-6">
            <Link href="/mood-room" className="text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors">
              mood room
            </Link>
            <Link href="/photos" className="text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors">
              photos
            </Link>
            <Link href="/sotd" className="text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors">
              sotd
            </Link>
            <Link href="/about" className="text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors">
              about
            </Link>
            <DarkModeToggle />
          </div>
        </div>
      </header>

      <div className="container px-6 sm:px-8 md:px-16 py-8 md:py-12 mx-auto">
        <div className="max-w-[800px] mx-auto">
          <div className="relative">
            {/* Anthropic */}
            <div className="relative mb-10 md:mb-16">
              <div className="flex flex-col md:flex-row items-start gap-4 md:gap-8">
                <div className="flex-1 order-2 md:order-1 md:text-right">
                  <h3 className="font-semibold mb-1 md:mb-2">Anthropic</h3>
                  <p className="text-sm text-muted-foreground">New York City</p>
                  <p className="text-sm text-muted-foreground">25 years old - present</p>
                </div>
                <div className="w-3 h-3 rounded-full bg-foreground relative z-10 mt-1 md:mt-2 md:mx-auto order-1 md:order-2 ring-4 ring-background absolute left-[23px] md:relative md:left-auto" />
                <div className="flex-1 order-3">
                  <p className="font-medium">GTM</p>
                  <p className="text-sm text-muted-foreground">June 2025 - Present</p>
                </div>
              </div>
            </div>

            {/* Website */}
            <div className="relative mb-10 md:mb-16">
              <div className="flex flex-col md:flex-row items-start gap-4 md:gap-8">
                <div className="flex-1 order-2 md:order-1 md:text-right">
                  <h3 className="font-semibold mb-1 md:mb-2">Made this website</h3>
                  <p className="text-sm text-muted-foreground">New York City</p>
                  <p className="text-sm text-muted-foreground">25 years old</p>
                </div>
                <div className="w-3 h-3 rounded-full bg-foreground relative z-10 mt-1 md:mt-2 md:mx-auto order-1 md:order-2 ring-4 ring-background absolute left-[23px] md:relative md:left-auto" />
                <div className="flex-1 order-3">
                  <p className="font-medium">Using Vercel, Grok, and Github</p>
                  <p className="text-sm text-muted-foreground">February 22, 2025</p>
                </div>
              </div>
            </div>

            {/* Merge */}
            <div className="relative mb-10 md:mb-16">
              <div className="flex flex-col md:flex-row items-start gap-4 md:gap-8">
                <div className="flex-1 order-2 md:order-1 md:text-right">
                  <h3 className="font-semibold mb-1 md:mb-2">Merge</h3>
                  <p className="text-sm text-muted-foreground">New York City</p>
                  <p className="text-sm text-muted-foreground">22 years old - present</p>
                </div>
                <div className="w-3 h-3 rounded-full bg-foreground relative z-10 mt-1 md:mt-2 md:mx-auto order-1 md:order-2 ring-4 ring-background absolute left-[23px] md:relative md:left-auto" />
                <div className="flex-1 space-y-4 md:space-y-6 order-3">
                  <div>
                    <p className="font-medium">Account Executive</p>
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
            <div className="relative mb-10 md:mb-16">
              <div className="flex flex-col md:flex-row items-start gap-4 md:gap-8">
                <div className="flex-1 order-2 md:order-1 md:text-right">
                  <h3 className="font-semibold mb-1 md:mb-2">Supernode Ventures</h3>
                  <p className="text-sm text-muted-foreground">New York City</p>
                  <p className="text-sm text-muted-foreground">22 years old</p>
                </div>
                <div className="w-3 h-3 rounded-full bg-foreground relative z-10 mt-1 md:mt-2 md:mx-auto order-1 md:order-2 ring-4 ring-background absolute left-[23px] md:relative md:left-auto" />
                <div className="flex-1 order-3">
                  <p className="font-medium">Analyst</p>
                  <p className="text-sm text-muted-foreground">June 2022 - November 2022</p>
                </div>
              </div>
            </div>

            {/* Education */}
            <div className="relative mb-10 md:mb-16">
              <div className="flex flex-col md:flex-row items-start gap-4 md:gap-8">
                <div className="flex-1 order-2 md:order-1 md:text-right">
                  <h3 className="font-semibold mb-1 md:mb-2">University of Maryland,</h3>
                  <h3 className="font-semibold mb-1 md:mb-2">Smith School of Business</h3>
                  <p className="text-sm text-muted-foreground">College Park, MD</p>
                  <p className="text-sm text-muted-foreground">22 years old</p>
                </div>
                <div className="w-3 h-3 rounded-full bg-foreground relative z-10 mt-1 md:mt-2 md:mx-auto order-1 md:order-2 ring-4 ring-background absolute left-[23px] md:relative md:left-auto" />
                <div className="flex-1 order-3">
                  <p className="font-medium">Bachelor of Science: Finance</p>
                  <p className="font-medium">Minor: Technology Entrepreneurship</p>
                  <p className="text-sm text-muted-foreground">May 2022</p>
                </div>
              </div>
            </div>

            {/* Bowery Capital */}
            <div className="relative mb-10 md:mb-16">
              <div className="flex flex-col md:flex-row items-start gap-4 md:gap-8">
                <div className="flex-1 order-2 md:order-1 md:text-right">
                  <h3 className="font-semibold mb-1 md:mb-2">Bowery Capital</h3>
                  <p className="text-sm text-muted-foreground">New York City</p>
                  <p className="text-sm text-muted-foreground">21 years old</p>
                </div>
                <div className="w-3 h-3 rounded-full bg-foreground relative z-10 mt-1 md:mt-2 md:mx-auto order-1 md:order-2 ring-4 ring-background absolute left-[23px] md:relative md:left-auto" />
                <div className="flex-1 order-3">
                  <p className="font-medium">Summer Analyst</p>
                  <p className="text-sm text-muted-foreground">Jun 2021 - Sep 2021</p>
                </div>
              </div>
            </div>
            
            {/* SELF */}
            <div className="relative mb-10 md:mb-16">
              <div className="flex flex-col md:flex-row items-start gap-4 md:gap-8">
                <div className="flex-1 order-2 md:order-1 md:text-right">
                  <h3 className="font-semibold mb-1 md:mb-2">University of Maryland</h3>
                  <p className="text-sm text-muted-foreground">College Park, MD</p>
                  <p className="text-sm text-muted-foreground">17 years old</p>
                </div>
                <div className="w-3 h-3 rounded-full bg-foreground relative z-10 mt-1 md:mt-2 md:mx-auto order-1 md:order-2 ring-4 ring-background absolute left-[23px] md:relative md:left-auto" />
                <div className="flex-1 order-3">
                  <p className="font-medium">Snider Enterprise and Leadership Fellows</p>
                  <p className="text-sm text-muted-foreground">July 2017</p>
                </div>
              </div>
            </div>

            {/* Weston High School */}
            <div className="relative mb-10 md:mb-16">
              <div className="flex flex-col md:flex-row items-start gap-4 md:gap-8">
                <div className="flex-1 order-2 md:order-1 md:text-right">
                  <h3 className="font-semibold mb-1 md:mb-2">Weston High School</h3>
                  <p className="text-sm text-muted-foreground">Weston, CT</p>
                  <p className="text-sm text-muted-foreground">14-18 years old</p>
                </div>
                <div className="w-3 h-3 rounded-full bg-foreground relative z-10 mt-1 md:mt-2 md:mx-auto order-1 md:order-2 ring-4 ring-background absolute left-[23px] md:relative md:left-auto" />
                <div className="flex-1 order-3">
                  <p className="font-medium">High School</p>
                  <p className="text-sm text-muted-foreground">August 2014 - May 2018</p>
                </div>
              </div>
            </div>

            {/* Birth */}
            <div className="relative">
              <div className="flex flex-col md:flex-row items-start gap-4 md:gap-8">
                <div className="flex-1 order-2 md:order-1 md:text-right">
                  <h3 className="font-semibold mb-1 md:mb-2">Born</h3>
                  <p className="text-sm text-muted-foreground">Norwalk, CT</p>
                  <p className="text-sm text-muted-foreground">0 years old</p>
                </div>
                <div className="w-3 h-3 rounded-full bg-foreground relative z-10 mt-1 md:mt-2 md:mx-auto order-1 md:order-2 ring-4 ring-background absolute left-[23px] md:relative md:left-auto" />
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

