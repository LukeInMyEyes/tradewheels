import Link from 'next/link';
import { Vehicle } from '@/lib/types';
import VehicleCard from '@/components/vehicles/VehicleCard';

interface FeaturedVehiclesProps {
  vehicles: Vehicle[];
}

export default function FeaturedVehicles({ vehicles }: FeaturedVehiclesProps) {
  const featured = vehicles.slice(0, 6);

  if (featured.length === 0) return null;

  return (
    <section className="max-w-7xl mx-auto px-6 pt-20 pb-16">
      <div className="flex items-end justify-between mb-10">
        <div>
          <p className="text-accent font-semibold text-sm uppercase tracking-wider mb-1">Fresh Stock</p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-text-primary">Latest Arrivals</h2>
        </div>
        <Link
          href="/vehicles"
          className="hidden md:inline-flex items-center gap-2 text-sm font-semibold text-black hover:text-accent bg-black/5 hover:bg-accent/5 px-5 py-2.5 rounded-xl transition-all"
        >
          View All Stock
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {featured.map((vehicle) => (
          <VehicleCard key={vehicle.stockNumber} vehicle={vehicle} />
        ))}
      </div>

      <div className="mt-10 text-center md:hidden">
        <Link
          href="/vehicles"
          className="inline-flex items-center gap-2 bg-black hover:bg-neutral-800 text-white font-semibold px-8 py-3.5 rounded-xl transition-all"
        >
          View All Vehicles
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>
    </section>
  );
}
