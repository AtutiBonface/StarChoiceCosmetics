import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    template: 'Search: %s | StarChoice Cosmetics',
    default: 'Search Beauty Products | StarChoice Cosmetics'
  },
  description: 'Search our collection of authentic beauty products, skincare, and cosmetics. Find your perfect beauty products at StarChoice Cosmetics Kenya.',
  robots: {
    index: false, // Don't index search results
    follow: true,
    noarchive: true,
    'max-image-preview': 'large',
    'max-snippet': -1,
  },
  alternates: {
    canonical: 'https://starchoice.co.ke/search'
  },
  openGraph: {
    title: 'Search Beauty Products',
    description: 'Find your perfect beauty products at StarChoice Cosmetics',
    type: 'website',
    siteName: 'StarChoice Cosmetics',
    locale: 'en_KE'
  },
  
}

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <section className="">
      <div className="">
        {children}
      </div>
    </section>
  )
}