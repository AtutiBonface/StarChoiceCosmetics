'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronRight, Heart, ShoppingCart, Trash2 } from 'lucide-react'

// Mock wishlist data - replace with your actual data
const initialWishlistItems = [
  {
    id: 1,
    name: "Nivea Perfect & Radiant Luminous630",
    price: 1299,
    oldPrice: 1499,
    image: "/nivea-oil.webp",
    inStock: true
  },
  {
    id: 2,
    name: "Nivea Perfect & Radiant Luminous630",
    price: 1299,
    oldPrice: 1499,
    image: "/nivea-oil.webp",
    inStock: false
  },
  {
    id: 3,
    name: "Nivea Perfect & Radiant Luminous630",
    price: 1299,
    oldPrice: 1499,
    image: "/nivea-oil.webp",
    inStock: false
  },
  {
    id: 4,
    name: "Nivea Perfect & Radiant Luminous630",
    price: 1299,
    oldPrice: 1499,
    image: "/nivea-oil.webp",
    inStock: false
  },
]

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState(initialWishlistItems)

  const removeFromWishlist = (id: number) => {
    setWishlistItems(items => items.filter(item => item.id !== id))
  }

  return (
    <div className="w-full mt-28 md:mt-38">
      {/* Breadcrumb */}
      <div className="w-full bg-[#A9BA9D]">
        <div className="max-w-7xl mx-auto px-4 py-2">
          <div className="flex items-center gap-2 text-sm text-[#333333]">
            <Link href="/" className="hover:text-pink-600">Home</Link>
            <ChevronRight size={16} />
            <span className="text-pink-600">Wishlist</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
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
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 md:mx-12">
            {wishlistItems.map((item) => (
              <div 
                key={item.id}
                className="group bg-transparent p-4 rounded-[1px] relative"
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

                <div className="flex items-center gap-2 mb-4">
                  <span className="text-lg font-bold text-pink-600">
                    KES {item.price.toLocaleString()}
                  </span>
                  {item.oldPrice && (
                    <span className="text-sm text-gray-500 line-through">
                      KES {item.oldPrice.toLocaleString()}
                    </span>
                  )}
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
        )}
      </div>
    </div>
  )
}

export default Wishlist