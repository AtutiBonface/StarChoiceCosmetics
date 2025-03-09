'use client'

import React, { useState } from 'react'
import { Search, User, ShoppingCart, Heart, ArrowLeft, LogOut, Package, ChevronDown } from 'lucide-react'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import AnnouncementBar from './announcementbar'
import CategoryNav from './categoryNav'
import Image from 'next/image'

const TopBar = () => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const isLoggedIn = true // Replace with your auth logic
  const router = useRouter()
  const pathname = usePathname()

  const shouldShowBack = pathname?.startsWith('/products') || 
                        pathname?.startsWith('/search') || 
                        pathname?.startsWith('/category')

  const handleMouseEnter = (dropdown: string) => {
    setActiveDropdown(dropdown)
  }

 

  // Mock data - replace with your actual data
  const wishlistItems = [
    { id: 1, name: "Nivea Perfect & Radiant", price: 1299, image: "/nivea-oil.webp" },
    { id: 2, name: "L'Oreal Paris Revitalift", price: 2499, image: "/nivea-oil.webp" }
  ]

  const cartItems = [
    { id: 1, name: "Nivea Perfect & Radiant", price: 1299, quantity: 1, image: "/nivea-oil.webp" }
  ]

  const closeDropdown = () => {
    setActiveDropdown(null)
  }

  return (
    <div className='fixed top-0 left-0 w-full z-50 border-b border-[#A9BA9D] bg-primary'>
      <AnnouncementBar/>
      <div className="max-w-7xl mx-auto border-b border-gray-200">
        <div className="h-16 w-full text-gray-800 px-4 flex justify-between items-center z-50">
          {/* Logo Section - Hidden on mobile */}
          <Link href="/" className="hidden md:block text-xl font-bold">
            StarChoice<span className="text-pink-600">Cosmetics</span>
          </Link>

          {/* Search Section with conditional back button */}
          <div className="flex-1 max-w-2xl mx-auto md:mx-8">
            <div className="relative flex items-center gap-2">
              {shouldShowBack && (
                <button 
                  onClick={() => router.back()}
                  className="p-2 text-white md:hidden rounded-full bg-pink-600 shadow-lg"
                  aria-label="Go back"
                >
                  <ArrowLeft className="w-6 h-6" />
                </button>
              )}
              <input
                type="text"
                placeholder="Search products..."
                className="w-full px-4 py-2 ring-1 ring-pink-600 focus:outline-none focus:ring-pink-600/50 rounded-[4px]"
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2 ">
                <Search className="w-5 h-5 text-gray-500" />
              </button>
            </div>
          </div>

          {/* Actions Section - Hidden on mobile */}
          <div className="hidden md:flex items-center gap-4">
            {/* Account Dropdown */}
            <div className="relative">
              {/* Account Button */}
              <button 
                className="flex items-center gap-1 hover:text-pink-600"
                onClick={() => activeDropdown === 'account' ? closeDropdown() : handleMouseEnter('account')}
              >
                <div className="relative">
                  <User className="w-5 h-5" />
                </div>
                <span className="hidden sm:flex items-center gap-1">
                  Account
                  <ChevronDown className="w-4 h-4" />
                </span>
              </button>
              {activeDropdown === 'account' && (
                <div className="absolute right-0 mt-2 w-64 bg-primary rounded-[1px] shadow-lg border border-[#A9BA9D] overflow-hidden">
                  {isLoggedIn ? (
                    <>
                      {/* User Info Section */}
                      <div className="p-4 border-b border-[#A9BA9D] bg-primaty">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-pink-600 flex items-center justify-center">
                            <User className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <h3 className="font-medium text-[#333333]">Admin</h3>
                            <p className="text-xs text-gray-500">admin@atuti.com</p>
                          </div>
                        </div>
                      </div>

                      {/* Navigation Links */}
                      <div className="py-2">
                        <Link 
                          href="/account/orders" 
                          className="flex items-center gap-3 px-4 py-2.5 hover:bg-pink-50 text-sm text-[#333333] transition-colors"
                        >
                          <Package size={16} />
                          <div>
                            <span>My Orders</span>
                            <p className="text-xs text-gray-500">Track, return, or buy again</p>
                          </div>
                        </Link>
                        <Link 
                          href="/account/profile" 
                          className="flex items-center gap-3 px-4 py-2.5 hover:bg-pink-50 text-sm text-[#333333] transition-colors"
                        >
                          <User size={16} />
                          <div>
                            <span>My Profile</span>
                            <p className="text-xs text-gray-500">Manage your details</p>
                          </div>
                        </Link>
                        <button 
                          className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-red-50 text-sm text-red-600 transition-colors border-t border-[#A9BA9D] mt-2"
                          onClick={() => {/* Add logout logic */}}
                        >
                          <LogOut size={16} />
                          <span>Logout</span>
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="p-6">
                      <div className="text-center mb-4">
                        <h3 className="font-medium text-lg text-[#333333] mb-1">Welcome Back</h3>
                        <p className="text-sm text-gray-500">Sign in to access your account</p>
                      </div>
                      <Link 
                        href="/account" 
                        className="block w-full bg-pink-600 text-white text-center py-2.5 rounded-[1px] text-sm hover:bg-pink-600/90 transition-colors"
                      >
                        Login / Register
                      </Link>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Wishlist Dropdown */}
            <div className="relative">
              {/* Wishlist Button */}
              <button 
                className="flex items-center gap-1 hover:text-pink-600"
                onClick={() => activeDropdown === 'wishlist' ? closeDropdown() : handleMouseEnter('wishlist')}
              >
                <div className="relative">
                  <Heart className="w-5 h-5" />
                  {wishlistItems.length > 0 && (
                    <span className="absolute -top-2 -right-2 w-4 h-4 bg-pink-600 text-white text-xs rounded-full flex items-center justify-center">
                      {wishlistItems.length}
                    </span>
                  )}
                </div>
                <span className="hidden sm:flex items-center gap-1">
                  Wishlist
                  <ChevronDown className="w-4 h-4" />
                </span>
              </button>
              {activeDropdown === 'wishlist' && (
                <div className="absolute right-0 mt-2 w-72 bg-primary rounded-[1px] shadow-lg border border-[#A9BA9D] p-4">
                  {wishlistItems.length > 0 ? (
                    <>
                      {/* Show only first item */}
                      <Link 
                        href={`/products/${wishlistItems[0].id}`}
                        className="flex gap-3 hover:bg-gray-50 p-2 -m-2 rounded-[1px] transition-colors"
                      >
                        <div className="relative w-16 h-16 flex-shrink-0">
                          <Image
                            src={wishlistItems[0].image}
                            alt={wishlistItems[0].name}
                            fill
                            className="object-cover rounded-[1px]"
                            sizes="64px"
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-sm text-[#333333] line-clamp-1">{wishlistItems[0].name}</h3>
                          <p className="text-pink-600 font-bold text-sm">
                            KES {wishlistItems[0].price.toLocaleString()}
                          </p>
                          {wishlistItems.length > 1 && (
                            <p className="text-sm text-[#333333] mt-1">
                              +{wishlistItems.length - 1} more items
                            </p>
                          )}
                        </div>
                      </Link>
                      <Link 
                        href="/wishlist" 
                        className="block w-full bg-pink-600 text-white text-center py-2 rounded-[1px] text-sm mt-4 hover:bg-pink-600/90"
                      >
                        View All Items ({wishlistItems.length})
                      </Link>
                    </>
                  ) : (
                    <p className="text-sm text-[#333333] text-center">Your wishlist is empty</p>
                  )}
                </div>
              )}
            </div>

            {/* Cart Dropdown */}
            <div className="relative">
              {/* Cart Button */}
              <button
                className="flex items-center gap-1 hover:text-pink-600"
                onClick={() => activeDropdown === 'cart' ? closeDropdown() : handleMouseEnter('cart')}
              >
                <div className="relative">
                  <ShoppingCart className="w-5 h-5" />
                  {cartItems.length > 0 && (
                    <span className="absolute -top-2 -right-2 w-4 h-4 bg-pink-600 text-white text-xs rounded-full flex items-center justify-center">
                      {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
                    </span>
                  )}
                </div>
                <span className="hidden sm:flex items-center gap-1">
                  Cart
                  <ChevronDown className="w-4 h-4" />
                </span>
              </button>
              {activeDropdown === 'cart' && (
                <div className="absolute right-0 mt-2 w-72 bg-primary rounded-[1px] shadow-lg border border-[#A9BA9D] p-4">
                  {cartItems.length > 0 ? (
                    <>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="font-medium text-[#333333]">Items:</span>
                        <span className="text-[#333333]">
                          {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm mb-3">
                        <span className="font-medium text-[#333333]">Subtotal:</span>
                        <span className="font-bold text-pink-600">
                          KES {cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0).toLocaleString()}
                        </span>
                      </div>
                      <Link 
                        href="/cart" 
                        className="block w-full bg-pink-600 text-white text-center py-2 rounded-[1px] text-sm hover:bg-pink-600/90"
                      >
                        View Cart
                      </Link>
                    </>
                  ) : (
                    <p className="text-sm text-[#333333] text-center">Your cart is empty</p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <CategoryNav/>
    </div>
  )
}

export default TopBar