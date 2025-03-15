import { DesktopProductGrid } from "./desktopProductGrid";
import { MobileProductGrid } from "./mobileProductGrid";
// Example 2: Using the components separately
import { products } from "@/mockData";
export  const TopSelling = () => {
  return (
    <>
      <DesktopProductGrid 
        title="Top Selling Products" 
        products={products} 
      />
      <MobileProductGrid 
        title="Top Selling Products" 
        products={products} 
      />
    </>
  );
}