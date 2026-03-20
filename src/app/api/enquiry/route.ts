import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { submitLead } from '@/lib/leads';
import { LeadPayload, EnquiryFormData } from '@/lib/types';

const resend = new Resend(process.env.RESEND_API_KEY);
const FINANCE_EMAIL = process.env.FINANCE_EMAIL || 'info@tradewheels.co.za';

function buildEmailHtml(form: EnquiryFormData): string {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #111;">
      <div style="background: #1a1a1a; padding: 24px 32px; border-radius: 12px 12px 0 0;">
        <h1 style="color: white; margin: 0; font-size: 22px;">New Vehicle Enquiry</h1>
        <p style="color: rgba(255,255,255,0.6); margin: 4px 0 0 0; font-size: 14px;">Submitted via TradeWheels.co.za</p>
      </div>

      <div style="background: white; padding: 32px; border: 1px solid #e5e7eb; border-top: none;">
        ${form.make || form.model || form.stockNumber ? `
        <div style="background: #fef2f2; border: 1px solid #fecaca; border-radius: 8px; padding: 16px; margin-bottom: 24px;">
          <strong style="color: #C00000;">${form.year ? `${form.year} ` : ''}${form.make || ''} ${form.model || ''}</strong>
          ${form.stockNumber ? `<br/><span style="color: #555;">Stock #: ${form.stockNumber}</span>` : ''}
        </div>` : ''}

        <h2 style="font-size: 16px; color: #1a1a1a; border-bottom: 2px solid #e5e7eb; padding-bottom: 8px;">Contact Details</h2>
        <table style="width: 100%; font-size: 14px; border-collapse: collapse; margin-bottom: 24px;">
          <tr><td style="padding: 6px 0; color: #555; width: 35%;">Name</td><td style="padding: 6px 0; font-weight: 600;">${form.firstName} ${form.lastName}</td></tr>
          <tr><td style="padding: 6px 0; color: #555;">Phone</td><td style="padding: 6px 0; font-weight: 600;">${form.phone}</td></tr>
          ${form.email ? `<tr><td style="padding: 6px 0; color: #555;">Email</td><td style="padding: 6px 0;">${form.email}</td></tr>` : ''}
        </table>

        ${form.message ? `
        <h2 style="font-size: 16px; color: #1a1a1a; border-bottom: 2px solid #e5e7eb; padding-bottom: 8px;">Message</h2>
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
    const body: EnquiryFormData = await req.json();

    if (!body.firstName || !body.lastName || !body.phone) {
      return NextResponse.json(
        { error: 'First name, last name, and phone number are required' },
        { status: 400 }
      );
    }

    const lead: LeadPayload = {
      DealerID: parseInt(process.env.LEADS_DEALER_ID || '355', 10),
      ExternalLeadID: `TW-ENQ-${Date.now()}`,
      FirstName: body.firstName,
      LastName: body.lastName,
      ContactNumber: body.phone,
      EmailAddress: body.email || undefined,
      Comments: body.message || undefined,
      VehicleBrand: body.make || undefined,
      Vehicle: body.model ? `${body.make || ''} ${body.model}`.trim() : undefined,
      ModelYear: body.year ? String(body.year) : undefined,
      StockNo: body.stockNumber || undefined,
      NewUsed: 'Used',
      LeadOrigin: 'TradeWheels.co.za',
    };

    const vehicleDesc = [body.year, body.make, body.model].filter(Boolean).join(' ');

    // Send email notification and submit lead to CRM in parallel
    const [emailResult, leadResult] = await Promise.allSettled([
      resend.emails.send({
        from: 'Trade Wheels <onboarding@resend.dev>',
        to: [FINANCE_EMAIL],
        subject: `Vehicle Enquiry: ${body.firstName} ${body.lastName}${vehicleDesc ? ` — ${vehicleDesc}` : ''}`,
        html: buildEmailHtml(body),
      }),
      submitLead(lead),
    ]);

    // Log any failures
    if (leadResult.status === 'rejected') {
      console.error('ESLeads submission failed (enquiry):', leadResult.reason);
    }
    if (emailResult.status === 'rejected') {
      console.error('Email send failed (enquiry):', emailResult.reason);
    }

    // Succeed if at least one channel worked
    if (emailResult.status === 'rejected' && leadResult.status === 'rejected') {
      throw new Error('Both email and lead submission failed');
    }

    return NextResponse.json({ success: true, message: 'Enquiry submitted successfully' });
  } catch (err) {
    console.error('Enquiry submission error:', err);
    return NextResponse.json(
      { error: 'Failed to submit enquiry. Please try again or call us directly.' },
      { status: 500 }
    );
  }
}
