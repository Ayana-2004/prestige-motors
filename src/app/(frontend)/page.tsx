import config from '@payload-config'
import { getPayload } from 'payload'
import Link from 'next/link'

const miniCard = {
  background: '#151515',
  padding: '12px',
  borderRadius: '12px',
  textAlign: 'center' as const,
  border: '1px solid #2a2a2a',
  color: '#ccc',
}

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string }>
}) {
  const { search = '' } = await searchParams

  const payload = await getPayload({ config })

  const carsData = await payload.find({
    collection: 'cars',
    depth: 1,
    limit: 100,
  })

  const cars = carsData.docs.filter((car: any) =>
    car.title?.toLowerCase().includes(search.toLowerCase()),
  )

  return (
    <main
      style={{
        background: 'linear-gradient(180deg,#030303 0%,#080808 55%,#000 100%)',
        minHeight: '100vh',
        color: '#fff',
        padding: '28px',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      {/* TOP BAR */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '45px',
        }}
      >
        <h2
          style={{
            margin: 0,
            fontSize: '30px',
            letterSpacing: '4px',
            fontWeight: '900',
          }}
        >
          PRESTIGE MOTORS
        </h2>

        <div style={{ color: '#d4af37', fontSize: '15px' }}>Luxury • Speed • Class</div>
      </div>

      {/* HERO */}
      {/* HERO SECTION */}
      <div
        style={{
          position: 'relative',
          height: '520px',
          borderRadius: '30px',
          overflow: 'hidden',
          marginBottom: '50px',
          backgroundImage:
            "url('https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1600&q=80')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Dark Overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to right, rgba(0,0,0,0.85), rgba(0,0,0,0.45))',
          }}
        />

        {/* Content */}
        <div
          style={{
            position: 'relative',
            zIndex: 2,
            padding: '70px',
            maxWidth: '700px',
          }}
        >
          <p
            style={{
              color: '#d4af37',
              fontWeight: '700',
              letterSpacing: '3px',
              marginBottom: '18px',
            }}
          >
            ELITE LUXURY COLLECTION
          </p>

          <h1
            style={{
              fontSize: '78px',
              lineHeight: '1.1',
              marginBottom: '20px',
              fontWeight: '900',
            }}
          >
            PREMIUM CARS
          </h1>

          <p
            style={{
              color: '#ccc',
              fontSize: '20px',
              lineHeight: '1.8',
              marginBottom: '30px',
            }}
          >
            Discover world-class performance, elegance and prestige.
          </p>

          <form method="GET">
            <input
              name="search"
              defaultValue={search}
              placeholder="Search luxury cars..."
              style={{
                width: '360px',
                padding: '16px',
                borderRadius: '14px',
                border: '1px solid #333',
                background: 'rgba(255,255,255,0.08)',
                color: '#fff',
                fontSize: '17px',
                outline: 'none',
                backdropFilter: 'blur(8px)',
              }}
            />

            <button
              type="submit"
              style={{
                marginLeft: '10px',
                padding: '16px 24px',
                borderRadius: '14px',
                border: 'none',
                background: '#d4af37',
                color: '#000',
                fontWeight: '900',
                cursor: 'pointer',
              }}
            >
              Search
            </button>
            {search && (
              <a
                href="/"
                style={{
                  marginLeft: '10px',
                  padding: '16px 24px',
                  borderRadius: '14px',
                  border: '1px solid #d4af37',
                  background: 'transparent',
                  color: '#d4af37',
                  fontWeight: '900',
                  textDecoration: 'none',
                }}
              >
                Clear
              </a>
            )}
          </form>
        </div>
      </div>

      {/* CAR GRID */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit,minmax(340px,1fr))',
          gap: '32px',
        }}
      >
        {cars.map((car: any) => (
          <div
            key={car.id}
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '26px',
              overflow: 'hidden',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 20px 50px rgba(0,0,0,0.45)',
              transition: '0.3s',
            }}
          >
            {typeof car.featuredImage !== 'string' && car.featuredImage?.url ? (
              <img
                src={car.featuredImage.url}
                alt={car.title}
                style={{
                  width: '100%',
                  height: '250px',
                  objectFit: 'cover',
                }}
              />
            ) : null}

            <div style={{ padding: '24px' }}>
              <h2
                style={{
                  fontSize: '34px',
                  marginBottom: '14px',
                  fontWeight: '800',
                }}
              >
                {car.title}
              </h2>

              <p
                style={{
                  color: '#d4af37',
                  fontSize: '28px',
                  fontWeight: '900',
                  marginBottom: '20px',
                }}
              >
                ₹ {car.price}
              </p>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '10px',
                  marginBottom: '18px',
                }}
              >
                <div
                  style={{
                    background: '#111',
                    padding: '12px',
                    borderRadius: '14px',
                    textAlign: 'center',
                    color: '#ccc',
                  }}
                >
                  📅 {car.year}
                </div>

                <div
                  style={{
                    background: '#111',
                    padding: '12px',
                    borderRadius: '14px',
                    textAlign: 'center',
                    color: '#ccc',
                  }}
                >
                  🌍 {car.country}
                </div>
              </div>

              <Link
                href={`/cars/${car.slug}`}
                style={{
                  display: 'block',
                  background: '#d4af37',
                  color: '#000',
                  textAlign: 'center',
                  padding: '14px',
                  borderRadius: '14px',
                  fontWeight: '900',
                  textDecoration: 'none',
                  marginBottom: '15px',
                }}
              >
                View Details
              </Link>

              <div
                style={{
                  background: '#111',
                  padding: '14px',
                  borderRadius: '14px',
                  color: '#ccc',
                  lineHeight: '1.8',
                  fontSize: '16px',
                }}
              >
                📞 +91 98765 43210 <br />
                📧 premium@email.com
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}
