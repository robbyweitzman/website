import { ImageResponse } from 'next/og'
import { quotes } from '../data/quotes'

export const alt = 'Quote of the day from robbyweitzman.com'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  // Most recent custom quote = last `type === 'custom'` in the source array.
  // (The /quotes page reverses the list for display, so this matches what
  // appears at the top of the page.)
  const latest = [...quotes].reverse().find((q) => q.type === 'custom')

  const text = latest?.text ?? ''
  const author = latest?.author ?? ''

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#FFFAF1',
          padding: '90px 100px',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-start',
          }}
        >
          <div
            style={{
              fontSize: 72,
              lineHeight: 1.2,
              color: '#0a0a0a',
              fontWeight: 600,
              letterSpacing: '-0.02em',
              display: 'flex',
            }}
          >
            “{text}”
          </div>
          {author ? (
            <div
              style={{
                marginTop: 40,
                fontSize: 36,
                color: '#737373',
                display: 'flex',
              }}
            >
              — {author}
            </div>
          ) : null}
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: 24,
            color: '#737373',
          }}
        >
          <div style={{ display: 'flex' }}>robbyweitzman.com/quotes</div>
          <div style={{ display: 'flex' }}>quote of the day</div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
