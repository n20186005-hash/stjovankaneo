import type { Metadata } from 'next';

const DOMAIN = 'https://stjovankaneo.com';

export const TOPIC_SLUGS = [
  'how-to-get-to-st-john-at-kaneo',
  'opening-hours',
  'photo-spots',
  'history',
  'ohrid-old-town-walking-route',
] as const;

export type TopicSlug = (typeof TOPIC_SLUGS)[number];

export const TOPIC_SLUG_TO_KEY: Record<TopicSlug, string> = {
  'how-to-get-to-st-john-at-kaneo': 'howToGet',
  'opening-hours': 'openingHours',
  'photo-spots': 'photoSpots',
  'history': 'history',
  'ohrid-old-town-walking-route': 'oldTownRoute',
};

export function topicUrl(locale: string, slug: string): string {
  return `${DOMAIN}/${locale}/${slug}`;
}

export async function getMessages(locale: string): Promise<any> {
  const mod = await import(`@/messages/${locale}.json`);
  return mod.default as any;
}

export async function buildTopicMetadata(
  locale: string,
  slug: TopicSlug,
): Promise<Metadata> {
  const messages = await getMessages(locale);
  const key = TOPIC_SLUG_TO_KEY[slug];
  const topic = messages?.topics?.[key] || {};
  const title: string = topic.title || 'St. John at Kaneo';
  const description: string = topic.intro || '';
  const self = topicUrl(locale, slug);
  const mk = topicUrl('mk', slug);
  const zh = topicUrl('zh', slug);
  const en = topicUrl('en', slug);

  return {
    title,
    description,
    alternates: {
      canonical: self,
      languages: {
        mk,
        zh,
        en,
        'x-default': mk,
      },
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}
