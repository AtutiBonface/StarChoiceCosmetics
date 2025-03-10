'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Heart, Star, ChevronRight, ShoppingCart } from 'lucide-react'

// Mock data for offers
const offers = [
  {
    id: 1,
    name: 'Nivea Perfect & Radiant',
    slug: 'nivea-perfect-radiant',
    image: '/nivea-oil.webp',
    price: 1499,
    originalPrice: 1999,
    discount: 25,
    rating: 4.5,
    reviews: 128,
    isNew: true,
    hasVariants: false,
  },
  {
    id: 2,
    name: 'Nivea Perfect & Radiant',
    slug: 'nivea-perfect-radiant',
    image: '/nivea-oil.webp',
    price: 1499,
    originalPrice: 1999,
    discount: 25,
    rating: 4.5,
    reviews: 128,
    isNew: true,
    hasVariants: false,
  },
  // Add more offer items...
]

export default function OffersPage() {
  const [wishlist, setWishlist] = useState<number[]>([])

  const toggleWishlist = (id: number) => {
    setWishlist(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    )
  }

  return (

    <>
        <div className="w-full bg-[#A9BA9D]">
        <div className="max-w-7xl mx-auto px-4 py-2">
          <div className="flex items-center gap-2 text-sm text-[#333333]">
            <Link href="/" className="hover:text-pink-600">Home</Link>
            <ChevronRight size={16} />
            <span className="text-pink-600">Special Offers</span>
          </div>
        </div>
      </div>
    
        <div className="w-full">

        <div className="max-w-7xl mx-auto  px-2 py-2">
                 
            {/* Products Grid */}
            <div className="grid grid-cols-2  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5  gap-2 md:gap-4 cursor-pointer">
                {offers.map((product) => (
                <div 
                    key={product.id}
                    className="bg-primary  p-2 relative group"
                >
                    {/* Offer Badge */}
                    <div className="absolute top-2 left-2 z-10">
                    <span className="bg-pink-600 text-white text-xs font-medium px-2 py-1 rounded-full">
                        {product.discount}% OFF
                    </span>
                    </div>

                    {/* New Badge */}
                    {product.isNew && (
                    <div className="absolute top-2 right-2 z-10">
                        <span className="bg-green-600 text-white text-xs font-medium px-2 py-1 rounded-full">
                        New
                        </span>
                    </div>
                    )}

                    {/* Wishlist Button */}
                    <button
                    onClick={() => toggleWishlist(product.id)}
                    className="absolute top-2 right-2 z-20 p-2 rounded-full bg-white shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                    <Heart 
                        className={`w-5 h-5 ${
                        wishlist.includes(product.id) 
                            ? 'fill-pink-600 text-pink-600' 
                            : 'text-gray-400'
                        }`} 
                    />
                    </button>

                    {/* Product Image */}
                    <Link href={`/products/${product.slug}`} className="block relative aspect-square mb-4">
                    <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover rounded-[1px]"
                    />
                    </Link>

                    {/* Product Info */}
                    <div className="space-y-2">
                    <Link href={`/products/${product.slug}`} className="block">
                        <h3 className="font-medium text-[#333333] hover:text-pink-600 line-clamp-2">
                        {product.name}
                        </h3>
                    </Link>

                    <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm text-[#333333]">{product.rating}</span>
                        <span className="text-sm text-gray-500">({product.reviews})</span>
                    </div>

                    <div className="flex items-center gap-2 mb-4">
                        <span className="text-lg font-medium text-pink-600">
                        KES {product.price.toLocaleString()}
                        </span>
                        <span className="text-sm text-gray-500 line-through">
                        KES {product.originalPrice.toLocaleString()}
                        </span>
                    </div>

                    {/* Action Button */}
                    {product.hasVariants ? (
                        <button 
                        onClick={(e) => {
                            e.stopPropagation();
                            // Add your variant selection logic here
                        }}
                        className="w-full bg-secondary hover:bg-secondary/90 text-white py-2 px-4 rounded-[1px] transition-colors"
                        >
                        Select Options
                        </button>
                    ) : (
                        <button 
                        onClick={(e) => {
                            e.stopPropagation();
                            // Add your cart logic here
                        }}
                        className="w-full bg-pink-600 hover:bg-pink-600/90 text-white py-2 px-4 rounded-[1px] transition-colors flex items-center justify-center gap-2"
                        >
                        <ShoppingCart size={18} />
                        Add to Cart
                        </button>
                    )}
                    </div>
                </div>
                ))}
            </div>

            {/* Empty State */}
            {offers.length === 0 && (
                <div className="text-center py-12">
                <h2 className="text-lg font-medium text-[#333333] mb-2">
                    No offers available
                </h2>
                <p className="text-gray-500">
                    Check back later for new deals and discounts
                </p>
                </div>
            )}
           
        </div>
        </div>
    </>
  )
}