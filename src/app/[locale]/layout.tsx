import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import type { Metadata } from 'next';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const DOMAIN = 'https://stjovankaneo.com';
const HERO_IMAGE = `${DOMAIN}/gallery/Church%20of%20Saint%20Jovan%20the%20Theologian%20at%20Kaneo_20.jpg`;
const MAPS_SHARE_URL = 'https://maps.app.goo.gl/HgjyeMiaoUm4q8S6A';
const GOVT_TOURISM_URL = 'https://www.macedonia-timeless.com/';
const LATITUDE = 41.1110753;
const LONGITUDE = 20.7887506;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const messages = (await import(`@/messages/${locale}.json`)).default;

  const zhUrl = `${DOMAIN}/`;
  const enUrl = `${DOMAIN}/en`;
  const selfUrl = locale === 'zh' ? zhUrl : enUrl;

  const siteName = locale === 'zh' ? '圣约翰卡内奥教堂' : 'St. John at Kaneo';
  const ogLocale = locale === 'zh' ? 'zh_CN' : 'en_US';

  return {
    metadataBase: new URL(DOMAIN),
    title: messages.meta.title,
    description: messages.meta.description,
    alternates: {
      canonical: selfUrl,
      languages: {
        'zh': zhUrl,
        'en': enUrl,
        'x-default': zhUrl,
      },
    },
    openGraph: {
      title: messages.meta.ogTitle || messages.meta.title,
      description: messages.meta.ogDescription || messages.meta.description,
      url: selfUrl,
      siteName,
      locale: ogLocale,
      type: 'website',
      images: [
        {
          url: HERO_IMAGE,
          width: 1200,
          height: 630,
          alt: locale === 'zh'
            ? '圣约翰卡内奥教堂 - 北马其顿奥赫里德湖畔地标'
            : 'Church of St. John at Kaneo - Iconic Landmark on Lake Ohrid, North Macedonia',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: messages.meta.title,
      description: messages.meta.description,
      images: [HERO_IMAGE],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  const fullNameEn = 'Church of Saint John the Theologian at Kaneo';
  const shortNameEn = 'St. John at Kaneo';
  const fullNameZh = '圣约翰神学家教堂（卡内奥）';
  const shortNameZh = '圣约翰卡内奥教堂';
  const fullName = locale === 'zh' ? fullNameZh : fullNameEn;
  const shortName = locale === 'zh' ? shortNameZh : shortNameEn;
  const cityEn = 'Ohrid';
  const cityZh = '奥赫里德';
  const city = locale === 'zh' ? cityZh : cityEn;
  const countryEn = 'North Macedonia';
  const countryZh = '北马其顿';
  const country = locale === 'zh' ? countryZh : countryEn;

  const touristAttractionLd = {
    '@context': 'https://schema.org',
    '@type': 'TouristAttraction',
    '@id': `${DOMAIN}/#attraction`,
    name: fullName,
    alternateName: [
      shortName,
      `${city} ${fullName}`,
      'Црква Свети Јован Богослов',
      'Црква „Св. Јован Канео“',
    ],
    description: locale === 'zh'
      ? `北马其顿${city}${fullName}（${shortName}）完整游览指南：位置地图、开放时间、门票、周边景点与旅行提示。`
      : `Comprehensive visitor guide to ${fullName} (${shortName}) in ${city}, ${countryEn}. Location map, opening hours, tickets, nearby landmarks and travel tips.`,
    url: DOMAIN,
    image: [HERO_IMAGE],
    isAccessibleForFree: true,
    telephone: '+38946230455',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Kocho Racin',
      addressLocality: cityEn,
      postalCode: '6000',
      addressCountry: 'MK',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: LATITUDE,
      longitude: LONGITUDE,
    },
    hasMap: MAPS_SHARE_URL,
    sameAs: [MAPS_SHARE_URL, GOVT_TOURISM_URL],
  };

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: locale === 'zh'
          ? `${fullName}位于哪里？`
          : `Where is ${fullName} located?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: locale === 'zh'
            ? `${fullName}（${shortName}）位于${country}${city}奥赫里德湖畔的悬崖之上，邮编6000。`
            : `${fullName} (${shortName}) is located in ${city}, ${countryEn}, perched on a cliff above Lake Ohrid. Postal code 6000.`,
        },
      },
      {
        '@type': 'Question',
        name: locale === 'zh'
          ? `参观${shortName}需要门票吗？`
          : `Is ${shortName} free to visit?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: locale === 'zh'
            ? `${fullName}的外部及悬崖区域全年24小时免费开放；进入教堂内部观赏中世纪壁画需购买门票（约150第纳尔，约2.5欧元，仅收现金）。`
            : `The exterior and cliff area of ${fullName} are open 24/7 free of charge year-round. Interior access to view the medieval frescoes requires a ticket (approx. 150 MKD / ~2.5 EUR, cash only).`,
        },
      },
      {
        '@type': 'Question',
        name: locale === 'zh'
          ? `${shortName}的最佳游览时间是什么时候？`
          : `What is the best time to visit ${shortName}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: locale === 'zh'
            ? `建议在日落前一小时（黄金时刻）到访${fullName}，此时阳光洒在红砖与湖面上，观景与拍摄效果最佳。夏季建议清晨或傍晚避开人流。`
            : `Visit ${fullName} one hour before sunset (golden hour) for the best light on the red-brick facade and Lake Ohrid. In summer, early morning or late afternoon avoids crowds.`,
        },
      },
    ],
  };

  return (
    <html lang={locale === 'zh' ? 'zh-CN' : 'en'} suppressHydrationWarning>
      <head>
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXX" crossOrigin="anonymous" />
        <meta name="google-adsense-account" content="ca-pub-XXXXXXXXXX" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(touristAttractionLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (theme === 'dark') {
                    document.documentElement.setAttribute('data-theme', 'dark');
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-screen">
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
