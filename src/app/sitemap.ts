import { MetadataRoute } from 'next';
import { getVehicles } from '@/lib/feed';
import { DEALER } from '@/lib/constants';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const vehicles = await getVehicles();

  const vehicleUrls = vehicles.map((v) => ({
    url: `${DEALER.siteUrl}/vehicles/${v.stockNumber}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.8,
  }));

  return [
    {
      url: DEALER.siteUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${DEALER.siteUrl}/vehicles`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${DEALER.siteUrl}/sell-your-car`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${DEALER.siteUrl}/finance`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${DEALER.siteUrl}/faq`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${DEALER.siteUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    ...vehicleUrls,
  ];
}
