import React from 'react'

export function JsonLd() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': 'https://uxel.co/#organization',
        name: 'UXEL',
        url: 'https://uxel.co',
        logo: 'https://uxel.co/icon.png',
        description: 'Empresa de desarrollo de software, automatizaciones n8n y agentes de Inteligencia Artificial para Latinoamérica.',
        email: 'IJQUIADEVO@GMAIL.COM',
        telephone: '+573225850242',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Bogotá',
          addressCountry: 'CO',
        },
        areaServed: [
          'Colombia',
          'México',
          'Chile',
          'Perú',
          'Argentina',
          'Ecuador',
          'Latinoamérica',
        ],
        sameAs: [
          'https://wa.me/573225850242',
        ],
      },
      {
        '@type': 'ProfessionalService',
        '@id': 'https://uxel.co/#service',
        name: 'UXEL — Software & Agentes de IA',
        url: 'https://uxel.co',
        provider: {
          '@id': 'https://uxel.co/#organization',
        },
        serviceType: [
          'Desarrollo de Software Full Stack',
          'Automatización de Procesos con n8n',
          'Bots de WhatsApp y Telegram con IA',
          'Auto-respuesta y Envío de Correos Gmail',
          'Agentes de Inteligencia Artificial',
          'Desarrollo de Aplicaciones Móviles y Web',
        ],
        areaServed: {
          '@type': 'GeoCircle',
          geoMidpoint: {
            '@type': 'GeoCoordinates',
            latitude: 4.711,
            longitude: -74.0721,
          },
        },
        priceRange: '$$',
      },
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}
