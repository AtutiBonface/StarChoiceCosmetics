import dynamic from 'next/dynamic';
import { products } from '@/mockData';
import { BrandsSkeleton, DesktopGridSkeleton } from '@/components/skeletons';
import CategorySkeleton from '@/components/skeletons/CategorySkeleton';
import React from 'react';

const TopBrands = dynamic(() => import("@/components/BrandsCard/top-brands"), {
  loading: () => <BrandsSkeleton/>,
  ssr: true
});

const PromotionSlider = dynamic(() => import("@/components/promotion-slider/promotion-slider"), {
  loading: () => <div>...</div>,
  ssr: true
});

const ProductGrid = dynamic(() => import('@/components/Products/ProductGrid'), {
  loading: () => <DesktopGridSkeleton />,
  ssr: true
});

const CategoryCarousel = dynamic(() => import("@/components/category/category"), {
  loading: () => <CategorySkeleton />,
  ssr: true
});

export default function Home() {
  return (  
    <div className="bg-secondary text-primary flex flex-col items-center gap-4">
      <PromotionSlider/>
      <TopBrands/>
      <CategoryCarousel/>
      <ProductGrid products={products} title='New Arrivals'/>  
      <ProductGrid products={products} title='Top Sales'/>      
    </div>
  );
}
