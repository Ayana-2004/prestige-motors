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
      headers: { 'Content-Type': 'application/json' },
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
        background: 'linear-gradient(145deg, #111 0%, #0a0a0a 100%)',
        border: '1px solid #2a2a2a',
        borderRadius: '24px',
        padding: '32px',
        position: 'sticky' as const,
        top: '20px',
      }}
    >
      <style>{`
        .ef-title {
          font-size: 26px;
          font-weight: 900;
          color: #d4af37;
          margin-bottom: 6px;
          letter-spacing: 1px;
        }
        .ef-subtitle {
          color: #555;
          font-size: 13px;
          margin-bottom: 24px;
          text-transform: uppercase;
          letter-spacing: 2px;
        }
        .ef-input {
          width: 100%;
          padding: 14px 16px;
          margin-bottom: 14px;
          border-radius: 12px;
          border: 1px solid #2a2a2a;
          background: #0d0d0d;
          color: #fff;
          font-size: 15px;
          outline: none;
          transition: border-color 0.2s ease;
          box-sizing: border-box;
        }
        .ef-input:focus { border-color: #d4af37; }
        .ef-input::placeholder { color: #444; }
        .ef-btn {
          width: 100%;
          padding: 16px;
          border-radius: 12px;
          border: none;
          background: linear-gradient(135deg, #d4af37 0%, #b8962e 100%);
          color: #000;
          font-weight: 900;
          cursor: pointer;
          font-size: 16px;
          letter-spacing: 1px;
          transition: transform 0.2s ease, opacity 0.2s ease;
          margin-top: 4px;
        }
        .ef-btn:hover { transform: scale(1.02); opacity: 0.95; }
        .ef-btn:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }
        .ef-success {
          margin-top: 16px;
          padding: 14px;
          border-radius: 12px;
          background: rgba(74,222,128,0.1);
          border: 1px solid rgba(74,222,128,0.3);
          color: #4ade80;
          font-weight: 700;
          text-align: center;
          font-size: 15px;
        }
        .ef-divider {
          height: 1px;
          background: #1a1a1a;
          margin: 20px 0;
        }
        .ef-contact-row {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 8px;
        }
        .ef-contact-label {
          color: #444;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 1px;
          min-width: 40px;
        }
        .ef-contact-value { color: #888; font-size: 13px; }
      `}</style>

      <p className="ef-title">Enquire Now</p>
      <p className="ef-subtitle">Get in touch with us</p>

      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Your Name" required className="ef-input" />
        <input name="phone" placeholder="Phone Number" required className="ef-input" />
        <input name="email" placeholder="Email Address" required className="ef-input" />
        <textarea
          name="message"
          placeholder="Your Message"
          rows={4}
          className="ef-input"
          style={{ resize: 'none' }}
        />
        <button type="submit" className="ef-btn" disabled={loading}>
          {loading ? 'Sending...' : 'Submit Enquiry'}
        </button>
      </form>

      {success && <div className="ef-success">Enquiry Sent Successfully ✅</div>}

      <div className="ef-divider" />

      <div className="ef-contact-row">
        <span className="ef-contact-label">Phone</span>
        <span className="ef-contact-value">+91 98765 43210</span>
      </div>
      <div className="ef-contact-row">
        <span className="ef-contact-label">Email</span>
        <span className="ef-contact-value">prestigemotors.notify@gmail.com</span>
      </div>
    </div>
  )
}
