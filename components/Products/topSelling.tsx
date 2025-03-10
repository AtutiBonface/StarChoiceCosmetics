import { DesktopProductGrid } from "./desktopProductGrid";
import { MobileProductGrid } from "./mobileProductGrid";
import products from "./utils";
// Example 2: Using the components separately
export  const TopSelling = () => {
  return (
    <>
      <DesktopProductGrid 
        title="Top Selling Products" 
        products={products} 
        initialRows={3} // Only show 1 row initially
      />
      <MobileProductGrid 
        title="Top Selling Products" 
        products={products} 
      />
    </>
  );
}