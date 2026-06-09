import './globals.css'

export const metadata = {
  metadataBase: new URL('https://pars-sport.vercel.app'),
  title: 'Pars Sport – Düsseldorf',
  description:
    'Iranischer Sportclub in Düsseldorf – Sport, Gemeinschaft & Gesundheit. Volleyball, Padel, Fußball und mehr.',
  keywords:
    'Pars Sport, Düsseldorf, Sportclub, Iranisch, Volleyball, Padel, Fußball, باشگاه ورزشی',
  openGraph: {
    title: 'Pars Sport',
    description: 'Iranischer Sportclub in Düsseldorf – Sport, Gemeinschaft, Gesundheit.',
    type: 'website',
    siteName: 'Pars Sport',
    images: [{ url: '/logo.png', width: 400, height: 400, alt: 'Pars Sport Logo' }],
  },
  twitter: {
    card: 'summary',
    title: 'Pars Sport',
    description: 'Iranischer Sportclub in Düsseldorf.',
    images: ['/logo.png'],
  },
  icons: {
    icon: '/logo.png',
    apple: '/logo.png',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }) {
  return (
    <html lang="de">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Barlow+Condensed:wght@400;600;700;800;900&family=Barlow:wght@300;400;500&family=Vazirmatn:wght@300;400;500;700;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
