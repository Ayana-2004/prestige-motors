'use client'
import { useState } from 'react'

export default function ImageZoom({ src, alt }: { src: string; alt: string }) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <img
        src={src}
        alt={alt}
        className="cd-car-img"
        onClick={() => setOpen(true)}
        style={{ cursor: 'zoom-in' }}
      />
      {open && (
        <div
          onClick={() => setOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.95)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'zoom-out',
            padding: '20px',
          }}
        >
          <img
            src={src}
            alt={alt}
            style={{
              maxWidth: '90vw',
              maxHeight: '90vh',
              objectFit: 'contain',
              borderRadius: '16px',
              boxShadow: '0 40px 80px rgba(0,0,0,0.8)',
            }}
          />
          <button
            onClick={() => setOpen(false)}
            style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              background: '#d4af37',
              border: 'none',
              color: '#000',
              fontWeight: '900',
              fontSize: '20px',
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              cursor: 'pointer',
            }}
          >
            ✕
          </button>
        </div>
      )}
    </>
  )
}

