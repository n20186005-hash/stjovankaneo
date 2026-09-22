import type { MetadataRoute } from 'next';

const DOMAIN = 'https://stjovankaneo.com';
const locales = ['mk', 'zh', 'en'] as const;
// cookie-settings is a low-value client-only page; keep it out of the sitemap.
const paths = ['', '/privacy-policy', '/terms-of-service'] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const path of paths) {
      entries.push({
        url: `${DOMAIN}/${locale}${path}`,
        lastModified: new Date(),
        changeFrequency: path === '' ? 'weekly' : 'monthly',
        priority: path === '' ? 1 : 0.4,
      });
    }
  }

  return entries;
}
