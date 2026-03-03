import { LeadPayload } from './types';

const BASE_URL = process.env.LEADS_API_BASE!;
const USERNAME = process.env.LEADS_USERNAME!;
const PASSWORD = process.env.LEADS_PASSWORD!;
const CLIENT_ID = process.env.LEADS_CLIENT_ID!;
const CLIENT_SECRET = process.env.LEADS_CLIENT_SECRET!;

async function getToken(): Promise<string> {
  const res = await fetch(`${BASE_URL}/Oauth2/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      Username: USERNAME,
      Password: PASSWORD,
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
    }),
  });

  if (!res.ok) {
    throw new Error(`OAuth login failed: ${res.status}`);
  }

  const data = await res.json();
  return data.access_token || data.token;
}

export async function submitLead(lead: LeadPayload): Promise<{ success: boolean; message: string }> {
  const token = await getToken();

  const res = await fetch(`${BASE_URL}/api/leads`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(lead),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Lead submission failed: ${res.status} — ${text}`);
  }

  return { success: true, message: 'Enquiry submitted successfully' };
}
