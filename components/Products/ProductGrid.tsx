'use client'
import { ArrowRight, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
import { ProductItem } from "./productItem";
import { Product } from "@/mockData";
import { useRouter } from "next/navigation";

interface ProductGridProps {
  products: Product[];
  minimumRows?: number;
  title?: string
}

const ProductGrid: React.FC<ProductGridProps> = ({ 
  products, 
  minimumRows = 2,
  title = ""
}) => {
  const itemsPerRow = 5;
  const [visibleItems, setVisibleItems] = useState(minimumRows * itemsPerRow);
  const [currentColumns, setCurrentColumns] = useState(5);
  const hasMoreItems = visibleItems < products.length;
  const router = useRouter();

  useEffect(() => {
    const updateVisibleItems = () => {
      let cols = 5; // Default XL screens (5 columns)
      let initialRows = 1; // Default number of rows
      
      if (window.innerWidth < 1280) { 
        cols = 4; // LG screens
        initialRows = 1;
      }
      if (window.innerWidth < 1024) { 
        cols = 3; // MD screens
        initialRows = 2;
      }
      if (window.innerWidth < 768) { 
        cols = 2; // SM screens
        initialRows = 3;
      }
      
      setCurrentColumns(cols);      
      setVisibleItems(initialRows * cols);
    };

    updateVisibleItems();
    
    window.addEventListener('resize', updateVisibleItems);
    
    return () => window.removeEventListener('resize', updateVisibleItems);
  }, []);

  const handleAddToCart = (e: React.MouseEvent, productId: string) => {
    e.stopPropagation();
    console.log('Adding to cart:', productId);
  };

  const showMoreItems = () => {
    // Add more items based on current column count
    setVisibleItems(prev => Math.min(prev + currentColumns * 2, products.length));
  };

  return (
    <div key={title} className="w-full bg-primary">
      <section className="max-w-6xl mx-auto px-2 py-3">
        {title && (
          <div className="relative mb-3">
            <div className="relative mb-8 text-center">
              <h2 className="text-3xl font-bold text-accent-1 inline-block relative z-10 px-4 bg-primary">
                {title}
              </h2>
              <div className="absolute w-full h-px bg-gray-200 top-1/2 left-0 z-0"></div>
            </div>

          {hasMoreItems && (
            <button 
              onClick={()=> router.push(`/categories?category=${encodeURIComponent(title)}`)}
              className="md:hidden absolute right-0 px-4 top-1/2 transform -translate-y-1/2 z-20 bg-primary flex items-center gap-2 text-accent-1  rounded transition-colors text-sm"
            >
              Show More <ArrowRight size={14} />
            </button>
          )}
        </div>
        )}

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 md:gap-4">
          {products.slice(0, visibleItems).map((product) => (
            <ProductItem 
              key={product.id} 
              product={product} 
              handleAddToCart={handleAddToCart} 
            />
          ))}
        </div>

        {/* Show button at bottom only for desktop */}
        {hasMoreItems && (
          <div className="hidden md:flex justify-center mt-6">
            <button 
              onClick={showMoreItems}
              className="flex items-center gap-2 bg-accent-1 hover:bg-accent-1/90 text-white py-2 px-6 rounded transition-colors"
            >
              Show More <ChevronDown size={16} />
            </button>
          </div>
        )}
      </section>
    </div>
  );
};

export default ProductGrid;