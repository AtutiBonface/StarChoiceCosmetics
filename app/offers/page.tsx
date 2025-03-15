'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Heart, Star, ChevronRight, Loader } from 'lucide-react'
import Toast from '@/components/Products/toast-notification'
import { offers } from '@/mockData'
import { useRouter } from 'next/navigation'

export default function OffersPage() {
  const router = useRouter()
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState('')
  const [toastType, setToastType] = useState<'success' | 'error' | 'info'>('success')
  const [isAddingToCart, setIsAddingToCart] = useState<number | null>(null)
  const [isAddingToWishlist, setIsAddingToWishlist] = useState<number | null>(null)

  const handleAddToCart = async (offerId: number) => {
    if (isAddingToCart) return
    
    setIsAddingToCart(offerId)
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setToastMessage('Product added to cart successfully!')
      setToastType('success')
      setShowToast(true)
    } catch{
      setToastMessage('Failed to add product to cart')
      setToastType('error')
      setShowToast(true)
    } finally {
      setIsAddingToCart(null)
    }
  }

  const handleAddToWishlist = async (offerId: number) => {
    if (isAddingToWishlist) return
    
    setIsAddingToWishlist(offerId)
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setToastMessage('Product added to wishlist!')
      setToastType('success')
      setShowToast(true)
    } catch{
      setToastMessage('Failed to add to wishlist')
      setToastType('error')
      setShowToast(true)
    } finally {
      setIsAddingToWishlist(null)
    }
  }

  const handleProductClick = (productId: number) => {
    router.push(`/products/${productId}`)
  }

  // Add rating renderer function
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
      <Toast
        message={toastMessage}
        type={toastType}
        isVisible={showToast}
        onClose={() => setShowToast(false)}
      />

      {/* Breadcrumb */}
      <div className="w-full bg-secondary">
        <div className="max-w-7xl mx-auto px-4 py-2">
          <div className="flex items-center gap-2 text-sm text-secondary">
            <Link href="/" className="hover:text-accent-1">Home</Link>
            <ChevronRight size={16} />
            <span className="text-accent-1">Special Offers</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-2 py-2">
        <div className="grid md:grid-cols-2 gap-2">
          {offers.map(offer => (
            <div  key={offer.id} className="rounded-[4px] pt-2 px-2">
              <div className="flex items-stretch gap-4">
                <div 
                  onClick={() => handleProductClick(offer.id)}
                  className="relative  rounded-l-[5px] w-32  flex-shrink-0 cursor-pointer group flex items-center justify-center bg-image"
                >
                  <div className="relative w-26 h-26 flex items-center justify-center">
                    <Image 
                      src={offer.image} 
                      alt={offer.name} 
                      fill 
                      className="object-contain transition-transform duration-200 group-hover:scale-105" 
                    />
                  </div>
                </div>
                <div className="flex-1 py-1">
                  <h3 
                    onClick={() => handleProductClick(offer.id)}
                    className="text-lg font-medium text-primary cursor-pointer hover:text-accent-1 transition-colors cursor-pointer"
                  >
                    {offer.name}
                  </h3>
                  
                  {/* Replace the existing rating with new component */}
                  <div className="flex items-center gap-1 text-sm text-secondary">
                    {renderRating(offer.rating)}
                    <span className="text-xs text-gray-500">({offer.reviews} reviews)</span>
                  </div>

                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-lg font-bold text-accent-1">KES {offer.price}</span>
                    {offer.originalPrice && <span className="text-sm text-secondary line-through">KES {offer.originalPrice}</span>}
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <button 
                      onClick={() => handleAddToCart(offer.id)}
                      disabled={isAddingToCart === offer.id}
                      className={`bg-accent-1 text-contrast min-w-[150px] px-4 py-2 rounded-[4px] hover:bg-accent-1/90 transition-colors flex items-center justify-center gap-2
                        ${isAddingToCart === offer.id ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                      {isAddingToCart === offer.id ? (
                        <>
                          <Loader className="h-4 w-4 animate-spin" />
                          Adding...
                        </>
                      ) : (
                        'Add to Cart'
                      )}
                    </button>
                    <button 
                      onClick={() => handleAddToWishlist(offer.id)}
                      disabled={isAddingToWishlist === offer.id}
                      className={`text-error hover:text-error/90 transition-colors ml-2
                        ${isAddingToWishlist === offer.id ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                      {isAddingToWishlist === offer.id ? (
                        <Loader className="h-5 w-5 animate-spin" />
                      ) : (
                        <Heart   className='h-5 w-5 text-red-600'/>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}