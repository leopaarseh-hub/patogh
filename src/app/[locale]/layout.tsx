import type { Metadata } from 'next';
import { Vazirmatn, Inter } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import '../globals.css';

const vazirmatn = Vazirmatn({ subsets:['arabic'], weight:['300','400','500','600','700','800'], variable:'--font-vazirmatn', display:'swap' });
const inter     = Inter(    { subsets:['latin'],  weight:['300','400','500','600','700','800'], variable:'--font-inter',     display:'swap' });

type Props = { children: React.ReactNode; params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Omit<Props,'children'>): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });
  return {
    title:       { default: t('title'), template: `%s | PATOGH` },
    description: t('description'),
    openGraph:   { title:'PATOGH', description:t('description'), type:'website' },
    robots:      { index:true, follow:true },
  };
}

export function generateStaticParams() { return routing.locales.map(l => ({ locale:l })); }

const jsonLd = {
  '@context':'https://schema.org','@type':'Restaurant',
  name:'PATOGH',
  address:{ '@type':'PostalAddress', streetAddress:'Reisholzer Str. 25', addressLocality:'Düsseldorf', postalCode:'40231', addressRegion:'Nordrhein-Westfalen', addressCountry:'DE' },
  telephone:'+492112610741', servesCuisine:'Persian', priceRange:'€–€€',
  sameAs:['https://instagram.com/patogh2026'],
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) notFound();
  const messages = await getMessages();
  const isRTL    = locale === 'fa';
  return (
    <html lang={locale} dir={isRTL ? 'rtl' : 'ltr'}
      className={`${vazirmatn.variable} ${inter.variable}`} suppressHydrationWarning>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body className={`grain ${isRTL ? 'font-persian' : 'font-latin'}`}>
        <NextIntlClientProvider messages={messages}>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}
