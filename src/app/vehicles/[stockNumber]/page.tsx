import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getVehicles, getVehicleByStock } from '@/lib/feed';
import { formatPrice, formatMileage } from '@/lib/utils';
import { DEALER } from '@/lib/constants';
import ImageGallery from '@/components/vehicle-detail/ImageGallery';
import SpecsTable from '@/components/vehicle-detail/SpecsTable';
import CTAButtons from '@/components/vehicle-detail/CTAButtons';
import EnquiryForm from '@/components/vehicle-detail/EnquiryForm';

interface PageProps {
  params: Promise<{ stockNumber: string }>;
}

export async function generateStaticParams() {
  const vehicles = await getVehicles();
  return vehicles.map((v) => ({ stockNumber: v.stockNumber }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { stockNumber } = await params;
  const vehicle = await getVehicleByStock(stockNumber);
  if (!vehicle) return { title: 'Vehicle Not Found' };

  const title = `${vehicle.year} ${vehicle.fullTitle}`;
  const description = `${title} - ${formatMileage(vehicle.mileage)}, ${vehicle.transmission} - ${formatPrice(vehicle.priceIncl)} at Trade Wheels, Hillcrest`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: vehicle.images[0] ? [vehicle.images[0].fullImageUrl] : [],
    },
  };
}

export default async function VehicleDetailPage({ params }: PageProps) {
  const { stockNumber } = await params;
  const vehicle = await getVehicleByStock(stockNumber);

  if (!vehicle) notFound();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Car',
    name: `${vehicle.year} ${vehicle.fullTitle}`,
    brand: { '@type': 'Brand', name: vehicle.make },
    model: vehicle.model,
    vehicleModelDate: vehicle.year.toString(),
    mileageFromOdometer: {
      '@type': 'QuantitativeValue',
      value: vehicle.mileage,
      unitCode: 'KMT',
    },
    vehicleTransmission: vehicle.transmission,
    color: vehicle.colour,
    offers: {
      '@type': 'Offer',
      price: vehicle.priceIncl,
      priceCurrency: 'ZAR',
      availability: 'https://schema.org/InStock',
      seller: {
        '@type': 'AutoDealer',
        name: DEALER.name,
        address: DEALER.address,
        telephone: DEALER.phone,
      },
    },
    image: vehicle.images.map((img) => img.fullImageUrl),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Breadcrumb */}
        <nav className="text-sm text-text-muted mb-6 flex items-center gap-2">
          <a href="/vehicles" className="hover:text-accent transition-colors">Vehicles</a>
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span className="text-text-primary font-medium">{vehicle.year} {vehicle.make} {vehicle.model}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Left: Images */}
          <div className="lg:col-span-3">
            <ImageGallery images={vehicle.images} alt={vehicle.fullTitle} />
          </div>

          {/* Right: Info + CTAs */}
          <div className="lg:col-span-2">
            <div className="lg:sticky lg:top-24">
              <h1 className="text-2xl md:text-3xl font-extrabold text-text-primary leading-tight">
                {vehicle.year} {vehicle.fullTitle}
              </h1>
              {vehicle.derivative && (
                <p className="text-text-muted mt-1">{vehicle.derivative}</p>
              )}

              {/* Price card */}
              <div className="bg-accent/5 border border-accent/15 rounded-2xl p-5 mt-5">
                <p className="text-sm text-accent font-semibold mb-1">Price</p>
                <p className="text-4xl font-extrabold text-accent">
                  {formatPrice(vehicle.priceIncl)}
                </p>
                <p className="text-xs text-text-muted mt-1">
                  Excl. VAT: {formatPrice(vehicle.priceExcl)}
                </p>
              </div>

              {/* Quick specs */}
              <div className="grid grid-cols-3 gap-2 mt-4">
                <div className="bg-surface rounded-xl p-3 text-center">
                  <p className="text-xs text-text-muted">Mileage</p>
                  <p className="font-bold text-sm text-text-primary">{formatMileage(vehicle.mileage)}</p>
                </div>
                <div className="bg-surface rounded-xl p-3 text-center">
                  <p className="text-xs text-text-muted">Gearbox</p>
                  <p className="font-bold text-sm text-text-primary">{vehicle.transmission}</p>
                </div>
                <div className="bg-surface rounded-xl p-3 text-center">
                  <p className="text-xs text-text-muted">Colour</p>
                  <p className="font-bold text-sm text-text-primary">{vehicle.colour}</p>
                </div>
              </div>

              <div className="mt-6">
                <CTAButtons vehicle={vehicle} />
              </div>
            </div>
          </div>
        </div>

        {/* Details sections */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mt-12">
          <div className="lg:col-span-3 space-y-10">
            {/* Specs */}
            <SpecsTable vehicle={vehicle} />

            {/* Extras */}
            {vehicle.extras.length > 0 && (
              <div>
                <h2 className="text-lg font-bold text-text-primary mb-4">Features & Extras</h2>
                <div className="flex flex-wrap gap-2">
                  {vehicle.extras.map((extra) => (
                    <span
                      key={extra}
                      className="bg-white text-text-muted text-sm px-3.5 py-2 rounded-xl border border-gray-100"
                    >
                      {extra}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Description */}
            {vehicle.comments && (
              <div>
                <h2 className="text-lg font-bold text-text-primary mb-4">Description</h2>
                <div className="bg-white rounded-2xl p-6 border border-gray-100">
                  <p className="text-text-muted leading-relaxed whitespace-pre-line">
                    {vehicle.comments}
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="lg:col-span-2">
            <div className="lg:sticky lg:top-24 bg-card rounded-2xl p-6 border border-gray-100 shadow-sm">
              <EnquiryForm vehicle={vehicle} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
