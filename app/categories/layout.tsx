import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    template: '%s | Shop by Category | StarChoice Cosmetics',
    default: 'All Categories | StarChoice Cosmetics'
  },
  description: 'Explore our wide range of beauty categories including skincare, makeup, hair care, and fragrance. Find authentic beauty products from top brands at StarChoice Cosmetics.',
  keywords: [
    'beauty categories',
    'cosmetics shop',
    'skincare products',
    'makeup collection',
    'Kenya beauty store',
    'authentic cosmetics',
    'StarChoice categories'
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    }
  },
  alternates: {
    canonical: 'https://starchoice.co.ke/category'
  },
  openGraph: {
    title: 'Shop by Category | StarChoice Cosmetics',
    description: 'Discover our curated collection of beauty and skincare products across various categories.',
    type: 'website',
    siteName: 'StarChoice Cosmetics',
    locale: 'en_KE',
  }
}

export default function CategoryLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}