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
  },
});

export type Locale = (typeof routing.locales)[number];

export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing);
