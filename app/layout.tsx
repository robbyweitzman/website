import type React from "react"
import "./globals.css"
import Script from "next/script"

export const metadata = {
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {children}
        <Script
          src="https://va.vercel-scripts.com/v1/speed-insights/script.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  )
}
