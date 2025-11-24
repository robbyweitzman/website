"use client"

import Image from "next/image"

interface ImageQuoteProps {
  imageSrc: string
  imageAlt: string
}

export function ImageQuote({ imageSrc, imageAlt }: ImageQuoteProps) {
  return (
    <div className="relative w-full mx-auto" style={{ maxWidth: '400px' }}>
      <div className="relative">
        <Image
          src={imageSrc}
          alt={imageAlt}
          width={500}
          height={375}
          className="w-full h-auto object-contain"
          unoptimized
        />
      </div>
    </div>
  )
}
