import type { MetadataRoute } from 'next';

const DOMAIN = 'https://stjovankaneo.com';
const locales = ['mk', 'zh', 'en'] as const;
// cookie-settings is a low-value client-only page; keep it out of the sitemap.
const paths = [
  '',
  '/privacy-policy',
  '/terms-of-service',
  '/how-to-get-to-st-john-at-kaneo',
  '/opening-hours',
  '/photo-spots',
  '/history',
  '/ohrid-old-town-walking-route',
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const path of paths) {
      entries.push({
        url: `${DOMAIN}/${locale}${path}`,
        lastModified: new Date(),
        changeFrequency: path === '' ? 'weekly' : 'monthly',
        priority: path === '' ? 1 : path === '/privacy-policy' || path === '/terms-of-service' ? 0.4 : 0.6,
      });
    }
  }

  return entries;
}
