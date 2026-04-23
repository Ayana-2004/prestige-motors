'use client'

import { useState } from 'react'

export default function EnquiryForm({ carId }: { carId: string }) {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setLoading(true)
    setSuccess(false)

    const form = e.target

    const data = {
      name: form.name.value,
      phone: form.phone.value,
      email: form.email.value,
      message: form.message.value,
      car: carId,
    }

    const res = await fetch('/api/enquiry', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    const result = await res.json()

    if (result.success) {
      form.reset()
      setSuccess(true)
    }

    setLoading(false)
  }

  return (
    <div
      style={{
        background: '#111',
        border: '1px solid #333',
        borderRadius: '24px',
        padding: '28px',
      }}
    >
      <h2
        style={{
          fontSize: '32px',
          marginBottom: '20px',
          color: '#d4af37',
        }}
      >
        Enquire Now
      </h2>

      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Your Name" required style={input} />
        <input name="phone" placeholder="Phone Number" required style={input} />
        <input name="email" placeholder="Email Address" required style={input} />
        <textarea name="message" placeholder="Your Message" rows={4} style={input} />

        <button type="submit" style={button}>
          {loading ? 'Sending...' : 'Submit Enquiry'}
        </button>
      </form>

      {success && (
        <p
          style={{
            color: '#4ade80',
            marginTop: '18px',
            fontWeight: '700',
          }}
        >
          Enquiry Sent Successfully ✅
        </p>
      )}
    </div>
  )
}

const input = {
  width: '100%',
  padding: '14px',
  marginBottom: '14px',
  borderRadius: '12px',
  border: '1px solid #333',
  background: '#0a0a0a',
  color: '#fff',
  fontSize: '16px',
}

const button = {
  width: '100%',
  padding: '14px',
  borderRadius: '12px',
  border: 'none',
  background: '#d4af37',
  color: '#000',
  fontWeight: '900',
  cursor: 'pointer',
  fontSize: '16px',
}
