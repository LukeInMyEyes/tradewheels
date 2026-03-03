import { Vehicle } from '@/lib/types';
import { formatMileage } from '@/lib/utils';

interface SpecsTableProps {
  vehicle: Vehicle;
}

export default function SpecsTable({ vehicle }: SpecsTableProps) {
  const specs = [
    { label: 'Year', value: vehicle.year ? String(vehicle.year) : '', icon: '📅' },
    { label: 'Mileage', value: vehicle.mileage ? formatMileage(vehicle.mileage) : '', icon: '🛣️' },
    { label: 'Transmission', value: vehicle.transmission, icon: '⚙️' },
    { label: 'Drivetrain', value: vehicle.drivetrain, icon: '🔧' },
    { label: 'Colour', value: vehicle.colour, icon: '🎨' },
    { label: 'Body Type', value: vehicle.category, icon: '🚗' },
    { label: 'Service History', value: vehicle.serviceHistory || 'Not specified', icon: '📋' },
    { label: 'Stock No.', value: vehicle.stockNumber, icon: '#️⃣' },
  ].filter((s) => (s.value && s.value !== 'Not specified') || s.label === 'Service History');

  return (
    <div>
      <h2 className="text-lg font-bold text-text-primary mb-4">Specifications</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {specs.map((spec) => (
          <div
            key={spec.label}
            className="bg-surface rounded-xl p-4 border border-gray-100"
          >
            <p className="text-xs text-text-muted mb-1">{spec.label}</p>
            <p className="font-bold text-text-primary text-sm">{spec.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
