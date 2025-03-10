'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronRight, Heart, Minus, Plus, ShoppingCart, Star } from 'lucide-react'
import Toast from '@/components/Products/toast-notification'
import { RelatedProducts } from '@/components/Products/relatedProducts'

interface Review {
  id: number
  user: string
  rating: number
  comment: string
  date: string
}

const productInfo = {
  details: `
    • Innovative formula with Luminous630®
    • SPF50 protection against UV damage
    • Helps reduce dark marks
    • Prevents new dark marks from forming
    • Suitable for all skin types
    • Dermatologically tested
  `,
  ingredients: "Aqua, Homosalate, Alcohol Denat., Butyl Methoxydibenzoylmethane, Ethylhexyl Salicylate, Octocrylene...",
  howToUse: "Apply evenly to face and neck every morning after cleansing. Gently massage in circular motions until absorbed. Use before sun exposure.",
}

const reviews: Review[] = [
  {
    id: 1,
    user: "Sarah K.",
    rating: 5,
    comment: "Amazing product! Saw results within weeks of use.",
    date: "2024-03-01"
  },
  {
    id: 2,
    user: "John M.",
    rating: 4,
    comment: "Good texture, absorbs quickly. Pleasant scent.",
    date: "2024-02-28"
  }
]

type TabType = 'info' | 'reviews'

const ProductPreview = () => {
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [isWishlist, setIsWishlist] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState('')
  const [toastType, setToastType] = useState<'success' | 'error' | 'info'>('success')
  const [activeTab, setActiveTab] = useState<TabType>('info')

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
      <Toast
        message={toastMessage}
        type={toastType}
        isVisible={showToast}
        onClose={() => setShowToast(false)}
      />
      
      {/* Sticky Mobile Actions - Add this at the top level */}
      <div className="fixed bottom-0 left-0 right-0 bg-primary border-t border-[#A9BA9D] p-4 md:hidden z-50">
        <div className="flex items-center gap-4">
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
          <button 
            onClick={handleAddToCart} 
            className="flex-1 bg-pink-600 text-white py-3 px-6 rounded-[1px] hover:bg-pink-600/90 transition-colors flex items-center justify-center gap-2"
          >
            <ShoppingCart size={20} />
            Add to Cart
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full pb-2 md:pb-0"> {/* Add padding bottom on mobile */}
        {/* Breadcrumb */}
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

        {/* Product Info Section */}
        <div className="max-w-7xl mx-auto px-4 py-4 ">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Image Gallery */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="relative h-[400px] md:h-[500px] rounded-lg overflow-hidden"> {/* Changed from aspect-square */}
                <Image
                  src={product.images[selectedImage].url}
                  alt={product.name}
                  fill
                  className="object-contain" // Changed from object-cover to maintain aspect ratio
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

          {/* Centered Tabs */}
          <div className="mt-8 w-screen relative left-1/2 right-1/2 -mx-[50vw] bg-secondary">
            <div className="max-w-7xl mx-auto px-4">
              <div className="flex justify-center border-b border-[#A9BA9D]">
                <button
                  onClick={() => setActiveTab('info')}
                  className={`py-3 px-6 text-sm font-medium border-b-2 -mb-[2px] transition-colors ${
                    activeTab === 'info'
                      ? 'border-pink-600 text-pink-600'
                      : 'border-transparent text-[#333333] hover:text-pink-600'
                  }`}
                >
                  Product Info
                </button>
                <button
                  onClick={() => setActiveTab('reviews')}
                  className={`py-3 px-6 text-sm font-medium border-b-2 -mb-[2px] transition-colors ${
                    activeTab === 'reviews'
                      ? 'border-pink-600 text-pink-600'
                      : 'border-transparent text-[#333333] hover:text-pink-600'
                  }`}
                >
                  Reviews ({reviews.length})
                </button>
              </div>

              {/* Tab Content */}
              <div className="py-2 max-w-3xl mx-auto">
                <div className="min-h-[400px] max-h-[400px] overflow-y-auto scrollbar-hide pr-4">
                  {activeTab === 'info' && (
                    <div className="space-y-2">
                      <div>
                        <h2 className="text-xl font-bold text-[#333333] sticky top-0 bg-secondary py-2 ">
                          Product Details
                        </h2>
                        <p className="text-sm text-[#333333] whitespace-pre-line leading-relaxed">
                          {productInfo.details}
                        </p>
                      </div>

                      <div>
                        <h2 className="text-xl font-bold text-[#333333] sticky top-0 bg-secondary py-2 mb-3">
                          Ingredients
                        </h2>
                        <p className="text-sm text-[#333333] leading-relaxed">
                          {productInfo.ingredients}
                        </p>
                      </div>

                      <div>
                        <h2 className="text-xl font-bold text-[#333333] sticky top-0 bg-secondary py-2 mb-3">
                          How to Use
                        </h2>
                        <p className="text-sm text-[#333333] leading-relaxed">
                          {productInfo.howToUse}
                        </p>
                      </div>
                    </div>
                  )}

                  {activeTab === 'reviews' && (
                    <div className="space-y-6">
                      {reviews.length === 0 ? (
                        <div className="text-center py-8">
                          <p className="text-gray-500">No reviews yet</p>
                        </div>
                      ) : (
                        reviews.map(review => (
                          <div 
                            key={review.id} 
                            className="bg-white p-4 rounded-[1px] border border-[#A9BA9D] hover:border-pink-600/20 transition-colors"
                          >
                            <div className="flex items-start justify-between gap-4">
                              <div className="flex-1">
                                <div className="flex items-center gap-2">
                                  <h3 className="font-medium text-[#333333]">{review.user}</h3>
                                  <span className="text-xs text-gray-500">
                                    {new Date(review.date).toLocaleDateString('en-US', {
                                      year: 'numeric',
                                      month: 'long',
                                      day: 'numeric'
                                    })}
                                  </span>
                                </div>
                                <div className="flex items-center mt-1 mb-3">
                                  {[...Array(5)].map((_, i) => (
                                    <Star 
                                      key={i} 
                                      size={14} 
                                      className={`${
                                        i < review.rating 
                                          ? 'text-yellow-400 fill-current' 
                                          : 'text-gray-200'
                                      }`} 
                                    />
                                  ))}
                                </div>
                                <p className="text-sm text-[#333333] leading-relaxed">
                                  {review.comment}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

        </div>


      </div>

      <RelatedProducts/>
    </>
  )
}

export default ProductPreview