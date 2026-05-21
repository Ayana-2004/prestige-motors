import config from '@payload-config'
import { getPayload } from 'payload'
import Link from 'next/link'

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
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <style>{`
        .pm-wrapper { padding: 28px; }

        .pm-topbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 45px;
          flex-wrap: wrap;
          gap: 10px;
        }
        .pm-topbar h2 {
          margin: 0;
          font-size: 30px;
          letter-spacing: 4px;
          font-weight: 900;
        }
        .pm-tagline { color: #d4af37; font-size: 15px; }

        .pm-hero {
          position: relative;
          height: 520px;
          border-radius: 30px;
          overflow: hidden;
          margin-bottom: 50px;
          background-image: url('https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1600&q=80');
          background-size: cover;
          background-position: center;
        }
        .pm-hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to right, rgba(0,0,0,0.85), rgba(0,0,0,0.45));
        }
        .pm-hero-content {
          position: relative;
          z-index: 2;
          padding: 70px;
          max-width: 700px;
        }
        .pm-hero-label {
          color: #d4af37;
          font-weight: 700;
          letter-spacing: 3px;
          margin-bottom: 18px;
        }
        .pm-hero-title {
          font-size: 78px;
          line-height: 1.1;
          margin-bottom: 20px;
          font-weight: 900;
        }
        .pm-hero-desc {
          color: #ccc;
          font-size: 20px;
          line-height: 1.8;
          margin-bottom: 30px;
        }

        .pm-search-form {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 10px;
        }
        .pm-search-input {
          width: 300px;
          padding: 16px;
          border-radius: 14px;
          border: 1px solid #333;
          background: rgba(255,255,255,0.08);
          color: #fff;
          font-size: 17px;
          outline: none;
          backdrop-filter: blur(8px);
        }
        .pm-search-btn {
          padding: 16px 24px;
          border-radius: 14px;
          border: none;
          background: #d4af37;
          color: #000;
          font-weight: 900;
          cursor: pointer;
          font-size: 16px;
        }
        .pm-clear-btn {
          padding: 16px 24px;
          border-radius: 14px;
          border: 1px solid #d4af37;
          background: transparent;
          color: #d4af37;
          font-weight: 900;
          text-decoration: none;
          font-size: 16px;
        }

        .pm-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
          gap: 32px;
        }
        .pm-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 26px;
          overflow: hidden;
          backdrop-filter: blur(10px);
          box-shadow: 0 20px 50px rgba(0,0,0,0.45);
        }
        .pm-card-body { padding: 24px; }
        .pm-card-title {
          font-size: 28px;
          margin-bottom: 8px;
          font-weight: 800;
        }
        .pm-card-price {
          color: #d4af37;
          font-size: 24px;
          font-weight: 900;
          margin-bottom: 16px;
        }
        .pm-card-specs {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
          margin-bottom: 18px;
        }
        .pm-spec-box {
          background: #111;
          padding: 10px 12px;
          border-radius: 10px;
          text-align: center;
          color: #aaa;
          font-size: 14px;
          letter-spacing: 0.5px;
        }
        .pm-view-btn {
          display: block;
          background: #d4af37;
          color: #000;
          text-align: center;
          padding: 14px;
          border-radius: 14px;
          font-weight: 900;
          text-decoration: none;
          margin-bottom: 16px;
          font-size: 16px;
          letter-spacing: 1px;
        }

        .pm-contact {
          border-top: 1px solid #222;
          padding-top: 16px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .pm-contact-row {
          display: flex;
          align-items: center;
          gap: 10px;
          color: #aaa;
          font-size: 14px;
        }
        .pm-contact-label {
          color: #555;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 1px;
          min-width: 40px;
        }
        .pm-contact-value {
          color: #ccc;
          font-size: 14px;
        }

        @media (max-width: 768px) {
          .pm-wrapper { padding: 16px; }
          .pm-topbar h2 { font-size: 20px; letter-spacing: 2px; }
          .pm-tagline { font-size: 12px; }
          .pm-hero { height: auto; min-height: 400px; border-radius: 20px; }
          .pm-hero-content { padding: 30px 20px; }
          .pm-hero-title { font-size: 40px; }
          .pm-hero-desc { font-size: 15px; margin-bottom: 20px; }
          .pm-search-input { width: 100%; }
          .pm-search-form { flex-direction: column; align-items: stretch; }
          .pm-search-btn { width: 100%; text-align: center; }
          .pm-clear-btn { width: 100%; text-align: center; }
          .pm-grid { grid-template-columns: 1fr; gap: 20px; }
          .pm-card-title { font-size: 22px; }
          .pm-card-price { font-size: 20px; }
        }
      `}</style>

      <div className="pm-wrapper">
        {/* TOP BAR */}
        <div className="pm-topbar">
          <h2>PRESTIGE MOTORS</h2>
          <div className="pm-tagline">Luxury • Speed • Class</div>
        </div>

        {/* HERO */}
        <div className="pm-hero">
          <div className="pm-hero-overlay" />
          <div className="pm-hero-content">
            <p className="pm-hero-label">ELITE LUXURY COLLECTION</p>
            <h1 className="pm-hero-title">PREMIUM CARS</h1>
            <p className="pm-hero-desc">Discover world-class performance, elegance and prestige.</p>
            <form method="GET" className="pm-search-form">
              <input
                name="search"
                defaultValue={search}
                placeholder="Search luxury cars..."
                className="pm-search-input"
              />
              <button type="submit" className="pm-search-btn">
                Search
              </button>
              {search && (
                <a href="/" className="pm-clear-btn">
                  Clear
                </a>
              )}
            </form>
          </div>
        </div>

        {/* CAR GRID */}
        <div className="pm-grid">
          {cars.map((car: any) => (
            <div key={car.id} className="pm-card">
              {typeof car.featuredImage !== 'string' && car.featuredImage?.url ? (
                <img
                  src={car.featuredImage.url}
                  alt={car.title}
                  style={{ width: '100%', height: '220px', objectFit: 'cover' }}
                />
              ) : null}
              <div className="pm-card-body">
                <h2 className="pm-card-title">{car.title}</h2>
                <p className="pm-card-price">₹ {car.price}</p>

                <div className="pm-card-specs">
                  <div className="pm-spec-box">Year &nbsp; {car.year}</div>
                  <div className="pm-spec-box">{car.country}</div>
                </div>

                <Link href={`/cars/${car.slug}`} className="pm-view-btn">
                  View Details
                </Link>

                {/* PROFESSIONAL CONTACT */}
                <div className="pm-contact">
                  <div className="pm-contact-row">
                    <span className="pm-contact-label">Phone</span>
                    <span className="pm-contact-value">+91 98765 43210</span>
                  </div>
                  <div className="pm-contact-row">
                    <span className="pm-contact-label">+91 7306228801</span>
                    <span className="pm-contact-value">prestigemotors.notify@gmail.com</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
