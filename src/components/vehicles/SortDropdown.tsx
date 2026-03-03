'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { SortOption } from '@/lib/types';

const sortOptions: { value: SortOption; label: string }[] = [
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'year-desc', label: 'Year: Newest First' },
  { value: 'year-asc', label: 'Year: Oldest First' },
  { value: 'mileage-asc', label: 'Mileage: Low to High' },
  { value: 'mileage-desc', label: 'Mileage: High to Low' },
];

export default function SortDropdown() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const current = searchParams.get('sort') || 'price-asc';

  const handleChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('sort', value);
    router.push(`/vehicles?${params.toString()}`, { scroll: false });
  };

  return (
    <select
      value={current}
      onChange={(e) => handleChange(e.target.value)}
      className="px-3 py-2 rounded-lg border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent"
    >
      {sortOptions.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}
