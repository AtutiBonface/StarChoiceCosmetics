import TopBrands from "@/components/BrandsCard/top-brands";
import NewArrivals from "@/components/Products/newArrivals";
import PromotionSlider from "@/components/promotion-slider/promotion-slider";

export default function Home() {
  return (    
    <div className="w-full mt-28 md:mt-38 gap-4 flex flex-col items-center">
     <PromotionSlider/>
     <TopBrands/>
     <NewArrivals/>
    </div>
  );
}
