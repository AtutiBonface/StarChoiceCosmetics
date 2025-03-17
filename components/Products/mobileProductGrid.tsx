'use client'
import { useEffect, useRef, useState, useCallback } from "react";
import { ProductItem } from "./productItem";
import { Loader } from "lucide-react";
import { Product } from "@/mockData";


interface MobileProductGridProps {
  title: string;
  products: Product[];
}
const MobileProductGrid : React.FC<MobileProductGridProps> = ({ title, products }) => {
  const [visibleItems, setVisibleItems] = useState(4);
  const [loading, setLoading] = useState(false);
  const observerTarget = useRef<HTMLDivElement>(null);
  const loadMoreThreshold = 100;

  const handleAddToCart = (e:React.MouseEvent , productId: string) => {
    e.stopPropagation();
    console.log('Adding to cart:', productId);
  };

  const loadMoreItems = useCallback(() => {
    if (loading || visibleItems >= products.length) return;
    
    setLoading(true);
    // nime simulate network request with setTimeout. 
    setTimeout(() => {
      setVisibleItems(prev => Math.min(prev + 4, products.length));
      setLoading(false);
    }, 500);
  }, [loading, visibleItems, products.length]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMoreItems();
        }
      },
      { threshold: 0.1, rootMargin: `0px 0px ${loadMoreThreshold}px 0px` }
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
      loadMoreItems(); // Initial load
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [loadMoreItems, loadMoreThreshold]); // Added loadMoreItems to dependencies

  return (
    <section className="max-w-7xl mx-auto px-2 py-2 md:hidden">
      {title && (
        <div className="product-title relative flex justify-center items-center mb-2">
          <span className="text-2xl font-bold text-primary bg-primary px-3 z-10">{title}</span>
      </div>
      )}

      <div className="grid grid-cols-2 gap-2">
        {products.slice(0, visibleItems).map((product) => (
          <ProductItem 
            key={product.id} 
            product={product} 
            handleAddToCart={handleAddToCart} 
          />
        ))}
      </div>

      {visibleItems < products.length && (
        <div ref={observerTarget} className="h-4 w-full my-4">
          {loading && (
            <div className="flex justify-center">              
              <Loader className="h-5 w-5 animate-spin text-accent-1" />      
            </div>
          )}
        </div>
      )}
    </section>
  );
};

export default MobileProductGrid;