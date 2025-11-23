import Link from "next/link"
import { DarkModeToggle } from "@/components/dark-mode-toggle"

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#FDF8F3] dark:bg-[#1A1512] relative transition-colors">
      {/* Warm paper texture overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.015] z-50"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='4' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          mixBlendMode: 'multiply'
        }}
      />

      {/* Subtle warm gradient overlay */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-40 dark:opacity-20"
        style={{
          background: 'radial-gradient(circle at 20% 50%, rgba(235, 88, 45, 0.08) 0%, transparent 50%)'
        }}
      />

      {/* Timeline line that runs from top to the last bullet */}
      <div className="absolute left-[29px] md:left-1/2 top-0 bottom-[100px] w-px bg-[#E8DED3]/50 dark:bg-[#3A2F28]/50 transform md:-translate-x-1/2 z-0" />

      <header className="fixed top-0 left-0 right-0 z-40 bg-[#FDF8F3]/95 dark:bg-[#1A1512]/95 backdrop-blur-sm border-b border-[#E8DED3]/30 dark:border-[#3A2F28]/30">
        <div className="container px-6 md:px-16 py-4 mx-auto max-w-7xl">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-lg font-light text-[#2C2420] dark:text-[#F5EDE4] hover:text-[#EB582D] transition-colors" style={{ fontFamily: 'var(--font-display)' }}>
              robby weitzman
            </Link>
            <nav className="flex items-center gap-6">
              <Link href="/mood-room" className="text-sm text-[#6B5A50] dark:text-[#B8A89C] hover:text-[#EB582D] transition-colors">
                Mood Room
              </Link>
              <Link href="/photos" className="text-sm text-[#6B5A50] dark:text-[#B8A89C] hover:text-[#EB582D] transition-colors">
                Photos
              </Link>
              <Link href="/sotd" className="text-sm text-[#6B5A50] dark:text-[#B8A89C] hover:text-[#EB582D] transition-colors">
                SOTD
              </Link>
              <Link href="/about" className="text-sm text-[#6B5A50] dark:text-[#B8A89C] hover:text-[#EB582D] transition-colors">
                About
              </Link>
              <DarkModeToggle />
            </nav>
          </div>
        </div>
      </header>

      <div className="container px-6 md:px-16 pt-24 pb-20 md:pt-32 md:pb-32 mx-auto max-w-7xl">
        <div className="max-w-[900px] mx-auto">
          <div className="relative">
            {/* Anthropic */}
            <div className="relative mb-10 md:mb-16">
              <div className="flex flex-col md:flex-row items-start gap-4 md:gap-8">
                <div className="flex-1 order-2 md:order-1 md:text-right">
                  <h3 className="font-light text-[#2C2420] dark:text-[#F5EDE4] mb-1 md:mb-2" style={{ fontFamily: 'var(--font-display)' }}>Anthropic</h3>
                  <p className="text-sm text-[#8B7A6E] dark:text-[#9B8A7E]">New York City</p>
                  <p className="text-sm text-[#8B7A6E] dark:text-[#9B8A7E]">25 years old - present</p>
                </div>
                <div className="w-3 h-3 rounded-full bg-[#EB582D] relative z-10 mt-1 md:mt-2 md:mx-auto order-1 md:order-2 ring-4 ring-[#FDF8F3] dark:ring-[#1A1512] absolute left-[23px] md:relative md:left-auto" />
                <div className="flex-1 order-3">
                  <p className="text-[#2C2420] dark:text-[#F5EDE4]">GTM</p>
                  <p className="text-sm text-[#8B7A6E] dark:text-[#9B8A7E]">June 2025 - Present</p>
                </div>
              </div>
            </div>

            {/* Website */}
            <div className="relative mb-10 md:mb-16">
              <div className="flex flex-col md:flex-row items-start gap-4 md:gap-8">
                <div className="flex-1 order-2 md:order-1 md:text-right">
                  <h3 className="font-light text-[#2C2420] dark:text-[#F5EDE4] mb-1 md:mb-2" style={{ fontFamily: 'var(--font-display)' }}>Made this website</h3>
                  <p className="text-sm text-[#8B7A6E] dark:text-[#9B8A7E]">New York City</p>
                  <p className="text-sm text-[#8B7A6E] dark:text-[#9B8A7E]">25 years old</p>
                </div>
                <div className="w-3 h-3 rounded-full bg-[#EB582D] relative z-10 mt-1 md:mt-2 md:mx-auto order-1 md:order-2 ring-4 ring-[#FDF8F3] dark:ring-[#1A1512] absolute left-[23px] md:relative md:left-auto" />
                <div className="flex-1 order-3">
                  <p className="text-[#2C2420] dark:text-[#F5EDE4]">Using Vercel, Grok, and Github</p>
                  <p className="text-sm text-[#8B7A6E] dark:text-[#9B8A7E]">February 22, 2025</p>
                </div>
              </div>
            </div>

            {/* Merge */}
            <div className="relative mb-10 md:mb-16">
              <div className="flex flex-col md:flex-row items-start gap-4 md:gap-8">
                <div className="flex-1 order-2 md:order-1 md:text-right">
                  <h3 className="font-light text-[#2C2420] dark:text-[#F5EDE4] mb-1 md:mb-2" style={{ fontFamily: 'var(--font-display)' }}>Merge</h3>
                  <p className="text-sm text-[#8B7A6E] dark:text-[#9B8A7E]">New York City</p>
                  <p className="text-sm text-[#8B7A6E] dark:text-[#9B8A7E]">22 years old - present</p>
                </div>
                <div className="w-3 h-3 rounded-full bg-[#EB582D] relative z-10 mt-1 md:mt-2 md:mx-auto order-1 md:order-2 ring-4 ring-[#FDF8F3] dark:ring-[#1A1512] absolute left-[23px] md:relative md:left-auto" />
                <div className="flex-1 space-y-4 md:space-y-6 order-3">
                  <div>
                    <p className="text-[#2C2420] dark:text-[#F5EDE4]">Account Executive</p>
                    <p className="text-sm text-[#8B7A6E] dark:text-[#9B8A7E]">November 2023 - Present</p>
                  </div>
                  <div>
                    <p className="text-[#2C2420] dark:text-[#F5EDE4]">Sales Development Representative</p>
                    <p className="text-sm text-[#8B7A6E] dark:text-[#9B8A7E]">December 2022 - November 2023</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Supernode Ventures */}
            <div className="relative mb-10 md:mb-16">
              <div className="flex flex-col md:flex-row items-start gap-4 md:gap-8">
                <div className="flex-1 order-2 md:order-1 md:text-right">
                  <h3 className="font-light text-[#2C2420] dark:text-[#F5EDE4] mb-1 md:mb-2" style={{ fontFamily: 'var(--font-display)' }}>Supernode Ventures</h3>
                  <p className="text-sm text-[#8B7A6E] dark:text-[#9B8A7E]">New York City</p>
                  <p className="text-sm text-[#8B7A6E] dark:text-[#9B8A7E]">22 years old</p>
                </div>
                <div className="w-3 h-3 rounded-full bg-[#EB582D] relative z-10 mt-1 md:mt-2 md:mx-auto order-1 md:order-2 ring-4 ring-[#FDF8F3] dark:ring-[#1A1512] absolute left-[23px] md:relative md:left-auto" />
                <div className="flex-1 order-3">
                  <p className="text-[#2C2420] dark:text-[#F5EDE4]">Analyst</p>
                  <p className="text-sm text-[#8B7A6E] dark:text-[#9B8A7E]">June 2022 - November 2022</p>
                </div>
              </div>
            </div>

            {/* Education */}
            <div className="relative mb-10 md:mb-16">
              <div className="flex flex-col md:flex-row items-start gap-4 md:gap-8">
                <div className="flex-1 order-2 md:order-1 md:text-right">
                  <h3 className="font-light text-[#2C2420] dark:text-[#F5EDE4] mb-1 md:mb-2" style={{ fontFamily: 'var(--font-display)' }}>University of Maryland,</h3>
                  <h3 className="font-light text-[#2C2420] dark:text-[#F5EDE4] mb-1 md:mb-2" style={{ fontFamily: 'var(--font-display)' }}>Smith School of Business</h3>
                  <p className="text-sm text-[#8B7A6E] dark:text-[#9B8A7E]">College Park, MD</p>
                  <p className="text-sm text-[#8B7A6E] dark:text-[#9B8A7E]">22 years old</p>
                </div>
                <div className="w-3 h-3 rounded-full bg-[#EB582D] relative z-10 mt-1 md:mt-2 md:mx-auto order-1 md:order-2 ring-4 ring-[#FDF8F3] dark:ring-[#1A1512] absolute left-[23px] md:relative md:left-auto" />
                <div className="flex-1 order-3">
                  <p className="text-[#2C2420] dark:text-[#F5EDE4]">Bachelor of Science: Finance</p>
                  <p className="text-[#2C2420] dark:text-[#F5EDE4]">Minor: Technology Entrepreneurship</p>
                  <p className="text-sm text-[#8B7A6E] dark:text-[#9B8A7E]">May 2022</p>
                </div>
              </div>
            </div>

            {/* Bowery Capital */}
            <div className="relative mb-10 md:mb-16">
              <div className="flex flex-col md:flex-row items-start gap-4 md:gap-8">
                <div className="flex-1 order-2 md:order-1 md:text-right">
                  <h3 className="font-light text-[#2C2420] dark:text-[#F5EDE4] mb-1 md:mb-2" style={{ fontFamily: 'var(--font-display)' }}>Bowery Capital</h3>
                  <p className="text-sm text-[#8B7A6E] dark:text-[#9B8A7E]">New York City</p>
                  <p className="text-sm text-[#8B7A6E] dark:text-[#9B8A7E]">21 years old</p>
                </div>
                <div className="w-3 h-3 rounded-full bg-[#EB582D] relative z-10 mt-1 md:mt-2 md:mx-auto order-1 md:order-2 ring-4 ring-[#FDF8F3] dark:ring-[#1A1512] absolute left-[23px] md:relative md:left-auto" />
                <div className="flex-1 order-3">
                  <p className="text-[#2C2420] dark:text-[#F5EDE4]">Summer Analyst</p>
                  <p className="text-sm text-[#8B7A6E] dark:text-[#9B8A7E]">Jun 2021 - Sep 2021</p>
                </div>
              </div>
            </div>
            
            {/* SELF */}
            <div className="relative mb-10 md:mb-16">
              <div className="flex flex-col md:flex-row items-start gap-4 md:gap-8">
                <div className="flex-1 order-2 md:order-1 md:text-right">
                  <h3 className="font-light text-[#2C2420] dark:text-[#F5EDE4] mb-1 md:mb-2" style={{ fontFamily: 'var(--font-display)' }}>University of Maryland</h3>
                  <p className="text-sm text-[#8B7A6E] dark:text-[#9B8A7E]">College Park, MD</p>
                  <p className="text-sm text-[#8B7A6E] dark:text-[#9B8A7E]">17 years old</p>
                </div>
                <div className="w-3 h-3 rounded-full bg-[#EB582D] relative z-10 mt-1 md:mt-2 md:mx-auto order-1 md:order-2 ring-4 ring-[#FDF8F3] dark:ring-[#1A1512] absolute left-[23px] md:relative md:left-auto" />
                <div className="flex-1 order-3">
                  <p className="text-[#2C2420] dark:text-[#F5EDE4]">Snider Enterprise and Leadership Fellows</p>
                  <p className="text-sm text-[#8B7A6E] dark:text-[#9B8A7E]">July 2017</p>
                </div>
              </div>
            </div>

            {/* Weston High School */}
            <div className="relative mb-10 md:mb-16">
              <div className="flex flex-col md:flex-row items-start gap-4 md:gap-8">
                <div className="flex-1 order-2 md:order-1 md:text-right">
                  <h3 className="font-light text-[#2C2420] dark:text-[#F5EDE4] mb-1 md:mb-2" style={{ fontFamily: 'var(--font-display)' }}>Weston High School</h3>
                  <p className="text-sm text-[#8B7A6E] dark:text-[#9B8A7E]">Weston, CT</p>
                  <p className="text-sm text-[#8B7A6E] dark:text-[#9B8A7E]">14-18 years old</p>
                </div>
                <div className="w-3 h-3 rounded-full bg-[#EB582D] relative z-10 mt-1 md:mt-2 md:mx-auto order-1 md:order-2 ring-4 ring-[#FDF8F3] dark:ring-[#1A1512] absolute left-[23px] md:relative md:left-auto" />
                <div className="flex-1 order-3">
                  <p className="text-[#2C2420] dark:text-[#F5EDE4]">High School</p>
                  <p className="text-sm text-[#8B7A6E] dark:text-[#9B8A7E]">August 2014 - May 2018</p>
                </div>
              </div>
            </div>

            {/* Birth */}
            <div className="relative">
              <div className="flex flex-col md:flex-row items-start gap-4 md:gap-8">
                <div className="flex-1 order-2 md:order-1 md:text-right">
                  <h3 className="font-light text-[#2C2420] dark:text-[#F5EDE4] mb-1 md:mb-2" style={{ fontFamily: 'var(--font-display)' }}>Born</h3>
                  <p className="text-sm text-[#8B7A6E] dark:text-[#9B8A7E]">Norwalk, CT</p>
                  <p className="text-sm text-[#8B7A6E] dark:text-[#9B8A7E]">0 years old</p>
                </div>
                <div className="w-3 h-3 rounded-full bg-[#EB582D] relative z-10 mt-1 md:mt-2 md:mx-auto order-1 md:order-2 ring-4 ring-[#FDF8F3] dark:ring-[#1A1512] absolute left-[23px] md:relative md:left-auto" />
                <div className="flex-1 order-3">
                  <p className="text-sm text-[#8B7A6E] dark:text-[#9B8A7E]">December 6, 1999</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

