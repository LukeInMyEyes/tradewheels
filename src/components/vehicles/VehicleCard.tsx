import Image from 'next/image';
import Link from 'next/link';
import { Vehicle } from '@/lib/types';
import { formatPrice, formatMileage } from '@/lib/utils';

interface VehicleCardProps {
  vehicle: Vehicle;
}

export default function VehicleCard({ vehicle }: VehicleCardProps) {
  const mainImage = vehicle.images[0];

  return (
    <Link
      href={`/vehicles/${vehicle.stockNumber}`}
      className="group bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 hover:border-gray-200"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-gray-100 img-zoom">
        {mainImage ? (
          <Image
            src={mainImage.fullImageUrl}
            alt={vehicle.fullTitle}
            fill
            className="object-cover transition-transform duration-700"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-text-muted">
            No Image
          </div>
        )}
        {/* Gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Year badge */}
        <div className="absolute top-3 left-3">
          <span className="bg-black/80 glass text-white text-xs font-bold px-3 py-1.5 rounded-lg">
            {vehicle.year}
          </span>
        </div>

        {/* Image count */}
        {vehicle.images.length > 1 && (
          <div className="absolute bottom-3 right-3">
            <span className="bg-black/60 glass text-white text-xs px-2.5 py-1 rounded-lg flex items-center gap-1">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {vehicle.images.length}
            </span>
          </div>
        )}

        {/* Hover CTA */}
        <div className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
          <span className="bg-accent text-white text-xs font-bold px-4 py-2 rounded-lg">
            View Details
          </span>
        </div>
      </div>

      <div className="p-5">
        <h3 className="font-bold text-text-primary line-clamp-1 group-hover:text-accent transition-colors duration-300">
          {vehicle.fullTitle}
        </h3>
        <div className="flex items-center gap-2 mt-2 text-xs text-text-muted">
          <span className="flex items-center gap-1">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {formatMileage(vehicle.mileage)}
          </span>
          <span className="w-1 h-1 bg-gray-300 rounded-full" />
          <span>{vehicle.transmission}</span>
          {vehicle.colour && (
            <>
              <span className="w-1 h-1 bg-gray-300 rounded-full" />
              <span>{vehicle.colour}</span>
            </>
          )}
        </div>

        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
          <p className="text-accent font-extrabold text-xl">
            {formatPrice(vehicle.priceIncl)}
          </p>
          <span className="text-xs text-text-muted group-hover:text-accent transition-colors flex items-center gap-1">
            Details
            <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}
