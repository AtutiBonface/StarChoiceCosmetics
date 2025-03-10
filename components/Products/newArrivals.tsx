import { DesktopProductGrid } from "./desktopProductGrid";
import { MobileProductGrid } from "./mobileProductGrid";
import products from "./utils";
// Example 2: Using the components separately
export  const NewArrivals = () => {
  return (
    <>
      <DesktopProductGrid 
        title="New Arrivals" 
        products={products} 
        initialRows={1} // Only show 1 row initially
      />
      <MobileProductGrid 
        title="New Arrivals" 
        products={products} 
      />
    </>
  );
}