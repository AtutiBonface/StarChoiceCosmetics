import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    template: '%s | My Wishlist',
    default: 'My Wishlist | StarChoice Cosmetics'
  },
  description: 'View and manage your wishlist of beauty products at StarChoice Cosmetics. Save your favorite items for later purchase.',
  robots: {
    index: false, // Don't index personal wishlists
    follow: false,
    noarchive: true,
    nocache: true,
    nosnippet: true,
  },
  alternates: {
    canonical: 'https://starchoice.co.ke/wishlist'
  },
  openGraph: {
    title: 'My Beauty Wishlist | StarChoice Cosmetics',
    description: 'Saved items at StarChoice Cosmetics',
    type: 'website',
    siteName: 'StarChoice Cosmetics',
    locale: 'en_KE'
  },
}

export default function WishlistLayout({
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