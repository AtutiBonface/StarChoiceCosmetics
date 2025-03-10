import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Frequently Asked Questions | StarChoice Cosmetics',
  description: 'Find answers to common questions about beauty products, orders, shipping, returns and more at StarChoice Cosmetics. Your beauty queries answered.',
  keywords: [
    'beauty FAQs',
    'cosmetics questions',
    'StarChoice help',
    'beauty product help',
    'customer support',
    'beauty shopping guide'
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
    canonical: 'https://starchoice.co.ke/faqs'
  },
  openGraph: {
    title: 'Beauty Shopping FAQs | StarChoice Cosmetics',
    description: 'Get answers to all your beauty shopping questions',
    type: 'website',
    siteName: 'StarChoice Cosmetics',
    locale: 'en_KE'
  },
 
}

export default function FAQsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (  
    <main>
      {children}
    </main>
  
  )
}