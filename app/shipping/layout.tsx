import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Shipping Information | StarChoice Cosmetics',
  description: 'Learn about our shipping policies, delivery times, and shipping costs. We offer nationwide delivery across Kenya for all beauty and cosmetic products.',
  keywords: [
    'cosmetics shipping',
    'beauty product delivery',
    'Kenya shipping',
    'StarChoice delivery',
    'beauty products shipping',
    'nationwide delivery'
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
    canonical: 'https://starchoice.co.ke/shipping'
  },
  openGraph: {
    title: 'Shipping & Delivery Information | StarChoice Cosmetics',
    description: 'Get your beauty products delivered anywhere in Kenya. Fast and reliable shipping.',
    type: 'website',
    siteName: 'StarChoice Cosmetics',
    locale: 'en_KE'
  }
}

export default function ShippingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="">
      <main className="">
        {children}
      </main>
    </div>
  )
}