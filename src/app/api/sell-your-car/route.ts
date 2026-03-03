import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const FINANCE_EMAIL = process.env.FINANCE_EMAIL || 'info@tradewheels.co.za';

interface SellCarForm {
  firstName: string;
  lastName: string;
  phone: string;
  email?: string;
  vehicleMake: string;
  vehicleModel: string;
  vehicleYear: string;
  mileage: string;
  vinNumber?: string;
  serviceHistory: string;
  hasWarranty: string;
  warrantyEndDate?: string;
  warrantyEndMileage?: string;
  condition: string;
  askingPrice?: string;
  message?: string;
}

function buildEmailHtml(form: SellCarForm): string {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #111;">
      <div style="background: #1a1a1a; padding: 24px 32px; border-radius: 12px 12px 0 0;">
        <h1 style="color: white; margin: 0; font-size: 22px;">Sell My Car Enquiry</h1>
        <p style="color: rgba(255,255,255,0.6); margin: 4px 0 0 0; font-size: 14px;">Submitted via TradeWheels.co.za</p>
      </div>

      <div style="background: white; padding: 32px; border: 1px solid #e5e7eb; border-top: none;">
        <div style="background: #fef2f2; border: 1px solid #fecaca; border-radius: 8px; padding: 16px; margin-bottom: 24px;">
          <strong style="color: #C00000; font-size: 16px;">${form.vehicleYear} ${form.vehicleMake} ${form.vehicleModel}</strong><br/>
          <span style="color: #555;">Mileage: ${Number(form.mileage).toLocaleString('en-ZA')} km | Condition: ${form.condition}</span>
          ${form.vinNumber ? `<br/><span style="color: #555;">VIN: ${form.vinNumber}</span>` : ''}
          <br/><span style="color: #555;">Service History: ${form.serviceHistory}</span>
          <br/><span style="color: #555;">Warranty: ${form.hasWarranty}${form.hasWarranty === 'Yes' && form.warrantyEndDate ? ` (expires ${form.warrantyEndDate})` : ''}${form.hasWarranty === 'Yes' && form.warrantyEndMileage ? ` / ${Number(form.warrantyEndMileage).toLocaleString('en-ZA')} km` : ''}</span>
          ${form.askingPrice ? `<br/><strong>Asking: ${form.askingPrice}</strong>` : ''}
        </div>

        <h2 style="font-size: 16px; color: #1a1a1a; border-bottom: 2px solid #e5e7eb; padding-bottom: 8px;">Seller Details</h2>
        <table style="width: 100%; font-size: 14px; border-collapse: collapse; margin-bottom: 24px;">
          <tr><td style="padding: 6px 0; color: #555; width: 35%;">Name</td><td style="padding: 6px 0; font-weight: 600;">${form.firstName} ${form.lastName}</td></tr>
          <tr><td style="padding: 6px 0; color: #555;">Phone</td><td style="padding: 6px 0; font-weight: 600;">${form.phone}</td></tr>
          ${form.email ? `<tr><td style="padding: 6px 0; color: #555;">Email</td><td style="padding: 6px 0;">${form.email}</td></tr>` : ''}
        </table>

        ${form.message ? `
        <h2 style="font-size: 16px; color: #1a1a1a; border-bottom: 2px solid #e5e7eb; padding-bottom: 8px;">Additional Info</h2>
        <p style="font-size: 14px; color: #333; white-space: pre-wrap;">${form.message}</p>
        ` : ''}

        <div style="background: #f5f5f5; border-radius: 8px; padding: 12px 16px; font-size: 12px; color: #555; margin-top: 24px;">
          Submitted at ${new Date().toLocaleString('en-ZA', { timeZone: 'Africa/Johannesburg' })} SAST
        </div>
      </div>
    </div>
  `;
}

export async function POST(req: NextRequest) {
  try {
    const body: SellCarForm = await req.json();

    if (!body.firstName || !body.lastName || !body.phone || !body.vehicleMake || !body.vehicleModel || !body.vehicleYear || !body.mileage || !body.serviceHistory || !body.hasWarranty || !body.condition) {
      return NextResponse.json({ error: 'Required fields are missing' }, { status: 400 });
    }

    const { error } = await resend.emails.send({
      from: 'Trade Wheels <onboarding@resend.dev>',
      to: [FINANCE_EMAIL],
      subject: `Sell My Car: ${body.vehicleYear} ${body.vehicleMake} ${body.vehicleModel} — ${body.firstName} ${body.lastName}`,
      html: buildEmailHtml(body),
    });

    if (error) {
      console.error('Resend error:', error);
      throw new Error('Email delivery failed');
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Sell car submission error:', err);
    return NextResponse.json(
      { error: 'Failed to submit. Please call us directly.' },
      { status: 500 }
    );
  }
}
