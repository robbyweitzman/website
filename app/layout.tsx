import type React from "react"
import "./globals.css"
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { ThemeProvider } from '@/components/theme-provider'

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  userScalable: true,
}

export const metadata = {
  metadataBase: new URL('https://robbyweitzman.com'),
  generator: 'v0.dev',
  title: {
    default: 'robby',
    template: 'robby | %s',
  },
  icons: {
    icon: [
      { url: '/wave.svg', type: 'image/svg+xml' },
      { url: '/icon-512.png', type: 'image/png', sizes: '512x512' },
    ],
    shortcut: '/wave.svg',
    apple: { url: '/apple-touch-icon.png', sizes: '180x180' },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
