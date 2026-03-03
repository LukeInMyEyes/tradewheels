import Image from 'next/image';
import { Metadata } from 'next';
import { DEALER } from '@/lib/constants';
import EnquiryForm from '@/components/vehicle-detail/EnquiryForm';
import TrackedLink from '@/components/ui/TrackedLink';

export const metadata: Metadata = {
  title: 'About Us',
  description: `Learn about Trade Wheels — over 20 years in the motor industry, based in Hillcrest, KZN. Quality pre-owned vehicles, finance available, trade-ins welcome.`,
};

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl md:text-3xl font-bold text-text-primary mb-2">About Trade Wheels</h1>
      <p className="text-text-muted mb-10">Your trusted pre-owned vehicle dealer in Hillcrest, KZN</p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Dealership photos */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
              <Image
                src="/dealership/showroom-exterior.webp"
                alt="Trade Wheels dealership showroom in Hillcrest"
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, 50vw"
              />
            </div>
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
              <Image
                src="/dealership/full-lot-wide.webp"
                alt="Trade Wheels vehicle lot with covered parking"
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, 50vw"
              />
            </div>
          </div>

          {/* Interior photos */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
              <Image
                src="/dealership/office-desks.webp"
                alt="Trade Wheels professional office interior"
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, 33vw"
              />
            </div>
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
              <Image
                src="/dealership/lounge-sofa.webp"
                alt="Trade Wheels comfortable customer lounge"
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, 33vw"
              />
            </div>
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
              <Image
                src="/dealership/coffee-station.webp"
                alt="Trade Wheels coffee station for customers"
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, 33vw"
              />
            </div>
          </div>

          {/* About text */}
          <div className="bg-card rounded-xl p-6 border border-gray-100 shadow-sm">
            <h2 className="text-lg font-semibold text-text-primary mb-3">Our Story</h2>
            <p className="text-text-muted leading-relaxed">
              {DEALER.about}
            </p>
            <p className="text-text-muted leading-relaxed mt-4">
              Don&apos;t just settle for a used car — find your ideal vehicle at Trade Wheels.
              Browse our showroom online or visit us at our Hillcrest location to see our
              hand-picked selection of immaculately clean cars that meet our rigorous standards.
            </p>
          </div>

          {/* Map */}
          <div className="bg-card rounded-xl overflow-hidden border border-gray-100 shadow-sm">
            <div className="p-6 pb-4">
              <h2 className="text-lg font-semibold text-text-primary mb-1">Find Us</h2>
              <p className="text-text-muted text-sm">{DEALER.address}</p>
            </div>
            <iframe
              src={`https://www.google.com/maps?q=${DEALER.mapsQuery}&output=embed`}
              width="100%"
              height="350"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Trade Wheels location"
            />
          </div>

          {/* Contact form */}
          <div className="bg-card rounded-xl p-6 border border-gray-100 shadow-sm">
            <EnquiryForm />
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Contact details */}
          <div className="bg-card rounded-xl p-6 border border-gray-100 shadow-sm">
            <h2 className="text-lg font-semibold text-text-primary mb-4">Contact Details</h2>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-accent mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <div>
                  <p className="text-sm text-text-muted">Phone</p>
                  <TrackedLink href={DEALER.phoneLink} track={{ type: 'phone', location: 'about_sidebar' }} className="font-medium text-text-primary hover:text-accent transition-colors">
                    {DEALER.phone}
                  </TrackedLink>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-accent mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <div>
                  <p className="text-sm text-text-muted">Email</p>
                  <a href={`mailto:${DEALER.email}`} className="font-medium text-text-primary hover:text-accent transition-colors">
                    {DEALER.email}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-whatsapp mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                <div>
                  <p className="text-sm text-text-muted">WhatsApp</p>
                  <TrackedLink href={DEALER.whatsappLink} target="_blank" rel="noopener noreferrer" track={{ type: 'whatsapp', location: 'about_sidebar' }} className="font-medium text-text-primary hover:text-whatsapp transition-colors">
                    Message us on WhatsApp
                  </TrackedLink>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-accent mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <div>
                  <p className="text-sm text-text-muted">Address</p>
                  <p className="font-medium text-text-primary">{DEALER.address}</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Operating hours */}
          <div className="bg-card rounded-xl p-6 border border-gray-100 shadow-sm">
            <h2 className="text-lg font-semibold text-text-primary mb-4">Operating Hours</h2>
            <ul className="space-y-2">
              {DEALER.hours.map((h) => (
                <li key={h.days} className="flex justify-between text-sm">
                  <span className="text-text-muted">{h.days}</span>
                  <span className="font-medium text-text-primary">{h.time}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Social links */}
          <div className="bg-card rounded-xl p-6 border border-gray-100 shadow-sm">
            <h2 className="text-lg font-semibold text-text-primary mb-4">Follow Us</h2>
            <div className="flex gap-3">
              <TrackedLink href={DEALER.social.facebook} target="_blank" rel="noopener noreferrer" track={{ type: 'social', platform: 'facebook', location: 'about_sidebar' }} className="flex items-center justify-center w-10 h-10 rounded-lg bg-surface text-text-muted hover:text-accent transition-colors" aria-label="Facebook">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </TrackedLink>
              <TrackedLink href={DEALER.social.instagram} target="_blank" rel="noopener noreferrer" track={{ type: 'social', platform: 'instagram', location: 'about_sidebar' }} className="flex items-center justify-center w-10 h-10 rounded-lg bg-surface text-text-muted hover:text-accent transition-colors" aria-label="Instagram">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </TrackedLink>
              <TrackedLink href={DEALER.social.youtube} target="_blank" rel="noopener noreferrer" track={{ type: 'social', platform: 'youtube', location: 'about_sidebar' }} className="flex items-center justify-center w-10 h-10 rounded-lg bg-surface text-text-muted hover:text-accent transition-colors" aria-label="YouTube">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </TrackedLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
