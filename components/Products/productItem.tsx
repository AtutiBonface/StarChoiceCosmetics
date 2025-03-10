
import { ShoppingCart, Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from './utils';

interface ProductProps {
  product: Product
  handleAddToCart: (e: React.MouseEvent, productId: string) => void;
}
// Product item component to avoid duplication
export  const ProductItem : React.FC<ProductProps>   = ({ product, handleAddToCart }) => {
  return (
    <div key={product.id} className="bg-transparent p-2">
      <Link href={`/products/${product.id}`} className="block group relative">
        {/* Discount Badge - Left */}
        {product.discount && (
          <div className="absolute top-2 left-2 z-10">
            <span className="bg-pink-600 text-white text-xs font-medium px-2 py-1 rounded-full">
              {product.discount}% OFF
            </span>
          </div>
        )}

        {/* New Badge - Right */}
        {product.isNew && (
          <div className="absolute top-2 right-2 z-10">
            <span className="bg-green-600 text-white text-xs font-medium px-2 py-1 rounded-full">
              New
            </span>
          </div>
        )}

        {/* Product Image */}
        <div className="relative h-48 mb-4">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-contain group-hover:scale-105 transition-transform duration-200"
          />
        </div>

        {/* Product Name */}
        <h3 className="text-sm font-medium mb-2 h-12 overflow-hidden group-hover:text-pink-600">
          <span className="line-clamp-2">{product.name}</span>
        </h3>
      </Link>

      {/* Ratings Section */}
      <div className="h-4 mb-2">
        {product.rating ? (
          <div className="flex items-center gap-1">
            <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
            <span className="text-xs text-[#333333]">{product.rating}</span>
            {product.reviews && (
              <span className="text-xs text-gray-500">({product.reviews})</span>
            )}
          </div>
        ) : null}
      </div>

      {/* Price Section */}
      <div className="flex items-center gap-2 mb-4">
        <span className="text-lg font-bold text-pink-600">
          KES {product.price.toLocaleString()}
        </span>
        {product.oldPrice && (
          <span className="text-sm text-gray-500 line-through">
            KES {product.oldPrice.toLocaleString()}
          </span>
        )}
      </div>

      {/* Action Button */}
      {product.hasVariants ? (
        <button 
          onClick={(e) => e.stopPropagation()}
          className="w-full bg-secondary hover:bg-secondary/90 text-white py-2 px-4 rounded-[1px] transition-colors"
        >
          Select Options
        </button>
      ) : (
        <button 
          onClick={(e) => handleAddToCart(e, product.id.toString())}
          className="w-full bg-pink-600 hover:bg-pink-600/90 text-white py-2 px-4 rounded-[1px] transition-colors flex items-center justify-center gap-2"
        >
          <ShoppingCart size={18} />
          Add to Cart
        </button>
      )}
    </div>
  )
}