// GA4 Event Tracking for Trade Wheels
// Measurement ID: G-53NLFJVE07

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
    dataLayer: unknown[];
  }
}

// Safe wrapper — gtag may not be loaded (ad blockers, dev, SSR)
function gtag(...args: unknown[]) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag(...args);
  }
}

/** Phone call link clicked */
export function trackPhoneClick(location: string) {
  gtag('event', 'phone_click', {
    event_category: 'contact',
    event_label: location,
  });
}

/** WhatsApp link clicked */
export function trackWhatsAppClick(location: string) {
  gtag('event', 'whatsapp_click', {
    event_category: 'contact',
    event_label: location,
  });
}

/** Lead form submitted successfully */
export function trackFormSubmission(
  formType: 'enquiry' | 'finance' | 'sell_your_car',
  metadata?: Record<string, string>,
) {
  gtag('event', 'form_submission', {
    event_category: 'lead',
    event_label: formType,
    ...metadata,
  });
}

/** Social media link clicked */
export function trackSocialClick(
  platform: 'facebook' | 'instagram' | 'youtube',
  location: string,
) {
  gtag('event', 'social_click', {
    event_category: 'social',
    event_label: platform,
    link_location: location,
  });
}
