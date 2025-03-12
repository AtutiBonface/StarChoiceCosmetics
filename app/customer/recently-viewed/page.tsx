'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronRight, Heart,  ShoppingCart } from 'lucide-react'

interface RecentProduct {
  id: number
  name: string
  image: string
  price: number
  brand: string
  slug: string
  viewedAt: string
}

export default function RecentlyViewedPage() {
  const [recentProducts] = useState<RecentProduct[]>([
    {
      id: 1,
      name: "Nivea Oil in Lotion Cocoa Nourish",
      image: "/nivea-oil.webp",
      price: 899,
      brand: "Nivea",
      slug: "nivea-oil-lotion-cocoa",
      viewedAt: "2024-03-10T10:30:00Z"
    },
    {
      id: 2,
      name: "CeraVe Moisturizing Cream",
      image: "/cerave-oil.webp",
      price: 2499,
      brand: "CeraVe",
      slug: "cerave-moisturizing-cream",
      viewedAt: "2024-03-09T15:45:00Z"
    }
  ])

  const handleAddToWishlist = (productId: number) => {
    // Add wishlist logic
    console.log('Add to wishlist:', productId)
  }

  const handleAddToCart = (productId: number) => {
    // Add to cart logic
    console.log('Add to cart:', productId)
  }


  return (
    <div className="w-full">
      {/* Breadcrumb */}
      <div className="w-full bg-secondary">
        <div className="max-w-7xl mx-auto px-4 py-2">
          <div className="flex items-center gap-2 text-sm text-secondary">
            <Link href="/" className="hover:text-accent-1">Home</Link>
            <ChevronRight size={16} />
            <span className="text-accent-1">Recently Viewed</span>
          </div>
        </div>
      </div>

      <div className="px-4 py-4 bg-primary shadow-sm rounded-[4px] h-full">
        {/* Header */}
        <div className="mb-6">
          <p className="text-gray-600">Products you&apos;ve recently viewed</p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {recentProducts.length === 0 ? (
            <div className="col-span-full text-center py-4  rounded-[4px] bg-primary text-gray-500">
              <p className="text-lg mb-1">No recently viewed products</p>
              <p className="text-sm">Products you view will appear here</p>
            </div>
          ) : (
            recentProducts.map((product) => (
              <div key={product.id} className="group">
                <div className="bg-primary rounded-[4px] p-2 relative"> {/* Added relative positioning */}
                  {/* Wishlist Button - Moved to top right */}
                  <button
                    onClick={() => handleAddToWishlist(product.id)}
                    className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center bg-white shadow-sm rounded-full text-secondary hover:text-accent-1 transition-colors z-10"
                  >
                    <Heart size={18} />
                  </button>

                  {/* Product Image */}
                  <Link href={`/products/${product.slug}`}>
                    <div className="relative h-40 mb-2">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-contain"
                      />
                    </div>
                  </Link>

                  {/* Product Info */}
                  <div className="space-y-1">
                    <p className="text-xs text-gray-500">{product.brand}</p>
                    <Link 
                      href={`/products/${product.slug}`}
                      className="block font-medium text-sm text-primary hover:text-accent-1 truncate"
                    >
                      {product.name}
                    </Link>
                    <p className="text-sm font-semibold text-accent-1">
                      KES {product.price.toLocaleString()}
                    </p>
                  </div>

                  <div className="mt-2 pt-2">
                    <button
                      onClick={() => handleAddToCart(product.id)}
                      className="w-full flex items-center justify-center gap-2 bg-accent-1 text-white py-2 hover:bg-pink-700 transition-colors rounded-[4px]"
                    >
                      <ShoppingCart size={16} />
                      <span className="text-sm">Add to Cart</span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}