import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Us | StarChoice Cosmetics',
  description: 'Get in touch with StarChoice Cosmetics customer service. We\'re here to help with your beauty and skincare needs. Find our contact information, location, and support hours.',
  keywords: [
    'contact StarChoice',
    'beauty store contact',
    'customer service',
    'Kenya cosmetics support',
    'beauty products help',
    'StarChoice location'
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
    }
  },
  alternates: {
    canonical: 'https://starchoice.co.ke/contact'
  },
  openGraph: {
    title: 'Contact StarChoice Cosmetics',
    description: 'Reach out to our customer service team for all your beauty and skincare inquiries.',
    type: 'website',
    siteName: 'StarChoice Cosmetics',
    locale: 'en_KE',
  }
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}