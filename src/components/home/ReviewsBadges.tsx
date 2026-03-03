'use client';

const platforms = [
  {
    name: 'Google',
    rating: 5.0,
    count: 51,
    href: 'https://www.google.com/maps/place/Trade+Wheels/@-29.7586019,30.7947894,17z/data=!4m18!1m9!3m8!1s0x1ef6fb95e7ea3477:0x3ddddb1177501142!2sTrade+Wheels!8m2!3d-29.7586019!4d30.7947894!9m1!1b1!16s%2Fg%2F11ldvq6qhw!3m7!1s0x1ef6fb95e7ea3477:0x3ddddb1177501142!8m2!3d-29.7586019!4d30.7947894!9m1!1b1!16s%2Fg%2F11ldvq6qhw?entry=ttu',
    logo: (
      <svg viewBox="0 0 24 24" className="w-7 h-7" aria-hidden="true">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
      </svg>
    ),
  },
  {
    name: 'AutoTrader',
    rating: 4.7,
    count: 56,
    href: 'https://www.autotrader.co.za/dealer/trade-wheels/114612',
    logo: (
      <svg viewBox="0 0 24 24" className="w-7 h-7" aria-hidden="true">
        <circle cx="12" cy="12" r="12" fill="#E31837"/>
        <text x="12" y="16" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold" fontFamily="Arial, sans-serif">AT</text>
      </svg>
    ),
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => {
        const fill = Math.min(1, Math.max(0, rating - star + 1));
        return (
          <svg key={star} className="w-5 h-5" viewBox="0 0 20 20">
            <defs>
              <linearGradient id={`star-fill-${rating}-${star}`}>
                <stop offset={`${fill * 100}%`} stopColor="#FBBF24" />
                <stop offset={`${fill * 100}%`} stopColor="#D1D5DB" />
              </linearGradient>
            </defs>
            <path
              d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
              fill={`url(#star-fill-${rating}-${star})`}
            />
          </svg>
        );
      })}
    </div>
  );
}

export default function ReviewsBadges() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <div className="text-center mb-10">
        <p className="text-accent font-semibold text-sm uppercase tracking-wider mb-1">Trusted & Reviewed</p>
        <h2 className="text-3xl md:text-4xl font-extrabold text-text-primary">What Our Customers Say</h2>
        <p className="text-text-muted mt-2 max-w-md mx-auto">
          Don&apos;t just take our word for it &mdash; see what real customers have to say about their experience.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-2xl mx-auto">
        {platforms.map((p) => (
          <a
            key={p.name}
            href={p.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-white border border-gray-200 rounded-2xl p-6 text-center hover:border-accent/30 hover:shadow-lg transition-all"
          >
            <div className="flex justify-center mb-3">{p.logo}</div>
            <p className="text-4xl font-extrabold text-text-primary mb-1">{p.rating}</p>
            <StarRating rating={p.rating} />
            <p className="text-text-muted text-sm mt-2">
              {p.count} reviews on <span className="font-semibold text-text-primary">{p.name}</span>
            </p>
            <span className="inline-flex items-center gap-1 text-accent text-sm font-semibold mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
              Read reviews
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
