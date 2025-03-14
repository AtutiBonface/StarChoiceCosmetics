'use client'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronRight, Heart, ShoppingCart, Trash2, Star, Loader } from 'lucide-react'
import WishlistSkeleton from '@/components/skeletons/WishlistSkeleton'
import Toast from '@/components/Products/toast-notification'
import { initialWishlistItems , WishlistItem } from '@/mockData'
export default function WishlistPage() {
 
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState('')
  const [toastType, setToastType] = useState<'success' | 'error' | 'info'>('success')
  const [isAddingToCart, setIsAddingToCart] = useState<number | null>(null)

  
  useEffect(() => {
    const fetchWishlistItems = async () => {
      try {
        setIsLoading(true)
        
        await new Promise(resolve => setTimeout(resolve, 1000))
        setWishlistItems(initialWishlistItems)
      } catch (error) {
        console.error('Failed to fetch wishlist:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchWishlistItems()
  }, [])

  const removeFromWishlist = (id :number) => {
    setWishlistItems(items => items.filter(item => item.id !== id))
  }

  const handleAddToCart = async (itemId: number) => {
    if (isAddingToCart) return
    
    setIsAddingToCart(itemId)
    try {
      await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate API call
      
      setToastMessage('Product added to cart successfully!')
      setToastType('success')
      setShowToast(true)
    } catch (error) {
      setToastMessage('Failed to add product to cart')
      setToastType('error')
      setShowToast(true)
    } finally {
      setIsAddingToCart(null)
    }
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

  if (isLoading) {
    return <WishlistSkeleton />
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
            <span className="text-accent-1">Wishlist</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-2 py-4">
        {wishlistItems.length === 0 ? (
          <div className="text-center py-12">
            <div className="mb-4">
              <Heart className="w-12 h-12 text-accent-1 mx-auto" />
            </div>
            <p className="text-[#5C4033] mb-6">Your wishlist is empty</p>
            <Link 
              href="/"
              className="inline-block bg-accent-1 text-white px-6 py-3 rounded-[4px] hover:bg-accent-1/90 transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <>
            {/* Desktop View - Grid Layout */}
            <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6 md:mx-12">
              {wishlistItems.map((item) => (
                <div 
                  key={item.id}
                  className="group bg-transparent p-4 rounded-[4px] relative"
                >
                  {/* Product Image */}
                  <div className="relative aspect-square mb-4">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover rounded-[4px]"
                    />
                    <button
                      onClick={() => removeFromWishlist(item.id)}
                      className="absolute top-2 right-2 p-2 bg-white rounded-lg shadow-md hover:bg-accent-1 hover:text-white transition-colors"
                      aria-label="Remove from wishlist"
                    >
                      <Trash2 size={18} className='text-accent-1'/>
                    </button>
                  </div>

                  {/* Product Info */}
                  <Link href={`/products/${item.id}`}>
                    <h3 className="font-medium text-secondary line-clamp-2 mb-2 hover:text-accent-1">
                      {item.name}
                    </h3>
                  </Link>

                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg font-bold text-accent-1">
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
                    onClick={() => handleAddToCart(item.id)}
                    disabled={!item.inStock || isAddingToCart === item.id}
                    className={`w-full flex items-center justify-center gap-2 py-2 px-4 rounded-[4px] transition-colors
                      ${item.inStock 
                        ? 'bg-accent-1 text-white hover:bg-accent-1/90' 
                        : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                      } ${isAddingToCart === item.id ? 'opacity-70' : ''}`}
                  >
                    {isAddingToCart === item.id ? (
                      <>
                        <Loader className="h-5 w-5 animate-spin text-white" />
                        Adding...
                      </>
                    ) : (
                      <>
                        <ShoppingCart size={18} />
                        {item.inStock ? 'Add to Cart' : 'Out of Stock'}
                      </>
                    )}
                  </button>
                </div>
              ))}
            </div>

            {/* Mobile View  */}
            <div className="sm:hidden space-y-4">
              {wishlistItems.map((item) => (
                <div 
                  key={item.id}
                  className="flex    rounded-[4px] overflow-hidden relative py-2"
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
                        <h3 className="font-medium text-secondary line-clamp-2 text-md hover:text-accent-1">
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
                        <span className="text-base font-bold text-accent-1">
                          KES {item.price.toLocaleString()}
                        </span>
                        {item.oldPrice && (
                          <span className="text-xs text-gray-500 line-through">
                            KES {item.oldPrice.toLocaleString()}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mt-2">
                      <button 
                        onClick={() => handleAddToCart(item.id)}
                        disabled={!item.inStock || isAddingToCart === item.id}
                        className={`flex-1 flex items-center justify-center gap-1 py-2 text-sm rounded-[4px] transition-colors
                          ${item.inStock 
                            ? 'bg-accent-1 text-white hover:bg-accent-1/90' 
                            : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                          } ${isAddingToCart === item.id ? 'opacity-70' : ''}`}
                      >
                        {isAddingToCart === item.id ? (
                          <>
                            <Loader className="h-5 w-5 animate-spin text-white" />
                            Adding...
                          </>
                        ) : (
                          <>
                            <ShoppingCart className='w-5 h-5 mr-2'/>
                            {item.inStock ? 'Add to Cart' : 'Out of Stock'}
                          </>
                        )}
                      </button>
                      <button
                        onClick={() => removeFromWishlist(item.id)}
                        className="p-2  rounded-[4px] hover:bg-gray-200 transition-colors"
                        aria-label="Remove from wishlist"
                      >
                        <Trash2 className='w-6 h-6 text-red-600'/>
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