import { LeadPayload } from './types';

const BASE_URL = (process.env.LEADS_API_BASE || '').trim();
const USERNAME = (process.env.LEADS_USERNAME || '').trim();
const PASSWORD = (process.env.LEADS_PASSWORD || '').trim();
const CLIENT_ID = (process.env.LEADS_CLIENT_ID || '').trim();
const CLIENT_SECRET = (process.env.LEADS_CLIENT_SECRET || '').trim();

async function getToken(): Promise<string> {
  // OAuth2 endpoint requires x-www-form-urlencoded (per ES API docs)
  const params = new URLSearchParams();
  params.append('grant_type', 'password');
  params.append('client_id', CLIENT_ID);
  params.append('client_secret', CLIENT_SECRET);
  params.append('username', USERNAME);
  params.append('password', PASSWORD);

  const res = await fetch(`${BASE_URL}/Oauth2/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params.toString(),
  });

  if (!res.ok) {
    const text = await res.text();
    console.error('OAuth login failed:', res.status, text);
    throw new Error(`OAuth login failed: ${res.status} — ${text}`);
  }

  const data = await res.json();
  if (!data.access_token) {
    console.error('OAuth response missing access_token:', data);
    throw new Error('OAuth response missing access_token');
  }
  return data.access_token;
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

  const responseText = await res.text();

  if (!res.ok) {
    console.error('Lead submission failed:', res.status, responseText);
    throw new Error(`Lead submission failed: ${res.status} — ${responseText}`);
  }

  // Parse the ES response: { SubID, Success, Message }
  try {
    const esResponse = JSON.parse(responseText);
    if (esResponse.Success === false) {
      console.error('ESLeads rejected lead:', esResponse.Message);
      throw new Error(`ESLeads rejected: ${esResponse.Message}`);
    }
    console.log('ESLeads submitted successfully, SubID:', esResponse.SubID);
    return { success: true, message: esResponse.Message || 'Lead submitted' };
  } catch {
    // If response isn't JSON but status was 200, still treat as success
    return { success: true, message: 'Lead submitted' };
  }
}
