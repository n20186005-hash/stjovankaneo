import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import CookieSettingsClient from './CookieSettingsClient';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const baseUrl = 'https://stjovankaneo.com';
  const mkUrl = `${baseUrl}/mk/cookie-settings`;
  const zhUrl = `${baseUrl}/zh/cookie-settings`;
  const enUrl = `${baseUrl}/en/cookie-settings`;
  const selfUrl = locale === 'zh' ? zhUrl : locale === 'en' ? enUrl : mkUrl;

  return {
    alternates: {
      canonical: selfUrl,
      languages: {
        'mk': mkUrl,
        'en': enUrl,
        'zh': zhUrl,
        'x-default': mkUrl,
      },
    },
  };
}

export default async function CookiePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <CookieSettingsClient />;
}
