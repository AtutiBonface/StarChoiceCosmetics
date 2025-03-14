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
        initialRows={2} // Only show 1 row initially
      />
      <MobileProductGrid 
        title="Top Selling Products" 
        products={products} 
      />
    </>
  );
}