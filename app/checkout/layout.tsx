import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Secure Checkout | StarChoice Cosmetics',
  description: 'Complete your purchase securely at StarChoice Cosmetics. Safe payment processing and data protection guaranteed.',
  robots: {
    index: false,
    follow: false,
    noarchive: true,
    nocache: true,
    nosnippet: true,
    noimageindex: true,
  },
  alternates: {
    canonical: 'https://starchoice.co.ke/checkout'
  },
  openGraph: {
    title: 'Secure Checkout | StarChoice Cosmetics',
    description: 'Complete your purchase securely at StarChoice Cosmetics',
    type: 'website',
    siteName: 'StarChoice Cosmetics'
  },
 
}

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}