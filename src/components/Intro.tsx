'use client';

import { useTranslations, useMessages, useLocale } from 'next-intl';

function renderRich(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      const content = part.slice(2, -2);
      return (
        <strong key={i} style={{ color: 'var(--text-primary)' }}>
          {content}
        </strong>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

export default function Intro() {
  const t = useTranslations('intro');
  const tOff = useTranslations('officialManagement');
  const messages = useMessages() as any;
  const locale = useLocale();
  const items: string[] = messages?.intro?.visitGuide?.items || [];
  const alsoKnownAsItems: string[] = messages?.intro?.alsoKnownAs?.items || [];

  const landmark1Alt = locale === 'zh'
    ? '圣索菲亚教堂 - 靠近圣约翰卡内奥教堂的周边地标'
    : 'Church of St. Sophia near St. John at Kaneo';
  const landmark2Alt = locale === 'zh'
    ? '普劳什尼克考古遗址 - 圣约翰卡内奥教堂周边地标'
    : 'Plaošnik Archaeological Site near St. John at Kaneo';

  return (
    <section className="section-padding">
      <div className="max-w-4xl mx-auto">
        {/* H2: About */}
        <h2
          className="font-display text-3xl sm:text-4xl font-semibold mb-6"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('title')}
        </h2>
        <div className="w-12 h-0.5 mb-8" style={{ background: 'var(--accent)' }} />

        {/* 首段等位声明 */}
        <div
          className="rounded-xl p-6 sm:p-8 mb-10 border-l-4"
          style={{
            background: 'var(--bg-tertiary)',
            borderColor: 'var(--accent)',
          }}
        >
          <p
            className="text-lg leading-relaxed"
            style={{ color: 'var(--text-secondary)' }}
          >
            {renderRich(t('entityOpening'))}
          </p>
        </div>

        {/* 地理面包屑 */}
        <nav
          aria-label="breadcrumb"
          className="mb-12 p-4 sm:p-5 rounded-xl text-sm tracking-wide"
          style={{
            background: 'var(--bg-secondary)',
            border: '1px dashed var(--border-color)',
            color: 'var(--text-muted)',
          }}
        >
          <span className="whitespace-nowrap font-mono">{t('breadcrumbLine')}</span>
        </nav>

        <p
          className="text-lg leading-relaxed mb-12"
          style={{ color: 'var(--text-secondary)' }}
        >
          {t('description')}
        </p>

        {/* 周边语义集群 */}
        <div className="mb-12 rounded-xl p-6 sm:p-8" style={{ background: 'var(--bg-secondary)' }}>
          <h2
            className="font-display text-2xl font-semibold mb-4"
            style={{ color: 'var(--text-primary)' }}
          >
            {t('landmarksTitle')}
          </h2>
          <p
            className="text-base leading-relaxed mb-6"
            style={{ color: 'var(--text-secondary)' }}
          >
            {renderRich(t('nearbyOpening'))}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div
              className="rounded-lg p-4 flex items-start gap-3"
              style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}
            >
              <div className="mt-0.5 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'var(--accent)' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <div>
                <p className="font-medium mb-1" style={{ color: 'var(--text-primary)' }}>
                  {locale === 'zh' ? '圣索菲亚教堂' : 'Church of St. Sophia'}
                </p>
                <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{landmark1Alt}</p>
              </div>
            </div>
            <div
              className="rounded-lg p-4 flex items-start gap-3"
              style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}
            >
              <div className="mt-0.5 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'var(--accent)' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <path d="M3 21h18M5 21V10l7-5 7 5v11M9 21v-6h6v6" />
                </svg>
              </div>
              <div>
                <p className="font-medium mb-1" style={{ color: 'var(--text-primary)' }}>
                  {locale === 'zh' ? '普劳什尼克考古遗址（圣克莱门特教堂）' : 'Plaošnik Archaeological Site (St. Clement)'}
                </p>
                <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{landmark2Alt}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div
            className="rounded-xl p-6 sm:p-8"
            style={{ background: 'var(--bg-tertiary)' }}
          >
            <h3
              className="font-display text-xl font-semibold mb-4"
              style={{ color: 'var(--text-primary)' }}
            >
              {t('visitGuide.title')}
            </h3>
            <ul className="space-y-3">
              {items.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full" style={{ background: 'var(--accent)' }} />
                  <span style={{ color: 'var(--text-secondary)' }}>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div
            className="rounded-xl p-6 sm:p-8"
            style={{ background: 'var(--bg-tertiary)' }}
          >
            <h3
              className="font-display text-xl font-semibold mb-4"
              style={{ color: 'var(--text-primary)' }}
            >
              {t('alsoKnownAs.title')}
            </h3>
            <ul className="space-y-3">
              {alsoKnownAsItems.map((keyword, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full" style={{ background: 'var(--accent)' }} />
                  <span style={{ color: 'var(--text-secondary)' }}>{keyword}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 p-6 sm:p-8 rounded-xl border border-[var(--accent)]" style={{ background: 'var(--bg-tertiary)' }}>
          <h2 className="font-display text-xl font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>
            {t('historyTitle')}
          </h2>
          <div className="text-base leading-relaxed whitespace-pre-wrap" style={{ color: 'var(--text-secondary)' }}>
            {tOff('text')}
          </div>
        </div>
      </div>
    </section>
  );
}
