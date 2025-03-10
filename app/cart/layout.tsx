import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Shopping Cart',
  description: 'Review and checkout your beauty products from StarChoice Cosmetics. Safe and secure shopping experience.',
  robots: {
    index: false,  // Don't index cart pages
    follow: false,
    noarchive: true,
  },
  alternates: {
    canonical: 'https://starchoice.co.ke/cart'
  },
  openGraph: {
    title: 'Your Shopping Cart | StarChoice Cosmetics',
    description: 'Complete your beauty purchase at StarChoice Cosmetics.',
    type: 'website',
    siteName: 'StarChoice Cosmetics'
  }
}

export default function CartLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}