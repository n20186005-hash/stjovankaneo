import TopicContent from './TopicContent';
import {
  getMessages,
  topicUrl,
  TOPIC_SLUG_TO_KEY,
} from '@/lib/topic';

const DOMAIN = 'https://stjovankaneo.com';

const SITE_NAMES: Record<string, string> = {
  mk: 'Св. Јован Канео',
  zh: '圣约翰卡内奥教堂',
  en: 'St. John at Kaneo',
};

const HOME_LABELS: Record<string, string> = {
  mk: 'Почетна',
  zh: '首页',
  en: 'Home',
};

export default async function TopicPage({
  locale,
  slug,
}: {
  locale: string;
  slug: string;
}) {
  const messages = await getMessages(locale);
  const key = TOPIC_SLUG_TO_KEY[slug as keyof typeof TOPIC_SLUG_TO_KEY] || slug;
  const topic = messages?.topics?.[key] || {};
  const self = topicUrl(locale, slug);
  const title: string = topic.title || '';
  const description: string = topic.intro || '';
  const faq: Array<{ q: string; a: string }> = topic.faq || [];

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: HOME_LABELS[locale] || HOME_LABELS.en,
        item: `${DOMAIN}/${locale}`,
      },
      { '@type': 'ListItem', position: 2, name: title, item: self },
    ],
  };

  const articleLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    inLanguage: locale,
    datePublished: '2026-10-09',
    dateModified: '2026-10-09',
    publisher: {
      '@type': 'Organization',
      name: SITE_NAMES[locale] || SITE_NAMES.en,
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': self },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }}
      />
      <TopicContent slug={slug} />
    </>
  );
}
