import DesktopProductGrid from "./ProductGrid";
import MobileProductGrid from "./mobileProductGrid";
import {  Product } from "@/mockData";
// Example 2: Using the components separately
interface Group{
  products: Product[] 
}
export  const ProductsItemsGroups : React.FC<Group> = ({ products }) => {
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