import { Metadata } from 'next';
import Image from 'next/image';
import { DEALER } from '@/lib/constants';
import SellYourCarForm from '@/components/sell/SellYourCarForm';
import TrackedLink from '@/components/ui/TrackedLink';

export const metadata: Metadata = {
  title: 'Sell Us Your Car | Quick Cash Offer in Hillcrest, Durban',
  description: 'Want to sell your car fast in Durban? Trade Wheels buys quality used cars for cash. No hassle, no waiting — get a fair offer within 24 hours. Based in Hillcrest, KZN.',
  keywords: 'sell my car durban, sell car hillcrest, sell used car kzn, cash for cars durban, sell my car fast south africa, trade wheels buy cars',
};

const benefits = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'Offer Within 24 Hours',
    description: 'Submit your details and receive a fair cash offer the same or next business day.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'Fair Market Price',
    description: 'Over 20 years in the motor trade means we know what your car is worth — and we pay fairly.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: 'No Obligation',
    description: 'Get a quote with zero pressure. If the price works for you, great. If not, no hard feelings.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
    title: 'We Handle the Paperwork',
    description: 'Registration, licensing, change of ownership — we take care of everything so you don\'t have to.',
  },
];

export default function SellYourCarPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Sell Your Car to Trade Wheels',
    description: 'Trade Wheels buys quality used cars for cash in Hillcrest, Durban, KZN. Fair market offers within 24 hours.',
    provider: {
      '@type': 'AutoDealer',
      name: DEALER.name,
      address: {
        '@type': 'PostalAddress',
        streetAddress: '105 Inanda Road',
        addressLocality: 'Hillcrest',
        addressRegion: 'KwaZulu-Natal',
        postalCode: '3650',
        addressCountry: 'ZA',
      },
      telephone: DEALER.phone,
      url: DEALER.siteUrl,
    },
    areaServed: {
      '@type': 'GeoCircle',
      geoMidpoint: { '@type': 'GeoCoordinates', latitude: -29.78, longitude: 30.77 },
      geoRadius: '100000',
    },
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero header with background photo */}
      <div className="text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/dealership/vw-bmw-row.webp"
            alt="Vehicles at Trade Wheels"
            fill
            className="object-cover object-bottom"
            sizes="100vw"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/80 to-black/60" />
        <div className="max-w-7xl mx-auto px-6 py-16 md:py-20 relative">
          <p className="text-accent font-semibold text-sm uppercase tracking-wider mb-2">Cash for Your Car</p>
          <h1 className="mb-4">
            <Image
              src="/sell-us-your-car-white.png"
              alt="Sell Us Your Car"
              width={450}
              height={72}
              className="h-10 md:h-14 w-auto"
              priority
            />
          </h1>
          <p className="text-white/60 text-lg max-w-lg leading-relaxed">
            Looking to sell your car quickly in Durban? Trade Wheels pays fair cash prices for quality used vehicles. No hassle, no waiting — just a straight deal from a dealership you can trust.
          </p>
        </div>
      </div>

      {/* Benefits */}
      <div className="max-w-7xl mx-auto px-6 -mt-6 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {benefits.map((b) => (
            <div key={b.title} className="bg-card rounded-2xl p-5 border border-gray-100 shadow-sm">
              <div className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-black/5 text-black mb-3">
                {b.icon}
              </div>
              <h3 className="font-bold text-text-primary text-sm">{b.title}</h3>
              <p className="text-text-muted text-xs mt-1 leading-relaxed">{b.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Main content: Form + SEO copy */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Form */}
          <div className="lg:col-span-3">
            <div className="bg-card rounded-2xl p-6 md:p-8 border border-gray-100 shadow-sm">
              <h2 className="text-xl font-bold text-text-primary mb-1">Get Your Free Valuation</h2>
              <p className="text-text-muted text-sm mb-6">Fill in your vehicle details below and we&apos;ll come back to you with an offer.</p>
              <SellYourCarForm />
            </div>
          </div>

          {/* SEO sidebar */}
          <div className="lg:col-span-2 space-y-6">
            {/* How it works */}
            <div className="bg-card rounded-2xl p-6 border border-gray-100 shadow-sm">
              <h2 className="text-lg font-bold text-text-primary mb-4">How It Works</h2>
              <ol className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="w-7 h-7 bg-accent text-white rounded-full flex items-center justify-center text-xs font-bold shrink-0">1</span>
                  <div>
                    <p className="font-semibold text-text-primary text-sm">Submit Your Details</p>
                    <p className="text-text-muted text-xs">Tell us about your vehicle using the form.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-7 h-7 bg-accent text-white rounded-full flex items-center justify-center text-xs font-bold shrink-0">2</span>
                  <div>
                    <p className="font-semibold text-text-primary text-sm">We Evaluate & Offer</p>
                    <p className="text-text-muted text-xs">Our team assesses your car and makes a fair cash offer within 24 hours.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-7 h-7 bg-accent text-white rounded-full flex items-center justify-center text-xs font-bold shrink-0">3</span>
                  <div>
                    <p className="font-semibold text-text-primary text-sm">Get Paid</p>
                    <p className="text-text-muted text-xs">Accept the offer, drop off the car, and walk away with your money. We handle all paperwork.</p>
                  </div>
                </li>
              </ol>
            </div>

            {/* Dealership photo */}
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
              <Image
                src="/dealership/lot-rear-view.webp"
                alt="Trade Wheels vehicle lot in Hillcrest, Durban"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <p className="text-white font-bold text-sm">Visit us at 105 Inanda Road, Hillcrest</p>
                <p className="text-white/70 text-xs">Open Mon-Fri 8am-5pm, Sat 8am-1pm</p>
              </div>
            </div>

            {/* Quick contact */}
            <div className="bg-card rounded-2xl p-6 border border-gray-100 shadow-sm">
              <h3 className="font-bold text-text-primary mb-3">Prefer to Call?</h3>
              <p className="text-text-muted text-sm mb-4">
                Want a quicker response? Call or WhatsApp us directly with your vehicle details.
              </p>
              <div className="space-y-2">
                <TrackedLink
                  href={DEALER.phoneLink}
                  track={{ type: 'phone', location: 'sell_sidebar' }}
                  className="flex items-center justify-center gap-2 bg-black hover:bg-neutral-800 text-white font-semibold py-3 rounded-xl transition-colors w-full text-sm"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  {DEALER.phone}
                </TrackedLink>
                <TrackedLink
                  href={`https://wa.me/${DEALER.whatsapp}?text=${encodeURIComponent("Hi, I'd like to sell my car. Can I get a valuation?")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  track={{ type: 'whatsapp', location: 'sell_sidebar' }}
                  className="flex items-center justify-center gap-2 bg-whatsapp hover:bg-whatsapp-dark text-white font-semibold py-3 rounded-xl transition-colors w-full text-sm"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  WhatsApp Us
                </TrackedLink>
              </div>
            </div>
          </div>
        </div>

        {/* SEO content block */}
        <div className="mt-12 bg-card rounded-2xl p-6 md:p-8 border border-gray-100 shadow-sm">
          <h2 className="text-xl font-bold text-text-primary mb-4">Sell Your Car in Hillcrest, Durban — The Easy Way</h2>
          <div className="prose prose-sm max-w-none text-text-muted space-y-4">
            <p>
              If you&apos;re looking to sell your car in Durban, Hillcrest, or anywhere in KwaZulu-Natal, Trade Wheels makes the process quick, fair, and hassle-free. With over 20 years in the South African motor industry, we&apos;ve built a reputation for honest deals and transparent pricing — and that applies to buying cars just as much as selling them.
            </p>
            <p>
              Whether you&apos;re upgrading to a newer model, downsizing, relocating, or simply need to sell your car fast for cash, we&apos;re interested. We buy all makes and models in good condition — from Toyota, Volkswagen, and Hyundai to BMW, Mercedes-Benz, Audi, and Porsche. Sedans, SUVs, bakkies, hatchbacks — if it&apos;s a quality vehicle, we want to hear from you.
            </p>
            <p>
              Unlike selling privately — where you deal with tyre-kickers, no-shows, test drive risks, and months of waiting — selling to Trade Wheels is straightforward. Submit your vehicle details through the form above, and our team will evaluate your car and respond with a fair cash offer within 24 hours. If you accept, we handle all the paperwork including change of ownership, licensing, and registration. You walk away with your money and zero admin.
            </p>
            <p>
              Visit us at <strong>105 Inanda Road, Hillcrest, Durban, 3650</strong> or call <strong>{DEALER.phone}</strong> to discuss selling your vehicle today. We serve the entire Upper Highway area including Kloof, Pinetown, Waterfall, Assagay, and the greater Durban region.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
