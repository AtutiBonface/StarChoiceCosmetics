'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronRight, Heart, ShoppingCart, Trash2, Star } from 'lucide-react'

// Mock wishlist data - replace with your actual data
const initialWishlistItems = [
  {
    id: 1,
    name: "Nivea Perfect & Radiant Luminous630",
    price: 1299,
    oldPrice: 1499,
    image: "/nivea-oil.webp",
    inStock: true,
    rating: 4.2,
    reviewCount: 950
  },
  {
    id: 2,
    name: "Nivea Perfect & Radiant Luminous630",
    price: 1299,
    oldPrice: 1499,
    image: "/nivea-oil.webp",
    inStock: false,
    rating: 4.5,
    reviewCount: 1250
  },
  {
    id: 3,
    name: "Nivea Perfect & Radiant Luminous630",
    price: 1299,
    oldPrice: 1499,
    image: "/nivea-oil.webp",
    inStock: true,
    rating: 3.8,
    reviewCount: 420
  },
  {
    id: 4,
    name: "Nivea Perfect & Radiant Luminous630",
    price: 1299,
    oldPrice: 1499,
    image: "/nivea-oil.webp",
    inStock: false,
    rating: 4.0,
    reviewCount: 780
  },
]

export default function WishlistPage() {
  const [wishlistItems, setWishlistItems] = useState(initialWishlistItems)

  const removeFromWishlist = (id :number) => {
    setWishlistItems(items => items.filter(item => item.id !== id))
  }

  // Function to render star rating
  const renderRating = (rating: number) => {
    return (
      <div className="flex items-center">
        <span className="text-amber-500 mr-1">{rating}</span>
        <div className="flex">
          {[...Array(5)].map((_, i) => (
            <Star 
              key={i} 
              size={14} 
              className={`${i < Math.floor(rating) ? 'text-amber-500 fill-amber-500' : 'text-gray-300'}`} 
            />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="bg-primary text-primary">
      {/* Breadcrumb */}
      <div className="w-full bg-secondary">
        <div className="max-w-7xl mx-auto px-4 py-2">
          <div className="flex items-center gap-2 text-sm text-secondary">
            <Link href="/" className="hover:text-accent-1">Home</Link>
            <ChevronRight size={16} />
            <span className="text-accent-1">Wishlist</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-2 py-4">
        {wishlistItems.length === 0 ? (
          <div className="text-center py-12">
            <div className="mb-4">
              <Heart className="w-12 h-12 text-pink-600 mx-auto" />
            </div>
            <p className="text-[#5C4033] mb-6">Your wishlist is empty</p>
            <Link 
              href="/"
              className="inline-block bg-pink-600 text-white px-6 py-3 rounded-[1px] hover:bg-pink-600/90 transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <>
            {/* Desktop View - Grid Layout */}
            <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:mx-12">
              {wishlistItems.map((item) => (
                <div 
                  key={item.id}
                  className="group bg-transparent p-4 rounded-[1px] relative border border-gray-200"
                >
                  {/* Product Image */}
                  <div className="relative aspect-square mb-4">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover rounded-[1px]"
                    />
                    <button
                      onClick={() => removeFromWishlist(item.id)}
                      className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-pink-600 hover:text-white transition-colors"
                      aria-label="Remove from wishlist"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>

                  {/* Product Info */}
                  <Link href={`/products/${item.id}`}>
                    <h3 className="font-medium text-[#333333] line-clamp-2 mb-2 hover:text-pink-600">
                      {item.name}
                    </h3>
                  </Link>

                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg font-bold text-pink-600">
                      KES {item.price.toLocaleString()}
                    </span>
                    {item.oldPrice && (
                      <span className="text-sm text-gray-500 line-through">
                        KES {item.oldPrice.toLocaleString()}
                      </span>
                    )}
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-4">
                    {renderRating(item.rating)}
                    <span className="text-xs text-gray-500">({item.reviewCount})</span>
                  </div>

                  {/* Actions */}
                  <button 
                    className={`w-full flex items-center justify-center gap-2 py-2 px-4 rounded-[1px] transition-colors
                      ${item.inStock 
                        ? 'bg-pink-600 text-white hover:bg-pink-600/90' 
                        : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                      }`}
                    disabled={!item.inStock}
                  >
                    <ShoppingCart size={18} />
                    {item.inStock ? 'Add to Cart' : 'Out of Stock'}
                  </button>
                </div>
              ))}
            </div>

            {/* Mobile View  */}
            <div className="sm:hidden space-y-4">
              {wishlistItems.map((item) => (
                <div 
                  key={item.id}
                  className="flex border border-medium   rounded-[1px] overflow-hidden relative py-2"
                >
                  {/* Product Image */}
                  <div className="relative w-32 h-32 my-auto ml-2  flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 p-3 flex flex-col justify-between">
                    <div>
                      <Link href={`/products/${item.id}`}>
                        <h3 className="font-medium text-[#333333] line-clamp-2 text-sm hover:text-pink-600">
                          {item.name}
                        </h3>
                      </Link>

                      {/* Rating */}
                      <div className="flex items-center gap-1 my-1">
                        {renderRating(item.rating)}
                        <span className="text-xs text-gray-500">({item.reviewCount})</span>
                      </div>

                      {/* Price */}
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-base font-bold text-pink-600">
                          KES {item.price.toLocaleString()}
                        </span>
                        {item.oldPrice && (
                          <span className="text-xs text-gray-500 line-through">
                            KES {item.oldPrice.toLocaleString()}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Actions Row */}
                    <div className="flex items-center gap-2 mt-2">
                      <button 
                        className={`flex-1  flex items-center justify-center gap-1 py-2 text-xs rounded-[1px] transition-colors
                          ${item.inStock 
                            ? 'bg-pink-600 text-white hover:bg-pink-600/90' 
                            : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                          }`}
                        disabled={!item.inStock}
                      >
                        <ShoppingCart size={14} />
                        {item.inStock ? 'Add to Cart' : 'Out of Stock'}
                      </button>
                      <button
                        onClick={() => removeFromWishlist(item.id)}
                        className="p-2 bg-gray-100 rounded-[1px] hover:bg-gray-200 transition-colors"
                        aria-label="Remove from wishlist"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}