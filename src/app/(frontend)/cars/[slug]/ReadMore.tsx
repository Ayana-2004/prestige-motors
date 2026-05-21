'use client'
import { useState } from 'react'

export default function ReadMore({ text }: { text: string }) {
  const [expanded, setExpanded] = useState(false)
  const limit = 300
  const isLong = text.length > limit

  return (
    <div>
      <p style={{ color: '#bbb', lineHeight: '1.9', fontSize: '17px', margin: 0 }}>
        {expanded ? text : text.slice(0, limit) + (isLong ? '...' : '')}
      </p>
      {isLong && (
        <button
          onClick={() => setExpanded(!expanded)}
          style={{
            marginTop: '14px',
            background: 'transparent',
            border: '1px solid #d4af37',
            color: '#d4af37',
            padding: '10px 24px',
            borderRadius: '10px',
            cursor: 'pointer',
            fontSize: '15px',
            fontWeight: '700',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => {
            ;(e.target as HTMLButtonElement).style.background = '#d4af37'
            ;(e.target as HTMLButtonElement).style.color = '#000'
          }}
          onMouseLeave={(e) => {
            ;(e.target as HTMLButtonElement).style.background = 'transparent'
            ;(e.target as HTMLButtonElement).style.color = '#d4af37'
          }}
        >
          {expanded ? 'Read Less ↑' : 'Read More ↓'}
        </button>
      )}
    </div>
  )
}
