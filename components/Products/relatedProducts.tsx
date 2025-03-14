import { DesktopProductGrid } from "./desktopProductGrid";
import { MobileProductGrid } from "./mobileProductGrid";
// Example 2: Using the components separately
import { products } from "@/mockData";
export  const RelatedProducts = () => {
  return (
    <>
      <DesktopProductGrid 
        title="Related Products" 
        products={products} 
        initialRows={1} // Only show 1 row initially
      />
      <MobileProductGrid 
        title="Related Products" 
        products={products} 
      />
    </>
  );
}