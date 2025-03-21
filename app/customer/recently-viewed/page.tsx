'use client'
import { useState } from 'react'
import Link from 'next/link'
import { ChevronRight, Heart, Plus, Minus, ShoppingCart, Star } from 'lucide-react'
import { useCart } from '@/services/cartWishlistContext'
import Toast from '@/components/Products/toast-notification'
import { Product, products } from '@/mockData'
import Image from 'next/image'

export default function RecentlyViewedPage() {
  const [recentProducts] = useState<Product[]>([
    products[0], // Nivea product
    products[1], // CeraVe product
  ])
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState('')
  const [toastType, setToastType] = useState<'success' | 'error' | 'info'>('success')
  
  const { 
    addToCart, 
    removeFromCart, 
    isInCart, 
    isInWishlist,
    addToWishlist,
    removeFromWishlist,
    updateCartQuantity,
    cartItemQuantity 
  } = useCart()

  const handleAddToCart = (product: Product) => {
    try {
      if(isInCart(product.id)){
        setToastMessage('Product is already in cart.')
        setToastType('info')
        setShowToast(true)
        return
      }
      addToCart(product)
      setToastMessage('Product added to cart successfully!')
      setToastType('success')
      setShowToast(true)
    } catch {
      setToastMessage('Failed to add to cart')
      setToastType('error')
      setShowToast(true)
    }
  }

  const handleWishlistToggle = (product: Product) => {
    try {
      if(isInWishlist(product.id)) {
        removeFromWishlist(product.id)
        setToastMessage('Removed from wishlist!')
        setToastType('info')
      } else {
        addToWishlist(product)
        setToastMessage('Added to wishlist!')
        setToastType('success')
      }
      setShowToast(true)
    } catch {
      setToastMessage('Failed to update wishlist')
      setToastType('error')
      setShowToast(true)
    }
  }

  // Rating stars renderer
  const renderRating = (rating: number) => {
    return (
      <div className="flex items-center">
        <div className="flex">
          {[...Array(5)].map((_, i) => (
            <Star 
              key={i} 
              size={14} 
              className={`${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-200'}`} 
            />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="w-full">
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
            <span className="text-accent-1">Recently Viewed</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-2 py-4">
        {recentProducts.length === 0 ? (
          <div className="text-center py-12">
            <div className="mb-4">
              <ShoppingCart className="w-12 h-12 text-accent-1 mx-auto" />
            </div>
            <p className="text-[#5C4033] mb-6">No recently viewed products</p>
            <Link 
              href="/"
              className="inline-block bg-accent-1 text-white px-6 py-3 rounded-[4px] hover:bg-accent-1/90 transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <>
            {/* Desktop View */}
            <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {recentProducts.map((product) => (
                <div 
                  key={product.id}
                  className="group bg-transparent p-4 rounded-[4px] relative"
                >
                  {/* Product Image */}
                  <div className="relative mb-4 h-40 w-full flex items-center justify-center">
                    <Image
                      src={product.images[0].url}
                      alt={product.name}
                      fill
                      className="object-cover rounded-[4px] p-2 h-full"
                    />
                    <button
                      onClick={() => handleWishlistToggle(product)}
                      className="absolute top-2 right-2 p-2 bg-white rounded-lg shadow-md hover:bg-accent-1 hover:text-white transition-colors"
                    >
                      <Heart 
                        size={18} 
                        className={isInWishlist(product.id) ? 'fill-red-500 text-red-500' : 'text-accent-1'} 
                      />
                    </button>
                  </div>

                  {/* Product Info */}
                  <Link href={`/products/${product.id}`}>
                    <h3 className="font-medium text-secondary line-clamp-2 mb-2 hover:text-accent-1">
                      {product.name}
                    </h3>
                  </Link>

                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg font-bold text-accent-1">
                      KES {product.price.toLocaleString()}
                    </span>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-4">
                    {renderRating(product.rating || 0)}
                    <span className="text-xs text-gray-500">
                      ({product.reviews?.length || 0})
                    </span>
                  </div>

                  {/* Add to Cart Action */}
                  {isInCart(product.id) ? (
                    <div className="flex items-center justify-between overflow-hidden">
                      <button
                        onClick={() => {
                          const newQuantity = cartItemQuantity(product.id) - 1;
                          if (newQuantity < 1) {
                            removeFromCart(product.id);
                          } else {
                            updateCartQuantity(product.id, newQuantity);
                          }
                        }}
                        className="p-2 transition-colors text-contrast rounded-[4px] bg-accent-1"
                      >
                        <Minus size={16} className='text-white' />
                      </button>
                      <span className="w-12 text-center font-medium">
                        {cartItemQuantity(product.id)}
                      </span>
                      <button
                        onClick={() => updateCartQuantity(product.id, cartItemQuantity(product.id) + 1)}
                        className="p-2 transition-colors text-contrast rounded-[4px] bg-accent-1"
                      >
                        <Plus size={16} className='text-white' />
                      </button>
                    </div>
                  ) : (
                    <button 
                      onClick={() => handleAddToCart(product)}
                      className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-[4px] bg-accent-1 text-white hover:bg-accent-1/90 transition-colors"
                    >
                      <ShoppingCart size={18} />
                      Add to Cart
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* Mobile View */}
            <div className="sm:hidden space-y-4">
              {recentProducts.map((product) => (
                <div 
                  key={product.id}
                  className="flex rounded-[4px] overflow-hidden relative"
                >
                  <div className="relative rounded-l-[5px] w-35 flex-shrink-0 cursor-pointer group flex items-center justify-center">
                    <div className="relative w-30 h-30 flex items-center justify-center">
                      <Image
                        src={product.images[0].url}
                        alt={product.name}
                        fill
                        className="object-contain transition-transform duration-200 rounded-[4px] group-hover:scale-105"
                      />
                    </div>
                  </div>

                  <div className="flex-1 p-3 flex flex-col justify-between">
                    <div>
                      <Link href={`/products/${product.id}`}>
                        <h3 className="font-medium text-primary line-clamp-2 text-md hover:text-accent-1">
                          {product.name}
                        </h3>
                      </Link>

                      <div className="flex items-center gap-1 my-1">
                        {renderRating(product.rating || 0)}
                        <span className="text-sm text-gray-500">
                          ({product.reviews?.length || 0})
                        </span>
                      </div>

                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-base font-bold text-accent-1">
                          KES {product.price.toLocaleString()}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-2 mt-2">
                      {isInCart(product.id) ? (
                        <div className="flex items-center justify-between overflow-hidden flex-1">
                          <button
                            onClick={() => {
                              const newQuantity = cartItemQuantity(product.id) - 1;
                              if (newQuantity < 1) {
                                removeFromCart(product.id);
                              } else {
                                updateCartQuantity(product.id, newQuantity);
                              }
                            }}
                            className="p-2 transition-colors text-contrast rounded-[4px] bg-accent-1"
                          >
                            <Minus size={16} className='text-white' />
                          </button>
                          <span className="w-12 text-center font-medium">
                            {cartItemQuantity(product.id)}
                          </span>
                          <button
                            onClick={() => updateCartQuantity(product.id, cartItemQuantity(product.id) + 1)}
                            className="p-2 transition-colors text-contrast rounded-[4px] bg-accent-1"
                          >
                            <Plus size={16} className='text-white' />
                          </button>
                        </div>
                      ) : (
                        <button 
                          onClick={() => handleAddToCart(product)}
                          className="flex-1 flex items-center justify-center gap-1 py-2 text-md rounded-[4px] bg-accent-1 text-white hover:bg-accent-1/90 transition-colors"
                        >
                          <ShoppingCart className='w-5 h-5 mr-2'/>
                          Add to Cart
                        </button>
                      )}
                      <button
                        onClick={() => handleWishlistToggle(product)}
                        className="p-2 rounded-[4px] hover:bg-gray-200 transition-colors"
                      >
                        <Heart 
                          className={`w-6 h-6 ${isInWishlist(product.id) ? 'fill-red-500 text-red-500' : 'text-accent-1'}`}
                        />
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