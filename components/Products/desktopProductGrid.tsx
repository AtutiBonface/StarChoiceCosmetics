'use client'
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { ProductItem } from "./productItem";
import { Product } from "@/mockData";

interface DesktopProductGridProps {
  title: string;
  products: Product[];
  initialRows?: number;
  itemsPerRow?: number;
}
// Desktop component with "Show More" button
export const DesktopProductGrid : React.FC<DesktopProductGridProps> = ({ 
  title, 
  products, 
  initialRows = 2,
  itemsPerRow = 5
}) => {
  const [visibleItems, setVisibleItems] = useState(initialRows * itemsPerRow);
  const hasMoreItems = visibleItems < products.length;

  const handleAddToCart = (e:React.MouseEvent, productId: string) => {
    e.stopPropagation();
    console.log('Adding to cart:', productId);
  };

  const showMoreItems = () => {
    setVisibleItems(prev => Math.min(prev + initialRows * itemsPerRow, products.length));
  };

  return (
    <section className="max-w-7xl mx-auto px-2 py-2 hidden md:block">
      <div className="product-title relative flex justify-center items-center mb-2 mx-3">
        <span className="text-3xl font-bold text-secondary bg-primary px-3 z-10">{title}</span>
      </div>

      <div className="grid grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 md:gap-4">
        {products.slice(0, visibleItems).map((product) => (
          <ProductItem 
            key={product.id} 
            product={product} 
            handleAddToCart={handleAddToCart} 
          />
        ))}
      </div>

      {hasMoreItems && (
        <div className="flex justify-center mt-6">
          <button 
            onClick={showMoreItems}
            className="flex items-center gap-2 bg-accent-1 hover:bg-accent-1/90 text-white py-2 px-6 rounded transition-colors"
          >
            Show More <ChevronDown size={16} />
          </button>
        </div>
      )}
    </section>
  );
};