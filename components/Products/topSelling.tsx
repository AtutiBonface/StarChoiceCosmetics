'use client'
import DesktopProductGrid  from "./desktopProductGrid";
import MobileProductGrid  from "./mobileProductGrid";
import { products} from "@/mockData";
export  const TopSelling = () => {  
  return (
    <>     
        <DesktopProductGrid 
        
          products={products} 
        />
      
        <MobileProductGrid 
        
          products={products} 
        />

    </>
  );
}