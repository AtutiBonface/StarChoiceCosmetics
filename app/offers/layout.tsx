import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    template: '%s | Special Offers',
    default: 'Special Offers & Deals | StarChoice Cosmetics'
  },
  description: 'Discover exclusive beauty deals, discounts, and special offers on skincare, makeup, and cosmetics. Shop the best beauty promotions at StarChoice Cosmetics Kenya.',
  keywords: [
    'beauty deals',
    'cosmetics offers',
    'makeup discounts',
    'skincare promotions',
    'Kenya beauty sales',
    'StarChoice special offers'
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
    canonical: 'https://starchoice.co.ke/offers'
  },
  openGraph: {
    title: 'Special Beauty Offers & Deals | StarChoice Cosmetics',
    description: 'Limited time offers on premium beauty products. Shop now and save!',
    type: 'website',
    siteName: 'StarChoice Cosmetics',
    locale: 'en_KE'
  },
  
  
}

export default function OffersLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}