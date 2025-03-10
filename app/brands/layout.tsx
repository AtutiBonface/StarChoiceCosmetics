import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    template: '%s | Beauty Brands',
    default: 'Shop Top Beauty Brands | StarChoice Cosmetics'
  },
  description: 'Discover authentic beauty brands at StarChoice Cosmetics. Shop premium skincare, makeup, and cosmetics from Nivea, L\'Oreal, Maybelline, MAC, and more trusted brands.',
  keywords: [
    'beauty brands',
    'cosmetic brands',
    'Nivea Kenya',
    'L\'Oreal products',
    'Maybelline makeup',
    'MAC cosmetics',
    'authentic brands',
    'Kenya beauty store'
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
    canonical: 'https://starchoice.co.ke/brands'
  },
  openGraph: {
    title: 'Shop Authentic Beauty Brands | StarChoice Cosmetics',
    description: 'Explore our collection of premium beauty brands. Authorized retailer of top skincare and makeup brands in Kenya.',
    type: 'website',
    siteName: 'StarChoice Cosmetics',
    locale: 'en_KE'
  },
 
}

export default function BrandsLayout({
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