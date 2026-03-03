import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { FinanceApplication } from '@/lib/finance-types';

const resend = new Resend(process.env.RESEND_API_KEY);
const FINANCE_EMAIL = process.env.FINANCE_EMAIL || 'info@tradewheels.co.za';

function formatCurrency(val: string): string {
  if (!val) return 'N/A';
  const num = parseFloat(val);
  if (isNaN(num)) return val;
  return `R ${num.toLocaleString('en-ZA')}`;
}

function buildEmailHtml(app: FinanceApplication): string {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 700px; margin: 0 auto; color: #1a2138;">
      <div style="background: #1a1a1a; padding: 24px 32px; border-radius: 12px 12px 0 0;">
        <h1 style="color: white; margin: 0; font-size: 22px;">New Finance Application</h1>
        <p style="color: rgba(255,255,255,0.6); margin: 4px 0 0 0; font-size: 14px;">Submitted via TradeWheels.co.za</p>
      </div>

      <div style="background: white; padding: 32px; border: 1px solid #e5e7eb; border-top: none;">
        ${app.vehicleInterest ? `
        <div style="background: #fef2f2; border: 1px solid #fecaca; border-radius: 8px; padding: 16px; margin-bottom: 24px;">
          <strong style="color: #e63946;">Vehicle of Interest:</strong> ${app.vehicleInterest}<br/>
          ${app.depositAmount ? `<strong>Deposit Available:</strong> ${formatCurrency(app.depositAmount)}` : ''}
        </div>` : ''}

        <h2 style="font-size: 16px; color: #1a1a1a; border-bottom: 2px solid #e5e7eb; padding-bottom: 8px;">Personal Details</h2>
        <table style="width: 100%; font-size: 14px; border-collapse: collapse; margin-bottom: 24px;">
          <tr><td style="padding: 6px 0; color: #6b7280; width: 40%;">Name</td><td style="padding: 6px 0; font-weight: 600;">${app.title} ${app.firstName} ${app.lastName}</td></tr>
          <tr><td style="padding: 6px 0; color: #6b7280;">ID Number</td><td style="padding: 6px 0; font-weight: 600;">${app.idNumber}</td></tr>
          <tr><td style="padding: 6px 0; color: #6b7280;">Cellphone</td><td style="padding: 6px 0; font-weight: 600;">${app.cellphone}</td></tr>
          <tr><td style="padding: 6px 0; color: #6b7280;">Email</td><td style="padding: 6px 0; font-weight: 600;">${app.email}</td></tr>
          <tr><td style="padding: 6px 0; color: #6b7280;">Gender</td><td style="padding: 6px 0;">${app.gender || 'N/A'}</td></tr>
          <tr><td style="padding: 6px 0; color: #6b7280;">Marital Status</td><td style="padding: 6px 0;">${app.maritalStatus}</td></tr>
          <tr><td style="padding: 6px 0; color: #6b7280;">Dependants</td><td style="padding: 6px 0;">${app.dependants || '0'}</td></tr>
        </table>

        <h2 style="font-size: 16px; color: #1a1a1a; border-bottom: 2px solid #e5e7eb; padding-bottom: 8px;">Address</h2>
        <table style="width: 100%; font-size: 14px; border-collapse: collapse; margin-bottom: 24px;">
          <tr><td style="padding: 6px 0; color: #6b7280; width: 40%;">Street</td><td style="padding: 6px 0;">${app.streetAddress}</td></tr>
          <tr><td style="padding: 6px 0; color: #6b7280;">Suburb</td><td style="padding: 6px 0;">${app.suburb}</td></tr>
          <tr><td style="padding: 6px 0; color: #6b7280;">City</td><td style="padding: 6px 0;">${app.city}, ${app.postalCode}</td></tr>
          <tr><td style="padding: 6px 0; color: #6b7280;">Years at Address</td><td style="padding: 6px 0;">${app.yearsAtAddress || 'N/A'}</td></tr>
        </table>

        <h2 style="font-size: 16px; color: #1a1a1a; border-bottom: 2px solid #e5e7eb; padding-bottom: 8px;">Employment</h2>
        <table style="width: 100%; font-size: 14px; border-collapse: collapse; margin-bottom: 24px;">
          <tr><td style="padding: 6px 0; color: #6b7280; width: 40%;">Employer</td><td style="padding: 6px 0; font-weight: 600;">${app.employerName}</td></tr>
          <tr><td style="padding: 6px 0; color: #6b7280;">Occupation</td><td style="padding: 6px 0;">${app.occupation}</td></tr>
          <tr><td style="padding: 6px 0; color: #6b7280;">Years Employed</td><td style="padding: 6px 0;">${app.employmentYears || 'N/A'}</td></tr>
          <tr><td style="padding: 6px 0; color: #6b7280;">Employer Phone</td><td style="padding: 6px 0;">${app.employerPhone || 'N/A'}</td></tr>
          <tr><td style="padding: 6px 0; color: #6b7280;">Employer Address</td><td style="padding: 6px 0;">${app.employerAddress || 'N/A'}</td></tr>
        </table>

        <h2 style="font-size: 16px; color: #1a1a1a; border-bottom: 2px solid #e5e7eb; padding-bottom: 8px;">Income & Expenses (Monthly)</h2>
        <table style="width: 100%; font-size: 14px; border-collapse: collapse; margin-bottom: 12px;">
          <tr style="background: #f0fdf4;"><td style="padding: 8px; color: #6b7280;">Gross Income</td><td style="padding: 8px; font-weight: 700; color: #16a34a;">${formatCurrency(app.grossIncome)}</td></tr>
          <tr style="background: #f0fdf4;"><td style="padding: 8px; color: #6b7280;">Net Income</td><td style="padding: 8px; font-weight: 700; color: #16a34a;">${formatCurrency(app.netIncome)}</td></tr>
          <tr style="background: #fef2f2;"><td style="padding: 8px; color: #6b7280;">Total Expenses</td><td style="padding: 8px; font-weight: 700; color: #e63946;">${formatCurrency(app.totalExpenses)}</td></tr>
        </table>
        <table style="width: 100%; font-size: 13px; border-collapse: collapse; margin-bottom: 24px; color: #6b7280;">
          <tr><td style="padding: 4px 0;">Bond/Rent: ${formatCurrency(app.bondRent)}</td><td style="padding: 4px 0;">Vehicle Instalments: ${formatCurrency(app.vehicleInstalments)}</td></tr>
          <tr><td style="padding: 4px 0;">Insurance: ${formatCurrency(app.insurance)}</td><td style="padding: 4px 0;">Groceries: ${formatCurrency(app.groceries)}</td></tr>
          <tr><td style="padding: 4px 0;">Other: ${formatCurrency(app.otherExpenses)}</td><td></td></tr>
        </table>

        <h2 style="font-size: 16px; color: #1a1a1a; border-bottom: 2px solid #e5e7eb; padding-bottom: 8px;">Banking</h2>
        <table style="width: 100%; font-size: 14px; border-collapse: collapse; margin-bottom: 24px;">
          <tr><td style="padding: 6px 0; color: #6b7280; width: 40%;">Bank</td><td style="padding: 6px 0;">${app.bankName}</td></tr>
          <tr><td style="padding: 6px 0; color: #6b7280;">Account Type</td><td style="padding: 6px 0;">${app.accountType}</td></tr>
          <tr><td style="padding: 6px 0; color: #6b7280;">Account Holder</td><td style="padding: 6px 0;">${app.accountHolder}</td></tr>
        </table>

        <div style="background: #f7f8fa; border-radius: 8px; padding: 12px 16px; font-size: 12px; color: #6b7280;">
          Submitted at ${new Date().toLocaleString('en-ZA', { timeZone: 'Africa/Johannesburg' })} SAST.
          Applicant has consented to credit checks under POPIA.
        </div>
      </div>
    </div>
  `;
}

export async function POST(req: NextRequest) {
  try {
    const body: FinanceApplication = await req.json();

    if (!body.firstName || !body.lastName || !body.idNumber || !body.cellphone || !body.email) {
      return NextResponse.json({ error: 'Required fields are missing' }, { status: 400 });
    }

    if (!body.consent) {
      return NextResponse.json({ error: 'Consent is required' }, { status: 400 });
    }

    const { error } = await resend.emails.send({
      from: 'Trade Wheels Finance <onboarding@resend.dev>',
      to: [FINANCE_EMAIL],
      subject: `Finance Application: ${body.title} ${body.firstName} ${body.lastName}${body.vehicleInterest ? ` — ${body.vehicleInterest}` : ''}`,
      html: buildEmailHtml(body),
    });

    if (error) {
      console.error('Resend error:', error);
      throw new Error('Email delivery failed');
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Finance submission error:', err);
    return NextResponse.json(
      { error: 'Failed to submit application. Please call us directly.' },
      { status: 500 }
    );
  }
}
