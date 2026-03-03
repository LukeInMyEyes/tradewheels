'use client';

import { useState } from 'react';
import { trackFormSubmission, trackWhatsAppClick } from '@/lib/analytics';
import { DEALER } from '@/lib/constants';

export default function SellYourCarForm() {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    vehicleMake: '',
    vehicleModel: '',
    vehicleYear: '',
    mileage: '',
    vinNumber: '',
    serviceHistory: '',
    hasWarranty: '',
    warrantyEndDate: '',
    warrantyEndMileage: '',
    condition: '',
    askingPrice: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    try {
      const res = await fetch('/api/sell-your-car', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to submit');
      }

      setStatus('success');
      trackFormSubmission('sell_your_car', {
        vehicle: `${form.vehicleYear} ${form.vehicleMake} ${form.vehicleModel}`.trim(),
      });
    } catch (err) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong');
    }
  };

  const update = (key: string, value: string) => setForm({ ...form, [key]: value });

  const inputClass = 'w-full px-3 py-2.5 rounded-lg border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent';

  if (status === 'success') {
    return (
      <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
        <svg className="w-14 h-14 text-green-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 className="text-xl font-bold text-green-800 mb-2">Details Received!</h3>
        <p className="text-green-700">
          Our team will review your vehicle and get back to you within 24 hours. For faster service, WhatsApp us on{' '}
          <a href={DEALER.whatsappLink} target="_blank" rel="noopener noreferrer" className="font-semibold underline" onClick={() => trackWhatsAppClick('sell_form_success')}>{DEALER.phone}</a>.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Personal details */}
      <div>
        <h3 className="font-bold text-text-primary mb-3">Your Details</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-text-muted mb-1">First Name *</label>
            <input type="text" required value={form.firstName} onChange={(e) => update('firstName', e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-muted mb-1">Last Name *</label>
            <input type="text" required value={form.lastName} onChange={(e) => update('lastName', e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-muted mb-1">Phone Number *</label>
            <input type="tel" required value={form.phone} onChange={(e) => update('phone', e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-muted mb-1">Email</label>
            <input type="email" value={form.email} onChange={(e) => update('email', e.target.value)} className={inputClass} />
          </div>
        </div>
      </div>

      {/* Vehicle details */}
      <div>
        <h3 className="font-bold text-text-primary mb-3">Vehicle Details</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-text-muted mb-1">Make *</label>
            <input type="text" required placeholder="e.g. Toyota" value={form.vehicleMake} onChange={(e) => update('vehicleMake', e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-muted mb-1">Model *</label>
            <input type="text" required placeholder="e.g. Hilux 2.8 GD-6" value={form.vehicleModel} onChange={(e) => update('vehicleModel', e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-muted mb-1">Year *</label>
            <input type="number" required placeholder="e.g. 2021" value={form.vehicleYear} onChange={(e) => update('vehicleYear', e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-muted mb-1">Mileage (km) *</label>
            <input type="number" required placeholder="e.g. 45000" value={form.mileage} onChange={(e) => update('mileage', e.target.value)} className={inputClass} />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-text-muted mb-1">VIN Number</label>
            <input type="text" maxLength={17} placeholder="17-character VIN" value={form.vinNumber} onChange={(e) => update('vinNumber', e.target.value.toUpperCase())} className={inputClass} />
            {form.vinNumber && form.vinNumber.length !== 17 && (
              <p className="text-xs text-amber-600 mt-1">VIN must be exactly 17 characters ({form.vinNumber.length}/17)</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-text-muted mb-1">Service History *</label>
            <select required value={form.serviceHistory} onChange={(e) => update('serviceHistory', e.target.value)} className={inputClass}>
              <option value="">Select service history</option>
              <option value="Full Franchise Service History">Full Franchise Service History</option>
              <option value="Full Service History">Full Service History</option>
              <option value="Full Service History by Non-Franchise">Full Service History by Non-Franchise</option>
              <option value="Full Service History Partially by Franchise">Full Service History Partially by Franchise</option>
              <option value="No Service History">No Service History</option>
              <option value="Partial Service History">Partial Service History</option>
              <option value="Not Applicable">Not Applicable</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-text-muted mb-1">Has Warranty? *</label>
            <select required value={form.hasWarranty} onChange={(e) => update('hasWarranty', e.target.value)} className={inputClass}>
              <option value="">Select</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
          {form.hasWarranty === 'Yes' && (
            <>
              <div>
                <label className="block text-sm font-medium text-text-muted mb-1">Warranty End Date</label>
                <input type="date" value={form.warrantyEndDate} onChange={(e) => update('warrantyEndDate', e.target.value)} className={inputClass} />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-muted mb-1">Warranty End Mileage (km)</label>
                <input type="number" placeholder="e.g. 100000" value={form.warrantyEndMileage} onChange={(e) => update('warrantyEndMileage', e.target.value)} className={inputClass} />
              </div>
            </>
          )}
          <div>
            <label className="block text-sm font-medium text-text-muted mb-1">Condition *</label>
            <select required value={form.condition} onChange={(e) => update('condition', e.target.value)} className={inputClass}>
              <option value="">Select condition</option>
              <option value="Excellent">Excellent</option>
              <option value="Good">Good</option>
              <option value="Fair">Fair</option>
              <option value="Needs Work">Needs Work</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-text-muted mb-1">Asking Price (optional)</label>
            <input type="text" placeholder="e.g. R250,000" value={form.askingPrice} onChange={(e) => update('askingPrice', e.target.value)} className={inputClass} />
          </div>
        </div>
      </div>

      {/* Message */}
      <div>
        <label className="block text-sm font-medium text-text-muted mb-1">Additional Info</label>
        <textarea
          rows={3}
          placeholder="Modifications, accident history, reason for selling, any other info..."
          value={form.message}
          onChange={(e) => update('message', e.target.value)}
          className={`${inputClass} resize-none`}
        />
      </div>

      {status === 'error' && (
        <p className="text-red-600 text-sm">{errorMsg}</p>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full bg-accent hover:bg-accent-dark disabled:opacity-50 text-white font-bold py-4 rounded-xl transition-colors text-lg"
      >
        {status === 'loading' ? 'Submitting...' : 'Get Your Offer'}
      </button>

      <p className="text-xs text-text-muted text-center">
        No obligation. We&apos;ll contact you within 24 hours with an offer.
      </p>
    </form>
  );
}
