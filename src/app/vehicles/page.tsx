import { Suspense } from 'react';
import { Metadata } from 'next';
import { getVehicles } from '@/lib/feed';
import FilterSidebar from '@/components/vehicles/FilterSidebar';
import VehicleGrid from '@/components/vehicles/VehicleGrid';
import SortDropdown from '@/components/vehicles/SortDropdown';

export const metadata: Metadata = {
  title: 'Browse Vehicles',
  description: 'Browse our selection of quality pre-owned vehicles at Trade Wheels, Hillcrest, KZN. Filter by make, model, price, and more.',
};

export default async function VehiclesPage() {
  const vehicles = await getVehicles();

  return (
    <div>
      {/* Page header */}
      <div className="bg-navy-700 text-white">
        <div className="max-w-7xl mx-auto px-6 py-10">
          <p className="text-accent font-semibold text-sm uppercase tracking-wider mb-1">Our Stock</p>
          <h1 className="text-3xl md:text-4xl font-extrabold">Browse Vehicles</h1>
          <p className="text-white/50 mt-2">Find your next quality pre-owned vehicle</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters sidebar */}
          <aside className="lg:w-64 shrink-0">
            <div className="lg:sticky lg:top-24 bg-card rounded-2xl p-5 border border-gray-100 shadow-sm">
              <Suspense fallback={null}>
                <FilterSidebar vehicles={vehicles} />
              </Suspense>
            </div>
          </aside>

          {/* Main content */}
          <div className="flex-1">
            <div className="flex items-center justify-end mb-6">
              <Suspense fallback={null}>
                <SortDropdown />
              </Suspense>
            </div>
            <Suspense fallback={<div className="text-center py-16 text-text-muted">Loading vehicles...</div>}>
              <VehicleGrid vehicles={vehicles} />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
