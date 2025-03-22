'use client'
import React, { useState, useEffect} from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronRight, Heart, ShoppingCart, Trash2, Star, Plus, Minus} from 'lucide-react'
import WishlistSkeleton from '@/components/skeletons/WishlistSkeleton'
import Toast from '@/components/Products/toast-notification'
import { useCart } from '@/services/cartWishlistContext'
import { products } from '@/mockData'
export default function WishlistPage() {
 
  const [isLoading, setIsLoading] = useState(true)
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState('')
  const [toastType, setToastType] = useState<'success' | 'error' | 'info'>('success')
  const { addToCart, removeFromWishlist, wishlist , removeFromCart,isInCart , updateCartQuantity, cartItemQuantity } = useCart()

  
  useEffect(() => {
      const loadingTimeout = setTimeout(() => {
        setIsLoading(false)
      }, 1000)
  
      return () => clearTimeout(loadingTimeout)
    }, [])

  
  const handleAddToCart = async (itemId: number) => {
    const item = products.find((item) => item.id === itemId)
    if (!item) return  
      
    try {
      if(isInCart(itemId)){
        setToastMessage('Product already exists in the Card.')
        setToastType('info')
        setShowToast(true)
        return
      }
      addToCart(item)      
      setToastMessage('Product added to cart successfully!')
      setToastType('success')
      setShowToast(true)
    } catch{
      setToastMessage('Failed to add product to cart')
      setToastType('error')
      setShowToast(true)
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
        {wishlist.length === 0 ? (
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
            <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-8 md:mx-12">
              {wishlist.map((item) => (
                <div 
                  key={item.id}
                  className="group bg-transparent p-4 rounded-[4px] relative"
                >
                  {/* Product Image with fixed dimensions */}
                  <div 
                    className="relative mb-4 h-40  w-full flex items-center justify-center" 
                    
                  >
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-contain rounded-[4px] p-2 h-full w-full"
                      priority={true}
                      loading="eager"
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
                      KES {item.price?.toLocaleString()}
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
                  {isInCart(item.id) ? (
                    <div className="flex items-center justify-between  overflow-hidden">
                      <button
                        onClick={() => {
                            const newQuantity = cartItemQuantity(item.id) - 1;
                                if (newQuantity < 1) {
                                  removeFromCart(item.id);
                                } else {
                                  updateCartQuantity(item.id, newQuantity);  
                              }
                        }}
                        className="p-2  transition-colors text-contrast rounded-[4px] bg-accent-1"
                        aria-label="Decrease quantity"
                      >
                        <Minus size={16} className='text-white' />
                      </button>
                      <span className="w-12 text-center font-medium">{cartItemQuantity(item.id)}</span>
                      <button
                        onClick={() => updateCartQuantity(item.id, cartItemQuantity(item.id) + 1)}
                        className="p-2  transition-colors text-contrast rounded-[4px] bg-accent-1"
                        aria-label="Increase quantity"
                      >
                        <Plus size={16} className='text-white' />
                      </button>
                    </div>
                  ) : (
                    <button 
                      onClick={() => handleAddToCart(item.id)}
                      disabled={!item.inStock}
                      className={`w-full flex items-center justify-center gap-2 py-2 px-4 rounded-[4px] transition-colors
                        ${item.inStock 
                          ? 'bg-accent-1 text-white hover:bg-accent-1/90' 
                          : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                        } 'opacity-70'`}
                    >
                      <ShoppingCart size={18} />
                      {item.inStock ? 'Add to Cart' : 'Out of Stock'}
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* Mobile View with optimized images */}
            <div className="sm:hidden space-y-4">
              {wishlist.map((item) => (
                <div 
                  key={item.id}
                  className="flex  rounded-[4px] overflow-hidden relative"
                >
                  {/* Product Image */}
                  <div className="relative  rounded-l-[5px] w-35 flex-shrink-0 cursor-pointer group flex items-center justify-center bg-image">
                    <div className="relative w-30 h-30 flex items-center justify-center">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="128px"
                        className="object-contain transition-transform duration-200 rounded-[4px] group-hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                  </div>

                  <div className="flex-1 p-3 flex flex-col justify-between">
                    <div>
                      <Link href={`/products/${item.id}`}>
                        <h3 className="font-medium text-primary line-clamp-2 text-md hover:text-accent-1">
                          {item.name}
                        </h3>
                      </Link>

                      {/* Rating */}
                      <div className="flex items-center gap-1 my-1">
                        {renderRating(item.rating)}
                        <span className="text-sm text-gray-500">({item.reviewCount})</span>
                      </div>

                      {/* Price */}
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-base font-bold text-accent-1">
                          KES {item.price}
                        </span>
                        {item.oldPrice && (
                          <span className="text-xs text-gray-500 line-through">
                            KES {item.oldPrice}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-2 mt-2">
                    {isInCart(item.id) ? (
                        <div className="flex items-center justify-between  overflow-hidden">
                          <button
                            onClick={() => {
                                const newQuantity = cartItemQuantity(item.id) - 1;
                                if (newQuantity < 1) {
                                  removeFromCart(item.id);
                                } else {
                                  updateCartQuantity(item.id, newQuantity);  
                              }
                            }}
                            className="p-2  transition-colors text-contrast rounded-[4px] bg-accent-1"
                            aria-label="Decrease quantity"
                          >
                            <Minus size={16} className='text-white' />
                          </button>
                          <span className="w-12 text-center font-medium">{cartItemQuantity(item.id)}</span>
                          <button
                            onClick={() => updateCartQuantity(item.id, cartItemQuantity(item.id) + 1)}
                            className="p-2  transition-colors text-contrast rounded-[4px] bg-accent-1"
                            aria-label="Increase quantity"
                          >
                            <Plus size={16} className='text-white' />
                          </button>
                        </div>
                      ) : (
                        <button 
                          onClick={() => handleAddToCart(item.id)}
                          disabled={!item.inStock}
                          className={`flex-1 flex items-center justify-center gap-1 py-2 text-md rounded-[4px] transition-colors
                            ${item.inStock 
                              ? 'bg-accent-1 text-white hover:bg-accent-1/90' 
                              : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                            }`}>
                          <>
                            <ShoppingCart className='w-5 h-5 mr-2'/>
                            {item.inStock ? 'Add to Cart' : 'Out of Stock'}
                          </>                        
                        </button>
                    )}
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