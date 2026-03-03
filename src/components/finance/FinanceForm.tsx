'use client';

import { useState } from 'react';
import { trackFormSubmission } from '@/lib/analytics';
import {
  FinanceApplication,
  TITLE_OPTIONS,
  GENDER_OPTIONS,
  MARITAL_OPTIONS,
  BANK_OPTIONS,
  ACCOUNT_TYPE_OPTIONS,
} from '@/lib/finance-types';

const initial: FinanceApplication = {
  title: '', firstName: '', lastName: '', idNumber: '', cellphone: '', email: '',
  gender: '', maritalStatus: '', dependants: '',
  streetAddress: '', suburb: '', city: '', postalCode: '', yearsAtAddress: '',
  employerName: '', occupation: '', employmentYears: '', employerPhone: '', employerAddress: '',
  grossIncome: '', netIncome: '', totalExpenses: '',
  bondRent: '', vehicleInstalments: '', insurance: '', groceries: '', otherExpenses: '',
  bankName: '', accountType: '', accountHolder: '',
  vehicleInterest: '', depositAmount: '',
  consent: false,
};

function SectionHeader({ number, title, subtitle }: { number: string; title: string; subtitle: string }) {
  return (
    <div className="flex items-start gap-4 mb-6">
      <div className="w-10 h-10 bg-accent/10 text-accent rounded-xl flex items-center justify-center font-extrabold text-sm shrink-0">
        {number}
      </div>
      <div>
        <h3 className="font-bold text-text-primary text-lg">{title}</h3>
        <p className="text-text-muted text-sm">{subtitle}</p>
      </div>
    </div>
  );
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm font-medium text-text-muted mb-1.5">
        {label} {required && <span className="text-accent">*</span>}
      </label>
      {children}
    </div>
  );
}

const inputClass = "w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all";
const selectClass = inputClass;

interface FinanceFormProps {
  vehicleOptions: string[];
}

export default function FinanceForm({ vehicleOptions }: FinanceFormProps) {
  const [form, setForm] = useState<FinanceApplication>(initial);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const set = (key: keyof FinanceApplication, value: string | boolean) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.consent) {
      setErrorMsg('You must consent to a credit check to proceed.');
      return;
    }
    setStatus('loading');
    setErrorMsg('');

    try {
      const res = await fetch('/api/finance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Submission failed');
      }
      setStatus('success');
      trackFormSubmission('finance', { vehicle: form.vehicleInterest || 'not_specified' });
    } catch (err) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong');
    }
  };

  if (status === 'success') {
    return (
      <div className="bg-green-50 border border-green-200 rounded-2xl p-10 text-center">
        <svg className="w-16 h-16 text-green-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 className="text-xl font-bold text-green-800 mb-2">Application Submitted!</h3>
        <p className="text-green-700">
          Thank you for your finance application. Our team will review your details and be in touch within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-10">
      {/* Section 1: Personal Details */}
      <section className="bg-card rounded-2xl p-6 md:p-8 border border-gray-100 shadow-sm">
        <SectionHeader number="1" title="Personal Details" subtitle="Tell us about yourself" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Field label="Title" required>
            <select value={form.title} onChange={(e) => set('title', e.target.value)} required className={selectClass}>
              <option value="">Select...</option>
              {TITLE_OPTIONS.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </Field>
          <Field label="First Name(s)" required>
            <input type="text" required value={form.firstName} onChange={(e) => set('firstName', e.target.value)} className={inputClass} />
          </Field>
          <Field label="Surname" required>
            <input type="text" required value={form.lastName} onChange={(e) => set('lastName', e.target.value)} className={inputClass} />
          </Field>
          <Field label="SA ID Number" required>
            <input type="text" required maxLength={13} pattern="[0-9]{13}" title="13-digit SA ID number" value={form.idNumber} onChange={(e) => set('idNumber', e.target.value)} className={inputClass} placeholder="e.g. 9001015009087" />
          </Field>
          <Field label="Cellphone" required>
            <input type="tel" required value={form.cellphone} onChange={(e) => set('cellphone', e.target.value)} className={inputClass} placeholder="e.g. 083 706 2520" />
          </Field>
          <Field label="Email" required>
            <input type="email" required value={form.email} onChange={(e) => set('email', e.target.value)} className={inputClass} />
          </Field>
          <Field label="Gender">
            <select value={form.gender} onChange={(e) => set('gender', e.target.value)} className={selectClass}>
              <option value="">Select...</option>
              {GENDER_OPTIONS.map((g) => <option key={g} value={g}>{g}</option>)}
            </select>
          </Field>
          <Field label="Marital Status" required>
            <select value={form.maritalStatus} onChange={(e) => set('maritalStatus', e.target.value)} required className={selectClass}>
              <option value="">Select...</option>
              {MARITAL_OPTIONS.map((m) => <option key={m} value={m}>{m}</option>)}
            </select>
          </Field>
          <Field label="No. of Dependants">
            <input type="number" min={0} max={20} value={form.dependants} onChange={(e) => set('dependants', e.target.value)} className={inputClass} />
          </Field>
        </div>
      </section>

      {/* Section 2: Residential Address */}
      <section className="bg-card rounded-2xl p-6 md:p-8 border border-gray-100 shadow-sm">
        <SectionHeader number="2" title="Residential Address" subtitle="Your current home address" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <Field label="Street Address" required>
              <input type="text" required value={form.streetAddress} onChange={(e) => set('streetAddress', e.target.value)} className={inputClass} />
            </Field>
          </div>
          <Field label="Suburb" required>
            <input type="text" required value={form.suburb} onChange={(e) => set('suburb', e.target.value)} className={inputClass} />
          </Field>
          <Field label="City" required>
            <input type="text" required value={form.city} onChange={(e) => set('city', e.target.value)} className={inputClass} />
          </Field>
          <Field label="Postal Code" required>
            <input type="text" required maxLength={4} value={form.postalCode} onChange={(e) => set('postalCode', e.target.value)} className={inputClass} />
          </Field>
          <Field label="Years at this Address">
            <input type="text" value={form.yearsAtAddress} onChange={(e) => set('yearsAtAddress', e.target.value)} className={inputClass} placeholder="e.g. 3 years" />
          </Field>
        </div>
      </section>

      {/* Section 3: Employment */}
      <section className="bg-card rounded-2xl p-6 md:p-8 border border-gray-100 shadow-sm">
        <SectionHeader number="3" title="Employment Details" subtitle="Your current employer information" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Employer / Company Name" required>
            <input type="text" required value={form.employerName} onChange={(e) => set('employerName', e.target.value)} className={inputClass} />
          </Field>
          <Field label="Occupation / Job Title" required>
            <input type="text" required value={form.occupation} onChange={(e) => set('occupation', e.target.value)} className={inputClass} />
          </Field>
          <Field label="Years Employed">
            <input type="text" value={form.employmentYears} onChange={(e) => set('employmentYears', e.target.value)} className={inputClass} placeholder="e.g. 5 years" />
          </Field>
          <Field label="Employer Phone">
            <input type="tel" value={form.employerPhone} onChange={(e) => set('employerPhone', e.target.value)} className={inputClass} />
          </Field>
          <div className="sm:col-span-2">
            <Field label="Employer Address">
              <input type="text" value={form.employerAddress} onChange={(e) => set('employerAddress', e.target.value)} className={inputClass} />
            </Field>
          </div>
        </div>
      </section>

      {/* Section 4: Income & Expenses */}
      <section className="bg-card rounded-2xl p-6 md:p-8 border border-gray-100 shadow-sm">
        <SectionHeader number="4" title="Income & Expenses" subtitle="Monthly amounts in Rands" />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <Field label="Gross Monthly Income" required>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted text-sm">R</span>
              <input type="number" required min={0} value={form.grossIncome} onChange={(e) => set('grossIncome', e.target.value)} className={`${inputClass} pl-8`} />
            </div>
          </Field>
          <Field label="Net Monthly Income" required>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted text-sm">R</span>
              <input type="number" required min={0} value={form.netIncome} onChange={(e) => set('netIncome', e.target.value)} className={`${inputClass} pl-8`} />
            </div>
          </Field>
          <Field label="Total Monthly Expenses" required>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted text-sm">R</span>
              <input type="number" required min={0} value={form.totalExpenses} onChange={(e) => set('totalExpenses', e.target.value)} className={`${inputClass} pl-8`} />
            </div>
          </Field>
        </div>

        <p className="text-sm text-text-muted mb-3 font-medium">Expense Breakdown (optional but helps approval)</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {[
            { key: 'bondRent' as const, label: 'Bond / Rent' },
            { key: 'vehicleInstalments' as const, label: 'Vehicle Instalments' },
            { key: 'insurance' as const, label: 'Insurance' },
            { key: 'groceries' as const, label: 'Groceries' },
            { key: 'otherExpenses' as const, label: 'Other' },
          ].map((exp) => (
            <Field key={exp.key} label={exp.label}>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted text-sm">R</span>
                <input type="number" min={0} value={form[exp.key]} onChange={(e) => set(exp.key, e.target.value)} className={`${inputClass} pl-8`} />
              </div>
            </Field>
          ))}
        </div>
      </section>

      {/* Section 5: Banking */}
      <section className="bg-card rounded-2xl p-6 md:p-8 border border-gray-100 shadow-sm">
        <SectionHeader number="5" title="Banking Details" subtitle="Your primary bank account" />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Field label="Bank" required>
            <select value={form.bankName} onChange={(e) => set('bankName', e.target.value)} required className={selectClass}>
              <option value="">Select...</option>
              {BANK_OPTIONS.map((b) => <option key={b} value={b}>{b}</option>)}
            </select>
          </Field>
          <Field label="Account Type" required>
            <select value={form.accountType} onChange={(e) => set('accountType', e.target.value)} required className={selectClass}>
              <option value="">Select...</option>
              {ACCOUNT_TYPE_OPTIONS.map((a) => <option key={a} value={a}>{a}</option>)}
            </select>
          </Field>
          <Field label="Account Holder Name" required>
            <input type="text" required value={form.accountHolder} onChange={(e) => set('accountHolder', e.target.value)} className={inputClass} />
          </Field>
        </div>
      </section>

      {/* Section 6: Vehicle */}
      <section className="bg-card rounded-2xl p-6 md:p-8 border border-gray-100 shadow-sm">
        <SectionHeader number="6" title="Vehicle of Interest" subtitle="Which vehicle are you looking at?" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Vehicle">
            <select value={form.vehicleInterest} onChange={(e) => set('vehicleInterest', e.target.value)} className={selectClass}>
              <option value="">Select a vehicle (optional)</option>
              {vehicleOptions.map((v) => <option key={v} value={v}>{v}</option>)}
              <option value="Not sure yet">Not sure yet — browsing options</option>
            </select>
          </Field>
          <Field label="Deposit Available">
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted text-sm">R</span>
              <input type="number" min={0} value={form.depositAmount} onChange={(e) => set('depositAmount', e.target.value)} className={`${inputClass} pl-8`} placeholder="0 if none" />
            </div>
          </Field>
        </div>
      </section>

      {/* Consent + Submit */}
      <section className="bg-card rounded-2xl p-6 md:p-8 border border-gray-100 shadow-sm">
        <label className="flex items-start gap-3 cursor-pointer mb-6">
          <input
            type="checkbox"
            checked={form.consent}
            onChange={(e) => set('consent', e.target.checked)}
            className="mt-1 w-5 h-5 rounded border-gray-300 text-accent focus:ring-accent"
          />
          <span className="text-sm text-text-muted leading-relaxed">
            I hereby authorise Trade Wheels and its finance partners to make credit enquiries and verify the information I have provided for the purpose of assessing my finance application. I understand that my personal information will be handled in accordance with the Protection of Personal Information Act (POPIA).
          </span>
        </label>

        {status === 'error' && (
          <p className="text-red-600 text-sm mb-4">{errorMsg}</p>
        )}

        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full bg-accent hover:bg-accent-dark disabled:opacity-50 text-white font-bold py-4 rounded-xl transition-all hover:shadow-lg hover:shadow-accent/20 active:scale-[0.99] text-lg"
        >
          {status === 'loading' ? 'Submitting Application...' : 'Submit Finance Application'}
        </button>

        <p className="text-xs text-text-muted text-center mt-4">
          Your information is secure and will only be used for the purpose of this finance application.
        </p>
      </section>
    </form>
  );
}
