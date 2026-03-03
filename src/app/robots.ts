import { MetadataRoute } from 'next';
import { DEALER } from '@/lib/constants';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${DEALER.siteUrl}/sitemap.xml`,
  };
}
