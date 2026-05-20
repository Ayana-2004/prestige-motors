import config from '@payload-config'
import { getPayload } from 'payload'
import Link from 'next/link'
import EnquiryForm from './EnquiryForm'

const specBox = {
  background: 'rgba(255,255,255,0.03)',
  border: '1px solid #222',
  padding: '20px',
  borderRadius: '18px',
  fontSize: '18px',
}

export default async function CarDetails({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  const payload = await getPayload({ config })

  const carsData = await payload.find({
    collection: 'cars',
    depth: 1,
    limit: 100,
  })

  const car = carsData.docs.find((item: any) => item.slug === slug)

  if (!car) {
    return (
      <main style={{ background: '#000', color: '#fff', minHeight: '100vh', padding: '40px' }}>
        <h1>Car Not Found</h1>
        <Link href="/" style={{ color: '#fff' }}>
          Back Home
        </Link>
      </main>
    )
  }

  return (
    <main
      style={{
        background: 'linear-gradient(180deg,#030303 0%,#090909 55%,#000 100%)',
        minHeight: '100vh',
        color: '#fff',
        padding: '40px',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      {/* BACK */}
      <Link
        href="/"
        style={{ color: '#d4af37', textDecoration: 'none', fontSize: '18px', fontWeight: '700' }}
      >
        ← Back Home
      </Link>

      {/* HERO */}
      <div
        style={{
          marginTop: '30px',
          display: 'grid',
          gridTemplateColumns: '1.1fr 1fr',
          gap: '35px',
          alignItems: 'center',
          marginBottom: '50px',
        }}
      >
        <div>
          <p
            style={{
              color: '#d4af37',
              letterSpacing: '3px',
              fontWeight: '700',
              marginBottom: '12px',
            }}
          >
            LUXURY PERFORMANCE SERIES
          </p>
          <h1
            style={{ fontSize: '72px', lineHeight: '1.1', fontWeight: '900', marginBottom: '18px' }}
          >
            {car.title}
          </h1>
          <p style={{ color: '#bbb', fontSize: '20px', lineHeight: '1.8', marginBottom: '30px' }}>
            Crafted for prestige, engineered for speed, designed for those who demand excellence.
          </p>
          <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
            <div style={specBox}>💰 ₹ {car.price}</div>
            <div style={specBox}>⚡ {(car as any).topSpeed || '320 km/h'}</div>
            <div style={specBox}>🔥 {(car as any).horsepower || '1020 hp'}</div>
          </div>
        </div>

        <div>
          {typeof car.featuredImage !== 'string' && car.featuredImage?.url ? (
            <img
              src={car.featuredImage.url}
              alt={car.title}
              style={{
                width: '100%',
                height: '520px',
                objectFit: 'cover',
                borderRadius: '28px',
                boxShadow: '0 30px 60px rgba(0,0,0,0.5)',
              }}
            />
          ) : null}
        </div>
      </div>

      {/* SPECIFICATIONS */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))',
          gap: '18px',
          marginBottom: '35px',
        }}
      >
        <div style={specBox}>📅 Year: {car.year}</div>
        <div style={specBox}>🌍 Country: {(car as any).country}</div>
        <div style={specBox}>⚡ Top Speed: {(car as any).topSpeed || 'N/A'}</div>
        <div style={specBox}>🔥 Horsepower: {(car as any).horsepower || 'N/A'}</div>
        <div style={specBox}>⛽ Fuel: {(car as any).fuel || 'Petrol / EV'}</div>
        <div style={specBox}>🏁 Premium Class</div>
      </div>

      {/* ABOUT + ENQUIRY */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr',
          gap: '28px',
          alignItems: 'start',
        }}
      >
        <div
          style={{
            background: '#111',
            border: '1px solid #222',
            borderRadius: '24px',
            padding: '30px',
          }}
        >
          <h2 style={{ fontSize: '34px', marginBottom: '18px' }}>About This Vehicle</h2>
          <p style={{ color: '#bbb', lineHeight: '1.9', fontSize: '18px' }}>
            {(car as any).description ||
              `${car.title} is crafted for drivers who demand elite luxury, cutting-edge technology, road presence and world-class performance. Every line reflects prestige and power.`}
          </p>

          {/* EXTRA DETAILS */}
          <div
            style={{
              marginTop: '24px',
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '12px',
            }}
          >
            {(car as any).engine && (
              <div
                style={{
                  background: '#1a1a1a',
                  padding: '14px',
                  borderRadius: '12px',
                  color: '#ccc',
                }}
              >
                🔧 Engine: {(car as any).engine}
              </div>
            )}
            {(car as any).transmission && (
              <div
                style={{
                  background: '#1a1a1a',
                  padding: '14px',
                  borderRadius: '12px',
                  color: '#ccc',
                }}
              >
                ⚙️ Transmission: {(car as any).transmission}
              </div>
            )}
            {(car as any).color && (
              <div
                style={{
                  background: '#1a1a1a',
                  padding: '14px',
                  borderRadius: '12px',
                  color: '#ccc',
                }}
              >
                🎨 Color: {(car as any).color}
              </div>
            )}
            {(car as any).mileage && (
              <div
                style={{
                  background: '#1a1a1a',
                  padding: '14px',
                  borderRadius: '12px',
                  color: '#ccc',
                }}
              >
                📍 Mileage: {(car as any).mileage}
              </div>
            )}
          </div>
        </div>

        <EnquiryForm carId={car.id} />
      </div>
    </main>
  )
}
