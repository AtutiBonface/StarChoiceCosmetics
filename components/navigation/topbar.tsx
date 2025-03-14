'use client'

import React, { useEffect, useState, useCallback } from 'react'
import { Search, User, ShoppingCart, Heart, ArrowLeft, LogOut, Package, ChevronDown } from 'lucide-react'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import axios from 'axios'

// Dynamically import components that are not needed immediately
const AnnouncementBar = dynamic(() => import('./announcementbar'), { ssr: true })
const CategoryNav = dynamic(() => import('./categoryNav'), { ssr: true })

const TopBar = () => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false) // Start with false
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  // Memoize the authentication check
  const checkAuth = useCallback(async () => {
    try {
      setIsLoading(true)
      const resp = await axios("/api/auth/status", {
        headers: {
          'Cache-Control': 'no-cache'
        }
      })
      setIsAuthenticated(resp.data?.isAuthenticated)
    } catch (error) {
      console.error('Auth check failed:', error)
      setIsAuthenticated(false)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  // Memoize the logout handler
  const handleLogout = useCallback(async () => {
    try {
      await axios.get('/api/logout')
      setIsAuthenticated(false)
      closeDropdown()
      router.push('/')
    } catch (error) {
      console.error("Logout failed:", error)
    }
  }, [router])

  // Memoize dropdown handler
  const handleDropdown = useCallback((dropdown: string) => {
    setActiveDropdown(prev => prev === dropdown ? null : dropdown)
  }, [])

  const closeDropdown = useCallback(() => {
    setActiveDropdown(null)
  }, [])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (activeDropdown && !(event.target as Element).closest('.dropdown-container')) {
        closeDropdown()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [activeDropdown, closeDropdown])

  // Memoize navigation checks
  const shouldShowBack = pathname?.startsWith('/products') || 
                        pathname?.startsWith('/search') || 
                        pathname?.startsWith('/category') || 
                        (pathname?.startsWith('/customer') && !pathname?.startsWith('/customer/account'))

  const wishlistItems = [
    { id: 1, name: "Nivea Perfect & Radiant", price: 1299, image: "/nivea-oil.webp" },
    { id: 2, name: "L'Oreal Paris Revitalift", price: 2499, image: "/nivea-oil.webp" }
  ]

  const cartItems = [
    { id: 1, name: "Nivea Perfect & Radiant", price: 1299, quantity: 1, image: "/nivea-oil.webp" }
  ]

  return (
    <div className='fixed top-0 left-0 w-full z-50 border-b border-medium bg-primary'>
      <AnnouncementBar />
      <div className="max-w-7xl mx-auto border-b border-medium">
        <div className="h-16 w-full text-secondary px-4 flex justify-between items-center z-50">
          {/* Logo Section - Hidden on mobile */}
          <Link href="/" className="hidden md:flex items-center gap-2 text-xl font-bold">
            <div className="relative w-10 h-10">
              <Image 
                src="/icons/starchoice-logo.svg"  
                alt='StarChoice Cosmetics' 
                fill
                className="object-contain"
                priority
              />
            </div>
            <span className="text-primary">StarChoice</span>
          </Link>

          {/* Search Section with conditional back button */}
          <div className="flex-1 max-w-2xl mx-auto md:mx-8">
            <div className="relative flex items-center gap-2">
              {shouldShowBack && (
                <button 
                  onClick={() => router.back()}
                  className="p-2 text-contrast md:hidden rounded-full bg-accent-1 shadow-lg"
                  aria-label="Go back"
                >
                  <ArrowLeft className="w-6 h-6" />
                </button>
              )}
              <input
                type="text"
                placeholder="Search products..."
                className="w-full px-4 py-2 border border-medium focus:outline-none focus:ring-accent-1/50 rounded-[4px]"
              />
              <button className="absolute right-0 top-1/2 -translate-y-1/2 bg-accent-1 h-full w-[50px] rounded-r-[4px] flex items-center justify-center">
                <Search className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>

          {/* Actions Section - Hidden on mobile */}
          <div className="hidden md:flex items-center gap-4">
            {/* Account Dropdown */}
            <div className="dropdown-container relative">
              {/* Account Button */}
              <button 
                className="flex items-center gap-1 hover:text-accent-1"
                onClick={() => handleDropdown('account')}
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
                <div className="absolute right-0 mt-2 w-64 bg-primary rounded-[4px] shadow-lg border border-medium overflow-hidden">
                  {isAuthenticated ? (
                    <>
                      {/* User Info Section */}
                      <div className="p-4 border-b border-medium bg-primary">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-accent-1 flex items-center justify-center">
                            <User className="w-5 h-5 text-contrast" />
                          </div>
                          <div>
                            <h3 className="font-medium text-primary">Admin</h3>
                            <p className="text-xs text-secondary">admin@admin.com</p>
                          </div>
                        </div>
                      </div>

                      {/* Navigation Links */}
                      <div className="py-2">
                        <Link 
                          href="/customer/orders" 
                          className="flex items-center gap-3 px-4 py-2.5 hover:bg-accent-light text-sm text-primary transition-colors"
                        >
                          <Package size={16} />
                          <div>
                            <span>My Orders</span>
                            <p className="text-xs text-secondary">Track, return, or buy again</p>
                          </div>
                        </Link>
                        <Link 
                          href="/customer/profile" 
                          className="flex items-center gap-3 px-4 py-2.5 hover:bg-accent-light text-sm text-primary transition-colors"
                        >
                          <User size={16} />
                          <div>
                            <span>My Profile</span>
                            <p className="text-xs text-secondary">Manage your details</p>
                          </div>
                        </Link>
                        <button 
                          className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-error-color/10 text-sm text-error-color transition-colors border-t border-medium mt-2"
                          onClick={handleLogout}
                        >
                          <LogOut size={16} />
                          <span>Logout</span>
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="p-6">
                      <div className="text-center mb-4">
                        <h3 className="font-medium text-lg text-primary mb-1">Welcome Back</h3>
                        <p className="text-sm text-secondary">Sign in to access your account</p>
                      </div>
                      <Link 
                        href="/account" 
                        className="block w-full bg-accent-1 text-contrast text-center py-2.5 rounded-[4px] text-sm hover:bg-accent-1/90 transition-colors"
                      >
                        Login / Register
                      </Link>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Wishlist Dropdown */}
            <div className="dropdown-container relative">
              {/* Wishlist Button */}
              <button 
                className="flex items-center gap-1 hover:text-accent-1"
                onClick={() => {
                  if(isAuthenticated){
                    handleDropdown('wishlist')
                  }else{
                    router.push('/account')
                  }
                }}
              >
                <div className="relative">
                  <Heart className="w-5 h-5" />
                  {(wishlistItems.length > 0  && isAuthenticated )&& (
                    <span className="absolute -top-2 -right-2 w-4 h-4 bg-accent-1 text-contrast text-xs rounded-full flex items-center justify-center">
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
                 
                <div className="absolute right-0 mt-2 w-72 bg-primary rounded-[4px] shadow-lg border border-medium p-4">
                  {wishlistItems.length > 0 ? (
                    <>
                      {/* Show only first item */}
                      <Link 
                        href={`/products/${wishlistItems[0].id}`}
                        className="flex gap-3 hover:bg-accent-light p-2 -m-2 rounded-[4px] transition-colors"
                      >
                        <div className="relative w-16 h-16 flex-shrink-0">
                          <Image
                            src={wishlistItems[0].image}
                            alt={wishlistItems[0].name}
                            fill
                            className="object-cover rounded-[4px]"
                            sizes="64px"
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-sm text-primary line-clamp-1">{wishlistItems[0].name}</h3>
                          <p className="text-accent-1 font-bold text-sm">
                            KES {wishlistItems[0].price.toLocaleString()}
                          </p>
                          {wishlistItems.length > 1 && (
                            <p className="text-sm text-primary mt-1">
                              +{wishlistItems.length - 1} more items
                            </p>
                          )}
                        </div>
                      </Link>
                      <Link 
                        href="/wishlist" 
                        className="block w-full bg-accent-1 text-contrast text-center py-2 rounded-[4px] text-sm mt-4 hover:bg-accent-1/90"
                      >
                        View All Items ({wishlistItems.length})
                      </Link>
                    </>
                  ) : (
                    <p className="text-sm text-primary text-center">Your wishlist is empty</p>
                  )}

                </div>                
              )}
            </div>

            {/* Cart Dropdown */}
            <div className="dropdown-container relative">
              {/* Cart Button */}
              <button
                className="flex items-center gap-1 hover:text-accent-1"
                onClick={() => {
                  if(isAuthenticated){
                    handleDropdown('cart')
                  }else{
                    router.push('/account')
                  }
                }}
              >
                <div className="relative">
                  <ShoppingCart className="w-5 h-5" />
                  {(cartItems.length > 0 && isAuthenticated)  && (
                    <span className="absolute -top-2 -right-2 w-4 h-4 bg-accent-1 text-contrast text-xs rounded-full flex items-center justify-center">
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
                <div className="absolute right-0 mt-2 w-72 bg-primary rounded-[4px] shadow-lg border border-medium p-4">
                  {cartItems.length > 0 ? (
                    <>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="font-medium text-primary">Items:</span>
                        <span className="text-primary">
                          {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm mb-3">
                        <span className="font-medium text-primary">Subtotal:</span>
                        <span className="font-bold text-accent-1">
                          KES {cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0).toLocaleString()}
                        </span>
                      </div>
                      <Link 
                        href="/cart" 
                        className="block w-full bg-accent-1 text-contrast text-center py-2 rounded-[4px] text-sm hover:bg-accent-1/90"
                      >
                        View Cart
                      </Link>
                    </>
                  ) : (
                    <p className="text-sm text-primary text-center">Your cart is empty</p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {!isLoading && (
        <div className="hidden md:block mt-auto">
          <CategoryNav />
        </div>
      )}
    </div>
  )
}

export default TopBar