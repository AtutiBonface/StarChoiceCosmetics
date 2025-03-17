import dynamic from 'next/dynamic';
import { products } from '@/mockData';
import { BrandsSkeleton } from '@/components/skeletons';
import ProductTabs from '@/components/Products/product-tabs';
import React from 'react';
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
    <div className="bg-primary text-primary">
      <PromotionSlider/>
      <TopBrands/>
      <ProductTabs products={products} />      
    </div>
  );
}
