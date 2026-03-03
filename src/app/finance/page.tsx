import { Metadata } from 'next';
import { getVehicles } from '@/lib/feed';
import { formatPrice } from '@/lib/utils';
import { DEALER } from '@/lib/constants';
import FinanceForm from '@/components/finance/FinanceForm';
import TrackedLink from '@/components/ui/TrackedLink';

export const metadata: Metadata = {
  title: 'Apply for Finance',
  description: 'Apply for vehicle finance at Trade Wheels, Hillcrest. Easy online application — our team will get back to you within 24 hours.',
};

export default async function FinancePage() {
  const vehicles = await getVehicles();
  const vehicleOptions = vehicles.map(
    (v) => `${v.year} ${v.fullTitle} — ${formatPrice(v.priceIncl)} (${v.stockNumber})`
  );

  return (
    <div>
      {/* Page header */}
      <div className="bg-navy-700 text-white">
        <div className="max-w-7xl mx-auto px-6 py-10">
          <p className="text-accent font-semibold text-sm uppercase tracking-wider mb-1">Get Behind the Wheel</p>
          <h1 className="text-3xl md:text-4xl font-extrabold">Apply for Finance</h1>
          <p className="text-white/50 mt-2 max-w-xl">
            Complete the form below and our finance team will be in touch within 24 hours to discuss your options.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-10">
        {/* Info banner */}
        <div className="bg-accent/5 border border-accent/15 rounded-2xl p-6 mb-10 flex flex-col sm:flex-row items-start gap-4">
          <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center shrink-0">
            <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h3 className="font-bold text-text-primary mb-1">How it works</h3>
            <ol className="text-sm text-text-muted space-y-1 list-decimal list-inside">
              <li>Fill in the application form below</li>
              <li>Our finance manager reviews your details</li>
              <li>We submit to multiple finance houses for the best rate</li>
              <li>You get a call with your approval and options</li>
            </ol>
            <p className="text-sm text-text-muted mt-2">
              Questions? Call us on <TrackedLink href={DEALER.phoneLink} track={{ type: 'phone', location: 'finance_banner' }} className="text-accent font-semibold hover:underline">{DEALER.phone}</TrackedLink> or{' '}
              <TrackedLink href={DEALER.whatsappLink} target="_blank" rel="noopener noreferrer" track={{ type: 'whatsapp', location: 'finance_banner' }} className="text-whatsapp font-semibold hover:underline">WhatsApp us</TrackedLink>.
            </p>
          </div>
        </div>

        <FinanceForm vehicleOptions={vehicleOptions} />
      </div>
    </div>
  );
}
