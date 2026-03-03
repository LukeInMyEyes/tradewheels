'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { DEALER } from '@/lib/constants';
import { trackPhoneClick } from '@/lib/analytics';
import MobileNav from './MobileNav';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/vehicles', label: 'Vehicles' },
  { href: '/sell-your-car', label: 'Sell Your Car' },
  { href: '/finance', label: 'Finance' },
  { href: '/faq', label: 'FAQ' },
  { href: '/about', label: 'About' },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Top bar */}
      <div className="bg-navy-900 text-white/70 text-xs hidden md:block">
        <div className="max-w-7xl mx-auto px-6 py-2 flex items-center justify-between">
          <div className="flex items-center gap-5">
            <a href={DEALER.phoneLink} onClick={() => trackPhoneClick('header_topbar')} className="flex items-center gap-1.5 hover:text-white transition-colors">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              {DEALER.phone}
            </a>
            <a href={`mailto:${DEALER.email}`} className="flex items-center gap-1.5 hover:text-white transition-colors">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              {DEALER.email}
            </a>
          </div>
          <div className="flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            105 Inanda Road, Hillcrest
          </div>
        </div>
      </div>

      {/* Main header */}
      <header className="bg-black text-white sticky top-0 z-50 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
          <Link href="/" className="flex items-center">
            <Image
              src="/logo-white.png"
              alt="Trade Wheels"
              width={200}
              height={16}
              className="h-7 w-auto"
              priority
            />
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-white/80 hover:text-white px-4 py-2 rounded-lg hover:bg-white/10 transition-all"
              >
                {link.label}
              </Link>
            ))}
            <div className="w-px h-6 bg-white/10 mx-2" />
            <a
              href={DEALER.phoneLink}
              onClick={() => trackPhoneClick('header_call_button')}
              className="text-sm font-semibold bg-accent hover:bg-accent-dark px-5 py-2.5 rounded-lg transition-all hover:shadow-lg hover:shadow-accent/20"
            >
              Call Now
            </a>
          </nav>

          <button
            className="md:hidden p-2 hover:bg-white/10 rounded-lg transition-colors"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} links={navLinks} />
      </header>
    </>
  );
}
