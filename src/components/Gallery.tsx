'use client';

import { useTranslations, useLocale } from 'next-intl';
import { useState, useCallback } from 'react';

const MAPS_SHARE_URL = 'https://maps.app.goo.gl/HgjyeMiaoUm4q8S6A';

function buildPhotos(locale: string) {
  const zh = locale === 'zh';
  const prefix = zh ? '圣约翰卡内奥教堂' : 'Church of St. John at Kaneo';
  const lake = zh ? '奥赫里德湖' : 'Lake Ohrid';
  const city = zh ? '奥赫里德' : 'Ohrid';

  return [
    {
      src: '/gallery/Church of Saint Jovan the Theologian at Kaneo_20.jpg',
      alt: zh
        ? `${prefix}全景 - ${city}${lake}悬崖主视角`
        : `${prefix} Panorama - Main cliffside view over ${lake}, ${city}`,
    },
    {
      src: '/gallery/Church of Saint Jovan the Theologian at Kaneo_03.jpg',
      alt: zh
        ? `湖畔木栈道 - 靠近${prefix}的步道景观`
        : `Lakeside Boardwalk near ${prefix} - ${city}`,
    },
    {
      src: '/gallery/Church of Saint Jovan the Theologian at Kaneo_04.jpg',
      alt: zh
        ? `${prefix}侧面视角 - ${city}拜占庭红砖建筑`
        : `${prefix} Side View - Byzantine red-brick architecture in ${city}`,
    },
    {
      src: '/gallery/Church of Saint Jovan the Theologian at Kaneo_05.jpg',
      alt: zh
        ? `${prefix}八角穹顶 - 中世纪建筑细节`
        : `${prefix} Octagonal Dome - Medieval architectural detail`,
    },
    {
      src: '/gallery/Church of Saint Jovan the Theologian at Kaneo_06.jpg',
      alt: zh
        ? `${prefix}红砖外墙 - cloisonné砌筑工艺`
        : `${prefix} Red Brick Exterior - cloisonné masonry technique`,
    },
    {
      src: '/gallery/Church of Saint Jovan the Theologian at Kaneo_07.jpg',
      alt: zh
        ? `${prefix}内部14世纪湿壁画`
        : `${prefix} Interior 14th-Century Frescoes`,
    },
    {
      src: '/gallery/Church of Saint Jovan the Theologian at Kaneo_09.jpg',
      alt: zh
        ? `${prefix}后山观景台 - 经典明信片机位`
        : `${prefix} Hilltop Viewpoint - Classic postcard angle near ${prefix}`,
    },
    {
      src: '/gallery/Church of Saint Jovan the Theologian at Kaneo_10.jpg',
      alt: zh
        ? `${prefix}日落时分 - ${city}${lake}黄金时刻`
        : `${prefix} Sunset Moment - Golden Hour over ${lake}, ${city}`,
    },
    {
      src: '/gallery/Church of Saint Jovan the Theologian at Kaneo_11.jpg',
      alt: zh
        ? `${prefix}外部全景 - ${city}湖畔地标`
        : `${prefix} Exterior Overview - Lakeside landmark in ${city}`,
    },
    {
      src: '/gallery/Church of Saint Jovan the Theologian at Kaneo_12.jpg',
      alt: zh
        ? `${prefix}${lake}视角 - ${city}悬崖景观`
        : `${prefix} ${lake} View - Cliffside landscape in ${city}`,
    },
    {
      src: '/gallery/Church of Saint Jovan the Theologian at Kaneo_13.jpg',
      alt: zh
        ? `${prefix}悬崖全景 - ${city}湖畔峭壁`
        : `${prefix} Cliffside Landscape - Steep shore in ${city}`,
    },
    {
      src: '/gallery/Church of Saint Jovan the Theologian at Kaneo_15.jpg',
      alt: zh
        ? `${prefix}拜占庭建筑风格 - ${city}世界遗产`
        : `${prefix} Byzantine Architecture - UNESCO World Heritage in ${city}`,
    },
  ];
}

export default function Gallery() {
  const t = useTranslations('gallery');
  const locale = useLocale();
  const photos = buildPhotos(locale);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? photos.length - 1 : prev - 1));
  }, [photos.length]);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === photos.length - 1 ? 0 : prev + 1));
  }, [photos.length]);

  const openLightbox = () => setIsLightboxOpen(true);
  const closeLightbox = () => setIsLightboxOpen(false);

  return (
    <>
      <section id="gallery" className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
        <div className="max-w-6xl mx-auto">
          <h2
            className="font-display text-3xl sm:text-4xl font-semibold mb-2"
            style={{ color: 'var(--text-primary)' }}
          >
            {t('title')}
          </h2>
          <p className="mb-8" style={{ color: 'var(--text-muted)' }}>{t('subtitle')}</p>
          <div className="w-12 h-0.5 mb-10" style={{ background: 'var(--accent)' }} />

          <div className="relative">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
              {photos.slice(0, 8).map((photo, i) => (
                <div
                  key={i}
                  className={`gallery-item relative group cursor-pointer ${i === 0 ? 'col-span-2 row-span-2' : ''}`}
                  onClick={() => {
                    setCurrentIndex(i);
                    openLightbox();
                  }}
                >
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    className="w-full h-full object-cover rounded-lg"
                    style={{ minHeight: i === 0 ? '400px' : '180px' }}
                    loading={i === 0 ? 'eager' : 'lazy'}
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors rounded-lg flex items-end">
                    <p className="text-white text-sm p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      {photo.alt}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={goToPrevious}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-colors"
              aria-label="Previous photo"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <button
              onClick={goToNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-colors"
              aria-label="Next photo"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>

            <div className="flex justify-center mt-6 gap-4 items-center">
              <a
                href={MAPS_SHARE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm hover:underline"
                style={{ color: 'var(--accent)' }}
              >
                {t('viewAll')}
              </a>
            </div>
          </div>
        </div>
      </section>

      {isLightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
            aria-label="Close lightbox"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); goToPrevious(); }}
            className="absolute left-4 w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
            aria-label="Previous photo"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          <img
            src={photos[currentIndex].src}
            alt={photos[currentIndex].alt}
            className="max-w-[90vw] max-h-[85vh] object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />

          <button
            onClick={(e) => { e.stopPropagation(); goToNext(); }}
            className="absolute right-4 w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
            aria-label="Next photo"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm">
            {currentIndex + 1} / {photos.length}
          </div>
        </div>
      )}
    </>
  );
}
