'use client'
import React from 'react'
import Image from 'next/image'
import { ShoppingCart } from 'lucide-react'

interface Product {
  id: number
  name: string
  image: string
  price: number
  oldPrice?: number
  hasVariants: boolean
}

const products: Product[] = [
    {
      id: 1,
      name: "Nivea Perfect & Radiant Luminous630 Anti Dark Marks Day Cream SPF50",
      image: "/nivea-oil.webp",
      price: 1299,
      oldPrice: 1499,
      hasVariants: false,
    },
    {
      id: 2,
      name: "CeraVe Hydrating Facial Cleanser 236ml",
      image: "/cerave-oil.webp",
      price: 2500,
      oldPrice: 2800,
      hasVariants: false,
    },
    {
      id: 3,
      name: "Neutrogena Hydro Boost Water Gel Moisturizer 50ml",
      image: "/Neutrogena-oil.jpg",
      price: 3200,
      oldPrice: 3500,
      hasVariants: false,
    },
    {
      id: 4,
      name: "Cetaphil Gentle Skin Cleanser 500ml",
      image: "/Cetaphil-oil.webp",
      price: 3700,
      oldPrice: 4000,
      hasVariants: false,
    },
    {
      id: 5,
      name: "The Ordinary Niacinamide 10% + Zinc 1% Serum 30ml",
      image: "/Niacinamide-oil.jpeg",
      price: 1800,
      oldPrice: 2000,
      hasVariants: false,
    },
    {
      id: 6,
      name: "Eucerin Advanced Repair Lotion 500ml",
      image: "/Eucerin-oil.webp",
      price: 4200,
      oldPrice: 4500,
      hasVariants: true,
    },
    {
      id: 7,
      name: "La Roche-Posay Effaclar Duo+ Acne Treatment 40ml",
      image: "/La Roche-Posay-oil.webp",
      price: 3500,
      oldPrice: 3800,
      hasVariants: false,
    },
    {
      id: 8,
      name: "Garnier Even & Matte Vitamin C Booster Serum 30ml",
      image: "/Garnier Even-oil.jpg",
      price: 1500,
      oldPrice: 1700,
      hasVariants: false,
    },
    {
      id: 9,
      name: "Simple Kind to Skin Hydrating Light Moisturiser 125ml",
      image: "/Simple Kind to Skin Hydrating-oil.jpeg",
      price: 1200,
      oldPrice: 1400,
      hasVariants: false,
    },
    {
      id: 10,
      name: "Aveeno Daily Moisturizing Lotion 354ml",
      image: "/Aveeno-oil.jpg",
      price: 2800,
      oldPrice: 3100,
      hasVariants: false,
    },
  ];
  

const NewArrivals = () => {
  return (
    <section className="mx-auto md:mx-12 px-2 py-2">
        <div className="product-title relative  flex justify-center items-center mb-2 mx-3">
            <span className="text-3xl font-bold text-[#333333] bg-[#F8F1E9] px-3 z-10">New Arrivals</span>
        </div>

       

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5  gap-2 md:gap-4">
        {products.map((product) => (
          <div 
            key={product.id} 
            className="bg-transparent p-4"
          >
            {/* Product Image */}
            <div className="relative h-48 mb-4">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-contain"
              />
            </div>

            {/* Product Name */}
            <h3 className="text-sm font-medium mb-2 h-12 overflow-hidden">
              <span className="line-clamp-2">{product.name}</span>
            </h3>

            {/* Price Section */}
            <div className="flex items-center gap-2 mb-4">
              <span className="text-lg font-bold text-accent-1">
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
              <button className="w-full bg-secondary hover:bg-secondary/90 text-white py-2 px-4 rounded-md transition-colors">
                Select Options
              </button>
            ) : (
              <button className="w-full bg-accent-1 hover:bg-accent-1/90 text-white py-2 px-4 rounded-md transition-colors flex items-center justify-center gap-2">
                <ShoppingCart size={18} />
                Add to Cart
              </button>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}

export default NewArrivals