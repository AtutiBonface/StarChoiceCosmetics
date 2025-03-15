import { DesktopProductGrid } from "./desktopProductGrid";
import { MobileProductGrid } from "./mobileProductGrid";
import { products } from "@/mockData";
// Example 2: Using the components separately
export  const NewArrivals = () => {
  return (
    <>
      <DesktopProductGrid 
        title="New Arrivals" 
        products={products} 
      />
      <MobileProductGrid 
        title="New Arrivals" 
        products={products} 
      />
    </>
  );
}