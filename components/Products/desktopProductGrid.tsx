'use client'
import { ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
import { ProductItem } from "./productItem";
import { Product } from "@/mockData";

interface DesktopProductGridProps {
  title: string;
  products: Product[];
  minimumRows?: number;
  itemsPerRow?: number;
}

export const DesktopProductGrid: React.FC<DesktopProductGridProps> = ({ 
  title, 
  products, 
  minimumRows = 2,
  itemsPerRow = 5
}) => {
  const [visibleItems, setVisibleItems] = useState(minimumRows * itemsPerRow);
  const [currentColumns, setCurrentColumns] = useState(5);
  const hasMoreItems = visibleItems < products.length;

  useEffect(() => {
    const updateVisibleItems = () => {
      let cols = 5; // Default XL screens (5 columns)
      
      if (window.innerWidth < 1280) { 
        cols = 4; // LG screens
      }
      if (window.innerWidth < 1024) { 
        cols = 3; // MD screens
      }      
      setCurrentColumns(cols);      
      // For smaller screens, we show more rows to maintain a similar area of content
      const adjustedRows = Math.ceil(minimumRows * (itemsPerRow / cols));      
      setVisibleItems(adjustedRows * cols);
    };
      // Calculate rows based on screen width

    updateVisibleItems();
    
    window.addEventListener('resize', updateVisibleItems);
    
    return () => window.removeEventListener('resize', updateVisibleItems);
  }, [minimumRows, itemsPerRow]);

  const handleAddToCart = (e: React.MouseEvent, productId: string) => {
    e.stopPropagation();
    console.log('Adding to cart:', productId);
  };

  const showMoreItems = () => {
    // Add more items based on current column count
    setVisibleItems(prev => Math.min(prev + currentColumns * 2, products.length));
  };

  return (
    <section className="max-w-6xl mx-auto px-2 py-2 hidden md:block">
      {title && (
        <div className="product-title relative flex justify-center items-center mb-2 mx-3">
          <span className="text-3xl font-bold text-secondary bg-primary px-3 z-10">{title}</span>
        </div>

      )}
      <div className="grid grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 md:gap-4  ">
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