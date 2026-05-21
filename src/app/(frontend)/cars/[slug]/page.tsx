import config from '@payload-config'
import { getPayload } from 'payload'
import Link from 'next/link'
import EnquiryForm from './EnquiryForm'
import ReadMore from './ReadMore'

export default async function CarDetails({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const payload = await getPayload({ config })
  const carsData = await payload.find({ collection: 'cars', depth: 1, limit: 100 })
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

  const description =
    (car as any).description ||
    `${car.title} is crafted for drivers who demand elite luxury, cutting-edge technology, road presence and world-class performance. Every line reflects prestige and power.`

  return (
    <main
      style={{
        background: 'linear-gradient(180deg,#030303 0%,#090909 55%,#000 100%)',
        minHeight: '100vh',
        color: '#fff',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-40px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(40px); }
          to { opacity: 1; transform: translateX(0); }
        }

        .cd-wrapper { padding: 40px; }

        .cd-back {
          color: #d4af37;
          text-decoration: none;
          font-size: 16px;
          font-weight: 700;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          transition: gap 0.2s ease;
          animation: fadeInUp 0.5s ease forwards;
        }
        .cd-back:hover { gap: 12px; }

        .cd-hero {
          margin-top: 30px;
          display: grid;
          grid-template-columns: 1.1fr 1fr;
          gap: 35px;
          align-items: center;
          margin-bottom: 50px;
        }
        .cd-hero-left {
          animation: slideInLeft 0.7s ease 0.2s both;
        }
        .cd-hero-right {
          animation: slideInRight 0.7s ease 0.2s both;
        }

        .cd-label {
          color: #d4af37;
          letter-spacing: 3px;
          font-weight: 700;
          margin-bottom: 12px;
          font-size: 13px;
        }
        .cd-title {
          font-size: 68px;
          line-height: 1.1;
          font-weight: 900;
          margin-bottom: 18px;
        }
        .cd-subtitle {
          color: #bbb;
          font-size: 18px;
          line-height: 1.8;
          margin-bottom: 30px;
        }

        .cd-top-specs {
          display: flex;
          gap: 14px;
          flex-wrap: wrap;
        }
        .cd-top-spec {
          background: rgba(255,255,255,0.05);
          border: 1px solid #2a2a2a;
          padding: 14px 20px;
          border-radius: 14px;
          font-size: 16px;
          color: #fff;
          transition: border-color 0.2s ease;
        }
        .cd-top-spec:hover { border-color: #d4af37; }
        .cd-top-spec span { color: #d4af37; font-weight: 700; }

        .cd-car-img {
          width: 100%;
          height: 480px;
          object-fit: cover;
          border-radius: 24px;
          box-shadow: 0 30px 60px rgba(0,0,0,0.5);
          transition: transform 0.4s ease;
        }
        .cd-car-img:hover { transform: scale(1.02); }

        .cd-specs-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 16px;
          margin-bottom: 35px;
          animation: fadeInUp 0.7s ease 0.4s both;
        }
        .cd-spec-box {
          background: rgba(255,255,255,0.03);
          border: 1px solid #222;
          padding: 18px 20px;
          border-radius: 16px;
          transition: border-color 0.2s ease, transform 0.2s ease;
        }
        .cd-spec-box:hover {
          border-color: #d4af37;
          transform: translateY(-3px);
        }
        .cd-spec-label {
          color: #555;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          margin-bottom: 6px;
        }
        .cd-spec-value {
          color: #fff;
          font-size: 17px;
          font-weight: 700;
        }

        .cd-bottom {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 28px;
          align-items: start;
          animation: fadeInUp 0.7s ease 0.6s both;
        }
        .cd-about {
          background: #111;
          border: 1px solid #222;
          border-radius: 24px;
          padding: 30px;
        }
        .cd-about h2 {
          font-size: 28px;
          margin-bottom: 18px;
          font-weight: 800;
        }

        .cd-extra-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          margin-top: 24px;
        }
        .cd-extra-box {
          background: #1a1a1a;
          border: 1px solid #2a2a2a;
          padding: 14px 16px;
          border-radius: 12px;
        }
        .cd-extra-label {
          color: #555;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 4px;
        }
        .cd-extra-value { color: #ccc; font-size: 15px; font-weight: 600; }

        @media (max-width: 768px) {
          .cd-wrapper { padding: 20px; }
          .cd-hero { grid-template-columns: 1fr; gap: 24px; }
          .cd-title { font-size: 40px; }
          .cd-subtitle { font-size: 15px; }
          .cd-car-img { height: 280px; }
          .cd-bottom { grid-template-columns: 1fr; }
          .cd-specs-grid { grid-template-columns: 1fr 1fr; }
          .cd-extra-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="cd-wrapper">
        {/* BACK */}
        <Link href="/" className="cd-back">
          ← Back Home
        </Link>

        {/* HERO */}
        <div className="cd-hero">
          <div className="cd-hero-left">
            <p className="cd-label">LUXURY PERFORMANCE SERIES</p>
            <h1 className="cd-title">{car.title}</h1>
            <p className="cd-subtitle">
              Crafted for prestige, engineered for speed, designed for those who demand excellence.
            </p>
            <div className="cd-top-specs">
              <div className="cd-top-spec">
                Price &nbsp;<span>₹ {car.price}</span>
              </div>
              <div className="cd-top-spec">
                Top Speed &nbsp;<span>{(car as any).topSpeed || 'N/A'}</span>
              </div>
              <div className="cd-top-spec">
                Power &nbsp;<span>{(car as any).horsepower || 'N/A'}</span>
              </div>
            </div>
          </div>

          <div className="cd-hero-right">
            {typeof car.featuredImage !== 'string' && car.featuredImage?.url ? (
              <img src={car.featuredImage.url} alt={car.title} className="cd-car-img" />
            ) : null}
          </div>
        </div>

        {/* SPECIFICATIONS */}
        <div className="cd-specs-grid">
          <div className="cd-spec-box">
            <div className="cd-spec-label">Year</div>
            <div className="cd-spec-value">{car.year}</div>
          </div>
          <div className="cd-spec-box">
            <div className="cd-spec-label">Country</div>
            <div className="cd-spec-value">{(car as any).country || 'N/A'}</div>
          </div>
          <div className="cd-spec-box">
            <div className="cd-spec-label">Top Speed</div>
            <div className="cd-spec-value">{(car as any).topSpeed || 'N/A'}</div>
          </div>
          <div className="cd-spec-box">
            <div className="cd-spec-label">Horsepower</div>
            <div className="cd-spec-value">{(car as any).horsepower || 'N/A'}</div>
          </div>
          <div className="cd-spec-box">
            <div className="cd-spec-label">Fuel Type</div>
            <div className="cd-spec-value">{(car as any).fuel || 'Petrol / EV'}</div>
          </div>
          <div className="cd-spec-box">
            <div className="cd-spec-label">Class</div>
            <div className="cd-spec-value">Premium</div>
          </div>
        </div>

        {/* ABOUT + ENQUIRY */}
        <div className="cd-bottom">
          <div className="cd-about">
            <h2>About This Vehicle</h2>
            <ReadMore text={description} />

            {/* EXTRA DETAILS */}
            {((car as any).engine ||
              (car as any).transmission ||
              (car as any).color ||
              (car as any).mileage) && (
              <div className="cd-extra-grid">
                {(car as any).engine && (
                  <div className="cd-extra-box">
                    <div className="cd-extra-label">Engine</div>
                    <div className="cd-extra-value">{(car as any).engine}</div>
                  </div>
                )}
                {(car as any).transmission && (
                  <div className="cd-extra-box">
                    <div className="cd-extra-label">Transmission</div>
                    <div className="cd-extra-value">{(car as any).transmission}</div>
                  </div>
                )}
                {(car as any).color && (
                  <div className="cd-extra-box">
                    <div className="cd-extra-label">Color</div>
                    <div className="cd-extra-value">{(car as any).color}</div>
                  </div>
                )}
                {(car as any).mileage && (
                  <div className="cd-extra-box">
                    <div className="cd-extra-label">Mileage</div>
                    <div className="cd-extra-value">{(car as any).mileage}</div>
                  </div>
                )}
              </div>
            )}
          </div>

          <EnquiryForm carId={car.id} />
        </div>
      </div>
    </main>
  )
}
