'use client';

import { trackPhoneClick, trackWhatsAppClick, trackSocialClick } from '@/lib/analytics';

type TrackEvent =
  | { type: 'phone'; location: string }
  | { type: 'whatsapp'; location: string }
  | { type: 'social'; platform: 'facebook' | 'instagram' | 'youtube'; location: string };

interface TrackedLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  track: TrackEvent;
  children: React.ReactNode;
}

export default function TrackedLink({ track, children, ...props }: TrackedLinkProps) {
  const handleClick = () => {
    switch (track.type) {
      case 'phone':
        trackPhoneClick(track.location);
        break;
      case 'whatsapp':
        trackWhatsAppClick(track.location);
        break;
      case 'social':
        trackSocialClick(track.platform, track.location);
        break;
    }
  };

  return (
    <a onClick={handleClick} {...props}>
      {children}
    </a>
  );
}
