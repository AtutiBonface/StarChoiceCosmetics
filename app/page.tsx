import dynamic from 'next/dynamic';
import { products } from '@/mockData';
import { BrandsSkeleton } from '@/components/skeletons';
import ProductTabs from '@/components/Products/product-tabs';
import React from 'react';
import CategoryCarousel from '@/components/category/category';
const TopBrands = dynamic(() => import("@/components/BrandsCard/top-brands"), {
  loading: () => <BrandsSkeleton/>,
  ssr: true
});

const PromotionSlider = dynamic(() => import("@/components/promotion-slider/promotion-slider"), {
  loading: () => <div>...</div>,
  ssr: true
});



export default function Home() {
  return (  
    <div className="bg-secondary text-primary flex flex-col items-center gap-4">
      <PromotionSlider/>
      <TopBrands/>
      <CategoryCarousel/>
      <ProductTabs products={products} />      
    </div>
  );
}
