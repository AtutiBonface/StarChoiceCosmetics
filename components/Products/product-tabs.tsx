'use client'
import { useState } from 'react'
import { Product } from '@/mockData'
import { DesktopGridSkeleton, MobileGridSkeleton } from '../skeletons';
import dynamic from 'next/dynamic';

const DesktopProductGrid = dynamic(() => import('./desktopProductGrid'), {
  loading: () => <DesktopGridSkeleton />,
  ssr: true
});

const MobileProductGrid = dynamic(() => import('./mobileProductGrid'), {
  loading: () => <MobileGridSkeleton />,
  ssr: true
});

interface ProductTabsProps {
  products: Product[]
}

const tabs = [
  { id: 'featured', label: 'Featured' },
  { id: 'new-arrivals', label: 'New Arrivals' },
  { id: 'top-selling', label: 'Top Selling' },
]

export default function ProductTabs({ products }: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState(tabs[0].id)

  return (
    <div className="w-full max-w-7xl mx-auto px-2 py-4">
      <h2 className="product-title   relative text-3xl font-bold text-center mb-6  flex items-center  justify-center">
        <span className='bg-primary px-2 z-20'>Trending Products</span>
      </h2>
      
      <div className="flex justify-center gap-4 pb-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-1 md:py-2 rounded-full text-lg transition-colors ${
              activeTab === tab.id
                ? 'bg-accent-1 text-white'
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <DesktopProductGrid products={products} />
      <MobileProductGrid products={products} />
    </div>
  )
}
