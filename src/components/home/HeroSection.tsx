'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

const quickFilters = [
  { label: 'Under R200k', href: '/vehicles?priceMax=200000' },
  { label: 'SUVs', href: '/vehicles?search=SUV' },
  { label: 'Automatic', href: '/vehicles?transmission=Automatic' },
  { label: 'View All Stock', href: '/vehicles' },
];

export default function HeroSection() {
  const router = useRouter();
  const [query, setQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(query ? `/vehicles?search=${encodeURIComponent(query)}` : '/vehicles');
  };

  return (
    <section className="relative min-h-[85vh] flex items-center text-white overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center scale-105"
        style={{ backgroundImage: "url('/dealership/showroom-front.webp')" }}
      />
      {/* Dark cinematic overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/60 to-black/75" />
      {/* Accent glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-accent/8 rounded-full blur-[120px]" />

      <div className="relative max-w-7xl mx-auto px-6 py-24 w-full">
        <div className="max-w-2xl">
          {/* Badge */}
          <div className="animate-fade-up opacity-0 inline-flex items-center gap-2 bg-white/10 border border-white/10 rounded-full px-4 py-1.5 text-xs font-medium text-white/80 mb-6">
            <span className="w-2 h-2 bg-whatsapp rounded-full animate-pulse" />
            Hillcrest, KZN &mdash; Over 20 Years in the Industry
          </div>

          <h1 className="animate-fade-up opacity-0 animate-delay-100 text-3xl sm:text-4xl md:text-5xl font-semibold leading-[1.15] tracking-tight mb-5 font-heading">
            Quality Cars.
            <br />
            <span className="text-accent">Honest Deals.</span>
          </h1>

          <p className="animate-fade-up opacity-0 animate-delay-200 text-base sm:text-lg text-white/60 mb-10 max-w-lg leading-relaxed">
            Hand-picked pre-owned vehicles that meet our rigorous standards. Every car inspected, every deal transparent.
          </p>

          {/* Search bar */}
          <form onSubmit={handleSearch} className="animate-fade-up opacity-0 animate-delay-300 flex gap-2 max-w-lg mb-6">
            <div className="relative flex-1">
              <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search make, model, year..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/10 glass border border-white/15 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-accent focus:bg-white/15 transition-all"
              />
            </div>
            <button
              type="submit"
              className="bg-accent hover:bg-accent-dark text-white font-bold px-7 py-4 rounded-xl transition-all hover:shadow-lg hover:shadow-accent/30 active:scale-95"
            >
              Search
            </button>
          </form>

          {/* Quick filters */}
          <div className="animate-fade-up opacity-0 animate-delay-400 flex flex-wrap gap-2">
            {quickFilters.map((f) => (
              <a
                key={f.label}
                href={f.href}
                className="text-sm px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white/70 hover:bg-white/15 hover:text-white hover:border-white/20 transition-all"
              >
                {f.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
