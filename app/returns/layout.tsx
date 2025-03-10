import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Returns Policy | StarChoice Cosmetics',
  description: 'Learn about our returns and refund policies. Easy returns within 14 days for all beauty and cosmetic products at StarChoice Cosmetics Kenya.',
  keywords: [
    'cosmetics returns',
    'beauty product returns',
    'refund policy',
    'StarChoice returns',
    'product returns Kenya',
    'beauty returns policy'
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
    canonical: 'https://starchoice.co.ke/returns'
  },
  openGraph: {
    title: 'Returns & Refund Policy | StarChoice Cosmetics',
    description: 'Easy returns and refunds on beauty products. Customer satisfaction guaranteed.',
    type: 'website',
    siteName: 'StarChoice Cosmetics',
    locale: 'en_KE'
  }
}

export default function ReturnsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    
      <main >
        {children}
      </main>
  )
}