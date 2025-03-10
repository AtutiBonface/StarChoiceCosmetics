import TopBrands from "@/components/BrandsCard/top-brands";
import PromotionSlider from "@/components/promotion-slider/promotion-slider";
import { TopSelling } from "@/components/Products/topSelling";
import { NewArrivals } from "@/components/Products/newArrivals";



export default function Home() {
  return (  
    <div className="w-full mt-28 md:mt-38 gap-4 flex flex-col items-center">
      <PromotionSlider/>
      <TopBrands/>
      <TopSelling/>
      <NewArrivals/>   

    </div>
  );
}
