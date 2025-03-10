'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import { Minus, Plus, Trash2, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

// Mock cart data - replace with your actual data
const initialCartItems = [
  {
    id: 1,
    name: "Nivea Perfect & Radiant Luminous630",
    price: 1299,
    image: "/nivea-oil.webp",
    quantity: 1
  },
  {
    id: 2,
    name: "Nivea Radiant Luminous630",
    price: 899,
    image: "/nivea-oil.webp",
    quantity: 3
  },
]

const Cart = () => {
  const [cartItems, setCartItems] = useState(initialCartItems)
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

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const shipping = subtotal >= 5000 ? 0 : 500
  const total = subtotal + shipping

  return (
    <div className="w-full mt-28 md:mt-38">
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

      <div className="max-w-7xl mx-auto px-4 py-2">     

        {cartItems.length === 0 ? (
          <div className="text-center py-12">
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
            <div className="lg:col-span-2 space-y-6">
              
              {cartItems.map((item) => (
                <div 
                  key={item.id}
                  className="flex flex-col sm:flex-row gap-6 p-6  border border-[#A9BA9D] rounded-[#A9BA9D] hover:shadow-md transition-shadow duration-300 cursor-pointer"
                >
                  {/* Product Image */}
                  <div className="relative w-full sm:w-32 h-40 sm:h-32 self-center sm:self-start">
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
                      <h3 className="font-medium text-lg text-[#333333]">{item.name}</h3>
                      <p className="text-pink-600 font-bold mt-2 text-lg">
                        KES {item.price.toLocaleString()}
                      </p>
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
              ))}
            </div>

            {/* Order Summary - Fixed text colors */}
            <div className="bg-secondary p-6 rounded shadow-sm border border-gray-100 h-fit">
              <h2 className="text-xl font-bold text-[#333333] mb-6">Order Summary</h2>
              <div className="space-y-4 text-sm">
                <div className="flex justify-between pb-2">
                  <span className="text-[#333333]">Subtotal</span>
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
              
              <button onClick={()=> router.push("/checkout")} className="w-full bg-pink-600 text-white py-3 rounded-[1px] mt-6 hover:bg-pink-600/90 transition-colors font-medium">
                Proceed to Checkout
              </button>
              
              <Link
                href="/"
                className="flex justify-center items-center text-sm text-[#333333] hover:text-pink-600 mt-4 py-2"
              >
                <ChevronRight size={16} className="mr-1" /> Continue Shopping
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Cart