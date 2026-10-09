import type { Metadata } from 'next';
import TopicPage from '@/components/TopicPage';
import { buildTopicMetadata } from '@/lib/topic';

const SLUG = 'opening-hours' as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildTopicMetadata(locale, SLUG);
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return <TopicPage locale={locale} slug={SLUG} />;
}
