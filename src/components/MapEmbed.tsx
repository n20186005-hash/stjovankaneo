'use client';

import { useTranslations, useLocale } from 'next-intl';

const MAPS_EMBED_SRC =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5346.740962861613!2d20.788750600000004!3d41.111075299999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1350dcb9e2457c71%3A0xbea74f2f5ddcc056!2z5Zyj57qm57-w5pWZ5aCC!5e1!3m2!1szh-CN!2s!4v1787885657478!5m2!1szh-CN!2s';
const MAPS_SHARE_URL = 'https://maps.app.goo.gl/HgjyeMiaoUm4q8S6A';
const GOVT_TOURISM_URL = 'https://www.macedonia-timeless.com/';

export default function MapEmbed() {
  const t = useTranslations('mapSection');
  const locale = useLocale();

  const iframeTitle =
    locale === 'mk'
      ? 'Google Maps - Црква Свети Јован Богослов во Канео, Охрид'
      : locale === 'zh'
        ? 'Google Maps - 圣约翰神学家教堂（奥赫里德）'
        : 'Google Maps - Church of St. John the Theologian at Kaneo, Ohrid';

  return (
    <section id="map" className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
      <div className="max-w-5xl mx-auto">
        <h2
          className="font-display text-3xl sm:text-4xl font-semibold mb-2"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('title')}
        </h2>
        <p className="mb-8 text-sm" style={{ color: 'var(--text-muted)' }}>{t('subtitle')}</p>
        <div className="w-12 h-0.5 mb-10" style={{ background: 'var(--accent)' }} />

        {/* Map */}
        <div
          className="map-container relative rounded-xl overflow-hidden"
          style={{ border: '1px solid var(--map-border)' }}
        >
          <iframe
            src={MAPS_EMBED_SRC}
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            title={iframeTitle}
          />
        </div>

        {/* Open in Google Maps */}
        <div className="mt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-center sm:text-left" style={{ color: 'var(--text-muted)' }}>
            {t('govTourismText')}{' '}
            <a
              href={GOVT_TOURISM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline font-medium"
              style={{ color: 'var(--accent)' }}
            >
              {t('govTourismLabel')}
            </a>
            .
          </p>
          <a
            href={MAPS_SHARE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium text-white transition-colors"
            style={{ background: 'var(--accent)' }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            {t('openMaps')}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
