'use client';

import { useState } from 'react';
import { useTranslations, useMessages } from 'next-intl';

type FaqItem = { q: string; a: string };

export default function FAQSection() {
  const t = useTranslations('faq');
  const messages = useMessages() as any;
  const items: FaqItem[] = (messages?.faq?.items as FaqItem[]) || [];
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section id="faq" className="section-padding">
      <div className="max-w-4xl mx-auto">
        <h2
          className="font-display text-3xl sm:text-4xl font-semibold mb-2 text-center"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('title')}
        </h2>
        <p
          className="mb-8 text-center"
          style={{ color: 'var(--text-muted)' }}
        >
          {t('subtitle')}
        </p>
        <div className="w-12 h-0.5 mb-10 mx-auto" style={{ background: 'var(--accent)' }} />

        <div className="space-y-4">
          {items.map((item, i) => {
            const open = openIdx === i;
            return (
              <div
                key={i}
                className="rounded-xl overflow-hidden"
                style={{
                  background: 'var(--bg-tertiary)',
                  border: `1px solid ${open ? 'var(--accent)' : 'var(--border-color)'}`,
                  transition: 'border-color 0.2s ease',
                }}
              >
                <button
                  type="button"
                  onClick={() => setOpenIdx(open ? null : i)}
                  aria-expanded={open}
                  className="w-full flex items-center justify-between gap-4 px-5 sm:px-6 py-4 sm:py-5 text-left"
                >
                  <span
                    className="font-display text-base sm:text-lg font-semibold"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {item.q}
                  </span>
                  <span
                    className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center"
                    style={{
                      background: open ? 'var(--accent)' : 'var(--bg-secondary)',
                      transition: 'background 0.2s ease, transform 0.2s ease',
                    }}
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke={open ? 'white' : 'currentColor'}
                      strokeWidth="2.5"
                      style={{
                        color: 'var(--text-secondary)',
                        transform: open ? 'rotate(45deg)' : 'rotate(0deg)',
                        transition: 'transform 0.2s ease',
                      }}
                    >
                      <line x1="12" y1="5" x2="12" y2="19" />
                      <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                  </span>
                </button>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateRows: open ? '1fr' : '0fr',
                    transition: 'grid-template-rows 0.25s ease',
                  }}
                >
                  <div className="overflow-hidden">
                    <div
                      className="px-5 sm:px-6 pb-5 sm:pb-6 pt-1 border-t"
                      style={{ borderColor: 'var(--border-color)' }}
                    >
                      <p
                        className="leading-relaxed text-base"
                        style={{ color: 'var(--text-secondary)' }}
                      >
                        {item.a}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
