import  DesktopProductGrid from "./ProductGrid";
import  MobileProductGrid  from "./mobileProductGrid";
// Example 2: Using the components separately
import { products } from "@/mockData";
export  const RelatedProducts = () => {
  return (
    <>
      <div className="hidden md:block">
        <DesktopProductGrid 
          products={products} 
        />
      </div>
      <MobileProductGrid 
        products={products} 
      />
    </>
  );
}