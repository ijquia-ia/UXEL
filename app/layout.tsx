import type { Metadata, Viewport } from 'next'
import '@fontsource/inter/400.css'
import '@fontsource/inter/500.css'
import '@fontsource/space-grotesk/600.css'
import '@fontsource/space-grotesk/700.css'
import '@fontsource/ibm-plex-mono/400.css'
import '@fontsource/ibm-plex-mono/500.css'
import './globals.css'
import { SmoothScroll } from '@/components/SmoothScroll'
import { ThemeProvider } from '@/components/ThemeProvider'
import { GlobalParticles } from '@/components/GlobalParticles'
import { SpacetimeGrid } from '@/components/system/SpacetimeGrid'
import { BrandPreloader } from '@/components/system/BrandPreloader'
import { CookieConsent } from '@/components/legal/CookieConsent'
import { JsonLd } from '@/components/system/JsonLd'

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#080808' },
  ],
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  metadataBase: new URL('https://uxel.co'),
  title: {
    default: 'UXEL — Desarrollo de Software, Agentes IA & Automatización n8n',
    template: '%s | UXEL',
  },
  description:
    'Desarrollamos soluciones de software a medida, automatizaciones con n8n (Gmail, WhatsApp, Telegram, SMS) y Agentes de Inteligencia Artificial para empresas en Latinoamérica.',
  keywords: [
    'desarrollo de software latinoamerica',
    'automatizacion n8n',
    'agentes de inteligencia artificial',
    'bots whatsapp ia',
    'bots telegram ia',
    'auto-respuesta gmail ia',
    'desarrollo web b2b',
    'desarrollo full stack colombia',
    'integraciones api',
    'consultoria tecnologica latam',
  ],
  authors: [{ name: 'UXEL Team', url: 'https://uxel.co' }],
  creator: 'UXEL',
  publisher: 'UXEL',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'es_LA',
    url: 'https://uxel.co',
    title: 'UXEL — Tecnología que empieza por entender',
    description:
      'Software que convierte ideas en productos reales: aplicaciones web, móviles, automatización n8n y Agentes de IA en Latinoamérica.',
    siteName: 'UXEL',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'UXEL — Software & Agentes de IA',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'UXEL — Software, Agentes IA & Automatización',
    description:
      'Automatización con n8n, Agentes IA, bots para WhatsApp/Telegram y desarrollo full stack para empresas en Latinoamérica.',
    images: ['/og-image.png'],
  },
  verification: {
    google: 'AÑADE_TU_CODIGO_DE_GOOGLE_SEARCH_CONSOLE_AQUI',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <JsonLd />
      </head>
      <body>
        <ThemeProvider>
          <BrandPreloader />
          <SpacetimeGrid />
          <GlobalParticles />
          <SmoothScroll>{children}</SmoothScroll>
          <CookieConsent />
        </ThemeProvider>
      </body>
    </html>
  )
}
