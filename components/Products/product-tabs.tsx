'use client'
import { Product } from '@/mockData'
import { DesktopGridSkeleton } from '../skeletons';
import dynamic from 'next/dynamic';

const ProductGrid = dynamic(() => import('./ProductGrid'), {
  loading: () => <DesktopGridSkeleton />,
  ssr: true
});



interface ProductTabsProps {
  products: Product[]
}

export default function ProductTabs({ products }: ProductTabsProps) {
  
  return (
    <div className="w-full bg-primary">
      
        <ProductGrid products={products} />
     
    </div>
  )
}
