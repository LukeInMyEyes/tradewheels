import Link from 'next/link';
import Image from 'next/image';
import { DEALER } from '@/lib/constants';
import TrackedLink from '@/components/ui/TrackedLink';

export default function Footer() {
  return (
    <footer className="bg-navy-900 text-white">
      <div className="max-w-7xl mx-auto px-6 pt-14 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="mb-4">
              <Image
                src="/logo-white.png"
                alt="Trade Wheels"
                width={160}
                height={12}
                className="h-5 w-auto"
              />
            </div>
            <p className="text-white/40 text-sm leading-relaxed">
              Quality pre-owned vehicles in Hillcrest, KZN. Over 20 years of honesty and transparency.
            </p>
            <div className="flex gap-3 mt-5">
              <TrackedLink href={DEALER.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" track={{ type: 'social', platform: 'facebook', location: 'footer' }} className="w-9 h-9 rounded-lg bg-white/5 hover:bg-white/15 flex items-center justify-center text-white/40 hover:text-white transition-all">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </TrackedLink>
              <TrackedLink href={DEALER.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" track={{ type: 'social', platform: 'instagram', location: 'footer' }} className="w-9 h-9 rounded-lg bg-white/5 hover:bg-white/15 flex items-center justify-center text-white/40 hover:text-white transition-all">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </TrackedLink>
              <TrackedLink href={DEALER.social.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube" track={{ type: 'social', platform: 'youtube', location: 'footer' }} className="w-9 h-9 rounded-lg bg-white/5 hover:bg-white/15 flex items-center justify-center text-white/40 hover:text-white transition-all">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </TrackedLink>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-sm mb-4">Quick Links</h4>
            <ul className="space-y-2.5 text-sm text-white/40">
              <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/vehicles" className="hover:text-white transition-colors">Browse Vehicles</Link></li>
              <li><Link href="/sell-your-car" className="hover:text-white transition-colors">Sell Your Car</Link></li>
              <li><Link href="/finance" className="hover:text-white transition-colors">Apply for Finance</Link></li>
              <li><Link href="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-sm mb-4">Contact</h4>
            <ul className="space-y-2.5 text-sm text-white/40">
              <li><TrackedLink href={DEALER.phoneLink} track={{ type: 'phone', location: 'footer' }} className="hover:text-white transition-colors">{DEALER.phone}</TrackedLink></li>
              <li><a href={`mailto:${DEALER.email}`} className="hover:text-white transition-colors">{DEALER.email}</a></li>
              <li><TrackedLink href={DEALER.whatsappLink} target="_blank" rel="noopener noreferrer" track={{ type: 'whatsapp', location: 'footer' }} className="hover:text-whatsapp transition-colors">WhatsApp</TrackedLink></li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="font-bold text-sm mb-4">Hours</h4>
            <ul className="space-y-2.5 text-sm text-white/40">
              {DEALER.hours.map((h) => (
                <li key={h.days}>
                  <span className="block text-white/60">{h.days}</span>
                  <span>{h.time}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/30">
          <p>&copy; {new Date().getFullYear()} Trade Wheels. All rights reserved.</p>
          <p>{DEALER.address}</p>
        </div>
      </div>
    </footer>
  );
}
