'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useMemo } from 'react';
import { Vehicle } from '@/lib/types';

interface FilterSidebarProps {
  vehicles: Vehicle[];
}

export default function FilterSidebar({ vehicles }: FilterSidebarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const makes = useMemo(
    () => [...new Set(vehicles.map((v) => v.make))].sort(),
    [vehicles]
  );

  const currentMake = searchParams.get('make') || '';
  const currentTransmission = searchParams.get('transmission') || '';
  const currentPriceMax = searchParams.get('priceMax') || '';
  const currentPriceMin = searchParams.get('priceMin') || '';
  const currentYearMin = searchParams.get('yearMin') || '';
  const currentYearMax = searchParams.get('yearMax') || '';

  const models = useMemo(() => {
    if (!currentMake) return [];
    return [
      ...new Set(
        vehicles.filter((v) => v.make === currentMake).map((v) => v.model)
      ),
    ].sort();
  }, [vehicles, currentMake]);

  const currentModel = searchParams.get('model') || '';

  const updateFilter = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
      // Reset model if make changes
      if (key === 'make') {
        params.delete('model');
      }
      router.push(`/vehicles?${params.toString()}`, { scroll: false });
    },
    [router, searchParams]
  );

  const clearAll = useCallback(() => {
    router.push('/vehicles', { scroll: false });
  }, [router]);

  const hasFilters =
    currentMake || currentTransmission || currentPriceMax || currentPriceMin || currentYearMin || currentYearMax || currentModel;

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-text-primary">Filters</h2>
        {hasFilters && (
          <button
            onClick={clearAll}
            className="text-xs text-accent hover:text-accent-dark font-medium"
          >
            Clear all
          </button>
        )}
      </div>

      {/* Make */}
      <div>
        <label className="block text-sm font-medium text-text-muted mb-1.5">Make</label>
        <select
          value={currentMake}
          onChange={(e) => updateFilter('make', e.target.value)}
          className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent"
        >
          <option value="">All Makes</option>
          {makes.map((m) => (
            <option key={m} value={m}>{m}</option>
          ))}
        </select>
      </div>

      {/* Model (cascading) */}
      {models.length > 0 && (
        <div>
          <label className="block text-sm font-medium text-text-muted mb-1.5">Model</label>
          <select
            value={currentModel}
            onChange={(e) => updateFilter('model', e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent"
          >
            <option value="">All Models</option>
            {models.map((m) => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
        </div>
      )}

      {/* Transmission */}
      <div>
        <label className="block text-sm font-medium text-text-muted mb-1.5">Transmission</label>
        <select
          value={currentTransmission}
          onChange={(e) => updateFilter('transmission', e.target.value)}
          className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent"
        >
          <option value="">All</option>
          <option value="Automatic">Automatic</option>
          <option value="Manual">Manual</option>
        </select>
      </div>

      {/* Price Range */}
      <div>
        <label className="block text-sm font-medium text-text-muted mb-1.5">Price Range</label>
        <div className="grid grid-cols-2 gap-2">
          <input
            type="number"
            placeholder="Min"
            value={currentPriceMin}
            onChange={(e) => updateFilter('priceMin', e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent"
          />
          <input
            type="number"
            placeholder="Max"
            value={currentPriceMax}
            onChange={(e) => updateFilter('priceMax', e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent"
          />
        </div>
      </div>

      {/* Year Range */}
      <div>
        <label className="block text-sm font-medium text-text-muted mb-1.5">Year</label>
        <div className="grid grid-cols-2 gap-2">
          <input
            type="number"
            placeholder="From"
            value={currentYearMin}
            onChange={(e) => updateFilter('yearMin', e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent"
          />
          <input
            type="number"
            placeholder="To"
            value={currentYearMax}
            onChange={(e) => updateFilter('yearMax', e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent"
          />
        </div>
      </div>
    </div>
  );
}
