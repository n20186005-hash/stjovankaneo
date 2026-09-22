import type { MetadataRoute } from 'next';

const DOMAIN = 'https://stjovankaneo.com';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/cookie-settings'],
    },
    sitemap: `${DOMAIN}/sitemap.xml`,
    host: DOMAIN,
  };
}
