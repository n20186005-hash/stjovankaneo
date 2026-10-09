'use client';

import { useTranslations, useMessages, useLocale } from 'next-intl';
import { TOPIC_SLUG_TO_KEY } from '@/lib/topic';
import Footer from './Footer';

function renderRich(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={i} style={{ color: 'var(--text-primary)' }}>
          {part.slice(2, -2)}
        </strong>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

export default function TopicContent({ slug }: { slug: string }) {
  const locale = useLocale();
  const t = useTranslations('header');
  const messages = useMessages() as any;
  const key = TOPIC_SLUG_TO_KEY[slug as keyof typeof TOPIC_SLUG_TO_KEY] || slug;
  const topic = messages?.topics?.[key] || {};
  const homeHref = `/${locale}`;
  const sections: Array<{ heading: string; content: string }> = topic.sections || [];
  const faq: Array<{ q: string; a: string }> = topic.faq || [];
  const related: Array<{ slug: string; label: string }> = topic.related || [];

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-primary)' }}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <a
          href={homeHref}
          className="inline-flex items-center gap-2 text-sm font-medium mb-10 transition-colors"
          style={{ color: 'var(--accent)' }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          {t('backToHome')}
        </a>

        <h1
          className="font-display text-3xl sm:text-4xl font-bold mb-4"
          style={{ color: 'var(--text-primary)' }}
        >
          {topic.title}
        </h1>
        {topic.intro && (
          <p className="text-base leading-relaxed mb-8" style={{ color: 'var(--text-secondary)' }}>
            {topic.intro}
          </p>
        )}

        <nav
          aria-label="breadcrumb"
          className="mb-10 p-4 rounded-xl text-sm"
          style={{
            background: 'var(--bg-secondary)',
            border: '1px dashed var(--border-color)',
            color: 'var(--text-muted)',
          }}
        >
          <a href={homeHref} className="hover:underline">{t('home')}</a>
          <span className="mx-2">/</span>
          <span>{topic.title}</span>
        </nav>

        <div className="space-y-8">
          {sections.map((section, i) => (
            <div key={i}>
              <h2
                className="font-display text-xl font-semibold mb-3"
                style={{ color: 'var(--text-primary)' }}
              >
                {section.heading}
              </h2>
              <p
                className="leading-relaxed whitespace-pre-wrap"
                style={{ color: 'var(--text-secondary)' }}
              >
                {renderRich(section.content)}
              </p>
            </div>
          ))}
        </div>

        {faq.length > 0 && (
          <div className="mt-12">
            <h2
              className="font-display text-2xl font-semibold mb-6"
              style={{ color: 'var(--text-primary)' }}
            >
              {topic.faqTitle || 'FAQ'}
            </h2>
            <div className="space-y-4">
              {faq.map((f, i) => (
                <div key={i} className="rounded-xl p-5" style={{ background: 'var(--bg-secondary)' }}>
                  <h3 className="font-medium mb-2" style={{ color: 'var(--text-primary)' }}>{f.q}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    {renderRich(f.a)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {related.length > 0 && (
          <div className="mt-12">
            <h2
              className="font-display text-xl font-semibold mb-4"
              style={{ color: 'var(--text-primary)' }}
            >
              {topic.relatedTitle || 'Related Guides'}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {related.map((r, i) => (
                <a
                  key={i}
                  href={`/${locale}/${r.slug}`}
                  className="rounded-lg p-4 border transition-colors hover:border-[var(--accent)]"
                  style={{
                    background: 'var(--bg-tertiary)',
                    borderColor: 'var(--border-color)',
                    color: 'var(--text-primary)',
                  }}
                >
                  {r.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
