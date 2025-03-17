import DesktopProductGrid from "./desktopProductGrid";
import MobileProductGrid from "./mobileProductGrid";
import {  Product } from "@/mockData";
// Example 2: Using the components separately
interface Group{
  group_name: string;
  products: Product[] 
}
export  const ProductsItemsGroups : React.FC<Group> = ({ group_name , products }) => {
  return (
    <>
      <DesktopProductGrid 
        title={group_name} 
        products={products} 
      />
      <MobileProductGrid 
        title={group_name}
        products={products} 
      />
    </>
  );
}