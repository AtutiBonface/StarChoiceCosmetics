import { ShoppingCart, Star } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import Toast from './toast-notification';
import { useRouter } from 'next/navigation';
import { Product } from '@/mockData';

interface ProductProps {
  product: Product;
  handleAddToCart: (e: React.MouseEvent, productId: string) => void;
}

export const ProductItem: React.FC<ProductProps> = ({ product, handleAddToCart }) => {
  const router = useRouter();
  const [showToast, setShowToast] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const [isNavigating, setIsNavigating] = useState(false);

  const handleProductClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isNavigating) return;
    
    setIsNavigating(true);
    router.push(`/products/${product.id}`);
  };

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (isAdding) return;

    setIsAdding(true);
    try {
      handleAddToCart(e, product.id.toString());
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } catch (error) {
      console.error('Failed to add to cart:', error);
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <>
      <Toast
        message="Product added to cart successfully!"
        type="success"
        isVisible={showToast}
        onClose={() => setShowToast(false)}
      />

      <div className="bg-transparent p-2 relative group">
        <div onClick={handleProductClick} className="block relative">
          {/* Discount Badge */}
          {product.discount && (
            <div className="absolute top-2 left-2 z-10">
              <span className="bg-orange-400 text-contrast text-xs font-medium px-2 py-1 rounded-full">
                {product.discount}% OFF
              </span>
            </div>
          )}

          {/* New Badge */}
          {product.isNew && (
            <div className="absolute top-2 right-2 z-10">
              <span className="bg-green-500 text-contrast text-xs font-medium px-2 py-1 rounded-full">
                New
              </span>
            </div>
          )}

          {/* Product Image */}
          <div className="relative h-40 sm:h-48 mb-4 overflow-hidden rounded-lg">
            <Image
              src={product.images[0].url}
              alt={product.name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
              className="object-contain group-hover:scale-105 transition-transform duration-200"
            />
          </div>

          {/* Product Name */}
          <h3 className="text-sm font-medium mb-2 h-12 overflow-hidden group-hover:text-accent-1">
            <span className="line-clamp-2">{product.name}</span>
          </h3>
        </div>

        {/* Ratings Section */}
        <div className="h-4 mb-2">
          {product.rating ? (
            <div className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
              <span className="text-xs text-primary">{product.rating}</span>
             {/*  {product.reviews && (
                <span className="text-xs text-secondary">({product.reviews.length})</span>
              )} */}
            </div>
          ) : null}
        </div>

        {/* Price Section */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-base sm:text-lg font-bold text-accent-1">
            KES {product.price.toLocaleString()}
          </span>
          {product.oldPrice && (
            <span className="text-xs sm:text-sm text-secondary line-through">
              KES {product.oldPrice.toLocaleString()}
            </span>
          )}
        </div>

        {/* Action Button */}
        {product.hasVariants ? (
          <button 
            className="w-full bg-secondary hover:bg-secondary/90 text-contrast py-2 px-4 rounded-[4px] transition-colors text-sm sm:text-base"
          >
            Select Options
          </button>
        ) : (
          <button 
            onClick={handleClick}
            disabled={isAdding}
            className={`w-full bg-accent-1 hover:bg-accent-1/90 text-contrast py-2 px-4 rounded-[4px] transition-colors flex items-center justify-center gap-2 text-sm sm:text-base
              ${isAdding ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            <ShoppingCart size={16} className={isAdding ? 'animate-spin' : ''} />
            {isAdding ? 'Adding...' : 'Add to Cart'}
          </button>
        )}
      </div>
    </>
  );
};