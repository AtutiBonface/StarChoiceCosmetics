'use client'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { Minus, Plus, Trash2, ChevronRight, ShoppingBag, Star } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import CartSkeleton from '@/components/skeletons/CartSkeleton'
import { initialCartItems , CartItem } from '@/mockData'


const Cart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        setIsLoading(true)
        await new Promise(resolve => setTimeout(resolve, 1000))
        setCartItems(initialCartItems)
      } catch (error) {
        console.error('Failed to fetch cart items:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchCartItems()
  }, [])

  const updateQuantity = (id: number, change: number) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    )
  }

  const removeItem = (id: number) => {
    setCartItems(items => items.filter(item => item.id !== id))
  }

  // Move rendering function outside JSX for better organization
  const renderRating = (rating: number) => (
    <div className="flex items-center">
      <span className="text-amber-500 mr-1 text-sm">{rating}</span>
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i} 
            size={12} 
            className={i < Math.floor(rating) ? 'text-amber-500 fill-amber-500' : 'text-gray-300'} 
          />
        ))}
      </div>
    </div>
  )

  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const shipping = subtotal >= 5000 ? 0 : 500
  const total = subtotal + shipping

  if (isLoading) {
    return <CartSkeleton />
  }

  return (
    <div>
      {/* Breadcrumb Navigation */}
      <div className="w-full bg-secondary">
        <div className="max-w-7xl mx-auto px-4 py-2">
          <div className="flex items-center gap-2 text-sm text-secondary">
            <Link href="/" className="hover:text-accent-1">Home</Link>
            <ChevronRight size={16} />
            <span className="text-accent-1">Shopping Cart ({cartItems.length} {cartItems.length === 1 ? 'item' : 'items'})</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-2 py-2">     
        {cartItems.length === 0 ? (
          <div className="text-center py-12">
            <div className="mb-4">
              <ShoppingBag className="w-12 h-12 text-accent-1 mx-auto" />
            </div>
            <p className="text-[#5C4033] mb-6">Your cart is empty</p>
            <Link 
              href="/"
              className="inline-block bg-accent-1 text-white px-6 py-3 rounded-[4px] hover:bg-accent-1/90 transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              
              
              {/* Cart Items Container */}
              <div className="bg-primary rounded-[4px] overflow-hidden mb-">
                <div>
                  {cartItems.map((item) => (
                    <div key={item.id} className="p-2 md:p-4  mb-2 rounded-[4px]">
                      {/* Desktop View */}

                      <div className="hidden sm:flex gap-6 items-stretch">

                        <div 
                        className="relative  rounded-l-[5px] w-40  flex-shrink-0 cursor-pointer group flex items-center justify-center bg-image"
                        >
                           {/* Product Image */}
                          <div className="relative w-30 h-30 flex-shrink-0">
                            <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              className="object-contain transition-transform duration-200 group-hover:scale-105"
                            />
                          </div>
                        </div>
                       

                        {/* Product Details */}
                        <div className="flex-1 flex flex-col">
                          <div className="flex-1">
                            <Link href={`/products/${item.id}`}>
                              <h3 className="font-medium text-lg text-secondary hover:text-accent-1">{item.name}</h3>
                            </Link>
                            <div className="flex items-center gap-2 mt-1">
                              {renderRating(item.rating)}
                              <span className="text-xs text-gray-500">({item.reviewCount})</span>
                            </div>
                            <div className="flex items-center gap-2 mt-2">
                              <span className="text-lg font-bold text-accent-1">
                                KES {item.price.toLocaleString()}
                              </span>
                              {item.oldPrice && (
                                <span className="text-sm text-gray-500 line-through">
                                  KES {item.oldPrice.toLocaleString()}
                                </span>
                              )}
                            </div>
                            <p className="text-green-600 text-sm mt-1">In Stock</p>
                            <p className="text-xs text-gray-600 mt-1">Delivery: {item.deliveryDate}</p>
                          </div>

                          <div className="flex flex-wrap items-center justify-between gap-4 mt-4">
                            <div className="flex items-center border border-medium rounded overflow-hidden">
                              <button
                                onClick={() => updateQuantity(item.id, -1)}
                                className="p-2 hover:bg-gray-100 transition-colors text-secondary"
                                aria-label="Decrease quantity"
                              >
                                <Minus size={16} className='text-secondary' />
                              </button>
                              <span className="w-12 text-center font-medium">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.id, 1)}
                                className="p-2 hover:bg-gray-100 transition-colors text-secondary"
                                aria-label="Increase quantity"
                              >
                                <Plus size={16} />
                              </button>
                            </div>
                            
                            <div className="flex items-center">
                              <span className="mr-4 font-medium text-primary">
                                Total: KES {(item.price * item.quantity).toLocaleString()}
                              </span>
                              <button
                                onClick={() => removeItem(item.id)}
                                className="text-red-500 hover:text-red-600 p-2 hover:bg-gray-50 rounded-full transition-colors"
                                aria-label="Remove item"
                              >
                                <Trash2 size={20} />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Mobile View */}
                      <div className="sm:hidden  pb-2  ">
                        <div className="flex items-stretch gap-4">
                        <div 
                            className="relative  rounded-l-[5px] w-32  flex-shrink-0 cursor-pointer group flex items-center justify-center bg-image"
                          >
                            <div className="relative w-30 h-30 flex-shrink-0">
                              <Image
                                src={item.image}
                                alt={item.name}
                                fill
                                className="object-contain rounded"
                              />
                            </div>
                          </div>
                          

                          {/* Product Details */}
                          <div className="flex flex-col">
                            <div className="flex-1">
                              <Link href={`/products/${item.id}`}>
                                <h3 className="font-medium text-md text-primary hover:text-accent-1 line-clamp-2">{item.name}</h3>
                              </Link>
                              
                              <div className="flex items-center gap-2 mt-1">
                                <span className="text-base font-bold text-accent-1">
                                  KES {item.price.toLocaleString()}
                                </span>
                                {item.oldPrice && (
                                  <span className="text-sm text-gray-500 line-through">
                                    KES {item.oldPrice.toLocaleString()}
                                  </span>
                                )}
                              </div>
                              
                              <div className="flex items-center gap-1 mt-1">
                                {renderRating(item.rating)}
                                <span className="text-sm text-gray-500">({item.reviewCount})</span>
                              </div>
                              
                              <div className="flex flex-col gap-1 mt-2">
                                <p className="text-green-600 text-sm">In Stock</p>
                                <p className="text-sm text-gray-600">Delivery: {item.deliveryDate}</p>
                              </div>
                            </div>
                            <div className="mt-3 flex items-center justify-between">
                          <div className="flex items-center gap-1">
                            <span className="text-md text-gray-700">Qty:</span>
                            <select 
                              value={item.quantity}
                              onChange={(e) => {
                                const newQty = parseInt(e.target.value);
                                const change = newQty - item.quantity;
                                updateQuantity(item.id, change);
                              }}
                              className="border border-medium rounded-[2px] w-[40px]  focus:outline-none text-sm p-1"
                            >
                              {[...Array(10)].map((_, i) => (
                                <option key={i} value={i+1}>{i+1}</option>
                              ))}
                            </select>
                          </div>
                          
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => removeItem(item.id)}
                              className="text-red-600 text-xs hover:text-accent-1"
                            >
                              <Trash2 className='h-5 w-5'/>
                            </button>
                            <span className="text-gray-300">|</span>
                            <button className="text-gray-700 text-sm hover:text-accent-1">
                              Save for later
                            </button>
                          </div>
                            </div>
                          </div>
                        </div>
                        
                        
                       
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="lg:hidden bg-secondary mb-4 p-4 border border-medium rounded-[4px]">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-secondary">Subtotal ({cartItems.reduce((sum, item) => sum + item.quantity, 0)} items)</p>
                    <p className="font-bold text-lg text-accent-1">KES {total.toLocaleString()}</p>
                  </div>
                  <button 
                    onClick={() => router.push("/checkout")}
                    className="bg-accent-1 text-white py-2 px-4 rounded-[4px] text-sm hover:bg-accent-1/90 transition-colors"
                  >
                    Checkout
                  </button>
                </div>
                {shipping > 0 && (
                  <p className="text-xs text-[#5C4033] mt-2">
                    Free shipping on orders over KES 5,000
                  </p>
                )}
              </div>
              </div>

              {/* Continue Shopping Link - Mobile */}
              <div className="lg:hidden mb-24">
                <Link
                  href="/"
                  className="bg-secondary flex justify-center items-center text-sm text-secondary hover:text-accent-1 py-3  rounded-[4px] w-full"
                >
                  <ChevronRight size={16} className="mr-1" /> Continue Shopping
                </Link>
              </div>
            </div>

            {/* Order Summary - Desktop */}
            <div className="hidden lg:block bg-secondary p-6 rounded-[4px] shadow-sm border border-medium h-fit sticky top-4">
              <h2 className="text-xl font-bold text-secondary mb-6">Order Summary</h2>
              <div className="space-y-4 text-sm">
                <div className="flex justify-between pb-2">
                  <span className="text-secondary">Subtotal ({cartItems.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
                  <span className="font-medium text-secondary">KES {subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between pb-2">
                  <span className="text-secondary">Shipping</span>
                  <span className="font-medium text-secondary">
                    {shipping === 0 ? 'Free' : `KES ${shipping.toLocaleString()}`}
                  </span>
                </div>
                <div className="border-t border-medium pt-4 mt-2">
                  <div className="flex justify-between font-bold text-lg text-secondary">
                    <span>Total</span>
                    <span>KES {total.toLocaleString()}</span>
                  </div>
                  <p className="text-xs text-[#5C4033] mt-1">
                    {shipping > 0 
                      ? 'Free shipping on orders over KES 5,000' 
                      : 'Your order qualifies for free shipping'
                    }
                  </p>
                </div>
              </div>
              
              <button 
                onClick={() => router.push("/checkout")} 
                className="w-full bg-accent-1 text-white py-3 rounded-[4px] mt-6 hover:bg-accent-1/90 transition-colors font-medium"
              >
                Proceed to Checkout
              </button>
              
              <Link
                href="/"
                className="flex justify-center items-center text-sm text-secondary hover:text-accent-1 mt-4 py-2"
              >
                <ChevronRight size={16} className="mr-1" /> Continue Shopping
              </Link>
            </div>

            {/* Fixed Checkout Bar on Mobile - Appears when scrolling */}
            <div className="lg:hidden fixed bottom-16 sm:bottom-0 bg-primary left-0 right-0 bg-white border-t border-medium p-4 shadow-lg z-20">
              <button 
                onClick={() => router.push("/checkout")} 
                className="w-full bg-accent-1 text-white py-3 rounded-[4px] hover:bg-accent-1/90 transition-colors font-medium flex items-center justify-center gap-2"
              >
                Proceed to Checkout • KES {total.toLocaleString()}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Cart