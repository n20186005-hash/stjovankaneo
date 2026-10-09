import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const routing = defineRouting({
  locales: ['mk', 'zh', 'en'],
  defaultLocale: 'mk',
  localePrefix: {
    mode: 'always',
  },
  pathnames: {
    '/': '/',
    '/privacy-policy': '/privacy-policy',
    '/terms-of-service': '/terms-of-service',
    '/cookie-settings': '/cookie-settings',
    '/how-to-get-to-st-john-at-kaneo': '/how-to-get-to-st-john-at-kaneo',
    '/opening-hours': '/opening-hours',
    '/photo-spots': '/photo-spots',
    '/history': '/history',
    '/ohrid-old-town-walking-route': '/ohrid-old-town-walking-route',
  },
});

export type Locale = (typeof routing.locales)[number];

export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing);
