'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronRight, Heart, Minus, Plus, ShoppingCart } from 'lucide-react'
import Toast from '@/components/Products/toast-notification'
/* 
interface ProductImage {
  id: number
  url: string
}
 */
const ProductPreview = () => {
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [isWishlist, setIsWishlist] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState('')
  const [toastType, setToastType] = useState<'success' | 'error' | 'info'>('success')


  const handleAddToCart = () => {
    // Add to cart logic here
    setToastMessage('Product added to cart successfully!')
    setToastType('success')
    setShowToast(true)
  }

  // Mock data - replace with your actual data fetching logic
  const product = {
    name: "Nivea Perfect & Radiant Luminous630 Anti Dark Marks Day Cream SPF50",
    price: 1299,
    oldPrice: 1499,
    description: "This innovative day cream with SPF50 helps reduce the appearance of dark marks and prevents new ones from forming. Enriched with Luminous630®, it provides advanced protection against UV damage.",
    images: [
      { id: 1, url: "/nivea-oil.webp" },
      { id: 2, url: "/nivea-oil-2.webp" },
      { id: 3, url: "/nivea-oil-3.webp" },
      { id: 4, url: "/nivea-oil.webp" },
      { id: 5, url: "/nivea-oil-2.webp" },
      { id: 6, url: "/nivea-oil-3.webp" },
    ],
    stock: 10
  }

  return (
    <>
      {/* Breadcrumb */}
        <Toast
            message={toastMessage}
            type={toastType}
            isVisible={showToast}
            onClose={() => setShowToast(false)}
        />
      <div className="w-full bg-[#A9BA9D] mt-28 md:mt-38">
        <div className="max-w-7xl mx-auto px-4 py-2">
          <div className="flex items-center gap-2 text-sm text-[#333333]">
            <Link href="/" className="hover:text-pink-600">Home</Link>
            <ChevronRight size={16} />
            <Link href="/skincare" className="hover:text-pink-600">Skincare</Link>
            <ChevronRight size={16} />
            <span className="text-pink-600">SKU-12345</span>
          </div>
        </div>
      </div>

      <div className="w-full">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Image Gallery */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="relative aspect-square rounded-lg overflow-hidden">
                <Image
                  src={product.images[selectedImage].url}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              {/* Scrollable Thumbnails */}
              <div className="relative">
                <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2 snap-x">
                  {product.images.map((image, index) => (
                    <button
                      key={image.id}
                      onClick={() => setSelectedImage(index)}
                      className={`relative w-20 h-20 flex-shrink-0 snap-start rounded-[1px] overflow-hidden ${
                        selectedImage === index ? 'border-2 border-pink-600' : ''
                      }`}
                    >
                      <Image
                        src={image.url}
                        alt={`Product view ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <h1 className="text-2xl font-bold text-[#333333]">{product.name}</h1>

              {/* Price */}
              <div className="flex items-center gap-4">
                <span className="text-3xl font-bold text-pink-600">
                  KES {product.price.toLocaleString()}
                </span>
                {product.oldPrice && (
                  <span className="text-xl text-gray-500 line-through">
                    KES {product.oldPrice.toLocaleString()}
                  </span>
                )}
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-[#333333]">Quantity:</span>
                <div className="flex items-center border border-gray-200 rounded-[1px]">
                  <button
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    className="p-2 hover:bg-gray-100"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="w-12 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(q => Math.min(product.stock, q + 1))}
                    className="p-2 hover:bg-gray-100"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-4">
                <button onClick={handleAddToCart} className="flex-1 bg-pink-600 text-white py-3 px-6 rounded-[1px] hover:bg-pink-600/90 transition-colors flex items-center justify-center gap-2">
                  <ShoppingCart size={20} />
                  Add to Cart
                </button>
                <button
                  onClick={() => setIsWishlist(!isWishlist)}
                  className={`p-3 rounded-[1px] border ${
                    isWishlist 
                      ? 'bg-pink-600 text-white border-pink-600' 
                      : 'border-gray-200 hover:border-pink-600'
                  }`}
                >
                  <Heart 
                    size={20} 
                    className={isWishlist ? 'fill-current' : ''} 
                  />
                </button>
              </div>

              {/* Stock Status */}
              <p className="text-sm text-[#333333]">
                <span className="font-medium">Availability:</span>{' '}
                {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProductPreview