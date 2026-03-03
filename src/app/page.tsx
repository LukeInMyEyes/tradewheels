import Link from 'next/link';
import Image from 'next/image';
import { getVehicles } from '@/lib/feed';
import HeroSection from '@/components/home/HeroSection';
import FeaturedVehicles from '@/components/home/FeaturedVehicles';
import TrustSignals from '@/components/home/TrustSignals';
import HappyCustomers from '@/components/home/HappyCustomers';
import ReviewsBadges from '@/components/home/ReviewsBadges';
import TrackedLink from '@/components/ui/TrackedLink';
import { DEALER } from '@/lib/constants';

export default async function HomePage() {
  const vehicles = await getVehicles();

  return (
    <>
      <HeroSection />
      <TrustSignals />
      <FeaturedVehicles vehicles={vehicles} />
      <HappyCustomers />
      <ReviewsBadges />

      {/* Sell Us Your Car CTA */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="relative bg-black rounded-2xl overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="/dealership/sports-trio-wide.webp"
              alt="Premium vehicles at Trade Wheels"
              fill
              className="object-cover object-bottom opacity-30"
              sizes="100vw"
            />
          </div>
          <div className="relative p-10 md:p-14 flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1 text-white">
              <p className="text-accent font-semibold text-sm uppercase tracking-wider mb-2">Cash for Your Car</p>
              <h2 className="text-2xl md:text-3xl font-extrabold mb-3">
                Want to Sell <span className="text-accent">Your</span> Car?
              </h2>
              <p className="text-white/60 max-w-lg">
                We buy quality used vehicles for cash. No hassle, no waiting — just a fair offer from a dealership with 20+ years in the game.
              </p>
            </div>
            <Link
              href="/sell-your-car"
              className="shrink-0 bg-accent hover:bg-accent-dark text-white font-bold px-8 py-4 rounded-xl transition-all hover:shadow-lg hover:shadow-accent/30 text-lg"
            >
              Get Your Offer
            </Link>
          </div>
        </div>
      </section>

      {/* About / Why Us */}
      <section className="bg-navy-900 text-white">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-accent font-semibold text-sm uppercase tracking-wider mb-2">Why Trade Wheels</p>
              <h2 className="text-3xl md:text-4xl font-extrabold leading-tight mb-6">
                20+ Years of Putting <br className="hidden md:block" />
                Customers First
              </h2>
              <p className="text-white/60 leading-relaxed mb-8">
                {DEALER.about}
              </p>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/15 border border-white/10 text-white font-semibold px-6 py-3 rounded-xl transition-all"
              >
                Learn More About Us
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
                <p className="text-4xl font-extrabold text-accent">20+</p>
                <p className="text-white/50 text-sm mt-1">Years Experience</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
                <p className="text-4xl font-extrabold text-accent">{vehicles.length}</p>
                <p className="text-white/50 text-sm mt-1">Vehicles in Stock</p>
              </div>
              <div className="col-span-2 relative aspect-[2/1] rounded-2xl overflow-hidden">
                <Image
                  src="/dealership/lot-with-showroom.webp"
                  alt="Trade Wheels vehicles and showroom in Hillcrest"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <p className="text-white font-bold text-sm">Our Hillcrest Showroom</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="relative bg-gradient-to-r from-accent to-accent-dark rounded-2xl p-10 md:p-14 text-white text-center overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: 'radial-gradient(circle at 25px 25px, white 2px, transparent 0)',
              backgroundSize: '40px 40px'
            }} />
          </div>
          <div className="relative">
            <h2 className="text-2xl md:text-3xl font-extrabold mb-3">Ready to Find Your Next Car?</h2>
            <p className="text-white/80 mb-8 max-w-md mx-auto">
              Browse our full selection or get in touch — we&apos;re here to help you drive away happy.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/vehicles"
                className="bg-white text-accent font-bold px-8 py-3.5 rounded-xl hover:bg-white/90 transition-all hover:shadow-lg"
              >
                Browse Vehicles
              </Link>
              <TrackedLink
                href={DEALER.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                track={{ type: 'whatsapp', location: 'home_cta_banner' }}
                className="bg-white/20 hover:bg-white/30 border border-white/20 text-white font-bold px-8 py-3.5 rounded-xl transition-all"
              >
                WhatsApp Us
              </TrackedLink>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
