'use client'
import { useState, useMemo } from 'react'
import { Star, PackageOpen, Flame } from 'lucide-react'
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
  { 
    id: 'featured', 
    label: 'Featured',
    icon: Star,
    bgColor: 'bg-yellow-500',
    hoverBg: 'hover:bg-yellow-600'
  },
  { 
    id: 'new-arrivals', 
    label: 'New Arrivals',
    icon: PackageOpen,
    bgColor: 'bg-green-500',
    hoverBg: 'hover:bg-green-600'
  },
  { 
    id: 'top-selling', 
    label: 'Top Selling',
    icon: Flame,
    bgColor: 'bg-red-500',
    hoverBg: 'hover:bg-red-600'
  },
]

export default function ProductTabs({ products }: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState(tabs[0].id)

  const filteredProducts = useMemo(() => {
    switch (activeTab) {
      case 'new-arrivals':
        return products.filter(product => product.isNew === true);
      case 'featured':
        return products // all  products as featured
      case 'top-selling':
        return products.filter(product => product.rating && product.rating >= 4.5); // Products with high ratings
      default:
        return products;
    }
  }, [activeTab, products]);

  return (
    <div className="w-full bg-primary">
      <div className="w-full max-w-6xl  mx-auto px-2 py-4">      
        <div className="flex justify-center gap-4 pb-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-2 py-2 md:py-2 rounded-[4px] w-35 text-md transition-colors flex items-center gap-2 ${
                activeTab === tab.id
                  ? `${tab.bgColor} text-white`
                  : `bg-gray-100 ${tab.hoverBg}`
              }`}
            >
              <tab.icon className="h-5 w-5" />
              {tab.label}
            </button>
          ))}
        </div>
        <DesktopProductGrid products={filteredProducts} />
        <MobileProductGrid products={filteredProducts} />
      </div>
    </div>
  )
}
