'use client';

import { useState } from 'react';
import { Vehicle } from '@/lib/types';
import { trackFormSubmission } from '@/lib/analytics';

interface EnquiryFormProps {
  vehicle?: Vehicle;
}

export default function EnquiryForm({ vehicle }: EnquiryFormProps) {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    message: vehicle
      ? `Hi, I'm interested in the ${vehicle.year} ${vehicle.fullTitle} (Stock: ${vehicle.stockNumber}).`
      : '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    try {
      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          stockNumber: vehicle?.stockNumber,
          make: vehicle?.make,
          model: vehicle?.fullTitle,
          year: vehicle?.year,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to submit enquiry');
      }

      setStatus('success');
      trackFormSubmission('enquiry', { vehicle_stock: vehicle?.stockNumber || 'general' });
      setForm({ firstName: '', lastName: '', phone: '', email: '', message: '' });
    } catch (err) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong');
    }
  };

  if (status === 'success') {
    return (
      <div id="enquiry-form" className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
        <svg className="w-12 h-12 text-green-500 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 className="text-lg font-semibold text-green-800 mb-1">Enquiry Sent!</h3>
        <p className="text-green-700 text-sm">We&apos;ll be in touch shortly. Thanks for your interest!</p>
      </div>
    );
  }

  return (
    <div id="enquiry-form">
      <h2 className="text-lg font-semibold text-text-primary mb-4">Send an Enquiry</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-text-muted mb-1">First Name *</label>
            <input
              type="text"
              required
              value={form.firstName}
              onChange={(e) => setForm({ ...form, firstName: e.target.value })}
              className="w-full px-3 py-2.5 rounded-lg border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-muted mb-1">Last Name *</label>
            <input
              type="text"
              required
              value={form.lastName}
              onChange={(e) => setForm({ ...form, lastName: e.target.value })}
              className="w-full px-3 py-2.5 rounded-lg border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-text-muted mb-1">Phone Number *</label>
          <input
            type="tel"
            required
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="w-full px-3 py-2.5 rounded-lg border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-text-muted mb-1">Email</label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full px-3 py-2.5 rounded-lg border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-text-muted mb-1">Message</label>
          <textarea
            rows={3}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            className="w-full px-3 py-2.5 rounded-lg border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent resize-none"
          />
        </div>

        {status === 'error' && (
          <p className="text-red-600 text-sm">{errorMsg}</p>
        )}

        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full bg-accent hover:bg-accent-dark disabled:opacity-50 text-white font-semibold py-3 rounded-xl transition-colors"
        >
          {status === 'loading' ? 'Sending...' : 'Submit Enquiry'}
        </button>
      </form>
    </div>
  );
}
