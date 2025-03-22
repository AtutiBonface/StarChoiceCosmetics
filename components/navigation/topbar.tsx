
import React, { useEffect, useState, useCallback,  useRef } from 'react'
import { Search, User, ShoppingCart, Heart, ArrowLeft, LogOut, Package, ChevronDown, X } from 'lucide-react'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import axios from 'axios'
import { useCart } from '@/services/cartWishlistContext'

const AnnouncementBar = dynamic(() => import('./announcementbar'), { 
  ssr: true,
  loading: () => <div className="md:h-10" /> // Prevent layout shift
})

const CategoryNav = dynamic(() => import('./categoryNav'), { 
  ssr: true,
  loading: () => <div className="md:h-12" /> // Prevent layout shift
})

const TopBar = () => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false) // Start with false
  const [isLoading, setIsLoading] = useState(true)
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  const [showMobileSearch, setShowMobileSearch] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const dropdownRef = useRef<HTMLDivElement>(null)

  const router = useRouter()
  const pathname = usePathname()

  const { cart, wishlist, cartTotal,cartQuantity} = useCart();
  

  // Memoize the authentication check
  const checkAuth = useCallback(async () => {
    try {
      setIsLoading(true)
      const resp = await axios("/api/auth/status", {
        headers: {
          'Cache-Control': 'no-cache'
        }
      })
      console.log(resp.data)
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

  const closeDropdown = useCallback(() => {
    setActiveDropdown(null)
  }, [])

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
  }, [router, closeDropdown])

  // Memoize dropdown handler
  const handleDropdown = useCallback((dropdown: string) => {
    setActiveDropdown(prev => prev === dropdown ? null : dropdown)
  }, [])

  // Close dropdown when clicking outside
  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      closeDropdown()
    }
  }, [closeDropdown])

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [handleClickOutside])

  // Handle search submission
    const handleSearch = (e: React.FormEvent) => {
      e.preventDefault()
      if (searchQuery.trim()) {
        router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
        setShowMobileSearch(false)
      }
    }
  
    // Toggle mobile search
    const toggleMobileSearch = () => {
      setShowMobileSearch(prev => !prev)
      if (!showMobileSearch) {
        // Focus the search input when opening
        setTimeout(() => {
          const searchInput = document.getElementById('mobile-search-input')
          searchInput?.focus()
        }, 100)
      }
    }

  // Memoize navigation checks
  const shouldShowBack = pathname?.startsWith('/products') || 
                        pathname?.startsWith('/offers') ||  
                        pathname?.startsWith('/brands') ||  
                        pathname?.startsWith('/search') || 
                        pathname?.startsWith('/category') || 
                        (pathname?.startsWith('/customer') && !pathname?.startsWith('/customer/account'))


  

  // Optimize logo image
  const logoProps = {
    src: "/icons/starchoice-logo.png",
    alt: 'StarChoice Cosmetics',
    width: 160,
    height: 40,
    priority: true,
  }

  return (
    <div className='fixed top-0 left-0 w-full z-50 border-b border-medium bg-primary'>
      <AnnouncementBar />
      <div className="max-w-7xl mx-auto">
        <div className="h-16 w-full text-secondary px-4 flex justify-between items-center z-50">          
          {/* Left section with logo and back button */}
          <div className="flex items-center flex-shrink-0 w-[200px]">
            {shouldShowBack && !showMobileSearch && (
              <button 
                onClick={() => router.back()}
                className="md:hidden p-2 rounded-full hover:bg-accent-light mr-2 flex-shrink-0"
                aria-label="Go back"
              >
                <ArrowLeft className="w-5 h-5 text-accent-1" />
              </button>
            )}
            
            {!showMobileSearch && (
              <Link href="/" className="flex items-center gap-2 text-xl font-bold">
                <div className="relative h-8 w-32 md:h-10 md:w-40">
                  <Image 
                    {...logoProps}
                    alt="StarChoice Cosmetics Logo"
                    className="object-contain"
                  />
                </div>
              </Link>
            )}
          </div>

          {/* Mobile Search Input - Show when search is active */}
          {showMobileSearch && (
            <form 
              onSubmit={handleSearch} 
              className="absolute top-0 left-0 w-full h-16 bg-primary px-4 flex items-center z-50"
            >
              <button 
                onClick={() => setShowMobileSearch(false)}
                className="p-2 mr-2 flex-shrink-0"
                aria-label="Close search"
              >
                <X className="w-5 h-5 text-accent-1" />
              </button>
              <div className="relative flex-1">
                <input
                  id="mobile-search-input"
                  type="text"
                  placeholder="Search products..."
                  className="w-full px-4 py-2 border border-medium focus:outline-none text-input rounded-[4px]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                />
                <button 
                  type="submit"
                  className="absolute right-0 top-1/2 -translate-y-1/2 bg-accent-1 h-full w-[40px] rounded-r-[4px] flex items-center justify-center"
                >
                  <Search className="w-4 h-4 text-white" />
                </button>
              </div>
            </form>
          )}

          {/* Center section with search - Only show on desktop */}
          <div className={`hidden md:flex justify-center flex-1 max-w-2xl ${isSearchFocused ? 'z-10' : ''}`}>
            <form onSubmit={handleSearch} className="w-full max-w-xl">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full px-4 py-2 border border-medium focus:outline-none focus:ring-2 focus:ring-accent-1/50 rounded-[4px]"
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button 
                  type="submit"
                  className="absolute right-0 top-1/2 -translate-y-1/2 bg-accent-1 h-full w-[40px] md:w-[50px] rounded-r-[4px] flex items-center justify-center"
                >
                  <Search className="w-4 h-4 md:w-5 md:h-5 text-white" />
                </button>
              </div>
            </form>
          </div>

          {/* Right section with fixed width to balance the layout */}
          <div className="flex-shrink-0 flex justify-end">
            {/* ...existing mobile search and action buttons code... */}
            {!showMobileSearch && (
              <div className='flex items-center'>            
                <button 
                  onClick={toggleMobileSearch}
                  className="md:hidden p-2 rounded-full hover:bg-accent-light"
                  aria-label="Search"
                >
                  <Search className="w-5 h-5 text-accent-1" />
                </button>
                {shouldShowBack && (
                  <div className="h-full flex items-center">
                    
                    <button 
                      onClick={()=> router.push('/wishlist')}
                      className="md:hidden p-2 h-full rounded-full hover:bg-accent-light relative"
                      aria-label="Search"
                    >
                      {wishlist.length > 0 && (
                        <span className="absolute -top-1 right-0 w-4 h-4 bg-accent-1 text-contrast text-xs rounded-full flex items-center justify-center">
                          {wishlist.length}
                        </span> 
                      )}
      
                      <Heart className="w-5 h-5 text-accent-1" />
                    </button>
  
                    <button 
                      onClick={()=> router.push('/cart')}
                      className="md:hidden p-2 rounded-full hover:bg-accent-light relative"
                      aria-label="Search"
                    >
                      {cart.length > 0 && (
                        <span className="absolute -top-1 right-0 w-4 h-4 bg-accent-1 text-contrast text-xs rounded-full flex items-center justify-center">
                          {cart.length}
                        </span>
                      )}
      
                      <ShoppingCart className="w-5 h-5 text-accent-1" />
                    </button>
                  </div>                
                )}
                </div>
            )}       

            {/* Actions Section - Hidden on mobile */}
            <div ref={dropdownRef}  className="hidden md:flex items-center gap-4">
              {/* Account Dropdown */}
              <div  className="dropdown-container relative">
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
              <div ref={dropdownRef} className="dropdown-container relative">
                {/* Wishlist Button */}
                <button 
                  className="flex items-center gap-1 hover:text-accent-1"
                  onClick={() => {                 
                      handleDropdown('wishlist')
                   
                  }}
                >
                  <div className="relative">
                    <Heart className="w-5 h-5" />
                    {(wishlist.length > 0)&& (
                      <span className="absolute -top-2 -right-2 w-4 h-4 bg-accent-1 text-contrast text-xs rounded-full flex items-center justify-center">
                        {wishlist.length}
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
                    {wishlist.length > 0 ? (
                      <>
                        {/* Show only first item */}
                        <Link 
                          href={`/products/${wishlist[0].id}`}
                          className="flex gap-3 hover:bg-accent-light p-2 -m-2 rounded-[4px] transition-colors"
                        >
                          <div className="relative w-16 h-16 flex-shrink-0">
                            <Image
                              src={wishlist[0].image}
                              alt={wishlist[0].name || "Wishlist item"}
                              fill
                              className="object-cover rounded-[4px]"
                              sizes="64px"
                            />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-sm text-primary line-clamp-1">{wishlist[0].name}</h3>
                            <p className="text-accent-1 font-bold text-sm">
                              KES {wishlist[0].price.toLocaleString()}
                            </p>
                            {wishlist.length > 1 && (
                              <p className="text-sm text-primary mt-1">
                                +{wishlist.length - 1} more items
                              </p>
                            )}
                          </div>
                        </Link>
                        <Link 
                          href="/wishlist" 
                          className="block w-full bg-accent-1 text-contrast text-center py-2 rounded-[4px] text-sm mt-4 hover:bg-accent-1/90"
                        >
                          View All Items ({wishlist.length})
                        </Link>
                      </>
                    ) : (
                      <p className="text-sm text-primary text-center">Your wishlist is empty</p>
                    )}

                  </div>                
                )}
              </div>

              {/* Cart Dropdown */}
              <div ref={dropdownRef} className="dropdown-container relative">
                {/* Cart Button */}
                <button
                  className="flex items-center gap-1 hover:text-accent-1"
                  onClick={() => {                 
                      handleDropdown('cart')                  
                  }}
                >
                  <div className="relative">
                    <ShoppingCart className="w-5 h-5" />
                    {(cart.length > 0)  && (
                      <span className="absolute -top-2 -right-2 w-4 h-4 bg-accent-1 text-contrast text-xs rounded-full flex items-center justify-center">
                        {cart.length}
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
                    {cart.length > 0 ? (
                      <>
                        {/* Cart Items Preview */}
                        <div className="max-h-64 overflow-y-auto mb-4">
                          {cart.slice(0, 3).map((item) => (
                            <div key={item.id} className="flex gap-3 py-2 border-b border-medium last:border-0">
                              <div className="relative w-12 h-12 flex-shrink-0">
                                <Image
                                  src={item.image}
                                  alt={item.name}
                                  fill
                                  className="object-cover rounded-[4px]"
                                  sizes="48px"
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h3 className="text-xs text-primary line-clamp-1">{item.name}</h3>
                                <div className="flex items-center gap-2 mt-1">
                                  <span className="text-xs text-accent-1">
                                    KES {item.price.toLocaleString()}
                                  </span>
                                  <span className="text-xs text-secondary">
                                    × {item.quantity}
                                  </span>
                                </div>
                              </div>
                            </div>
                          ))}
                          {cart.length > 3 && (
                            <p className="text-xs text-secondary text-center mt-2">
                              +{cart.length - 3} more items
                            </p>
                          )}
                        </div>

                        <div className="flex justify-between text-sm mb-2">
                          <span className="font-medium text-primary">Items:</span>
                          <span className="text-primary">
                            {cartQuantity}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm mb-3">
                          <span className="font-medium text-primary">Subtotal:</span>
                          <span className="font-bold text-accent-1">
                            KES {cartTotal.toLocaleString()}
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