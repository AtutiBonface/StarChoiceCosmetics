'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ChevronRight } from 'lucide-react'

interface Brand {
  id: number
  name: string
  image: string
  productCount: number
}

const brands: Brand[] = [
  {
    id: 1,
    name: "Nivea",
    image: "/nivea.png",
    productCount: 45
  },
  {
    id: 2,
    name: "L'Oreal",
    image: "/loreal.webp",
    productCount: 38
  },
  // Add more brands...
]

export default function BrandsPage() {
  return (
    <div className="">
      {/* Breadcrumb */}
      <div className="w-full bg-secondary">
        <div className="max-w-7xl mx-auto px-4 py-2">
          <div className="flex items-center gap-2 text-sm text-secondary">
            <Link href="/" className="hover:text-accent-1">Home</Link>
            <ChevronRight size={16} />
            <span className="text-accent-1">Shop by Brand</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-4">
        {/* Title */}
        <div className="text-center mb-4">
          <h1 className="text-3xl font-bold text-secondary mb-4">Our Beauty Brands</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our collection of authentic beauty brands. We partner with trusted 
            manufacturers to bring you genuine beauty and skincare products.
          </p>
        </div>

        {/* Brands Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
          {brands.map((brand) => (
            <Link 
              key={brand.id}
              href={`/search?brand=${encodeURIComponent(brand.name)}`}
              className="group"
            >
              <div className="bg-white p-4 rounded-md shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden relative">
                {/* Decorative circles */}
                <div className="absolute -right-12 -top-12 w-24 h-24 bg-accent-light rounded-full group-hover:bg-accent-1/20 transition-all duration-300"></div>
                <div className="absolute -left-12 -bottom-12 w-24 h-24 bg-secondary rounded-full group-hover:bg-secondary/20 transition-all duration-300"></div>
                
                {/* Brand Logo */}
                <div className="relative h-28 md:h-36 flex items-center justify-center">
                  <Image
                    src={brand.image}
                    alt={brand.name}
                    fill
                    className="object-contain p-3 group-hover:scale-105 transition-transform duration-200"
                  />
                </div>

                {/* Brand Details */}
                <div className="text-center mt-3">
                  <h3 className="font-medium text-secondary group-hover:text-accent-1 transition-colors truncate">
                    {brand.name}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {brand.productCount} Products
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Brand Promise */}
        <div className="mt-16 text-center bg-secondary border border-pink-100 rounded-[1px] p-8">
          <h2 className="text-2xl font-bold text-secondary mb-4">
            100% Authentic Guaranteed
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We are authorized retailers of all brands featured on our store. 
            Every product comes with manufacturer warranty and authenticity guarantee.
          </p>
        </div>
      </div>
    </div>
  )
}