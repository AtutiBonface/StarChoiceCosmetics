import TopBrands from "@/components/BrandsCard/top-brands";
import NewArrivals from "@/components/Products/newArrivals";
import PromotionSlider from "@/components/promotion-slider/promotion-slider";

export default function Home() {
  return (    
    <div className="mt-16 gap-4 flex flex-col items-center">
     <PromotionSlider/>
     <TopBrands/>
     <NewArrivals/>
    </div>
  );
}
