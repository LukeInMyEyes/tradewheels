import { NextRequest, NextResponse } from 'next/server';
import { submitLead } from '@/lib/leads';
import { LeadPayload, EnquiryFormData } from '@/lib/types';

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
      ExternalLeadID: `TW-${Date.now()}`,
      FirstName: body.firstName,
      LastName: body.lastName,
      ContactNumber: body.phone,
      EmailAddress: body.email || undefined,
      Comments: body.message || undefined,
      VehicleBrand: body.make || undefined,
      Vehicle: body.model || undefined,
      StockNo: body.stockNumber || undefined,
      NewUsed: 'Used',
      LeadOrigin: 'TradeWheels.co.za',
    };

    const result = await submitLead(lead);
    return NextResponse.json(result);
  } catch (err) {
    console.error('Enquiry submission error:', err);
    return NextResponse.json(
      { error: 'Failed to submit enquiry. Please try again or call us directly.' },
      { status: 500 }
    );
  }
}
