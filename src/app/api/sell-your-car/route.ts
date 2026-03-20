import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { submitLead } from '@/lib/leads';
import { LeadPayload } from '@/lib/types';

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

    // Send email notification and submit lead to CRM in parallel
    const lead: LeadPayload = {
      DealerID: parseInt(process.env.LEADS_DEALER_ID || '355', 10),
      ExternalLeadID: `TW-SELL-${Date.now()}`,
      FirstName: body.firstName,
      LastName: body.lastName,
      ContactNumber: body.phone,
      EmailAddress: body.email || undefined,
      Comments: [
        `Wants to SELL: ${body.vehicleYear} ${body.vehicleMake} ${body.vehicleModel}`,
        `Mileage: ${body.mileage}km`,
        `Condition: ${body.condition}`,
        `Service History: ${body.serviceHistory}`,
        `Warranty: ${body.hasWarranty}`,
        body.askingPrice ? `Asking: ${body.askingPrice}` : null,
        body.vinNumber ? `VIN: ${body.vinNumber}` : null,
        body.message ? `Notes: ${body.message}` : null,
      ].filter(Boolean).join('. '),
      VehicleBrand: body.vehicleMake,
      Vehicle: `${body.vehicleMake} ${body.vehicleModel}`,
      ModelYear: body.vehicleYear,
      NewUsed: 'Used',
      LeadOrigin: 'TradeWheels.co.za - Sell My Car',
    };

    const [emailResult, leadResult] = await Promise.allSettled([
      resend.emails.send({
        from: 'Trade Wheels <onboarding@resend.dev>',
        to: [FINANCE_EMAIL],
        subject: `Sell My Car: ${body.vehicleYear} ${body.vehicleMake} ${body.vehicleModel} — ${body.firstName} ${body.lastName}`,
        html: buildEmailHtml(body),
      }),
      submitLead(lead),
    ]);

    // Log any failures
    if (leadResult.status === 'rejected') {
      console.error('ESLeads submission failed (sell):', leadResult.reason);
    }
    if (emailResult.status === 'rejected') {
      console.error('Email send failed (sell):', emailResult.reason);
    } else if (emailResult.value.error) {
      console.error('Resend error (sell):', emailResult.value.error);
    }

    // Succeed if at least one channel worked
    const emailOk = emailResult.status === 'fulfilled' && !emailResult.value.error;
    const leadOk = leadResult.status === 'fulfilled';
    if (!emailOk && !leadOk) {
      throw new Error('Both email and lead submission failed');
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
