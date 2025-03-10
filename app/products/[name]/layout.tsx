import type { Metadata } from 'next'

interface Props {
  params: { name: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // Convert URL-friendly name back to display name
  const productName = decodeURIComponent(params.name).replace(/-/g, ' ')

  return {
    title: `${productName} | Buy at StarChoice Cosmetics`,
    description: `Buy authentic ${productName} at StarChoice Cosmetics. Get detailed product information, reviews, and secure checkout with nationwide delivery in Kenya.`,
    robots: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
    alternates: {
      canonical: `https://starchoice.co.ke/products/${params.name}`
    },
    openGraph: {
      type: 'website',
      title: productName,
      description: `Shop authentic ${productName} at StarChoice Cosmetics Kenya`,
      url: `https://starchoice.co.ke/products/${params.name}`,
      siteName: 'StarChoice Cosmetics',
      locale: 'en_KE'
    },
  
  }
}

export default function ProductLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}