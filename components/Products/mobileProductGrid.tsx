'use client'
import { useEffect, useRef, useState } from "react";
import { Product } from "./utils";
import { ProductItem } from "./productItem";


interface MobileProductGridProps {
  title: string;
  products: Product[];
  loadMoreThreshold?: number;
}
export const MobileProductGrid : React.FC<MobileProductGridProps> = ({ title, products, loadMoreThreshold = 200 }) => {
  const [visibleItems, setVisibleItems] = useState(6);
  const [loading, setLoading] = useState(false);
  const observerTarget = useRef(null);

  const handleAddToCart = (e , productId: string) => {
    e.stopPropagation();
    console.log('Adding to cart:', productId);
  };

  const loadMoreItems = () => {
    if (loading || visibleItems >= products.length) return;
    
    setLoading(true);
    // Simulate network request with setTimeout
    setTimeout(() => {
      setVisibleItems(prev => Math.min(prev + 4, products.length));
      setLoading(false);
    }, 500);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMoreItems();
        }
      },
      { threshold: 0.1, rootMargin: `0px 0px ${loadMoreThreshold}px 0px` }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [observerTarget, loading, visibleItems, products.length]);

  return (
    <section className="max-w-7xl mx-auto px-2 py-2 md:hidden">
      <div className="product-title relative flex justify-center items-center mb-2 mx-3">
        <span className="text-2xl font-bold text-[#333333] bg-[#F8F1E9] px-3 z-10">{title}</span>
      </div>

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
              <div className="animate-pulse bg-gray-200 h-4 w-12 rounded"></div>
            </div>
          )}
        </div>
      )}
    </section>
  );
};