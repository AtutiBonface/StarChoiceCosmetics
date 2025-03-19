'use client'
import Link from 'next/link'
import {  ChevronRight } from 'lucide-react'
import { products } from '@/mockData'
import MobileProductGrid from '@/components/Products/mobileProductGrid'
import dynamic from 'next/dynamic'
import { DesktopGridSkeleton } from '@/components/skeletons'

const PaginatedProductGrid = dynamic(() => import('@/components/Products/PaginatedProductGrid'), {
  loading: () => <DesktopGridSkeleton />,
  ssr: true
});

export default function OffersPage() { 

  const filteredProducts = products.filter(product => product.discount)
 
  return (
    <div className="bg-primary text-primary">
     

      {/* Breadcrumb */}
      <div className="w-full bg-secondary">
        <div className="max-w-7xl mx-auto px-4 py-2">
          <div className="flex items-center gap-2 text-sm text-secondary">
            <Link href="/" className="hover:text-accent-1">Home</Link>
            <ChevronRight size={16} />
            <span className="text-accent-1">Special Offers</span>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-2 py-2">
        <div className="hidden md:block">
          <PaginatedProductGrid products={filteredProducts} />
        </div>
        <MobileProductGrid 
          products={filteredProducts}
        />
        </div>
    </div>
  )
}