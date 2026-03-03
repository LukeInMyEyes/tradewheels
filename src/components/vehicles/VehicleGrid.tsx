'use client';

import { useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { Vehicle, SortOption } from '@/lib/types';
import VehicleCard from './VehicleCard';

interface VehicleGridProps {
  vehicles: Vehicle[];
}

function sortVehicles(vehicles: Vehicle[], sort: SortOption): Vehicle[] {
  const sorted = [...vehicles];
  switch (sort) {
    case 'price-asc':
      return sorted.sort((a, b) => a.priceIncl - b.priceIncl);
    case 'price-desc':
      return sorted.sort((a, b) => b.priceIncl - a.priceIncl);
    case 'year-desc':
      return sorted.sort((a, b) => b.year - a.year);
    case 'year-asc':
      return sorted.sort((a, b) => a.year - b.year);
    case 'mileage-asc':
      return sorted.sort((a, b) => a.mileage - b.mileage);
    case 'mileage-desc':
      return sorted.sort((a, b) => b.mileage - a.mileage);
    default:
      return sorted;
  }
}

export default function VehicleGrid({ vehicles }: VehicleGridProps) {
  const searchParams = useSearchParams();

  const filtered = useMemo(() => {
    let result = vehicles;

    const make = searchParams.get('make');
    if (make) result = result.filter((v) => v.make === make);

    const model = searchParams.get('model');
    if (model) result = result.filter((v) => v.model === model);

    const transmission = searchParams.get('transmission');
    if (transmission) result = result.filter((v) => v.transmission === transmission);

    const priceMin = searchParams.get('priceMin');
    if (priceMin) result = result.filter((v) => v.priceIncl >= Number(priceMin));

    const priceMax = searchParams.get('priceMax');
    if (priceMax) result = result.filter((v) => v.priceIncl <= Number(priceMax));

    const yearMin = searchParams.get('yearMin');
    if (yearMin) result = result.filter((v) => v.year >= Number(yearMin));

    const yearMax = searchParams.get('yearMax');
    if (yearMax) result = result.filter((v) => v.year <= Number(yearMax));

    const search = searchParams.get('search');
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (v) =>
          v.fullTitle.toLowerCase().includes(q) ||
          v.make.toLowerCase().includes(q) ||
          v.model.toLowerCase().includes(q) ||
          v.category.toLowerCase().includes(q) ||
          v.colour.toLowerCase().includes(q)
      );
    }

    const sort = (searchParams.get('sort') as SortOption) || 'price-asc';
    return sortVehicles(result, sort);
  }, [vehicles, searchParams]);

  return (
    <div>
      <p className="text-sm text-text-muted mb-4">
        {filtered.length} vehicle{filtered.length !== 1 ? 's' : ''} found
      </p>

      {filtered.length === 0 ? (
        <div className="text-center py-16">
          <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <h3 className="text-lg font-semibold text-text-primary mb-1">No vehicles match your filters</h3>
          <p className="text-text-muted">Try adjusting your filters or search term</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((vehicle) => (
            <VehicleCard key={vehicle.stockNumber} vehicle={vehicle} />
          ))}
        </div>
      )}
    </div>
  );
}
