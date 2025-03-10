'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import { Minus, Plus, Trash2, ChevronRight, ShoppingBag, Star } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

// Type definitions for better type safety
interface CartItem {
  id: number
  name: string
  price: number
  oldPrice?: number
  image: string
  quantity: number
  rating: number
  reviewCount: number
  deliveryDate: string
}

// Mock cart data
const initialCartItems: CartItem[] = [
  {
    id: 1,
    name: "Nivea Perfect & Radiant Luminous630",
    price: 1299,
    oldPrice: 1499,
    image: "/nivea-oil.webp",
    quantity: 1,
    rating: 4.2,
    reviewCount: 950,
    deliveryDate: "Wed, Mar 12"
  },
  {
    id: 2,
    name: "Nivea Radiant Luminous630",
    price: 899,
    oldPrice: 1099,
    image: "/nivea-oil.webp",
    quantity: 3,
    rating: 4.5,
    reviewCount: 1250,
    deliveryDate: "Thu, Mar 13"
  },
]

const Cart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems)
  const router = useRouter()
  
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
      <span className="text-amber-500 mr-1 text-xs">{rating}</span>
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

  return (
    <div>
      {/* Breadcrumb Navigation */}
      <div className="w-full bg-[#A9BA9D]">
        <div className="max-w-7xl mx-auto px-4 py-2">
          <div className="flex items-center gap-2 text-sm text-[#333333]">
            <Link href="/" className="hover:text-pink-600">Home</Link>
            <ChevronRight size={16} />
            <span className="text-pink-600">Shopping Cart ({cartItems.length} {cartItems.length === 1 ? 'item' : 'items'})</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-2 py-2">     
        {cartItems.length === 0 ? (
          <div className="text-center py-12">
            <div className="mb-4">
              <ShoppingBag className="w-12 h-12 text-pink-600 mx-auto" />
            </div>
            <p className="text-[#5C4033] mb-6">Your cart is empty</p>
            <Link 
              href="/"
              className="inline-block bg-pink-600 text-white px-6 py-3 rounded-[1px] hover:bg-pink-600/90 transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              {/* Mobile Summary */}
              <div className="lg:hidden bg-secondary mb-4 p-4 border border-gray-200 rounded-[1px]">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-[#333333]">Subtotal ({cartItems.reduce((sum, item) => sum + item.quantity, 0)} items)</p>
                    <p className="font-bold text-lg text-pink-600">KES {total.toLocaleString()}</p>
                  </div>
                  <button 
                    onClick={() => router.push("/checkout")}
                    className="bg-pink-600 text-white py-2 px-4 rounded-[1px] text-sm hover:bg-pink-600/90 transition-colors"
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
              
              {/* Cart Items Container */}
              <div className="bg-primary border border-[#A9BA9D] rounded-[1px] overflow-hidden mb-4">

                <div className="p-4 border-b border-[#A9BA9D]">
                  <h2 className="font-bold text-lg text-[#333333]">Shopping Cart</h2>
                </div>
                <div className="divide-y divide-[#A9BA9D]">
                  {cartItems.map((item) => (
                    <div key={item.id} className="p-4">
                      {/* Desktop View */}
                      <div className="hidden sm:flex gap-6">
                        {/* Product Image */}
                        <div className="relative w-32 h-32 flex-shrink-0">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-contain rounded"
                          />
                        </div>

                        {/* Product Details */}
                        <div className="flex-1 flex flex-col">
                          <div className="flex-1">
                            <Link href={`/products/${item.id}`}>
                              <h3 className="font-medium text-lg text-[#333333] hover:text-pink-600">{item.name}</h3>
                            </Link>
                            <div className="flex items-center gap-2 mt-1">
                              {renderRating(item.rating)}
                              <span className="text-xs text-gray-500">({item.reviewCount})</span>
                            </div>
                            <div className="flex items-center gap-2 mt-2">
                              <span className="text-lg font-bold text-pink-600">
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

                          {/* Quantity and Remove Controls */}
                          <div className="flex flex-wrap items-center justify-between gap-4 mt-4">
                            <div className="flex items-center border border-gray-200 rounded overflow-hidden">
                              <button
                                onClick={() => updateQuantity(item.id, -1)}
                                className="p-2 hover:bg-gray-100 transition-colors"
                                aria-label="Decrease quantity"
                              >
                                <Minus size={16} />
                              </button>
                              <span className="w-12 text-center font-medium">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.id, 1)}
                                className="p-2 hover:bg-gray-100 transition-colors"
                                aria-label="Increase quantity"
                              >
                                <Plus size={16} />
                              </button>
                            </div>
                            
                            <div className="flex items-center">
                              <span className="mr-4 font-medium">
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
                      <div className="sm:hidden">
                        <div className="flex gap-4">
                          {/* Product Image */}
                          <div className="relative w-24 h-24 flex-shrink-0">
                            <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              className="object-contain rounded"
                            />
                          </div>

                          {/* Product Details */}
                          <div className="flex-1">
                            <Link href={`/products/${item.id}`}>
                              <h3 className="font-medium text-sm text-[#333333] hover:text-pink-600 line-clamp-2">{item.name}</h3>
                            </Link>
                            
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-base font-bold text-pink-600">
                                KES {item.price.toLocaleString()}
                              </span>
                              {item.oldPrice && (
                                <span className="text-xs text-gray-500 line-through">
                                  KES {item.oldPrice.toLocaleString()}
                                </span>
                              )}
                            </div>
                            
                            <div className="flex items-center gap-1 mt-1">
                              {renderRating(item.rating)}
                              <span className="text-xs text-gray-500">({item.reviewCount})</span>
                            </div>
                            
                            <div className="flex flex-col gap-1 mt-2">
                              <p className="text-green-600 text-xs">In Stock</p>
                              <p className="text-xs text-gray-600">Delivery: {item.deliveryDate}</p>
                            </div>
                          </div>
                        </div>
                        
                        
                        <div className="mt-3 flex items-center justify-between">
                          <div className="flex items-center gap-1">
                            <span className="text-xs text-gray-700">Qty:</span>
                            <select 
                              value={item.quantity}
                              onChange={(e) => {
                                const newQty = parseInt(e.target.value);
                                const change = newQty - item.quantity;
                                updateQuantity(item.id, change);
                              }}
                              className="border border-[#A9BA9D] rounded-[1px] text-sm p-1"
                            >
                              {[...Array(10)].map((_, i) => (
                                <option key={i} value={i+1}>{i+1}</option>
                              ))}
                            </select>
                          </div>
                          
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => removeItem(item.id)}
                              className="text-red-600 text-xs hover:text-pink-600"
                            >
                              Delete
                            </button>
                            <span className="text-gray-300">|</span>
                            <button className="text-gray-700 text-xs hover:text-pink-600">
                              Save for later
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="p-4 border-t border-[#A9BA9D] text-right">
                  <div className="font-bold text-lg text-[#333333]">
                    Subtotal ({cartItems.reduce((sum, item) => sum + item.quantity, 0)} items): 
                    <span className="text-pink-600 ml-2">KES {subtotal.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Continue Shopping Link - Mobile */}
              <div className="lg:hidden mb-24">
                <Link
                  href="/"
                  className="bg-secondary flex justify-center items-center text-sm text-[#333333] hover:text-pink-600 py-3  rounded-[1px] w-full"
                >
                  <ChevronRight size={16} className="mr-1" /> Continue Shopping
                </Link>
              </div>
            </div>

            {/* Order Summary - Desktop */}
            <div className="hidden lg:block bg-secondary p-6 rounded-[1px] shadow-sm border border-gray-200 h-fit sticky top-4">
              <h2 className="text-xl font-bold text-[#333333] mb-6">Order Summary</h2>
              <div className="space-y-4 text-sm">
                <div className="flex justify-between pb-2">
                  <span className="text-[#333333]">Subtotal ({cartItems.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
                  <span className="font-medium text-[#333333]">KES {subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between pb-2">
                  <span className="text-[#333333]">Shipping</span>
                  <span className="font-medium text-[#333333]">
                    {shipping === 0 ? 'Free' : `KES ${shipping.toLocaleString()}`}
                  </span>
                </div>
                <div className="border-t border-gray-200 pt-4 mt-2">
                  <div className="flex justify-between font-bold text-lg text-[#333333]">
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
                className="w-full bg-pink-600 text-white py-3 rounded-[1px] mt-6 hover:bg-pink-600/90 transition-colors font-medium"
              >
                Proceed to Checkout
              </button>
              
              <Link
                href="/"
                className="flex justify-center items-center text-sm text-[#333333] hover:text-pink-600 mt-4 py-2"
              >
                <ChevronRight size={16} className="mr-1" /> Continue Shopping
              </Link>
            </div>

            {/* Fixed Checkout Bar on Mobile - Appears when scrolling */}
            <div className="lg:hidden fixed bottom-16 sm:bottom-0 bg-primary left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg z-20">
              <button 
                onClick={() => router.push("/checkout")} 
                className="w-full bg-pink-600 text-white py-3 rounded-[1px] hover:bg-pink-600/90 transition-colors font-medium flex items-center justify-center gap-2"
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