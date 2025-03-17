import dynamic from 'next/dynamic';
import { products } from '@/mockData';
import { BrandsSkeleton, DesktopGridSkeleton, MobileGridSkeleton } from '@/components/skeletons';
import React from 'react';
const TopBrands = dynamic(() => import("@/components/BrandsCard/top-brands"), {
  loading: () => <BrandsSkeleton/>,
  ssr: true
});

const PromotionSlider = dynamic(() => import("@/components/promotion-slider/promotion-slider"), {
  loading: () => <div>...</div>,
  ssr: true
});

const DesktopProductGrid = dynamic(() => import('@/components/Products/desktopProductGrid'), {
  loading: () => <DesktopGridSkeleton />,
  ssr: true
});

const MobileProductGrid = dynamic(() => import('@/components/Products/mobileProductGrid'), {
  loading: () => <MobileGridSkeleton />,
  ssr: true
});

export default function Home() {
  return (  
    <div className="bg-primary text-primary">
      <PromotionSlider/>
      <TopBrands/>

      <React.Fragment key={"top-selling"}>     
        <DesktopProductGrid 
          title="Top Selling Products" 
          products={products} 
        />
      
        <MobileProductGrid 
          title="Top Selling Products" 
          products={products} 
        />
      </React.Fragment>
    </div>
  );
}
